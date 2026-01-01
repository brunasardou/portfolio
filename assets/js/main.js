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
    if (toggleThemeBtn) toggleThemeBtn.textContent = "☀️";
  } else {
    root.removeAttribute("data-theme");
    if (toggleThemeBtn) toggleThemeBtn.textContent = "🌙";
  }
  localStorage.setItem("theme", theme);
}

const savedTheme = localStorage.getItem("theme");
if (savedTheme) setTheme(savedTheme);
else setTheme("light");

toggleThemeBtn?.addEventListener("click", () => {
  const current = localStorage.getItem("theme") || "light";
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
});

// ===== Lightbox para imagens =====
(function () {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightboxImg");
  const closeBtn = document.getElementById("lightboxClose");

  if (!lightbox || !img || !closeBtn) return;

  function openLightbox(src, titleOrAlt) {
    img.src = src;
    img.alt = titleOrAlt || "Imagem do projeto";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    img.src = "";
    document.body.style.overflow = "";
  }

  // Abrir: qualquer elemento com data-preview
  document.querySelectorAll("[data-preview]").forEach((el) => {
    el.addEventListener("click", () => {
      const src = el.dataset.preview;
      const title = el.dataset.title || el.getAttribute("aria-label") || "";
      if (src) openLightbox(src, title);
    });
  });

  // Fechar no botão
  closeBtn.addEventListener("click", closeLightbox);

  // Fechar clicando fora do conteúdo
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Fechar com ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
      closeLightbox();
    }
  });
})();
// Copiar e-mail
(function () {
  const btn = document.getElementById("copyEmail");
  const hint = document.getElementById("copyHint");
  const email = "brunasardou@gmail.com";

  if (!btn) return;

  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      if (hint) hint.textContent = "E-mail copiado ✅";
      setTimeout(() => { if (hint) hint.textContent = ""; }, 2000);
    } catch {
      if (hint) hint.textContent = "Não deu pra copiar — copie manualmente.";
      setTimeout(() => { if (hint) hint.textContent = ""; }, 2500);
    }
  });
})();
