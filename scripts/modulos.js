// Menu responsivo
export function initMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');
  
  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !expanded);
    nav.classList.toggle('aberto');
  });
}

// Modal acessível
export function initModal() {
  const modal = document.querySelector('#modal-detalhes');
  const abrirBtns = document.querySelectorAll('[data-abrir-modal]');
  const fecharBtn = document.querySelector('#fechar-modal');
  
  abrirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const conteudo = btn.dataset.conteudo;
      document.querySelector('#modal-conteudo').textContent = conteudo;
      modal.showModal();
    });
  });
  
  fecharBtn.addEventListener('click', () => modal.close());
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}

// Armazenamento local
export function salvarPreferencia(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function obterPreferencia(chave) {
  const valor = localStorage.getItem(chave);
  return valor ? JSON.parse(valor) : null;
}