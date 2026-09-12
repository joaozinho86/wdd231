// Exibir ano e última modificação
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Carregar eventos fictícios
const eventos = [
  { titulo: "Workshop de Marketing", data: "15/09/2026" },
  { titulo: "Feira de Negócios", data: "22/09/2026" },
  { titulo: "Palestra sobre Exportação", data: "30/09/2026" }
];

const eventosLista = document.getElementById("eventos");
eventos.forEach(ev => {
  const li = document.createElement("li");
  li.textContent = `${ev.titulo} - ${ev.data}`;
  eventosLista.appendChild(li);
});

// Clima e previsão (exemplo estático, pode ser integrado com API)
document.getElementById("clima").innerHTML = `
  <p>22°C Parcialmente Nublado</p>
  <p>Máxima: 24°C | Mínima: 19°C</p>
  <p>Umidade: 34%</p>
  <p>Nascer do Sol: 7:30 | Pôr do Sol: 20:59</p>
`;

document.getElementById("previsao").innerHTML = `
  <p>Hoje: 32°C</p>
  <p>Quarta-feira: 31°C</p>
  <p>Sexta-feira: 18°C</p>
`;

// Empresas em destaque (usando JSON)
async function loadEmpresas() {
  const response = await fetch("dados/membros.json");
  const data = await response.json();

  const container = document.getElementById("empresas");
  data.slice(0,3).forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Email: info@gmail.com</p>
      <p>Telefone: ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visite o site</a>
    `;
    container.appendChild(card);
  });
}

loadEmpresas();
