window.pages = window.pages || {};

window.pages.marketplace = {
  title: 'Job Marketplace',
  render: function() {
    var jobs = window.Store.get('jobs') || [];
    var jobCardsHtml = jobs.map(function(j) {
      var statusTag = j.status === 'Featured' ? 'tag-success' : (j.status === 'Urgent' ? 'tag-warning' : '');
      var statusBadge = j.status !== 'Open' ? '<span class="tag ' + statusTag + '">' + Sanitize.esc(j.status) + '</span>' : '';
      var initialsColor = j.employerInitials === 'SI' ? 'primary' : (j.employerInitials === 'AM' ? 'warning' : (j.employerInitials === 'GT' ? '#9333ea' : 'primary'));
      var tagsHtml = (j.tags || []).map(function(t) { return '<span class="tag">' + Sanitize.esc(t) + '</span>'; }).join('');
      return '<div class="job-card" id="job-card-' + j.id + '"><div class="job-card-header"><div><h3 class="job-card-title">' + Sanitize.esc(j.title) + '</h3><p class="text-sm text-muted">' + Sanitize.esc(j.event) + ' &bull; ' + Sanitize.esc(j.dates) + '</p></div>' + statusBadge + '</div><div class="flex items-center gap-2 mb-sm"><span class="text-xs font-bold text-primary bg-primary-bg px-2 py-1 rounded">' + Sanitize.esc(j.rate) + '</span><span class="text-xs text-muted">&#x1F4CD; ' + Sanitize.esc(j.location) + '</span></div><div class="job-card-tags">' + tagsHtml + '</div><div class="flex items-center gap-3 mt-2"><span class="flex items-center gap-1 text-xs"><span class="material-symbols-outlined text-sm">person</span> ' + j.openings + ' position' + (j.openings > 1 ? 's' : '') + '</span><span class="flex items-center gap-1 text-xs"><span class="material-symbols-outlined text-sm">schedule</span> ' + Sanitize.esc(j.duration) + '</span></div><div class="job-card-footer"><div class="flex items-center gap-2"><div class="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style="background:var(--' + (initialsColor === 'primary' ? 'primary' : initialsColor) + ');">' + Sanitize.esc(j.employerInitials) + '</div><span class="text-xs text-muted">' + Sanitize.esc(j.employer) + '</span></div><button class="btn btn-primary btn-sm apply-btn" data-job-id="' + j.id + '">Apply</button></div></div>';
    }).join('');

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Job Marketplace</h1><div class="flex gap-sm"><button class="btn btn-secondary btn-sm" id="marketplaceFiltersBtn">Filters</button><button class="btn btn-primary btn-sm" id="postJobBtn">Post a Job</button></div></div><div class="card mb-lg p-md" id="marketplace-filters" style="display:none;"><div class="grid grid-2 gap-md mb-md"><div><label class="text-sm text-muted mb-sm block">Category</label><select class="input-field"><option>All Categories</option><option>Mechanic</option><option>Engineer</option><option>Media</option><option>Logistics</option><option>Management</option></select></div><div><label class="text-sm text-muted mb-sm block">Location</label><input class="input-field" placeholder="Any location"></div><div><label class="text-sm text-muted mb-sm block">Rate (&euro;/day)</label><div class="flex gap-sm"><input class="input-field" placeholder="Min" style="width:50%;"><input class="input-field" placeholder="Max" style="width:50%;"></div></div><div><label class="text-sm text-muted mb-sm block">Availability</label><select class="input-field"><option>Any time</option><option>Immediate</option><option>Next week</option><option>Next month</option></select></div></div><div class="flex gap-sm justify-end"><button class="btn btn-secondary btn-sm" id="cancelFiltersBtn">Cancel</button><button class="btn btn-primary btn-sm" id="applyFiltersBtn">Apply Filters</button></div></div><div class="flex gap-sm mb-lg" style="flex-wrap: wrap;" id="mkCatBtns"><button class="btn btn-primary btn-sm mk-cat-btn">All</button><button class="btn btn-secondary btn-sm mk-cat-btn">Mechanic</button><button class="btn btn-secondary btn-sm mk-cat-btn">Engineer</button><button class="btn btn-secondary btn-sm mk-cat-btn">Media</button><button class="btn btn-secondary btn-sm mk-cat-btn">Logistics</button><button class="btn btn-secondary btn-sm mk-cat-btn">Management</button></div><div class="grid gap-md" style="grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));">' + jobCardsHtml + '</div></section>';
  },
  afterRender: function() {
    document.querySelectorAll('.mk-cat-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.mk-cat-btn').forEach(function(b) { b.className = 'btn btn-secondary btn-sm mk-cat-btn'; });
        this.className = 'btn btn-primary btn-sm mk-cat-btn';
      });
    });

    document.getElementById('marketplaceFiltersBtn').addEventListener('click', function() {
      var f = document.getElementById('marketplace-filters');
      f.style.display = f.style.display === 'none' ? 'block' : 'none';
    });
    document.getElementById('cancelFiltersBtn').addEventListener('click', function() {
      document.getElementById('marketplace-filters').style.display = 'none';
    });
    document.getElementById('applyFiltersBtn').addEventListener('click', function() {
      alert('Coming soon');
      document.getElementById('marketplace-filters').style.display = 'none';
    });
    document.getElementById('postJobBtn').addEventListener('click', function() {
      router.navigate('/e-post-job', true);
    });

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
