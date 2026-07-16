/* ============================================================
   Biblioteca de Skills para Claude — lógica da aplicação
   Dados: data/skills.json (canônico) → data/skills.js (gerado),
   carregado como window.SKILLS_DB para funcionar via file://.
   ============================================================ */

(function () {
  'use strict';

  var DB = window.SKILLS_DB;
  if (!DB || !Array.isArray(DB.skills)) {
    document.getElementById('grade-skills').innerHTML =
      '<p class="vazio">Não foi possível carregar data/skills.js. Rode <code>node scripts/build-data.mjs</code>.</p>';
    return;
  }

  var SKILLS = DB.skills.slice();
  var CATEGORIAS = {};
  DB.categorias.forEach(function (c) { CATEGORIAS[c.id] = c; });

  var CHAVE_FAVORITAS = 'skills-lib-favoritas';
  var CHAVE_TEMA = 'skills-lib-tema';

  /* ---------- utilidades ---------- */

  function $(sel) { return document.querySelector(sel); }

  function escapeHtml(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  function normalizar(s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  }

  function formatarEstrelas(n) {
    if (n >= 1000) {
      var v = n / 1000;
      return (v >= 100 ? Math.round(v) : v.toFixed(1).replace('.', ',')) + ' mil';
    }
    return String(n);
  }

  function dataRelativa(iso) {
    var dias = Math.floor((Date.now() - new Date(iso + 'T12:00:00Z').getTime()) / 86400000);
    if (dias <= 0) return 'hoje';
    if (dias === 1) return 'ontem';
    if (dias < 30) return 'há ' + dias + ' dias';
    var meses = Math.floor(dias / 30);
    if (meses < 12) return 'há ' + meses + (meses === 1 ? ' mês' : ' meses');
    var anos = Math.floor(dias / 365);
    return 'há ' + anos + (anos === 1 ? ' ano' : ' anos');
  }

  function diasDesde(iso) {
    return Math.floor((Date.now() - new Date(iso + 'T12:00:00Z').getTime()) / 86400000);
  }

  /* ---------- toast (feedback visual) ---------- */

  var toastEl = $('#toast');
  var toastTimer = null;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('visivel');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('visivel'); }, 2200);
  }

  /* ---------- copiar com feedback ---------- */

  function copiarTexto(texto, botao, rotuloOk) {
    function feedback() {
      toast(rotuloOk || 'Copiado para a área de transferência');
      if (botao) {
        var original = botao.innerHTML;
        botao.classList.add('copiado');
        botao.innerHTML = '✓ Copiado!';
        setTimeout(function () {
          botao.classList.remove('copiado');
          botao.innerHTML = original;
        }, 1600);
      }
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(texto).then(feedback, function () { copiarFallback(texto); feedback(); });
    } else {
      copiarFallback(texto);
      feedback();
    }
  }

  function copiarFallback(texto) {
    var ta = document.createElement('textarea');
    ta.value = texto;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* sem suporte */ }
    document.body.removeChild(ta);
  }

  /* ---------- tema claro/escuro ---------- */

  $('#btn-tema').addEventListener('click', function () {
    var raiz = document.documentElement;
    var atual = raiz.dataset.theme;
    if (!atual) {
      atual = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    var novo = atual === 'dark' ? 'light' : 'dark';
    raiz.dataset.theme = novo;
    localStorage.setItem(CHAVE_TEMA, novo);
  });

  /* ---------- favoritas ---------- */

  function lerFavoritas() {
    try { return new Set(JSON.parse(localStorage.getItem(CHAVE_FAVORITAS) || '[]')); }
    catch (e) { return new Set(); }
  }

  var favoritas = lerFavoritas();

  function alternarFavorita(id) {
    if (favoritas.has(id)) favoritas.delete(id); else favoritas.add(id);
    localStorage.setItem(CHAVE_FAVORITAS, JSON.stringify(Array.from(favoritas)));
  }

  /* ---------- render de cards ---------- */

  function chipsCategorias(skill) {
    return skill.categorias.map(function (cid) {
      var c = CATEGORIAS[cid];
      return '<button type="button" class="chip" data-cat="' + escapeHtml(cid) + '">' +
        escapeHtml(c ? c.nome : cid) + '</button>';
    }).join('');
  }

  function statsHtml(skill) {
    return '<div class="card-stats">' +
      '<span class="stat-estrelas" title="' + skill.stars.toLocaleString('pt-BR') + ' estrelas">★ ' +
      formatarEstrelas(skill.stars) + '</span>' +
      '<span title="Último commit em ' + escapeHtml(skill.atualizadoEm) + '">↻ ' + dataRelativa(skill.atualizadoEm) + '</span>' +
      '<span>' + escapeHtml(skill.licenca) + '</span>' +
      '</div>';
  }

  function botaoFavHtml(skill) {
    var ativa = favoritas.has(skill.id);
    return '<button type="button" class="btn-fav" data-fav="' + escapeHtml(skill.id) + '" ' +
      'aria-pressed="' + ativa + '" aria-label="Favoritar ' + escapeHtml(skill.nome) + '">' +
      (ativa ? '♥' : '♡') + '</button>';
  }

  function cardHtml(skill, mini) {
    return '<article class="card' + (mini ? ' mini' : '') + '" data-skill="' + escapeHtml(skill.id) + '">' +
      '<div class="card-cab">' +
        '<div class="card-titulo"><h3>' + escapeHtml(skill.nome) + '</h3>' +
        '<span class="autor">' + escapeHtml(skill.autor) + '</span></div>' +
        botaoFavHtml(skill) +
      '</div>' +
      statsHtml(skill) +
      '<div class="card-chips">' + chipsCategorias(skill) + '</div>' +
      '<p class="card-desc">' + escapeHtml(skill.paraQueServe) + '</p>' +
      (mini ? '' :
        '<p class="card-quando"><strong>Quando usar</strong>' + escapeHtml(skill.quandoUsar) + '</p>') +
      '<div class="card-acoes">' +
        '<button type="button" class="btn-acao principal" data-detalhes="' + escapeHtml(skill.id) + '">Detalhes</button>' +
        '<a class="btn-acao" href="' + escapeHtml(skill.repo) + '" target="_blank" rel="noopener noreferrer">GitHub ↗</a>' +
        '<button type="button" class="btn-acao" data-copiar-prompt="' + escapeHtml(skill.id) + '">Copiar prompt</button>' +
        (mini ? '' :
          '<button type="button" class="btn-acao" data-copiar-instalacao="' + escapeHtml(skill.id) + '">Copiar instalação</button>') +
      '</div>' +
    '</article>';
  }

  /* ---------- faixas de destaque ---------- */

  function renderFaixas() {
    var recomendadas = SKILLS.filter(function (s) { return s.destaque; })
      .sort(function (a, b) { return b.stars - a.stars; });
    var populares = SKILLS.slice().sort(function (a, b) { return b.stars - a.stars; }).slice(0, 8);
    var recentes = SKILLS.slice().sort(function (a, b) {
      return a.atualizadoEm < b.atualizadoEm ? 1 : -1;
    }).slice(0, 8);

    $('#trilho-recomendadas').innerHTML = recomendadas.map(function (s) { return cardHtml(s, true); }).join('');
    $('#trilho-populares').innerHTML = populares.map(function (s) { return cardHtml(s, true); }).join('');
    $('#trilho-recentes').innerHTML = recentes.map(function (s) { return cardHtml(s, true); }).join('');
  }

  /* ---------- pesquisa, filtros e ordenação ---------- */

  var estado = {
    busca: '',
    categoria: '',
    minEstrelas: 0,
    atualizadaEmDias: 0,   // 0 = qualquer
    ordem: 'popularidade',
    soFavoritas: false
  };

  function aplicarFiltros() {
    var termo = normalizar(estado.busca);
    var lista = SKILLS.filter(function (s) {
      if (estado.categoria && s.categorias.indexOf(estado.categoria) === -1) return false;
      if (s.stars < estado.minEstrelas) return false;
      if (estado.atualizadaEmDias && diasDesde(s.atualizadoEm) > estado.atualizadaEmDias) return false;
      if (estado.soFavoritas && !favoritas.has(s.id)) return false;
      if (termo) {
        var alvo = normalizar([
          s.nome, s.autor, s.paraQueServe, s.quandoUsar,
          s.tags.join(' '),
          s.categorias.map(function (c) { return CATEGORIAS[c] ? CATEGORIAS[c].nome : c; }).join(' ')
        ].join(' '));
        if (alvo.indexOf(termo) === -1) return false;
      }
      return true;
    });

    if (estado.ordem === 'popularidade') {
      lista.sort(function (a, b) { return b.stars - a.stars; });
    } else if (estado.ordem === 'recentes') {
      lista.sort(function (a, b) { return a.atualizadoEm < b.atualizadoEm ? 1 : -1; });
    } else {
      lista.sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); });
    }
    return lista;
  }

  function renderCatalogo() {
    var lista = aplicarFiltros();
    $('#grade-skills').innerHTML = lista.map(function (s) { return cardHtml(s, false); }).join('');
    $('#vazio').hidden = lista.length > 0;
    $('#contagem-resultados').textContent =
      lista.length + ' de ' + SKILLS.length + ' skills' +
      (estado.soFavoritas ? ' · só favoritas' : '');
  }

  function preencherFiltroCategorias() {
    var sel = $('#filtro-categoria');
    DB.categorias.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.nome;
      sel.appendChild(opt);
    });
  }

  $('#campo-busca').addEventListener('input', function (e) {
    estado.busca = e.target.value;
    renderCatalogo();
  });
  $('#filtro-categoria').addEventListener('change', function (e) {
    estado.categoria = e.target.value; renderCatalogo();
  });
  $('#filtro-estrelas').addEventListener('change', function (e) {
    estado.minEstrelas = parseInt(e.target.value, 10) || 0; renderCatalogo();
  });
  $('#filtro-atualizacao').addEventListener('change', function (e) {
    estado.atualizadaEmDias = parseInt(e.target.value, 10) || 0; renderCatalogo();
  });
  $('#filtro-ordem').addEventListener('change', function (e) {
    estado.ordem = e.target.value; renderCatalogo();
  });
  $('#filtro-favoritas').addEventListener('click', function () {
    estado.soFavoritas = !estado.soFavoritas;
    this.setAttribute('aria-pressed', String(estado.soFavoritas));
    renderCatalogo();
  });
  $('#btn-limpar').addEventListener('click', function () {
    estado = { busca: '', categoria: '', minEstrelas: 0, atualizadaEmDias: 0, ordem: 'popularidade', soFavoritas: false };
    $('#campo-busca').value = '';
    $('#filtro-categoria').value = '';
    $('#filtro-estrelas').value = '0';
    $('#filtro-atualizacao').value = '';
    $('#filtro-ordem').value = 'popularidade';
    $('#filtro-favoritas').setAttribute('aria-pressed', 'false');
    renderCatalogo();
  });

  /* ---------- modal de detalhes ---------- */

  var modal = $('#modal');

  function secao(titulo, corpoHtml) {
    return corpoHtml ? '<div class="modal-secao"><h3>' + titulo + '</h3>' + corpoHtml + '</div>' : '';
  }

  function abrirModal(skill) {
    var beneficios = (skill.beneficios || []).map(function (b) {
      return '<li>' + escapeHtml(b) + '</li>';
    }).join('');

    var melhorias = '';
    if (skill.melhorias) {
      melhorias = Object.keys(skill.melhorias).map(function (k) {
        return '<div class="melhoria-linha"><span class="melhoria-chave">' + escapeHtml(k) + '</span>' +
          '<span>' + escapeHtml(skill.melhorias[k]) + '</span></div>';
      }).join('');
    }

    $('#modal-conteudo').innerHTML =
      '<div class="modal-cab">' +
        '<h2 id="modal-titulo">' + escapeHtml(skill.nome) + '</h2>' +
        '<span class="autor">' + escapeHtml(skill.autor) + ' · ' + escapeHtml(skill.linguagem || '') + '</span>' +
        '<div class="modal-stats">' +
          '<span class="stat-estrelas">★ ' + skill.stars.toLocaleString('pt-BR') + ' estrelas</span>' +
          '<span>↻ atualizado ' + dataRelativa(skill.atualizadoEm) + ' (' + escapeHtml(skill.atualizadoEm) + ')</span>' +
          '<span>licença: ' + escapeHtml(skill.licenca) + '</span>' +
        '</div>' +
        '<div class="card-chips" style="margin-top:10px">' + chipsCategorias(skill) + '</div>' +
      '</div>' +
      secao('Para que serve', '<p>' + escapeHtml(skill.paraQueServe) + '</p>') +
      secao('Quando usar', '<p>' + escapeHtml(skill.quandoUsar) + '</p>') +
      secao('Principais benefícios', beneficios ? '<ul>' + beneficios + '</ul>' : '') +
      secao('Como economiza tokens', '<p>' + escapeHtml(skill.economiaTokens) + '</p>') +
      secao('Como melhora a qualidade das respostas', '<p>' + escapeHtml(skill.qualidadeRespostas) + '</p>') +
      secao('Uso com múltiplos agentes', '<p>' + escapeHtml(skill.multiAgentes) + '</p>') +
      secao('O que ela melhora', melhorias) +
      secao('Instalação / configuração',
        '<div class="bloco-copia">' + escapeHtml(skill.instalacao) + '</div>' +
        '<button type="button" class="btn-acao" data-copiar-instalacao="' + escapeHtml(skill.id) + '">Copiar instalação</button>') +
      secao('Exemplo de uso', '<p>' + escapeHtml(skill.exemploUso) + '</p>') +
      secao('Prompt inicial recomendado',
        '<div class="bloco-copia">' + escapeHtml(skill.promptInicial) + '</div>' +
        '<button type="button" class="btn-acao" data-copiar-prompt="' + escapeHtml(skill.id) + '">Copiar prompt</button>') +
      '<div class="modal-acoes">' +
        '<a class="btn-acao principal" href="' + escapeHtml(skill.repo) + '" target="_blank" rel="noopener noreferrer">Abrir no GitHub ↗</a>' +
        botaoFavHtml(skill) +
      '</div>';

    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal-fechar').focus();
  }

  function fecharModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-fechar]')) fecharModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) fecharModal();
  });

  /* ---------- recomendação por tipo de projeto ---------- */

  // Cada área liga gatilhos (palavras no texto do usuário, sem acento)
  // a skills candidatas. "base: true" = entra em qualquer projeto de software.
  var AREAS_RECOMENDACAO = [
    {
      titulo: 'Arquitetura e planejamento',
      icone: '▦',
      base: true,
      gatilhos: ['arquitetura', 'planejamento', 'mvp', 'produto', 'requisito', 'prd', 'roadmap', 'saas', 'sistema', 'plataforma', 'startup'],
      motivo: 'Estruture requisitos, arquitetura e backlog antes de escrever código.',
      skills: ['bmad-method', 'superpowers', 'spec-workflow', 'claude-task-master']
    },
    {
      titulo: 'Revisão de código',
      icone: '⌘',
      base: true,
      gatilhos: ['codigo', 'revisao', 'refator', 'qualidade', 'backend', 'frontend', 'api'],
      motivo: 'Revisores especialistas encontram problemas antes do merge.',
      skills: ['wshobson-agents', 'awesome-cc-subagents', 'superclaude']
    },
    {
      titulo: 'Segurança e auditoria',
      icone: '◉',
      base: true,
      gatilhos: ['seguranca', 'auth', 'login', 'pagamento', 'lgpd', 'senha', 'upload', 'api', 'banco'],
      motivo: 'Auditoria automática de vulnerabilidades em cada mudança.',
      skills: ['cc-security-review', 'wshobson-agents']
    },
    {
      titulo: 'Testes e depuração',
      icone: '✓',
      base: true,
      gatilhos: ['teste', 'tdd', 'bug', 'depura', 'qualidade', 'ci'],
      motivo: 'Disciplina de testes imposta por ferramenta, não por lembrete.',
      skills: ['tdd-guard', 'superpowers']
    },
    {
      titulo: 'Documentação',
      icone: '▤',
      base: true,
      gatilhos: ['documenta', 'docs', 'readme', 'spec', 'biblioteca', 'framework', 'integracao'],
      motivo: 'Docs atualizadas das dependências e specs geradas por fase.',
      skills: ['context7', 'anthropic-skills', 'spec-workflow']
    },
    {
      titulo: 'Gerenciamento de contexto e tokens',
      icone: '◌',
      base: true,
      gatilhos: ['token', 'contexto', 'custo', 'monorepo', 'grande', 'legado', 'banco de dados'],
      motivo: 'Contexto sob controle: busca semântica, medição e roteamento de custo.',
      skills: ['claude-context', 'context7', 'ccusage', 'claude-code-router']
    },
    {
      titulo: 'Múltiplos agentes e orquestração',
      icone: '⬡',
      base: true,
      gatilhos: ['agente', 'paralel', 'orquestr', 'swarm', 'equipe', 'time', 'migra'],
      motivo: 'Divida o trabalho entre agentes especializados rodando em paralelo.',
      skills: ['ruflo', 'wshobson-agents', 'awesome-cc-subagents']
    },
    {
      titulo: 'Interface, UX e design',
      icone: '◐',
      base: false,
      gatilhos: ['frontend', 'front-end', 'ui', 'ux', 'design', 'figma', 'tela', 'interface', 'mobile', 'app', 'react', 'vue', 'landing'],
      motivo: 'Do Figma ao código fiel, com revisão de design automatizada.',
      skills: ['figma-context-mcp', 'oneredoak-workflows', 'contains-studio-agents']
    },
    {
      titulo: 'Automação e integrações',
      icone: '⚙',
      base: false,
      gatilhos: ['integra', 'automa', 'webhook', 'n8n', 'workflow', 'crm', 'zapier', 'api'],
      motivo: 'Automatize processos e use as skills oficiais dos serviços que você integra.',
      skills: ['n8n-mcp', 'awesome-agent-skills']
    },
    {
      titulo: 'Escrita e comunicação',
      icone: '✎',
      base: false,
      gatilhos: ['escrita', 'conteudo', 'marketing', 'relatorio', 'documento', 'apresentacao', 'blog', 'email'],
      motivo: 'Documentos e conteúdo profissionais gerados como arquivos reais.',
      skills: ['anthropic-skills', 'alireza-claude-skills']
    },
    {
      titulo: 'Pesquisa e análise de dados',
      icone: '◈',
      base: false,
      gatilhos: ['dados', 'analise', 'rag', 'busca', 'dashboard', 'relatorio', 'pdf', 'ia', 'llm', 'machine learning'],
      motivo: 'Padrões prontos de RAG, análise de documentos e avaliação.',
      skills: ['claude-cookbooks', 'claude-context']
    },
    {
      titulo: 'Criação e melhoria de prompts',
      icone: '❝',
      base: false,
      gatilhos: ['prompt', 'ia', 'llm', 'chatbot', 'assistente', 'gpt', 'claude api'],
      motivo: 'Prompts em produção merecem engenharia, não tentativa e erro.',
      skills: ['prompt-eng-tutorial', 'superclaude']
    }
  ];

  function recomendar(textoProjeto) {
    var texto = normalizar(textoProjeto);
    var pareceSoftware = AREAS_RECOMENDACAO.some(function (a) {
      return a.gatilhos.some(function (g) { return texto.indexOf(g) !== -1; });
    });

    var grupos = [];
    AREAS_RECOMENDACAO.forEach(function (area) {
      var acertos = area.gatilhos.filter(function (g) { return texto.indexOf(g) !== -1; });
      var incluir = acertos.length > 0 || (area.base && pareceSoftware);
      if (!incluir) return;
      var skillsDaArea = area.skills
        .map(function (id) { return SKILLS.find(function (s) { return s.id === id; }); })
        .filter(Boolean)
        .slice(0, 3);
      grupos.push({ area: area, acertos: acertos, skills: skillsDaArea, peso: acertos.length + (area.base ? 0.5 : 0) });
    });

    grupos.sort(function (a, b) { return b.peso - a.peso; });
    return grupos;
  }

  function renderRecomendacao() {
    var texto = $('#campo-projeto').value.trim();
    var alvo = $('#resultado-recomendacao');
    if (!texto) {
      toast('Descreva seu projeto primeiro');
      $('#campo-projeto').focus();
      return;
    }
    var grupos = recomendar(texto);
    if (!grupos.length) {
      alvo.hidden = false;
      alvo.innerHTML = '<p class="rec-intro">Não reconheci o tipo de projeto. Tente descrever a stack e as frentes ' +
        '(ex.: frontend, backend, banco de dados, APIs, testes, conteúdo…).</p>';
      return;
    }

    var html = '<p class="rec-intro">Para este projeto, recomendo cobrir <strong>' + grupos.length +
      (grupos.length === 1 ? ' frente' : ' frentes') + '</strong>. Em cada uma, copie o prompt inicial da skill e cole no Claude para começar.</p>';

    html += grupos.map(function (g) {
      var itens = g.skills.map(function (s) {
        return '<li class="rec-item">' +
          '<span class="rec-item-nome">' + escapeHtml(s.nome) + '</span>' +
          '<span class="card-stats"><span class="stat-estrelas">★ ' + formatarEstrelas(s.stars) + '</span></span>' +
          '<span class="rec-item-acoes">' +
            '<button type="button" class="btn-acao" data-copiar-prompt="' + escapeHtml(s.id) + '">Copiar prompt</button>' +
            '<button type="button" class="btn-acao principal" data-detalhes="' + escapeHtml(s.id) + '">Detalhes</button>' +
          '</span>' +
          '<span class="rec-item-desc">' + escapeHtml(s.paraQueServe) + '</span>' +
        '</li>';
      }).join('');
      return '<div class="rec-grupo">' +
        '<h3><span class="rec-icone" aria-hidden="true">' + g.area.icone + '</span>' + escapeHtml(g.area.titulo) + '</h3>' +
        '<p class="rec-motivo">' + escapeHtml(g.area.motivo) +
        (g.acertos.length ? ' <em>(detectado: ' + escapeHtml(g.acertos.slice(0, 4).join(', ')) + ')</em>' : '') + '</p>' +
        '<ul class="rec-lista">' + itens + '</ul>' +
      '</div>';
    }).join('');

    alvo.hidden = false;
    alvo.innerHTML = html;
    alvo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  $('#btn-recomendar').addEventListener('click', renderRecomendacao);
  $('#campo-projeto').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) renderRecomendacao();
  });
  $('#btn-exemplo').addEventListener('click', function () {
    $('#campo-projeto').value =
      'Estou desenvolvendo um sistema SaaS com frontend, backend, banco de dados e integrações com APIs.';
    renderRecomendacao();
  });

  /* ---------- delegação de eventos global ---------- */

  document.addEventListener('click', function (e) {
    var alvo;

    if ((alvo = e.target.closest('[data-copiar-prompt]'))) {
      var s1 = SKILLS.find(function (s) { return s.id === alvo.dataset.copiarPrompt; });
      if (s1) copiarTexto(s1.promptInicial, alvo, 'Prompt copiado — cole no Claude para começar');
      return;
    }
    if ((alvo = e.target.closest('[data-copiar-instalacao]'))) {
      var s2 = SKILLS.find(function (s) { return s.id === alvo.dataset.copiarInstalacao; });
      if (s2) copiarTexto(s2.instalacao, alvo, 'Instruções de instalação copiadas');
      return;
    }
    if ((alvo = e.target.closest('[data-detalhes]'))) {
      var s3 = SKILLS.find(function (s) { return s.id === alvo.dataset.detalhes; });
      if (s3) abrirModal(s3);
      return;
    }
    if ((alvo = e.target.closest('[data-fav]'))) {
      alternarFavorita(alvo.dataset.fav);
      renderFaixas();
      renderCatalogo();
      if (!modal.hidden) {
        var s4 = SKILLS.find(function (s) { return s.id === alvo.dataset.fav; });
        if (s4) abrirModal(s4);
      }
      toast(favoritas.has(alvo.dataset.fav) ? 'Adicionada às favoritas ♥' : 'Removida das favoritas');
      return;
    }
    if ((alvo = e.target.closest('.chip[data-cat]'))) {
      estado.categoria = alvo.dataset.cat;
      $('#filtro-categoria').value = estado.categoria;
      if (!modal.hidden) fecharModal();
      renderCatalogo();
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });

  /* ---------- inicialização ---------- */

  preencherFiltroCategorias();
  renderFaixas();
  renderCatalogo();

  $('#meta-dados').textContent =
    SKILLS.length + ' skills · ' + DB.categorias.length + ' categorias · dados do GitHub coletados em ' +
    DB.coletadoEm.split('-').reverse().join('/');
})();
