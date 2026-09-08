const url = 'https://byui-cse.github.io/cse-ww-program-pt/data/profetas-dos-ultimos-dias.json';
const cartoes = document.querySelector('#cartoes');

async function obterDadosDeProfetas() {
  const resposta = await fetch(url);
  const dados = await resposta.json();
  exibirProfetas(dados.profetas);
}

const exibirProfetas = (profetas) => {
  profetas.forEach((profeta) => {
    let cartao = document.createElement('section');
    let nomeCompleto = document.createElement('h2');
    let retrato = document.createElement('img');

    // elementos extras
    let nascimento = document.createElement('p');
    let lugar = document.createElement('p');
    let criancas = document.createElement('p');
    let anosServico = document.createElement('p');
    let falecimento = document.createElement('p');

    // preenchendo conteúdo
    nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;
    retrato.setAttribute('src', profeta.urlImagem || 'placeholder.jpg');
    retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
    retrato.setAttribute('loading', 'lazy');
    retrato.setAttribute('width', '340');
    retrato.setAttribute('height', '440');

    nascimento.textContent = `Nascimento: ${profeta.nascimento}`;
    lugar.textContent = `Lugar: ${profeta.lugar}`;
    criancas.textContent = `Crianças: ${profeta.criancas}`;
    anosServico.textContent = `Anos de Serviço: ${profeta.anosDeServico}`;
    falecimento.textContent = `Falecimento: ${profeta.falecimento}`;

    // montando cartão
    cartao.appendChild(nomeCompleto);
    cartao.appendChild(retrato);
    cartao.appendChild(nascimento);
    cartao.appendChild(lugar);
    cartao.appendChild(criancas);
    cartao.appendChild(anosServico);
    cartao.appendChild(falecimento);

    cartoes.appendChild(cartao);
  });
}

obterDadosDeProfetas();