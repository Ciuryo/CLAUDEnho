#!/usr/bin/env node
/**
 * Gera data/skills.js a partir de data/skills.json.
 *
 * O skills.json é a fonte canônica dos dados. O skills.js é o mesmo
 * conteúdo embrulhado em `window.SKILLS_DB = ...`, para que a página
 * funcione aberta direto do disco (file://), onde fetch() de JSON
 * local é bloqueado pelo navegador.
 *
 * Uso: node scripts/build-data.mjs
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const jsonPath = join(root, 'data', 'skills.json');
const jsPath = join(root, 'data', 'skills.js');

const raw = readFileSync(jsonPath, 'utf8');
const db = JSON.parse(raw); // valida o JSON antes de gerar

const ids = new Set();
for (const s of db.skills) {
  for (const campo of ['id', 'nome', 'repo', 'stars', 'atualizadoEm', 'categorias', 'promptInicial', 'instalacao', 'tipo', 'facilidade']) {
    if (s[campo] === undefined) {
      throw new Error(`Skill "${s.id ?? s.nome}" sem o campo obrigatório "${campo}"`);
    }
  }
  if (ids.has(s.id)) throw new Error(`id duplicado: "${s.id}"`);
  ids.add(s.id);
  const catsValidas = new Set(db.categorias.map((c) => c.id));
  for (const c of s.categorias) {
    if (!catsValidas.has(c)) throw new Error(`Skill "${s.id}": categoria desconhecida "${c}"`);
  }
  if (!db.tipos[s.tipo]) throw new Error(`Skill "${s.id}": tipo desconhecido "${s.tipo}"`);
  if (!db.facilidades[s.facilidade]) throw new Error(`Skill "${s.id}": facilidade desconhecida "${s.facilidade}"`);
}

const banner = '// ARQUIVO GERADO — não edite à mão. Edite data/skills.json e rode: node scripts/build-data.mjs\n';
writeFileSync(jsPath, banner + 'window.SKILLS_DB = ' + JSON.stringify(db, null, 2) + ';\n');
console.log(`ok: ${db.skills.length} skills, ${db.categorias.length} categorias -> data/skills.js`);
