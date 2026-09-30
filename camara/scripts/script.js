// Exibir ano e última modificação
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Variáveis globais
const membersSection = document.getElementById("members");
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");

// Alternar entre grade e lista
gridBtn.addEventListener("click", () => {
  membersSection.classList.add("grid-view");
  membersSection.classList.remove("list-view");
  gridBtn.classList.add("active");
  listBtn.classList.remove("active");
});

listBtn.addEventListener("click", () => {
  membersSection.classList.add("list-view");
  membersSection.classList.remove("grid-view");
  listBtn.classList.add("active");
  gridBtn.classList.remove("active");
});

// Carregar dados dos membros
async function loadMembers() {
  // CORREÇÃO PRINCIPAL: Limpa a seção antes de adicionar os itens para evitar duplicação
  membersSection.innerHTML = ""; 
  
  try {
    const response = await fetch("dados/membros.json");
    const data = await response.json();

    data.forEach(member => {
      const card = document.createElement("div");
      
      // Garantindo que o card use a classe correta do CSS para ficar lado a lado
      card.classList.add("item-do-membro"); 
      
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
  } catch (error) {
    console.error("Erro ao carregar os membros:", error);
  }
}
loadMembers();

// Alternar menu hambúrguer
const hamburger = document.getElementById("hamburgerBtn"); // ID atualizado no HTML
const navMenu = document.getElementById("navMenu");

hamburger.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  // Acessibilidade: atualiza aria-expanded
  const expanded = navMenu.classList.contains("show");
  hamburger.setAttribute("aria-expanded", expanded);
});