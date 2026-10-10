export function initMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      nav.classList.toggle('aberto');
      console.log('Menu clicado!');
    });
  } else {
    console.error('ERRO: Elemento do menu não encontrado no HTML.');
  }
}

export function initModal() {
  const modal = document.querySelector('#modal-detalhes');
  const fecharBtn = document.querySelector('#fechar-modal');
  
  if (modal && fecharBtn) {
    fecharBtn.addEventListener('click', () => modal.close());
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.close();
    });
  }
}