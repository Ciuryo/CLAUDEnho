#!/usr/bin/env node
/**
 * Atualiza os dados reais de cada skill a partir da API pública do GitHub.
 *
 * Lê data/skills.json, consulta https://api.github.com/repos/DONO/REPO para
 * cada skill e grava de volta: stars, atualizadoEm (pushed_at) e licenca.
 * Também atualiza o campo `coletadoEm` na raiz do arquivo.
 *
 * Uso:
 *   node scripts/refresh-github.mjs            # aplica as mudanças
 *   node scripts/refresh-github.mjs --dry-run  # só mostra o que mudaria
 *
 * A API sem autenticação permite 60 requisições por hora — suficiente para o
 * catálogo inteiro. Para limites maiores, exporte um token:
 *   GITHUB_TOKEN=ghp_xxx node scripts/refresh-github.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = join(root, 'data', 'skills.json');
const dryRun = process.argv.includes('--dry-run');

const db = JSON.parse(readFileSync(jsonPath, 'utf8'));

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

const mudancas = [];
const falhas = [];

for (const skill of db.skills) {
  const slug = slugDoRepo(skill.repo);
  if (!slug) { falhas.push(`${skill.id}: URL de repositório inválida (${skill.repo})`); continue; }

  let dados;
  try {
    const resp = await fetch(`https://api.github.com/repos/${slug}`, { headers });
    if (!resp.ok) {
      falhas.push(`${skill.id}: HTTP ${resp.status} em ${slug}` +
        (resp.status === 403 ? ' (limite de requisições ou rede bloqueada)' : '') +
        (resp.status === 404 ? ' (repositório movido ou removido?)' : ''));
      continue;
    }
    dados = await resp.json();
  } catch (e) {
    falhas.push(`${skill.id}: falha de rede (${e.message})`);
    continue;
  }

  const novo = {
    stars: dados.stargazers_count,
    atualizadoEm: String(dados.pushed_at).slice(0, 10),
    licenca: formatarLicenca(dados.license, skill.licenca)
  };

  // repositórios renomeados: o GitHub responde com o novo full_name
  if (dados.full_name && dados.full_name.toLowerCase() !== slug.toLowerCase()) {
    mudancas.push(`${skill.id}: repositório renomeado ${slug} -> ${dados.full_name}`);
    if (!dryRun) {
      skill.repo = dados.html_url;
      skill.autor = dados.full_name.split('/')[0];
    }
  }

  for (const [campo, valor] of Object.entries(novo)) {
    if (valor != null && skill[campo] !== valor) {
      mudancas.push(`${skill.id}.${campo}: ${skill[campo]} -> ${valor}`);
      if (!dryRun) skill[campo] = valor;
    }
  }
}

const hoje = new Date().toISOString().slice(0, 10);
if (!dryRun && falhas.length < db.skills.length) db.coletadoEm = hoje;

console.log(mudancas.length ? mudancas.join('\n') : 'Nenhuma alteração — os dados já estão atualizados.');
if (falhas.length) {
  console.error(`\n${falhas.length} repositório(s) não puderam ser consultados:`);
  console.error(falhas.join('\n'));
  console.error('\nOs valores existentes foram preservados (nada é inventado).');
}

if (dryRun) {
  console.log('\n--dry-run: nenhum arquivo foi alterado.');
} else if (mudancas.length) {
  writeFileSync(jsonPath, JSON.stringify(db, null, 2) + '\n');
  console.log(`\ndata/skills.json atualizado (coletadoEm: ${db.coletadoEm}).`);
  console.log('Agora rode: node scripts/build-data.mjs');
}

process.exit(falhas.length && !mudancas.length ? 1 : 0);
