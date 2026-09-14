export function definirTitulo(curso) {
  document.querySelector("#tituloCurso").textContent = curso.titulo;
}

export function renderizarSecoes(secoes) {
  const lista = document.querySelector("#listaSecoes");
  lista.innerHTML = "";
  secoes.forEach(secao => {
    const li = document.createElement("li");
    li.textContent = `Seção ${secao.numero}: ${secao.matriculados} matriculados`;
    lista.appendChild(li);
  });
}