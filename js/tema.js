/* Alternância de tema para páginas fora do catálogo (ex.: guia.html).
   Independente de app.js — não depende de SKILLS_DB. */
(function () {
  'use strict';
  var CHAVE_TEMA = 'skills-lib-tema';
  var set = function (k, v) { try { localStorage.setItem(k, v); } catch (e) { /* indisponível */ } };

  function temaAtivo() {
    return document.documentElement.dataset.theme ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('btn-tema');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var novo = temaAtivo() === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = novo;
      set(CHAVE_TEMA, novo);
      btn.setAttribute('aria-label', novo === 'dark' ? 'Mudar para tema claro' : 'Mudar para tema escuro');
    });
  });

})();
