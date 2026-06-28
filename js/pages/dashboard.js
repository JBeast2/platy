window.pages = window.pages || {};

window.pages.dashboard = {
  title: 'Dashboard',
  render: function() {
    var user = window.Store.get('user');
    var gigs = window.Store.get('activeGigs');
    var events = window.Store.get('events');
    var activeCount = gigs.filter(function(g) { return g.status === 'Active'; }).length;
    var upcomingCount = events.filter(function(e) { return e.status === 'Actif' || e.status === 'Planification'; }).length;
    var finances = window.Store.get('finance');

    function jobCard(j) {
      return '<div class="job-card"><div class="job-card-header"><h3 class="job-card-title">' + Sanitize.esc(j.title) + '</h3><span class="tag tag-' + (j.status === 'Active' ? 'success' : 'warning') + '">' + Sanitize.esc(j.status) + '</span></div><p class="text-sm text-muted">' + Sanitize.esc(j.event) + ' &bull; ' + Sanitize.esc(j.dates) + '</p><div class="job-card-tags">' + (j.tags || []).map(function(t) { return '<span class="tag">' + Sanitize.esc(t) + '</span>'; }).join('') + '</div><div class="job-card-footer"><span class="font-bold text-primary">' + Sanitize.esc(j.rate) + '</span><span class="text-sm text-muted">' + Sanitize.esc(j.location) + '</span></div></div>';
    }

    function eventCard(e) {
      return '<div class="event-card"><div class="event-card-header"><h3 class="event-card-title">' + Sanitize.esc(e.title) + '</h3><span class="text-sm text-muted">' + Sanitize.esc(e.startDate) + '</span></div><p class="text-sm text-muted">' + Sanitize.esc(e.circuit) + ', ' + Sanitize.esc(e.location) + '</p><div class="event-card-footer"><span class="tag">' + Sanitize.esc(e.series) + '</span><button class="btn btn-primary btn-sm" id="viewEventBtn">View Details</button></div></div>';
    }

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Dashboard</h1><div class="flex gap-sm"><button class="btn btn-secondary btn-sm" id="thisWeekBtn">This Week</button><button class="btn btn-primary btn-sm" id="findWorkBtn">Find Work</button></div></div><div class="stats-row"><div class="stat-card"><div class="stat-icon" style="background:rgba(36,162,167,0.1);color:var(--primary);"><span class="material-symbols-outlined">work</span></div><span class="stat-value">' + activeCount + '</span><span class="stat-label">Active Jobs</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(22,163,74,0.1);color:var(--success);"><span class="material-symbols-outlined">payments</span></div><span class="stat-value">&euro;' + finances.earnings.toLocaleString() + '</span><span class="stat-label">This Month</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(245,158,11,0.1);color:var(--warning);"><span class="material-symbols-outlined">event</span></div><span class="stat-value">' + upcomingCount + '</span><span class="stat-label">Upcoming Events</span></div><div class="stat-card"><div class="stat-icon" style="background:rgba(99,102,241,0.1);color:#6366f1;"><span class="material-symbols-outlined">reviews</span></div><span class="stat-value">' + user.rating + '</span><span class="stat-label">Rating</span></div></div></section><section class="page-section"><div class="section-header"><h2 class="section-title">My Calendar</h2></div><div id="dashboard-calendar"></div></section><section class="page-section"><div class="section-header"><h2 class="section-title">Active Jobs</h2><a href="#/jobs" class="text-sm text-primary" data-nav>View all</a></div><div class="grid gap-md" style="grid-template-columns:repeat(auto-fill,minmax(300px,1fr));">' + gigs.filter(function(g) { return g.status === 'Active' || g.status === 'Upcoming'; }).slice(0, 3).map(jobCard).join('') + '</div></section>';
  },
  afterRender: function() {
    if (document.getElementById('dashboard-calendar')) {
      renderCalendar('dashboard-calendar');
    }
    var findWorkBtn = document.getElementById('findWorkBtn');
    if (findWorkBtn) findWorkBtn.addEventListener('click', function() { router.navigate('/jobs'); });
    var thisWeekBtn = document.getElementById('thisWeekBtn');
    if (thisWeekBtn) thisWeekBtn.addEventListener('click', function() { alert('Coming soon'); });
    var viewEventBtn = document.getElementById('viewEventBtn');
    if (viewEventBtn) viewEventBtn.addEventListener('click', function() { router.navigate('/e-event-detail', true); });
  }
};
