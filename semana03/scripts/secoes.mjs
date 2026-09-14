export function definirSecaoSelecionada(secoes) {
  const select = document.querySelector("#numeroSecao");
  select.innerHTML = "";
  secoes.forEach(secao => {
    const option = document.createElement("option");
    option.value = secao.numero;
    option.textContent = `Seção ${secao.numero}`;
    select.appendChild(option);
  });
}