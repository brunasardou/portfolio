/* ============================================================
   Scripting por Bruna Sardou
   Funcionalidades: Tema, Datas e Lightbox com Carrossel
============================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeBtn = document.querySelector('#themeToggle');
    
    // --- GESTÃO DE TEMA ---
    const applyTheme = (theme) => {
        theme === 'dark' ? root.setAttribute('data-theme', 'dark') : root.removeAttribute('data-theme');
        localStorage.setItem('main-theme', theme);
        if (themeBtn) themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
    };

    const savedTheme = localStorage.getItem('main-theme') || 
        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    applyTheme(savedTheme);

    themeBtn?.addEventListener('click', () => {
        const isDark = root.hasAttribute('data-theme');
        applyTheme(isDark ? 'light' : 'dark');
    });

    // --- DATAS DINÂMICAS ---
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();

    // --- LIGHTBOX COM CARROSSEL ---
    
    // 1. Injetar HTML do Modal se não existir
    if (!document.getElementById('lightboxModal')) {
        const modalHTML = `
          <div id="lightboxModal" class="modal-lightbox">
            <span class="modal-close">&times;</span>
            <button class="nav-btn prev">&#10094;</button>
            <div class="modal-container">
                <img id="modalImg" src="" alt="View">
            </div>
            <button class="nav-btn next">&#10095;</button>
          </div>`;
        document.body.insertAdjacentHTML('beforeend', modalHTML);
    }

    const modal = document.getElementById("lightboxModal");
    const modalImg = document.getElementById("modalImg");
    const btnNext = document.querySelector('.next');
    const btnPrev = document.querySelector('.prev');
    
    let currentImgs = [];
    let currentIndex = 0;

    // 2. Abrir Lightbox
    document.querySelectorAll('.card-img').forEach(img => {
        img.style.cursor = "zoom-in";
        img.addEventListener('click', function() {
            // Se tiver data-imgs (Projeto 03), transforma em array, senão usa apenas a src atual
            const dataImgs = this.getAttribute('data-imgs');
            currentImgs = dataImgs ? dataImgs.split(',') : [this.src];
            currentIndex = 0;
            
            showImage();
            modal.style.display = "flex";
        });
    });

    function showImage() {
        modalImg.src = currentImgs[currentIndex];
        // Esconde setas se for imagem única
        const displayStyle = currentImgs.length > 1 ? "block" : "none";
        btnNext.style.display = displayStyle;
        btnPrev.style.display = displayStyle;
    }

    // 3. Navegação
    btnNext.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % currentImgs.length;
        showImage();
    };

    btnPrev.onclick = (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + currentImgs.length) % currentImgs.length;
        showImage();
    };

    // 4. Fechar
    document.querySelector('.modal-close').onclick = () => modal.style.display = "none";
    modal.onclick = (e) => { if (e.target === modal || e.target.classList.contains('modal-container')) modal.style.display = "none"; };
});