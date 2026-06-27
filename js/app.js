(function () {
  'use strict';

  function initRouter() {
    Object.entries(pages).forEach(([path, page]) => {
      router.register('/' + path, () => {
        document.title = `${page.title} — Platy`;
        document.getElementById('page-content').innerHTML = page.render();
      });
    });

    router.register('/', () => {
      document.title = `Dashboard — Platy`;
      document.getElementById('page-content').innerHTML = pages.dashboard.render();
    });

    router.init();
  }

  function initSidebarToggle() {
    const toggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });

      document.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          const isClickInside = sidebar.contains(e.target) || toggle.contains(e.target);
          if (!isClickInside && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
          }
        }
      });
    }
  }

  function initThemeToggle() {
    const savedTheme = localStorage.getItem('platy-theme') || 'light';
    document.documentElement.className = savedTheme;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initSidebarToggle();
    initThemeToggle();
  });
})();
