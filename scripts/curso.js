const cursos = [
  { codigo: "WDD130", nome: "Web Design 130 - Fundamentos da Web", creditos: 2, tipo: "WDD", completed: true },
  { codigo: "WDD131", nome: "Web Fundamentos da Web Dinâmica 131", creditos: 2, tipo: "WDD", completed: false },
  { codigo: "WDD231", nome: "Desenvolvimento Frontend para Web I - WDD231", creditos: 2, tipo: "WDD", completed: false },
  { codigo: "CSE110", nome: "Programação com classes - CSE110", creditos: 2, tipo: "CSE", completed: true }
];

function renderCursos(lista) {
  const container = document.getElementById("listaCursos");
  container.innerHTML = "";
  let total = 0;

  lista.forEach(curso => {
    const card = document.createElement("div");
    card.className = curso.completed ? "curso concluido" : "curso";
    card.textContent = `${curso.codigo} - ${curso.nome} (${curso.creditos} créditos)`;
    container.appendChild(card);
    total += curso.creditos;
  });

  document.getElementById("totalCreditos").textContent = total;
}

document.getElementById("btnTodos").addEventListener("click", () => renderCursos(cursos));
document.getElementById("btnCSE").addEventListener("click", () => renderCursos(cursos.filter(c => c.tipo === "CSE")));
document.getElementById("btnWDD").addEventListener("click", () => renderCursos(cursos.filter(c => c.tipo === "WDD")));

renderCursos(cursos);