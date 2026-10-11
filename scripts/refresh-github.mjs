#!/usr/bin/env node
/**
 * Atualiza os dados reais de cada skill a partir do GitHub.
 *
 * 1. API pública (https://api.github.com/repos/DONO/REPO): estrelas, data do
 *    último push e licença. Quando responde, atualiza `coletadoEm`.
 * 2. Se a API não responder (limite de requisições, rede bloqueada), cai para
 *    o git: lê só o último commit do branch principal com
 *    `git fetch --depth=1 --filter=tree:0` — um único objeto, sem arquivos — e
 *    atualiza `atualizadoEm`. As estrelas ficam como estavam. Um fetch que dá
 *    certo também prova que o link está vivo, então atualiza `linksVerificadosEm`.
 *
 * Nada é inventado: o que não puder ser consultado mantém o valor anterior.
 *
 * Uso:
 *   node scripts/refresh-github.mjs            # aplica as mudanças
 *   node scripts/refresh-github.mjs --dry-run  # só mostra o que mudaria
 *
 * Sem token a API permite 60 requisições por hora — suficiente para o
 * catálogo. Para limites maiores: GITHUB_TOKEN=ghp_xxx node scripts/refresh-github.mjs
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

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'biblioteca-de-skills-claude'
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

async function viaApi(slug) {
  const resp = await fetch(`https://api.github.com/repos/${slug}`, { headers });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.json();
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
let okGit = 0;

function mudar(skill, campo, valor) {
  if (valor == null || skill[campo] === valor) return;
  mudancas.push(`${skill.id}.${campo}: ${skill[campo]} -> ${valor}`);
  if (!dryRun) skill[campo] = valor;
}

for (const skill of db.skills) {
  const slug = slugDoRepo(skill.repo);
  if (!slug) { falhas.push(`${skill.id}: URL de repositório inválida (${skill.repo})`); continue; }

  let erroApi;
  try {
    const dados = await viaApi(slug);
    okApi++;
    // repositórios renomeados: o GitHub responde com o novo full_name
    if (dados.full_name && dados.full_name.toLowerCase() !== slug.toLowerCase()) {
      mudancas.push(`${skill.id}: repositório renomeado ${slug} -> ${dados.full_name}`);
      if (!dryRun) {
        skill.repo = dados.html_url;
        skill.autor = dados.full_name.split('/')[0];
      }
    }
    mudar(skill, 'stars', dados.stargazers_count);
    mudar(skill, 'atualizadoEm', String(dados.pushed_at).slice(0, 10));
    mudar(skill, 'licenca', formatarLicenca(dados.license, skill.licenca));
    continue;
  } catch (e) {
    erroApi = e.message;
  }

  // plano B: só a data do último commit, via git
  try {
    const data = dataDoUltimoCommit(skill.repo);
    okGit++;
    // O pushed_at da API conta pushes em qualquer branch; o git lê só o
    // principal. Só avança a data, para não apagar uma atividade mais recente.
    if (data > skill.atualizadoEm) mudar(skill, 'atualizadoEm', data);
  } catch (e) {
    falhas.push(`${skill.id}: API (${erroApi}) e git falharam em ${slug}` +
      ' — repositório movido, removido ou rede bloqueada?');
  }
}

if (repoTemp) rmSync(repoTemp, { recursive: true, force: true });

if (!dryRun) {
  if (okApi) db.coletadoEm = hoje;
  if (okApi || okGit) db.linksVerificadosEm = hoje;
}

console.log(`API: ${okApi} ok · git (só datas): ${okGit} ok · falhas: ${falhas.length}`);
console.log(mudancas.length ? mudancas.join('\n') : 'Nenhuma alteração — os dados já estão atualizados.');
if (okGit) {
  console.log(`\n${okGit} repositório(s) atualizados só pelo git: datas novas, estrelas e licenças mantidas.`);
}
if (falhas.length) {
  console.error(`\n${falhas.length} repositório(s) não puderam ser consultados:`);
  console.error(falhas.join('\n'));
  console.error('Os valores existentes foram preservados (nada é inventado).');
}

if (dryRun) {
  console.log('\n--dry-run: nenhum arquivo foi alterado.');
} else if (okApi || okGit) {
  writeFileSync(jsonPath, JSON.stringify(db, null, 2) + '\n');
  console.log(`\ndata/skills.json atualizado (estrelas de ${db.coletadoEm}, datas e links de ${db.linksVerificadosEm}).`);
  console.log('Agora rode: node scripts/build-data.mjs');
}

process.exit(falhas.length && !mudancas.length && !okGit ? 1 : 0);
