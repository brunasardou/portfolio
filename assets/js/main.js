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

// Case Projeto 3 — carrossel sem modal

(function () {
  function updateNavState(track, prevBtn, nextBtn) {
    const atStart = track.scrollLeft <= 2;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;

    prevBtn.disabled = atStart;
    nextBtn.disabled = atEnd;
  }

  document.querySelectorAll('[data-p3-gallery]').forEach((wrap) => {
    const track = wrap.querySelector('.p3-gallery__track');
    const prev = wrap.querySelector('.p3-gallery__nav--prev');
    const next = wrap.querySelector('.p3-gallery__nav--next');

    if (!track || !prev || !next) return;

    const step = () => Math.min(track.clientWidth * 0.9, 640);

    prev.addEventListener('click', () => {
      track.scrollBy({ left: -step(), behavior: 'smooth' });
    });

    next.addEventListener('click', () => {
      track.scrollBy({ left: step(), behavior: 'smooth' });
    });

    track.addEventListener('scroll', () => updateNavState(track, prev, next), { passive: true });
    window.addEventListener('resize', () => updateNavState(track, prev, next));

    updateNavState(track, prev, next);
  });
})();
// Case Projeto 3 — carrossel + viewer fullscreen com scroll
(function () {
  const galleryWrap = document.querySelector('[data-p3-gallery]');
  if (!galleryWrap) return;

  const galleryTrack = galleryWrap.querySelector('.p3-gallery__track');
  const thumbs = Array.from(galleryWrap.querySelectorAll('.p3-gallery__media img'));

  // Viewer elements
  const viewer = document.getElementById('p3Viewer');
  const viewerTrack = document.getElementById('p3ViewerTrack');
  const btnClose = document.getElementById('p3ViewerClose');
  const btnPrev = document.getElementById('p3ViewerPrev');
  const btnNext = document.getElementById('p3ViewerNext');

  function step(track) {
    return Math.min(track.clientWidth * 0.95, 900);
  }

  function openViewer(startIndex) {
    // monta slides uma vez por abertura (garante ficar sempre sincronizado)
    viewerTrack.innerHTML = '';
    thumbs.forEach((img) => {
      const slide = document.createElement('div');
      slide.className = 'p3-viewer__slide';

      const big = document.createElement('img');
      big.className = 'p3-viewer__img';
      big.src = img.getAttribute('src');
      big.alt = img.getAttribute('alt') || '';

      slide.appendChild(big);
      viewerTrack.appendChild(slide);
    });

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';

    // vai para o slide clicado
    requestAnimationFrame(() => {
      viewerTrack.scrollTo({ left: startIndex * viewerTrack.clientWidth, behavior: 'instant' });
      syncNav();
    });
  }

  function closeViewer() {
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function currentIndex() {
    const w = viewerTrack.clientWidth;
    return Math.round(viewerTrack.scrollLeft / w);
  }

  function syncNav() {
    const idx = currentIndex();
    btnPrev.disabled = idx <= 0;
    btnNext.disabled = idx >= thumbs.length - 1;
  }

  // Clique nas imagens do carrossel abre viewer
  thumbs.forEach((img, i) => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openViewer(i));
  });

  // Navegação no carrossel da página (já existia)
  const prevInline = galleryWrap.querySelector('.p3-gallery__nav--prev');
  const nextInline = galleryWrap.querySelector('.p3-gallery__nav--next');

  function updateInlineNav() {
    const atStart = galleryTrack.scrollLeft <= 2;
    const atEnd = galleryTrack.scrollLeft + galleryTrack.clientWidth >= galleryTrack.scrollWidth - 2;
    prevInline.disabled = atStart;
    nextInline.disabled = atEnd;
  }

  prevInline.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: -step(galleryTrack), behavior: 'smooth' });
  });
  nextInline.addEventListener('click', () => {
    galleryTrack.scrollBy({ left: step(galleryTrack), behavior: 'smooth' });
  });

  galleryTrack.addEventListener('scroll', updateInlineNav, { passive: true });
  window.addEventListener('resize', updateInlineNav);
  updateInlineNav();

  // Viewer events
  btnClose.addEventListener('click', closeViewer);
  btnPrev.addEventListener('click', () => {
    viewerTrack.scrollBy({ left: -step(viewerTrack), behavior: 'smooth' });
  });
  btnNext.addEventListener('click', () => {
    viewerTrack.scrollBy({ left: step(viewerTrack), behavior: 'smooth' });
  });

  viewerTrack.addEventListener('scroll', syncNav, { passive: true });
  window.addEventListener('resize', syncNav);

  // clicar no fundo fecha
  viewer.addEventListener('click', (e) => {
    if (e.target === viewer) closeViewer();
  });

  // ESC fecha
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && viewer.classList.contains('is-open')) closeViewer();
  });
})();
