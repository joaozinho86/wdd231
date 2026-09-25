// Exibir ano e última modificação
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Alternar entre grade e lista
const membersSection = document.getElementById("members");
document.getElementById("gridBtn").addEventListener("click", () => {
  membersSection.classList.add("grid-view");
  membersSection.classList.remove("list-view");
});
document.getElementById("listBtn").addEventListener("click", () => {
  membersSection.classList.add("list-view");
  membersSection.classList.remove("grid-view");
});

// Carregar dados dos membros
async function loadMembers() {
  const response = await fetch("dados/membros.json");
  const data = await response.json();

  data.forEach(member => {
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

    membersSection.appendChild(card);
  });
}
loadMembers();

// Alternar menu hambúrguer
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

document.getElementById("gridBtn").addEventListener("click", () => {
  membersSection.classList.add("grid-view");
  membersSection.classList.remove("list-view");
  document.getElementById("gridBtn").classList.add("active");
  document.getElementById("listBtn").classList.remove("active");
});

document.getElementById("listBtn").addEventListener("click", () => {
  membersSection.classList.add("list-view");
  membersSection.classList.remove("grid-view");
  document.getElementById("listBtn").classList.add("active");
  document.getElementById("gridBtn").classList.remove("active");
});
