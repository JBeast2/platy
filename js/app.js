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
        <a href="#/e-staffing" class="nav-item" data-nav>
          <span class="material-symbols-outlined">groups</span>
          <span class="nav-label">Staffing</span>
        </a>
        <a href="#/e-talent" class="nav-item" data-nav>
          <span class="material-symbols-outlined">person_search</span>
          <span class="nav-label">Talents</span>
        </a>
        <a href="#/e-approvals" class="nav-item" data-nav>
          <span class="material-symbols-outlined">rule</span>
          <span class="nav-label">Approbations</span>
        </a>
        <a href="#/e-job-offers" class="nav-item" data-nav>
          <span class="material-symbols-outlined">work</span>
          <span class="nav-label">Offres</span>
        </a>
        <a href="#/e-travel" class="nav-item" data-nav>
          <span class="material-symbols-outlined">flight</span>
          <span class="nav-label">Voyages</span>
        </a>
        <a href="#/e-finance-command" class="nav-item" data-nav>
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
        <a href="#/e-staffing" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">groups</span>
          <span class="bottom-nav-label">Staff</span>
        </a>
        <a href="#/e-talent" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">person_search</span>
          <span class="bottom-nav-label">Talents</span>
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
        <a href="#/marketplace" class="nav-item" data-nav>
          <span class="material-symbols-outlined">explore</span>
          <span class="nav-label">Marketplace</span>
        </a>
        <a href="#/my-gigs" class="nav-item" data-nav>
          <span class="material-symbols-outlined">event_available</span>
          <span class="nav-label">My Gigs</span>
        </a>
        <a href="#/events" class="nav-item" data-nav>
          <span class="material-symbols-outlined">event</span>
          <span class="nav-label">Events</span>
        </a>
        <a href="#/messages" class="nav-item" data-nav>
          <span class="material-symbols-outlined">chat</span>
          <span class="nav-label">Messages</span>
        </a>
        <a href="#/finance" class="nav-item" data-nav>
          <span class="material-symbols-outlined">payments</span>
          <span class="nav-label">Finance</span>
        </a>
        <a href="#/expenses" class="nav-item" data-nav>
          <span class="material-symbols-outlined">receipt_long</span>
          <span class="nav-label">Expenses</span>
        </a>
        <a href="#/travel" class="nav-item" data-nav>
          <span class="material-symbols-outlined">flight</span>
          <span class="nav-label">Travel</span>
        </a>
        <a href="#/team" class="nav-item" data-nav>
          <span class="material-symbols-outlined">groups</span>
          <span class="nav-label">Team</span>
        </a>
      `;
      bottomNav.innerHTML = `
        <a href="#/dashboard" class="bottom-nav-item active" data-nav>
          <span class="material-symbols-outlined">dashboard</span>
          <span class="bottom-nav-label">Home</span>
        </a>
        <a href="#/marketplace" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">explore</span>
          <span class="bottom-nav-label">Find Work</span>
        </a>
        <a href="#/my-gigs" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">event_available</span>
          <span class="bottom-nav-label">My Gigs</span>
        </a>
        <a href="#/messages" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">chat</span>
          <span class="bottom-nav-label">Chat</span>
        </a>
        <a href="#/notifications" class="bottom-nav-item" data-nav>
          <span class="material-symbols-outlined">notifications</span>
          <span class="bottom-nav-label">Alerts</span>
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
      var handler = function () {
        document.title = page.title + ' — Platy';
        document.body.classList.remove('login-mode');
        document.getElementById('page-content').innerHTML = page.render();
      };
      if (page.afterRender) {
        handler.afterRender = page.afterRender;
      }
      router.register('/' + path, handler);
    });

    router.register('/login', () => {
      document.title = 'Connexion — Platy';
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
    document.querySelectorAll('.role-btn').forEach(function (b) { b.classList.remove('active'); });
    el.classList.add('active');
    localStorage.setItem('platy-role', role);
  }

  window.selectRole = selectRole;
  window.handleLogin = handleLogin;
  window.toggleFilters = function () {
    var filters = document.getElementById('marketplace-filters');
    if (filters) filters.style.display = filters.style.display === 'none' ? 'block' : 'none';
  };

  function handleLogin() {
    var role = getRole();
    localStorage.setItem('platy-logged-in', 'true');
    updateNav(role);
    document.body.classList.remove('login-mode');
    var home = role === 'entreprise' ? '/e-dashboard' : '/dashboard';
    router.navigate(home);
  }

  function applyTheme(theme) {
    document.documentElement.className = theme;
    Store.set('theme', theme);
    var toggle = document.getElementById('theme-toggle-icon');
    if (toggle) toggle.textContent = theme === 'dark' ? 'dark_mode' : 'light_mode';
  }

  function initThemeToggle() {
    var saved = Store.get('theme') || 'light';
    applyTheme(saved);
    var headerRight = document.querySelector('.header-right');
    if (headerRight) {
      var btn = document.createElement('button');
      btn.className = 'icon-btn';
      btn.setAttribute('aria-label', 'Toggle theme');
      btn.id = 'theme-toggle-btn';
      btn.innerHTML = '<span class="material-symbols-outlined" id="theme-toggle-icon">' + (saved === 'dark' ? 'dark_mode' : 'light_mode') + '</span>';
      btn.addEventListener('click', function () {
        var current = Store.get('theme') || 'light';
        applyTheme(current === 'dark' ? 'light' : 'dark');
      });
      headerRight.insertBefore(btn, headerRight.firstChild);
    }
  }

  function initBadgeCounts() {
    var notifCount = Store.get('notifications').filter(function (n) { return !n.read; }).length;
    var msgCount = Store.get('messages').filter(function (m) { return m.unread; }).length;
    var notifBadge = document.querySelector('a[href="#/notifications"] .badge');
    var msgBadge = document.querySelector('a[href="#/messages"] .badge');
    if (notifBadge) notifBadge.textContent = notifCount;
    if (msgBadge) msgBadge.textContent = msgCount;
  }

  window._initEventWizard = function () {
    var prevStep = parseInt(sessionStorage.getItem('platy-wiz-step')) || 0;
    if (prevStep) {
      Store.set('eventDraft.step', prevStep);
      sessionStorage.removeItem('platy-wiz-step');
    }
  };

  window._saveWizardFields = function () {
    var els = document.querySelectorAll('.event-wiz');
    var draft = Store.get('eventDraft');
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var field = el.getAttribute('data-field');
      if (el.type === 'checkbox') {
        draft.data[field] = el.checked;
      } else {
        draft.data[field] = el.value;
      }
    }
    draft.data.travel = draft.data.travel || {};
    var travelFields = ['travelFlight', 'travelHotel', 'travelNights', 'travelTransfer'];
    for (var ti = 0; ti < travelFields.length; ti++) {
      var tf = travelFields[ti];
      var key = tf.replace('travel', '').toLowerCase();
      draft.data.travel[key] = draft.data[tf] || '';
    }
    Store.set('eventDraft', draft);
    return draft;
  };

  window._wizardNextStep = function () {
    var draft = window._saveWizardFields();
    draft.step = Math.min(draft.step + 1, 4);
    Store.set('eventDraft', draft);
    sessionStorage.setItem('platy-wiz-step', draft.step);
    router.navigate('/e-event-create');
  };

  window._wizardPrevStep = function () {
    var draft = Store.get('eventDraft');
    draft.step = Math.max(draft.step - 1, 1);
    Store.set('eventDraft', draft);
    sessionStorage.setItem('platy-wiz-step', draft.step);
    router.navigate('/e-event-create');
  };

  window._saveWizardDraft = function () {
    window._saveWizardFields();
    Store.set('eventDraft.step', 1);
    var draft = Store.get('eventDraft');
    var events = Store.get('events');
    events.push({
      id: Date.now(),
      title: draft.data.name || 'Nouvel événement',
      circuit: draft.data.location || '—',
      location: draft.data.location || '—',
      startDate: draft.data.startDate || '',
      endDate: draft.data.endDate || '',
      type: draft.data.type || 'Endurance 24H',
      series: 'Personnalisé',
      budget: parseInt(draft.data.budget) || 0,
      status: 'Brouillon',
      recruited: 0,
      totalNeeded: (draft.data.jobs || []).reduce(function (a, b) { return a + (parseInt(b.count) || 0); }, 0),
      color: 'muted'
    });
    Store.set('events', events);
    Store.set('eventDraft', { step: 1, data: {} });
    router.navigate('/e-events');
  };

  window._publishEvent = function () {
    window._saveWizardFields();
    var draft = Store.get('eventDraft');
    var events = Store.get('events');
    events.push({
      id: Date.now(),
      title: draft.data.name || 'Nouvel événement',
      circuit: draft.data.location || '—',
      location: draft.data.location || '—',
      startDate: draft.data.startDate || '',
      endDate: draft.data.endDate || '',
      type: draft.data.type || 'Endurance 24H',
      series: 'Personnalisé',
      budget: parseInt(draft.data.budget) || 0,
      status: 'Actif',
      recruited: 0,
      totalNeeded: (draft.data.jobs || []).reduce(function (a, b) { return a + (parseInt(b.count) || 0); }, 0),
      color: 'primary'
    });
    Store.set('events', events);
    Store.set('eventDraft', { step: 1, data: {} });
    router.navigate('/e-events');
  };

  window._addWizardJob = function () {
    var title = document.getElementById('wiz-job-title');
    var count = document.getElementById('wiz-job-count');
    var rate = document.getElementById('wiz-job-rate');
    if (!title.value) return;
    var draft = Store.get('eventDraft');
    draft.data.jobs = draft.data.jobs || [];
    draft.data.jobs.push({ title: title.value, count: count.value || 1, rate: rate.value || '0' });
    Store.set('eventDraft', draft);
    title.value = '';
    count.value = 1;
    rate.value = '';
    router.navigate('/e-event-create');
  };

  window._removeWizardJob = function (index) {
    var draft = Store.get('eventDraft');
    draft.data.jobs = draft.data.jobs || [];
    draft.data.jobs.splice(index, 1);
    Store.set('eventDraft', draft);
    router.navigate('/e-event-create');
  };

  document.addEventListener('DOMContentLoaded', function () {
    if (isLoggedIn()) {
      updateNav(getRole());
    }
    initRouter();
    initSidebarToggle();
    initLogout();
    initThemeToggle();
    initBadgeCounts();
  });
})();
