#!/usr/bin/env node
/**
 * Atualiza os dados reais de cada skill a partir do GitHub.
 *
 * Para cada repositório, tenta nesta ordem:
 * 1. API pública (https://api.github.com/repos/DONO/REPO): estrelas, data do
 *    último push, licença e linguagem.
 * 2. Se a API não responder (limite de requisições, rede bloqueada), a página
 *    do repositório no github.com, que traz as mesmas estrelas e licença num
 *    JSON embutido e não gasta a cota da API. Ela não traz data nem linguagem.
 * 3. Quando a data não veio da API, o git: lê só o último commit do branch
 *    principal com `git fetch --depth=1 --filter=tree:0` — um único objeto,
 *    sem arquivos. Um fetch que dá certo também prova que o link está vivo.
 *
 * `coletadoEm` ("estrelas de <data>") só muda quando TODAS as estrelas foram
 * lidas nesta execução; `linksVerificadosEm` muda se qualquer consulta deu certo.
 * Nada é inventado: o que não puder ser consultado mantém o valor anterior.
 *
 * Uso:
 *   node scripts/refresh-github.mjs            # aplica as mudanças
 *   node scripts/refresh-github.mjs --dry-run  # só mostra o que mudaria
 *
 * Sem token a API permite 60 requisições por hora por IP — dá para o catálogo,
 * mas em IPs compartilhados a cota some rápido (daí o plano B).
 * Para limites maiores: GITHUB_TOKEN=ghp_xxx node scripts/refresh-github.mjs
 */
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = join(root, 'data', 'skills.json');
const dryRun = process.argv.includes('--dry-run');

const db = JSON.parse(readFileSync(jsonPath, 'utf8'));
const hoje = new Date().toISOString().slice(0, 10);

const userAgent = 'biblioteca-de-skills-claude';
const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': userAgent
};
if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

/** "https://github.com/dono/repo" -> "dono/repo" */
function slugDoRepo(url) {
  const m = String(url).match(/github\.com\/([^/]+\/[^/#?]+)/i);
  return m ? m[1].replace(/\.git$/, '') : null;
}

function formatarLicenca(lic, atual) {
  if (!lic || !lic.spdx_id || lic.spdx_id === 'NOASSERTION') return atual;
  return lic.spdx_id;
}

const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Sem token, o limite é de 60 requisições/hora por IP. Em redes com vários IPs
// de saída, uma nova tentativa pode sair por outro IP que ainda tem cota.
async function viaApi(slug, tentativas = 4) {
  for (let i = 1; ; i++) {
    const resp = await fetch(`https://api.github.com/repos/${slug}`, { headers });
    if (resp.ok) return resp.json();
    const limite = (resp.status === 403 || resp.status === 429) &&
      /rate limit/i.test(await resp.text().catch(() => ''));
    if (!limite || i >= tentativas) throw new Error(limite ? 'limite de requisições' : `HTTP ${resp.status}`);
    await esperar(1500 * i);
  }
}

function acharChave(obj, chave) {
  if (!obj || typeof obj !== 'object') return undefined;
  if (Object.hasOwn(obj, chave)) return obj[chave];
  for (const valor of Object.values(obj)) {
    const achado = acharChave(valor, chave);
    if (achado !== undefined) return achado;
  }
  return undefined;
}

// A página do repositório guarda os dados da barra lateral ("About") num
// <script type="application/json">. Devolve no mesmo formato da API.
async function viaPagina(slug, tentativas = 3) {
  let resp;
  for (let i = 1; ; i++) {
    resp = await fetch(`https://github.com/${slug}`, { headers: { 'User-Agent': userAgent } });
    if (resp.status !== 429 || i >= tentativas) break;
    await esperar(3000 * i);
  }
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  const html = await resp.text();
  for (const [, json] of html.matchAll(/<script type="application\/json"[^>]*>([\s\S]*?)<\/script>/g)) {
    if (!json.includes('"sidebarAboutData"')) continue;
    const sobre = acharChave(JSON.parse(json), 'sidebarAboutData');
    if (!sobre || !Number.isInteger(sobre.stargazerCount)) break;
    const nome = sobre.ownerLogin && sobre.repoName ? `${sobre.ownerLogin}/${sobre.repoName}` : slug;
    const lic = sobre.repo && sobre.repo.license;
    return {
      full_name: nome,
      html_url: `https://github.com/${nome}`,
      stargazers_count: sobre.stargazerCount,
      license: lic ? { spdx_id: lic.spdxId } : null
    };
  }
  throw new Error('a página não trouxe as estrelas');
}

// Repositório git vazio e temporário, reaproveitado para todos os fetches.
let repoTemp = null;
function dataDoUltimoCommit(url) {
  if (!repoTemp) {
    repoTemp = mkdtempSync(join(tmpdir(), 'skills-git-'));
    execFileSync('git', ['init', '-q', '--bare', repoTemp]);
  }
  const git = (args) => execFileSync('git', ['-C', repoTemp, ...args],
    { encoding: 'utf8', timeout: 60000, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  git(['fetch', '-q', '--depth=1', '--filter=tree:0', url, 'HEAD']);
  return new Date(git(['log', '-1', '--format=%cI', 'FETCH_HEAD'])).toISOString().slice(0, 10);
}

const mudancas = [];
const falhas = [];
let okApi = 0;
let okPagina = 0;
let okGit = 0;
let soGit = 0;
let apiEsgotada = false;

function mudar(skill, campo, valor) {
  if (valor == null || skill[campo] === valor) return;
  mudancas.push(`${skill.id}.${campo}: ${skill[campo]} -> ${valor}`);
  if (!dryRun) skill[campo] = valor;
}

for (const skill of db.skills) {
  const slug = slugDoRepo(skill.repo);
  if (!slug) { falhas.push(`${skill.id}: URL de repositório inválida (${skill.repo})`); continue; }

  let dados = null;
  const erros = [];
  if (!apiEsgotada) {
    try {
      dados = await viaApi(slug);
      okApi++;
    } catch (e) {
      erros.push(`API: ${e.message}`);
      // se nem as novas tentativas acharam cota, insistir só atrasa o resto
      if (e.message === 'limite de requisições') apiEsgotada = true;
    }
  }
  if (!dados) {
    try {
      dados = await viaPagina(slug);
      okPagina++;
    } catch (e) {
      erros.push(`página: ${e.message}`);
    }
  }

  if (dados) {
    // repositórios renomeados: o GitHub responde com o novo dono/nome
    if (dados.full_name && dados.full_name.toLowerCase() !== slug.toLowerCase()) {
      mudancas.push(`${skill.id}: repositório renomeado ${slug} -> ${dados.full_name}`);
      if (!dryRun) {
        skill.repo = dados.html_url;
        skill.autor = dados.full_name.split('/')[0];
      }
    }
    mudar(skill, 'stars', dados.stargazers_count);
    mudar(skill, 'licenca', formatarLicenca(dados.license, skill.licenca));
    if (dados.language) mudar(skill, 'linguagem', dados.language);
    if (dados.pushed_at) {
      mudar(skill, 'atualizadoEm', String(dados.pushed_at).slice(0, 10));
      continue;
    }
  }

  // a data, quando a API não a deu: último commit, via git
  try {
    const data = dataDoUltimoCommit(skill.repo);
    okGit++;
    if (!dados) soGit++;
    // O pushed_at da API conta pushes em qualquer branch; o git lê só o
    // principal. Só avança a data, para não apagar uma atividade mais recente.
    if (data > skill.atualizadoEm) mudar(skill, 'atualizadoEm', data);
  } catch (e) {
    erros.push(`git: ${String(e.message).split('\n')[0]}`);
    falhas.push(`${skill.id} (${slug}): ${erros.join(' · ')}` + (dados
      ? ' — estrelas atualizadas, data mantida'
      : ' — repositório movido, removido ou rede bloqueada?'));
  }
}

if (repoTemp) rmSync(repoTemp, { recursive: true, force: true });

// "estrelas de <data>" só muda se TODAS foram lidas agora; senão a página diria
// que estão atualizadas quando parte delas ainda é da coleta anterior.
const estrelasLidas = okApi + okPagina;
const todasAsEstrelas = estrelasLidas === db.skills.length;
if (!dryRun) {
  if (todasAsEstrelas) db.coletadoEm = hoje;
  if (estrelasLidas || okGit) db.linksVerificadosEm = hoje;
}

console.log(`API: ${okApi} ok · página do GitHub: ${okPagina} ok · git (datas): ${okGit} ok · falhas: ${falhas.length}`);
console.log(mudancas.length ? mudancas.join('\n') : 'Nenhuma alteração — os dados já estão atualizados.');
if (okPagina) {
  console.log(`\n${okPagina} repositório(s) lidos pela página do GitHub: estrelas e licenças conferidas, linguagem mantida.`);
}
if (soGit) {
  console.log(`\n${soGit} repositório(s) atualizados só pelo git: datas novas, estrelas e licenças mantidas.`);
}
if (estrelasLidas && !todasAsEstrelas) {
  console.log(`\nAtenção: só ${estrelasLidas} de ${db.skills.length} estrelas foram lidas, então a data das ` +
    'estrelas não foi alterada. Rode de novo mais tarde (ou com GITHUB_TOKEN) para completar.');
}
if (falhas.length) {
  console.error(`\n${falhas.length} repositório(s) com consulta incompleta:`);
  console.error(falhas.join('\n'));
  console.error('Os valores que não puderam ser consultados foram preservados (nada é inventado).');
}

if (dryRun) {
  console.log('\n--dry-run: nenhum arquivo foi alterado.');
} else if (estrelasLidas || okGit) {
  writeFileSync(jsonPath, JSON.stringify(db, null, 2) + '\n');
  console.log(`\ndata/skills.json atualizado (estrelas de ${db.coletadoEm}, datas e links de ${db.linksVerificadosEm}).`);
  console.log('Agora rode: node scripts/build-data.mjs');
}

process.exit(falhas.length && !estrelasLidas && !okGit ? 1 : 0);
