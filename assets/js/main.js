/* Scripting por Bruna Sardou
   Funcionalidades: Tema Dark/Light, Lightbox e Data Automática.
*/
document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const themeBtn = document.querySelector('#themeToggle');
    
    
    // Gestão de Tema Integrada
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

    // Datas Dinâmicas (Footer e CV)
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    const cvDate = document.getElementById('cvDate');
    if (cvDate) cvDate.textContent = new Date().toLocaleDateString('pt-BR');

    // Função de Impressão (Apenas para o CV)
    document.getElementById('btnPrint')?.addEventListener('click', () => window.print());
});
