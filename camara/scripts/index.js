document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

const eventos = [
  { titulo: "Workshop de Marketing", data: "20/09/2026" },
  { titulo: "Feira de Negócios", data: "25/09/2026" }
];
const eventosLista = document.getElementById("eventos");
eventos.forEach(ev => {
  const li = document.createElement("li");
  li.textContent = `${ev.titulo} - ${ev.data}`;
  eventosLista.appendChild(li);
});

async function loadWeather() {
  const apiKey = "d5e390d6bebb724e6655125d6e620a88";
  const city = "Santana do Livramento";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=pt_br&appid=${apiKey}`;
  const response = await fetch(url);
  const data = await response.json();

  const climaDiv = document.getElementById("clima");
  const iconAtual = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;

  climaDiv.innerHTML = `
    <p><img src="${iconAtual}" alt="${data.list[0].weather[0].description}">
    ${Math.round(data.list[0].main.temp)}°C - ${data.list[0].weather[0].description}</p>
  `;

  const previsaoDiv = document.getElementById("previsao");
  previsaoDiv.innerHTML = "";

  for (let i = 1; i <= 3; i++) {
    const dia = data.list[i * 8];
    const date = new Date(dia.dt_txt).toLocaleDateString("pt-BR", { weekday: "long" });
    const icon = `https://openweathermap.org/img/wn/${dia.weather[0].icon}.png`;

    previsaoDiv.innerHTML += `
      <p><img src="${icon}" alt="${dia.weather[0].description}">
      ${date}: ${Math.round(dia.main.temp)}°C - ${dia.weather[0].description}</p>
    `;
  }
}
loadWeather();


async function loadEmpresas() {
  const response = await fetch("dados/membros.json");
  const data = await response.json();

  const destaque = data.filter(m => m.membership === "Ouro" || m.membership === "Prata");
  const selecionados = destaque.sort(() => 0.5 - Math.random()).slice(0,3);

  const container = document.getElementById("empresas");
  selecionados.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="${member.image}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>Telefone: ${member.phone}</p>
      <a href="${member.website}" target="_blank">Visite o site</a>
      <p>Nível de associação: ${member.membership}</p>
    `;
    container.appendChild(card);
  });
}
loadEmpresas();

const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});