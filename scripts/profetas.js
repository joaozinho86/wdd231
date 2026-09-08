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

    nomeCompleto.textContent = `${profeta.nome} ${profeta.sobrenome}`;
    retrato.setAttribute('src', profeta.urlImagem);
    retrato.setAttribute('alt', `Retrato de ${profeta.nome} ${profeta.sobrenome}`);
    retrato.setAttribute('loading', 'lazy');
    retrato.setAttribute('width', '340');
    retrato.setAttribute('height', '440');

    cartao.appendChild(nomeCompleto);
    cartao.appendChild(retrato);
    cartoes.appendChild(cartao);
  });
}

obterDadosDeProfetas();