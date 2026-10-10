export async function carregarDados() {
  const container = document.querySelector('#lista-aerogeradores');
  const totalElement = document.querySelector('#total-ativos');

  if (!container) {
    console.log('Aviso: Página não é a de dados.');
    return;
  }

  console.log('2. Buscando dados do JSON...');
  
  try {
    const response = await fetch('data/aerogeradores.json');
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}. O arquivo existe na pasta data?`);
    }
    
    const dados = await response.json();
    console.log('3. Dados carregados com sucesso!');
    
    container.innerHTML = dados.map(aero => `
      <article class="card-aerogerador">
        <h3>${aero.modelo}</h3>
        <dl>
          <dt>Potência:</dt><dd>${aero.potencia}</dd>
          <dt>Altura:</dt><dd>${aero.altura}</dd>
          <dt>Diâmetro:</dt><dd>${aero.diametro}</dd>
          <dt>Status:</dt><dd>${aero.status}</dd>
        </dl>
        <button class="btn-detalhes btn-primario" data-conteudo="${aero.detalhes}">Ver detalhes</button>
      </article>
    `).join('');

    const ativos = dados.filter(a => a.status === 'Ativo').length;
    if (totalElement) totalElement.textContent = ativos;

    document.querySelectorAll('.btn-detalhes').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelector('#modal-conteudo').textContent = btn.dataset.conteudo;
        document.querySelector('#modal-detalhes').showModal();
      });
    });

  } catch (error) {
    console.error('ERRO AO CARREGAR DADOS:', error);
    container.innerHTML = '<p style="color: red;">Erro ao carregar os dados. Verifique o console (F12).</p>';
  }
}