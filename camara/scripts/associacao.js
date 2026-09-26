// scripts/associacao.js
// Versão robusta para abrir/fechar modais (<dialog> ou fallback .modal)
// - Preenche campo oculto "registro"
// - Abre modais via data-modal / data-target
// - Fallback visual com backdrop e classe .fallback-open
// - Trap de foco, ESC, clique fora e retorno de foco ao opener
// - Proteções contra múltiplos binds

(function () {
  'use strict';

  // --- Utilitários de foco ---
  function getFocusable(container) {
    if (!container) return [];
    var selectors = [
      'a[href]:not([tabindex="-1"])',
      'area[href]',
      'input:not([disabled]):not([type="hidden"]):not([tabindex="-1"])',
      'select:not([disabled]):not([tabindex="-1"])',
      'textarea:not([disabled]):not([tabindex="-1"])',
      'button:not([disabled]):not([tabindex="-1"])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable]'
    ];
    var nodes = Array.prototype.slice.call(container.querySelectorAll(selectors.join(',')));
    return nodes.filter(function (el) {
      return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
    });
  }

  function focusFirst(container) {
    var f = getFocusable(container);
    if (f.length) f[0].focus();
  }

  // --- Trap de foco simples ---
  var trapHandlers = new WeakMap();
  function trapFocus(container) {
    if (!container) return;
    var focusable = getFocusable(container);
    if (!focusable.length) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];

    function handler(e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    container.addEventListener('keydown', handler);
    trapHandlers.set(container, handler);
  }

  function releaseTrap(container) {
    var h = trapHandlers.get(container);
    if (h) {
      container.removeEventListener('keydown', h);
      trapHandlers.delete(container);
    }
  }

  // --- Backdrop fallback helpers ---
  function createBackdrop(id) {
    var backdrop = document.createElement('div');
    backdrop.className = 'dialog-backdrop';
    backdrop.dataset.for = id;
    backdrop.style.position = 'fixed';
    backdrop.style.inset = '0';
    backdrop.style.background = 'rgba(0,0,0,0.5)';
    backdrop.style.zIndex = '999';
    return backdrop;
  }

  function ensureBackdropFor(dlg) {
    if (!dlg || !dlg.id) return null;
    var existing = document.querySelector('.dialog-backdrop[data-for="' + dlg.id + '"]');
    if (existing) return existing;
    var backdrop = createBackdrop(dlg.id);
    // inserir antes do dialog para cobrir todo o conteúdo
    dlg.parentNode.insertBefore(backdrop, dlg);
    backdrop.addEventListener('click', function () {
      closeDialog(dlg);
    });
    return backdrop;
  }

  function removeBackdropFor(dlg) {
    if (!dlg || !dlg.id) return;
    var existing = document.querySelector('.dialog-backdrop[data-for="' + dlg.id + '"]');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
  }

  // --- Abrir / fechar dialog com fallback ---
  function openDialogById(id, opener) {
    if (!id) return;
    var dlg = document.getElementById(id);
    if (!dlg) {
      console.warn('Modal não encontrado:', id);
      return;
    }

    dlg._opener = opener || document.activeElement;

    if (typeof dlg.showModal === 'function') {
      try {
        dlg.showModal();
      } catch (err) {
        // se já aberto ou erro, garantir atributo open
        dlg.setAttribute('open', 'true');
      }
      dlg.setAttribute('aria-hidden', 'false');
      trapFocus(dlg);
      focusFirst(dlg);
      setAriaExpanded(opener, true);
    } else {
      // fallback: mostrar como bloco com classe
      dlg.classList.add('fallback-open');
      dlg.style.display = 'block';
      dlg.setAttribute('open', 'true');
      dlg.setAttribute('aria-hidden', 'false');
      // garantir z-index alto
      dlg.style.position = 'fixed';
      dlg.style.zIndex = '1000';
      dlg.style.left = '50%';
      dlg.style.top = '50%';
      dlg.style.transform = 'translate(-50%, -50%)';
      // backdrop
      ensureBackdropFor(dlg);
      trapFocus(dlg);
      focusFirst(dlg);
      setAriaExpanded(opener, true);
    }
  }

  function closeDialog(dlg) {
    if (!dlg) return;
    try {
      if (typeof dlg.close === 'function') dlg.close();
      else {
        dlg.classList.remove('fallback-open');
        dlg.style.display = 'none';
        dlg.removeAttribute('open');
      }
    } catch (err) {
      // fallback safe
      dlg.classList.remove('fallback-open');
      dlg.style.display = 'none';
      dlg.removeAttribute('open');
    }

    dlg.setAttribute('aria-hidden', 'true');
    releaseTrap(dlg);
    removeBackdropFor(dlg);

    // devolver foco ao opener
    if (dlg._opener && typeof dlg._opener.focus === 'function') {
      dlg._opener.focus();
    }
    setAriaExpanded(dlg._opener, false);
  }

  function closeAll() {
    var openDialogs = document.querySelectorAll('dialog[open], .fallback-open, dialog[aria-hidden="false"]');
    openDialogs.forEach(function (d) {
      // se for dialog nativo, fecha; se for fallback, aplica closeDialog
      if (d.tagName && d.tagName.toLowerCase() === 'dialog') closeDialog(d);
      else {
        // procurar elemento real pelo id se for backdrop etc
        var id = d.id || d.getAttribute('data-for');
        if (id) {
          var real = document.getElementById(id);
          if (real) closeDialog(real);
        }
      }
    });
  }

  // --- Helpers ARIA ---
  function setAriaExpanded(el, expanded) {
    if (!el) return;
    try {
      el.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    } catch (e) { /* ignore */ }
  }

  // --- Inicialização dos triggers ---
  function initTriggers() {
    // Delegation: captura clicks em elementos com data-modal ou data-target
    document.body.addEventListener('click', function (e) {
      var t = e.target;
      // sobe na árvore até encontrar um elemento com data-modal/data-target
      while (t && t !== document.body) {
        if (t.hasAttribute('data-modal') || t.hasAttribute('data-target')) break;
        t = t.parentElement;
      }
      if (!t || t === document.body) return;

      var modalId = t.getAttribute('data-modal') || t.getAttribute('data-target');
      if (!modalId) return;

      // se o elemento é um link para outra página (href não vazio e não '#'), deixa navegar
      var href = t.getAttribute('href');
      var isExternalLink = href && href.trim() !== '' && href.trim() !== '#' && !href.startsWith('#') && !href.startsWith('javascript:');
      if (isExternalLink) return; // segue o link normalmente

      e.preventDefault();
      openDialogById(modalId, t);
    });

    // Fechar via botões com class .close-modal (delegation)
    document.body.addEventListener('click', function (e) {
      var t = e.target;
      if (t.classList && t.classList.contains('close-modal')) {
        var dlg = t.closest('dialog') || document.querySelector('.fallback-open') || t.closest('.modal');
        if (dlg) closeDialog(dlg);
      }
    });
  }

  // --- Teclado global (ESC) ---
  function initGlobalKeys() {
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' || e.key === 'Esc') {
        closeAll();
      }
    });
  }

  // --- Clique fora do conteúdo para fechar (apenas para <dialog> nativo) ---
  function initDialogBackdropClicks() {
    var dialogs = document.querySelectorAll('dialog');
    dialogs.forEach(function (d) {
      d.addEventListener('click', function (ev) {
        var rect = d.getBoundingClientRect();
        var clickedInside = ev.clientX >= rect.left && ev.clientX <= rect.right && ev.clientY >= rect.top && ev.clientY <= rect.bottom;
        if (!clickedInside) closeDialog(d);
      });
    });
  }

  // --- Inicialização do formulário e prevenção de múltiplos envios ---
  function initForm() {
    var form = document.querySelector('.form-associacao');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      // se inválido, deixa o navegador mostrar mensagens
      if (!form.checkValidity()) {
        var submit = form.querySelector('[type="submit"], .btn-submit');
        if (submit) {
          submit.disabled = true;
          setTimeout(function () { submit.disabled = false; }, 300);
        }
        return;
      }
      var submit = form.querySelector('[type="submit"], .btn-submit');
      if (submit) {
        submit.disabled = true;
        submit.setAttribute('aria-disabled', 'true');
      }
      // formulário GET redirecionará para agradecimento.html automaticamente
    });
  }

  // --- Associação de labels (melhora acessibilidade) ---
  function enhanceLabels() {
    var fields = document.querySelectorAll('.form-associacao .field');
    fields.forEach(function (field, idx) {
      var input = field.querySelector('input, select, textarea');
      var labelText = field.querySelector('.label-text');
      if (!input || !labelText) return;
      if (!input.id) input.id = 'field-' + idx;
      if (!labelText.id) labelText.id = 'label-' + idx;
      // se não houver label pai, associa via aria-labelledby
      if (!field.closest('label')) input.setAttribute('aria-labelledby', labelText.id);
    });
  }

  // --- Inicialização principal ---
  document.addEventListener('DOMContentLoaded', function () {
    // Preenche registro
    var registro = document.getElementById('registro');
    if (registro) registro.value = new Date().toISOString();

    initTriggers();
    initGlobalKeys();
    initDialogBackdropClicks();
    initForm();
    enhanceLabels();
  });

})();
