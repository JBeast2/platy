window.pages = window.pages || {};

window.pages.travel = {
  title: 'Travel',
  render: function() {
    var trips = window.Store.get('travel') || [];
    var iconMap = { flight: 'flight', hotel: 'hotel', directions_car: 'directions_car' };

    var tripsHtml = trips.map(function(trip) {
      var statusTag = trip.status === 'Confirmed' ? 'tag-success' : (trip.status === 'Planning' ? 'tag-warning' : '');
      var itemsHtml = (trip.items || []).map(function(item) {
        var icon = item.icon || 'flight';
        var detailStr = item.detail ? '<p class="text-xs text-muted">' + Sanitize.esc(item.detail) + '</p>' : '';
        return '<div class="flex items-center gap-sm mb-sm"><span class="material-symbols-outlined text-muted">' + Sanitize.esc(icon) + '</span><div><p class="text-sm">' + Sanitize.esc(item.label) + '</p>' + detailStr + '</div></div>';
      }).join('');

      return '<div class="card p-md mb-sm"><div class="flex items-center justify-between mb-sm"><h3 class="text-sm font-bold">' + Sanitize.esc(trip.event) + '</h3><span class="tag ' + statusTag + '">' + Sanitize.esc(trip.status) + '</span></div>' + itemsHtml + '</div>';
    }).join('');

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Travel</h1></div><div>' + tripsHtml + '</div></section>';
  },
  afterRender: function() {
  }
};