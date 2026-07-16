# Biblioteca de Skills para Claude

Página estática (HTML + CSS + JS puros, sem dependências) que funciona como uma
biblioteca curada das melhores Skills do ecossistema Claude, com dados reais do
GitHub: estrelas, descrições, datas de atualização e licenças.

## Como abrir

Basta abrir o `index.html` no navegador — funciona direto do disco (`file://`),
sem servidor. Se preferir um servidor local:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Estrutura do projeto

```
index.html            página principal
css/styles.css        estilos (temas claro/escuro por tokens CSS)
js/app.js             busca, filtros, favoritos, modal, cópia e recomendação
data/skills.json      FONTE CANÔNICA dos dados das skills (edite este)
data/skills.js        gerado a partir do JSON (não edite à mão)
scripts/build-data.mjs gera data/skills.js e valida o JSON
```

## Funcionalidades

- **Busca** por nome, autor, descrição, tags e categorias (sem sensibilidade a acentos)
- **Filtros**: categoria, estrelas mínimas, data de atualização, ordenação
  (popularidade / mais recentes / nome) e "só favoritas"
- **Cards** com: para que serve, quando usar, estrelas, data, licença e ações
- **Modal de detalhes** com todos os campos: benefícios, economia de tokens,
  qualidade das respostas, uso multiagente, melhorias, instalação, exemplo e prompt
- **Botões de copiar** (prompt inicial e instalação) com feedback visual (toast + estado do botão)
- **Favoritos** persistidos em `localStorage`
- **Áreas de destaque**: recomendadas (curadoria), mais populares (estrelas) e
  atualizadas recentemente (data do último commit)
- **Recomendador por tipo de projeto**: descreva o projeto e receba skills por
  frente (arquitetura, revisão, segurança, testes, documentação, contexto,
  multiagentes…), cada uma com o prompt ideal para copiar
- **Tema claro/escuro** com toggle persistido e respeito a `prefers-color-scheme`
- **Layout responsivo** para desktop e celular

## Como adicionar ou atualizar uma skill

1. **Colete os dados reais no GitHub** (não invente números):
   - `https://api.github.com/repos/DONO/REPO` retorna `stargazers_count`
     (estrelas), `description`, `pushed_at` (último commit) e `license`.

2. **Edite `data/skills.json`** e adicione um objeto ao array `skills`:

```json
{
  "id": "minha-skill",
  "nome": "Minha Skill",
  "autor": "dono-do-repo",
  "repo": "https://github.com/dono-do-repo/minha-skill",
  "stars": 1234,
  "atualizadoEm": "2026-07-15",
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

   Campos e regras:
   - `id` único, em kebab-case;
   - `categorias` deve usar apenas ids existentes no array `categorias` do
     próprio JSON (`tokens`, `programacao`, `multiagentes`, `prompts`,
     `escrita`, `pesquisa`, `automacao`, `documentacao`, `seguranca`,
     `planejamento`, `testes`, `design`) — novas categorias podem ser criadas
     adicionando entradas nesse array;
   - `destaque: true` coloca a skill na faixa "Skills recomendadas";
   - `atualizadoEm` no formato `AAAA-MM-DD` (use a data do `pushed_at`);
   - `recomendadoPara` são rótulos livres usados como referência de curadoria;
     o recomendador da página usa as áreas definidas em
     `AREAS_RECOMENDACAO` no `js/app.js` — se a nova skill deve aparecer nas
     recomendações, inclua o `id` dela na área correspondente.

3. **Gere o arquivo consumido pela página**:

```bash
node scripts/build-data.mjs
```

   O script valida campos obrigatórios, ids duplicados e categorias
   desconhecidas antes de gerar `data/skills.js`. Nenhuma alteração no HTML é
   necessária — a página renderiza tudo a partir dos dados.

4. Recarregue o `index.html`.

## Atualizando estrelas e datas em lote

As estrelas mudam todo dia; o rodapé da página deixa claro que os números são
um retrato da data de coleta (campo `coletadoEm` do JSON). Para atualizar,
consulte a API do GitHub para cada repositório, ajuste `stars` e
`atualizadoEm`, atualize `coletadoEm` e rode o build novamente.

## Procedência dos dados

Todos os números e metadados (estrelas, descrições, `pushed_at`, licenças)
foram obtidos da API pública do GitHub em **2026-07-15**. As descrições
editoriais (para que serve, quando usar, benefícios etc.) foram escritas a
partir da documentação oficial de cada repositório.
