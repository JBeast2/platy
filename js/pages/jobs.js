window.pages = window.pages || {};

window.pages['jobs'] = {
  title: 'Jobs',
  render: function() {
    var jobs = window.Store.get('jobs') || [];
    var jobCardsHtml = jobs.map(function(j) {
      var statusTag = j.status === 'Featured' ? 'tag-success' : (j.status === 'Urgent' ? 'tag-warning' : (j.status === 'New' ? 'tag-primary' : ''));
      var statusBadge = j.status !== 'Open' ? '<span class="tag ' + statusTag + '">' + Sanitize.esc(j.status) + '</span>' : '';
      var tagsHtml = (j.tags || []).map(function(t) { return '<span class="tag">' + Sanitize.esc(t) + '</span>'; }).join('');
      return '<div class="job-card" id="job-card-' + j.id + '"><div class="job-card-header"><div><h3 class="job-card-title">' + Sanitize.esc(j.title) + '</h3><p class="text-sm text-muted">' + Sanitize.esc(j.event) + ' &bull; ' + Sanitize.esc(j.dates) + '</p></div>' + statusBadge + '</div><div class="flex items-center gap-2 mb-sm"><span class="text-xs font-bold text-primary bg-primary-bg px-2 py-1 rounded">' + Sanitize.esc(j.rate) + '</span><span class="text-xs text-muted">' + Sanitize.esc(j.location) + '</span></div><div class="job-card-tags">' + tagsHtml + '</div><div class="flex items-center gap-3 mt-2"><span class="flex items-center gap-1 text-xs"><span class="material-symbols-outlined text-sm">person</span> ' + j.openings + ' position' + (j.openings > 1 ? 's' : '') + '</span><span class="flex items-center gap-1 text-xs"><span class="material-symbols-outlined text-sm">schedule</span> ' + Sanitize.esc(j.duration) + '</span></div><div class="job-card-footer"><div class="flex items-center gap-2"><div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white bg-primary">' + Sanitize.esc(j.employerInitials) + '</div><span class="text-xs text-muted">' + Sanitize.esc(j.employer) + '</span></div><button class="btn btn-primary btn-sm apply-btn" data-job-id="' + j.id + '">Apply</button></div></div>';
    }).join('');

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Job Marketplace</h1><button class="btn btn-primary btn-sm" id="postJobBtn">Post a Job</button></div><div class="flex gap-sm mb-lg" style="flex-wrap: wrap;" id="mkCatBtns"><button class="btn btn-primary btn-sm mk-cat-btn">All</button><button class="btn btn-secondary btn-sm mk-cat-btn">Mechanic</button><button class="btn btn-secondary btn-sm mk-cat-btn">Engineer</button><button class="btn btn-secondary btn-sm mk-cat-btn">Media</button><button class="btn btn-secondary btn-sm mk-cat-btn">Logistics</button></div><div class="grid gap-md" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr));">' + jobCardsHtml + '</div></section>';
  },
  afterRender: function() {
    document.querySelectorAll('.mk-cat-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.mk-cat-btn').forEach(function(b) { b.className = 'btn btn-secondary btn-sm mk-cat-btn'; });
        this.className = 'btn btn-primary btn-sm mk-cat-btn';
      });
    });

    var postJobBtn = document.getElementById('postJobBtn');
    if (postJobBtn) postJobBtn.addEventListener('click', function() { router.navigate('/e-post-job', true); });

    document.querySelectorAll('.apply-btn').forEach(function(btn) {
      btn.addEventListener('click', function(e) {
        e.stopPropagation();
        alert('Application sent!');
      });
    });

    document.querySelectorAll('[id^="job-card-"]').forEach(function(card) {
      card.addEventListener('click', function() {
        var jobId = card.id.replace('job-card-', '');
        router.navigate('/job-detail?id=' + jobId);
      });
    });
  }
};