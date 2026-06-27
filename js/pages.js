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
  }
};
