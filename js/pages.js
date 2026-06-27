const pages = {
  login: {
    title: 'Connexion',
    render: () => {
      document.body.classList.add('login-mode');
      return `
      <div class="login-page">
        <div class="login-card">
          <div class="login-logo">
            <img src="assets/logo-platy.jpg" alt="Platy" class="login-logo-img">
          </div>
          <p class="login-subtitle">Your Digital Agent for Smarter Work</p>

          <div class="role-selector">
            <p class="role-label">Je suis</p>
            <div class="role-options">
              <button class="role-btn" onclick="selectRole(this, 'normal')" id="role-normal">
                <span class="material-symbols-outlined">person</span>
                <span class="role-btn-title">Normal</span>
                <span class="role-btn-desc">Freelance, prestataire</span>
              </button>
              <button class="role-btn active" onclick="selectRole(this, 'entreprise')" id="role-entreprise">
                <span class="material-symbols-outlined">business</span>
                <span class="role-btn-title">Entreprise</span>
                <span class="role-btn-desc">Équipe, organisateur</span>
              </button>
            </div>
          </div>

          <div class="login-form">
            <div class="login-field">
              <label class="login-label">Email</label>
              <input class="input-field" type="email" placeholder="vous@exemple.com" id="login-email">
            </div>
            <div class="login-field">
              <label class="login-label">Mot de passe</label>
              <input class="input-field" type="password" placeholder="••••••••" id="login-password">
            </div>
            <button class="btn btn-primary btn-lg login-btn" onclick="handleLogin()">
              Se connecter
            </button>
          </div>

          <p class="login-footer">
            Pas encore de compte ? <a href="#" onclick="event.preventDefault(); alert('Inscription pas encore disponible')">Créer un compte</a>
          </p>
        </div>
      </div>
      `;
    }
  },
  dashboard: {
    title: 'Dashboard',
    afterRender: function() {
      if (document.getElementById('dashboard-calendar')) {
        renderCalendar('dashboard-calendar');
      }
    },
    render: function() {
      var user = Store.get('user');
      var gigs = Store.get('activeGigs');
      var events = Store.get('events');
      var activeCount = gigs.filter(function(g) { return g.status === 'Active'; }).length;
      var upcomingCount = events.filter(function(e) { return e.status === 'Actif' || e.status === 'Planification'; }).length;
      var finances = Store.get('finance');

      function jobCard(j) {
        return '<div class="job-card"><div class="job-card-header"><h3 class="job-card-title">' + j.title + '</h3><span class="tag tag-' + (j.status === 'Active' ? 'success' : 'warning') + '">' + j.status + '</span></div><p class="text-sm text-muted">' + j.event + ' • ' + j.dates + '</p><div class="job-card-tags">' + (j.tags || []).map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('') + '</div><div class="job-card-footer"><span class="font-bold text-primary">' + j.rate + '</span><span class="text-sm text-muted">' + j.location + '</span></div></div>';
      }

      function eventCard(e) {
        return '<div class="event-card"><div class="event-card-header"><h3 class="event-card-title">' + e.title + '</h3><span class="text-sm text-muted">' + e.startDate + '</span></div><p class="text-sm text-muted">' + e.circuit + ', ' + e.location + '</p><div class="event-card-footer"><span class="tag">' + e.series + '</span><button class="btn btn-primary btn-sm">View Details</button></div></div>';
      }

      return '<section class="page-section"><div class="section-header"><h1 class="section-title">Dashboard</h1><div class="flex gap-sm"><button class="btn btn-secondary btn-sm">This Week</button><button class="btn btn-primary btn-sm" onclick="router.navigate(\'/jobs\')">Find Work</button></div></div><div class="stats-row"><div class="stat-card"><div class="stat-icon" style="background:rgba(36,162,167,0.1);color:var(--primary);"><span class="material-symbols-outlined">work</span></div><span class="stat-value">' + activeCount + '</span><span class="stat-label">Active Jobs</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(22,163,74,0.1);color:var(--success);"><span class="material-symbols-outlined">payments</span></div><span class="stat-value">€' + finances.earnings.toLocaleString() + '</span><span class="stat-label">This Month</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(245,158,11,0.1);color:var(--warning);"><span class="material-symbols-outlined">event</span></div><span class="stat-value">' + upcomingCount + '</span><span class="stat-label">Upcoming Events</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(99,102,241,0.1);color:#6366f1;"><span class="material-symbols-outlined">reviews</span></div><span class="stat-value">' + user.rating + '</span><span class="stat-label">Rating</span></div></div></section><section class="page-section"><div class="section-header"><h2 class="section-title">My Calendar</h2></div><div id="dashboard-calendar"></div></section><section class="page-section"><div class="section-header"><h2 class="section-title">Active Jobs</h2><a href="#/jobs" class="text-sm text-primary" data-nav>View all</a></div><div class="grid gap-md" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr));">' + gigs.filter(function(g) { return g.status === 'Active' || g.status === 'Upcoming'; }).slice(0, 3).map(jobCard).join('') + '</div></section><section class="page-section"><div class="section-header"><h2 class="section-title">Upcoming Events</h2><a href="#/events" class="text-sm text-primary" data-nav>View all</a></div><div class="grid gap-md" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr));">' + events.slice(0, 2).map(eventCard).join('') + '</div></section>';
    }
  },

  jobs: {
    title: 'Jobs',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Find Work</h1>
          <div class="flex gap-sm">
            <button class="btn btn-secondary btn-sm">Filters</button>
            <button class="btn btn-primary btn-sm">Post a Job</button>
          </div>
        </div>

        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">All</button>
          <button class="btn btn-secondary btn-sm">Mechanic</button>
          <button class="btn btn-secondary btn-sm">Engineer</button>
          <button class="btn btn-secondary btn-sm">Media</button>
          <button class="btn btn-secondary btn-sm">Logistics</button>
        </div>

        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-card-title">GT3 Lead Mechanic</h3>
                <p class="text-sm text-muted">Spa 24H • Jun 26-29</p>
              </div>
              <span class="tag tag-success">New</span>
            </div>
            <div class="job-card-tags">
              <span class="tag">Mechanic</span>
              <span class="tag">GT3</span>
              <span class="tag">Spa</span>
            </div>
            <div class="job-card-meta">
              <span>📍 Spa, Belgium</span>
              <span>👥 2 positions</span>
            </div>
            <div class="job-card-footer">
              <span class="font-bold text-primary">€350/day</span>
              <button class="btn btn-primary btn-sm">Apply</button>
            </div>
          </div>
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-card-title">Data Engineer - WEC</h3>
                <p class="text-sm text-muted">Monaco GP • Jul 3-7</p>
              </div>
              <span class="tag tag-warning">Urgent</span>
            </div>
            <div class="job-card-tags">
              <span class="tag">Engineering</span>
              <span class="tag">Data</span>
            </div>
            <div class="job-card-meta">
              <span>📍 Monte Carlo</span>
              <span>👥 1 position</span>
            </div>
            <div class="job-card-footer">
              <span class="font-bold text-primary">€400/day</span>
              <button class="btn btn-primary btn-sm">Apply</button>
            </div>
          </div>
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-card-title">Race Photographer</h3>
                <p class="text-sm text-muted">Nürburgring 24H • Jul 15-18</p>
              </div>
            </div>
            <div class="job-card-tags">
              <span class="tag">Media</span>
              <span class="tag">Photography</span>
            </div>
            <div class="job-card-meta">
              <span>📍 Nürburg, Germany</span>
              <span>👥 1 position</span>
            </div>
            <div class="job-card-footer">
              <span class="font-bold text-primary">€280/day</span>
              <button class="btn btn-primary btn-sm">Apply</button>
            </div>
          </div>
        </div>
      </section>
    `
  },

  events: {
    title: 'Events',
    render: () => {
      var events = Store.get('events') || [];
      var cardsHtml = events.map(function(e) {
        var statusClass = e.status === 'Actif' ? 'tag-success' : (e.status === 'Planification' ? 'tag-warning' : 'tag');
        return '<div class="event-card">' +
          '<div class="event-card-header"><h3 class="event-card-title">' + e.title + '</h3><span class="text-sm text-muted">' + e.startDate + '</span></div>' +
          '<p class="text-sm text-muted">' + e.circuit + ', ' + e.location + '</p>' +
          '<div class="event-card-meta"><span>🏁 ' + e.series + '</span><span>👥 ' + e.totalNeeded + ' staff needed</span></div>' +
          '<div class="event-card-footer"><span class="tag ' + statusClass + '">' + e.status + '</span><button class="btn btn-primary btn-sm">Manage</button></div>' +
        '</div>';
      }).join('');

      return '<section class="page-section">' +
        '<div class="section-header"><h1 class="section-title">Events</h1><button class="btn btn-primary btn-sm">Create Event</button></div>' +
        '<div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">' + cardsHtml + '</div>' +
      '</section>';
    }
  },

  messages: {
    title: 'Messages',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Messages</h1>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">All</button>
          <button class="btn btn-secondary btn-sm">Unread</button>
          <button class="btn btn-secondary btn-sm">Jobs</button>
          <button class="btn btn-secondary btn-sm">Teams</button>
        </div>
        <div class="grid gap-sm">
          <div class="card flex items-center gap-md" style="cursor:pointer; border-left: 3px solid var(--primary);">
            <div class="avatar">TM</div>
            <div style="flex:1; min-width:0;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">Thomas Müller</span>
                <span class="text-sm text-muted">2m ago</span>
              </div>
              <p class="text-sm text-muted truncate">Perfect, see you at the paddock at 7!</p>
            </div>
          </div>
          <div class="card flex items-center gap-md" style="cursor:pointer;">
            <div class="avatar" style="background: rgba(147,51,234,0.1); color: #9333ea;">SP</div>
            <div style="flex:1; min-width:0;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">Spa 24H Team Chat</span>
                <span class="text-sm text-muted">1h ago</span>
              </div>
              <p class="text-sm text-muted truncate">Sarah: New tire allocation confirmed</p>
            </div>
          </div>
          <div class="card flex items-center gap-md" style="cursor:pointer;">
            <div class="avatar" style="background: rgba(234,88,12,0.1); color: #ea580c;">JW</div>
            <div style="flex:1; min-width:0;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">James Wilson</span>
                <span class="text-sm text-muted">3h ago</span>
              </div>
              <p class="text-sm text-muted truncate">Great work today! Let's discuss the next race...</p>
            </div>
          </div>
        </div>
      </section>
    `
  },

  team: {
    title: 'Team',
    render: () => {
      var team = Store.get('team') || [];
      var cardsHtml = team.map(function(m) {
        var statusClass = m.status === 'Available' || m.status === 'Active' ? 'tag-success' : 'tag-warning';
        var bgStyle = m.initialsBg ? 'background:' + m.initialsBg + '; color:' + (m.initialsColor || 'inherit') + ';' : '';
        return '<div class="card text-center">' +
          '<div class="avatar avatar-lg" style="margin: 0 auto 12px;' + bgStyle + '">' + m.initials + '</div>' +
          '<h3 class="font-bold">' + m.name + '</h3>' +
          '<p class="text-sm text-muted">' + m.role + '</p>' +
          '<span class="tag ' + statusClass + ' mt-sm">' + m.status + '</span>' +
        '</div>';
      }).join('');

      return '<section class="page-section">' +
        '<div class="section-header"><h1 class="section-title">Team</h1><button class="btn btn-primary btn-sm">Build Team</button></div>' +
        '<div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">' + cardsHtml + '</div>' +
      '</section>';
    }
  },

  finance: {
    title: 'Finance',
    render: () => {
      var invoices = Store.get('invoices') || [];
      var totals = Store.get('finances') || { earnings: 12200, pending: 8400, ytd: 45000 };
      var rowsHtml = invoices.map(function(inv) {
        var statusClass = inv.status === 'Paid' ? 'tag-success' : (inv.status === 'Pending' ? 'tag-warning' : 'tag-error');
        return '<tr style="border-bottom: 1px solid var(--outline-light);">' +
          '<td class="p-md text-sm">' + inv.date + '</td>' +
          '<td class="p-md text-sm font-bold">' + inv.job + '</td>' +
          '<td class="p-md text-sm">' + inv.amount + '</td>' +
          '<td class="p-md"><span class="tag ' + statusClass + '">' + inv.status + '</span></td>' +
        '</tr>';
      }).join('');

      return '<section class="page-section">' +
        '<div class="section-header"><h1 class="section-title">Finance</h1><button class="btn btn-primary btn-sm">New Invoice</button></div>' +
        '<div class="stats-row mb-lg">' +
          '<div class="stat-card"><span class="stat-value">€' + totals.earnings.toLocaleString() + '</span><span class="stat-label">Earnings This Month</span></div>' +
          '<div class="stat-card"><span class="stat-value">€' + totals.pending.toLocaleString() + '</span><span class="stat-label">Pending</span></div>' +
          '<div class="stat-card"><span class="stat-value">€' + totals.ytd.toLocaleString() + '</span><span class="stat-label">YTD Total</span></div>' +
        '</div>' +
        '<div class="card"><div class="card-header"><span class="card-title">Invoices</span></div>' +
        '<table style="width:100%; border-collapse: collapse;"><thead><tr style="text-align:left; border-bottom: 1px solid var(--outline-light);"><th class="text-sm text-muted p-md">Date</th><th class="text-sm text-muted p-md">Job</th><th class="text-sm text-muted p-md">Amount</th><th class="text-sm text-muted p-md">Status</th></tr></thead><tbody>' +
        rowsHtml +
        '</tbody></table></div></section>';
    }
  },

  travel: {
    title: 'Travel',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Travel & Logistics</h1>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
          <div class="card">
            <div class="card-header">
              <span class="card-title">Spa 24H</span>
              <span class="tag tag-success">Confirmed</span>
            </div>
            <div class="flex flex-col gap-sm">
              <div class="flex items-center gap-sm">
                <span class="material-symbols-outlined text-primary">flight</span>
                <span class="text-sm">Brussels Airport (BRU) • Jun 26</span>
              </div>
              <div class="flex items-center gap-sm">
                <span class="material-symbols-outlined text-primary">hotel</span>
                <span class="text-sm">Hotel de la Source • 4 nights</span>
              </div>
              <div class="flex items-center gap-sm">
                <span class="material-symbols-outlined text-primary">directions_car</span>
                <span class="text-sm">Rental Car • BMW X3</span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header">
              <span class="card-title">Monaco GP</span>
              <span class="tag">Planning</span>
            </div>
            <div class="flex flex-col gap-sm">
              <div class="flex items-center gap-sm">
                <span class="material-symbols-outlined text-muted">flight</span>
                <span class="text-sm text-muted">Not yet booked</span>
              </div>
              <div class="flex items-center gap-sm">
                <span class="material-symbols-outlined text-muted">hotel</span>
                <span class="text-sm text-muted">Not yet booked</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  settings: {
    title: 'Settings',
    render: () => {
      var user = Store.get('user') || {};
      return '<section class="page-section">' +
        '<div class="section-header"><h1 class="section-title">Paramètres</h1></div>' +
        '<div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">' +
          '<button class="btn btn-primary btn-sm" onclick="document.querySelectorAll(\'.settings-tab\').forEach(function(e){e.style.display=\'none\'});document.getElementById(\'settings-profile\').style.display=\'block\';this.parentElement.querySelectorAll(\'.btn-primary\').forEach(function(b){b.className=b.className.replace(\'btn-primary\',\'btn-secondary\')});this.className=\'btn btn-primary btn-sm\'">Profil</button>' +
          '<button class="btn btn-secondary btn-sm" onclick="document.querySelectorAll(\'.settings-tab\').forEach(function(e){e.style.display=\'none\'});document.getElementById(\'settings-account\').style.display=\'block\';this.parentElement.querySelectorAll(\'.btn-primary\').forEach(function(b){b.className=b.className.replace(\'btn-primary\',\'btn-secondary\')});this.className=\'btn btn-primary btn-sm\'">Compte</button>' +
          '<button class="btn btn-secondary btn-sm" onclick="document.querySelectorAll(\'.settings-tab\').forEach(function(e){e.style.display=\'none\'});document.getElementById(\'settings-notif\').style.display=\'block\';this.parentElement.querySelectorAll(\'.btn-primary\').forEach(function(b){b.className=b.className.replace(\'btn-primary\',\'btn-secondary\')});this.className=\'btn btn-primary btn-sm\'">Notifications</button>' +
          '<button class="btn btn-secondary btn-sm" onclick="document.querySelectorAll(\'.settings-tab\').forEach(function(e){e.style.display=\'none\'});document.getElementById(\'settings-billing\').style.display=\'block\';this.parentElement.querySelectorAll(\'.btn-primary\').forEach(function(b){b.className=b.className.replace(\'btn-primary\',\'btn-secondary\')});this.className=\'btn btn-primary btn-sm\'">Facturation</button>' +
        '</div>' +
        '<div id="settings-profile" class="settings-tab card mb-lg">' +
          '<h3 class="font-bold mb-md">Informations du profil</h3>' +
          '<div class="flex items-center gap-lg mb-lg"><div class="avatar avatar-lg">' + (user.initials || 'JD') + '</div><div><h3 class="font-bold">' + (user.name || 'John Doe') + '</h3><p class="text-sm text-muted">' + (user.title || 'GT3 Lead Mechanic') + '</p></div></div>' +
          '<div class="grid grid-2 gap-md">' +
            '<div><label class="text-sm text-muted mb-sm block">Nom complet</label><input class="input-field" value="' + (user.name || 'John Doe') + '"></div>' +
            '<div><label class="text-sm text-muted mb-sm block">Email</label><input class="input-field" value="' + (user.email || 'john.doe@platypro.com') + '"></div>' +
            '<div><label class="text-sm text-muted mb-sm block">Téléphone</label><input class="input-field" value="' + (user.phone || '+32 4 76 12 34 56') + '"></div>' +
            '<div><label class="text-sm text-muted mb-sm block">Localisation</label><input class="input-field" value="' + (user.location || 'Spa, Belgium') + '"></div>' +
          '</div>' +
          '<div class="flex justify-end gap-sm mt-lg"><button class="btn btn-secondary">Annuler</button><button class="btn btn-primary">Enregistrer</button></div>' +
        '</div>' +
        '<div id="settings-account" class="settings-tab card mb-lg" style="display:none;">' +
          '<h3 class="font-bold mb-md">Paramètres du compte</h3>' +
          '<div class="flex flex-col gap-md">' +
            '<div class="flex items-center justify-between"><span class="text-sm">Mot de passe</span><button class="btn btn-secondary btn-sm">Changer</button></div>' +
            '<div class="flex items-center justify-between"><span class="text-sm">Langue</span><select class="input-field" style="width:auto;"><option>Français</option><option>English</option></select></div>' +
            '<div class="flex items-center justify-between"><span class="text-sm">Fuseau horaire</span><span class="text-sm text-muted">Europe/Paris (CEST)</span></div>' +
          '</div>' +
        '</div>' +
        '<div id="settings-notif" class="settings-tab card mb-lg" style="display:none;">' +
          '<h3 class="font-bold mb-md">Notifications</h3>' +
          '<div class="flex flex-col gap-md">' +
            '<label class="flex items-center justify-between"><span class="text-sm">Nouvelles offres d\'emploi</span><div class="switch"><input type="checkbox" checked><span class="slider"></span></div></label>' +
            '<label class="flex items-center justify-between"><span class="text-sm">Messages</span><div class="switch"><input type="checkbox" checked><span class="slider"></span></div></label>' +
            '<label class="flex items-center justify-between"><span class="text-sm">Rappels d\'événements</span><div class="switch"><input type="checkbox" checked><span class="slider"></span></div></label>' +
            '<label class="flex items-center justify-between"><span class="text-sm">Newsletter</span><div class="switch"><input type="checkbox"><span class="slider"></span></div></label>' +
          '</div>' +
        '</div>' +
        '<div id="settings-billing" class="settings-tab card mb-lg" style="display:none;">' +
          '<h3 class="font-bold mb-md">Facturation</h3>' +
          '<div class="flex flex-col gap-md">' +
            '<div class="flex items-center justify-between"><span class="text-sm">Mode de paiement</span><span class="text-sm text-muted">Visa se terminant par 4242</span><button class="btn btn-secondary btn-sm">Modifier</button></div>' +
            '<div class="flex items-center justify-between"><span class="text-sm">Devise</span><span class="text-sm font-bold">EUR (€)</span></div>' +
            '<div class="flex items-center justify-between"><span class="text-sm">Taux TVA</span><span class="text-sm">TVA intracommunautaire</span></div>' +
          '</div>' +
        '</div>' +
      '</section>';
    }
  },

  marketplace: {
    title: 'Job Marketplace',
    render: () => {
      var jobs = Store.get('jobs') || [];
      var jobCardsHtml = jobs.map(function(j) {
        var statusTag = j.status === 'Featured' ? 'tag-success' : (j.status === 'Urgent' ? 'tag-warning' : '');
        var statusBadge = j.status !== 'Open' ? '<span class="tag ' + statusTag + '">' + j.status + '</span>' : '';
        var initialsColor = j.employerInitials === 'SI' ? 'primary' : (j.employerInitials === 'AM' ? 'warning' : (j.employerInitials === 'GT' ? '#9333ea' : 'primary'));
        var tagsHtml = (j.tags || []).map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('');
        return '<div class="job-card" onclick="router.navigate(\'/job-detail?id=' + j.id + '\')">' +
          '<div class="job-card-header">' +
            '<div><h3 class="job-card-title">' + j.title + '</h3><p class="text-sm text-muted">' + j.event + ' • ' + j.dates + '</p></div>' +
            statusBadge +
          '</div>' +
          '<div class="flex items-center gap-2 mb-sm">' +
            '<span class="text-xs font-bold text-primary bg-primary-bg px-2 py-1 rounded">' + j.rate + '</span>' +
            '<span class="text-xs text-muted">📍 ' + j.location + '</span>' +
          '</div>' +
          '<div class="job-card-tags">' + tagsHtml + '</div>' +
          '<div class="flex items-center gap-3 mt-2">' +
            '<span class="flex items-center gap-1 text-xs"><span class="material-symbols-outlined text-sm">person</span> ' + j.openings + ' position' + (j.openings > 1 ? 's' : '') + '</span>' +
            '<span class="flex items-center gap-1 text-xs"><span class="material-symbols-outlined text-sm">schedule</span> ' + j.duration + '</span>' +
          '</div>' +
          '<div class="job-card-footer">' +
            '<div class="flex items-center gap-2"><div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style="background:var(--' + (initialsColor === 'primary' ? 'primary' : initialsColor) + ');">' + j.employerInitials + '</div><span class="text-xs text-muted">' + j.employer + '</span></div>' +
            '<button class="btn btn-primary btn-sm">Apply</button>' +
          '</div>' +
        '</div>';
      }).join('');

      return '<section class="page-section">' +
        '<div class="section-header">' +
          '<h1 class="section-title">Job Marketplace</h1>' +
          '<div class="flex gap-sm"><button class="btn btn-secondary btn-sm" onclick="toggleFilters()">Filters</button><button class="btn btn-primary btn-sm">Post a Job</button></div>' +
        '</div>' +
        '<div class="card mb-lg p-md" id="marketplace-filters" style="display:none;">' +
          '<div class="grid grid-2 gap-md mb-md">' +
            '<div><label class="text-sm text-muted mb-sm block">Category</label><select class="input-field"><option>All Categories</option><option>Mechanic</option><option>Engineer</option><option>Media</option><option>Logistics</option><option>Management</option></select></div>' +
            '<div><label class="text-sm text-muted mb-sm block">Location</label><input class="input-field" placeholder="Any location"></div>' +
            '<div><label class="text-sm text-muted mb-sm block">Rate (€/day)</label><div class="flex gap-sm"><input class="input-field" placeholder="Min" style="width:50%;"><input class="input-field" placeholder="Max" style="width:50%;"></div></div>' +
            '<div><label class="text-sm text-muted mb-sm block">Availability</label><select class="input-field"><option>Any time</option><option>Immediate</option><option>Next week</option><option>Next month</option></select></div>' +
          '</div>' +
          '<div class="flex gap-sm justify-end"><button class="btn btn-secondary btn-sm" onclick="toggleFilters()">Cancel</button><button class="btn btn-primary btn-sm">Apply Filters</button></div>' +
        '</div>' +
        '<div class="flex gap-sm mb-lg" style="flex-wrap: wrap;"><button class="btn btn-primary btn-sm">All</button><button class="btn btn-secondary btn-sm">Mechanic</button><button class="btn btn-secondary btn-sm">Engineer</button><button class="btn btn-secondary btn-sm">Media</button><button class="btn btn-secondary btn-sm">Logistics</button><button class="btn btn-secondary btn-sm">Management</button></div>' +
        '<div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));">' +
          jobCardsHtml +
        '</div>' +
      '</section>';
    }
  },

  'job-detail': {
    title: 'Job Detail',
    render: () => {
      var jobs = Store.get('jobs') || [];
      var params = new URLSearchParams(window.location.hash.split('?')[1] || '');
      var jobId = parseInt(params.get('id'));
      var j = jobs.find(function(x) { return x.id === jobId; }) || jobs[0];
      if (!j) return '<section class="page-section"><div class="card p-lg text-center"><p class="text-muted">Offre non trouvée.</p><button class="btn btn-primary mt-md" onclick="router.navigate(\'/marketplace\')">Retour</button></div></section>';

      var statusTag = j.status === 'Featured' ? 'tag-success' : (j.status === 'Urgent' ? 'tag-warning' : '');
      var tagsHtml = (j.tags || []).map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('');
      var reqsHtml = (j.requirements || ['Proven experience in ' + j.category, 'Available for full event duration', 'Relevant certifications', 'Fluent English']).map(function(r) { return '<li>• ' + r + '</li>'; }).join('');

      return '<section class="page-section">' +
        '<div class="flex items-center gap-2 mb-6">' +
          '<button class="icon-btn" onclick="router.navigate(\'/marketplace\')"><span class="material-symbols-outlined">arrow_back</span></button>' +
          '<h1 class="section-title">Job Details</h1>' +
        '</div>' +
        '<div class="grid grid-2 gap-lg">' +
          '<div>' +
            '<div class="card mb-lg">' +
              '<div class="flex items-start justify-between mb-4">' +
                '<div><h2 class="text-xl font-bold">' + j.title + '</h2><p class="text-sm text-muted">' + j.employer + ' • ' + j.event + '</p></div>' +
                '<span class="tag ' + statusTag + '">' + j.status + '</span>' +
              '</div>' +
              '<div class="flex items-center gap-4 mb-4">' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-primary">location_on</span><span class="text-sm">' + j.location + '</span></span>' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-primary">calendar_today</span><span class="text-sm">' + j.dates + '</span></span>' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-primary">payments</span><span class="text-sm font-bold text-primary">' + j.rate + '</span></span>' +
              '</div>' +
              '<h3 class="font-bold mb-sm">Description</h3>' +
              '<p class="text-sm text-muted mb-md">' + (j.description || j.title + ' position for ' + j.event + ' at ' + j.location + '. ' + j.employer + ' requires an experienced professional for this role.') + '</p>' +
              '<h3 class="font-bold mb-sm">Requirements</h3>' +
              '<ul class="flex flex-col gap-sm text-sm">' + reqsHtml + '</ul>' +
              '<div class="flex gap-xs flex-wrap mt-md">' + tagsHtml + '</div>' +
            '</div>' +
            '<div class="card">' +
              '<h3 class="font-bold mb-md">About the Employer</h3>' +
              '<div class="flex items-center gap-3 mb-3">' +
                '<div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold">' + j.employerInitials + '</div>' +
                '<div><h4 class="font-bold">' + j.employer + '</h4><p class="text-xs text-muted">' + (j.event || 'Motorsport team') + '</p></div>' +
              '</div>' +
              '<div class="flex items-center gap-3 text-sm">' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-primary">star</span><span class="text-muted">4.7 employer rating</span></span>' +
                '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-primary">work</span><span class="text-muted">' + (j.openings + 10) + ' jobs posted</span></span>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="card mb-lg">' +
              '<h3 class="font-bold mb-md">Apply for this Job</h3>' +
              '<div class="flex flex-col gap-md">' +
                '<div><label class="text-sm text-muted mb-sm block">Your rate (€/day)</label><input class="input-field" placeholder="350"></div>' +
                '<div><label class="text-sm text-muted mb-sm block">Cover message</label><textarea class="input-field" style="height:100px; padding:12px 16px; resize:none;" placeholder="Tell the employer why you\'re a great fit..."></textarea></div>' +
                '<div><label class="text-sm text-muted mb-sm block">Availability</label><div class="flex gap-sm"><label class="flex items-center gap-2"><input type="radio" name="availability" checked> <span class="text-sm">Full event</span></label><label class="flex items-center gap-2"><input type="radio" name="availability"> <span class="text-sm">Partial</span></label></div></div>' +
                '<button class="btn btn-primary btn-lg">Submit Application</button>' +
              '</div>' +
            '</div>' +
            '<div class="card">' +
              '<h3 class="font-bold mb-md">Similar Jobs</h3>' +
              '<div class="flex flex-col gap-sm">' +
                jobs.filter(function(x) { return x.id !== j.id; }).slice(0, 3).map(function(s) {
                  return '<div class="p-3 rounded-xl hover:bg-surface-dim transition-colors" style="cursor:pointer;" onclick="router.navigate(\'/job-detail?id=' + s.id + '\')"><p class="font-bold text-sm">' + s.title + '</p><p class="text-xs text-muted">' + s.dates + ' • ' + s.rate + '</p></div>';
                }).join('') +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
    }
  },

  'my-jobs': {
    title: 'My Jobs',
    render: () => {
      var gigs = Store.get('activeGigs') || [];
      var cardsHtml = gigs.map(function(g) {
        var statusClass = g.status === 'Active' ? 'tag-success' : (g.status === 'Upcoming' ? 'tag-warning' : 'tag');
        var borderColor = g.status === 'Active' ? 'var(--success)' : (g.status === 'Upcoming' ? 'var(--warning)' : 'var(--muted)');
        var progressHtml = '';

        if (g.status === 'Active' && g.currentDay && g.totalDays) {
          var pct = Math.round((g.currentDay / g.totalDays) * 100);
          progressHtml = '<div class="flex items-center gap-3 mb-3"><div class="flex-1 bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-success h-2 rounded-full" style="width:' + pct + '%;"></div></div><span class="text-xs font-bold">Day ' + g.currentDay + ' of ' + g.totalDays + '</span></div>';
        } else if (g.status === 'Upcoming') {
          progressHtml = '<div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-sm text-warning">pending</span><span class="text-xs text-muted">Contract pending signature</span></div>';
        } else {
          progressHtml = '<div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-sm text-success">check_circle</span><span class="text-xs text-muted">' + (g.statusNote || 'Completed') + '</span></div>';
        }

        return '<div class="card" style="border-left: 4px solid ' + borderColor + ';">' +
          '<div class="flex items-center justify-between mb-3"><div><h3 class="font-bold">' + g.title + '</h3><p class="text-xs text-muted">' + g.employer + ' • ' + g.event + '</p></div><span class="tag ' + statusClass + '">' + g.status + '</span></div>' +
          '<div class="flex items-center gap-3 mb-3 text-sm">' +
            '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-muted">calendar_today</span> ' + g.dates + '</span>' +
            '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-muted">location_on</span> ' + g.location + '</span>' +
            '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-muted">payments</span> ' + g.rate + '</span>' +
          '</div>' +
          progressHtml +
          '<div class="flex gap-sm justify-end">' +
            (g.status === 'Active' ? '<button class="btn btn-secondary btn-sm">Time Log</button>' : '') +
            (g.status === 'Upcoming' ? '<button class="btn btn-secondary btn-sm">Travel Info</button>' : '') +
            (g.status === 'Completed' ? '<button class="btn btn-secondary btn-sm">Submit Invoice</button>' : '') +
            '<button class="btn btn-primary btn-sm" onclick="router.navigate(\'/gig-detail?id=' + g.id + '\',true)">View Details</button>' +
          '</div>' +
        '</div>';
      }).join('');

      return '<section class="page-section">' +
        '<div class="section-header"><h1 class="section-title">My Jobs</h1><button class="btn btn-primary btn-sm" onclick="router.navigate(\'/marketplace\')">Find Work</button></div>' +
        '<div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">' +
          '<button class="btn btn-primary btn-sm">Active</button>' +
          '<button class="btn btn-secondary btn-sm">Upcoming</button>' +
          '<button class="btn btn-secondary btn-sm">Completed</button>' +
          '<button class="btn btn-secondary btn-sm">All</button>' +
        '</div>' +
        '<div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));">' +
          cardsHtml +
        '</div>' +
      '</section>';
    }
  },

  'gig-detail': {
    title: 'Job Detail',
    render: () => {
      var gigs = Store.get('activeGigs') || [];
      var events = Store.get('events') || [];
      var params = new URLSearchParams(window.location.hash.split('?')[1] || '');
      var gigId = parseInt(params.get('id'));
      var g = gigs.find(function(x) { return x.id === gigId; }) || gigs[0];
      if (!g) return '<section class="page-section"><div class="card p-lg text-center"><p class="text-muted">Aucun job trouvé.</p><button class="btn btn-primary mt-md" onclick="router.navigate(\'/my-jobs\',true)">Retour</button></div></section>';

      var e = events.find(function(x) { return x.title.toLowerCase().indexOf(g.event.toLowerCase().replace(/[^a-z0-9]/g,'')) > -1 || g.event.toLowerCase().indexOf(x.title.toLowerCase().replace(/[^a-z0-9]/g,'')) > -1; });
      var tab = params.get('tab') || 'overview';
      var statusColor = g.status === 'Active' ? 'success' : (g.status === 'Upcoming' ? 'warning' : 'muted');

      var tabs = ['overview','programme','travel','team','documents'];
      var tabLabels = ['Aperçu','Programme','Voyage','Équipe','Documents'];
      function tabBtn(t) {
        return '<button class="tab-btn' + (tab === t ? ' active' : '') + '" onclick="router.navigate(\'/gig-detail?id=' + g.id + '&tab=' + t + '\',true)">' + tabLabels[tabs.indexOf(t)] + '</button>';
      }
      function tag(text, cls) {
        return '<span class="tag' + (cls ? ' tag-' + cls : '') + '">' + text + '</span>';
      }

      var progressHtml = g.status === 'Active'
        ? '<div class="flex items-center gap-3 mb-3"><div class="flex-1 bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-success h-2 rounded-full" style="width:' + g.progress + '%;"></div></div><span class="text-xs font-bold">Day ' + g.currentDay + ' of ' + g.totalDays + '</span></div>'
        : '';

      var tagsHtml = (g.tags || []).map(function(t) { return '<span class="tag">' + t + '</span>'; }).join('');

      var employerInitials = g.employer.split(' ').map(function(w) { return w.charAt(0); }).join('').substring(0, 2);

      // --- Tabs content ---

      var overviewTab = '<div class="grid gap-lg" style="grid-template-columns: 1fr 1fr;">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="flex items-start justify-between mb-4"><div><h2 class="text-xl font-bold">' + g.title + '</h2><p class="text-sm text-muted">' + g.employer + ' • ' + g.event + '</p></div>' + tag(g.status, statusColor) + '</div>' +
            '<div class="flex items-center gap-4 mb-4 flex-wrap">' +
              '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-primary" style="font-size:18px;">location_on</span><span class="text-sm">' + g.location + '</span></span>' +
              '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-primary" style="font-size:18px;">calendar_today</span><span class="text-sm">' + g.dates + '</span></span>' +
              '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-primary" style="font-size:18px;">payments</span><span class="text-sm font-bold text-primary">' + g.rate + '</span></span>' +
            '</div>' +
            progressHtml +
            '<div class="flex gap-xs flex-wrap mb-4">' + tagsHtml + '</div>' +
            '<h3 class="font-bold mb-sm">Description</h3>' +
            '<p class="text-sm text-muted mb-md">' + g.title + ' position for ' + g.event + ' at ' + g.location + '. ' + g.employer + ' requires an experienced professional for this role.</p>' +
            '<h3 class="font-bold mb-sm">Requirements</h3>' +
            '<ul class="flex flex-col gap-sm text-sm">' +
              '<li>• Proven experience in ' + (g.tags || []).slice(0,2).join(' and ') + '</li>' +
              '<li>• Available for full event duration</li>' +
              '<li>• Relevant certifications and licenses</li>' +
              '<li>• Fluent English, additional languages a plus</li>' +
            '</ul>' +
          '</div>' +
          '<div class="card">' +
            '<h3 class="font-bold mb-md">À propos de l\'employeur</h3>' +
            '<div class="flex items-center gap-3 mb-3">' +
              '<div class="w-12 h-12 rounded-xl bg-primary flex items-center justify-center font-bold text-white">' + employerInitials + '</div>' +
              '<div><h4 class="font-bold">' + g.employer + '</h4><p class="text-xs text-muted">' + (e ? e.series : 'Motorsport team') + '</p></div>' +
            '</div>' +
            '<div class="flex items-center gap-3 text-sm">' +
              '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-primary">star</span><span class="text-muted">4.7 rating</span></span>' +
              '<span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-primary">work</span><span class="text-muted">12 jobs posted</span></span>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<h3 class="font-bold mb-md">Détails du poste</h3>' +
            '<div class="flex flex-col gap-3">' +
              '<div class="flex justify-between text-sm"><span class="text-muted">Position</span><span class="font-bold">' + g.title + '</span></div>' +
              '<div class="flex justify-between text-sm"><span class="text-muted">Taux</span><span class="font-bold text-primary">' + g.rate + '</span></div>' +
              '<div class="flex justify-between text-sm"><span class="text-muted">Événement</span><span class="font-bold">' + g.event + '</span></div>' +
              '<div class="flex justify-between text-sm"><span class="text-muted">Dates</span><span class="font-bold">' + g.dates + '</span></div>' +
              '<div class="flex justify-between text-sm"><span class="text-muted">Lieu</span><span class="font-bold">' + g.location + '</span></div>' +
              '<div class="flex justify-between text-sm"><span class="text-muted">Statut</span><span class="font-bold tag tag-' + statusColor + '" style="font-size:inherit;">' + g.status + '</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="card mb-lg">' +
            '<h3 class="font-bold mb-md">Actions rapides</h3>' +
            '<div class="flex flex-col gap-2">' +
              '<button class="btn btn-primary btn-lg">Déclarer heures</button>' +
              '<button class="btn btn-secondary btn-lg">Contacter employeur</button>' +
              '<button class="btn btn-secondary btn-lg" onclick="router.navigate(\'/gig-detail?id=' + g.id + '&tab=programme\',true)">Voir programme</button>' +
              '<button class="btn btn-secondary btn-lg" onclick="router.navigate(\'/gig-detail?id=' + g.id + '&tab=travel\',true)">Voir voyage</button>' +
              '<button class="btn btn-secondary btn-lg">Dépenses</button>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<h3 class="font-bold mb-md">Prochaines étapes</h3>' +
            '<div class="divide-y">' +
              (g.status === 'Completed'
                ? '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-success text-sm">check_circle</span><span class="text-sm">Contrat signé</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-success text-sm">check_circle</span><span class="text-sm">Voyage réservé</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-success text-sm">check_circle</span><span class="text-sm">Mission terminée</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-warning text-sm">hourglass_empty</span><span class="text-sm">Paiement en attente</span></div>'
                : g.status === 'Active'
                ? '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-success text-sm">check_circle</span><span class="text-sm">Contrat signé</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-success text-sm">check_circle</span><span class="text-sm">Voyage réservé</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-warning text-sm">hourglass_empty</span><span class="text-sm">Check-in sur site</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-muted text-sm">radio_button_unchecked</span><span class="text-sm text-muted">Mission terminée</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-muted text-sm">radio_button_unchecked</span><span class="text-sm text-muted">Paiement reçu</span></div>'
                : '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-success text-sm">check_circle</span><span class="text-sm">Contrat signé</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-warning text-sm">hourglass_empty</span><span class="text-sm">Voyage à réserver</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-muted text-sm">radio_button_unchecked</span><span class="text-sm text-muted">Check-in sur site</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-muted text-sm">radio_button_unchecked</span><span class="text-sm text-muted">Mission terminée</span></div><div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-muted text-sm">radio_button_unchecked</span><span class="text-sm text-muted">Paiement reçu</span></div>') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      var programmeTab = '<div class="grid gap-lg" style="grid-template-columns: 1fr 1fr;">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Programme général</span></div>' +
            '<div class="flex flex-col">' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--primary);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-primary">JUN</p><p class="text-lg font-bold text-primary">24</p></div><div class="flex-1"><p class="font-bold text-sm">Arrivée &amp; Installation</p><p class="text-xs text-muted">Paddock setup, check-in technique</p><div class="flex items-center gap-2 mt-1">' + tag('08:00 - 18:00') + tag('Paddock') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--warning);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-warning">JUN</p><p class="text-lg font-bold text-warning">25</p></div><div class="flex-1"><p class="font-bold text-sm">Essais libres &amp; Qualifs</p><p class="text-xs text-muted">Free Practice 1-3, Pre-Qualifying</p><div class="flex items-center gap-2 mt-1">' + tag('09:00 - 17:30') + tag('Circuit') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--error);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-error">JUN</p><p class="text-lg font-bold text-error">26</p></div><div class="flex-1"><p class="font-bold text-sm">Course - Jour 1</p><p class="text-xs text-muted">Warm-up, Départ 16h00, Phases nocturnes</p><div class="flex items-center gap-2 mt-1">' + tag('08:00 - 02:00') + tag('Circuit') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--success);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-success">JUN</p><p class="text-lg font-bold text-success">27</p></div><div class="flex-1"><p class="font-bold text-sm">Course - Jour 2 &amp; Final</p><p class="text-xs text-muted">Suite course, Arrivée 16h00, Podium</p><div class="flex items-center gap-2 mt-1">' + tag('06:00 - 18:00') + tag('Circuit') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--muted);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-muted">JUN</p><p class="text-lg font-bold text-muted">28</p></div><div class="flex-1"><p class="font-bold text-sm">Démontage &amp; Départ</p><p class="text-xs text-muted">Pit breakdown, check-out, travel home</p><div class="flex items-center gap-2 mt-1">' + tag('08:00 - 14:00') + tag('Paddock') + '</div></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Détail du jour &bull; 26 Juin (Course J1)</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-success"></span><span class="text-sm">Briefing équipe</span></div><span class="text-xs text-muted">08:00 - 08:30</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-success"></span><span class="text-sm">Warm-up</span></div><span class="text-xs text-muted">09:00 - 09:30</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-warning"></span><span class="text-sm">Pit stop practice</span></div><span class="text-xs text-muted">10:00 - 11:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Parc fermé</span></div><span class="text-xs text-muted">12:00 - 14:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-error"></span><span class="text-sm">Départ course</span></div><span class="text-xs text-muted">16:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Relais 1-4</span></div><span class="text-xs text-muted">16:00 - 20:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Relais 5-8 (nocturnes)</span></div><span class="text-xs text-muted">20:00 - 00:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Relais 9-10</span></div><span class="text-xs text-muted">00:00 - 02:00</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="card" style="background:var(--primary-bg);border-color:var(--primary);">' +
            '<p class="text-sm font-bold text-primary mb-sm">Rappels importants</p>' +
            '<ul class="text-xs text-muted flex flex-col gap-1">' +
              '<li>&bull; Briefing obligatoire 45min avant chaque session</li>' +
              '<li>&bull; Équipement de sécurité obligatoire dans le paddock</li>' +
              '<li>&bull; Créneaux catering : 12:00-14:00 et 19:00-21:00</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>';

      var travelTab = '<div class="grid gap-lg" style="grid-template-columns: 1fr 1fr;">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Transport</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">flight</span><div class="flex-1"><p class="font-bold text-sm">Brussels Airlines SN2608</p><p class="text-xs text-muted">MIL &rarr; BRU &bull; 24 Jun 07:00 &bull; Réservé</p></div>' + tag('Confirmé','success') + '</div>' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">directions_car</span><div class="flex-1"><p class="font-bold text-sm">Navette aéroport</p><p class="text-xs text-muted">BRU &rarr; Spa &bull; 24 Jun 09:30</p></div>' + tag('Confirmé','success') + '</div>' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">flight</span><div class="flex-1"><p class="font-bold text-sm">Brussels Airlines SN2609</p><p class="text-xs text-muted">BRU &rarr; MIL &bull; 28 Jun 14:00 &bull; Réservé</p></div>' + tag('Confirmé','success') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Hébergement</span></div>' +
            '<div class="flex items-center gap-3 p-3 rounded-lg" style="background:var(--surface-dim);"><span class="material-symbols-outlined text-primary">hotel</span><div class="flex-1"><p class="font-bold text-sm">Hôtel de la Source</p><p class="text-xs text-muted">Chambre partagée &bull; 24-28 Juin &bull; 4 nuits</p></div>' + tag('Confirmé','success') + '</div>' +
            '<div class="flex items-center gap-2 mt-2 text-xs text-muted"><span class="material-symbols-outlined text-sm">location_on</span><span>1.2km du circuit &bull; Rue de la Source, Spa</span></div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Documents de voyage</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">description</span><span class="text-sm flex-1">Itinéraire complet.pdf</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">description</span><span class="text-sm flex-1">Billet avion</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">description</span><span class="text-sm flex-1">Confirmation hôtel</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Coordonnées logistique</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-3"><div class="avatar" style="width:32px;height:32px;font-size:12px;background:rgba(34,197,94,0.1);color:#22c55e;">LW</div><div class="flex-1"><p class="font-bold text-sm">Lena Wagner</p><p class="text-xs text-muted">Logistics Coordinator</p></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      var teamTab = '<div class="grid gap-lg" style="grid-template-columns: 1fr 1fr;">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Équipe &amp; Collègues</span></div>' +
            '<div class="grid grid-2 gap-md">' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;">AK</div><p class="font-bold text-xs">Alex Krause</p><p class="text-xs text-muted" style="font-size:10px;">Lead Mechanic</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(234,88,12,0.1);color:#ea580c;">MB</div><p class="font-bold text-xs">Marco Bellini</p><p class="text-xs text-muted" style="font-size:10px;">Race Engineer</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(147,51,234,0.1);color:#9333ea;">SM</div><p class="font-bold text-xs">Sarah Mitchell</p><p class="text-xs text-muted" style="font-size:10px;">Data Engineer</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(34,197,94,0.1);color:#22c55e;">LW</div><p class="font-bold text-xs">Lena Wagner</p><p class="text-xs text-muted" style="font-size:10px;">Logistics</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(99,102,241,0.1);color:#6366f1;">PT</div><p class="font-bold text-xs">Paul Tan</p><p class="text-xs text-muted" style="font-size:10px;">Media</p></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Planning des shifts</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Pit Crew - Shift A</p><p class="text-xs text-muted">Alex K., Marco B., Paul T.</p></div>' + tag('06:00 - 14:00') + '</div>' +
              '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Pit Crew - Shift B</p><p class="text-xs text-muted">Sarah M., Chen J., David K.</p></div>' + tag('14:00 - 22:00') + '</div>' +
              '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Pit Crew - Shift C</p><p class="text-xs text-muted">Lena W., James D., Fabio R.</p></div>' + tag('22:00 - 06:00') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Contact responsable</span></div>' +
            '<div class="flex items-center gap-3"><div class="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center font-bold">JD</div><div><h4 class="font-bold text-sm">James Donovan</h4><p class="text-xs text-muted">Team Manager</p><div class="flex items-center gap-2 mt-1"><span class="material-symbols-outlined text-sm text-primary">mail</span><span class="text-xs text-muted">j.donovan@scuderia.it</span></div></div></div>' +
          '</div>' +
        '</div>' +
      '</div>';

      var docsTab = '<div>' +
        '<div class="mb-lg flex gap-sm" style="flex-wrap:wrap;">' +
          '<button class="btn btn-primary btn-sm">Tous</button>' +
          '<button class="btn btn-secondary btn-sm">Contrats</button>' +
          '<button class="btn btn-secondary btn-sm">Certifications</button>' +
          '<button class="btn btn-secondary btn-sm">Assurances</button>' +
          '<button class="btn btn-secondary btn-sm">Rapports</button>' +
        '</div>' +
        '<div class="grid gap-lg" style="grid-template-columns: 1fr 1fr;">' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Contrats &amp; Accords</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-success">description</span><span class="text-sm flex-1">Contrat de travail - GT3 Lead Mechanic</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-success">description</span><span class="text-sm flex-1">Accord de confidentialité (NDA)</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-success">description</span><span class="text-sm flex-1">Règlement intérieur paddock</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="card mb-lg">' +
              '<div class="card-header"><span class="card-title">Certifications</span></div>' +
              '<div class="divide-y">' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">verified</span><span class="text-sm flex-1">Certification FIA Mécanicien</span><span class="text-xs text-muted">Exp. 2027</span></div>' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">verified</span><span class="text-sm flex-1">HSE Safety Training</span><span class="text-xs text-muted">Exp. 2026</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="card">' +
              '<div class="card-header"><span class="card-title">Assurances</span></div>' +
              '<div class="divide-y">' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-warning">verified_user</span><span class="text-sm flex-1">Assurance accident travail</span><span class="material-symbols-outlined text-sm text-muted">visibility</span></div>' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-warning">verified_user</span><span class="text-sm flex-1">Responsabilité civile</span><span class="material-symbols-outlined text-sm text-muted">visibility</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      var tabContents = { 'overview': overviewTab, 'programme': programmeTab, 'travel': travelTab, 'team': teamTab, 'documents': docsTab };
      var content = tabContents[tab] || overviewTab;

      return '<section class="page-section">' +
        '<div class="flex items-center gap-2 mb-4">' +
          '<button class="icon-btn" onclick="router.navigate(\'/my-jobs\',true)"><span class="material-symbols-outlined">arrow_back</span></button>' +
          '<div><h1 class="section-title">' + g.title + '</h1><p class="text-sm text-muted">' + g.event + ' • ' + g.employer + '</p></div>' +
        '</div>' +
        '<div class="flex gap-sm mb-lg" style="overflow-x:auto;">' +
          tabs.map(tabBtn).join('') +
        '</div>' +
        content +
      '</section>';
    }
  },

  'profile-edit': {
    title: 'Edit Profile',
    render: () => `
      <section class="page-section">
        <div class="flex items-center gap-2 mb-6">
          <button class="icon-btn" onclick="router.navigate('/profile')"><span class="material-symbols-outlined">arrow_back</span></button>
          <h1 class="section-title">Edit Profile</h1>
        </div>
        <div class="card mb-lg">
          <div class="flex items-center gap-4 mb-6">
            <div class="relative">
              <div class="avatar avatar-lg" style="width:72px; height:72px; font-size:1.5rem;">JD</div>
              <button class="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center" style="font-size:14px; border:2px solid white;">
                <span class="material-symbols-outlined" style="font-size:14px;">edit</span>
              </button>
            </div>
            <div>
              <h2 class="font-bold text-lg">John Doe</h2>
              <p class="text-sm text-muted">GT3 Lead Mechanic</p>
            </div>
          </div>
          <div class="grid grid-2 gap-md">
            <div>
              <label class="text-sm text-muted mb-sm block">Full Name</label>
              <input class="input-field" value="John Doe">
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Professional Title</label>
              <input class="input-field" value="GT3 Lead Mechanic">
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Email</label>
              <input class="input-field" value="john.doe@platypro.com">
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Phone</label>
              <input class="input-field" value="+32 4 76 12 34 56">
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Location</label>
              <input class="input-field" value="Spa, Belgium">
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Languages</label>
              <input class="input-field" value="English, French, Dutch">
            </div>
          </div>
          <div class="mt-md">
            <label class="text-sm text-muted mb-sm block">Bio</label>
            <textarea class="input-field" style="height:80px; padding:12px 16px; resize:none;">Experienced GT3 Lead Mechanic with 8+ years in endurance racing. FIA certified. Passionate about precision engineering and teamwork.</textarea>
          </div>
        </div>
        <div class="card mb-lg">
          <div class="card-header">
            <span class="card-title">Skills & Certifications</span>
            <button class="btn btn-primary btn-sm">+ Add</button>
          </div>
          <div class="flex flex-wrap gap-sm">
            <div class="flex items-center gap-1 tag tag-primary">GT3 Mechanic <span class="material-symbols-outlined" style="font-size:14px; cursor:pointer;">close</span></div>
            <div class="flex items-center gap-1 tag tag-primary">FIA License Level 2 <span class="material-symbols-outlined" style="font-size:14px; cursor:pointer;">close</span></div>
            <div class="flex items-center gap-1 tag tag-primary">Engine Rebuild <span class="material-symbols-outlined" style="font-size:14px; cursor:pointer;">close</span></div>
            <div class="flex items-center gap-1 tag tag-primary">Data Analysis <span class="material-symbols-outlined" style="font-size:14px; cursor:pointer;">close</span></div>
            <div class="flex items-center gap-1 tag tag-primary">Team Leadership <span class="material-symbols-outlined" style="font-size:14px; cursor:pointer;">close</span></div>
            <div class="flex items-center gap-1 tag">+ Add new skill</div>
          </div>
        </div>
        <div class="card mb-lg">
          <div class="card-header">
            <span class="card-title">Work Experience</span>
            <button class="btn btn-primary btn-sm">+ Add</button>
          </div>
          <div class="divide-y">
            <div class="py-3 flex items-start justify-between">
              <div>
                <p class="font-bold text-sm">Lead Mechanic</p>
                <p class="text-xs text-muted">Scuderia Italia Racing • 2022 - Present</p>
                <p class="text-xs text-muted">GT World Challenge, Spa 24H, Le Mans</p>
              </div>
              <button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">edit</span></button>
            </div>
            <div class="py-3 flex items-start justify-between">
              <div>
                <p class="font-bold text-sm">Race Mechanic</p>
                <p class="text-xs text-muted">AF Corse • 2019 - 2022</p>
                <p class="text-xs text-muted">FIA WEC, Ferrari GT3 program</p>
              </div>
              <button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">edit</span></button>
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-sm">
          <button class="btn btn-secondary">Cancel</button>
          <button class="btn btn-primary">Save Profile</button>
        </div>
      </section>
    `
  },

  expenses: {
    title: 'Expenses',
    render: () => {
      var exp = Store.get('expenses') || { reports: [], totals: { month: 0, pending: 0, reimbursed: 0, openReports: 0 } };
      var t = exp.totals;
      var statusMap = { 'Pending': 'tag-warning', 'Approved': 'tag-success', 'Draft': 'tag' };
      var iconMap = { 'Pending': 'visibility', 'Approved': 'visibility', 'Draft': 'edit' };

      var reportsHtml = exp.reports.map(function(r) {
        var items = r.items ? r.items.join(' + ') : '';
        return '<div class="flex items-center gap-3 py-3"><div class="flex-1"><p class="font-bold text-sm">' + r.title + '</p><p class="text-xs text-muted">' + items + ' • €' + r.amount + ' • Submitted ' + r.date + '</p></div><span class="tag ' + (statusMap[r.status] || 'tag') + '">' + r.status + '</span><button class="btn btn-ghost btn-sm"><span class="material-symbols-outlined">' + (iconMap[r.status] || 'visibility') + '</span></button></div>';
      }).join('');

      return '<section class="page-section">' +
        '<div class="section-header"><h1 class="section-title">Expenses</h1><button class="btn btn-primary btn-sm">+ New Expense</button></div>' +
        '<div class="stats-row mb-lg">' +
          '<div class="stat-card"><span class="stat-value">€' + t.month + '</span><span class="stat-label">This Month</span></div>' +
          '<div class="stat-card"><span class="stat-value">€' + t.pending + '</span><span class="stat-label">Pending</span></div>' +
          '<div class="stat-card"><span class="stat-value">€' + t.reimbursed + '</span><span class="stat-label">Reimbursed</span></div>' +
          '<div class="stat-card"><span class="stat-value">' + t.openReports + '</span><span class="stat-label">Open Reports</span></div>' +
        '</div>' +
        '<div class="card mb-lg">' +
          '<div class="card-header"><span class="card-title">Active Expense Reports</span></div>' +
          '<div class="divide-y">' + (reportsHtml || '<p class="text-sm text-muted p-4">No expense reports yet.</p>') + '</div>' +
        '</div>' +
        '<div class="card">' +
          '<div class="card-header"><span class="card-title">Quick Submit Receipt</span></div>' +
          '<div class="flex flex-col items-center gap-3 p-6" style="border:2px dashed var(--outline-light);border-radius:12px;">' +
            '<span class="material-symbols-outlined" style="font-size:2.5rem;color:var(--primary);">upload_file</span>' +
            '<p class="text-sm font-bold">Upload Receipt</p>' +
            '<p class="text-xs text-muted">Drag & drop or click to browse</p>' +
            '<button class="btn btn-primary btn-sm">Select File</button>' +
          '</div>' +
          '<div class="mt-3 flex flex-wrap gap-2">' +
            '<div class="flex items-center gap-2 p-2 rounded-lg" style="background:var(--surface-dim);">' +
              '<span class="material-symbols-outlined text-sm text-success">description</span>' +
              '<span class="text-xs">receipt_2206.pdf</span>' +
              '<span class="material-symbols-outlined text-xs text-muted" style="cursor:pointer;">close</span>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
    }
  },

  help: {
    title: 'Help',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Help & Support</h1>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
          <div class="card text-center">
            <span class="material-symbols-outlined text-primary" style="font-size:2.5rem; margin-bottom:12px;">help</span>
            <h3 class="font-bold">FAQ</h3>
            <p class="text-sm text-muted">Find answers to common questions</p>
          </div>
          <div class="card text-center">
            <span class="material-symbols-outlined text-primary" style="font-size:2.5rem; margin-bottom:12px;">support_agent</span>
            <h3 class="font-bold">Contact Support</h3>
            <p class="text-sm text-muted">Reach out to our team 24/7</p>
          </div>
          <div class="card text-center">
            <span class="material-symbols-outlined text-primary" style="font-size:2.5rem; margin-bottom:12px;">description</span>
            <h3 class="font-bold">Documentation</h3>
            <p class="text-sm text-muted">Guides and platform docs</p>
          </div>
        </div>
      </section>
    `
  },

  profile: {
    title: 'Profile',
    render: () => `
      <section class="page-section">
        <div class="card text-center mb-lg">
          <div class="avatar avatar-lg" style="margin: 0 auto 16px; width: 72px; height: 72px; font-size:1.5rem;">JD</div>
          <h2 class="font-bold text-lg">John Doe</h2>
          <p class="text-sm text-muted">GT3 Lead Mechanic • Spa, Belgium</p>
          <div class="flex justify-center gap-md mt-md">
            <div class="stat text-center">
              <span class="stat-value">4.8</span>
              <span class="stat-label">Rating</span>
            </div>
            <div class="stat text-center">
              <span class="stat-value">12</span>
              <span class="stat-label">Jobs Done</span>
            </div>
            <div class="stat text-center">
              <span class="stat-value">3</span>
              <span class="stat-label">Active</span>
            </div>
          </div>
        </div>
        <div class="card">
          <h3 class="font-bold mb-md">Skills & Certifications</h3>
          <div class="flex gap-sm flex-wrap">
            <span class="tag">GT3 Mechanic</span>
            <span class="tag">FIA License</span>
            <span class="tag">Engine Rebuild</span>
            <span class="tag">Data Analysis</span>
            <span class="tag">Team Leadership</span>
          </div>
        </div>
      </section>
    `
  },

  'e-dashboard': {
    title: 'Tableau de bord',
    render: function() {
      var es = Store.get('enterprise');
      var events = Store.get('events');
      var applicants = es.recentApplicants;
      var stats = es.stats;

      function eventCard(e) {
        var statusClass = e.status === 'Actif' ? 'tag-success' : e.status === 'Planification' ? 'tag-warning' : '';
        var recruited = e.recruited || 0;
        var needed = e.totalNeeded || 0;
        return '<div class="event-card" onclick="router.navigate(\'/e-event-detail\')"><div class="event-card-header"><h3 class="event-card-title">' + e.title + '</h3><span class="tag ' + statusClass + '">' + e.status + '</span></div><p class="text-sm text-muted">' + (e.circuit || e.location) + ' • ' + e.startDate + '</p><div class="event-card-meta"><span>🏁 ' + (e.series || '') + '</span><span>👥 ' + recruited + '/' + needed + ' recrutés</span></div><div class="event-card-footer"><span class="font-bold text-primary">€' + (e.budget || 0).toLocaleString() + ' budget</span><span class="text-sm text-muted">—</span></div></div>';
      }

      function applicantCard(a) {
        var borderColor = a.statusColor === 'success' ? 'var(--primary)' : 'var(--warning)';
        var tagCls = 'tag-' + a.statusColor;
        return '<div class="card flex items-center gap-md" style="cursor:pointer;border-left:3px solid ' + borderColor + ';"><div class="avatar">' + a.initials + '</div><div style="flex:1;min-width:0;"><div class="flex justify-between"><span class="font-bold text-sm">' + a.name + '</span><span class="tag ' + tagCls + ' btn-sm">' + a.status + '</span></div><p class="text-sm text-muted">Postule pour ' + a.role + ' • ' + a.event + '</p></div></div>';
      }

      return '<section class="page-section"><div class="section-header"><h1 class="section-title">Tableau de bord</h1><button class="btn btn-primary btn-sm" onclick="router.navigate(\'/e-event-create\')">Créer un événement</button></div><div class="stats-row"><div class="stat-card"><div class="stat-icon" style="background:rgba(36,162,167,0.1);color:var(--primary);"><span class="material-symbols-outlined">event</span></div><span class="stat-value">' + stats.events + '</span><span class="stat-label">Événements actifs</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(99,102,241,0.1);color:#6366f1;"><span class="material-symbols-outlined">groups</span></div><span class="stat-value">' + stats.teamMembers + '</span><span class="stat-label">Membres d\'équipe</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(245,158,11,0.1);color:var(--warning);"><span class="material-symbols-outlined">pending_actions</span></div><span class="stat-value">' + stats.pendingApps + '</span><span class="stat-label">Candidatures en attente</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(22,163,74,0.1);color:var(--success);"><span class="material-symbols-outlined">payments</span></div><span class="stat-value">€' + (stats.totalBudget / 1000).toFixed(0) + 'k</span><span class="stat-label">Budget total</span></div></div></section><section class="page-section"><div class="section-header"><h2 class="section-title">Événements à venir</h2><a href="#/e-events" class="text-sm text-primary" data-nav>Voir tout</a></div><div class="grid gap-md" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr));">' + events.map(eventCard).join('') + '</div></section><section class="page-section"><div class="section-header"><h2 class="section-title">Candidatures récentes</h2></div><div class="grid gap-sm">' + applicants.map(applicantCard).join('') + '</div></section>';
    }
  },

  'e-events': {
    title: 'Mes événements',
    render: () => {
      var events = Store.get('events') || [];
      var statusMap = { 'Actif': 'tag-success', 'Planification': 'tag-warning', 'Brouillon': 'tag' };
      var colorMap = { 'Actif': 'success', 'Planification': 'warning', 'Brouillon': 'muted' };

      var cardsHtml = events.map(function(e) {
        var recruited = e.recruited || 0;
        var needed = e.totalNeeded || 0;
        return '<div class="event-card">' +
          '<div class="event-card-header"><div><h3 class="event-card-title">' + e.title + '</h3><p class="text-sm text-muted">' + e.circuit + '</p></div><span class="tag ' + (statusMap[e.status] || 'tag') + '">' + e.status + '</span></div>' +
          '<div class="event-card-meta">' +
            '<span>📅 ' + e.startDate + (e.endDate ? ' → ' + e.endDate : '') + '</span>' +
            '<span>👥 ' + recruited + '/' + needed + ' recrutés</span>' +
            '<span>💰 €' + (e.budget / 1000) + 'k</span>' +
          '</div>' +
          '<div class="event-card-footer">' +
            '<button class="btn btn-primary btn-sm" onclick="router.navigate(\'/e-event-detail\')">Gérer</button>' +
            '<button class="btn btn-ghost btn-sm">Dupliquer</button>' +
          '</div>' +
        '</div>';
      }).join('');

      return '<section class="page-section">' +
        '<div class="section-header"><h1 class="section-title">Mes événements</h1><button class="btn btn-primary btn-sm" onclick="router.navigate(\'/e-event-create\')">+ Nouvel événement</button></div>' +
        '<div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">' +
          '<button class="btn btn-primary btn-sm">Tous</button>' +
          '<button class="btn btn-secondary btn-sm">Actifs</button>' +
          '<button class="btn btn-secondary btn-sm">Planification</button>' +
          '<button class="btn btn-secondary btn-sm">Terminés</button>' +
          '<button class="btn btn-secondary btn-sm">Brouillons</button>' +
        '</div>' +
        '<div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">' + cardsHtml + '</div>' +
      '</section>';
    }
  },

  'e-event-create': {
    title: 'Créer un événement',
    afterRender: function() {
      window._initEventWizard && window._initEventWizard();
    },
    render: function() {
      var draft = Store.get('eventDraft') || { step: 1, data: {} };
      var step = draft.step;
      var d = draft.data;

      function stepCircle(num, label) {
        var active = step >= num;
        var current = step === num;
        var circleCls = 'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ' + (current ? 'bg-primary text-white' : active ? 'bg-primary/20 text-primary' : 'bg-surface-dim text-muted');
        var textCls = 'text-sm ' + (current ? 'font-bold text-primary' : active ? 'text-primary' : 'text-muted');
        var lineCls = 'w-12 h-0.5 ' + (active ? 'bg-primary' : 'bg-outline/30');
        return '<div class="flex items-center gap-2"><div class="' + circleCls + '">' + num + '</div><span class="' + textCls + '">' + label + '</span></div><div class="' + lineCls + ' mx-1"></div>';
      }

      function field(name, label, type, placeholder, value) {
        var val = value || '';
        if (type === 'textarea') {
          return '<div class="flex flex-col gap-md"><div><label class="text-sm text-muted mb-sm block">' + label + '</label><textarea class="input-field event-wiz" data-field="' + name + '" style="height:80px;padding:12px 16px;resize:none;" placeholder="' + placeholder + '">' + val + '</textarea></div></div>';
        }
        if (type === 'select') {
          var opts = placeholder.split('|');
          var html = '<label class="text-sm text-muted mb-sm block">' + label + '</label><select class="input-field event-wiz" data-field="' + name + '">';
          for (var i = 0; i < opts.length; i++) {
            html += '<option' + (opts[i] === val ? ' selected' : '') + '>' + opts[i] + '</option>';
          }
          html += '</select>';
          return '<div>' + html + '</div>';
        }
        return '<div><label class="text-sm text-muted mb-sm block">' + label + '</label><input class="input-field event-wiz" data-field="' + name + '" type="' + (type || 'text') + '" placeholder="' + placeholder + '" value="' + val + '"></div>';
      }

      var stepsHtml = '<div class="flex items-center gap-0 mb-8" style="overflow-x:auto;">';
      var steps = ['Infos', 'Offres', 'Voyage', 'Publication'];
      for (var i = 0; i < steps.length; i++) {
        stepsHtml += stepCircle(i + 1, steps[i]);
      }
      stepsHtml = stepsHtml.replace(/<div class="w-12 h-0\.5 (bg-outline\/30|bg-primary) mx-1"><\/div>\s*$/, '') + '</div>';

      var stepContent = '';
      var stepTitle = '';

      if (step === 1) {
        stepTitle = 'Informations générales';
        stepContent = '<div class="grid grid-2 gap-lg"><div class="card"><h3 class="font-bold mb-md">' + stepTitle + '</h3><div class="flex flex-col gap-md">' +
          field('name', "Nom de l'événement", 'text', 'Ex: Spa 24 Hours 2026', d.name) +
          '<div class="grid grid-2 gap-md">' + field('startDate', 'Date début', 'date', '', d.startDate) + field('endDate', 'Date fin', 'date', '', d.endDate) + '</div>' +
          field('location', 'Lieu', 'text', 'Circuit, ville, pays', d.location) +
          '<div class="grid grid-2 gap-md">' + field('type', "Type d'épreuve", 'select', 'Endurance 24H|Sprint|Test day|Track day|Corporate', d.type || 'Endurance 24H') + field('budget', 'Budget total (€)', 'number', '45000', d.budget) + '</div>' +
          field('description', 'Description', 'textarea', "Décrivez l'événement, les besoins spécifiques...", d.description) +
          '</div></div><div><div class="card mb-md"><h3 class="font-bold mb-md">Résumé</h3><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted">Budget</span><span class="font-bold">€' + (d.budget || '—') + '</span></div><div class="flex justify-between"><span class="text-muted">Dates</span><span class="font-bold">' + (d.startDate || '—') + (d.endDate ? ' → ' + d.endDate : '') + '</span></div><div class="flex justify-between"><span class="text-muted">Lieu</span><span class="font-bold">' + (d.location || '—') + '</span></div><div class="flex justify-between"><span class="text-muted">Statut</span><span class="tag">Brouillon</span></div></div></div><div class="card" style="background:var(--primary-bg);border-color:var(--primary);"><p class="text-sm font-bold text-primary mb-sm">💡 Conseil</p><p class="text-xs text-muted">Définissez d\'abord votre budget pour obtenir des recommandations de personnel optimisées par l\'IA.</p></div></div></div>';
      } else if (step === 2) {
        stepTitle = 'Offres d\'emploi';
        stepContent = '<div class="card"><h3 class="font-bold mb-md">' + stepTitle + '</h3><p class="text-sm text-muted mb-md">Ajoutez les postes à pourvoir pour cet événement.</p><div id="wizard-jobs-list"><div class="divide-y" id="wizard-jobs-container">';
        var jobs = d.jobs || [];
        if (jobs.length === 0) {
          stepContent += '<div class="text-center py-6 text-muted text-sm">Aucun poste ajouté pour le moment</div>';
        } else {
          for (var ji = 0; ji < jobs.length; ji++) {
            var j = jobs[ji];
            stepContent += '<div class="flex items-center justify-between py-3"><div><p class="font-bold text-sm">' + j.title + '</p><p class="text-xs text-muted">' + j.count + ' poste(s) • €' + j.rate + '/jour</p></div><button class="btn btn-ghost btn-sm" onclick="window._removeWizardJob(' + ji + ')"><span class="material-symbols-outlined text-error">remove_circle</span></button></div>';
          }
        }
        stepContent += '</div><div class="grid grid-2 gap-md mt-md p-md" style="border:1px dashed var(--outline);border-radius:12px;"><div><label class="text-sm text-muted mb-sm block">Intitulé du poste</label><input class="input-field" id="wiz-job-title" placeholder="Ex: GT3 Lead Mechanic"></div><div class="grid grid-2 gap-sm"><div><label class="text-sm text-muted mb-sm block">Nombre</label><input class="input-field" id="wiz-job-count" type="number" value="1" min="1"></div><div><label class="text-sm text-muted mb-sm block">Taux (€/jour)</label><input class="input-field" id="wiz-job-rate" placeholder="350"></div></div><div><button class="btn btn-primary btn-sm" onclick="window._addWizardJob()">+ Ajouter ce poste</button></div></div></div></div>';
      } else if (step === 3) {
        stepTitle = 'Voyage & Logistique';
        stepContent = '<div class="grid grid-2 gap-lg"><div class="card"><h3 class="font-bold mb-md">' + stepTitle + '</h3><div class="flex flex-col gap-md">' +
          field('travelFlight', 'Vol / Transport', 'text', 'Ex: Brussels Airlines SN2608', d.travel ? d.travel.flight : '') +
          field('travelHotel', 'Hébergement', 'text', "Ex: Hôtel de la Source", d.travel ? d.travel.hotel : '') +
          field('travelNights', 'Nombre de nuits', 'number', '4', d.travel ? d.travel.nights : '') +
          field('travelTransfer', 'Transfert', 'text', 'Ex: Navette aéroport', d.travel ? d.travel.transfer : '') +
          '</div></div><div><div class="card mb-md"><h3 class="font-bold mb-md">Équipement</h3><div class="flex flex-col gap-md">' +
          field('equipment', 'Équipement nécessaire', 'textarea', 'Outils, pièces, matériel spécifique...', d.equipment || '') +
          '</div></div><div class="card" style="background:var(--primary-bg);border-color:var(--primary);"><p class="text-sm font-bold text-primary mb-sm">✈️ Platy Travel</p><p class="text-xs text-muted">Activez la gestion de voyage Platy pour réserver vols, hôtels et transfers directement depuis la plateforme.</p></div></div></div>';
      } else if (step === 4) {
        var jobCount = (d.jobs || []).reduce(function(a, b) { return a + (parseInt(b.count) || 0); }, 0);
        var totalBudget = parseInt(d.budget) || 0;
        stepTitle = 'Publication';
        stepContent = '<div class="grid grid-2 gap-lg"><div class="card"><h3 class="font-bold mb-md">' + stepTitle + '</h3><div class="flex flex-col gap-md">' +
          '<div class="flex items-center justify-between p-3 rounded-lg bg-surface-dim"><div><p class="font-bold text-sm">Visibilité</p><p class="text-xs text-muted">Qui peut voir cet événement ?</p></div><select class="input-field event-wiz" data-field="visibility" style="width:160px;"><option selected>Public</option><option>Privé</option><option>Interne</option></select></div>' +
          '<div class="flex items-center justify-between p-3 rounded-lg bg-surface-dim"><div><p class="font-bold text-sm">Auto-match IA</p><p class="text-xs text-muted">Recommandations automatiques de talents</p></div><label class="switch"><input type="checkbox" class="event-wiz" data-field="aiMatch" checked><span class="slider"></span></label></div>' +
          '<div class="flex items-center justify-between p-3 rounded-lg bg-surface-dim"><div><p class="font-bold text-sm">Date limite candidature</p></div><input class="input-field event-wiz" data-field="deadline" type="date" style="width:160px;"></div>' +
          '</div></div><div><div class="card mb-md"><h3 class="font-bold mb-md">Récapitulatif</h3><div class="space-y-3 text-sm"><div class="flex justify-between"><span class="text-muted">Événement</span><span class="font-bold">' + (d.name || '—') + '</span></div><div class="flex justify-between"><span class="text-muted">Postes</span><span class="font-bold">' + jobCount + '</span></div><div class="flex justify-between"><span class="text-muted">Budget</span><span class="font-bold">€' + totalBudget.toLocaleString() + '</span></div><div class="flex justify-between"><span class="text-muted">Visibilité</span><span class="tag tag-success">Public</span></div></div></div><button class="btn btn-primary btn-lg w-full" onclick="window._publishEvent()"><span class="material-symbols-outlined">publish</span> Publier l\'événement</button></div></div>';
      }

      return '<section class="page-section"><div class="flex items-center gap-2 mb-6"><button class="icon-btn" onclick="router.navigate(\'/e-dashboard\')"><span class="material-symbols-outlined">arrow_back</span></button><h1 class="section-title">Créer un événement</h1></div>' + stepsHtml + stepContent + '<div class="flex justify-between mt-lg"><button class="btn btn-secondary" onclick="window._saveWizardDraft()">Sauvegarder brouillon</button><div class="flex gap-sm"><button class="btn btn-secondary" onclick="router.navigate(\'/e-dashboard\')">Annuler</button>' + (step > 1 ? '<button class="btn btn-secondary" onclick="window._wizardPrevStep()">Précédent</button>' : '') + (step < 4 ? '<button class="btn btn-primary" onclick="window._wizardNextStep()">Suivant' + (step === 1 ? ' : Offres' : step === 2 ? ' : Voyage' : '') + '</button>' : '') + '</div></div></section>';
    }
  },

  'e-event-detail': {
    title: 'Détail événement',
    render: function() {
      const tab = new URLSearchParams(window.location.hash.split('?')[1] || '').get('tab') || 'overview';
      const tabs = ['overview','schedule','team','budget','travel','documents'];
      const tabLabels = ['Overview','Programme','Équipe','Budget','Voyage','Documents'];
      const tabIcons = ['dashboard','schedule','groups','payments','flight','description'];

      function tabBtn(t) {
        return '<button class="tab-btn' + (tab === t ? ' active' : '') + '" onclick="router.navigate(\'/e-event-detail?tab=' + t + '\')">' + tabLabels[tabs.indexOf(t)] + '</button>';
      }
      function tag(text, cls) {
        return '<span class="tag' + (cls ? ' tag-' + cls : '') + '">' + text + '</span>';
      }
      function avatar(initials, bg) {
        return '<div class="avatar" style="width:32px;height:32px;font-size:12px;' + (bg ? 'background:' + bg + ';' : '') + '">' + initials + '</div>';
      }

      var overviewTab = '<div class="grid grid-2 gap-lg">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Postes à pourvoir</span><button class="btn btn-primary btn-sm" onclick="router.navigate(\'/e-post-job\')">+ Ajouter</button></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center justify-between py-3"><div><p class="font-bold text-sm">GT3 Lead Mechanic</p><p class="text-xs text-muted">2 postes &bull; &euro;350/jour</p></div>' + tag('Pourvu','success') + '</div>' +
              '<div class="flex items-center justify-between py-3"><div><p class="font-bold text-sm">Data Engineer</p><p class="text-xs text-muted">1 poste &bull; &euro;400/jour</p></div>' + tag('En cours','warning') + '</div>' +
              '<div class="flex items-center justify-between py-3"><div><p class="font-bold text-sm">Race Photographer</p><p class="text-xs text-muted">1 poste &bull; &euro;280/jour</p></div>' + tag('Ouvert','') + '</div>' +
              '<div class="flex items-center justify-between py-3"><div><p class="font-bold text-sm">Tire Technician</p><p class="text-xs text-muted">2 postes &bull; &euro;200/jour</p></div>' + tag('Ouvert','') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Équipe confirmée</span></div>' +
            '<div class="flex flex-wrap gap-2">' +
              '<div class="flex items-center gap-2 p-2 rounded-lg bg-surface-dim">' + avatar('AK') + '<span class="text-xs font-bold">Alex K.</span></div>' +
              '<div class="flex items-center gap-2 p-2 rounded-lg bg-surface-dim">' + avatar('MB','rgba(234,88,12,0.1)') + '<span class="text-xs font-bold" style="color:#ea580c;">Marco B.</span></div>' +
              '<div class="flex items-center gap-2 p-2 rounded-lg bg-surface-dim">' + avatar('LW','rgba(34,197,94,0.1)') + '<span class="text-xs font-bold" style="color:#22c55e;">Lena W.</span></div>' +
              '<div class="flex items-center gap-2 p-2 rounded-lg bg-surface-dim">' + avatar('PT','rgba(99,102,241,0.1)') + '<span class="text-xs font-bold" style="color:#6366f1;">Paul T.</span></div>' +
              '<div class="flex items-center gap-2 p-2 rounded-lg bg-surface-dim">' + avatar('CJ','rgba(245,158,11,0.1)') + '<span class="text-xs font-bold" style="color:#f59e0b;">Chen J.</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Candidats récents</span><a href="#/e-applicants" class="text-sm text-primary" data-nav>Voir tout</a></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-3"><div class="avatar">AK</div><div class="flex-1"><p class="font-bold text-sm">Alex Krause</p><p class="text-xs text-muted">GT3 Lead Mechanic &bull; 2j</p></div><button class="btn btn-primary btn-sm">OK</button></div>' +
              '<div class="flex items-center gap-3 py-3"><div class="avatar" style="background:rgba(147,51,234,0.1);color:#9333ea;">SM</div><div class="flex-1"><p class="font-bold text-sm">Sarah Mitchell</p><p class="text-xs text-muted">Data Engineer &bull; 3j</p></div><button class="btn btn-secondary btn-sm">Voir</button></div>' +
              '<div class="flex items-center gap-3 py-3"><div class="avatar" style="background:rgba(245,158,11,0.1);color:#f59e0b;">RJ</div><div class="flex-1"><p class="font-bold text-sm">Romain Jacquard</p><p class="text-xs text-muted">Tire Technician &bull; 5j</p></div><button class="btn btn-secondary btn-sm">Voir</button></div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Prochaine &eacute;tape</span></div>' +
            '<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center"><span class="material-symbols-outlined">assignment_turned_in</span></div><div class="flex-1"><p class="font-bold text-sm">Finaliser l\'&eacute;quipe</p><p class="text-xs text-muted">3 postes encore ouverts &bull; J-12 avant l\'&eacute;v&eacute;nement</p></div></div>' +
            '<div class="mt-3 bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-primary h-2 rounded-full" style="width:80%;"></div></div>' +
            '<p class="text-xs text-muted mt-1">80% des pr&eacute;paratifs compl&eacute;t&eacute;s</p>' +
          '</div>' +
        '</div>' +
      '</div>';

      var scheduleTab = '<div class="grid grid-2 gap-lg">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Programme g&eacute;n&eacute;ral</span><button class="btn btn-secondary btn-sm">Modifier</button></div>' +
            '<div class="flex flex-col">' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--primary);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-primary">JUN</p><p class="text-lg font-bold text-primary">24</p></div><div class="flex-1"><p class="font-bold text-sm">Arriv&eacute;e &amp; Installation</p><p class="text-xs text-muted">Paddock setup, check-in technique</p><div class="flex items-center gap-2 mt-1">' + tag('08:00 - 18:00') + tag('Paddock') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--warning);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-warning">JUN</p><p class="text-lg font-bold text-warning">25</p></div><div class="flex-1"><p class="font-bold text-sm">Essais libres &amp; Qualifs</p><p class="text-xs text-muted">Free Practice 1-3, Pre-Qualifying</p><div class="flex items-center gap-2 mt-1">' + tag('09:00 - 17:30') + tag('Circuit') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--error);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-error">JUN</p><p class="text-lg font-bold text-error">26</p></div><div class="flex-1"><p class="font-bold text-sm">Course - Jour 1</p><p class="text-xs text-muted">Warm-up, D&eacute;part 16h00, Phases nocturnes</p><div class="flex items-center gap-2 mt-1">' + tag('08:00 - 02:00') + tag('Circuit') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--success);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-success">JUN</p><p class="text-lg font-bold text-success">27</p></div><div class="flex-1"><p class="font-bold text-sm">Course - Jour 2 &amp; Final</p><p class="text-xs text-muted">Suite course, Arriv&eacute;e 16h00, Podium</p><div class="flex items-center gap-2 mt-1">' + tag('06:00 - 18:00') + tag('Circuit') + '</div></div></div>' +
              '<div class="flex gap-3 py-3" style="border-left:3px solid var(--muted);padding-left:12px;"><div class="text-center"><p class="text-xs font-bold text-muted">JUN</p><p class="text-lg font-bold text-muted">28</p></div><div class="flex-1"><p class="font-bold text-sm">D&eacute;montage &amp; D&eacute;part</p><p class="text-xs text-muted">Pit breakdown, check-out, travel home</p><div class="flex items-center gap-2 mt-1">' + tag('08:00 - 14:00') + tag('Paddock') + '</div></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">D&eacute;tail du jour &bull; 26 Juin (Course J1)</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-success"></span><span class="text-sm">Briefing &eacute;quipe</span></div><span class="text-xs text-muted">08:00 - 08:30</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-success"></span><span class="text-sm">Warm-up</span></div><span class="text-xs text-muted">09:00 - 09:30</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-warning"></span><span class="text-sm">Pit stop practice</span></div><span class="text-xs text-muted">10:00 - 11:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Parc ferm&eacute;</span></div><span class="text-xs text-muted">12:00 - 14:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-error"></span><span class="text-sm">D&eacute;part course</span></div><span class="text-xs text-muted">16:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Relais 1-4</span></div><span class="text-xs text-muted">16:00 - 20:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Relais 5-8 (nocturnes)</span></div><span class="text-xs text-muted">20:00 - 00:00</span></div>' +
              '<div class="flex items-center justify-between py-2"><div class="flex items-center gap-2"><span class="w-2 h-2 rounded-full"></span><span class="text-sm">Relais 9-10</span></div><span class="text-xs text-muted">00:00 - 02:00</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="card" style="background:var(--primary-bg);border-color:var(--primary);">' +
            '<p class="text-sm font-bold text-primary mb-sm">Rappels importants</p>' +
            '<ul class="text-xs text-muted flex flex-col gap-1">' +
              '<li>&bull; Briefing obligatoire 45min avant chaque session</li>' +
              '<li>&bull; &Eacute;quipement de s&eacute;curit&eacute; obligatoire dans le paddock</li>' +
              '<li>&bull; Cr&eacute;neaux catering : 12:00-14:00 et 19:00-21:00</li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>';

      var teamTab = '<div>' +
        '<div class="card mb-lg">' +
          '<div class="card-header"><span class="card-title">Organigramme &eacute;quipe</span><button class="btn btn-secondary btn-sm">Modifier</button></div>' +
          '<div class="grid grid-2 gap-md">' +
            '<div class="p-4 rounded-xl text-center" style="border:2px solid var(--primary);background:var(--primary-bg);"><div class="avatar avatar-lg" style="width:56px;height:56px;margin:0 auto 8px;background:var(--primary);color:white;font-size:1.2rem;">JD</div><p class="font-bold text-sm">James Donovan</p><p class="text-xs text-muted">Team Manager</p>' + tag('Confirm&eacute;','success') + '</div>' +
            '<div class="grid grid-2 gap-md">' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;">AK</div><p class="font-bold text-xs">Alex Krause</p><p class="text-xs text-muted" style="font-size:10px;">Lead Mechanic</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(234,88,12,0.1);color:#ea580c;">MB</div><p class="font-bold text-xs">Marco Bellini</p><p class="text-xs text-muted" style="font-size:10px;">Race Engineer</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(147,51,234,0.1);color:#9333ea;">SM</div><p class="font-bold text-xs">Sarah Mitchell</p><p class="text-xs text-muted" style="font-size:10px;">Data Engineer</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(34,197,94,0.1);color:#22c55e;">LW</div><p class="font-bold text-xs">Lena Wagner</p><p class="text-xs text-muted" style="font-size:10px;">Logistics</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(99,102,241,0.1);color:#6366f1;">PT</div><p class="font-bold text-xs">Paul Tan</p><p class="text-xs text-muted" style="font-size:10px;">Media</p></div>' +
              '<div class="p-3 rounded-xl text-center bg-surface-dim"><div class="avatar" style="width:40px;height:40px;margin:0 auto 6px;background:rgba(245,158,11,0.1);color:#f59e0b;">CJ</div><p class="font-bold text-xs">Chen Jiao</p><p class="text-xs text-muted" style="font-size:10px;">Catering</p></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card">' +
          '<div class="card-header"><span class="card-title">Shift Planning</span></div>' +
          '<div class="divide-y">' +
            '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Pit Crew - Shift A</p><p class="text-xs text-muted">Alex K., Marco B., Paul T.</p></div>' + tag('06:00 - 14:00') + '</div>' +
            '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Pit Crew - Shift B</p><p class="text-xs text-muted">Sarah M., Chen J., David K.</p></div>' + tag('14:00 - 22:00') + '</div>' +
            '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Pit Crew - Shift C</p><p class="text-xs text-muted">Lena W., James D., Fabio R.</p></div>' + tag('22:00 - 06:00') + '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      var budgetTab = '<div class="grid grid-2 gap-lg">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Budget Overview</span></div>' +
            '<div class="flex flex-col gap-3">' +
              '<div><div class="flex justify-between text-sm mb-1"><span class="font-bold">Salaires</span><span class="text-muted">&euro;28,400 / &euro;32,000</span></div><div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-primary h-2 rounded-full" style="width:89%;"></div></div></div>' +
              '<div><div class="flex justify-between text-sm mb-1"><span class="font-bold">Voyage &amp; Transport</span><span class="text-muted">&euro;8,200 / &euro;10,000</span></div><div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-warning h-2 rounded-full" style="width:82%;"></div></div></div>' +
              '<div><div class="flex justify-between text-sm mb-1"><span class="font-bold">H&eacute;bergement</span><span class="text-muted">&euro;4,200 / &euro;4,000</span></div><div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-error h-2 rounded-full" style="width:105%;"></div></div></div>' +
              '<div><div class="flex justify-between text-sm mb-1"><span class="font-bold">&Eacute;quipement &amp; Pi&egrave;ces</span><span class="text-muted">&euro;3,400 / &euro;5,000</span></div><div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-success h-2 rounded-full" style="width:68%;"></div></div></div>' +
              '<div><div class="flex justify-between text-sm mb-1"><span class="font-bold">Catering &amp; Divers</span><span class="text-muted">&euro;1,800 / &euro;2,000</span></div><div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-success h-2 rounded-full" style="width:90%;"></div></div></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Transactions r&eacute;centes</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">AK - Lead Mechanic</p><p class="text-xs text-muted">Salaire J1-J4</p></div><span class="font-bold text-sm">&euro;1,400</span></div>' +
              '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Vols Brussels Airlines</p><p class="text-xs text-muted">6 billets aller-retour</p></div><span class="font-bold text-sm">&euro;3,600</span></div>' +
              '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">H&ocirc;tel de la Source</p><p class="text-xs text-muted">5 chambres x 4 nuits</p></div><span class="font-bold text-sm">&euro;4,200</span></div>' +
              '<div class="flex items-center justify-between py-2"><div><p class="font-bold text-sm">Pneus Michelin</p><p class="text-xs text-muted">Set qualif + 2 sets course</p></div><span class="font-bold text-sm">&euro;2,400</span></div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Totaux</span></div>' +
            '<div class="flex justify-between text-sm mb-1"><span class="text-muted">Budget total</span><span class="font-bold">&euro;45,000</span></div>' +
            '<div class="flex justify-between text-sm mb-1"><span class="text-muted">D&eacute;pens&eacute;</span><span class="font-bold">&euro;32,000</span></div>' +
            '<div class="flex justify-between text-sm"><span class="text-muted">Restant</span><span class="font-bold text-success">&euro;13,000</span></div>' +
            '<button class="btn btn-primary btn-sm mt-3 w-full">Voir rapport complet</button>' +
          '</div>' +
        '</div>' +
      '</div>';

      var travelTab = '<div class="grid grid-2 gap-lg">' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">Transport</span><button class="btn btn-secondary btn-sm">Modifier</button></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">flight</span><div class="flex-1"><p class="font-bold text-sm">Brussels Airlines SN2608</p><p class="text-xs text-muted">MIL &rarr; BRU &bull; 24 Jun 07:00 &bull; 6 pers</p></div>' + tag('Confirm&eacute;','success') + '</div>' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">directions_car</span><div class="flex-1"><p class="font-bold text-sm">Navette a&eacute;roport</p><p class="text-xs text-muted">BRU &rarr; Spa &bull; 24 Jun 09:30 &bull; 12 pers</p></div>' + tag('Confirm&eacute;','success') + '</div>' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">flight</span><div class="flex-1"><p class="font-bold text-sm">Brussels Airlines SN2609</p><p class="text-xs text-muted">BRU &rarr; MIL &bull; 28 Jun 14:00 &bull; 6 pers</p></div>' + tag('En attente','warning') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">H&eacute;bergement</span><button class="btn btn-secondary btn-sm">Modifier</button></div>' +
            '<div class="flex items-center gap-3 p-3 rounded-lg" style="background:var(--surface-dim);"><span class="material-symbols-outlined text-primary">hotel</span><div class="flex-1"><p class="font-bold text-sm">H&ocirc;tel de la Source</p><p class="text-xs text-muted">5 chambres &bull; 24-28 Juin &bull; 4 nuits</p></div>' + tag('Confirm&eacute;','success') + '</div>' +
            '<div class="flex items-center gap-2 mt-2 text-xs text-muted"><span class="material-symbols-outlined text-sm">location_on</span><span>1.2km du circuit &bull; Rue de la Source, Spa</span></div>' +
          '</div>' +
        '</div>' +
        '<div>' +
          '<div class="card mb-lg">' +
            '<div class="card-header"><span class="card-title">&Eacute;quipage logistique</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-3">' + avatar('LW') + '<div class="flex-1"><p class="font-bold text-sm">Lena Wagner</p><p class="text-xs text-muted">Logistics Coordinator</p></div>' + tag('Confirm&eacute;','success') + '</div>' +
              '<div class="flex items-center gap-3 py-3">' + avatar('FK','rgba(99,102,241,0.1)') + '<div class="flex-1"><p class="font-bold text-sm">Fabio Rossi</p><p class="text-xs text-muted">Transport Manager</p></div>' + tag('Confirm&eacute;','success') + '</div>' +
            '</div>' +
          '</div>' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Documents de voyage</span></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">description</span><span class="text-sm flex-1">Itin&eacute;raire complet.pdf</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">description</span><span class="text-sm flex-1">Billets avion (x6)</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
              '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-primary">description</span><span class="text-sm flex-1">Confirmation h&ocirc;tel</span><span class="material-symbols-outlined text-sm text-muted">download</span></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      var docsTab = '<div>' +
        '<div class="mb-lg flex gap-sm" style="flex-wrap:wrap;">' +
          '<button class="btn btn-primary btn-sm">Tous</button>' +
          '<button class="btn btn-secondary btn-sm">Contrats</button>' +
          '<button class="btn btn-secondary btn-sm">Certifications</button>' +
          '<button class="btn btn-secondary btn-sm">Assurances</button>' +
          '<button class="btn btn-secondary btn-sm">Rapports</button>' +
        '</div>' +
        '<div class="grid grid-2 gap-lg">' +
          '<div class="card">' +
            '<div class="card-header"><span class="card-title">Contrats &amp; Accords</span><button class="btn btn-primary btn-sm">+ Upload</button></div>' +
            '<div class="divide-y">' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">contract</span><div class="flex-1"><p class="font-bold text-sm">Contrat - Alex Krause</p><p class="text-xs text-muted">Sign&eacute; le 15 Mai 2026</p></div>' + tag('Sign&eacute;','success') + '</div>' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">contract</span><div class="flex-1"><p class="font-bold text-sm">Contrat - Marco Bellini</p><p class="text-xs text-muted">Sign&eacute; le 10 Mai 2026</p></div>' + tag('Sign&eacute;','success') + '</div>' +
              '<div class="flex items-center gap-3 py-3"><span class="material-symbols-outlined text-primary">contract</span><div class="flex-1"><p class="font-bold text-sm">Contrat - Sarah Mitchell</p><p class="text-xs text-muted">En attente de signature</p></div>' + tag('En attente','warning') + '</div>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="card mb-lg">' +
              '<div class="card-header"><span class="card-title">Certifications &amp; Licences</span></div>' +
              '<div class="divide-y">' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-success">verified</span><span class="text-sm flex-1">FIA Mechanic License - Alex K.</span><span class="text-xs text-success">Valide</span></div>' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-success">verified</span><span class="text-sm flex-1">FIA Engineer License - Marco B.</span><span class="text-xs text-success">Valide</span></div>' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-warning">warning</span><span class="text-sm flex-1">Medical Certificate - Lena W.</span><span class="text-xs text-warning">Expire 30 Juin</span></div>' +
              '</div>' +
            '</div>' +
            '<div class="card">' +
              '<div class="card-header"><span class="card-title">Assurances</span></div>' +
              '<div class="divide-y">' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-success">shield</span><span class="text-sm flex-1">Responsabilit&eacute; civile circuit</span><span class="text-xs text-success">Active</span></div>' +
                '<div class="flex items-center gap-3 py-2"><span class="material-symbols-outlined text-sm text-success">shield</span><span class="text-sm flex-1">Assurance accident travail</span><span class="text-xs text-success">Active</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

      var tabContent = overviewTab;
      if (tab === 'schedule') tabContent = scheduleTab;
      else if (tab === 'team') tabContent = teamTab;
      else if (tab === 'budget') tabContent = budgetTab;
      else if (tab === 'travel') tabContent = travelTab;
      else if (tab === 'documents') tabContent = docsTab;

      return '<section class="page-section">' +
        '<div class="flex items-center gap-2 mb-4" style="flex-wrap:wrap;">' +
          '<button class="icon-btn" onclick="router.navigate(\'/e-dashboard\')"><span class="material-symbols-outlined">arrow_back</span></button>' +
          '<div><h1 class="section-title">Spa 24 Hours</h1><p class="text-sm text-muted">Circuit de Spa-Francorchamps &bull; 26-29 Juin 2026</p></div>' +
          '<div class="ml-auto flex gap-sm"><button class="btn btn-secondary btn-sm">Modifier</button><button class="btn btn-primary btn-sm">Publier</button></div>' +
        '</div>' +
        '<div class="stats-row mb-lg">' +
          '<div class="stat-card"><span class="stat-value">12/15</span><span class="stat-label">Postes pourvus</span></div>' +
          '<div class="stat-card"><span class="stat-value">8</span><span class="stat-label">Candidatures</span></div>' +
          '<div class="stat-card"><span class="stat-value">&euro;32k</span><span class="stat-label">D&eacute;pens&eacute;</span></div>' +
          '<div class="stat-card"><span class="stat-value">&euro;13k</span><span class="stat-label">Restant</span></div>' +
        '</div>' +
        '<div class="flex gap-0 mb-lg" style="border-bottom:2px solid var(--outline-light);overflow-x:auto;">' +
          tabBtn('overview') + tabBtn('schedule') + tabBtn('team') + tabBtn('budget') + tabBtn('travel') + tabBtn('documents') +
        '</div>' +
        tabContent +
      '</section>';
    }
  },

  'e-job-offers': {
    title: 'Offres d\'emploi',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Offres d'emploi</h1>
          <button class="btn btn-primary btn-sm">+ Nouvelle offre</button>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-card-title">GT3 Lead Mechanic</h3>
                <p class="text-sm text-muted">Spa 24H</p>
              </div>
              <span class="tag tag-success">Publiée</span>
            </div>
            <div class="job-card-meta"><span>👥 2 postes</span><span>💰 €350/jour</span><span>📅 26-29 Juin</span></div>
            <div class="job-card-footer">
              <span class="text-sm text-muted">6 candidatures</span>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm">Modifier</button>
                <button class="btn btn-primary btn-sm">Candidats</button>
              </div>
            </div>
          </div>
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-card-title">Data Engineer</h3>
                <p class="text-sm text-muted">Spa 24H</p>
              </div>
              <span class="tag tag-success">Publiée</span>
            </div>
            <div class="job-card-meta"><span>👥 1 poste</span><span>💰 €400/jour</span><span>📅 26-29 Juin</span></div>
            <div class="job-card-footer">
              <span class="text-sm text-muted">3 candidatures</span>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm">Modifier</button>
                <button class="btn btn-primary btn-sm">Candidats</button>
              </div>
            </div>
          </div>
          <div class="job-card">
            <div class="job-card-header">
              <div>
                <h3 class="job-card-title">Race Photographer</h3>
                <p class="text-sm text-muted">Spa 24H</p>
              </div>
              <span class="tag">Brouillon</span>
            </div>
            <div class="job-card-meta"><span>👥 1 poste</span><span>💰 €280/jour</span><span>📅 26-29 Juin</span></div>
            <div class="job-card-footer">
              <span class="text-sm text-muted">Pas encore publiée</span>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm">Modifier</button>
                <button class="btn btn-primary btn-sm">Publier</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-team': {
    title: 'Mon équipe',
    render: () => {
      const allMembers = Store.get('team');
      const fulltime = allMembers.filter(function(m) { return m.type === 'fulltime'; });
      const freelancers = allMembers.filter(function(m) { return m.type === 'freelance'; });

      function teamCardHtml(m) {
        var statusIcon = m.status === 'Available' || m.status === 'Active' || m.status === 'Confirmé'
          ? 'check_circle'
          : 'hourglass_empty';
        var statusColor = (m.status === 'Available' || m.status === 'Active' || m.status === 'Confirmé')
          ? 'text-success'
          : 'text-warning';
        var tagClass = (m.status === 'Available' || m.status === 'Active' || m.status === 'Confirmé')
          ? 'tag-success'
          : 'tag-warning';
        var statusLabel = m.status === 'Available' ? 'Confirmé' : (m.status === 'On Assignment' ? 'En mission' : m.status);
        var bgStyle = m.initialsBg ? 'background:' + m.initialsBg + '; color:' + (m.initialsColor || 'inherit') + ';' : '';
        var eventsHtml = (m.events || []).map(function(e) { return '<span class="tag">' + e + '</span>'; }).join('');

        return '<div class="card">' +
          '<div class="flex items-center gap-3 mb-3">' +
            '<div class="avatar avatar-lg" style="width:48px; height:48px; font-size:1rem;' + bgStyle + '">' + m.initials + '</div>' +
            '<div>' +
              '<h3 class="font-bold text-sm">' + m.name + '</h3>' +
              '<p class="text-xs text-muted">' + m.role + '</p>' +
            '</div>' +
            '<span class="ml-auto material-symbols-outlined ' + statusColor + '">' + statusIcon + '</span>' +
          '</div>' +
          '<div class="flex gap-xs flex-wrap">' + eventsHtml + '</div>' +
          '<div class="flex justify-between items-center mt-3 pt-3" style="border-top: 1px solid var(--outline-light);">' +
            '<span class="text-xs text-muted">' + m.rate + '</span>' +
            '<span class="tag ' + tagClass + '">' + statusLabel + '</span>' +
          '</div>' +
        '</div>';
      }

      var fulltimeHtml = fulltime.map(teamCardHtml).join('');
      var freelanceHtml = freelancers.map(teamCardHtml).join('');

      return '<section class="page-section">' +
        '<div class="section-header">' +
          '<h1 class="section-title">Mon équipe</h1>' +
          '<button class="btn btn-primary btn-sm">+ Inviter</button>' +
        '</div>' +
        '<div class="card mb-lg p-md" style="background:var(--primary-bg);">' +
          '<div class="flex items-center gap-2">' +
            '<span class="material-symbols-outlined text-primary">info</span>' +
            '<span class="text-sm">' + allMembers.length + ' membres · ' + fulltime.length + ' temps plein · ' + freelancers.length + ' freelances</span>' +
          '</div>' +
        '</div>' +
        '<h2 class="font-bold mb-md flex items-center gap-2">' +
          '<span class="material-symbols-outlined text-primary">badge</span> Employés à temps plein <span class="tag tag-primary">' + fulltime.length + '</span>' +
        '</h2>' +
        '<div class="grid gap-md mb-xl" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">' +
          fulltimeHtml +
        '</div>' +
        '<h2 class="font-bold mb-md flex items-center gap-2">' +
          '<span class="material-symbols-outlined text-primary">person_search</span> Freelances <span class="tag tag-primary">' + freelancers.length + '</span>' +
        '</h2>' +
        '<div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">' +
          freelanceHtml +
        '</div>' +
      '</section>';
    }
  },

  'e-applicants': {
    title: 'Candidatures',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Candidatures</h1>
          <button class="btn btn-secondary btn-sm">Filtrer</button>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">Toutes</button>
          <button class="btn btn-secondary btn-sm">En attente</button>
          <button class="btn btn-secondary btn-sm">Approuvées</button>
          <button class="btn btn-secondary btn-sm">Refusées</button>
        </div>
        <div class="grid gap-sm">
          <div class="card flex items-center gap-md" style="border-left: 3px solid var(--primary);">
            <div class="avatar">AK</div>
            <div style="flex:1;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">Alex Krause</span>
                <span class="text-xs text-muted">Il y a 2 jours</span>
              </div>
              <p class="text-sm text-muted">GT3 Lead Mechanic • Spa 24H</p>
              <div class="flex items-center gap-2 mt-1"><span class="tag">Exp : 8 ans</span><span class="tag">Dispo : Immédiate</span></div>
              <div class="flex gap-sm mt-2">
                <button class="btn btn-primary btn-sm">Approuver</button>
                <button class="btn btn-secondary btn-sm">Contacter</button>
                <button class="btn btn-ghost btn-sm" style="color: var(--error);">Refuser</button>
              </div>
            </div>
          </div>
          <div class="card flex items-center gap-md">
            <div class="avatar" style="background: rgba(147,51,234,0.1); color: #9333ea;">SM</div>
            <div style="flex:1;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">Sarah Mitchell</span>
                <span class="text-xs text-muted">Il y a 3 jours</span>
              </div>
              <p class="text-sm text-muted">Data Engineer • Spa 24H</p>
              <div class="flex items-center gap-2 mt-1"><span class="tag">Exp : 5 ans</span><span class="tag">Dispo : 26 Juin</span></div>
              <div class="flex gap-sm mt-2">
                <button class="btn btn-primary btn-sm">Approuver</button>
                <button class="btn btn-secondary btn-sm">Contacter</button>
                <button class="btn btn-ghost btn-sm" style="color: var(--error);">Refuser</button>
              </div>
            </div>
          </div>
          <div class="card flex items-center gap-md">
            <div class="avatar" style="background: rgba(234,88,12,0.1); color: #ea580c;">MB</div>
            <div style="flex:1;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">Marco Bellini</span>
                <span class="text-xs text-muted">Il y a 5 jours</span>
              </div>
              <p class="text-sm text-muted">Race Engineer • Monaco GP</p>
              <div class="flex items-center gap-2 mt-1"><span class="tag">Exp : 12 ans</span><span class="tag">Dispo : 3 Juillet</span></div>
              <div class="flex gap-sm mt-2">
                <button class="btn btn-primary btn-sm">Approuver</button>
                <button class="btn btn-secondary btn-sm">Contacter</button>
                <button class="btn btn-ghost btn-sm" style="color: var(--error);">Refuser</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-talent': {
    title: 'Réseau de talents',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Réseau de talents</h1>
          <button class="btn btn-primary btn-sm">+ Inviter</button>
        </div>
        <div class="card mb-lg p-md">
          <div class="grid grid-2 gap-md">
            <div>
              <label class="text-sm text-muted mb-sm block">Search</label>
              <input class="input-field" placeholder="Search by name, skill, role...">
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Category</label>
              <select class="input-field">
                <option>All Roles</option>
                <option>Mechanic</option>
                <option>Engineer</option>
                <option>Media</option>
                <option>Logistics</option>
                <option>Management</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Availability</label>
              <select class="input-field">
                <option>Any</option>
                <option>Available Now</option>
                <option>Available This Month</option>
                <option>Available Next Month</option>
              </select>
            </div>
            <div>
              <label class="text-sm text-muted mb-sm block">Rating</label>
              <select class="input-field">
                <option>Any Rating</option>
                <option>4.5+</option>
                <option>4.0+</option>
                <option>3.5+</option>
              </select>
            </div>
          </div>
          <div class="flex gap-sm justify-end mt-md">
            <button class="btn btn-secondary btn-sm">Reset</button>
            <button class="btn btn-primary btn-sm">Search</button>
          </div>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">All</button>
          <button class="btn btn-secondary btn-sm">Available Now</button>
          <button class="btn btn-secondary btn-sm">Favorites</button>
          <button class="btn btn-secondary btn-sm">Recently Viewed</button>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));">
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <div class="avatar avatar-lg" style="width:48px; height:48px;">AK</div>
              <div class="flex-1">
                <h3 class="font-bold text-sm">Alex Krause</h3>
                <p class="text-xs text-muted">GT3 Lead Mechanic</p>
              </div>
              <span class="material-symbols-outlined text-muted" style="cursor:pointer;">favorite_border</span>
            </div>
            <div class="flex items-center gap-2 text-xs mb-2">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-warning">star</span> 4.8</span>
              <span class="text-muted">•</span>
              <span class="text-muted">12 jobs</span>
              <span class="text-muted">•</span>
              <span class="tag tag-success">Available</span>
            </div>
            <div class="flex flex-wrap gap-xs mb-3">
              <span class="tag">FIA License</span>
              <span class="tag">GT3</span>
              <span class="tag">8 yrs exp</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-bold text-primary">€350/day</span>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm">Profile</button>
                <button class="btn btn-primary btn-sm">Invite</button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <div class="avatar avatar-lg" style="width:48px; height:48px; background:rgba(147,51,234,0.1); color:#9333ea;">SM</div>
              <div class="flex-1">
                <h3 class="font-bold text-sm">Sarah Mitchell</h3>
                <p class="text-xs text-muted">Data Engineer</p>
              </div>
              <span class="material-symbols-outlined text-muted" style="cursor:pointer;">favorite_border</span>
            </div>
            <div class="flex items-center gap-2 text-xs mb-2">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-warning">star</span> 4.9</span>
              <span class="text-muted">•</span>
              <span class="text-muted">8 jobs</span>
              <span class="text-muted">•</span>
              <span class="tag tag-warning">On Assignment</span>
            </div>
            <div class="flex flex-wrap gap-xs mb-3">
              <span class="tag">WEC</span>
              <span class="tag">Data Analysis</span>
              <span class="tag">5 yrs exp</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-bold text-primary">€400/day</span>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm">Profile</button>
                <button class="btn btn-primary btn-sm">Invite</button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <div class="avatar avatar-lg" style="width:48px; height:48px; background:rgba(234,88,12,0.1); color:#ea580c;">MB</div>
              <div class="flex-1">
                <h3 class="font-bold text-sm">Marco Bellini</h3>
                <p class="text-xs text-muted">Race Engineer</p>
              </div>
              <span class="material-symbols-outlined text-primary" style="cursor:pointer;">favorite</span>
            </div>
            <div class="flex items-center gap-2 text-xs mb-2">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-warning">star</span> 4.7</span>
              <span class="text-muted">•</span>
              <span class="text-muted">15 jobs</span>
              <span class="text-muted">•</span>
              <span class="tag tag-success">Available</span>
            </div>
            <div class="flex flex-wrap gap-xs mb-3">
              <span class="tag">FIA Engineer</span>
              <span class="tag">GT3/GT4</span>
              <span class="tag">12 yrs exp</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-bold text-primary">€500/day</span>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm">Profile</button>
                <button class="btn btn-primary btn-sm">Invite</button>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <div class="avatar avatar-lg" style="width:48px; height:48px; background:rgba(34,197,94,0.1); color:#22c55e;">LW</div>
              <div class="flex-1">
                <h3 class="font-bold text-sm">Lena Wagner</h3>
                <p class="text-xs text-muted">Logistics Coordinator</p>
              </div>
              <span class="material-symbols-outlined text-muted" style="cursor:pointer;">favorite_border</span>
            </div>
            <div class="flex items-center gap-2 text-xs mb-2">
              <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm text-warning">star</span> 4.6</span>
              <span class="text-muted">•</span>
              <span class="text-muted">20 jobs</span>
              <span class="text-muted">•</span>
              <span class="tag tag-success">Available</span>
            </div>
            <div class="flex flex-wrap gap-xs mb-3">
              <span class="tag">Logistics</span>
              <span class="tag">Multi-event</span>
              <span class="tag">6 yrs exp</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-sm font-bold text-primary">€300/day</span>
              <div class="flex gap-sm">
                <button class="btn btn-secondary btn-sm">Profile</button>
                <button class="btn btn-primary btn-sm">Invite</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-staffing': {
    title: 'Staffing & Équipe',
    render: () => {
      var allMembers = Store.get('team');
      var ft = allMembers.filter(function(m) { return m.type === 'fulltime'; });
      var fl = allMembers.filter(function(m) { return m.type === 'freelance'; });

      function memberRowHtml(m) {
        var bgStyle = m.initialsBg ? 'background:' + m.initialsBg + '; color:' + (m.initialsColor || 'inherit') + ';' : '';
        var statusTag = m.status === 'Available' || m.status === 'Active'
          ? '<span class="tag tag-success">Confirmed</span>'
          : '<span class="tag tag-warning">Pending</span>';
        return '<div class="flex items-center gap-3 py-2">' +
          '<div class="avatar" style="width:32px; height:32px; font-size:12px;' + bgStyle + '">' + m.initials + '</div>' +
          '<div class="flex-1">' +
            '<p class="font-bold text-sm">' + m.name + '</p>' +
            '<p class="text-xs text-muted">' + m.role + ' • ' + m.rate + '</p>' +
          '</div>' +
          statusTag +
        '</div>';
      }

      var ftHtml = ft.map(memberRowHtml).join('');
      var flHtml = fl.map(memberRowHtml).join('');

      return '<section class="page-section">' +
        '<div class="section-header">' +
          '<h1 class="section-title">Team Builder</h1>' +
          '<button class="btn btn-primary btn-sm" onclick="router.navigate(\'/e-talent\')">+ Add Member</button>' +
        '</div>' +
        '<div class="flex items-center gap-4 mb-6">' +
          '<button class="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold">' +
            '<span class="material-symbols-outlined">event</span>' +
            'Spa 24 Hours 2026' +
          '</button>' +
          '<span class="text-sm text-muted">' + allMembers.length + '/' + (allMembers.length + 3) + ' positions filled</span>' +
        '</div>' +
        '<div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">' +
          '<button class="btn btn-primary btn-sm">Tous</button>' +
          '<button class="btn btn-secondary btn-sm">Temps plein</button>' +
          '<button class="btn btn-secondary btn-sm">Freelances</button>' +
        '</div>' +
        '<div class="grid gap-lg" style="grid-template-columns: 1fr 1fr;">' +
          '<div>' +
            '<div class="card mb-md">' +
              '<div class="card-header">' +
                '<span class="card-title flex items-center gap-2"><span class="material-symbols-outlined text-primary">badge</span> Employés temps plein</span>' +
                '<span class="tag tag-primary">' + ft.length + '</span>' +
              '</div>' +
              '<div class="divide-y">' + ftHtml + '</div>' +
            '</div>' +
            '<div class="card">' +
              '<div class="card-header">' +
                '<span class="card-title flex items-center gap-2"><span class="material-symbols-outlined text-primary">person_search</span> Freelances</span>' +
                '<span class="tag tag-primary">' + fl.length + '</span>' +
              '</div>' +
              '<div class="divide-y">' + flHtml + '</div>' +
            '</div>' +
          '</div>' +
          '<div>' +
            '<div class="card mb-md">' +
              '<div class="card-header">' +
                '<span class="card-title">Open Positions</span>' +
                '<span class="tag tag-warning">3 remaining</span>' +
              '</div>' +
              '<div class="divide-y">' +
                '<div class="flex items-center justify-between py-2">' +
                  '<div>' +
                    '<p class="font-bold text-sm">Tire Technician</p>' +
                    '<p class="text-xs text-muted">€200-250/day • 2 needed</p>' +
                  '</div>' +
                  '<button class="btn btn-primary btn-sm">Find</button>' +
                '</div>' +
                '<div class="flex items-center justify-between py-2">' +
                  '<div>' +
                    '<p class="font-bold text-sm">Data Engineer</p>' +
                    '<p class="text-xs text-muted">€400/day • 1 needed</p>' +
                  '</div>' +
                  '<button class="btn btn-primary btn-sm">Find</button>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="card">' +
              '<div class="card-header"><span class="card-title">Budget Summary</span></div>' +
              '<div class="flex flex-col gap-2">' +
                '<div class="flex justify-between text-sm"><span class="text-muted">Total Budget</span><span class="font-bold">€45,000</span></div>' +
                '<div class="flex justify-between text-sm"><span class="text-muted">Salaries</span><span class="font-bold">€28,400</span></div>' +
                '<div class="flex justify-between text-sm"><span class="text-muted">Travel</span><span class="font-bold">€12,400</span></div>' +
                '<div class="flex justify-between text-sm"><span class="text-muted">Remaining</span><span class="font-bold text-success">€4,200</span></div>' +
              '</div>' +
              '<div class="mt-3 bg-surface-dim rounded-full h-2 overflow-hidden">' +
                '<div class="bg-primary h-2 rounded-full" style="width:91%;"></div>' +
              '</div>' +
              '<p class="text-xs text-muted mt-1">91% allocated</p>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</section>';
    }
  },

  'e-approvals': {
    title: 'Approbations',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Centre d'approbation</h1>
          <button class="btn btn-secondary btn-sm">Filtrer</button>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">Toutes</button>
          <button class="btn btn-secondary btn-sm">En attente</button>
          <button class="btn btn-secondary btn-sm">Approuvées</button>
          <button class="btn btn-secondary btn-sm">Refusées</button>
        </div>
        <div class="grid gap-lg" style="grid-template-columns: 1fr 1fr;">
          <div>
            <h3 class="font-bold mb-md">Candidatures en attente</h3>
            <div class="flex flex-col gap-sm">
              <div class="card" style="border-left: 3px solid var(--warning);">
                <div class="flex items-center gap-3 mb-2">
                  <div class="avatar">AK</div>
                  <div class="flex-1">
                    <p class="font-bold text-sm">Alex Krause</p>
                    <p class="text-xs text-muted">GT3 Lead Mechanic • Spa 24H</p>
                  </div>
                  <span class="tag tag-warning">Pending</span>
                </div>
                <div class="flex items-center gap-2 text-xs mb-2">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">star</span> 4.8</span>
                  <span>•</span>
                  <span>8 yrs exp</span>
                  <span>•</span>
                  <span>€350/day</span>
                </div>
                <div class="flex gap-sm">
                  <button class="btn btn-primary btn-sm">✓ Approve</button>
                  <button class="btn btn-secondary btn-sm">Contact</button>
                  <button class="btn btn-ghost btn-sm" style="color: var(--error);">✕ Decline</button>
                </div>
              </div>
              <div class="card" style="border-left: 3px solid var(--warning);">
                <div class="flex items-center gap-3 mb-2">
                  <div class="avatar" style="background:rgba(147,51,234,0.1); color:#9333ea;">SM</div>
                  <div class="flex-1">
                    <p class="font-bold text-sm">Sarah Mitchell</p>
                    <p class="text-xs text-muted">Data Engineer • Spa 24H</p>
                  </div>
                  <span class="tag tag-warning">Pending</span>
                </div>
                <div class="flex items-center gap-2 text-xs mb-2">
                  <span class="flex items-center gap-1"><span class="material-symbols-outlined text-sm">star</span> 4.9</span>
                  <span>•</span>
                  <span>5 yrs exp</span>
                  <span>•</span>
                  <span>€400/day</span>
                </div>
                <div class="flex gap-sm">
                  <button class="btn btn-primary btn-sm">✓ Approve</button>
                  <button class="btn btn-secondary btn-sm">Contact</button>
                  <button class="btn btn-ghost btn-sm" style="color: var(--error);">✕ Decline</button>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 class="font-bold mb-md">Activité récente</h3>
            <div class="card">
              <div class="divide-y">
                <div class="flex items-center gap-3 py-2">
                  <span class="w-2 h-2 rounded-full bg-success"></span>
                  <span class="text-sm flex-1">Alex Krause approuvé pour GT3 Lead Mechanic</span>
                  <span class="text-xs text-muted">2h ago</span>
                </div>
                <div class="flex items-center gap-3 py-2">
                  <span class="w-2 h-2 rounded-full bg-error"></span>
                  <span class="text-sm flex-1">Marco Rossi refusé pour Race Photographer</span>
                  <span class="text-xs text-muted">5h ago</span>
                </div>
                <div class="flex items-center gap-3 py-2">
                  <span class="w-2 h-2 rounded-full bg-success"></span>
                  <span class="text-sm flex-1">Lena Wagner confirmée pour Logistics</span>
                  <span class="text-xs text-muted">1d ago</span>
                </div>
                <div class="flex items-center gap-3 py-2">
                  <span class="w-2 h-2 rounded-full bg-warning"></span>
                  <span class="text-sm flex-1">Sarah Mitchell a postulé pour Data Engineer</span>
                  <span class="text-xs text-muted">3d ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-finance-command': {
    title: 'Command Center Finance',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Financial Command Center</h1>
          <div class="flex gap-sm">
            <button class="btn btn-secondary btn-sm">YTD</button>
            <button class="btn btn-primary btn-sm">Full Export</button>
          </div>
        </div>
        <div class="grid gap-md mb-lg" style="grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));">
          <div class="card" style="border-left: 4px solid var(--primary);">
            <p class="text-xs text-muted mb-sm">Total Budget</p>
            <p class="text-2xl font-bold">€89,000</p>
            <div class="flex items-center gap-1 text-xs text-success mt-1">
              <span class="material-symbols-outlined text-sm">trending_up</span> +12% vs last year
            </div>
          </div>
          <div class="card" style="border-left: 4px solid var(--success);">
            <p class="text-xs text-muted mb-sm">Revenue</p>
            <p class="text-2xl font-bold">€52,000</p>
            <p class="text-xs text-muted">From 2 active events</p>
          </div>
          <div class="card" style="border-left: 4px solid var(--warning);">
            <p class="text-xs text-muted mb-sm">Expenses</p>
            <p class="text-2xl font-bold">€44,200</p>
            <p class="text-xs text-success">Under budget by €4,800</p>
          </div>
          <div class="card" style="border-left: 4px solid #6366f1;">
            <p class="text-xs text-muted mb-sm">Pending Invoices</p>
            <p class="text-2xl font-bold">€12,400</p>
            <p class="text-xs text-muted">3 unpaid invoices</p>
          </div>
        </div>
        <div class="card mb-lg">
          <div class="card-header"><span class="card-title">Budget vs Actual - Spa 24H</span></div>
          <div class="flex flex-col gap-3">
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="font-bold">Salaries</span><span class="text-muted">€28,400 / €32,000</span></div>
              <div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-primary h-2 rounded-full" style="width:89%;"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="font-bold">Travel</span><span class="text-muted">€12,400 / €14,000</span></div>
              <div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-warning h-2 rounded-full" style="width:89%;"></div></div>
            </div>
            <div>
              <div class="flex justify-between text-sm mb-1"><span class="font-bold">Equipment</span><span class="text-muted">€3,400 / €5,000</span></div>
              <div class="bg-surface-dim rounded-full h-2 overflow-hidden"><div class="bg-success h-2 rounded-full" style="width:68%;"></div></div>
            </div>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Cost Forecasting</span></div>
          <div class="grid grid-2 gap-md text-sm">
            <div>
              <p class="text-muted mb-sm">Projected Total</p>
              <p class="font-bold text-lg">€47,200</p>
            </div>
            <div>
              <p class="text-muted mb-sm">Remaining</p>
              <p class="font-bold text-lg text-success">€2,800</p>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-post-job': {
    title: 'Publier une offre',
    render: () => `
      <section class="page-section">
        <div class="flex items-center gap-2 mb-6">
          <button class="icon-btn" onclick="router.navigate('/e-job-offers')"><span class="material-symbols-outlined">arrow_back</span></button>
          <h1 class="section-title">Post a New Job</h1>
        </div>
        <div class="grid grid-2 gap-lg">
          <div class="card">
            <h3 class="font-bold mb-md">Job Details</h3>
            <div class="flex flex-col gap-md">
              <div>
                <label class="text-sm text-muted mb-sm block">Job Title</label>
                <input class="input-field" placeholder="e.g. GT3 Lead Mechanic">
              </div>
              <div>
                <label class="text-sm text-muted mb-sm block">Event</label>
                <select class="input-field">
                  <option>Spa 24 Hours 2026</option>
                  <option>Monaco Grand Prix 2026</option>
                  <option>Nürburgring 24H 2026</option>
                </select>
              </div>
              <div class="grid grid-2 gap-md">
                <div>
                  <label class="text-sm text-muted mb-sm block">Positions</label>
                  <input class="input-field" type="number" value="1" min="1">
                </div>
                <div>
                  <label class="text-sm text-muted mb-sm block">Rate (€/day)</label>
                  <input class="input-field" placeholder="350">
                </div>
              </div>
              <div>
                <label class="text-sm text-muted mb-sm block">Category</label>
                <select class="input-field">
                  <option>Mechanic</option>
                  <option>Engineer</option>
                  <option>Media</option>
                  <option>Logistics</option>
                  <option>Management</option>
                </select>
              </div>
              <div>
                <label class="text-sm text-muted mb-sm block">Requirements</label>
                <textarea class="input-field" style="height:80px; padding:12px 16px; resize:none;" placeholder="List the key requirements..."></textarea>
              </div>
              <div>
                <label class="text-sm text-muted mb-sm block">Description</label>
                <textarea class="input-field" style="height:100px; padding:12px 16px; resize:none;" placeholder="Describe the role in detail..."></textarea>
              </div>
            </div>
          </div>
          <div>
            <div class="card mb-md">
              <h3 class="font-bold mb-md">Visibility & Settings</h3>
              <div class="flex flex-col gap-md">
                <div>
                  <label class="text-sm text-muted mb-sm block">Visibility</label>
                  <select class="input-field">
                    <option>Public - All freelancers</option>
                    <option>Private - Invite only</option>
                    <option>Internal - Team only</option>
                  </select>
                </div>
                <div>
                  <label class="text-sm text-muted mb-sm block">Auto-match AI</label>
                  <div class="flex items-center gap-2">
                    <span class="text-sm">Enable AI candidate matching</span>
                    <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
                  </div>
                </div>
                <div>
                  <label class="text-sm text-muted mb-sm block">Application deadline</label>
                  <input class="input-field" type="date">
                </div>
              </div>
            </div>
            <div class="card">
              <h3 class="font-bold mb-md">Summary</h3>
              <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-muted">Position</span><span class="font-bold">GT3 Lead Mechanic</span></div>
                <div class="flex justify-between"><span class="text-muted">Event</span><span class="font-bold">Spa 24H</span></div>
                <div class="flex justify-between"><span class="text-muted">Rate</span><span class="font-bold">€350/day</span></div>
                <div class="flex justify-between"><span class="text-muted">Duration</span><span class="font-bold">4 days</span></div>
                <div class="flex justify-between"><span class="text-muted">Total cost</span><span class="font-bold">€1,400</span></div>
              </div>
            </div>
            <div class="flex gap-sm mt-lg">
              <button class="btn btn-secondary flex-1">Save Draft</button>
              <button class="btn btn-primary flex-1">Publish Now</button>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'notifications': {
    title: 'Notifications',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Notifications</h1>
          <button class="btn btn-ghost btn-sm">Mark all read</button>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">All</button>
          <button class="btn btn-secondary btn-sm">Unread</button>
          <button class="btn btn-secondary btn-sm">Jobs</button>
          <button class="btn btn-secondary btn-sm">Messages</button>
          <button class="btn btn-secondary btn-sm">Alerts</button>
        </div>
        <div class="flex flex-col gap-sm">
          <div class="card flex items-start gap-3" style="border-left: 3px solid var(--primary);">
            <span class="material-symbols-outlined text-primary">work</span>
            <div class="flex-1">
              <div class="flex justify-between">
                <p class="font-bold text-sm">New job match!</p>
                <span class="text-xs text-muted">2m ago</span>
              </div>
              <p class="text-sm text-muted">GT3 Lead Mechanic - Spa 24H matches your profile with 95%</p>
            </div>
          </div>
          <div class="card flex items-start gap-3" style="border-left: 3px solid var(--success);">
            <span class="material-symbols-outlined text-success">check_circle</span>
            <div class="flex-1">
              <div class="flex justify-between">
                <p class="font-bold text-sm">Application approved!</p>
                <span class="text-xs text-muted">1h ago</span>
              </div>
              <p class="text-sm text-muted">Your application for Data Engineer at AF Corse has been approved</p>
            </div>
          </div>
          <div class="card flex items-start gap-3" style="border-left: 3px solid var(--warning);">
            <span class="material-symbols-outlined text-warning">schedule</span>
            <div class="flex-1">
              <div class="flex justify-between">
                <p class="font-bold text-sm">Event reminder</p>
                <span class="text-xs text-muted">3h ago</span>
              </div>
              <p class="text-sm text-muted">Spa 24H starts in 3 days. Travel details confirmed.</p>
            </div>
          </div>
          <div class="card flex items-start gap-3">
            <span class="material-symbols-outlined text-muted">payments</span>
            <div class="flex-1">
              <div class="flex justify-between">
                <p class="font-bold text-sm">Payment received</p>
                <span class="text-xs text-muted">1d ago</span>
              </div>
              <p class="text-sm text-muted">€2,800 payment for Spa 24H - Practice has been processed</p>
            </div>
          </div>
          <div class="card flex items-start gap-3">
            <span class="material-symbols-outlined text-muted">chat</span>
            <div class="flex-1">
              <div class="flex justify-between">
                <p class="font-bold text-sm">New message from Sarah</p>
                <span class="text-xs text-muted">2d ago</span>
              </div>
              <p class="text-sm text-muted">Hey, ready for the briefing tomorrow at 9?</p>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-travel': {
    title: 'Voyages & Logistique',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Voyages & Logistique</h1>
          <button class="btn btn-primary btn-sm">+ Nouveau voyage</button>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
          <div class="card">
            <div class="card-header"><span class="card-title">Spa 24H</span><span class="tag tag-success">Confirmé</span></div>
            <div class="flex flex-col gap-sm">
              <div class="flex items-center gap-sm"><span class="material-symbols-outlined text-primary">flight</span><span class="text-sm">BRU • 26 Juin 08:00</span></div>
              <div class="flex items-center gap-sm"><span class="material-symbols-outlined text-primary">hotel</span><span class="text-sm">Hôtel de la Source • 4 nuits</span></div>
              <div class="flex items-center gap-sm"><span class="material-symbols-outlined text-primary">directions_car</span><span class="text-sm">Navette aéroport • 12 pers</span></div>
            </div>
            <div class="mt-3 pt-3" style="border-top: 1px solid var(--outline-light);">
              <div class="flex justify-between text-sm"><span class="text-muted">Budget voyage</span><span class="font-bold">€12,400</span></div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Monaco GP</span><span class="tag">Planification</span></div>
            <div class="flex flex-col gap-sm">
              <div class="flex items-center gap-sm"><span class="material-symbols-outlined text-muted">flight</span><span class="text-sm text-muted">Pas encore réservé</span></div>
              <div class="flex items-center gap-sm"><span class="material-symbols-outlined text-muted">hotel</span><span class="text-sm text-muted">Pas encore réservé</span></div>
              <div class="flex items-center gap-sm"><span class="material-symbols-outlined text-muted">directions_car</span><span class="text-sm text-muted">Non défini</span></div>
            </div>
            <button class="btn btn-primary btn-sm mt-3 w-full">Planifier le voyage</button>
          </div>
        </div>
      </section>
    `
  },

  'e-company': {
    title: 'Profil entreprise',
    render: () => `
      <section class="page-section">
        <h1 class="section-title mb-lg">Profil entreprise</h1>
        <div class="card mb-lg">
          <div class="flex items-center gap-4 mb-6">
            <div class="avatar avatar-lg" style="width:64px; height:64px; font-size:1.5rem; border-radius: 16px; background: var(--primary); color: white;">ST</div>
            <div>
              <h2 class="font-bold text-lg">Scuderia Italia Racing</h2>
              <p class="text-sm text-muted">GT World Challenge • Équipe fondée en 2012</p>
            </div>
            <button class="ml-auto btn btn-secondary btn-sm">Modifier</button>
          </div>
          <div class="grid grid-2 gap-md">
            <div><label class="text-sm text-muted mb-sm block">Email</label><input class="input-field" value="contact@scuderiaitalia.com"></div>
            <div><label class="text-sm text-muted mb-sm block">Téléphone</label><input class="input-field" value="+39 02 1234 5678"></div>
            <div><label class="text-sm text-muted mb-sm block">Site web</label><input class="input-field" value="www.scuderiaitalia.com"></div>
            <div><label class="text-sm text-muted mb-sm block">Localisation</label><input class="input-field" value="Milan, Italie"></div>
          </div>
          <div class="mt-md">
            <label class="text-sm text-muted mb-sm block">À propos</label>
            <textarea class="input-field" style="height:80px; padding:12px 16px; resize:none;">Équipe professionnelle engagée en GT World Challenge Europe. Basée à Milan, nous participons aux plus grandes courses d'endurance.</textarea>
          </div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Moyens de paiement</span></div>
          <div class="flex items-center gap-3 p-3 rounded-xl" style="background: var(--surface-dim);">
            <span class="material-symbols-outlined text-primary">credit_card</span>
            <div class="flex-1">
              <p class="font-bold text-sm">Visa se terminant par 4242</p>
              <p class="text-xs text-muted">Expire 12/2027</p>
            </div>
            <button class="btn btn-secondary btn-sm">Modifier</button>
          </div>
        </div>
      </section>
    `
  },

  'e-finance': {
    title: 'Finance',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Finance</h1>
          <button class="btn btn-primary btn-sm">Nouvelle facture</button>
        </div>
        <div class="stats-row mb-lg">
          <div class="stat-card"><span class="stat-value">€89,000</span><span class="stat-label">Budget total</span></div>
          <div class="stat-card"><span class="stat-value">€44,200</span><span class="stat-label">Dépensé</span></div>
          <div class="stat-card"><span class="stat-value">€12,400</span><span class="stat-label">Voyages</span></div>
          <div class="stat-card"><span class="stat-value">€31,800</span><span class="stat-label">Salaires</span></div>
        </div>
        <div class="card">
          <div class="card-header"><span class="card-title">Factures récentes</span></div>
          <table style="width:100%; border-collapse: collapse;">
            <thead><tr style="text-align:left; border-bottom: 1px solid var(--outline-light);"><th class="text-sm text-muted p-md">Date</th><th class="text-sm text-muted p-md">Événement</th><th class="text-sm text-muted p-md">Montant</th><th class="text-sm text-muted p-md">Statut</th></tr></thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--outline-light);"><td class="p-md text-sm">20 Juin</td><td class="p-md text-sm font-bold">Spa 24H - Mechanics</td><td class="p-md text-sm">€8,400</td><td class="p-md"><span class="tag tag-success">Payée</span></td></tr>
              <tr style="border-bottom: 1px solid var(--outline-light);"><td class="p-md text-sm">15 Juin</td><td class="p-md text-sm font-bold">Spa 24H - Transport</td><td class="p-md text-sm">€4,200</td><td class="p-md"><span class="tag tag-warning">En attente</span></td></tr>
              <tr><td class="p-md text-sm">10 Juin</td><td class="p-md text-sm font-bold">Monaco GP - Deposit</td><td class="p-md text-sm">€3,000</td><td class="p-md"><span class="tag tag-success">Payée</span></td></tr>
            </tbody>
          </table>
        </div>
      </section>
    `
  }
};
