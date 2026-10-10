export function initMenu() {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav ul');
  
  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      // Adicionado um console.log para debug
      console.log('Menu clicado!');
      
      const expanded = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('aberto');
    });
  } else {
    console.log('Erro: Elemento .hamburger ou nav ul não encontrado no HTML.');
  }
}

// Armazenamento local
export function salvarPreferencia(chave, valor) {
  localStorage.setItem(chave, JSON.stringify(valor));
}

export function obterPreferencia(chave) {
  const valor = localStorage.getItem(chave);
  return valor ? JSON.parse(valor) : null;
}