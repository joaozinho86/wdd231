const menuBtn = document.getElementById("menuBtn");
const menuNav = document.getElementById("menuNav");

menuBtn.addEventListener("click", () => {
  menuNav.style.display = menuNav.style.display === "flex" ? "none" : "flex";
});