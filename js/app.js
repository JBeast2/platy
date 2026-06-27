(function () {
  'use strict';

  function isLoggedIn() {
    return localStorage.getItem('platy-logged-in') === 'true';
  }

  function initRouter() {
    Object.entries(pages).forEach(([path, page]) => {
      if (path === 'login') return;
      router.register('/' + path, () => {
        document.title = `${page.title} — Platy`;
        document.body.classList.remove('login-mode');
        document.getElementById('page-content').innerHTML = page.render();
      });
    });

    router.register('/login', () => {
      document.title = `Connexion — Platy`;
      document.getElementById('page-content').innerHTML = pages.login.render();
    });

    router.register('/', () => {
      if (isLoggedIn()) {
        document.title = `Dashboard — Platy`;
        document.body.classList.remove('login-mode');
        document.getElementById('page-content').innerHTML = pages.dashboard.render();
      } else {
        router.navigate('/login');
      }
    });

    router.register('/logout', () => {
      localStorage.removeItem('platy-logged-in');
      localStorage.removeItem('platy-role');
      router.navigate('/login');
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

  function initLogout() {
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('#logout-btn');
      if (btn) {
        e.preventDefault();
        if (confirm('Se déconnecter ?')) {
          router.navigate('/logout');
        }
      }
    });
  }

  function selectRole(el, role) {
    document.querySelectorAll('.role-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    localStorage.setItem('platy-role', role);
  }

  window.selectRole = selectRole;
  window.handleLogin = handleLogin;

  function handleLogin() {
    const role = localStorage.getItem('platy-role') || 'normal';
    localStorage.setItem('platy-logged-in', 'true');
    document.body.classList.remove('login-mode');
    router.navigate('/dashboard');
  }

  function initThemeToggle() {
    const savedTheme = localStorage.getItem('platy-theme') || 'light';
    document.documentElement.className = savedTheme;
  }

  document.addEventListener('DOMContentLoaded', () => {
    initRouter();
    initSidebarToggle();
    initLogout();
    initThemeToggle();
  });
})();
