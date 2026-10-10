document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
  
      nav.classList.toggle('aberto');
      
      const isOpen = nav.classList.contains('aberto');
      hamburger.setAttribute('aria-expanded', isOpen);
      
      console.log('Menu clicado! Estado:', isOpen);
    });
  } else {
    console.error('Erro: Elemento hamburger ou nav não encontrado.');
  }
});