// Busca de dados com Fetch API e try...catch
export async function carregarDados() {
  try {
    const response = await fetch('data/aerogeradores.json');
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const dados = await response.json();
    renderizarAerogeradores(dados);
    salvarUltimaVisita();
  } catch (error) {
    console.error('Falha ao carregar dados:', error);
    document.querySelector('#lista-aerogeradores').innerHTML = 
      '<p class="erro">Não foi possível carregar os dados. Tente novamente mais tarde.</p>';
  }
}

// Renderização dinâmica com array methods e template literals
export function renderizarAerogeradores(aerogeradores) {
  const container = document.querySelector('#lista-aerogeradores');
  
  // Array method: map + join
  const cards = aerogeradores.map(aero => `
    <article class="card-aerogerador" data-id="${aero.id}">
      <h3>${aero.modelo}</h3>
      <dl>
        <dt>Potência:</dt><dd>${aero.potencia}</dd>
        <dt>Altura:</dt><dd>${aero.altura}</dd>
        <dt>Diâmetro do rotor:</dt><dd>${aero.diametro}</dd>
        <dt>Status:</dt><dd>${aero.status}</dd>
      </dl>
      <button class="btn-detalhes" data-abrir-modal data-conteudo="${aero.detalhes}">
        Ver detalhes
      </button>
    </article>
  `).join('');
  
  container.innerHTML = cards;
  
  // Manipulação de DOM: adicionar event listeners
  document.querySelectorAll('.btn-detalhes').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = document.querySelector('#modal-detalhes');
      document.querySelector('#modal-conteudo').textContent = btn.dataset.conteudo;
      modal.showModal();
    });
  });
  
  // Array method: filter para contar status
  const ativos = aerogeradores.filter(a => a.status === 'Ativo').length;
  document.querySelector('#total-ativos').textContent = ativos;
}

// Armazenamento local: última visita
function salvarUltimaVisita() {
  const agora = new Date().toISOString();
  localStorage.setItem('ultimaVisita', agora);
}