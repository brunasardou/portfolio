document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  
  // 1. Gestão de Tema (Persistente em todas as páginas)
  const themeBtn = document.getElementById("themeToggle") || document.getElementById("toggleTheme");
  
  const applyTheme = (theme) => {
    if (theme === "dark") {
      root.setAttribute("data-theme", "dark");
      if (themeBtn) themeBtn.textContent = "☀️";
    } else {
      root.removeAttribute("data-theme");
      if (themeBtn) themeBtn.textContent = "🌙";
    }
    localStorage.setItem("main-theme", theme);
  };

  const savedTheme = localStorage.getItem("main-theme") || 
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  
  applyTheme(savedTheme);

  themeBtn?.addEventListener("click", () => {
    const isDark = root.hasAttribute("data-theme");
    applyTheme(isDark ? "light" : "dark");
  });

  // 2. Data no Rodapé/CV
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const cvDate = document.getElementById("cvDate");
  if (cvDate) {
    cvDate.textContent = new Date().toLocaleDateString('pt-BR');
  }

  // 3. Função de Impressão (CV)
  const printBtn = document.getElementById("btnPrint");
  printBtn?.addEventListener("click", () => window.print());

  // 4. Menu Mobile
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav");
  navToggle?.addEventListener("click", () => {
    navMenu.classList.toggle("is-open");
  });
});