import { initMenu, initModal } from './modulos.js';
import { carregarDados } from './dados.js';

document.addEventListener('DOMContentLoaded', () => {
  console.log('1. Script principal carregado.');
  initMenu();
  initModal();
  carregarDados();
});