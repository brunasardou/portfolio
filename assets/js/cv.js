document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const btnTheme = document.getElementById("toggleTheme");
  const btnPrint = document.getElementById("btnPrint");
  const cvDate = document.getElementById("cvDate");

  // Data
  if (cvDate){
    const d = new Date();
    const pad = n => String(n).padStart(2,"0");
    cvDate.textContent = `${pad(d.getDate())}/${pad(d.getMonth()+1)}/${d.getFullYear()}`;
  }

  // Tema persistente
  const saved = localStorage.getItem("cv_theme");
  root.setAttribute("data-theme", saved || "light");

  // Toggle tema
  btnTheme.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("cv_theme", next);
  });

  // PDF
  btnPrint.addEventListener("click", () => window.print());
});
