import { initMenu, initModal } from './modulos.js';
import { carregarDados } from './dados.js';

document.addEventListener('DOMContentLoaded', () => {

  initMenu();
  
  initModal(); 

  carregarDados();
  
  const agora = new Date().toLocaleString('pt-BR');
  localStorage.setItem('ultimaVisita', agora);
  console.log('Última visita registrada no localStorage:', agora);
});