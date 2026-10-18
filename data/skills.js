// ARQUIVO GERADO — não edite à mão. Edite data/skills.json e rode: node scripts/build-data.mjs
window.SKILLS_DB = {
  "versao": "1.0.0",
  "coletadoEm": "2026-10-18",
  "fonteDados": "API pública do GitHub (api.github.com) — estrelas, descrições, datas e licenças coletadas em 2026-07-15",
  "categorias": [
    {
      "id": "tokens",
      "nome": "Economia de tokens e contexto",
      "icone": "◌"
    },
    {
      "id": "programacao",
      "nome": "Programação e revisão de código",
      "icone": "⌘"
    },
    {
      "id": "multiagentes",
      "nome": "Múltiplos agentes e orquestração",
      "icone": "⬡"
    },
    {
      "id": "prompts",
      "nome": "Criação e melhoria de prompts",
      "icone": "❝"
    },
    {
      "id": "escrita",
      "nome": "Escrita e comunicação",
      "icone": "✎"
    },
    {
      "id": "pesquisa",
      "nome": "Pesquisa e análise",
      "icone": "◈"
    },
    {
      "id": "automacao",
      "nome": "Automação de tarefas",
      "icone": "⚙"
    },
    {
      "id": "documentacao",
      "nome": "Documentação",
      "icone": "▤"
    },
    {
      "id": "seguranca",
      "nome": "Segurança e auditoria",
      "icone": "◉"
    },
    {
      "id": "planejamento",
      "nome": "Planejamento e gestão de projetos",
      "icone": "▦"
    },
    {
      "id": "testes",
      "nome": "Testes e depuração",
      "icone": "✓"
    },
    {
      "id": "design",
      "nome": "Interface, UX e design",
      "icone": "◐"
    }
  ],
  "skills": [
    {
      "id": "superpowers",
      "nome": "Superpowers",
      "autor": "obra",
      "repo": "https://github.com/obra/superpowers",
      "stars": 301232,
      "atualizadoEm": "2026-10-10",
      "licenca": "MIT",
      "linguagem": "Shell",
      "categorias": [
        "programacao",
        "testes",
        "planejamento",
        "multiagentes"
      ],
      "tags": [
        "tdd",
        "workflow",
        "brainstorm",
        "subagentes",
        "metodologia",
        "git-worktree"
      ],
      "destaque": true,
      "paraQueServe": "Framework de skills que impõe uma metodologia completa de desenvolvimento: brainstorm, planejamento, TDD rigoroso, execução por subagentes e revisão final.",
      "quandoUsar": "Em qualquer feature não trivial: quando você quer que o Claude planeje antes de codar, escreva testes antes da implementação e trabalhe em etapas verificáveis em vez de gerar um bloco gigante de código de uma vez.",
      "beneficios": [
        "Reduz retrabalho: o plano é aprovado antes de qualquer linha de código",
        "TDD obrigatório — cada mudança nasce com teste que falha primeiro",
        "Skills de debugging sistemático, revisão de código e execução paralela inclusas",
        "Metodologia consistente entre sessões e entre membros do time"
      ],
      "economiaTokens": "O trabalho pesado é delegado a subagentes com contexto limpo e focado; a conversa principal guarda só o plano e as decisões, evitando inflar o contexto com diffs e logs.",
      "qualidadeRespostas": "O ciclo brainstorm → spec → plano → TDD força o modelo a raciocinar antes de agir, o que reduz alucinação de requisitos e código que 'parece pronto' mas não roda.",
      "multiAgentes": "É nativamente orientado a subagentes: cada tarefa do plano é executada por um agente isolado e revisada por outro, com o agente principal atuando como coordenador.",
      "melhorias": {
        "raciocinio": "Separa fase de pensar da fase de executar",
        "programacao": "TDD e revisão embutidos no fluxo",
        "produtividade": "Planos viram execução em lote com menos idas e vindas"
      },
      "instalacao": "No Claude Code: /plugin marketplace add obra/superpowers-marketplace e depois /plugin install superpowers@superpowers-marketplace",
      "exemploUso": "Peça 'brainstorm: quero adicionar exportação de relatórios em PDF' — a skill conduz perguntas, gera uma spec, monta o plano de implementação e executa cada etapa com testes.",
      "promptInicial": "Utilize a Skill Superpowers para executar o planejamento e a implementação desta feature com TDD, começando pelo brainstorm da especificação. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "saas",
        "backend",
        "frontend",
        "api",
        "testes",
        "planejamento",
        "mvp"
      ],
      "tipo": "skill",
      "facilidade": "medio"
    },
    {
      "id": "anthropic-skills",
      "nome": "Agent Skills (oficial Anthropic)",
      "autor": "anthropics",
      "repo": "https://github.com/anthropics/skills",
      "stars": 181797,
      "atualizadoEm": "2026-10-09",
      "licenca": "Apache-2.0 (maioria das skills)",
      "linguagem": "Python",
      "categorias": [
        "escrita",
        "documentacao",
        "programacao"
      ],
      "tags": [
        "oficial",
        "docx",
        "pptx",
        "xlsx",
        "pdf",
        "artifacts",
        "mcp-builder",
        "template"
      ],
      "destaque": true,
      "paraQueServe": "Repositório oficial da Anthropic com skills prontas para gerar e editar documentos Word, PowerPoint, Excel e PDF, criar artifacts, construir servidores MCP e mais — além da especificação e do template para criar suas próprias skills.",
      "quandoUsar": "Quando o entregável é um arquivo real (relatório .docx, planilha .xlsx, apresentação .pptx, PDF preenchido) ou quando você quer aprender o formato SKILL.md canônico para escrever skills próprias.",
      "beneficios": [
        "Mantido pela Anthropic — referência do formato oficial de skills",
        "Documentos gerados com formatação profissional, não texto colado",
        "Inclui template e especificação para criar skills do zero",
        "Funciona no Claude Code, na API e no Claude.ai"
      ],
      "economiaTokens": "Cada skill usa progressive disclosure: o modelo carrega só o SKILL.md enxuto e busca scripts e referências apenas quando precisa, em vez de manter instruções gigantes no contexto o tempo todo.",
      "qualidadeRespostas": "As skills embutem conhecimento testado de formatos complexos (OOXML, PDF), eliminando tentativa e erro do modelo com bibliotecas que ele conhece pela metade.",
      "multiAgentes": "Skills são arquivos portáveis: o mesmo conjunto pode ser dado a vários agentes/subagentes para padronizar como todos geram documentos.",
      "melhorias": {
        "escrita": "Documentos corporativos com estrutura e formatação reais",
        "produtividade": "Entregáveis prontos sem conversão manual",
        "programacao": "mcp-builder e artifacts-builder guiam código correto"
      },
      "instalacao": "No Claude Code: /plugin marketplace add anthropics/skills e instale o conjunto desejado com /plugin install — ou copie a pasta da skill para ~/.claude/skills/",
      "exemploUso": "'Gere uma proposta comercial em .docx com capa, sumário e tabela de preços a partir deste rascunho' — a skill docx produz o arquivo final formatado.",
      "promptInicial": "Utilize a Skill docx (Agent Skills da Anthropic) para executar a geração deste documento formatado. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "conteudo",
        "documentacao",
        "saas",
        "dados",
        "escritorio"
      ],
      "tipo": "colecao",
      "facilidade": "facil"
    },
    {
      "id": "ruflo",
      "nome": "Ruflo (ex Claude-Flow)",
      "autor": "ruvnet",
      "repo": "https://github.com/ruvnet/ruflo",
      "stars": 76073,
      "atualizadoEm": "2026-10-18",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "multiagentes",
        "automacao"
      ],
      "tags": [
        "swarm",
        "orquestracao",
        "hive-mind",
        "memoria",
        "mcp",
        "paralelismo"
      ],
      "destaque": true,
      "paraQueServe": "Meta-harness de orquestração que coordena enxames (swarms) de agentes Claude trabalhando em paralelo, com memória persistente, filas de tarefas e fluxos autônomos.",
      "quandoUsar": "Em tarefas grandes demais para um agente só: migrações amplas, geração de módulos independentes em paralelo, pipelines em que pesquisador, implementador e revisor precisam rodar simultaneamente.",
      "beneficios": [
        "Dezenas de agentes coordenados com topologias configuráveis",
        "Memória persistente compartilhada entre sessões e agentes",
        "Integração via MCP com Claude Code sem sair do terminal",
        "Reduz o tempo de parede de tarefas paralelizáveis"
      ],
      "economiaTokens": "Cada agente do swarm recebe apenas a fatia de contexto da sua tarefa; a memória compartilhada evita repassar o histórico completo a cada agente.",
      "qualidadeRespostas": "Papéis especializados (arquiteto, codador, revisor) avaliam o trabalho uns dos outros, criando verificação cruzada em vez de uma única opinião.",
      "multiAgentes": "É o próprio propósito da ferramenta: spawn, coordenação, consenso e monitoramento de múltiplos agentes são primitivos nativos.",
      "melhorias": {
        "raciocinio": "Decomposição explícita de problemas em subtarefas",
        "produtividade": "Execução paralela de trabalho independente",
        "analise": "Agentes de pesquisa dedicados alimentam os executores"
      },
      "instalacao": "npx ruflo@latest init (projeto renomeado de claude-flow para ruflo — confira o README para o comando atual da sua versão)",
      "exemploUso": "'Orquestre um swarm para migrar estes 40 componentes de JavaScript para TypeScript' — o orquestrador divide, distribui entre agentes paralelos e consolida os resultados.",
      "promptInicial": "Utilize a Skill Ruflo para executar a orquestração desta tarefa em múltiplos agentes paralelos com papéis definidos. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "saas",
        "multiagentes",
        "backend",
        "migracao",
        "automacao"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "context7",
      "nome": "Context7",
      "autor": "upstash",
      "repo": "https://github.com/upstash/context7",
      "stars": 63209,
      "atualizadoEm": "2026-10-17",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "documentacao",
        "tokens",
        "programacao"
      ],
      "tags": [
        "mcp",
        "docs-atualizadas",
        "bibliotecas",
        "api-reference",
        "anti-alucinacao"
      ],
      "destaque": true,
      "paraQueServe": "Servidor MCP que injeta documentação atualizada e específica da versão de milhares de bibliotecas diretamente no contexto do modelo, no momento do uso.",
      "quandoUsar": "Sempre que o código depende de frameworks que mudam rápido (Next.js, Prisma, LangChain...): o modelo para de sugerir APIs descontinuadas do treinamento e passa a usar a doc real da versão do seu projeto.",
      "beneficios": [
        "Elimina código baseado em APIs obsoletas ou inventadas",
        "Documentação sob demanda, sem abrir navegador",
        "Cobre milhares de bibliotecas com exemplos de código reais",
        "Funciona em Claude Code, Cursor, Windsurf e outros clientes MCP"
      ],
      "economiaTokens": "Traz somente os trechos de documentação relevantes para a pergunta, em vez de você colar páginas inteiras de docs no chat — e evita ciclos de tentativa/erro que queimam tokens.",
      "qualidadeRespostas": "Respostas fundamentadas na documentação oficial da versão exata, reduzindo drasticamente alucinação de métodos e parâmetros.",
      "multiAgentes": "Como servidor MCP, pode ser plugado em todos os agentes de um pipeline ao mesmo tempo, garantindo que todos consultem a mesma fonte de verdade.",
      "melhorias": {
        "programacao": "Código correto para a versão real das dependências",
        "analise": "Comparação fundamentada entre bibliotecas",
        "produtividade": "Menos depuração de APIs que não existem"
      },
      "instalacao": "claude mcp add context7 -- npx -y @upstash/context7-mcp (ou adicione ao arquivo de configuração MCP do seu cliente)",
      "exemploUso": "'use context7: como faço streaming de Server Actions no Next.js 15?' — a resposta vem baseada na doc atual do Next.js 15, não na memória do modelo.",
      "promptInicial": "Utilize a Skill Context7 para executar esta implementação consultando a documentação atualizada das bibliotecas do projeto. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "frontend",
        "backend",
        "api",
        "saas",
        "integracao",
        "documentacao"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "bmad-method",
      "nome": "BMAD-METHOD",
      "autor": "bmad-code-org",
      "repo": "https://github.com/bmad-code-org/BMAD-METHOD",
      "stars": 54268,
      "atualizadoEm": "2026-10-16",
      "licenca": "Ver repositório",
      "linguagem": "JavaScript",
      "categorias": [
        "planejamento",
        "multiagentes",
        "documentacao"
      ],
      "tags": [
        "agile",
        "prd",
        "arquitetura",
        "product-owner",
        "scrum",
        "greenfield"
      ],
      "destaque": false,
      "paraQueServe": "Metodologia ágil dirigida por agentes de IA: personas de Analista, PM, Arquiteto, Scrum Master, Dev e QA colaboram para transformar uma ideia em PRD, arquitetura e histórias implementáveis.",
      "quandoUsar": "No início de projetos (greenfield) ou de módulos grandes, quando a dor é transformar uma ideia vaga em requisitos, arquitetura e backlog executável antes de escrever código.",
      "beneficios": [
        "PRD e documento de arquitetura gerados com método, não improviso",
        "Histórias autocontidas que carregam o contexto necessário para o dev",
        "Papéis com responsabilidades claras reduzem requisitos esquecidos",
        "Funciona no Claude Code e em outras ferramentas agênticas"
      ],
      "economiaTokens": "As histórias encapsulam só o contexto necessário para cada implementação, então o agente dev não precisa reler o projeto inteiro a cada tarefa.",
      "qualidadeRespostas": "Cada persona questiona o trabalho da anterior (PM revisa analista, arquiteto revisa PM), simulando as revisões de um time real.",
      "multiAgentes": "Estruturado como time de agentes: cada papel é um agente com prompt e responsabilidade próprios, encadeados em fluxo de trabalho definido.",
      "melhorias": {
        "raciocinio": "Decomposição disciplinada de produto em épicos e histórias",
        "escrita": "PRDs e specs com estrutura profissional",
        "produtividade": "Backlog pronto para execução contínua"
      },
      "instalacao": "npx bmad-method install (instalador interativo que configura os agentes no seu projeto)",
      "exemploUso": "'Quero construir um app de agendamento para clínicas' — o fluxo BMAD conduz da análise de mercado ao PRD, à arquitetura e às histórias prontas para o agente dev implementar.",
      "promptInicial": "Utilize a Skill BMAD-METHOD para executar o planejamento completo deste produto, do levantamento de requisitos às histórias de implementação. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "saas",
        "mvp",
        "startup",
        "planejamento",
        "greenfield"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "awesome-claude-code",
      "nome": "Awesome Claude Code",
      "autor": "hesreallyhim",
      "repo": "https://github.com/hesreallyhim/awesome-claude-code",
      "stars": 55910,
      "atualizadoEm": "2026-10-18",
      "licenca": "Ver repositório",
      "linguagem": "Python",
      "categorias": [
        "pesquisa",
        "documentacao"
      ],
      "tags": [
        "awesome-list",
        "curadoria",
        "comandos",
        "hooks",
        "workflows",
        "claude-md"
      ],
      "destaque": false,
      "paraQueServe": "Curadoria contínua dos melhores recursos do ecossistema Claude Code: skills, comandos slash, hooks, arquivos CLAUDE.md exemplares, integrações e workflows testados pela comunidade.",
      "quandoUsar": "Quando você precisa descobrir se já existe uma solução pronta para o seu problema antes de construir do zero — ou quer referências de CLAUDE.md e comandos bem escritos para copiar.",
      "beneficios": [
        "Atualizado quase diariamente pela comunidade",
        "Filtra ruído: só entra recurso avaliado",
        "Ótima fonte de exemplos reais de CLAUDE.md e slash commands",
        "Ponto de partida para montar seu toolkit pessoal"
      ],
      "economiaTokens": "Aproveitar um comando ou skill já otimizado pela comunidade evita sessões longas de tentativa e erro construindo o seu.",
      "qualidadeRespostas": "Os recursos listados seguem boas práticas consolidadas, elevando o padrão das suas configurações e prompts.",
      "multiAgentes": "Indexa coleções de subagentes e ferramentas de orquestração, servindo de mapa para montar seu pipeline multiagente.",
      "melhorias": {
        "produtividade": "Descoberta rápida de soluções prontas",
        "programacao": "Padrões de configuração testados em produção"
      },
      "instalacao": "Não requer instalação: navegue pelo README e instale os recursos individuais que escolher, cada um com instruções próprias.",
      "exemploUso": "Procurando automatizar changelogs, você encontra na lista um slash command pronto, copia para .claude/commands/ e usa no minuto seguinte.",
      "promptInicial": "Utilize a Skill Awesome Claude Code para executar uma pesquisa dos recursos existentes que resolvem esta necessidade antes de construir algo novo. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "pesquisa",
        "produtividade",
        "cli",
        "configuracao"
      ],
      "tipo": "colecao",
      "facilidade": "facil"
    },
    {
      "id": "claude-cookbooks",
      "nome": "Claude Cookbooks",
      "autor": "anthropics",
      "repo": "https://github.com/anthropics/claude-cookbooks",
      "stars": 53529,
      "atualizadoEm": "2026-10-17",
      "licenca": "MIT",
      "linguagem": "Jupyter Notebook",
      "categorias": [
        "pesquisa",
        "programacao",
        "prompts"
      ],
      "tags": [
        "oficial",
        "rag",
        "tool-use",
        "avaliacao",
        "embeddings",
        "visao",
        "notebooks"
      ],
      "destaque": false,
      "paraQueServe": "Coleção oficial de notebooks com receitas testadas para construir com a API do Claude: RAG, uso de ferramentas, subagentes, análise de PDFs e imagens, avaliação automática e classificação.",
      "quandoUsar": "Quando for implementar um padrão conhecido (RAG, roteamento, avaliador, extração estruturada) e quiser partir de código de referência da própria Anthropic em vez de descobrir a arquitetura sozinho.",
      "beneficios": [
        "Código executável e comentado, não pseudo-exemplos",
        "Padrões de arquitetura validados pela Anthropic",
        "Cobre do prompt básico a pipelines multimodais",
        "Base excelente para provas de conceito rápidas"
      ],
      "economiaTokens": "As receitas ensinam padrões eficientes (caching, chunking, roteamento para modelos menores) que reduzem o custo por chamada em produção.",
      "qualidadeRespostas": "Inclui receitas de avaliação e guardrails que ensinam a medir e melhorar sistematicamente a qualidade das saídas.",
      "multiAgentes": "Traz notebooks específicos de orquestração com subagentes e roteamento entre modelos, prontos para adaptar.",
      "melhorias": {
        "analise": "Pipelines de análise de documentos e dados prontos",
        "raciocinio": "Padrões de decomposição e avaliação de respostas",
        "programacao": "Integração correta com a API e tool use"
      },
      "instalacao": "git clone https://github.com/anthropics/claude-cookbooks.git e execute os notebooks com Jupyter (requer chave da API Anthropic)",
      "exemploUso": "Para adicionar busca semântica ao seu produto, adapte o notebook de RAG com citações: chunking, embeddings e prompt de resposta já vêm resolvidos.",
      "promptInicial": "Utilize a Skill Claude Cookbooks para executar a implementação deste padrão de IA partindo da receita oficial correspondente. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "dados",
        "api",
        "integracao",
        "pesquisa",
        "ia"
      ],
      "tipo": "curso",
      "facilidade": "tecnico"
    },
    {
      "id": "wshobson-agents",
      "nome": "Agents (wshobson)",
      "autor": "wshobson",
      "repo": "https://github.com/wshobson/agents",
      "stars": 40975,
      "atualizadoEm": "2026-10-17",
      "licenca": "MIT",
      "linguagem": "Python",
      "categorias": [
        "programacao",
        "multiagentes",
        "seguranca"
      ],
      "tags": [
        "subagentes",
        "marketplace",
        "especialistas",
        "code-review",
        "arquitetura",
        "plugins"
      ],
      "destaque": true,
      "paraQueServe": "Marketplace de plugins com dezenas de subagentes especialistas prontos — arquiteto backend, revisor de código, auditor de segurança, engenheiro de performance, especialistas por linguagem — que o Claude Code aciona automaticamente conforme a tarefa.",
      "quandoUsar": "Quando você quer opiniões de especialista sob demanda: revisão de segurança num PR, tuning de SQL, decisão de arquitetura — sem escrever você mesmo o prompt de cada persona.",
      "beneficios": [
        "Cobertura ampla: linguagens, infra, dados, segurança, qualidade",
        "Delegação automática: o agente certo assume a tarefa certa",
        "Prompts de persona mantidos e refinados pela comunidade",
        "Instalável como plugin em um comando"
      ],
      "economiaTokens": "Cada subagente roda com contexto isolado e enxuto da sua especialidade, em vez de um agente único carregando instruções de todas as disciplinas ao mesmo tempo.",
      "qualidadeRespostas": "Personas com escopo restrito produzem análises mais profundas que um generalista — o revisor de segurança só pensa em segurança.",
      "multiAgentes": "Feito para orquestração: os subagentes podem ser combinados em fluxos (arquiteto → implementador → revisor) dentro do Claude Code.",
      "melhorias": {
        "programacao": "Revisões e implementações por especialista",
        "analise": "Auditorias focadas por disciplina",
        "produtividade": "Delegação sem configurar personas manualmente"
      },
      "instalacao": "No Claude Code: /plugin marketplace add wshobson/agents e instale os agentes desejados — ou clone o repositório para ~/.claude/agents",
      "exemploUso": "Ao pedir 'revise a segurança deste endpoint de upload', o subagente security-auditor assume e devolve análise de vulnerabilidades com correções sugeridas.",
      "promptInicial": "Utilize a Skill Agents (wshobson) para executar esta tarefa delegando ao subagente especialista adequado. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "saas",
        "backend",
        "frontend",
        "api",
        "seguranca",
        "multiagentes",
        "revisao"
      ],
      "tipo": "skill",
      "facilidade": "medio"
    },
    {
      "id": "prompt-eng-tutorial",
      "nome": "Prompt Engineering Interactive Tutorial",
      "autor": "anthropics",
      "repo": "https://github.com/anthropics/prompt-eng-interactive-tutorial",
      "stars": 38623,
      "atualizadoEm": "2026-03-01",
      "licenca": "Ver repositório",
      "linguagem": "Jupyter Notebook",
      "categorias": [
        "prompts",
        "pesquisa"
      ],
      "tags": [
        "oficial",
        "curso",
        "few-shot",
        "chain-of-thought",
        "xml-tags",
        "exercicios"
      ],
      "destaque": false,
      "paraQueServe": "Curso interativo oficial da Anthropic, em 9 capítulos com exercícios práticos, que ensina a construir prompts robustos: papéis, exemplos, raciocínio passo a passo, tags XML e prevenção de alucinação.",
      "quandoUsar": "Quando seus prompts funcionam 'às vezes': o curso ensina a diagnosticar por que um prompt falha e a estruturá-lo para ser confiável — essencial antes de colocar prompts em produção.",
      "beneficios": [
        "Material oficial: as técnicas que a própria Anthropic recomenda",
        "Exercícios com correção automática, não só teoria",
        "Do básico ao avançado (prompts encadeados e com ferramentas)",
        "Aplicável a qualquer produto construído sobre a API"
      ],
      "economiaTokens": "Prompts bem estruturados acertam na primeira tentativa com mais frequência, cortando os ciclos de reformulação que multiplicam o consumo.",
      "qualidadeRespostas": "É literalmente um curso sobre isso: cada capítulo ataca uma causa comum de resposta ruim e ensina a correção estrutural.",
      "multiAgentes": "Prompts de sistema bem escritos são a base de qualquer persona de agente; o capítulo de encadeamento se aplica diretamente a pipelines multiagente.",
      "melhorias": {
        "escrita": "Instruções claras e não ambíguas",
        "raciocinio": "Uso correto de chain-of-thought e decomposição",
        "prompts": "Domínio das técnicas fundamentais"
      },
      "instalacao": "git clone https://github.com/anthropics/prompt-eng-interactive-tutorial.git e abra os notebooks — ou use a versão em Google Sheets indicada no README",
      "exemploUso": "No capítulo de few-shot, você reescreve um prompt de classificação que errava 30% dos casos e vê a taxa cair adicionando 3 exemplos bem escolhidos.",
      "promptInicial": "Utilize a Skill Prompt Engineering Interactive Tutorial para executar a revisão e o aprimoramento dos prompts deste projeto aplicando as técnicas do curso. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "prompts",
        "ia",
        "api",
        "produto-ia"
      ],
      "tipo": "curso",
      "facilidade": "facil"
    },
    {
      "id": "claude-code-router",
      "nome": "Claude Code Router",
      "autor": "musistudio",
      "repo": "https://github.com/musistudio/claude-code-router",
      "stars": 37722,
      "atualizadoEm": "2026-10-10",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "tokens",
        "automacao"
      ],
      "tags": [
        "roteamento",
        "multi-modelo",
        "custo",
        "proxy",
        "background-tasks"
      ],
      "destaque": false,
      "paraQueServe": "Camada de roteamento local que direciona cada requisição do Claude Code para o modelo mais adequado: tarefas pesadas para modelos fortes, tarefas triviais (background, resumo) para modelos baratos ou locais.",
      "quandoUsar": "Quando a conta de tokens importa: uso intenso diário, times com orçamento, ou quando você quer usar modelos diferentes por tipo de tarefa sem trocar de ferramenta.",
      "beneficios": [
        "Corte real de custo roteando tarefas simples para modelos baratos",
        "Suporte a múltiplos provedores e modelos locais",
        "Regras de roteamento configuráveis por tipo de tarefa",
        "Transparente: o fluxo do Claude Code não muda"
      ],
      "economiaTokens": "É o propósito central: tarefas de fundo e utilitárias deixam de consumir o modelo premium, e você paga o modelo caro só onde ele faz diferença.",
      "qualidadeRespostas": "Preserva o modelo mais capaz para o raciocínio difícil — a qualidade onde importa não é sacrificada pela economia.",
      "multiAgentes": "Em pipelines multiagente, permite dar a cada agente o modelo do seu porte: orquestrador forte, executores econômicos.",
      "instalacao": "npm install -g @musistudio/claude-code-router e inicie com ccr code (configure provedores em ~/.claude-code-router/config.json)",
      "exemploUso": "Você configura tarefas de background para um modelo local e mantém o principal para codar: a fatura mensal cai sem mudança perceptível no dia a dia.",
      "melhorias": {
        "produtividade": "Mesmo fluxo de trabalho com custo menor",
        "analise": "Visibilidade de qual modelo atende cada tarefa"
      },
      "promptInicial": "Utilize a Skill Claude Code Router para executar a configuração de roteamento de modelos deste ambiente, otimizando custo por tipo de tarefa. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "custo",
        "contexto",
        "automacao",
        "time"
      ],
      "tipo": "ferramenta",
      "facilidade": "tecnico"
    },
    {
      "id": "claude-code-templates",
      "nome": "Claude Code Templates",
      "autor": "davila7",
      "repo": "https://github.com/davila7/claude-code-templates",
      "stars": 32713,
      "atualizadoEm": "2026-10-18",
      "licenca": "MIT",
      "linguagem": "Python",
      "categorias": [
        "automacao",
        "programacao",
        "tokens"
      ],
      "tags": [
        "cli",
        "templates",
        "analytics",
        "hooks",
        "comandos",
        "setup"
      ],
      "destaque": false,
      "paraQueServe": "CLI que instala em segundos centenas de componentes prontos para o Claude Code — agentes, comandos, hooks, MCPs e configurações por framework — além de um dashboard local de analytics das suas sessões.",
      "quandoUsar": "Ao configurar o Claude Code num projeto novo (React, Django, Rails...) ou quando quiser monitorar uso, custo e desempenho das suas sessões em um painel local.",
      "beneficios": [
        "Setup de projeto em um comando, com boas práticas por stack",
        "Catálogo navegável de agentes e comandos da comunidade",
        "Dashboard de analytics local (uso, custos, histórico)",
        "Health check da sua instalação do Claude Code"
      ],
      "economiaTokens": "O dashboard expõe onde seus tokens estão sendo gastos, e as configurações por framework evitam contexto desnecessário nos prompts do projeto.",
      "qualidadeRespostas": "Templates de CLAUDE.md e comandos por stack dão ao modelo o contexto certo do framework desde a primeira mensagem.",
      "multiAgentes": "Instala coleções de subagentes prontas e permite combiná-las por projeto.",
      "melhorias": {
        "produtividade": "Onboarding de projeto instantâneo",
        "analise": "Métricas reais das suas sessões",
        "programacao": "Configurações otimizadas por framework"
      },
      "instalacao": "npx claude-code-templates@latest (assistente interativo; use --analytics para o dashboard local)",
      "exemploUso": "Num projeto Django novo: npx claude-code-templates@latest, escolha o template Django e ganhe CLAUDE.md, comandos e hooks calibrados para a stack.",
      "promptInicial": "Utilize a Skill Claude Code Templates para executar a configuração inicial deste projeto com os templates adequados à stack. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "setup",
        "frontend",
        "backend",
        "produtividade",
        "custo"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "awesome-agent-skills",
      "nome": "Awesome Agent Skills",
      "autor": "VoltAgent",
      "repo": "https://github.com/VoltAgent/awesome-agent-skills",
      "stars": 35900,
      "atualizadoEm": "2026-10-15",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "pesquisa",
        "documentacao"
      ],
      "tags": [
        "awesome-list",
        "skills-oficiais",
        "curadoria",
        "vercel",
        "stripe",
        "cloudflare"
      ],
      "destaque": true,
      "paraQueServe": "Maior diretório curado de skills de agentes: mais de 1.000 skills, incluindo as publicadas oficialmente por times como Anthropic, Vercel, Stripe, Cloudflare, Sentry e Figma, organizadas por categoria.",
      "quandoUsar": "Como primeiro lugar para procurar uma skill antes de escrever a sua: se você integra com um serviço grande, provavelmente já existe skill oficial do próprio time listada aqui.",
      "beneficios": [
        "Skills oficiais de fornecedores reunidas num só índice",
        "Compatível com Claude Code, Codex, Gemini CLI, Cursor e outros",
        "Organização por categoria facilita descoberta",
        "Atualização frequente pela comunidade"
      ],
      "economiaTokens": "Skills oficiais bem escritas usam progressive disclosure e instruções enxutas — usar uma pronta evita você manter blocos de instrução verbosos no seu CLAUDE.md.",
      "qualidadeRespostas": "Skills mantidas pelos próprios fornecedores refletem o jeito correto e atual de usar cada plataforma.",
      "multiAgentes": "O formato de skill é portável entre agentes: o índice serve de catálogo para equipar frotas inteiras de agentes com as mesmas capacidades.",
      "melhorias": {
        "produtividade": "Descoberta imediata de skills prontas",
        "programacao": "Integrações pelo caminho recomendado do fornecedor"
      },
      "instalacao": "Não requer instalação: navegue pelo índice e siga as instruções da skill escolhida (em geral, copiar a pasta para .claude/skills/ ou instalar via plugin).",
      "exemploUso": "Precisa integrar pagamentos? A skill oficial da Stripe listada no índice ensina o agente a usar a API atual, com os fluxos recomendados pelo próprio time da Stripe.",
      "promptInicial": "Utilize a Skill Awesome Agent Skills para executar a busca da skill mais adequada a esta integração antes de implementá-la manualmente. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "integracao",
        "api",
        "pesquisa",
        "saas"
      ],
      "tipo": "colecao",
      "facilidade": "facil"
    },
    {
      "id": "claude-task-master",
      "nome": "Task Master",
      "autor": "eyaltoledano",
      "repo": "https://github.com/eyaltoledano/claude-task-master",
      "stars": 28238,
      "atualizadoEm": "2026-04-28",
      "licenca": "MIT com Commons Clause",
      "linguagem": "JavaScript",
      "categorias": [
        "planejamento",
        "automacao"
      ],
      "tags": [
        "prd",
        "tarefas",
        "backlog",
        "mcp",
        "dependencias",
        "roadmap"
      ],
      "destaque": false,
      "paraQueServe": "Sistema de gestão de tarefas por IA: converte um PRD em backlog estruturado com dependências, prioridades e subtarefas, e alimenta o agente com a próxima tarefa certa a cada passo.",
      "quandoUsar": "Em projetos com dezenas de tarefas interdependentes, quando o agente começa a se perder no que já foi feito e no que vem a seguir — o Task Master vira a memória de trabalho do projeto.",
      "beneficios": [
        "PRD → backlog executável automaticamente",
        "Grafo de dependências evita implementar na ordem errada",
        "Integra por MCP com Claude Code, Cursor e outros",
        "Expansão de tarefas complexas em subtarefas sob demanda"
      ],
      "economiaTokens": "O agente recebe apenas a tarefa atual com seu contexto, em vez de reprocessar o plano inteiro do projeto a cada sessão.",
      "qualidadeRespostas": "Tarefas pequenas e bem definidas produzem implementações mais corretas que pedidos amplos e ambíguos.",
      "multiAgentes": "O backlog compartilhado permite que vários agentes puxem tarefas independentes em paralelo sem colidir.",
      "melhorias": {
        "produtividade": "Fluxo contínuo: sempre há uma próxima tarefa clara",
        "raciocinio": "Dependências explícitas entre partes do sistema",
        "analise": "Visão de progresso e complexidade do projeto"
      },
      "instalacao": "npm i -g task-master-ai e task-master init — ou adicione como servidor MCP no seu editor (ver README)",
      "exemploUso": "task-master parse-prd ./prd.txt gera o backlog; a cada 'próxima tarefa', o agente recebe a tarefa desbloqueada de maior prioridade com contexto para implementá-la.",
      "promptInicial": "Utilize a Skill Task Master para executar a decomposição deste PRD em tarefas com dependências e conduzir a implementação tarefa a tarefa. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "saas",
        "mvp",
        "planejamento",
        "backend",
        "frontend"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "superclaude",
      "nome": "SuperClaude Framework",
      "autor": "SuperClaude-Org",
      "repo": "https://github.com/SuperClaude-Org/SuperClaude_Framework",
      "stars": 23905,
      "atualizadoEm": "2026-09-27",
      "licenca": "MIT",
      "linguagem": "Python",
      "categorias": [
        "prompts",
        "programacao",
        "multiagentes"
      ],
      "tags": [
        "personas",
        "comandos",
        "metodologia",
        "flags",
        "configuracao"
      ],
      "destaque": false,
      "paraQueServe": "Framework de configuração que adiciona ao Claude Code comandos especializados, personas cognitivas (arquiteto, analista, mentor, refatorador...) e metodologias de trabalho acionáveis por flags.",
      "quandoUsar": "Quando você repete os mesmos tipos de pedido e quer transformá-los em comandos consistentes — ou quer alternar o 'modo de pensar' do modelo (profundidade, persona, formato) sem reescrever prompts.",
      "beneficios": [
        "Dezenas de comandos prontos para fluxos comuns de engenharia",
        "Personas mudam a perspectiva de análise com uma flag",
        "Padroniza a interação do time inteiro com o Claude Code",
        "Instalação gerenciada com perfis e atualizações"
      ],
      "economiaTokens": "Comandos e personas encapsulam instruções longas que você deixaria de repetir em toda conversa; inclui modos de resposta compactos.",
      "qualidadeRespostas": "Cada persona aplica critérios da sua disciplina, produzindo análises mais focadas do que um prompt genérico.",
      "multiAgentes": "As personas funcionam como especialistas encadeáveis: analista investiga, arquiteto propõe, refatorador executa.",
      "melhorias": {
        "prompts": "Prompts complexos viram comandos reutilizáveis",
        "raciocinio": "Modos de análise profunda sob demanda",
        "programacao": "Fluxos padronizados de implementação e revisão"
      },
      "instalacao": "pipx install SuperClaude e SuperClaude install (ou pip install SuperClaude; veja o README para o instalador interativo)",
      "exemploUso": "/sc:analyze --persona-architect no seu backend devolve análise arquitetural estruturada; /sc:improve aplica refatorações com a persona de qualidade.",
      "promptInicial": "Utilize a Skill SuperClaude Framework para executar esta análise com a persona e o comando adequados ao objetivo. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "prompts",
        "produtividade",
        "time",
        "revisao"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "awesome-cc-subagents",
      "nome": "Awesome Claude Code Subagents",
      "autor": "VoltAgent",
      "repo": "https://github.com/VoltAgent/awesome-claude-code-subagents",
      "stars": 25797,
      "atualizadoEm": "2026-10-11",
      "licenca": "MIT",
      "linguagem": "Shell",
      "categorias": [
        "multiagentes",
        "programacao"
      ],
      "tags": [
        "subagentes",
        "colecao",
        "especialistas",
        "categorias",
        "production-ready"
      ],
      "destaque": false,
      "paraQueServe": "Coleção de mais de 100 subagentes especializados e categorizados — de engenharia de dados a DevOps, de revisão de código a produto — prontos para copiar para o seu Claude Code.",
      "quandoUsar": "Quando você precisa de um especialista pontual (ex.: revisor de Terraform, analista de dados, engenheiro de acessibilidade) e quer um prompt de subagente maduro em vez de escrever o seu do zero.",
      "beneficios": [
        "Mais de 100 personas prontas, organizadas por área",
        "Formato padrão de subagente do Claude Code (arquivos .md)",
        "Fácil de personalizar: edite o markdown e pronto",
        "Boa cobertura de nichos (SRE, dados, mobile, QA...)"
      ],
      "economiaTokens": "Subagentes rodam em contexto separado: a investigação pesada acontece fora da conversa principal e só o resultado volta.",
      "qualidadeRespostas": "Prompts de persona refinados pela comunidade extraem análises mais profundas por disciplina.",
      "multiAgentes": "É uma biblioteca de peças para montar seu time de agentes: escolha, combine e encadeie os especialistas necessários.",
      "melhorias": {
        "programacao": "Especialistas por linguagem e plataforma",
        "analise": "Personas dedicadas a dados e investigação",
        "produtividade": "Time de especialistas montado em minutos"
      },
      "instalacao": "Clone o repositório e copie os subagentes desejados para .claude/agents/ do projeto (ou ~/.claude/agents/ para uso global).",
      "exemploUso": "Copie database-optimizer.md para .claude/agents/ e peça 'otimize as queries lentas do relatório' — o subagente assume com prompt de DBA.",
      "promptInicial": "Utilize a Skill Awesome Claude Code Subagents para executar esta tarefa acionando o subagente especialista correspondente. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "multiagentes",
        "backend",
        "devops",
        "dados",
        "revisao"
      ],
      "tipo": "colecao",
      "facilidade": "medio"
    },
    {
      "id": "alireza-claude-skills",
      "nome": "Claude Skills (alirezarezvani)",
      "autor": "alirezarezvani",
      "repo": "https://github.com/alirezarezvani/claude-skills",
      "stars": 28333,
      "atualizadoEm": "2026-08-26",
      "licenca": "MIT",
      "linguagem": "Python",
      "categorias": [
        "escrita",
        "automacao",
        "programacao"
      ],
      "tags": [
        "colecao",
        "marketing",
        "produto",
        "compliance",
        "negocios",
        "multi-dominio"
      ],
      "destaque": false,
      "paraQueServe": "Biblioteca com centenas de skills, agentes e comandos cobrindo além de engenharia: marketing, produto, compliance, finanças, operações e produtividade pessoal — para usar o Claude como equipe multidisciplinar.",
      "quandoUsar": "Quando o trabalho vai além do código: escrever material de lançamento, revisar contrato sob um checklist, montar análise financeira ou padronizar processos de negócio com o mesmo agente que desenvolve.",
      "beneficios": [
        "Cobertura rara de domínios de negócio, não só engenharia",
        "Centenas de skills organizadas e documentadas",
        "Compatível com Claude Code e outros agentes de código",
        "Referências e scripts personalizáveis por skill"
      ],
      "economiaTokens": "Skills por domínio carregam só o conhecimento da área na hora do uso, no padrão de progressive disclosure do formato oficial.",
      "qualidadeRespostas": "Checklists e critérios embutidos por área (ex.: compliance) tornam as saídas auditáveis em vez de genéricas.",
      "multiAgentes": "Inclui agentes prontos por função que podem compor um 'time virtual' de produto, marketing e engenharia.",
      "melhorias": {
        "escrita": "Conteúdo de marketing e comunicação com método",
        "analise": "Frameworks de análise de negócio prontos",
        "produtividade": "Um só ambiente para tarefas técnicas e de negócio"
      },
      "instalacao": "Clone o repositório e copie as skills desejadas para .claude/skills/ (o README traz a estrutura e opções de instalação por agente).",
      "exemploUso": "Com a skill de lançamento de produto, peça o kit completo de um release: anúncio, changelog, e-mail e post — todos seguindo o mesmo tom e estrutura.",
      "promptInicial": "Utilize a Skill Claude Skills (alirezarezvani) para executar esta tarefa com a skill do domínio correspondente. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "conteudo",
        "startup",
        "produto",
        "escritorio",
        "automacao"
      ],
      "tipo": "colecao",
      "facilidade": "medio"
    },
    {
      "id": "n8n-mcp",
      "nome": "n8n-MCP",
      "autor": "czlonkowski",
      "repo": "https://github.com/czlonkowski/n8n-mcp",
      "stars": 23095,
      "atualizadoEm": "2026-10-15",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "automacao",
        "documentacao"
      ],
      "tags": [
        "n8n",
        "workflows",
        "mcp",
        "integracao",
        "no-code"
      ],
      "destaque": false,
      "paraQueServe": "Servidor MCP que dá ao Claude conhecimento profundo dos nós do n8n (documentação, propriedades, operações) para construir e validar workflows de automação por conversa.",
      "quandoUsar": "Quando você automatiza processos com n8n: em vez de montar workflows nó a nó na interface, descreve o processo e o Claude gera o workflow correto, com os nós e parâmetros certos.",
      "beneficios": [
        "Cobre centenas de nós do n8n com documentação estruturada",
        "Valida configurações antes de você importar o workflow",
        "Acelera integrações entre sistemas sem escrever código",
        "Funciona com Claude Desktop, Claude Code, Cursor e outros"
      ],
      "economiaTokens": "O servidor entrega só a documentação do nó em uso, dispensando colar manuais do n8n no chat.",
      "qualidadeRespostas": "Com o schema real de cada nó em mãos, o modelo para de inventar propriedades e gera workflows que importam sem erro.",
      "multiAgentes": "Workflows n8n gerados podem orquestrar chamadas a outros agentes e serviços, virando a camada de automação do seu sistema multiagente.",
      "melhorias": {
        "produtividade": "Automações prontas a partir de descrição em linguagem natural",
        "analise": "Explicação de workflows existentes nó a nó"
      },
      "instalacao": "claude mcp add n8n-mcp -- npx n8n-mcp (configure as variáveis do seu n8n conforme o README para recursos de gestão)",
      "exemploUso": "'Crie um workflow: novo lead no formulário → valida e-mail → cria card no CRM → notifica no Slack' — o JSON do workflow sai pronto para importar.",
      "promptInicial": "Utilize a Skill n8n-MCP para executar a criação deste workflow de automação com os nós e parâmetros corretos. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "automacao",
        "integracao",
        "no-code",
        "api"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "ccusage",
      "nome": "ccusage",
      "autor": "ccusage",
      "repo": "https://github.com/ccusage/ccusage",
      "stars": 19045,
      "atualizadoEm": "2026-10-18",
      "licenca": "Ver repositório",
      "linguagem": "Rust",
      "categorias": [
        "tokens"
      ],
      "tags": [
        "cli",
        "custos",
        "relatorios",
        "monitoramento",
        "jsonl"
      ],
      "destaque": false,
      "paraQueServe": "CLI que analisa os logs locais do Claude Code e mostra relatórios de consumo de tokens e custo estimado por dia, sessão, projeto e janela de billing.",
      "quandoUsar": "Quando você quer saber para onde os tokens estão indo: qual projeto consome mais, quanto custaria em API o seu uso do plano, e se o ritmo atual vai estourar o limite da janela.",
      "beneficios": [
        "Zero configuração: roda direto sobre os logs locais",
        "Relatórios por dia, sessão, projeto e blocos de 5h",
        "Modo live para acompanhar a sessão em tempo real",
        "Rápido e leve"
      ],
      "economiaTokens": "Medir é o primeiro passo para economizar: os relatórios revelam sessões e padrões de uso desperdiçadores para você ajustar o fluxo.",
      "qualidadeRespostas": "Não altera as respostas — atua na camada de observabilidade do seu consumo.",
      "multiAgentes": "Em uso intenso com subagentes, mostra o custo real dos pipelines e ajuda a decidir onde vale usar modelos menores.",
      "melhorias": {
        "analise": "Visibilidade objetiva de consumo e custo",
        "produtividade": "Decisões de uso baseadas em dados"
      },
      "instalacao": "npx ccusage@latest (ou instale globalmente; subcomandos: daily, monthly, session, blocks --live)",
      "exemploUso": "npx ccusage blocks --live durante uma sessão pesada mostra o consumo da janela atual e a projeção de estouro antes que aconteça.",
      "promptInicial": "Utilize a Skill ccusage para executar uma análise do consumo de tokens deste ambiente e identificar os maiores focos de custo. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "custo",
        "contexto",
        "time"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "figma-context-mcp",
      "nome": "Figma Context MCP (Framelink)",
      "autor": "GLips",
      "repo": "https://github.com/GLips/Figma-Context-MCP",
      "stars": 16001,
      "atualizadoEm": "2026-07-03",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "design",
        "programacao"
      ],
      "tags": [
        "figma",
        "design-to-code",
        "mcp",
        "layout",
        "ui"
      ],
      "destaque": false,
      "paraQueServe": "Servidor MCP que entrega ao agente os dados estruturados de layout do Figma (hierarquia, espaçamentos, cores, tipografia) simplificados para implementação fiel de telas.",
      "quandoUsar": "Sempre que for implementar uma tela a partir de um design no Figma: cole o link do frame e o agente implementa com as medidas reais, em vez de adivinhar a partir de um screenshot.",
      "beneficios": [
        "Implementação fiel ao design em uma passada",
        "Dados de design limpos e reduzidos ao que importa para código",
        "Menos ciclos de 'ajusta o espaçamento' com o designer",
        "Funciona com Claude Code, Cursor e outros clientes MCP"
      ],
      "economiaTokens": "Simplifica e filtra a resposta da API do Figma antes de entregá-la ao modelo — contexto de design enxuto em vez do JSON bruto gigante do Figma.",
      "qualidadeRespostas": "Com valores exatos de espaçamento, cor e fonte, o código sai pixel-perfect sem inferência visual imprecisa.",
      "multiAgentes": "O agente de UI consome o Figma enquanto outros cuidam de lógica e testes — cada um com o contexto da sua camada.",
      "melhorias": {
        "programacao": "UI implementada com medidas reais do design",
        "produtividade": "Design-to-code em minutos",
        "analise": "Auditoria de consistência entre design e código"
      },
      "instalacao": "claude mcp add figma -- npx -y figma-developer-mcp --stdio (requer FIGMA_API_KEY; veja o README do Framelink)",
      "exemploUso": "'Implemente este frame em React com Tailwind: [link do Figma]' — o componente sai com os tokens de espaçamento e cor exatos do design.",
      "promptInicial": "Utilize a Skill Figma Context MCP para executar a implementação desta tela a partir dos dados reais do design no Figma. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "frontend",
        "design",
        "mobile",
        "saas"
      ],
      "tipo": "ferramenta",
      "facilidade": "tecnico"
    },
    {
      "id": "contains-studio-agents",
      "nome": "Contains Studio Agents",
      "autor": "contains-studio",
      "repo": "https://github.com/contains-studio/agents",
      "stars": 12420,
      "atualizadoEm": "2025-07-28",
      "licenca": "Ver repositório",
      "linguagem": "Markdown",
      "categorias": [
        "design",
        "multiagentes",
        "planejamento"
      ],
      "tags": [
        "estudio",
        "produto",
        "ux",
        "marketing",
        "prototipagem",
        "sprint"
      ],
      "destaque": false,
      "paraQueServe": "Agentes organizados como departamentos de um estúdio de produto — design, engenharia, marketing, produto, operações e testes — voltados a prototipagem e lançamento rápidos.",
      "quandoUsar": "Em fase de descoberta e prototipagem: validar uma ideia em dias, com agente de UX desenhando fluxo, agente de brand definindo tom e agente de growth planejando lançamento.",
      "beneficios": [
        "Perspectiva de produto completa, não só engenharia",
        "Agentes de design com critérios de UX explícitos",
        "Formato .md simples de adaptar à sua marca",
        "Pensado para ciclos rápidos de sprint"
      ],
      "economiaTokens": "Cada agente carrega apenas o playbook do seu departamento, mantendo os contextos curtos e específicos.",
      "qualidadeRespostas": "Critérios de cada disciplina (heurísticas de UX, frameworks de growth) embutidos nos prompts elevam o nível das entregas.",
      "multiAgentes": "Modelo mental de estúdio: os departamentos colaboram como um time multidisciplinar de verdade.",
      "melhorias": {
        "escrita": "Copy e branding com direção consistente",
        "analise": "Feedback de UX estruturado por heurísticas",
        "produtividade": "Sprint de produto com todas as funções cobertas"
      },
      "instalacao": "Clone o repositório e copie as pastas de agentes desejadas para ~/.claude/agents/ (instruções no README).",
      "exemploUso": "Com o agente de UX research, peça 'avalie o fluxo de onboarding' e receba análise heurística com pontos de fricção priorizados.",
      "promptInicial": "Utilize a Skill Contains Studio Agents para executar esta etapa acionando o agente do departamento adequado. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "design",
        "mvp",
        "startup",
        "produto",
        "conteudo"
      ],
      "tipo": "colecao",
      "facilidade": "medio"
    },
    {
      "id": "claude-context",
      "nome": "Claude Context",
      "autor": "zilliztech",
      "repo": "https://github.com/zilliztech/claude-context",
      "stars": 12621,
      "atualizadoEm": "2026-07-14",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "tokens",
        "pesquisa",
        "programacao"
      ],
      "tags": [
        "busca-semantica",
        "embeddings",
        "vector-db",
        "codebase",
        "mcp",
        "indexacao"
      ],
      "destaque": false,
      "paraQueServe": "MCP de busca semântica de código: indexa o repositório inteiro em um banco vetorial e permite ao agente achar os trechos relevantes por significado, sem carregar a codebase no contexto.",
      "quandoUsar": "Em monorepos e codebases grandes, quando grep não basta ('onde tratamos retry de pagamento?') e carregar dezenas de arquivos no contexto seria caro ou impossível.",
      "beneficios": [
        "Busca por intenção, não só por texto exato",
        "Indexação incremental via merkle tree (só reindexa o que mudou)",
        "Escala para codebases de milhões de linhas",
        "Integra com Claude Code, Gemini CLI e outros via MCP"
      ],
      "economiaTokens": "Argumento central do projeto: em vez de encher o contexto com arquivos, o agente recupera só os trechos semanticamente relevantes — corte drástico de tokens em repositórios grandes.",
      "qualidadeRespostas": "O agente responde com base no código real relacionado, incluindo implementações que ele não teria encontrado por nome.",
      "multiAgentes": "O índice vetorial é compartilhável: todos os agentes do pipeline consultam a mesma base de conhecimento do código.",
      "melhorias": {
        "analise": "Compreensão de codebases grandes por semântica",
        "programacao": "Mudanças informadas por todo código relacionado",
        "produtividade": "Menos tempo procurando onde mexer"
      },
      "instalacao": "Adicione como MCP: npx @zilliz/claude-context-mcp@latest (requer chave de embedding — ex. OpenAI — e um Milvus/Zilliz Cloud; veja o README)",
      "exemploUso": "'Encontre onde aplicamos regras de desconto e me explique o fluxo' — a busca semântica retorna os trechos certos mesmo sem você saber os nomes dos arquivos.",
      "promptInicial": "Utilize a Skill Claude Context para executar a localização semântica do código relevante antes de qualquer modificação. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "backend",
        "monorepo",
        "contexto",
        "banco-de-dados",
        "legado"
      ],
      "tipo": "ferramenta",
      "facilidade": "tecnico"
    },
    {
      "id": "cc-usage-monitor",
      "nome": "Claude Code Usage Monitor",
      "autor": "Maciek-roboblog",
      "repo": "https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor",
      "stars": 8747,
      "atualizadoEm": "2026-07-05",
      "licenca": "MIT",
      "linguagem": "Python",
      "categorias": [
        "tokens"
      ],
      "tags": [
        "monitor",
        "tempo-real",
        "previsao",
        "limites",
        "terminal"
      ],
      "destaque": false,
      "paraQueServe": "Monitor de terminal em tempo real do consumo do Claude Code, com previsões de quando o limite da janela será atingido e alertas antes de estourar.",
      "quandoUsar": "Em dias de uso intenso: deixe rodando num painel lateral e saiba, antes de começar uma tarefa grande, se o orçamento da janela atual comporta.",
      "beneficios": [
        "Previsão de estouro baseada no seu ritmo real",
        "Alertas visuais antes de atingir limites",
        "Visão por sessão, modelo e janela de billing",
        "Interface de terminal leve e clara"
      ],
      "economiaTokens": "Evita desperdiçar a janela em tarefas de baixa prioridade quando a previsão indica risco de estouro — planejamento de consumo em vez de surpresa.",
      "qualidadeRespostas": "Não interfere nas respostas; garante que o modelo certo esteja disponível quando você mais precisa.",
      "multiAgentes": "Com pipelines paralelos consumindo rápido, o monitor mostra o efeito agregado e ajuda a dosar o paralelismo.",
      "melhorias": {
        "produtividade": "Sessões planejadas pelo orçamento disponível",
        "analise": "Padrões de consumo visíveis em tempo real"
      },
      "instalacao": "pip install claude-monitor (ou uv tool install claude-monitor) e execute claude-monitor no terminal",
      "exemploUso": "Antes de rodar uma migração longa, o monitor mostra que a janela atual está 70% consumida — você agenda para a próxima janela e evita interrupção no meio.",
      "promptInicial": "Utilize a Skill Claude Code Usage Monitor para executar o acompanhamento do consumo desta sessão e alertar sobre risco de limite. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "custo",
        "contexto",
        "time"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "cc-security-review",
      "nome": "Claude Code Security Review",
      "autor": "anthropics",
      "repo": "https://github.com/anthropics/claude-code-security-review",
      "stars": 6413,
      "atualizadoEm": "2026-02-11",
      "licenca": "MIT",
      "linguagem": "Python",
      "categorias": [
        "seguranca",
        "programacao"
      ],
      "tags": [
        "oficial",
        "github-action",
        "vulnerabilidades",
        "pull-request",
        "auditoria"
      ],
      "destaque": false,
      "paraQueServe": "GitHub Action oficial da Anthropic que roda análise de segurança com Claude em cada pull request, comentando vulnerabilidades encontradas com explicação e sugestão de correção.",
      "quandoUsar": "Em qualquer repositório que aceite PRs — especialmente com código de autenticação, pagamentos ou upload — para ter uma revisão de segurança automática antes do merge.",
      "beneficios": [
        "Revisão de segurança em todo PR, sem depender de disciplina humana",
        "Análise semântica com baixo ruído de falso positivo",
        "Comentários direto no diff, com severidade e correção",
        "Inclui o comando /security-review para uso local"
      ],
      "economiaTokens": "A análise roda focada no diff do PR, não na codebase inteira — revisão profunda com escopo mínimo.",
      "qualidadeRespostas": "Prompt de auditoria especializado e calibrado pela Anthropic encontra classes de vulnerabilidade que revisão casual deixa passar.",
      "multiAgentes": "Compõe pipelines de CI como o 'agente de segurança' do fluxo, ao lado de lint, testes e revisão funcional.",
      "melhorias": {
        "programacao": "Correções de segurança sugeridas no contexto do diff",
        "analise": "Classificação de severidade consistente"
      },
      "instalacao": "Adicione o workflow ao repositório usando a action anthropics/claude-code-security-review (exemplo de YAML no README; requer ANTHROPIC_API_KEY nos secrets).",
      "exemploUso": "Num PR que adiciona upload de arquivos, a action comenta: validação de tipo ausente e caminho não sanitizado — com o patch sugerido para ambos.",
      "promptInicial": "Utilize a Skill Claude Code Security Review para executar a auditoria de segurança destas alterações antes do merge. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "seguranca",
        "api",
        "saas",
        "backend",
        "ci"
      ],
      "tipo": "ferramenta",
      "facilidade": "tecnico"
    },
    {
      "id": "oneredoak-workflows",
      "nome": "Claude Code Workflows (OneRedOak)",
      "autor": "OneRedOak",
      "repo": "https://github.com/OneRedOak/claude-code-workflows",
      "stars": 3905,
      "atualizadoEm": "2026-10-09",
      "licenca": "MIT",
      "linguagem": "Markdown",
      "categorias": [
        "design",
        "programacao",
        "seguranca"
      ],
      "tags": [
        "design-review",
        "playwright",
        "workflows",
        "ui-review",
        "acessibilidade"
      ],
      "destaque": false,
      "paraQueServe": "Workflows testados em startup AI-native, com destaque para o de design review: o agente navega a interface com Playwright, avalia contra princípios de design e devolve revisão estruturada de UI/UX.",
      "quandoUsar": "Antes de mergear mudanças de interface: o workflow abre a tela real no navegador, verifica consistência visual, acessibilidade e estados de erro, e reporta como um design reviewer sênior.",
      "beneficios": [
        "Revisão de design automatizada sobre a UI real, não sobre o código",
        "Checklist inspirado em processos de empresas de ponta",
        "Inclui workflows de revisão de código e segurança",
        "Base excelente para adaptar ao seu design system"
      ],
      "economiaTokens": "A revisão é guiada por checklist objetivo, evitando idas e vindas subjetivas de 'melhora esse visual' que consomem sessões inteiras.",
      "qualidadeRespostas": "Avaliar a interface renderizada (screenshots reais) produz feedback muito mais concreto do que inferir aparência a partir do código.",
      "multiAgentes": "O design reviewer funciona como agente de QA visual no pipeline, ao lado dos agentes de implementação e testes.",
      "melhorias": {
        "analise": "Feedback de UI com evidência visual",
        "programacao": "Correções de acessibilidade e consistência apontadas no código",
        "produtividade": "Menos ciclos de revisão manual de interface"
      },
      "instalacao": "Copie os comandos e workflows do repositório para .claude/commands/ do seu projeto (requer Playwright MCP para os fluxos de navegador).",
      "exemploUso": "/design-review após implementar uma tela: o agente navega o fluxo, tira screenshots e lista problemas de espaçamento, contraste e estados vazios com prioridade.",
      "promptInicial": "Utilize a Skill Claude Code Workflows (OneRedOak) para executar a revisão de design desta interface navegando pela aplicação real. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "frontend",
        "design",
        "saas",
        "revisao"
      ],
      "tipo": "skill",
      "facilidade": "tecnico"
    },
    {
      "id": "spec-workflow",
      "nome": "Claude Code Spec Workflow",
      "autor": "Pimzino",
      "repo": "https://github.com/Pimzino/claude-code-spec-workflow",
      "stars": 3860,
      "atualizadoEm": "2025-09-07",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "planejamento",
        "documentacao",
        "programacao"
      ],
      "tags": [
        "spec-driven",
        "requisitos",
        "design-doc",
        "tarefas",
        "bugfix"
      ],
      "destaque": false,
      "paraQueServe": "Workflow de desenvolvimento dirigido por especificação: transforma um pedido de feature em Requisitos → Design → Tarefas → Implementação, e bugs em Reportar → Analisar → Corrigir → Verificar.",
      "quandoUsar": "Quando 'implementa a feature X' costuma virar código que não era o que você queria: o fluxo força alinhamento de requisitos e design antes de qualquer implementação.",
      "beneficios": [
        "Documentos de requisitos e design gerados e aprovados por etapa",
        "Tarefas rastreáveis derivadas do design aprovado",
        "Fluxo dedicado e mais curto para correção de bugs",
        "Dashboard opcional para acompanhar specs em andamento"
      ],
      "economiaTokens": "Errar na fase de spec custa parágrafos; errar na implementação custa sessões inteiras de retrabalho — o fluxo desloca o erro para a fase barata.",
      "qualidadeRespostas": "Cada fase produz artefato revisável pelo humano, mantendo o modelo alinhado ao objetivo real em vez de à interpretação inicial.",
      "multiAgentes": "Os documentos de spec viram contrato entre agentes: um planeja, outro implementa, outro verifica contra os requisitos.",
      "melhorias": {
        "escrita": "Specs e designs docs padronizados",
        "raciocinio": "Requisitos explícitos antes de decisões técnicas",
        "produtividade": "Menos retrabalho por desalinhamento"
      },
      "instalacao": "npx @pimzino/claude-code-spec-workflow@latest setup no diretório do projeto (instala os comandos /spec-* e /bug-*)",
      "exemploUso": "/spec-create exportacao-csv 'exportar relatórios em CSV' gera requisitos para sua aprovação, depois design, depois tarefas — e só então implementa.",
      "promptInicial": "Utilize a Skill Claude Code Spec Workflow para executar esta feature pelo fluxo de especificação completo, com aprovação por fase. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "saas",
        "planejamento",
        "documentacao",
        "backend",
        "frontend"
      ],
      "tipo": "ferramenta",
      "facilidade": "medio"
    },
    {
      "id": "tdd-guard",
      "nome": "TDD Guard",
      "autor": "nizos",
      "repo": "https://github.com/nizos/tdd-guard",
      "stars": 2361,
      "atualizadoEm": "2026-10-12",
      "licenca": "MIT",
      "linguagem": "TypeScript",
      "categorias": [
        "testes",
        "programacao"
      ],
      "tags": [
        "tdd",
        "hooks",
        "enforcement",
        "vitest",
        "pytest",
        "qualidade"
      ],
      "destaque": false,
      "paraQueServe": "Guard automatizado via hooks do Claude Code que bloqueia modificações de código sem teste falhando correspondente — TDD deixa de ser recomendação e vira regra imposta.",
      "quandoUsar": "Quando o agente (ou o time) 'esquece' o TDD sob pressão: o guard intercepta cada edição e recusa implementação que não tenha nascido de um teste vermelho.",
      "beneficios": [
        "Impossível pular o ciclo red-green-refactor por descuido",
        "Suporte a Vitest, Jest, pytest, PHPUnit e outros",
        "Feedback imediato na própria sessão do Claude Code",
        "Configurável por projeto via hooks"
      ],
      "economiaTokens": "Código guiado por teste falha menos em produção — menos sessões futuras de depuração é a maior economia composta de tokens.",
      "qualidadeRespostas": "Força o modelo a definir comportamento esperado (teste) antes da implementação, o que elimina código especulativo.",
      "multiAgentes": "Aplica a mesma disciplina a todos os agentes que tocam o repositório: nenhum subagente burla o processo.",
      "melhorias": {
        "programacao": "Cobertura de testes cresce junto com o código",
        "raciocinio": "Comportamento especificado antes da solução",
        "produtividade": "Menos regressões e depuração posterior"
      },
      "instalacao": "npm install -g tdd-guard e configure o hook no settings do Claude Code conforme o README (mais o reporter do seu test runner).",
      "exemploUso": "O agente tenta editar payment.ts sem teste novo: o guard bloqueia e responde 'escreva primeiro um teste falhando' — o fluxo TDD se autocorrige.",
      "promptInicial": "Utilize a Skill TDD Guard para executar esta implementação sob disciplina estrita de TDD, com testes precedendo cada mudança. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "testes",
        "backend",
        "api",
        "qualidade"
      ],
      "tipo": "ferramenta",
      "facilidade": "tecnico"
    },
    {
      "id": "awesome-claude-skills",
      "nome": "Awesome Claude Skills",
      "autor": "travisvn",
      "repo": "https://github.com/travisvn/awesome-claude-skills",
      "stars": 15449,
      "atualizadoEm": "2026-04-28",
      "licenca": "Ver repositório",
      "linguagem": "—",
      "categorias": [
        "pesquisa",
        "documentacao"
      ],
      "tags": [
        "awesome-list",
        "curadoria",
        "claude-desktop",
        "skills",
        "formato-skill"
      ],
      "destaque": false,
      "paraQueServe": "Lista curada focada especificamente em Skills do Claude — incluindo as que rodam no Claude Desktop e no claude.ai, não só no Claude Code — com recursos sobre o formato SKILL.md e ferramentas para criá-las.",
      "quandoUsar": "Quando você usa o Claude fora do terminal e quer skills que funcionem no app/web, ou quando vai escrever a sua própria skill e precisa de referências do formato e de exemplos bem estruturados.",
      "beneficios": [
        "Recorte específico de Skills, sem diluir com plugins e MCPs",
        "Cobre Claude Desktop e claude.ai, não apenas o Claude Code",
        "Reúne ferramentas de criação e validação de skills",
        "Entradas descritas, facilitando escolher sem abrir cada repositório"
      ],
      "economiaTokens": "Escolher uma skill pronta e enxuta evita manter instruções longas e repetidas no seu CLAUDE.md ou no prompt de sistema.",
      "qualidadeRespostas": "As skills listadas seguem o formato oficial, com instruções específicas que substituem prompts genéricos escritos às pressas.",
      "multiAgentes": "Skills no formato padrão são portáveis: a mesma pasta serve o Claude Code, o Desktop e qualquer agente do seu pipeline.",
      "melhorias": {
        "produtividade": "Descoberta rápida de skills por caso de uso",
        "escrita": "Referências de skills de redação e documentos",
        "raciocinio": "Exemplos de skills que estruturam análise passo a passo"
      },
      "instalacao": "Não requer instalação: navegue pelo README e siga as instruções da skill escolhida (em geral, copiar a pasta para .claude/skills/ ou fazer upload no Claude Desktop).",
      "exemploUso": "Antes de escrever uma skill de análise de contratos, você acha na lista uma equivalente, estuda o SKILL.md dela e adapta em vez de começar do zero.",
      "promptInicial": "Utilize a Skill Awesome Claude Skills para executar a busca de uma skill existente que atenda a esta necessidade antes de criar uma nova. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "pesquisa",
        "documentacao",
        "escritorio",
        "conteudo"
      ],
      "tipo": "colecao",
      "facilidade": "facil"
    },
    {
      "id": "claude-plugins-official",
      "nome": "Claude Plugins (diretório oficial)",
      "autor": "anthropics",
      "repo": "https://github.com/anthropics/claude-plugins-official",
      "stars": 41770,
      "atualizadoEm": "2026-10-16",
      "licenca": "Apache-2.0",
      "linguagem": "—",
      "categorias": [
        "pesquisa",
        "programacao",
        "automacao"
      ],
      "tags": [
        "oficial",
        "plugins",
        "marketplace",
        "curadoria",
        "anthropic"
      ],
      "destaque": true,
      "tipo": "colecao",
      "facilidade": "medio",
      "paraQueServe": "Diretório oficial, mantido pela Anthropic, de plugins para o Claude Code. Reúne plugins internos da própria Anthropic e de parceiros, que passam por critérios de qualidade e segurança antes de entrar.",
      "quandoUsar": "Quando você quer instalar plugins com mais confiança do que pegando um repositório qualquer: é o primeiro lugar para procurar, antes das listas da comunidade.",
      "beneficios": [
        "Mantido pela Anthropic, com plugins internos e de parceiros",
        "Plugins de terceiros passam por critérios de qualidade e segurança",
        "Instalação em um comando dentro do Claude Code",
        "Dá para navegar pela própria interface, em /plugin > Discover"
      ],
      "economiaTokens": "Plugins empacotam skills e comandos prontos, e o Claude carrega cada skill só quando a tarefa pede — em vez de você colar instruções longas em toda conversa.",
      "qualidadeRespostas": "Plugins curados trazem fluxos já testados, o que reduz respostas improvisadas em tarefas que se repetem.",
      "multiAgentes": "Muitos plugins incluem subagentes prontos, que o Claude Code aciona para partes específicas do trabalho.",
      "melhorias": {
        "produtividade": "Achar e instalar ferramentas confiáveis sem pesquisa manual",
        "programacao": "Fluxos de desenvolvimento prontos e revisados"
      },
      "instalacao": "No Claude Code: /plugin install NOME-DO-PLUGIN@claude-plugins-official — ou navegue em /plugin > Discover. O próprio README pede que você confie no plugin antes de instalar.",
      "exemploUso": "Abra /plugin > Discover, escolha um plugin do diretório oficial e instale: os comandos e skills dele ficam disponíveis na mesma hora.",
      "promptInicial": "Utilize a Skill Claude Plugins (diretório oficial) para executar a escolha e a instalação do plugin mais adequado a esta tarefa. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "setup",
        "programacao",
        "produtividade"
      ]
    },
    {
      "id": "knowledge-work-plugins",
      "nome": "Knowledge Work Plugins (oficial Anthropic)",
      "autor": "anthropics",
      "repo": "https://github.com/anthropics/knowledge-work-plugins",
      "stars": 30010,
      "atualizadoEm": "2026-10-16",
      "licenca": "Apache-2.0",
      "linguagem": "—",
      "categorias": [
        "escrita",
        "automacao",
        "pesquisa"
      ],
      "tags": [
        "oficial",
        "cowork",
        "plugins",
        "negocios",
        "vendas",
        "juridico",
        "financas"
      ],
      "destaque": true,
      "tipo": "colecao",
      "facilidade": "facil",
      "paraQueServe": "Plugins oficiais da Anthropic que transformam o Claude num especialista por função — produtividade, vendas, atendimento, produto, marketing, jurídico, finanças, dados e pesquisa — com skills, comandos e conexões com as ferramentas de cada área.",
      "quandoUsar": "Quando você não programa e usa o Claude no trabalho do dia a dia: preparar uma reunião de vendas, revisar um contrato, responder chamados de suporte ou fechar um relatório financeiro.",
      "beneficios": [
        "Feito para o Cowork: instala pelo app, sem terminal",
        "11 plugins prontos, um por área de trabalho",
        "Conecta a ferramentas como Slack, Notion, HubSpot e Microsoft 365",
        "Tudo em arquivos de texto: dá para adaptar ao jeito da sua empresa"
      ],
      "economiaTokens": "Cada plugin carrega só o conhecimento da sua área, e as skills entram em ação apenas quando a tarefa combina — sem você repetir o contexto da empresa em toda conversa.",
      "qualidadeRespostas": "As skills trazem boas práticas e o passo a passo de cada função, então o resultado sai no formato que a área espera: uma proposta comercial, um parecer, um fechamento contábil.",
      "multiAgentes": "Os plugins incluem subagentes e comandos por função, que podem ser combinados num fluxo maior.",
      "melhorias": {
        "escrita": "Documentos de cada área no formato certo",
        "produtividade": "Tarefas recorrentes viram um comando",
        "analise": "Informações das ferramentas da empresa reunidas numa resposta"
      },
      "instalacao": "No Cowork: instale pelo site claude.com/plugins. No Claude Code: claude plugin marketplace add anthropics/knowledge-work-plugins e depois claude plugin install sales@knowledge-work-plugins (troque sales pela área que quiser).",
      "exemploUso": "Com o plugin de vendas, peça para preparar uma reunião com um cliente: o Claude pesquisa a empresa, revisa o histórico e monta a pauta. Também há comandos diretos, como /sales:call-prep.",
      "promptInicial": "Utilize a Skill Knowledge Work Plugins para executar esta tarefa da minha área de trabalho seguindo as boas práticas do plugin correspondente. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "escritorio",
        "conteudo",
        "negocios",
        "produtividade"
      ]
    },
    {
      "id": "mattpocock-skills",
      "nome": "Skills for Real Engineers (Matt Pocock)",
      "autor": "mattpocock",
      "repo": "https://github.com/mattpocock/skills",
      "stars": 295127,
      "atualizadoEm": "2026-10-09",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "programacao",
        "planejamento"
      ],
      "tags": [
        "engenharia",
        "composavel",
        "plugin",
        "triagem",
        "documentacao-viva"
      ],
      "destaque": false,
      "tipo": "skill",
      "facilidade": "medio",
      "paraQueServe": "Skills pequenas e combináveis que Matt Pocock usa todo dia para fazer engenharia de verdade — não \"vibe coding\". A proposta é o oposto de um processo pesado: peças curtas que você entende, adapta e controla.",
      "quandoUsar": "Quando frameworks completos como BMAD ou Spec-Kit parecem demais, e você quer peças avulsas, fáceis de ler e de modificar, para guiar o Claude na programação.",
      "beneficios": [
        "Skills curtas, legíveis e fáceis de adaptar",
        "Baseadas em décadas de experiência de engenharia",
        "Funcionam com qualquer modelo",
        "Plugin no diretório oficial da Anthropic, que atualiza sozinho"
      ],
      "economiaTokens": "Skills pequenas e focadas ocupam pouco contexto e entram só quando a tarefa pede, ao contrário de metodologias que carregam um processo inteiro.",
      "qualidadeRespostas": "Cada skill codifica uma prática de engenharia específica, deixando o Claude mais disciplinado sem engessar o fluxo.",
      "multiAgentes": "Por serem combináveis, as skills podem ser distribuídas entre agentes diferentes do mesmo projeto.",
      "melhorias": {
        "programacao": "Práticas de engenharia aplicadas com consistência",
        "raciocinio": "Mais questionamento antes de escrever código"
      },
      "instalacao": "No Claude Code: claude plugin install mattpocock-skills@claude-plugins-official (atualiza sozinho) e depois rode /setup-matt-pocock-skills. Para outros agentes: npx skills@latest add mattpocock/skills.",
      "exemploUso": "Use a skill grill-with-docs para o Claude te sabatinar sobre uma funcionalidade antes de codar — e, de quebra, documentar o projeto. Na dúvida sobre qual usar, a skill ask-matt indica o fluxo certo para a sua situação.",
      "promptInicial": "Utilize a Skill Skills for Real Engineers para executar esta tarefa de programação com as práticas de engenharia das skills, começando por questionar os requisitos. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "backend",
        "frontend",
        "programacao",
        "revisao"
      ]
    },
    {
      "id": "addy-agent-skills",
      "nome": "Agent Skills (Addy Osmani)",
      "autor": "addyosmani",
      "repo": "https://github.com/addyosmani/agent-skills",
      "stars": 107852,
      "atualizadoEm": "2026-10-13",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "programacao",
        "testes",
        "planejamento"
      ],
      "tags": [
        "ciclo-de-vida",
        "comandos",
        "qualidade",
        "performance-web",
        "plugin"
      ],
      "destaque": false,
      "tipo": "skill",
      "facilidade": "medio",
      "paraQueServe": "Skills de engenharia de nível produção, de Addy Osmani: codificam os fluxos e critérios de qualidade de engenheiros seniores em todo o ciclo — definir, planejar, construir, testar, revisar e publicar — com 9 comandos que ativam as skills certas.",
      "quandoUsar": "Quando você quer que o Claude siga um ciclo de desenvolvimento completo e disciplinado: especificação antes do código, tarefas pequenas, testes como prova e revisão antes do merge.",
      "beneficios": [
        "9 comandos, um por fase: /spec, /plan, /build, /test, /review, /ship…",
        "25 skills que também ativam sozinhas conforme o que você faz",
        "Inclui auditoria de performance web e simplificação de código",
        "Funciona em mais de 70 agentes, não só no Claude Code"
      ],
      "economiaTokens": "Ao dividir o trabalho em tarefas pequenas e atômicas, cada etapa usa um contexto menor e mais focado.",
      "qualidadeRespostas": "Critérios de qualidade explícitos (testes, revisão, restrições) fazem o resultado ser provado, não só plausível.",
      "multiAgentes": "O modo /build auto gera o plano e implementa todas as tarefas numa passada que você aprova uma vez.",
      "melhorias": {
        "programacao": "Ciclo completo com testes e revisão",
        "raciocinio": "Especificação e plano antes do código",
        "produtividade": "Uma fase por comando"
      },
      "instalacao": "No Claude Code: /plugin marketplace add addyosmani/agent-skills e depois /plugin install agent-skills@addy-agent-skills. Em qualquer agente: npx skills add addyosmani/agent-skills.",
      "exemploUso": "Rode /spec para definir a funcionalidade, /plan para quebrar em tarefas, /build para implementar uma fatia por vez e /test para provar que funciona. A revisão do plugin é chamada como /agent-skills:review.",
      "promptInicial": "Utilize a Skill Agent Skills (Addy Osmani) para executar esta funcionalidade pelo ciclo completo de especificação, plano, implementação, testes e revisão. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "saas",
        "backend",
        "frontend",
        "testes",
        "qualidade"
      ]
    },
    {
      "id": "scientific-agent-skills",
      "nome": "Scientific Agent Skills",
      "autor": "K-Dense-AI",
      "repo": "https://github.com/K-Dense-AI/scientific-agent-skills",
      "stars": 52257,
      "atualizadoEm": "2026-10-12",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "pesquisa"
      ],
      "tags": [
        "ciencia",
        "pesquisa-academica",
        "bioinformatica",
        "pubmed",
        "arxiv",
        "dados"
      ],
      "destaque": false,
      "tipo": "colecao",
      "facilidade": "medio",
      "paraQueServe": "Biblioteca com 177 skills científicas e de pesquisa, da K-Dense, cobrindo biologia, química, medicina, física, engenharia, ciências da Terra e análise de dados, com acesso a mais de 100 bases científicas. É descrita em um artigo publicado no arXiv.",
      "quandoUsar": "Em pesquisa acadêmica ou científica: revisar literatura, consultar bases especializadas, analisar dados experimentais ou montar um fluxo de pesquisa reproduzível.",
      "beneficios": [
        "177 skills organizadas por área científica",
        "Acesso a bases como PubMed, UniProt, ChEMBL e ClinicalTrials",
        "Testes automáticos e varredura de segurança no repositório",
        "Segue o padrão aberto Agent Skills"
      ],
      "economiaTokens": "O Claude carrega só a skill da disciplina em questão, em vez de você explicar o procedimento científico a cada conversa.",
      "qualidadeRespostas": "As skills codificam procedimentos específicos de cada disciplina e consultam as bases de origem, reduzindo erros de método e referências inventadas.",
      "multiAgentes": "As skills alimentam o K-Dense BYOK, um co-cientista de código aberto, e podem ser divididas entre agentes de pesquisa.",
      "melhorias": {
        "analise": "Procedimentos científicos por disciplina",
        "raciocinio": "Pesquisa apoiada nas bases de origem",
        "escrita": "Revisões de literatura com referências"
      },
      "instalacao": "npx skills add K-Dense-AI/scientific-agent-skills (o README traz as opções para Claude Code, Cursor, Codex e outros agentes).",
      "exemploUso": "Peça uma revisão de literatura sobre uma proteína: o Claude consulta PubMed e UniProt pelas skills e organiza os achados com as referências de origem.",
      "promptInicial": "Utilize a Skill Scientific Agent Skills para executar esta pesquisa científica consultando as bases especializadas e citando as fontes de origem. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "pesquisa",
        "dados",
        "academico"
      ]
    },
    {
      "id": "taste-skill",
      "nome": "Taste Skill",
      "autor": "Leonxlnx",
      "repo": "https://github.com/Leonxlnx/taste-skill",
      "stars": 98460,
      "atualizadoEm": "2026-10-14",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "design"
      ],
      "tags": [
        "direcao-de-arte",
        "frontend",
        "landing-page",
        "fotos-reais",
        "anti-template"
      ],
      "destaque": false,
      "tipo": "skill",
      "facilidade": "medio",
      "paraQueServe": "Skills que dão \"bom gosto\" a agentes de código: em vez de montar a landing page genérica de sempre, o agente recebe uma direção de arte, usa fotos reais de acervos abertos (com crédito) e confere o próprio trabalho no navegador.",
      "quandoUsar": "Quando o site ou a interface que o Claude gera sai com cara de template, e você quer um resultado com identidade visual de verdade.",
      "beneficios": [
        "Direção de arte definida antes do código",
        "Fotos reais de acervos abertos, com créditos",
        "O agente confere o resultado no navegador",
        "Não instala nada extra nem pede chave de API"
      ],
      "economiaTokens": "Uma direção de arte definida desde o início evita rodadas e rodadas de \"deixa mais bonito\".",
      "qualidadeRespostas": "O agente confere o próprio trabalho no navegador antes de entregar, pegando problemas visuais que só aparecem com a página renderizada.",
      "multiAgentes": "As skills têm nome próprio (taste-skill:), então não colidem com as de outros plugins.",
      "melhorias": {
        "programacao": "Frontends com identidade visual",
        "produtividade": "Menos idas e vindas de ajuste visual"
      },
      "instalacao": "No Claude Code: /plugin marketplace add Leonxlnx/taste-skill. Em qualquer agente: npx skills add https://github.com/Leonxlnx/taste-skill. A skill padrão precisa de Node 22+ e de Chrome, Edge ou Chromium instalado.",
      "exemploUso": "Peça o site de um estúdio de arquitetura: o agente define uma direção de arte, busca fotos reais e confere a página no navegador antes de te entregar.",
      "promptInicial": "Utilize a Skill Taste Skill para executar a criação desta página com uma direção de arte própria, conferindo o resultado no navegador. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "frontend",
        "design",
        "landing"
      ]
    },
    {
      "id": "ui-ux-pro-max",
      "nome": "UI UX Pro Max",
      "autor": "nextlevelbuilder",
      "repo": "https://github.com/nextlevelbuilder/ui-ux-pro-max-skill",
      "stars": 136896,
      "atualizadoEm": "2026-10-15",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "design",
        "programacao"
      ],
      "tags": [
        "design-system",
        "ui",
        "ux",
        "paleta",
        "tipografia"
      ],
      "destaque": false,
      "tipo": "skill",
      "facilidade": "medio",
      "paraQueServe": "Skill de inteligência de design para interfaces profissionais: um gerador de design system analisa o tipo de produto e devolve estilo, paleta, tipografia e regras de UX sob medida, com 192 regras por setor e dezenas de estilos pesquisáveis.",
      "quandoUsar": "No começo de um produto ou de uma tela nova, quando você precisa de um visual coerente com o setor (uma clínica, um app de finanças, uma loja) em vez de cores e fontes escolhidas no chute.",
      "beneficios": [
        "Design system completo gerado em segundos",
        "192 regras de design por setor",
        "Estilos de interface pesquisáveis",
        "Funciona com vários frameworks e plataformas"
      ],
      "economiaTokens": "Definir o design system antes evita refazer telas inteiras por inconsistência visual depois.",
      "qualidadeRespostas": "Regras específicas por setor deixam as escolhas visuais justificadas, não arbitrárias.",
      "multiAgentes": "O design system gerado vira a referência comum para todos os agentes que constroem telas do mesmo produto.",
      "melhorias": {
        "programacao": "Telas consistentes com um design system",
        "analise": "Escolhas visuais justificadas pelo setor"
      },
      "instalacao": "No Claude Code: /plugin marketplace add nextlevelbuilder/ui-ux-pro-max-skill e depois /plugin install ui-ux-pro-max@ui-ux-pro-max-skill.",
      "exemploUso": "Peça \"crie a landing page do meu spa\": a skill identifica o setor, propõe estilo, paleta e tipografia adequados, e só então o Claude constrói a página.",
      "promptInicial": "Utilize a Skill UI UX Pro Max para executar a definição do design system deste produto antes de construir as telas. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "frontend",
        "design",
        "saas",
        "mobile"
      ]
    },
    {
      "id": "archify",
      "nome": "Archify",
      "autor": "tt-a1i",
      "repo": "https://github.com/tt-a1i/archify",
      "stars": 84895,
      "atualizadoEm": "2026-10-18",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "documentacao",
        "design"
      ],
      "tags": [
        "diagramas",
        "arquitetura",
        "visualizacao",
        "onboarding"
      ],
      "destaque": false,
      "tipo": "skill",
      "facilidade": "medio",
      "paraQueServe": "Transforma uma ideia, um plano ou um repositório inteiro num diagrama interativo: você descreve em uma frase e recebe um mapa navegável, com links para o código-fonte e caminhos que dá para seguir.",
      "quandoUsar": "Para entender um projeto que você não conhece, explicar uma arquitetura para o time ou documentar um fluxo — sem desenhar caixinhas à mão.",
      "beneficios": [
        "Diagrama interativo a partir de uma frase",
        "Cada parte do diagrama aponta para o código-fonte",
        "Funciona em Claude Code, Cursor, Codex CLI e OpenCode",
        "Exemplos interativos ao vivo no site do projeto"
      ],
      "economiaTokens": "Um mapa da arquitetura ajuda você (e o Claude) a ir direto ao ponto certo do código, em vez de abrir arquivo por arquivo.",
      "qualidadeRespostas": "Explicações apoiadas num diagrama ligado ao código real são muito mais fáceis de conferir.",
      "multiAgentes": "O diagrama vira documentação compartilhada, que outros agentes e pessoas do time podem consultar.",
      "melhorias": {
        "analise": "Entender projetos grandes de relance",
        "escrita": "Documentação visual sem esforço",
        "produtividade": "Onboarding mais rápido em código novo"
      },
      "instalacao": "npx skills add tt-a1i/archify -g (funciona com Claude Code, Cursor, Codex CLI e OpenCode).",
      "exemploUso": "Envie: \"Use Archify para diagramar uma requisição web: o navegador chama a API, a API consulta o Redis e, se não achar, busca no PostgreSQL e preenche o cache.\"",
      "promptInicial": "Utilize a Skill Archify para executar um diagrama interativo da arquitetura deste projeto, ligado ao código-fonte. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "documentacao",
        "backend",
        "legado",
        "time"
      ]
    },
    {
      "id": "caveman",
      "nome": "Caveman",
      "autor": "JuliusBrussee",
      "repo": "https://github.com/JuliusBrussee/caveman",
      "stars": 113302,
      "atualizadoEm": "2026-10-17",
      "licenca": "Apache-2.0",
      "linguagem": "—",
      "categorias": [
        "tokens",
        "prompts"
      ],
      "tags": [
        "economia",
        "respostas-curtas",
        "custo",
        "verbosidade",
        "plugin"
      ],
      "destaque": false,
      "tipo": "skill",
      "facilidade": "medio",
      "paraQueServe": "Faz o agente falar menos e ler menos, sem perder precisão: respostas curtas e diretas, no estilo \"homem das cavernas\", com o código intacto. No exemplo do README, a mesma correção cai de 63 para 20 tokens.",
      "quandoUsar": "Quando as respostas do Claude vêm compridas demais, você está batendo no limite de uso ou quer gastar menos sem trocar de modelo.",
      "beneficios": [
        "Respostas bem mais curtas, com o código exato",
        "Também encolhe o que o agente lê (logs, JSON, saída de testes)",
        "Citado pela Adobe Research e testado pela JetBrains",
        "Código aberto, licença Apache-2.0"
      ],
      "economiaTokens": "É o propósito central. Segundo os testes publicados no README: 33,2% menos tokens de entrada por sessão, e um modo automático 54% mais barato com a mesma nota nas tarefas.",
      "qualidadeRespostas": "Menos enchimento deixa a resposta mais fácil de ler — o raciocínio é o mesmo, só a forma fica enxuta.",
      "multiAgentes": "Em fluxos com vários agentes, mensagens mais curtas entre eles reduzem o custo de cada troca.",
      "melhorias": {
        "produtividade": "Respostas que vão direto ao ponto",
        "prompts": "Estilo de resposta controlado sem reescrever prompts"
      },
      "instalacao": "No Claude Code: claude plugin marketplace add JuliusBrussee/caveman && claude plugin install caveman@caveman. Em qualquer agente: npx skills add JuliusBrussee/caveman -g.",
      "exemploUso": "Em vez de um parágrafo explicando por que um componente React renderiza de novo, você recebe: \"Nova referência de objeto a cada render, então o React renderiza de novo. Envolva a prop em useMemo.\"",
      "promptInicial": "Utilize a Skill Caveman para executar esta tarefa com respostas curtas e diretas, mantendo o código e os dados exatos. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "custo",
        "contexto",
        "produtividade"
      ]
    },
    {
      "id": "humanizer",
      "nome": "Humanizer",
      "autor": "blader",
      "repo": "https://github.com/blader/humanizer",
      "stars": 57841,
      "atualizadoEm": "2026-10-16",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "escrita"
      ],
      "tags": [
        "texto-natural",
        "revisao",
        "redacao",
        "wikipedia",
        "plugin"
      ],
      "destaque": false,
      "tipo": "skill",
      "facilidade": "medio",
      "paraQueServe": "Deixa um texto escrito por IA com cara de texto escrito por gente, sem mudar o que ele diz. É baseado no guia \"Sinais de escrita de IA\", que editores da Wikipedia usam para identificar textos gerados por máquina.",
      "quandoUsar": "Antes de publicar um post, mandar um e-mail ou entregar um texto que o Claude ajudou a escrever, quando ele soa genérico, empolgado demais ou cheio de clichês de IA.",
      "beneficios": [
        "Tira os tiques típicos de texto de IA",
        "Preserva o conteúdo original",
        "Baseado num guia público da Wikipedia",
        "Num teste cego relatado no README, a versão reescrita venceu 16 de 16 vezes"
      ],
      "economiaTokens": "Corta enchimento e exageros, então o texto final costuma sair mais curto.",
      "qualidadeRespostas": "Textos mais naturais e diretos, que não cansam o leitor nem denunciam o uso de IA.",
      "multiAgentes": "Pode ser a última etapa de um fluxo de conteúdo: um agente escreve, outro humaniza antes de publicar.",
      "melhorias": {
        "escrita": "Textos naturais e sem clichês",
        "produtividade": "Menos tempo reescrevendo à mão"
      },
      "instalacao": "No Claude Code (versão 2.1.142 ou mais nova): /plugin marketplace add blader/humanizer e depois /plugin install humanizer@humanizer. O comando fica disponível como /humanizer:humanizer.",
      "exemploUso": "\"Estou muito animado em anunciar que os rascunhos compartilhados finalmente chegaram! 🚀\" vira \"Os rascunhos compartilhados saíram hoje.\" — a mesma informação, sem o tom de propaganda.",
      "promptInicial": "Utilize a Skill Humanizer para executar a revisão deste texto para que soe natural, sem alterar o conteúdo nem os fatos. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "conteudo",
        "escritorio",
        "marketing"
      ]
    },
    {
      "id": "skillspector",
      "nome": "SkillSpector (NVIDIA)",
      "autor": "NVIDIA",
      "repo": "https://github.com/NVIDIA/SkillSpector",
      "stars": 20438,
      "atualizadoEm": "2026-10-16",
      "licenca": "Apache-2.0",
      "linguagem": "—",
      "categorias": [
        "seguranca"
      ],
      "tags": [
        "scanner",
        "vulnerabilidades",
        "malware",
        "auditoria",
        "nvidia",
        "mcp"
      ],
      "destaque": false,
      "tipo": "ferramenta",
      "facilidade": "tecnico",
      "paraQueServe": "Scanner de segurança para skills de agentes, da NVIDIA: analisa uma skill antes de você instalar e aponta vulnerabilidades, padrões maliciosos e riscos. Responde à pergunta \"essa skill é segura para instalar?\".",
      "quandoUsar": "Antes de instalar qualquer skill de origem desconhecida, principalmente as de listas da comunidade. Na pesquisa citada no README, 26,1% das skills analisadas tinham vulnerabilidades.",
      "beneficios": [
        "Verifica a skill antes da instalação",
        "Faz parte do pipeline NVIDIA Verified Skills",
        "Também roda como servidor MCP dentro do Claude Code",
        "Código aberto, licença Apache-2.0"
      ],
      "economiaTokens": "Não atua em tokens: atua na segurança do que você instala.",
      "qualidadeRespostas": "Indiretamente: evita que uma skill maliciosa ou mal escrita contamine o comportamento do Claude.",
      "multiAgentes": "Pode ser o portão de entrada de um time: toda skill nova passa pelo scanner antes de chegar aos agentes.",
      "melhorias": {
        "analise": "Relatório de riscos antes de instalar",
        "produtividade": "Checagem de segurança automatizada"
      },
      "instalacao": "uv tool install git+https://github.com/NVIDIA/skillspector.git e depois skillspector scan ./pasta-da-skill/. Para usar dentro do Claude Code via MCP, instale com o extra [mcp] e rode claude mcp add skillspector -- skillspector mcp.",
      "exemploUso": "Baixou uma skill de uma lista da comunidade? Rode skillspector scan ./skill-baixada/ e leia o relatório antes de copiá-la para o Claude.",
      "promptInicial": "Utilize a Skill SkillSpector para executar a análise de segurança desta skill antes da instalação, explicando cada risco encontrado. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "seguranca",
        "time",
        "auditoria"
      ]
    },
    {
      "id": "chrome-devtools-mcp",
      "nome": "Chrome DevTools MCP",
      "autor": "ChromeDevTools",
      "repo": "https://github.com/ChromeDevTools/chrome-devtools-mcp",
      "stars": 53737,
      "atualizadoEm": "2026-10-16",
      "licenca": "Apache-2.0",
      "linguagem": "—",
      "categorias": [
        "testes",
        "programacao"
      ],
      "tags": [
        "oficial",
        "navegador",
        "depuracao",
        "performance",
        "automacao",
        "mcp"
      ],
      "destaque": false,
      "tipo": "ferramenta",
      "facilidade": "medio",
      "paraQueServe": "Servidor MCP oficial do time do Chrome DevTools: deixa o Claude controlar e inspecionar um Chrome de verdade — automatizar ações, depurar a fundo e analisar a performance da página.",
      "quandoUsar": "Quando um bug só aparece no navegador, quando você quer que o Claude teste um fluxo clicando na página de verdade, ou quando a página está lenta e você precisa saber por quê.",
      "beneficios": [
        "Oficial, do time do Chrome DevTools",
        "Insights de performance com o próprio DevTools",
        "Automação confiável do navegador",
        "Também tem uma linha de comando para usar sem MCP"
      ],
      "economiaTokens": "O Claude lê o estado real da página (console, rede, performance) em vez de você copiar e colar logs e prints na conversa.",
      "qualidadeRespostas": "Diagnósticos baseados no que de fato acontece no navegador, não em suposições sobre o código.",
      "multiAgentes": "Um agente de testes pode verificar a página no navegador enquanto outros implementam.",
      "melhorias": {
        "programacao": "Depuração com dados reais do navegador",
        "analise": "Performance medida, não estimada",
        "produtividade": "Testes de fluxo sem clicar à mão"
      },
      "instalacao": "No Claude Code: claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest — ou /plugin marketplace add ChromeDevTools/chrome-devtools-mcp e depois /plugin install chrome-devtools-mcp@chrome-devtools-plugins.",
      "exemploUso": "Peça \"abra a página de checkout, preencha o formulário e descubra por que o botão de pagar não responde\": o Claude navega no Chrome, lê o console e aponta o erro.",
      "promptInicial": "Utilize a Skill Chrome DevTools MCP para executar a depuração deste problema no navegador, com base no console, na rede e na performance reais da página. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "frontend",
        "testes",
        "qualidade",
        "saas"
      ]
    },
    {
      "id": "marketingskills",
      "nome": "Marketing Skills (Corey Haines)",
      "autor": "coreyhaines31",
      "repo": "https://github.com/coreyhaines31/marketingskills",
      "stars": 55254,
      "atualizadoEm": "2026-10-15",
      "licenca": "MIT",
      "linguagem": "—",
      "categorias": [
        "escrita",
        "automacao"
      ],
      "tags": [
        "marketing",
        "cro",
        "copywriting",
        "seo",
        "growth",
        "analytics"
      ],
      "destaque": false,
      "tipo": "colecao",
      "facilidade": "medio",
      "paraQueServe": "Coleção de skills de marketing para agentes: otimização de conversão, copywriting, SEO, analytics e growth. Feita para profissionais de marketing e fundadores que querem usar o Claude no trabalho de crescimento.",
      "quandoUsar": "Quando você precisa melhorar uma landing page que não converte, escrever textos de venda, planejar SEO ou entender as métricas de um site.",
      "beneficios": [
        "Skills por tarefa: conversão, copy, SEO, analytics e growth",
        "Dá para instalar só as que interessam",
        "Guia para conectar suas contas de marketing com acesso limitado",
        "Guia complementar para quem nunca usou o terminal"
      ],
      "economiaTokens": "Instalar só as skills que você usa mantém o contexto enxuto.",
      "qualidadeRespostas": "As skills trazem métodos de marketing estabelecidos, então análise e texto seguem boas práticas em vez de conselhos genéricos.",
      "multiAgentes": "Skills diferentes podem ficar com agentes diferentes: um cuida da copy, outro do SEO, outro dos números.",
      "melhorias": {
        "escrita": "Textos de venda com método",
        "analise": "Leitura de métricas e de conversão",
        "produtividade": "Rotinas de marketing aceleradas"
      },
      "instalacao": "No Claude Code: /plugin marketplace add coreyhaines31/marketingskills e depois /plugin install marketing-skills. Ou só as que quiser: npx skills add coreyhaines31/marketingskills --skill cro copywriting.",
      "exemploUso": "Peça para revisar a landing page do seu produto com a skill de conversão: o Claude aponta o que atrapalha quem visita e sugere novas versões do título e do botão principal.",
      "promptInicial": "Utilize a Skill Marketing Skills para executar a análise e a melhoria desta página ou campanha com os métodos de marketing das skills. Analise o contexto completo do projeto antes de realizar alterações. Preserve as regras de negócio existentes, documente os problemas encontrados, explique as decisões tomadas e apresente o resultado de forma organizada. Não altere funcionalidades fora do escopo solicitado.",
      "recomendadoPara": [
        "marketing",
        "conteudo",
        "startup",
        "produto"
      ]
    }
  ],
  "tipos": {
    "skill": "Skill",
    "ferramenta": "Ferramenta",
    "colecao": "Coleção",
    "curso": "Curso"
  },
  "facilidades": {
    "facil": {
      "rotulo": "Sem terminal",
      "ajuda": "Dá para usar no app do Claude ou só navegando — nada para instalar no terminal."
    },
    "medio": {
      "rotulo": "Um comando",
      "ajuda": "Precisa colar um comando pronto (no Claude Code ou no terminal)."
    },
    "tecnico": {
      "rotulo": "Técnico",
      "ajuda": "Precisa configurar ambiente, chaves de API ou integração contínua."
    }
  },
  "linksVerificadosEm": "2026-10-18"
};
