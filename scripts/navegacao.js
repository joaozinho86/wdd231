document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const menuNav = document.getElementById("menuNav");

  menuBtn.addEventListener("click", () => {
    menuNav.classList.toggle("ativo");
  });
});
