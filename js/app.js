(function () {
  'use strict';

  function isLoggedIn() {
    return localStorage.getItem('platy-logged-in') === 'true';
  }

  function getRole() {
    return localStorage.getItem('platy-role') || 'normal';
  }

  function updateNav(role) {
    const sidebarNav = document.querySelector('.sidebar-nav');
    const bottomNav = document.getElementById('mobile-bottom-nav');

    if (role === 'entreprise') {
      sidebarNav.innerHTML = `
        <a href="#/e-dashboard" class="nav-item active" data-nav>
          <span class="material-symbols-outlined">dashboard</span>
          <span class="nav-label">Tableau de bord</span>
        </a>
        <a href="#/e-events" class="nav-item" data-nav>
          <span class="material-symbols-outlined">event</span>
          <span class="nav-label">Événements</span>
        </a>
        <a href="#/e-job-offers" class="nav-item" data-nav>
          <span class="material-symbols-outlined">work</span>
          <span class="nav-label">Offres d'emploi</span>
        </a>
        <a href="#/e-applicants" class="nav-item" data-nav>
          <span class="material-symbols-outlined">person_search</span>
          <span class="nav-label">Candidatures</span>
        </a>
        <a href="#/e-team" class="nav-item" data-nav>
          <span class="material-symbols-outlined">groups</span>
          <span class="nav-label">Mon équipe</span>
        </a>
        <a href="#/e-travel" class="nav-item" data-nav>
          <span class="material-symbols-outlined">flight</span>
          <span class="nav-label">Voyages</span>
        </a>
        <a href="#/e-finance" class="nav-item" data-nav>
          <span class="material-symbols-outlined">payments</span>
          <span class="nav-label">Finance</span>
        </a>
      `;
      bottomNav.innerHTML = `
        <a href="#/e-dashboard" class="bottom-nav-item active" data-nav>
          <span class="material-symbols-outlined">dashboard</span>
          <span class="bottom-nav-label">Board</span>
        </a>
        <a href="#/e-events" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">event</span>
          <span class="bottom-nav-label">Events</span>
        </a>
        <a href="#/e-job-offers" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">work</span>
          <span class="bottom-nav-label">Jobs</span>
        </a>
        <a href="#/e-applicants" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">person_search</span>
          <span class="bottom-nav-label">Candidats</span>
        </a>
        <a href="#/e-company" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">business</span>
          <span class="bottom-nav-label">Société</span>
        </a>
      `;
    } else {
      sidebarNav.innerHTML = `
        <a href="#/dashboard" class="nav-item active" data-nav>
          <span class="material-symbols-outlined">dashboard</span>
          <span class="nav-label">Dashboard</span>
        </a>
        <a href="#/jobs" class="nav-item" data-nav>
          <span class="material-symbols-outlined">work</span>
          <span class="nav-label">Jobs</span>
        </a>
        <a href="#/events" class="nav-item" data-nav>
          <span class="material-symbols-outlined">event</span>
          <span class="nav-label">Events</span>
        </a>
        <a href="#/team" class="nav-item" data-nav>
          <span class="material-symbols-outlined">groups</span>
          <span class="nav-label">Team</span>
        </a>
        <a href="#/messages" class="nav-item" data-nav>
          <span class="material-symbols-outlined">chat</span>
          <span class="nav-label">Messages</span>
        </a>
        <a href="#/finance" class="nav-item" data-nav>
          <span class="material-symbols-outlined">payments</span>
          <span class="nav-label">Finance</span>
        </a>
        <a href="#/travel" class="nav-item" data-nav>
          <span class="material-symbols-outlined">flight</span>
          <span class="nav-label">Travel</span>
        </a>
      `;
      bottomNav.innerHTML = `
        <a href="#/dashboard" class="bottom-nav-item active" data-nav>
          <span class="material-symbols-outlined">dashboard</span>
          <span class="bottom-nav-label">Home</span>
        </a>
        <a href="#/jobs" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">work</span>
          <span class="bottom-nav-label">Jobs</span>
        </a>
        <a href="#/events" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">event</span>
          <span class="bottom-nav-label">Events</span>
        </a>
        <a href="#/messages" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">chat</span>
          <span class="bottom-nav-label">Chat</span>
        </a>
        <a href="#/profile" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">person</span>
          <span class="bottom-nav-label">Profile</span>
        </a>
      `;
    }
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
        const role = getRole();
        const home = role === 'entreprise' ? '/e-dashboard' : '/dashboard';
        router.navigate(home);
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
    const role = getRole();
    localStorage.setItem('platy-logged-in', 'true');
    updateNav(role);
    document.body.classList.remove('login-mode');
    const home = role === 'entreprise' ? '/e-dashboard' : '/dashboard';
    router.navigate(home);
  }

  function initThemeToggle() {
    const savedTheme = localStorage.getItem('platy-theme') || 'light';
    document.documentElement.className = savedTheme;
  }

  document.addEventListener('DOMContentLoaded', () => {
    if (isLoggedIn()) {
      updateNav(getRole());
    }
    initRouter();
    initSidebarToggle();
    initLogout();
    initThemeToggle();
  });
})();