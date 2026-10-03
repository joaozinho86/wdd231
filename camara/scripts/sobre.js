// scripts/sobre.js
import interesses from '../dados/interesses.mjs';

// ==================== 1. Mensagem de última visita ====================
const CHAVE_VISITA = 'ultimaVisitaSobre';
const msgEl = document.getElementById('mensagem-visita');
const agora = Date.now();
const ultimaVisita = localStorage.getItem(CHAVE_VISITA);

if (!ultimaVisita) {
  msgEl.textContent = 'Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.';
} else {
  const diffMs = agora - Number(ultimaVisita);
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDias < 1) {
    msgEl.textContent = 'Já voltou? Que legal!';
  } else {
    const palavra = diffDias === 1 ? 'dia' : 'dias';
    msgEl.textContent = `Seu último acesso foi há ${diffDias} ${palavra}.`;
  }
}
localStorage.setItem(CHAVE_VISITA, agora);

// ==================== 2. Criar os cartões ====================
const galeria = document.getElementById('galeria-interesses');

if (galeria && interesses) {
  interesses.forEach((item, index) => {
    const artigo = document.createElement('article');
    artigo.className = 'cartao-interesse';

    // ---- Figura (Imagem) ----
    const figure = document.createElement('figure');
    figure.className = 'cartao-figura';
    const img = document.createElement('img');
    img.src = item.lin_foto;
    img.alt = `Foto de ${item.nome}`;
    if (index > 0) img.loading = 'lazy'; // Lazy loading a partir do 2º
    figure.appendChild(img);
    artigo.appendChild(figure);

    // ---- Corpo (Texto) ----
    const corpo = document.createElement('div');
    corpo.className = 'cartao-corpo';

    const h2 = document.createElement('h2');
    h2.className = 'cartao-titulo';
    h2.textContent = item.nome;
    corpo.appendChild(h2);

    const pDesc = document.createElement('p');
    pDesc.className = 'cartao-descricao';
    pDesc.textContent = item.descricao;
    corpo.appendChild(pDesc);

    const address = document.createElement('address');
    address.className = 'cartao-endereco';
    address.textContent = item.endereco;
    corpo.appendChild(address);

    const pCusto = document.createElement('p');
    pCusto.className = 'cartao-custo';
    pCusto.textContent = `Custo: ${item.custo}`;
    corpo.appendChild(pCusto);

    const botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'botao-saiba-mais';
    botao.textContent = 'Saiba mais';
    botao.addEventListener('click', () => {
      const modal = document.getElementById('modalInteresse');
      document.getElementById('modalTitulo').textContent = item.nome;
      document.getElementById('modalTexto').textContent =
        `${item.descricao} — ${item.endereco} — Custo: ${item.custo}`;
      modal.showModal();
    });
    corpo.appendChild(botao);

    artigo.appendChild(corpo);
    galeria.appendChild(artigo);
  });
} else {
  console.error("Erro: Elemento #galeria-interesses não encontrado ou dados inválidos.");
}

// ==================== 3. Fechar modal ====================
const modal = document.getElementById('modalInteresse');
if (modal) {
  document.getElementById('fecharModal').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
}

// ==================== 4. Ano e última modificação ====================
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById('lastModified');
if (lastModEl) lastModEl.textContent = document.lastModified;