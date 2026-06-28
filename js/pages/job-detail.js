window.pages = window.pages || {};

window.pages['job-detail'] = {
  title: 'Job Detail',
  render: function() {
    var params = new URLSearchParams(window.location.search);
    var jobId = parseInt(params.get('id'));
    var jobs = window.Store.get('jobs') || [];
    var job = jobs.find(function(j) { return j.id === jobId; });

    if (!job) {
      return '<section class="page-section"><div class="card p-lg text-center"><h2>Job not found</h2><p class="text-muted">The job you are looking for does not exist.</p></div></section>';
    }

    var statusTag = job.status === 'Featured' ? 'tag-success' : (job.status === 'Urgent' ? 'tag-warning' : (job.status === 'New' ? 'tag-primary' : ''));
    var tagsHtml = (job.tags || []).map(function(t) { return '<span class="tag">' + Sanitize.esc(t) + '</span>'; }).join('');
    var requirementsHtml = (job.requirements || []).map(function(r) { return '<li class="text-sm">' + Sanitize.esc(r) + '</li>'; }).join('');

    return '<section class="page-section"><div class="flex items-center gap-sm mb-lg"><button class="btn btn-secondary btn-sm" id="backToJobsBtn"><span class="material-symbols-outlined text-sm">arrow_back</span> Back</button></div><div class="grid gap-lg" style="grid-template-columns:2fr 1fr;"><div class="card p-lg"><div class="flex items-center gap-sm mb-md"><span class="tag ' + statusTag + '">' + Sanitize.esc(job.status) + '</span></div><h1 class="section-title mb-sm">' + Sanitize.esc(job.title) + '</h1><p class="text-sm text-muted mb-md">' + Sanitize.esc(job.event) + ' &bull; ' + Sanitize.esc(job.dates) + ' &bull; ' + Sanitize.esc(job.location) + '</p><div class="job-card-tags mb-lg">' + tagsHtml + '</div><h3 class="mb-sm">Description</h3><p class="text-sm text-muted mb-lg">' + (job.description ? Sanitize.esc(job.description) : 'No description provided.') + '</p><h3 class="mb-sm">Requirements</h3><ul class="mb-lg" style="padding-left:1.25rem;">' + requirementsHtml + '</ul><h3 class="mb-sm">Employer</h3><div class="flex items-center gap-sm"><div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-primary">' + Sanitize.esc(job.employerInitials) + '</div><div><p class="text-sm font-bold">' + Sanitize.esc(job.employer) + '</p><p class="text-xs text-muted">Posted ' + Sanitize.esc(job.posted) + '</p></div></div></div><div class="card p-lg"><h2 class="section-title mb-md">Apply Now</h2><div class="mb-md"><p class="text-sm font-bold mb-xs">Rate</p><p class="text-lg text-primary font-bold">' + Sanitize.esc(job.rate) + '</p><p class="text-xs text-muted">' + Sanitize.esc(job.duration) + '</p></div><div class="mb-md"><label class="text-sm text-muted mb-xs block">Your Rate (€/day)</label><input class="input-field" type="number" placeholder="350" id="applyRate"></div><div class="mb-md"><label class="text-sm text-muted mb-xs block">Cover Message</label><textarea class="input-field" rows="4" placeholder="Tell the employer why you are a great fit..." id="applyCover"></textarea></div><div class="mb-lg"><label class="text-sm text-muted mb-xs block">Availability</label><select class="input-field" id="applyAvailability"><option>Immediate</option><option>Next week</option><option>Next month</option></select></div><button class="btn btn-primary btn-lg" style="width:100%;" id="submitApplyBtn">Submit Application</button></div></div></section>';
  },
  afterRender: function() {
    var backBtn = document.getElementById('backToJobsBtn');
    if (backBtn) backBtn.addEventListener('click', function() { router.navigate('/jobs'); });

    var submitBtn = document.getElementById('submitApplyBtn');
    if (submitBtn) submitBtn.addEventListener('click', function() { alert('Application sent!'); });
  }
};