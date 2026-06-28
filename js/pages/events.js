window.pages = window.pages || {};

window.pages.events = {
  title: 'Events',
  render: function() {
    var events = window.Store.get('events') || [];
    var eventCardsHtml = events.map(function(e) {
      var statusColor = e.status === 'Actif' ? 'tag-success' : (e.status === 'Planification' ? 'tag-warning' : 'tag-muted');
      var staffStr = e.recruited + ' / ' + e.totalNeeded + ' staff';
      return '<div class="event-card" id="event-card-' + e.id + '"><div class="event-card-header"><div><h3 class="event-card-title">' + Sanitize.esc(e.title) + '</h3><p class="text-sm text-muted">' + Sanitize.esc(e.circuit) + ', ' + Sanitize.esc(e.location) + '</p></div><span class="tag ' + statusColor + '">' + Sanitize.esc(e.status) + '</span></div><p class="text-sm text-muted mb-sm">' + Sanitize.esc(e.startDate) + ' - ' + Sanitize.esc(e.endDate) + '</p><div class="flex items-center gap-sm mb-sm"><span class="tag">' + Sanitize.esc(e.series) + '</span><span class="tag">' + Sanitize.esc(e.type) + '</span></div><p class="text-sm text-muted"><span class="material-symbols-outlined text-sm">people</span> ' + staffStr + '</p></div>';
    }).join('');

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Events</h1><button class="btn btn-primary btn-sm" id="createEventBtn">Create Event</button></div><div class="grid gap-md" style="grid-template-columns:repeat(auto-fill,minmax(320px,1fr));">' + eventCardsHtml + '</div></section>';
  },
  afterRender: function() {
    var createBtn = document.getElementById('createEventBtn');
    if (createBtn) createBtn.addEventListener('click', function() { router.navigate('/e-event-create', true); });

    document.querySelectorAll('[id^="event-card-"]').forEach(function(card) {
      card.addEventListener('click', function() {
        var eventId = card.id.replace('event-card-', '');
        router.navigate('/e-event-detail?id=' + eventId, true);
      });
    });
  }
};