window.pages = window.pages || {};

window.pages.team = {
  title: 'Team',
  render: function() {
    var team = window.Store.get('team') || [];
    var teamCardsHtml = team.map(function(m) {
      var statusColor = m.status === 'Available' ? 'tag-success' : (m.status === 'On Assignment' ? 'tag-warning' : (m.status === 'Active' ? 'tag-primary' : 'tag-muted'));
      var initialsBg = m.initialsBg || 'var(--primary)';
      var initialsColor = m.initialsColor || '#fff';
      return '<div class="card p-md mb-sm" style="cursor:pointer;" id="team-card-' + m.id + '"><div class="flex items-center gap-sm"><div class="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style="background:' + initialsBg + ';color:' + initialsColor + ';">' + Sanitize.esc(m.initials) + '</div><div style="flex:1;"><div class="flex items-center justify-between"><p class="text-sm font-bold">' + Sanitize.esc(m.name) + '</p><span class="tag ' + statusColor + '">' + Sanitize.esc(m.status) + '</span></div><p class="text-sm text-muted">' + Sanitize.esc(m.role) + '</p><p class="text-xs text-muted">' + Sanitize.esc(m.rate) + '</p></div></div></div>';
    }).join('');

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Team</h1><button class="btn btn-primary btn-sm" id="buildTeamBtn">Build Team</button></div><div>' + teamCardsHtml + '</div></section>';
  },
  afterRender: function() {
    var buildBtn = document.getElementById('buildTeamBtn');
    if (buildBtn) buildBtn.addEventListener('click', function() { router.navigate('/e-team', true); });
  }
};