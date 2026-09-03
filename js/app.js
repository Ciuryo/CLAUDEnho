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
  var TIPOS = DB.tipos || {};
  var FACILIDADES = DB.facilidades || {};

  var CHAVE_FAVORITAS = 'skills-lib-favoritas';
  var CHAVE_TEMA = 'skills-lib-tema';

  // localStorage pode lançar exceção em iframes sandbox — degrada sem quebrar
  var armazenamento = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* indisponível */ } }
  };

  /* ---------- utilidades ---------- */

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); }

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
      if (v >= 100) return Math.round(v) + ' mil';
      return (v % 1 === 0 ? String(v) : v.toFixed(1).replace('.', ',')) + ' mil';
    }
    return String(n);
  }

  function diasDesde(iso) {
    return Math.floor((Date.now() - new Date(iso + 'T12:00:00Z').getTime()) / 86400000);
  }

  function dataRelativa(iso) {
    var dias = diasDesde(iso);
    if (dias <= 0) return 'hoje';
    if (dias === 1) return 'ontem';
    if (dias < 30) return 'há ' + dias + ' dias';
    var meses = Math.floor(dias / 30);
    if (meses < 12) return 'há ' + meses + (meses === 1 ? ' mês' : ' meses');
    var anos = Math.floor(dias / 365);
    return 'há ' + anos + (anos === 1 ? ' ano' : ' anos');
  }

  function dataBR(iso) { return iso.split('-').reverse().join('/'); }

  function mesesTexto(n) { return n + (n === 1 ? ' mês' : ' meses'); }

  /* ---------- toast (feedback visual) ---------- */

  var toastEl = $('#toast');
  var toastTimer = null;

  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('visivel');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('visivel'); }, 2400);
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

  function temaAtivo() {
    var t = document.documentElement.dataset.theme;
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  $('#btn-tema').addEventListener('click', function () {
    var novo = temaAtivo() === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = novo;
    armazenamento.set(CHAVE_TEMA, novo);
    this.setAttribute('aria-label', novo === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
  });

  /* ---------- favoritas ---------- */

  function lerFavoritas() {
    try { return new Set(JSON.parse(armazenamento.get(CHAVE_FAVORITAS) || '[]')); }
    catch (e) { return new Set(); }
  }

  var favoritas = lerFavoritas();

  function alternarFavorita(id) {
    if (favoritas.has(id)) favoritas.delete(id); else favoritas.add(id);
    armazenamento.set(CHAVE_FAVORITAS, JSON.stringify(Array.from(favoritas)));
    // atualiza todos os botões daquela skill sem re-renderizar a página inteira
    $$('[data-fav="' + id + '"]').forEach(function (b) {
      var ativa = favoritas.has(id);
      b.setAttribute('aria-pressed', String(ativa));
      b.textContent = ativa ? '♥' : '♡';
    });
    atualizarContadorFavoritas();
  }

  function atualizarContadorFavoritas() {
    var btn = $('#filtro-favoritas');
    btn.textContent = favoritas.size ? '♥ Só favoritas (' + favoritas.size + ')' : '♥ Só favoritas';
  }

  /* ---------- render de cards ---------- */

  // Selos que respondem "o que é isso?" e "eu consigo usar?" — o que mais
  // trava quem está chegando agora no ecossistema.
  function selosHtml(skill) {
    var f = FACILIDADES[skill.facilidade];
    return '<div class="card-selos">' +
      '<span class="selo selo-tipo">' + escapeHtml(TIPOS[skill.tipo] || skill.tipo) + '</span>' +
      (f ? '<span class="selo selo-' + escapeHtml(skill.facilidade) + '" title="' + escapeHtml(f.ajuda) + '">' +
        escapeHtml(f.rotulo) + '</span>' : '') +
    '</div>';
  }

  function chipsCategorias(skill) {
    return skill.categorias.map(function (cid) {
      var c = CATEGORIAS[cid];
      return '<button type="button" class="chip" data-cat="' + escapeHtml(cid) + '">' +
        escapeHtml(c ? c.nome : cid) + '</button>';
    }).join('');
  }

  function statsHtml(skill) {
    return '<div class="card-stats">' +
      '<span class="stat-estrelas" title="' + skill.stars.toLocaleString('pt-BR') + ' estrelas no GitHub">★ ' +
      formatarEstrelas(skill.stars) + '</span>' +
      '<span title="Último commit em ' + escapeHtml(dataBR(skill.atualizadoEm)) + '">↻ ' + dataRelativa(skill.atualizadoEm) + '</span>' +
      '<span>' + escapeHtml(skill.licenca) + '</span>' +
      '</div>';
  }

  function botaoFavHtml(skill) {
    var ativa = favoritas.has(skill.id);
    return '<button type="button" class="btn-fav" data-fav="' + escapeHtml(skill.id) + '" ' +
      'aria-pressed="' + ativa + '" title="Favoritar" aria-label="Favoritar ' + escapeHtml(skill.nome) + '">' +
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
      selosHtml(skill) +
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

  /* ---------- estado, pesquisa e filtros ---------- */

  var PADRAO = {
    busca: '', categoria: '', minEstrelas: 0,
    atualizadaEmDias: 0, ordem: 'popularidade', soFavoritas: false, facilidade: ''
  };
  var estado = Object.assign({}, PADRAO);

  function pontuarRelevancia(skill, termo) {
    var p = 0;
    if (normalizar(skill.nome).indexOf(termo) !== -1) p += 100;
    if (normalizar(skill.autor).indexOf(termo) !== -1) p += 40;
    if (skill.tags.some(function (t) { return normalizar(t).indexOf(termo) !== -1; })) p += 30;
    if (normalizar(skill.paraQueServe).indexOf(termo) !== -1) p += 15;
    if (normalizar(skill.quandoUsar).indexOf(termo) !== -1) p += 10;
    return p;
  }

  function textoBuscavel(s) {
    return normalizar([
      s.nome, s.autor, s.paraQueServe, s.quandoUsar, s.tags.join(' '),
      TIPOS[s.tipo] || '', (FACILIDADES[s.facilidade] || {}).rotulo || '',
      s.categorias.map(function (c) { return CATEGORIAS[c] ? CATEGORIAS[c].nome : c; }).join(' ')
    ].join(' '));
  }

  function aplicarFiltros() {
    var termo = normalizar(estado.busca);
    var lista = SKILLS.filter(function (s) {
      if (estado.categoria && s.categorias.indexOf(estado.categoria) === -1) return false;
      if (estado.facilidade && s.facilidade !== estado.facilidade) return false;
      if (s.stars < estado.minEstrelas) return false;
      if (estado.atualizadaEmDias && diasDesde(s.atualizadoEm) > estado.atualizadaEmDias) return false;
      if (estado.soFavoritas && !favoritas.has(s.id)) return false;
      if (termo && textoBuscavel(s).indexOf(termo) === -1) return false;
      return true;
    });

    if (estado.ordem === 'relevancia' && termo) {
      lista.sort(function (a, b) {
        var d = pontuarRelevancia(b, termo) - pontuarRelevancia(a, termo);
        return d !== 0 ? d : b.stars - a.stars;
      });
    } else if (estado.ordem === 'recentes') {
      lista.sort(function (a, b) { return a.atualizadoEm < b.atualizadoEm ? 1 : -1; });
    } else if (estado.ordem === 'nome') {
      lista.sort(function (a, b) { return a.nome.localeCompare(b.nome, 'pt-BR'); });
    } else {
      lista.sort(function (a, b) { return b.stars - a.stars; });
    }
    return lista;
  }

  function descreverFiltros() {
    var partes = [];
    if (estado.busca) partes.push('busca "' + estado.busca + '"');
    if (estado.categoria && CATEGORIAS[estado.categoria]) partes.push(CATEGORIAS[estado.categoria].nome);
    if (estado.facilidade && FACILIDADES[estado.facilidade]) partes.push(FACILIDADES[estado.facilidade].rotulo);
    if (estado.minEstrelas) partes.push(formatarEstrelas(estado.minEstrelas) + '+ estrelas');
    if (estado.atualizadaEmDias) partes.push('atualizadas em ' + estado.atualizadaEmDias + ' dias');
    if (estado.soFavoritas) partes.push('só favoritas');
    return partes.join(' · ');
  }

  function renderCatalogo() {
    var lista = aplicarFiltros();
    $('#grade-skills').innerHTML = lista.map(function (s) { return cardHtml(s, false); }).join('');
    $('#vazio').hidden = lista.length > 0;
    var desc = descreverFiltros();
    $('#contagem-resultados').textContent =
      lista.length + ' de ' + SKILLS.length + ' skills' + (desc ? ' · ' + desc : '');
    $('#btn-limpar').disabled = !desc;
    escreverHash();
  }

  function preencherFiltroFacilidade() {
    var sel = $('#filtro-facilidade');
    var contagem = {};
    SKILLS.forEach(function (s) { contagem[s.facilidade] = (contagem[s.facilidade] || 0) + 1; });
    Object.keys(FACILIDADES).forEach(function (id) {
      var opt = document.createElement('option');
      opt.value = id;
      opt.textContent = FACILIDADES[id].rotulo + ' (' + (contagem[id] || 0) + ')';
      sel.appendChild(opt);
    });
  }

  function preencherFiltroCategorias() {
    var sel = $('#filtro-categoria');
    var contagem = {};
    SKILLS.forEach(function (s) {
      s.categorias.forEach(function (c) { contagem[c] = (contagem[c] || 0) + 1; });
    });
    DB.categorias.forEach(function (c) {
      var opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.nome + ' (' + (contagem[c.id] || 0) + ')';
      sel.appendChild(opt);
    });
  }

  function sincronizarControles() {
    $('#campo-busca').value = estado.busca;
    $('#filtro-categoria').value = estado.categoria;
    $('#filtro-facilidade').value = estado.facilidade;
    $('#filtro-estrelas').value = String(estado.minEstrelas);
    $('#filtro-atualizacao').value = estado.atualizadaEmDias ? String(estado.atualizadaEmDias) : '';
    $('#filtro-ordem').value = estado.ordem;
    $('#filtro-favoritas').setAttribute('aria-pressed', String(estado.soFavoritas));
  }

  /* ---------- estado na URL (visões compartilháveis) ---------- */

  var lendoHash = false;

  function escreverHash() {
    if (lendoHash) return;
    var p = [];
    if (estado.busca) p.push('q=' + encodeURIComponent(estado.busca));
    if (estado.categoria) p.push('cat=' + estado.categoria);
    if (estado.facilidade) p.push('facil=' + estado.facilidade);
    if (estado.minEstrelas) p.push('min=' + estado.minEstrelas);
    if (estado.atualizadaEmDias) p.push('dias=' + estado.atualizadaEmDias);
    if (estado.ordem !== PADRAO.ordem) p.push('ord=' + estado.ordem);
    if (estado.soFavoritas) p.push('fav=1');
    if (skillAberta) p.push('skill=' + skillAberta);
    if (trilhaSelecionada) p.push('trilha=' + trilhaSelecionada);
    var hash = p.length ? '#' + p.join('&') : '';
    try {
      history.replaceState(null, '', location.pathname + location.search + hash);
    } catch (e) {
      if (hash) location.hash = hash;
    }
  }

  function lerHash() {
    var bruto = location.hash.replace(/^#/, '');
    estado = Object.assign({}, PADRAO);
    trilhaSelecionada = null;
    if (!bruto) return {};
    var p = {};
    bruto.split('&').forEach(function (par) {
      var i = par.indexOf('=');
      if (i > 0) p[par.slice(0, i)] = decodeURIComponent(par.slice(i + 1));
    });
    lendoHash = true;
    if (p.q) estado.busca = p.q;
    if (p.cat && CATEGORIAS[p.cat]) estado.categoria = p.cat;
    if (p.facil && FACILIDADES[p.facil]) estado.facilidade = p.facil;
    if (p.min) estado.minEstrelas = parseInt(p.min, 10) || 0;
    if (p.dias) estado.atualizadaEmDias = parseInt(p.dias, 10) || 0;
    if (p.ord) estado.ordem = p.ord;
    if (p.fav === '1') estado.soFavoritas = true;
    lendoHash = false;
    return { skill: p.skill || null, trilha: p.trilha || null };
  }

  window.addEventListener('hashchange', function () {
    var link = lerHash();
    sincronizarControles();
    renderCatalogo();
    if (link.skill) {
      var s = acharSkill(link.skill);
      if (s && skillAberta !== link.skill) abrirModal(s);
    } else if (!modal.hidden) {
      fecharModal();
    }
    if (link.trilha) selecionarTrilha(link.trilha, { atualizarHash: false });
  });

  /* ---------- ligações dos filtros ---------- */

  $('#campo-busca').addEventListener('input', function (e) {
    var tinhaBusca = !!estado.busca;
    estado.busca = e.target.value;
    // ao começar a buscar, ordena por relevância (visível e reversível no seletor)
    if (!tinhaBusca && estado.busca && estado.ordem === 'popularidade') estado.ordem = 'relevancia';
    if (!estado.busca && estado.ordem === 'relevancia') estado.ordem = 'popularidade';
    $('#filtro-ordem').value = estado.ordem;
    renderCatalogo();
  });
  $('#filtro-categoria').addEventListener('change', function (e) {
    estado.categoria = e.target.value; renderCatalogo();
  });
  $('#filtro-facilidade').addEventListener('change', function (e) {
    estado.facilidade = e.target.value; renderCatalogo();
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
    estado = Object.assign({}, PADRAO);
    sincronizarControles();
    renderCatalogo();
    toast('Filtros limpos');
  });

  /* ---------- modal de detalhes ---------- */

  var modal = $('#modal');
  var skillAberta = null;
  var trilhaSelecionada = null;
  var focoAnterior = null;

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
        '<span class="autor">' + escapeHtml(skill.autor) + (skill.linguagem ? ' · ' + escapeHtml(skill.linguagem) : '') + '</span>' +
        '<div class="modal-stats">' +
          '<span class="stat-estrelas">★ ' + skill.stars.toLocaleString('pt-BR') + ' estrelas</span>' +
          '<span>↻ atualizado ' + dataRelativa(skill.atualizadoEm) + ' (' + escapeHtml(dataBR(skill.atualizadoEm)) + ')</span>' +
          '<span>licença: ' + escapeHtml(skill.licenca) + '</span>' +
        '</div>' +
        '<div class="card-chips modal-chips">' + chipsCategorias(skill) + '</div>' +
      '</div>' +
      (FACILIDADES[skill.facilidade]
        ? '<p class="modal-facilidade selo-' + escapeHtml(skill.facilidade) + '-borda">' +
          '<strong>' + escapeHtml(TIPOS[skill.tipo] || skill.tipo) + ' · ' +
          escapeHtml(FACILIDADES[skill.facilidade].rotulo) + '</strong> — ' +
          escapeHtml(FACILIDADES[skill.facilidade].ajuda) + '</p>'
        : '') +
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
        '<button type="button" class="btn-acao" data-copiar-link="' + escapeHtml(skill.id) + '">Copiar link desta skill</button>' +
        botaoFavHtml(skill) +
      '</div>';

    focoAnterior = document.activeElement;
    skillAberta = skill.id;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    $('.modal-caixa').scrollTop = 0;
    $('.modal-fechar').focus();
    escreverHash();
  }

  function fecharModal() {
    modal.hidden = true;
    skillAberta = null;
    document.body.style.overflow = '';
    escreverHash();
    if (focoAnterior && document.contains(focoAnterior)) focoAnterior.focus();
  }

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-fechar]')) fecharModal();
  });

  // acessibilidade: prende o foco dentro do modal enquanto ele estiver aberto
  modal.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab' || modal.hidden) return;
    var foco = $$('#modal a[href], #modal button:not([disabled])');
    if (!foco.length) return;
    var primeiro = foco[0], ultimo = foco[foco.length - 1];
    if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
  });

  /* ---------- atalhos de teclado ---------- */

  document.addEventListener('keydown', function (e) {
    var emCampo = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName);
    if (e.key === 'Escape') {
      if (!modal.hidden) { fecharModal(); return; }
      if (emCampo && document.activeElement.id === 'campo-busca' && estado.busca) {
        estado.busca = '';
        $('#campo-busca').value = '';
        renderCatalogo();
      }
      return;
    }
    if ((e.key === '/' || e.key === 's') && !emCampo && modal.hidden && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      $('#campo-busca').focus();
      $('#campo-busca').select();
    }
  });

  /* ---------- trilhas por perfil ---------- */

  // Curadoria editorial (não deriva de palavras-chave): cada trilha é uma
  // sequência fixa e testada de skills para um perfil real de usuário.
  var TRILHAS = [
    {
      id: 'sem-terminal',
      titulo: 'Nunca usei terminal',
      icone: '🌱',
      publico: 'Uso o Claude pelo site ou pelo app Desktop',
      resumo: 'Comece sem precisar instalar nada além do Claude Desktop ou do claude.ai.',
      passos: [
        { skillId: 'anthropic-skills', motivo: 'Gera documentos Word, Excel e PowerPoint reais, direto no Desktop ou no site.' },
        { skillId: 'prompt-eng-tutorial', motivo: 'Ensina a escrever pedidos que o Claude entende de primeira, sem tentativa e erro.' },
        { skillId: 'awesome-claude-skills', motivo: 'Catálogo para descobrir mais skills que funcionam fora do terminal.' }
      ]
    },
    {
      id: 'primeira-semana-code',
      titulo: 'Primeira semana no Claude Code',
      icone: '⌨',
      publico: 'Acabei de instalar o Claude Code no terminal',
      resumo: 'A ordem que evita os erros mais comuns de quem está começando.',
      passos: [
        { skillId: 'claude-code-templates', motivo: 'Configura o projeto com boas práticas em um único comando.' },
        { skillId: 'context7', motivo: 'Evita que o Claude sugira código de versões antigas das suas bibliotecas.' },
        { skillId: 'superpowers', motivo: 'Ensina o Claude a planejar e testar antes de implementar.' },
        { skillId: 'ccusage', motivo: 'Mostra para onde estão indo os seus tokens desde o primeiro dia.' }
      ]
    },
    {
      id: 'backend-api',
      titulo: 'Dev backend / API',
      icone: '⌘',
      publico: 'Construo APIs, serviços ou lógica de servidor',
      resumo: 'Contexto correto, revisão especializada e segurança em cada mudança.',
      passos: [
        { skillId: 'context7', motivo: 'Documentação real da versão exata das suas dependências.' },
        { skillId: 'tdd-guard', motivo: 'Bloqueia código sem teste correspondente — TDD deixa de ser combinado.' },
        { skillId: 'wshobson-agents', motivo: 'Aciona o revisor especialista certo automaticamente.' },
        { skillId: 'cc-security-review', motivo: 'Audita vulnerabilidades antes do merge, direto no PR.' }
      ]
    },
    {
      id: 'frontend-ui',
      titulo: 'Dev frontend / UI',
      icone: '◐',
      publico: 'Implemento telas, componentes e design systems',
      resumo: 'Do Figma ao código fiel, com revisão visual automatizada.',
      passos: [
        { skillId: 'figma-context-mcp', motivo: 'Implementação fiel às medidas reais do design, sem adivinhação.' },
        { skillId: 'context7', motivo: 'APIs corretas e atuais do seu framework de UI.' },
        { skillId: 'oneredoak-workflows', motivo: 'Revisão de design navegando pela interface real no navegador.' },
        { skillId: 'wshobson-agents', motivo: 'Revisor de código para o restante da implementação.' }
      ]
    },
    {
      id: 'lider-time',
      titulo: 'Lidero um time ou vários projetos',
      icone: '⬡',
      publico: 'Preciso escalar o uso do Claude além de mim',
      resumo: 'Controle de custo e trabalho paralelo entre vários agentes.',
      passos: [
        { skillId: 'claude-task-master', motivo: 'Backlog compartilhado para vários agentes puxarem tarefas sem colidir.' },
        { skillId: 'ruflo', motivo: 'Orquestra agentes especializados trabalhando em paralelo.' },
        { skillId: 'claude-code-router', motivo: 'Direciona tarefas simples para modelos mais baratos.' },
        { skillId: 'cc-usage-monitor', motivo: 'Visibilidade de consumo em tempo real, com alerta antes de estourar.' }
      ]
    },
    {
      id: 'conteudo-negocio',
      titulo: 'Escrevo e organizo conteúdo',
      icone: '✎',
      publico: 'Uso o Claude para textos, relatórios e materiais, não código',
      resumo: 'Documentos profissionais e conteúdo com direção consistente.',
      passos: [
        { skillId: 'anthropic-skills', motivo: 'Gera .docx, .pptx e PDF formatados de verdade, não texto colado.' },
        { skillId: 'alireza-claude-skills', motivo: 'Skills prontas de marketing, produto e comunicação de negócio.' },
        { skillId: 'prompt-eng-tutorial', motivo: 'Prompts melhores para textos consistentes entre pedidos.' }
      ]
    }
  ];

  function trilhaCardHtml(t) {
    return '<button type="button" class="trilha-card" data-trilha="' + escapeHtml(t.id) + '" aria-pressed="false">' +
      '<span class="trilha-icone" aria-hidden="true">' + t.icone + '</span>' +
      '<span class="trilha-titulo">' + escapeHtml(t.titulo) + '</span>' +
      '<span class="trilha-publico">' + escapeHtml(t.publico) + '</span>' +
    '</button>';
  }

  function renderTrilhas() {
    $('#grade-trilhas').innerHTML = TRILHAS.map(trilhaCardHtml).join('');
  }

  function passoTrilhaHtml(passo) {
    var s = acharSkill(passo.skillId);
    if (!s) return '';
    return '<li class="rec-item trilha-passo">' +
      '<span class="rec-item-nome">' + escapeHtml(s.nome) + '</span>' +
      '<span class="card-stats"><span class="stat-estrelas">★ ' + formatarEstrelas(s.stars) + '</span></span>' +
      '<span class="rec-item-acoes">' +
        '<button type="button" class="btn-acao" data-copiar-prompt="' + escapeHtml(s.id) + '">Copiar prompt</button>' +
        '<button type="button" class="btn-acao principal" data-detalhes="' + escapeHtml(s.id) + '">Detalhes</button>' +
      '</span>' +
      '<span class="rec-item-desc">' + escapeHtml(passo.motivo) + '</span>' +
    '</li>';
  }

  function selecionarTrilha(id, opcoes) {
    var t = TRILHAS.find(function (x) { return x.id === id; });
    if (!t) return;
    trilhaSelecionada = id;
    $$('.trilha-card').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.dataset.trilha === id));
    });
    var alvo = $('#resultado-trilha');
    alvo.hidden = false;
    alvo.innerHTML =
      '<div class="rec-intro"><p><strong>' + escapeHtml(t.titulo) + '</strong> — ' + escapeHtml(t.resumo) + '</p></div>' +
      '<ul class="trilha-lista">' + t.passos.map(passoTrilhaHtml).join('') + '</ul>' +
      '<div class="rec-acoes-topo">' +
        '<button type="button" class="btn btn-primario" id="btn-copiar-trilha" data-trilha-atual="' + escapeHtml(id) + '">' +
          'Copiar prompts desta trilha</button>' +
      '</div>';
    if (!opcoes || opcoes.atualizarHash !== false) escreverHash();
    if (!opcoes || opcoes.rolar !== false) alvo.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ---------- recomendação por tipo de projeto ---------- */

  // Cada frente liga gatilhos (palavras no texto do usuário, sem acento) a
  // skills candidatas. `base` = vale para qualquer projeto de software.
  // `ordemAdocao` = em que ordem faz sentido adotar (contexto antes de código).
  var AREAS_RECOMENDACAO = [
    {
      titulo: 'Gerenciamento de contexto e tokens', icone: '◌', base: true, ordemAdocao: 1,
      gatilhos: ['token', 'contexto', 'custo', 'monorepo', 'legado', 'banco de dados', 'codebase', 'refator'],
      motivo: 'Instale primeiro: documentação atualizada e busca semântica melhoram tudo o que vier depois.',
      skills: ['context7', 'claude-context', 'ccusage', 'claude-code-router']
    },
    {
      titulo: 'Arquitetura e planejamento', icone: '▦', base: true, ordemAdocao: 2,
      gatilhos: ['arquitetura', 'planejamento', 'mvp', 'produto', 'requisito', 'prd', 'roadmap', 'saas', 'sistema', 'plataforma', 'startup'],
      motivo: 'Estruture requisitos, arquitetura e backlog antes de escrever código.',
      skills: ['bmad-method', 'superpowers', 'spec-workflow', 'claude-task-master']
    },
    {
      titulo: 'Documentação', icone: '▤', base: true, ordemAdocao: 3,
      gatilhos: ['documenta', 'docs', 'readme', 'spec', 'biblioteca', 'framework', 'manual'],
      motivo: 'Docs atualizadas das dependências e specs geradas por fase do projeto.',
      skills: ['context7', 'anthropic-skills', 'spec-workflow']
    },
    {
      titulo: 'Programação e revisão de código', icone: '⌘', base: true, ordemAdocao: 4,
      gatilhos: ['codigo', 'revisao', 'refator', 'qualidade', 'backend', 'frontend', 'api', 'microservi'],
      motivo: 'Revisores especialistas encontram problemas antes do merge.',
      skills: ['wshobson-agents', 'awesome-cc-subagents', 'superclaude']
    },
    {
      titulo: 'Testes e depuração', icone: '✓', base: true, ordemAdocao: 5,
      gatilhos: ['teste', 'tdd', 'bug', 'depura', 'qualidade', 'ci', 'cobertura'],
      motivo: 'Disciplina de testes imposta por ferramenta, não por lembrete.',
      skills: ['tdd-guard', 'superpowers']
    },
    {
      titulo: 'Segurança e auditoria', icone: '◉', base: true, ordemAdocao: 6,
      gatilhos: ['seguranca', 'auth', 'login', 'pagamento', 'lgpd', 'senha', 'upload', 'api', 'banco', 'dados sensiveis'],
      motivo: 'Auditoria automática de vulnerabilidades em cada mudança.',
      skills: ['cc-security-review', 'wshobson-agents']
    },
    {
      titulo: 'Múltiplos agentes e orquestração', icone: '⬡', base: true, ordemAdocao: 7,
      gatilhos: ['agente', 'paralel', 'orquestr', 'swarm', 'equipe', 'time', 'migra', 'escala'],
      motivo: 'Divida o trabalho entre agentes especializados rodando em paralelo.',
      skills: ['ruflo', 'wshobson-agents', 'awesome-cc-subagents']
    },
    {
      titulo: 'Interface, UX e design', icone: '◐', base: false, ordemAdocao: 8,
      gatilhos: ['frontend', 'front-end', 'ui', 'ux', 'design', 'figma', 'tela', 'interface', 'mobile', 'app', 'react', 'vue', 'angular', 'landing', 'site'],
      motivo: 'Do Figma ao código fiel, com revisão de design automatizada.',
      skills: ['figma-context-mcp', 'oneredoak-workflows', 'contains-studio-agents']
    },
    {
      titulo: 'Automação e integrações', icone: '⚙', base: false, ordemAdocao: 9,
      gatilhos: ['integra', 'automa', 'webhook', 'n8n', 'workflow', 'crm', 'zapier', 'api', 'stripe', 'pagamento'],
      motivo: 'Automatize processos e use as skills oficiais dos serviços que você integra.',
      skills: ['n8n-mcp', 'awesome-agent-skills', 'claude-code-templates']
    },
    {
      titulo: 'Pesquisa e análise de dados', icone: '◈', base: false, ordemAdocao: 10,
      gatilhos: ['dados', 'analise', 'rag', 'busca', 'dashboard', 'relatorio', 'pdf', 'ia', 'llm', 'machine learning', 'bi'],
      motivo: 'Padrões prontos de RAG, análise de documentos e avaliação.',
      skills: ['claude-cookbooks', 'claude-context', 'awesome-claude-code']
    },
    {
      titulo: 'Criação e melhoria de prompts', icone: '❝', base: false, ordemAdocao: 11,
      gatilhos: ['prompt', 'ia', 'llm', 'chatbot', 'assistente', 'gpt', 'claude api', 'agente de ia'],
      motivo: 'Prompts em produção merecem engenharia, não tentativa e erro.',
      skills: ['prompt-eng-tutorial', 'superclaude']
    },
    {
      titulo: 'Escrita e comunicação', icone: '✎', base: false, ordemAdocao: 12,
      gatilhos: ['escrita', 'conteudo', 'marketing', 'relatorio', 'documento', 'apresentacao', 'blog', 'email', 'proposta'],
      motivo: 'Documentos e conteúdo profissionais gerados como arquivos reais.',
      skills: ['anthropic-skills', 'alireza-claude-skills', 'awesome-claude-skills']
    }
  ];

  var MAX_PRIMARIAS = 5;

  // Gatilhos casam no INÍCIO de uma palavra, nunca no meio: assim "integra"
  // encontra "integrações" mas "ci" não dispara dentro de "preciso".
  var cacheGatilho = {};
  function casaGatilho(texto, gatilho) {
    if (!cacheGatilho[gatilho]) {
      cacheGatilho[gatilho] = new RegExp(
        '(^|[^a-z0-9])' + gatilho.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    }
    return cacheGatilho[gatilho].test(texto);
  }

  function recomendar(textoProjeto) {
    var texto = normalizar(textoProjeto);
    var pareceSoftware = AREAS_RECOMENDACAO.some(function (a) {
      return a.gatilhos.some(function (g) { return casaGatilho(texto, g); });
    });

    var grupos = [];
    AREAS_RECOMENDACAO.forEach(function (area) {
      var acertos = area.gatilhos.filter(function (g) { return casaGatilho(texto, g); });
      if (!acertos.length && !(area.base && pareceSoftware)) return;
      var skills = area.skills
        .map(function (id) { return SKILLS.find(function (s) { return s.id === id; }); })
        .filter(Boolean).slice(0, 3);
      if (!skills.length) return;
      grupos.push({
        area: area, acertos: acertos, skills: skills,
        // menções explícitas pesam mais que a inclusão por ser área-base
        pontos: acertos.length * 2 + (area.base ? 1 : 0)
      });
    });

    grupos.sort(function (a, b) {
      return b.pontos - a.pontos || a.area.ordemAdocao - b.area.ordemAdocao;
    });

    var comAcerto = grupos.filter(function (g) { return g.acertos.length; });
    var primarias = (comAcerto.length ? comAcerto : grupos).slice(0, MAX_PRIMARIAS);
    var secundarias = grupos.filter(function (g) { return primarias.indexOf(g) === -1; });
    return { pareceSoftware: pareceSoftware, primarias: primarias, secundarias: secundarias, todos: grupos };
  }

  function itemSkillHtml(s) {
    return '<li class="rec-item">' +
      '<span class="rec-item-nome">' + escapeHtml(s.nome) + '</span>' +
      '<span class="card-stats"><span class="stat-estrelas">★ ' + formatarEstrelas(s.stars) + '</span></span>' +
      '<span class="rec-item-acoes">' +
        '<button type="button" class="btn-acao" data-copiar-prompt="' + escapeHtml(s.id) + '">Copiar prompt</button>' +
        '<button type="button" class="btn-acao principal" data-detalhes="' + escapeHtml(s.id) + '">Detalhes</button>' +
      '</span>' +
      '<span class="rec-item-desc">' + escapeHtml(s.paraQueServe) + '</span>' +
    '</li>';
  }

  function grupoHtml(g) {
    return '<div class="rec-grupo">' +
      '<h3><span class="rec-icone" aria-hidden="true">' + g.area.icone + '</span>' + escapeHtml(g.area.titulo) + '</h3>' +
      '<p class="rec-motivo">' + escapeHtml(g.area.motivo) +
      (g.acertos.length
        ? ' <em>(no seu texto: ' + escapeHtml(g.acertos.slice(0, 4).join(', ')) + ')</em>'
        : ' <em>(vale para qualquer projeto de software)</em>') + '</p>' +
      '<ul class="rec-lista">' + g.skills.map(itemSkillHtml).join('') + '</ul>' +
    '</div>';
  }

  var recomendacaoAtual = null;

  function planoMarkdown(projeto, rec) {
    var linhas = ['# Plano de Skills para o projeto', '', '> ' + projeto, '',
      'Skills recomendadas por frente, com o prompt inicial de cada uma.', ''];
    rec.primarias.concat(rec.secundarias).forEach(function (g, i) {
      linhas.push('## ' + (i + 1) + '. ' + g.area.titulo);
      linhas.push(g.area.motivo, '');
      g.skills.forEach(function (s) {
        linhas.push('### ' + s.nome + ' (' + s.stars.toLocaleString('pt-BR') + ' ★)');
        linhas.push('- Repositório: ' + s.repo);
        linhas.push('- Para que serve: ' + s.paraQueServe);
        linhas.push('- Instalação: ' + s.instalacao);
        linhas.push('- Prompt inicial:', '', '  ' + s.promptInicial, '');
      });
    });
    linhas.push('---', 'Dados do GitHub coletados em ' + dataBR(DB.coletadoEm) + '.');
    return linhas.join('\n');
  }

  function renderRecomendacao() {
    var texto = $('#campo-projeto').value.trim();
    var alvo = $('#resultado-recomendacao');
    if (!texto) {
      toast('Descreva seu projeto primeiro');
      $('#campo-projeto').focus();
      return;
    }

    var rec = recomendar(texto);
    recomendacaoAtual = { projeto: texto, rec: rec };

    if (!rec.todos.length) {
      alvo.hidden = false;
      alvo.innerHTML = '<p class="rec-intro">Não reconheci o tipo de projeto. Tente citar a stack e as frentes ' +
        'envolvidas — por exemplo: frontend, backend, banco de dados, APIs, testes, segurança ou conteúdo.</p>';
      return;
    }

    // Plano de adoção: as frentes prioritárias na ordem em que fazem sentido adotar
    var plano = rec.primarias.slice().sort(function (a, b) {
      return a.area.ordemAdocao - b.area.ordemAdocao;
    });

    var html =
      '<div class="rec-intro">' +
        '<p><strong>' + rec.primarias.length + ' frentes prioritárias</strong> para este projeto' +
        (rec.secundarias.length ? ' e mais ' + rec.secundarias.length + ' relevantes.' : '.') +
        ' Copie o prompt inicial de cada skill e cole no Claude.</p>' +
      '</div>' +
      '<ol class="rec-plano">' +
        plano.map(function (g) {
          return '<li><span class="passo-titulo">' + escapeHtml(g.area.titulo) + '</span>' +
            '<span class="passo-skill">' + escapeHtml(g.skills[0].nome) + '</span></li>';
        }).join('') +
      '</ol>' +
      '<p class="rec-plano-nota">Ordem sugerida de adoção: contexto e documentação primeiro, ' +
      'porque melhoram a qualidade de tudo o que vem depois.</p>' +
      '<div class="rec-acoes-topo">' +
        '<button type="button" class="btn btn-primario" id="btn-copiar-plano">Copiar plano completo (Markdown)</button>' +
        '<button type="button" class="btn btn-fantasma" id="btn-copiar-prompts">Copiar só os prompts</button>' +
      '</div>' +
      rec.primarias.map(grupoHtml).join('');

    if (rec.secundarias.length) {
      html += '<details class="rec-secundarias"><summary>Também relevantes para este projeto (' +
        rec.secundarias.length + ')</summary>' + rec.secundarias.map(grupoHtml).join('') + '</details>';
    }

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

  function acharSkill(id) { return SKILLS.find(function (s) { return s.id === id; }); }

  document.addEventListener('click', function (e) {
    var alvo;

    if ((alvo = e.target.closest('[data-copiar-prompt]'))) {
      var s1 = acharSkill(alvo.dataset.copiarPrompt);
      if (s1) copiarTexto(s1.promptInicial, alvo, 'Prompt copiado — cole no Claude para começar');
      return;
    }
    if ((alvo = e.target.closest('[data-copiar-instalacao]'))) {
      var s2 = acharSkill(alvo.dataset.copiarInstalacao);
      if (s2) copiarTexto(s2.instalacao, alvo, 'Instruções de instalação copiadas');
      return;
    }
    if ((alvo = e.target.closest('[data-copiar-link]'))) {
      var base = location.href.split('#')[0];
      copiarTexto(base + '#skill=' + alvo.dataset.copiarLink, alvo, 'Link direto desta skill copiado');
      return;
    }
    if ((alvo = e.target.closest('[data-detalhes]'))) {
      var s3 = acharSkill(alvo.dataset.detalhes);
      if (s3) abrirModal(s3);
      return;
    }
    if ((alvo = e.target.closest('[data-fav]'))) {
      alternarFavorita(alvo.dataset.fav);
      toast(favoritas.has(alvo.dataset.fav) ? 'Adicionada às favoritas ♥' : 'Removida das favoritas');
      if (estado.soFavoritas) renderCatalogo();
      return;
    }
    if ((alvo = e.target.closest('#btn-copiar-plano'))) {
      if (recomendacaoAtual) {
        copiarTexto(planoMarkdown(recomendacaoAtual.projeto, recomendacaoAtual.rec), alvo,
          'Plano completo copiado — cole no Claude ou no seu README');
      }
      return;
    }
    if ((alvo = e.target.closest('#btn-copiar-prompts'))) {
      if (recomendacaoAtual) {
        var vistos = {};
        var prompts = [];
        recomendacaoAtual.rec.primarias.concat(recomendacaoAtual.rec.secundarias).forEach(function (g) {
          g.skills.forEach(function (s) {
            if (vistos[s.id]) return;
            vistos[s.id] = true;
            prompts.push('— ' + s.nome + ' —\n' + s.promptInicial);
          });
        });
        copiarTexto(prompts.join('\n\n'), alvo, prompts.length + ' prompts copiados');
      }
      return;
    }
    if ((alvo = e.target.closest('[data-trilha]'))) {
      selecionarTrilha(alvo.dataset.trilha, { atualizarHash: true });
      return;
    }
    if ((alvo = e.target.closest('#btn-copiar-trilha'))) {
      var trilhaAtual = TRILHAS.find(function (t) { return t.id === alvo.dataset.trilhaAtual; });
      if (trilhaAtual) {
        var textosTrilha = trilhaAtual.passos.map(function (p, i) {
          var sk = acharSkill(p.skillId);
          return (i + 1) + '. ' + sk.nome + '\n' + sk.promptInicial;
        });
        copiarTexto(textosTrilha.join('\n\n'), alvo, textosTrilha.length + ' prompts da trilha copiados');
      }
      return;
    }
    if ((alvo = e.target.closest('.chip[data-cat]'))) {
      estado.categoria = alvo.dataset.cat;
      $('#filtro-categoria').value = estado.categoria;
    $('#filtro-facilidade').value = estado.facilidade;
      if (!modal.hidden) fecharModal();
      renderCatalogo();
      document.getElementById('catalogo').scrollIntoView({ behavior: 'smooth' });
    }
  });

  $('#link-topo').addEventListener('click', function (e) {
    e.preventDefault();  // não limpa os filtros guardados na hash
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- inicialização ---------- */

  preencherFiltroCategorias();
  preencherFiltroFacilidade();
  var linkInicial = lerHash();
  sincronizarControles();
  atualizarContadorFavoritas();
  renderFaixas();
  renderCatalogo();
  renderTrilhas();

  var diasDados = diasDesde(DB.coletadoEm);
  $('#meta-dados').innerHTML =
    escapeHtml(SKILLS.length + ' skills · ' + DB.categorias.length + ' categorias · dados do GitHub de ' + dataBR(DB.coletadoEm)) +
    (DB.linksVerificadosEm ? escapeHtml(' · links conferidos em ' + dataBR(DB.linksVerificadosEm)) : '') +
    (diasDados > 45
      ? ' <span class="aviso-dados" title="Rode: node scripts/refresh-github.mjs">· coletados há ' +
        mesesTexto(Math.floor(diasDados / 30)) + ', as estrelas podem ter mudado</span>'
      : '');

  if (linkInicial.skill) {
    var alvoInicial = acharSkill(linkInicial.skill);
    if (alvoInicial) abrirModal(alvoInicial);
  }
  if (linkInicial.trilha) selecionarTrilha(linkInicial.trilha, { atualizarHash: false });
})();
