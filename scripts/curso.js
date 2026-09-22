// Lista de cursos
const cursos = [
  { codigo: "WDD130", nome: "Web Design 130 - Fundamentos da Web", creditos: 2, tipo: "WDD", completed: true },
  { codigo: "WDD131", nome: "Web Fundamentos da Web Dinâmica 131", creditos: 2, tipo: "WDD", completed: false },
  { codigo: "WDD231", nome: "Desenvolvimento Frontend para Web I - WDD231", creditos: 2, tipo: "WDD", completed: false },
  { codigo: "CSE110", nome: "Programação com classes - CSE110", creditos: 2, tipo: "CSE", completed: true }
];

// Referência ao modal
const infosDoCurso = document.getElementById("infos-do-curso");

// Função para exibir o modal com informações do curso
function exibirInfosDoCurso(curso) {
  infosDoCurso.innerHTML = `
    <button id="fecharModal">❌</button>
    <h2>${curso.codigo}</h2>
    <h3>${curso.nome}</h3>
    <p><strong>Créditos:</strong> ${curso.creditos}</p>
    <p><strong>Tipo:</strong> ${curso.tipo}</p>
    <p><strong>Status:</strong> ${curso.completed ? "Concluído" : "Em andamento"}</p>
  `;

  infosDoCurso.showModal();

  // Botão fechar
  document.getElementById("fecharModal").addEventListener("click", () => {
    infosDoCurso.close();
  });

  // Fechar ao clicar fora do modal
  infosDoCurso.addEventListener("click", (event) => {
    const rect = infosDoCurso.getBoundingClientRect();
    const clicouFora =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clicouFora) infosDoCurso.close();
  });
}

// Renderiza os cards
function renderCursos(lista) {
  const container = document.getElementById("listaCursos");
  container.innerHTML = "";
  let total = 0;

  lista.forEach(curso => {
    const card = document.createElement("div");
    card.className = curso.completed ? "curso-card concluido" : "curso-card";

    card.innerHTML = `
      <h3>${curso.codigo}</h3>
      <p>${curso.nome}</p>
      <p><strong>Créditos:</strong> ${curso.creditos}</p>
      <p>Status: ${curso.completed ? "Concluído ✅" : "Em andamento ⏳"}</p>
    `;

    // Evento de clique para abrir o modal
    card.addEventListener("click", () => {
      exibirInfosDoCurso(curso);
    });

    container.appendChild(card);
    total += curso.creditos;
  });

  document.getElementById("totalCreditos").textContent = total;
}

// Filtros
document.getElementById("btnTodos").addEventListener("click", () => renderCursos(cursos));
document.getElementById("btnCSE").addEventListener("click", () => renderCursos(cursos.filter(c => c.tipo === "CSE")));
document.getElementById("btnWDD").addEventListener("click", () => renderCursos(cursos.filter(c => c.tipo === "WDD")));

// Render inicial
renderCursos(cursos);