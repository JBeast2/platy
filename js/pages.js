function handleLogin(role) {
  localStorage.setItem('platy-logged-in', 'true');
  localStorage.setItem('platy-role', role);
  document.body.classList.remove('login-mode');
  router.navigate('/dashboard');
}

const pages = {
  login: {
    title: 'Connexion',
    render: () => {
      document.body.classList.add('login-mode');
      return `
      <div class="login-page">
        <div class="login-card">
          <div class="login-logo">
            <div class="login-logo-icon">
              <span class="material-symbols-outlined">bolt</span>
            </div>
            <h1 class="login-logo-text">Platy</h1>
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
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Dashboard</h1>
          <div class="flex gap-sm">
            <button class="btn btn-secondary btn-sm">This Week</button>
            <button class="btn btn-primary btn-sm" onclick="router.navigate('/jobs')">Find Work</button>
          </div>
        </div>

        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(36,162,167,0.1); color: var(--primary);">
              <span class="material-symbols-outlined">work</span>
            </div>
            <span class="stat-value">3</span>
            <span class="stat-label">Active Jobs</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(22,163,74,0.1); color: var(--success);">
              <span class="material-symbols-outlined">payments</span>
            </div>
            <span class="stat-value">€8,400</span>
            <span class="stat-label">This Month</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(245,158,11,0.1); color: var(--warning);">
              <span class="material-symbols-outlined">event</span>
            </div>
            <span class="stat-value">2</span>
            <span class="stat-label">Upcoming Events</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(99,102,241,0.1); color: #6366f1;">
              <span class="material-symbols-outlined">reviews</span>
            </div>
            <span class="stat-value">4.8</span>
            <span class="stat-label">Rating</span>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Active Jobs</h2>
          <a href="#/jobs" class="text-sm text-primary" data-nav>View all</a>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
          <div class="job-card">
            <div class="job-card-header">
              <h3 class="job-card-title">GT3 Lead Mechanic</h3>
              <span class="tag tag-success">Active</span>
            </div>
            <p class="text-sm text-muted">Spa 24H • Jun 26-29</p>
            <div class="job-card-tags">
              <span class="tag">Mechanic</span>
              <span class="tag">GT3</span>
              <span class="tag">Spa</span>
            </div>
            <div class="job-card-footer">
              <span class="font-bold text-primary">€350/day</span>
              <span class="text-sm text-muted">Spa, Belgium</span>
            </div>
          </div>
          <div class="job-card">
            <div class="job-card-header">
              <h3 class="job-card-title">Data Engineer</h3>
              <span class="tag tag-warning">Pending</span>
            </div>
            <p class="text-sm text-muted">Monaco GP • Jul 3-7</p>
            <div class="job-card-tags">
              <span class="tag">Engineering</span>
              <span class="tag">Data</span>
            </div>
            <div class="job-card-footer">
              <span class="font-bold text-primary">€400/day</span>
              <span class="text-sm text-muted">Monte Carlo</span>
            </div>
          </div>
          <div class="job-card">
            <div class="job-card-header">
              <h3 class="job-card-title">Race Photographer</h3>
              <span class="tag tag-success">Active</span>
            </div>
            <p class="text-sm text-muted">Nürburgring 24H • Jul 15-18</p>
            <div class="job-card-tags">
              <span class="tag">Media</span>
              <span class="tag">Photography</span>
            </div>
            <div class="job-card-footer">
              <span class="font-bold text-primary">€280/day</span>
              <span class="text-sm text-muted">Nürburg, Germany</span>
            </div>
          </div>
        </div>
      </section>

      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Upcoming Events</h2>
          <a href="#/events" class="text-sm text-primary" data-nav>View all</a>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));">
          <div class="event-card">
            <div class="event-card-header">
              <h3 class="event-card-title">Spa 24 Hours</h3>
              <span class="text-sm text-muted">Jun 26-29</span>
            </div>
            <p class="text-sm text-muted">Circuit de Spa-Francorchamps, Belgium</p>
            <div class="event-card-footer">
              <span class="tag">GT World Challenge</span>
              <button class="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-card-header">
              <h3 class="event-card-title">Monaco Grand Prix</h3>
              <span class="text-sm text-muted">Jul 3-7</span>
            </div>
            <p class="text-sm text-muted">Circuit de Monaco, Monte Carlo</p>
            <div class="event-card-footer">
              <span class="tag">Formula 1</span>
              <button class="btn btn-primary btn-sm">View Details</button>
            </div>
          </div>
        </div>
      </section>
    `
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
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Events</h1>
          <button class="btn btn-primary btn-sm">Create Event</button>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
          <div class="event-card">
            <div class="event-card-header">
              <h3 class="event-card-title">Spa 24 Hours</h3>
              <span class="text-sm text-muted">Jun 26-29</span>
            </div>
            <p class="text-sm text-muted">Circuit de Spa-Francorchamps, Belgium</p>
            <div class="event-card-meta">
              <span>🏁 GT World Challenge</span>
              <span>👥 12 staff needed</span>
            </div>
            <div class="event-card-footer">
              <span class="tag tag-success">Active</span>
              <button class="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-card-header">
              <h3 class="event-card-title">Monaco Grand Prix</h3>
              <span class="text-sm text-muted">Jul 3-7</span>
            </div>
            <p class="text-sm text-muted">Circuit de Monaco, Monte Carlo</p>
            <div class="event-card-meta">
              <span>🏁 Formula 1</span>
              <span>👥 8 staff needed</span>
            </div>
            <div class="event-card-footer">
              <span class="tag">Planning</span>
              <button class="btn btn-primary btn-sm">Manage</button>
            </div>
          </div>
        </div>
      </section>
    `
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
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Team</h1>
          <button class="btn btn-primary btn-sm">Build Team</button>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          <div class="card text-center">
            <div class="avatar avatar-lg" style="margin: 0 auto 12px;">AK</div>
            <h3 class="font-bold">Alex Krause</h3>
            <p class="text-sm text-muted">Lead Mechanic</p>
            <span class="tag tag-success mt-sm">Available</span>
          </div>
          <div class="card text-center">
            <div class="avatar avatar-lg" style="margin: 0 auto 12px; background: rgba(147,51,234,0.1); color: #9333ea;">SM</div>
            <h3 class="font-bold">Sarah Mitchell</h3>
            <p class="text-sm text-muted">Data Engineer</p>
            <span class="tag tag-warning mt-sm">On Assignment</span>
          </div>
          <div class="card text-center">
            <div class="avatar avatar-lg" style="margin: 0 auto 12px; background: rgba(234,88,12,0.1); color: #ea580c;">MB</div>
            <h3 class="font-bold">Marco Bellini</h3>
            <p class="text-sm text-muted">Race Engineer</p>
            <span class="tag tag-success mt-sm">Available</span>
          </div>
        </div>
      </section>
    `
  },

  finance: {
    title: 'Finance',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Finance</h1>
          <button class="btn btn-primary btn-sm">New Invoice</button>
        </div>
        <div class="stats-row mb-lg">
          <div class="stat-card">
            <span class="stat-value">€8,400</span>
            <span class="stat-label">Earnings This Month</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">€12,200</span>
            <span class="stat-label">Pending</span>
          </div>
          <div class="stat-card">
            <span class="stat-value">€45,000</span>
            <span class="stat-label">YTD Total</span>
          </div>
        </div>
        <div class="card">
          <div class="card-header">
            <span class="card-title">Invoices</span>
          </div>
          <table style="width:100%; border-collapse: collapse;">
            <thead>
              <tr style="text-align:left; border-bottom: 1px solid var(--outline-light);">
                <th class="text-sm text-muted p-md">Date</th>
                <th class="text-sm text-muted p-md">Job</th>
                <th class="text-sm text-muted p-md">Amount</th>
                <th class="text-sm text-muted p-md">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr style="border-bottom: 1px solid var(--outline-light);">
                <td class="p-md text-sm">Jun 20</td>
                <td class="p-md text-sm font-bold">Spa 24H - Practice</td>
                <td class="p-md text-sm">€2,800</td>
                <td class="p-md"><span class="tag tag-success">Paid</span></td>
              </tr>
              <tr style="border-bottom: 1px solid var(--outline-light);">
                <td class="p-md text-sm">Jun 15</td>
                <td class="p-md text-sm font-bold">Spa 24H - Qualifying</td>
                <td class="p-md text-sm">€2,100</td>
                <td class="p-md"><span class="tag tag-warning">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    `
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
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Settings</h1>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">Profile</button>
          <button class="btn btn-secondary btn-sm">Account</button>
          <button class="btn btn-secondary btn-sm">Notifications</button>
          <button class="btn btn-secondary btn-sm">Billing</button>
        </div>
        <div class="card mb-lg">
          <h3 class="font-bold mb-md">Profile Information</h3>
          <div class="flex items-center gap-lg mb-lg">
            <div class="avatar avatar-lg">JD</div>
            <div>
              <h3 class="font-bold">John Doe</h3>
              <p class="text-sm text-muted">GT3 Lead Mechanic</p>
            </div>
          </div>
          <div class="grid grid-2 gap-md">
            <div>
              <label class="text-sm text-muted mb-sm block">Full Name</label>
              <input class="input-field" value="John Doe">
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
          </div>
          <div class="flex justify-end gap-sm mt-lg">
            <button class="btn btn-secondary">Cancel</button>
            <button class="btn btn-primary">Save Changes</button>
          </div>
        </div>
      </section>
    `
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
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Tableau de bord</h1>
          <button class="btn btn-primary btn-sm" onclick="router.navigate('/e-event-create')">Créer un événement</button>
        </div>
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(36,162,167,0.1); color: var(--primary);">
              <span class="material-symbols-outlined">event</span>
            </div>
            <span class="stat-value">3</span>
            <span class="stat-label">Événements actifs</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(99,102,241,0.1); color: #6366f1;">
              <span class="material-symbols-outlined">groups</span>
            </div>
            <span class="stat-value">24</span>
            <span class="stat-label">Membres d'équipe</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(245,158,11,0.1); color: var(--warning);">
              <span class="material-symbols-outlined">pending_actions</span>
            </div>
            <span class="stat-value">8</span>
            <span class="stat-label">Candidatures en attente</span>
          </div>
          <div class="stat-card">
            <div class="stat-icon" style="background: rgba(22,163,74,0.1); color: var(--success);">
              <span class="material-symbols-outlined">payments</span>
            </div>
            <span class="stat-value">€89k</span>
            <span class="stat-label">Budget total</span>
          </div>
        </div>
      </section>
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Événements à venir</h2>
          <a href="#/e-events" class="text-sm text-primary" data-nav>Voir tout</a>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
          <div class="event-card" onclick="router.navigate('/e-event-detail')">
            <div class="event-card-header">
              <h3 class="event-card-title">Spa 24 Hours</h3>
              <span class="tag tag-success">Actif</span>
            </div>
            <p class="text-sm text-muted">Circuit de Spa-Francorchamps • 26-29 Juin</p>
            <div class="event-card-meta">
              <span>🏁 GT World Challenge</span>
              <span>👥 12/15 recrutés</span>
            </div>
            <div class="event-card-footer">
              <span class="font-bold text-primary">€45k budget</span>
              <span class="text-sm text-muted">8 candidatures</span>
            </div>
          </div>
          <div class="event-card" onclick="router.navigate('/e-event-detail')">
            <div class="event-card-header">
              <h3 class="event-card-title">Monaco Grand Prix</h3>
              <span class="tag tag-warning">Planification</span>
            </div>
            <p class="text-sm text-muted">Circuit de Monaco • 3-7 Juillet</p>
            <div class="event-card-meta">
              <span>🏁 Formula 1</span>
              <span>👥 5/8 recrutés</span>
            </div>
            <div class="event-card-footer">
              <span class="font-bold text-primary">€32k budget</span>
              <span class="text-sm text-muted">3 candidatures</span>
            </div>
          </div>
          <div class="event-card" onclick="router.navigate('/e-event-detail')">
            <div class="event-card-header">
              <h3 class="event-card-title">Nürburgring 24H</h3>
              <span class="tag">Brouillon</span>
            </div>
            <p class="text-sm text-muted">Nürburgring • 15-18 Juillet</p>
            <div class="event-card-meta">
              <span>🏁 24H Series</span>
              <span>👥 0/10 recrutés</span>
            </div>
            <div class="event-card-footer">
              <span class="font-bold text-primary">€28k budget</span>
              <span class="text-sm text-muted">Pas de candidatures</span>
            </div>
          </div>
        </div>
      </section>
      <section class="page-section">
        <div class="section-header">
          <h2 class="section-title">Candidatures récentes</h2>
        </div>
        <div class="grid gap-sm">
          <div class="card flex items-center gap-md" style="cursor:pointer; border-left: 3px solid var(--primary);">
            <div class="avatar">AK</div>
            <div style="flex:1; min-width:0;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">Alex Krause</span>
                <span class="tag tag-success btn-sm">Approuver</span>
              </div>
              <p class="text-sm text-muted">Postule pour GT3 Lead Mechanic • Spa 24H</p>
            </div>
          </div>
          <div class="card flex items-center gap-md" style="cursor:pointer; border-left: 3px solid var(--warning);">
            <div class="avatar" style="background: rgba(147,51,234,0.1); color: #9333ea;">SM</div>
            <div style="flex:1; min-width:0;">
              <div class="flex justify-between">
                <span class="font-bold text-sm">Sarah Mitchell</span>
                <span class="tag tag-warning btn-sm">En attente</span>
              </div>
              <p class="text-sm text-muted">Postule pour Data Engineer • Monaco GP</p>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-events': {
    title: 'Mes événements',
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Mes événements</h1>
          <button class="btn btn-primary btn-sm" onclick="router.navigate('/e-event-create')">+ Nouvel événement</button>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">Tous</button>
          <button class="btn btn-secondary btn-sm">Actifs</button>
          <button class="btn btn-secondary btn-sm">Planification</button>
          <button class="btn btn-secondary btn-sm">Terminés</button>
          <button class="btn btn-secondary btn-sm">Brouillons</button>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));">
          <div class="event-card">
            <div class="event-card-header">
              <div>
                <h3 class="event-card-title">Spa 24 Hours</h3>
                <p class="text-sm text-muted">Circuit de Spa-Francorchamps</p>
              </div>
              <span class="tag tag-success">Actif</span>
            </div>
            <div class="event-card-meta">
              <span>📅 26-29 Juin 2026</span>
              <span>👥 12/15 recrutés</span>
              <span>💰 €45k</span>
            </div>
            <div class="event-card-footer">
              <button class="btn btn-primary btn-sm" onclick="router.navigate('/e-event-detail')">Gérer</button>
              <button class="btn btn-ghost btn-sm">Dupliquer</button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-card-header">
              <div>
                <h3 class="event-card-title">Monaco Grand Prix</h3>
                <p class="text-sm text-muted">Circuit de Monaco</p>
              </div>
              <span class="tag tag-warning">Planification</span>
            </div>
            <div class="event-card-meta">
              <span>📅 3-7 Juillet 2026</span>
              <span>👥 5/8 recrutés</span>
              <span>💰 €32k</span>
            </div>
            <div class="event-card-footer">
              <button class="btn btn-primary btn-sm" onclick="router.navigate('/e-event-detail')">Gérer</button>
              <button class="btn btn-ghost btn-sm">Dupliquer</button>
            </div>
          </div>
          <div class="event-card">
            <div class="event-card-header">
              <div>
                <h3 class="event-card-title">Nürburgring 24H</h3>
                <p class="text-sm text-muted">Nürburgring</p>
              </div>
              <span class="tag">Brouillon</span>
            </div>
            <div class="event-card-meta">
              <span>📅 15-18 Juillet 2026</span>
              <span>👥 0/10 recrutés</span>
              <span>💰 €28k</span>
            </div>
            <div class="event-card-footer">
              <button class="btn btn-primary btn-sm">Continuer</button>
              <button class="btn btn-ghost btn-sm">Supprimer</button>
            </div>
          </div>
        </div>
      </section>
    `
  },

  'e-event-create': {
    title: 'Créer un événement',
    render: () => `
      <section class="page-section">
        <div class="flex items-center gap-2 mb-6">
          <button class="icon-btn" onclick="router.navigate('/e-dashboard')"><span class="material-symbols-outlined">arrow_back</span></button>
          <h1 class="section-title">Créer un événement</h1>
        </div>
        <div class="flex items-center gap-0 mb-8">
          <div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">1</div><span class="text-sm font-medium text-primary">Infos</span></div>
          <div class="w-12 h-0.5 bg-primary mx-1"></div>
          <div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center text-sm font-bold">2</div><span class="text-sm text-primary">Offres</span></div>
          <div class="w-12 h-0.5 bg-outline/30 mx-1"></div>
          <div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-surface-dim text-muted flex items-center justify-center text-sm font-bold">3</div><span class="text-sm text-muted">Voyage</span></div>
          <div class="w-12 h-0.5 bg-outline/30 mx-1"></div>
          <div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-surface-dim text-muted flex items-center justify-center text-sm font-bold">4</div><span class="text-sm text-muted">Publication</span></div>
        </div>
        <div class="grid grid-2 gap-lg">
          <div class="card">
            <h3 class="font-bold mb-md">Informations générales</h3>
            <div class="flex flex-col gap-md">
              <div>
                <label class="text-sm text-muted mb-sm block">Nom de l'événement</label>
                <input class="input-field" placeholder="Ex: Spa 24 Hours 2026">
              </div>
              <div class="grid grid-2 gap-md">
                <div>
                  <label class="text-sm text-muted mb-sm block">Date début</label>
                  <input class="input-field" type="date">
                </div>
                <div>
                  <label class="text-sm text-muted mb-sm block">Date fin</label>
                  <input class="input-field" type="date">
                </div>
              </div>
              <div>
                <label class="text-sm text-muted mb-sm block">Lieu</label>
                <input class="input-field" placeholder="Circuit, ville, pays">
              </div>
              <div class="grid grid-2 gap-md">
                <div>
                  <label class="text-sm text-muted mb-sm block">Type d'épreuve</label>
                  <select class="input-field">
                    <option>Endurance 24H</option>
                    <option>Sprint</option>
                    <option>Test day</option>
                    <option>Track day</option>
                    <option>Corporate</option>
                  </select>
                </div>
                <div>
                  <label class="text-sm text-muted mb-sm block">Budget total (€)</label>
                  <input class="input-field" placeholder="45000">
                </div>
              </div>
              <div>
                <label class="text-sm text-muted mb-sm block">Description</label>
                <textarea class="input-field" style="height:80px; padding:12px 16px; resize:none;" placeholder="Décrivez l'événement, les besoins spécifiques..."></textarea>
              </div>
            </div>
          </div>
          <div>
            <div class="card mb-md">
              <h3 class="font-bold mb-md">Résumé</h3>
              <div class="space-y-3 text-sm">
                <div class="flex justify-between"><span class="text-muted">Budget</span><span class="font-bold">€45,000</span></div>
                <div class="flex justify-between"><span class="text-muted">Personnel requis</span><span class="font-bold">15</span></div>
                <div class="flex justify-between"><span class="text-muted">Durée</span><span class="font-bold">4 jours</span></div>
                <div class="flex justify-between"><span class="text-muted">Statut</span><span class="tag">Brouillon</span></div>
              </div>
            </div>
            <div class="card" style="background: var(--primary-bg); border-color: var(--primary);">
              <p class="text-sm font-bold text-primary mb-sm">💡 Conseil</p>
              <p class="text-xs text-muted">Définissez d'abord votre budget pour obtenir des recommandations de personnel optimisées par l'IA.</p>
            </div>
          </div>
        </div>
        <div class="flex justify-between mt-lg">
          <button class="btn btn-secondary">Sauvegarder brouillon</button>
          <div class="flex gap-sm">
            <button class="btn btn-secondary">Annuler</button>
            <button class="btn btn-primary">Suivant : Offres d'emploi</button>
          </div>
        </div>
      </section>
    `
  },

  'e-event-detail': {
    title: 'Détail événement',
    render: () => `
      <section class="page-section">
        <div class="flex items-center gap-2 mb-4">
          <button class="icon-btn" onclick="router.navigate('/e-dashboard')"><span class="material-symbols-outlined">arrow_back</span></button>
          <div>
            <h1 class="section-title">Spa 24 Hours</h1>
            <p class="text-sm text-muted">Circuit de Spa-Francorchamps • 26-29 Juin 2026</p>
          </div>
          <div class="ml-auto flex gap-sm">
            <button class="btn btn-secondary btn-sm">Modifier</button>
            <button class="btn btn-primary btn-sm">Publier</button>
          </div>
        </div>
        <div class="stats-row mb-lg">
          <div class="stat-card"><span class="stat-value">12/15</span><span class="stat-label">Postes pourvus</span></div>
          <div class="stat-card"><span class="stat-value">8</span><span class="stat-label">Candidatures</span></div>
          <div class="stat-card"><span class="stat-value">€32k</span><span class="stat-label">Dépensé</span></div>
          <div class="stat-card"><span class="stat-value">€13k</span><span class="stat-label">Restant</span></div>
        </div>
        <div class="grid grid-2 gap-lg">
          <div class="card">
            <div class="card-header"><span class="card-title">Postes à pourvoir</span><button class="btn btn-primary btn-sm">+ Ajouter</button></div>
            <div class="divide-y" style="border-top: 1px solid var(--outline-light);">
              <div class="flex items-center justify-between py-3">
                <div><p class="font-bold text-sm">GT3 Lead Mechanic</p><p class="text-xs text-muted">2 postes • €350/jour</p></div>
                <span class="tag tag-success">Pourvu</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div><p class="font-bold text-sm">Data Engineer</p><p class="text-xs text-muted">1 poste • €400/jour</p></div>
                <span class="tag tag-warning">En cours</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <div><p class="font-bold text-sm">Race Photographer</p><p class="text-xs text-muted">1 poste • €280/jour</p></div>
                <span class="tag">Ouvert</span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header"><span class="card-title">Candidats récents</span><a href="#/e-applicants" class="text-sm text-primary" data-nav>Voir tout</a></div>
            <div class="divide-y" style="border-top: 1px solid var(--outline-light);">
              <div class="flex items-center gap-3 py-3">
                <div class="avatar">AK</div>
                <div class="flex-1"><p class="font-bold text-sm">Alex Krause</p><p class="text-xs text-muted">GT3 Lead Mechanic • 2j</p></div>
                <button class="btn btn-primary btn-sm">OK</button>
              </div>
              <div class="flex items-center gap-3 py-3">
                <div class="avatar" style="background: rgba(147,51,234,0.1); color: #9333ea;">SM</div>
                <div class="flex-1"><p class="font-bold text-sm">Sarah Mitchell</p><p class="text-xs text-muted">Data Engineer • 3j</p></div>
                <button class="btn btn-secondary btn-sm">Voir</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    `
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
    render: () => `
      <section class="page-section">
        <div class="section-header">
          <h1 class="section-title">Mon équipe</h1>
          <button class="btn btn-primary btn-sm">+ Inviter</button>
        </div>
        <div class="flex gap-sm mb-lg" style="flex-wrap: wrap;">
          <button class="btn btn-primary btn-sm">Tous</button>
          <button class="btn btn-secondary btn-sm">Confirmés</button>
          <button class="btn btn-secondary btn-sm">En attente</button>
          <button class="btn btn-secondary btn-sm">Remplaçants</button>
        </div>
        <div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));">
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <div class="avatar avatar-lg" style="width:48px; height:48px; font-size:1rem;">AK</div>
              <div>
                <h3 class="font-bold text-sm">Alex Krause</h3>
                <p class="text-xs text-muted">GT3 Lead Mechanic</p>
              </div>
              <span class="ml-auto material-symbols-outlined text-success">check_circle</span>
            </div>
            <div class="flex gap-xs flex-wrap">
              <span class="tag">Spa 24H</span>
              <span class="tag">Monaco GP</span>
            </div>
            <div class="flex justify-between items-center mt-3 pt-3" style="border-top: 1px solid var(--outline-light);">
              <span class="text-xs text-muted">€350/jour</span>
              <span class="tag tag-success">Confirmé</span>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <div class="avatar avatar-lg" style="width:48px; height:48px; font-size:1rem; background:rgba(147,51,234,0.1); color:#9333ea;">SM</div>
              <div>
                <h3 class="font-bold text-sm">Sarah Mitchell</h3>
                <p class="text-xs text-muted">Data Engineer</p>
              </div>
              <span class="ml-auto material-symbols-outlined text-warning">hourglass_empty</span>
            </div>
            <div class="flex gap-xs flex-wrap">
              <span class="tag">Spa 24H</span>
            </div>
            <div class="flex justify-between items-center mt-3 pt-3" style="border-top: 1px solid var(--outline-light);">
              <span class="text-xs text-muted">€400/jour</span>
              <span class="tag tag-warning">En attente</span>
            </div>
          </div>
          <div class="card">
            <div class="flex items-center gap-3 mb-3">
              <div class="avatar avatar-lg" style="width:48px; height:48px; font-size:1rem; background:rgba(234,88,12,0.1); color:#ea580c;">MB</div>
              <div>
                <h3 class="font-bold text-sm">Marco Bellini</h3>
                <p class="text-xs text-muted">Race Engineer</p>
              </div>
              <span class="ml-auto material-symbols-outlined text-success">check_circle</span>
            </div>
            <div class="flex gap-xs flex-wrap">
              <span class="tag">Monaco GP</span>
            </div>
            <div class="flex justify-between items-center mt-3 pt-3" style="border-top: 1px solid var(--outline-light);">
              <span class="text-xs text-muted">€500/jour</span>
              <span class="tag tag-success">Confirmé</span>
            </div>
          </div>
        </div>
      </section>
    `
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
