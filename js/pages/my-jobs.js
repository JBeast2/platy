window.pages = window.pages || {};

window.pages['my-jobs'] = {
  title: 'My Jobs',
  render: function() {
    var gigs = window.Store.get('activeGigs') || [];
    var gigCardsHtml = gigs.map(function(g) {
      var statusTag = g.status === 'Active' ? 'tag-success' : (g.status === 'Upcoming' ? 'tag-warning' : (g.status === 'Completed' ? 'tag-muted' : ''));
      var progressBar = g.status === 'Active' ? '<div class="progress-bar mb-sm"><div class="progress-fill" style="width:' + g.progress + '%;"></div></div><p class="text-xs text-muted">Day ' + g.currentDay + ' of ' + g.totalDays + '</p>' : '';
      var tagsHtml = (g.tags || []).map(function(t) { return '<span class="tag">' + Sanitize.esc(t) + '</span>'; }).join('');
      return '<div class="job-card" id="gig-card-' + g.id + '"><div class="job-card-header"><div><h3 class="job-card-title">' + Sanitize.esc(g.title) + '</h3><p class="text-sm text-muted">' + Sanitize.esc(g.employer) + '</p></div><span class="tag ' + statusTag + '">' + Sanitize.esc(g.status) + '</span></div><p class="text-sm text-muted mb-xs">' + Sanitize.esc(g.event) + ' &bull; ' + Sanitize.esc(g.dates) + '</p><p class="text-sm text-muted mb-sm">' + Sanitize.esc(g.location) + ' &bull; ' + Sanitize.esc(g.rate) + '</p>' + progressBar + '<div class="job-card-tags">' + tagsHtml + '</div></div>';
    }).join('');

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">My Jobs</h1><button class="btn btn-primary btn-sm" id="findWorkBtn">Find Work</button></div><div class="flex gap-sm mb-lg" style="flex-wrap: wrap;" id="gigFilterBtns"><button class="btn btn-primary btn-sm gig-filter-btn">Active</button><button class="btn btn-secondary btn-sm gig-filter-btn">Upcoming</button><button class="btn btn-secondary btn-sm gig-filter-btn">Completed</button><button class="btn btn-secondary btn-sm gig-filter-btn">All</button></div><div class="grid gap-md" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr));">' + gigCardsHtml + '</div></section>';
  },
  afterRender: function() {
    document.querySelectorAll('.gig-filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.gig-filter-btn').forEach(function(b) { b.className = 'btn btn-secondary btn-sm gig-filter-btn'; });
        this.className = 'btn btn-primary btn-sm gig-filter-btn';
      });
    });

    var findWorkBtn = document.getElementById('findWorkBtn');
    if (findWorkBtn) findWorkBtn.addEventListener('click', function() { router.navigate('/jobs'); });

    document.querySelectorAll('[id^="gig-card-"]').forEach(function(card) {
      card.addEventListener('click', function() {
        var gigId = card.id.replace('gig-card-', '');
        router.navigate('/gig-detail?id=' + gigId);
      });
    });
  }
};