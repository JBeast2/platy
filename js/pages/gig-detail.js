window.pages = window.pages || {};

window.pages['gig-detail'] = {
  title: 'Gig Detail',
  render: function() {
    var params = new URLSearchParams(window.location.search);
    var gigId = parseInt(params.get('id'));
    var gigs = window.Store.get('activeGigs') || [];
    var gig = gigs.find(function(g) { return g.id === gigId; });

    if (!gig) {
      return '<section class="page-section"><div class="card p-lg text-center"><h2>Gig not found</h2><p class="text-muted">The gig you are looking for does not exist.</p></div></section>';
    }

    var statusTag = gig.status === 'Active' ? 'tag-success' : (gig.status === 'Upcoming' ? 'tag-warning' : (gig.status === 'Completed' ? 'tag-muted' : ''));
    var tagsHtml = (gig.tags || []).map(function(t) { return '<span class="tag">' + Sanitize.esc(t) + '</span>'; }).join('');

    return '<section class="page-section"><div class="flex items-center gap-sm mb-lg"><button class="btn btn-secondary btn-sm" id="backToMyJobsBtn"><span class="material-symbols-outlined text-sm">arrow_back</span> Back to My Jobs</button></div><div class="card p-lg mb-lg"><div class="flex items-center justify-between mb-md"><h1 class="section-title">' + Sanitize.esc(gig.title) + '</h1><span class="tag ' + statusTag + '">' + Sanitize.esc(gig.status) + '</span></div><p class="text-sm text-muted mb-sm">' + Sanitize.esc(gig.employer) + ' &bull; ' + Sanitize.esc(gig.event) + ' &bull; ' + Sanitize.esc(gig.dates) + '</p><p class="text-sm text-muted mb-sm">' + Sanitize.esc(gig.location) + ' &bull; ' + Sanitize.esc(gig.rate) + '</p><div class="job-card-tags mb-lg">' + tagsHtml + '</div></div><div class="card p-lg mb-lg"><div class="flex gap-sm mb-lg" id="gigTabBtns"><button class="btn btn-primary btn-sm gig-tab-btn" data-tab="overview">Overview</button><button class="btn btn-secondary btn-sm gig-tab-btn" data-tab="programme">Programme</button><button class="btn btn-secondary btn-sm gig-tab-btn" data-tab="travel">Travel</button><button class="btn btn-secondary btn-sm gig-tab-btn" data-tab="team">Team</button><button class="btn btn-secondary btn-sm gig-tab-btn" data-tab="documents">Documents</button></div><div class="gig-tab-content" id="gigTabOverview"><h3 class="mb-sm">Overview</h3><p class="text-sm text-muted">Gig details for ' + Sanitize.esc(gig.title) + ' at ' + Sanitize.esc(gig.event) + '. Status: ' + Sanitize.esc(gig.status) + '.</p></div><div class="gig-tab-content" id="gigTabProgramme" style="display:none;"><h3 class="mb-sm">Programme</h3><p class="text-sm text-muted">Programme details coming soon.</p></div><div class="gig-tab-content" id="gigTabTravel" style="display:none;"><h3 class="mb-sm">Travel</h3><p class="text-sm text-muted">Travel arrangements coming soon.</p></div><div class="gig-tab-content" id="gigTabTeam" style="display:none;"><h3 class="mb-sm">Team</h3><p class="text-sm text-muted">Team members coming soon.</p></div><div class="gig-tab-content" id="gigTabDocuments" style="display:none;"><h3 class="mb-sm">Documents</h3><p class="text-sm text-muted">Documents coming soon.</p></div></div></section>';
  },
  afterRender: function() {
    var backBtn = document.getElementById('backToMyJobsBtn');
    if (backBtn) backBtn.addEventListener('click', function() { router.navigate('/my-jobs'); });

    document.querySelectorAll('.gig-tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var tab = this.getAttribute('data-tab');
        document.querySelectorAll('.gig-tab-btn').forEach(function(b) { b.className = 'btn btn-secondary btn-sm gig-tab-btn'; });
        this.className = 'btn btn-primary btn-sm gig-tab-btn';
        document.querySelectorAll('.gig-tab-content').forEach(function(c) { c.style.display = 'none'; });
        var tabContent = document.getElementById('gigTab' + tab.charAt(0).toUpperCase() + tab.slice(1));
        if (tabContent) tabContent.style.display = 'block';
      });
    });
  }
};