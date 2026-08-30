# Biblioteca de Skills para Claude

Página estática (HTML + CSS + JS puros, sem dependências) que funciona como uma
biblioteca curada das melhores Skills do ecossistema Claude, com dados reais do
GitHub: estrelas, descrições, datas de atualização e licenças.

**27 skills · 12 categorias.**

## Como abrir

Basta abrir o `index.html` no navegador — funciona direto do disco (`file://`),
sem servidor. Se preferir um servidor local:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Estrutura do projeto

```
index.html                 página principal
css/styles.css             estilos (temas claro/escuro por tokens CSS)
js/app.js                  busca, filtros, favoritos, modal, cópia e recomendação
data/skills.json           FONTE CANÔNICA dos dados das skills (edite este)
data/skills.js             gerado a partir do JSON (não edite à mão)
scripts/build-data.mjs     valida o JSON e gera data/skills.js
scripts/refresh-github.mjs atualiza estrelas/datas/licenças pela API do GitHub
```

## Funcionalidades

**Catálogo**
- Busca por nome, autor, descrição, tags e categorias, sem sensibilidade a acentos
- Ordenação por relevância (ativada automaticamente ao digitar), popularidade,
  atualização mais recente ou nome
- Filtros de categoria (com contagem), estrelas mínimas, data de atualização e favoritas
- Cards com o problema que a skill resolve, quando usar, estrelas, data e licença
- Modal de detalhes com os 13 campos: benefícios, economia de tokens, qualidade
  das respostas, uso multiagente, melhorias, instalação, exemplo e prompt inicial
- Botões de copiar (prompt, instalação e link direto) com feedback visual
- Favoritos persistidos em `localStorage`, com contagem no filtro
- Faixas de destaque: recomendadas, mais populares e atualizadas recentemente

**Recomendador por tipo de projeto**
- Descreva o projeto e receba as skills separadas por frente
- As frentes citadas explicitamente no seu texto viram *prioritárias* (até 5);
  as demais ficam recolhidas em "Também relevantes"
- Plano de adoção numerado, na ordem que faz sentido instalar
  (contexto e documentação primeiro, porque melhoram tudo o que vem depois)
- "Copiar plano completo (Markdown)" gera um documento com skills, links,
  instalação e prompts — pronto para colar no Claude ou no README do projeto

**Interface**
- Temas claro e escuro, respeitando `prefers-color-scheme` com toggle persistido
- Layout responsivo para desktop e celular
- Estado na URL: busca, filtros e skill aberta ficam no endereço, então qualquer
  visão é compartilhável (`#cat=testes&min=5000`, `#skill=context7`)
- Atalhos de teclado: `/` foca a busca, `Esc` limpa a busca ou fecha o modal
- Foco preso no modal enquanto aberto e devolvido ao elemento de origem ao fechar

## Atualizando os dados do GitHub

As estrelas mudam todo dia. Para atualizar o catálogo inteiro de uma vez:

```bash
node scripts/refresh-github.mjs --dry-run   # mostra o que mudaria
node scripts/refresh-github.mjs             # aplica
node scripts/build-data.mjs                 # regenera data/skills.js
```

O script consulta `https://api.github.com/repos/DONO/REPO` para cada skill e
atualiza `stars`, `atualizadoEm` (do `pushed_at`), `licenca` e o `coletadoEm` do
arquivo. Repositórios renomeados são detectados e a URL é corrigida. Se algum
repositório não puder ser consultado, o valor existente é **preservado** — nada
é inventado, e a falha é reportada no final.

A API sem autenticação permite 60 requisições por hora, suficiente para o
catálogo. Para limites maiores:

```bash
GITHUB_TOKEN=seu_token node scripts/refresh-github.mjs
```

Quando os dados passam de 45 dias, a própria página exibe um aviso discreto de
que as estrelas podem ter mudado.

## Como adicionar uma skill nova

1. **Colete os dados reais no GitHub** — `https://api.github.com/repos/DONO/REPO`
   retorna `stargazers_count`, `description`, `pushed_at` e `license`.

2. **Edite `data/skills.json`** e adicione um objeto ao array `skills`:

```json
{
  "id": "minha-skill",
  "nome": "Minha Skill",
  "autor": "dono-do-repo",
  "repo": "https://github.com/dono-do-repo/minha-skill",
  "stars": 1234,
  "atualizadoEm": "2026-08-30",
  "licenca": "MIT",
  "linguagem": "TypeScript",
  "categorias": ["programacao", "testes"],
  "tags": ["exemplo", "tag-de-busca"],
  "destaque": false,
  "paraQueServe": "Explique o problema concreto que ela resolve.",
  "quandoUsar": "Descreva a situação em que ela é a escolha certa.",
  "beneficios": ["Benefício 1", "Benefício 2"],
  "economiaTokens": "Como ela reduz consumo de contexto/tokens.",
  "qualidadeRespostas": "Como ela melhora as respostas.",
  "multiAgentes": "Como se encaixa em pipelines multiagente.",
  "melhorias": { "programacao": "…", "produtividade": "…" },
  "instalacao": "comando ou passos de instalação",
  "exemploUso": "Um exemplo concreto de uso.",
  "promptInicial": "Utilize a Skill Minha Skill para executar [objetivo]. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
  "recomendadoPara": ["saas", "backend"]
}
```

   Regras dos campos:
   - `id` único, em kebab-case (também é o identificador do link `#skill=id`);
   - `categorias` só aceita ids existentes no array `categorias` do próprio JSON
     (`tokens`, `programacao`, `multiagentes`, `prompts`, `escrita`, `pesquisa`,
     `automacao`, `documentacao`, `seguranca`, `planejamento`, `testes`,
     `design`) — para criar uma categoria nova, adicione uma entrada nesse array;
   - `destaque: true` coloca a skill na faixa "Skills recomendadas";
   - `atualizadoEm` no formato `AAAA-MM-DD` (use os 10 primeiros caracteres do
     `pushed_at`);
   - `recomendadoPara` são rótulos livres de curadoria.

3. **Gere o arquivo consumido pela página**:

```bash
node scripts/build-data.mjs
```

   O script valida campos obrigatórios, ids duplicados e categorias inexistentes
   antes de gerar `data/skills.js`. Nenhuma alteração no HTML é necessária — a
   página inteira é renderizada a partir dos dados.

4. Recarregue o `index.html`.

### Fazendo a skill aparecer nas recomendações

O recomendador usa a lista `AREAS_RECOMENDACAO` em `js/app.js`. Cada frente tem:

```js
{
  titulo: 'Testes e depuração',
  icone: '✓',
  base: true,              // vale para qualquer projeto de software
  ordemAdocao: 5,          // posição no plano de adoção
  gatilhos: ['teste', 'tdd', 'bug', 'depura'],
  motivo: 'Por que esta frente importa.',
  skills: ['tdd-guard', 'superpowers']   // ids do skills.json, em ordem de prioridade
}
```

Inclua o `id` da nova skill no array `skills` da frente correspondente.
Os gatilhos casam no **início de uma palavra**, então `integra` encontra
"integrações" sem que `ci` dispare dentro de "preciso".

## Procedência dos dados

Estrelas, descrições, datas de último commit e licenças vêm da API pública do
GitHub. A data da coleta fica em `coletadoEm` no JSON e aparece na página e no
rodapé. As descrições editoriais (para que serve, quando usar, benefícios,
economia de tokens etc.) foram escritas a partir da documentação oficial de cada
repositório.
