// Ano no footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Menu mobile
const toggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");
if (toggle && nav) {
  toggle.addEventListener("click", () => {
    nav.classList.toggle("is-open");
  });
}

// Tema claro/dark (salva no navegador)
const toggleThemeBtn = document.getElementById("themeToggle");
const root = document.documentElement;

function setTheme(theme){
  if (theme === "dark") {
    root.setAttribute("data-theme", "dark");
    toggleThemeBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    toggleThemeBtn.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}

// 1) Carrega tema salvo
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // 2) Se não tem salvo, começa no claro (você pode mudar isso depois)
  setTheme("light");
}

// 3) Alterna
toggleThemeBtn?.addEventListener("click", () => {
  const current = localStorage.getItem("theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
});
