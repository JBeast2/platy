window.pages = window.pages || {};

window.pages.messages = {
  title: 'Messages',
  render: function() {
    var messages = window.Store.get('messages') || [];
    var messagesHtml = messages.map(function(m) {
      var unreadBorder = m.unread ? 'border-left:3px solid var(--primary);' : '';
      return '<div class="card p-md mb-sm" style="' + unreadBorder + 'cursor:pointer;" id="msg-card-' + m.id + '"><div class="flex items-center gap-sm"><div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white bg-primary">' + Sanitize.esc(m.initials) + '</div><div style="flex:1;"><div class="flex items-center justify-between"><p class="text-sm font-bold">' + Sanitize.esc(m.from) + '</p><span class="text-xs text-muted">' + Sanitize.esc(m.time) + '</span></div><p class="text-sm text-muted">' + Sanitize.esc(m.text) + '</p></div></div></div>';
    }).join('');

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Messages</h1></div><div class="flex gap-sm mb-lg" style="flex-wrap: wrap;" id="msgFilterBtns"><button class="btn btn-primary btn-sm msg-filter-btn">All</button><button class="btn btn-secondary btn-sm msg-filter-btn">Unread</button><button class="btn btn-secondary btn-sm msg-filter-btn">Jobs</button><button class="btn btn-secondary btn-sm msg-filter-btn">Teams</button></div><div>' + messagesHtml + '</div></section>';
  },
  afterRender: function() {
    document.querySelectorAll('.msg-filter-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.msg-filter-btn').forEach(function(b) { b.className = 'btn btn-secondary btn-sm msg-filter-btn'; });
        this.className = 'btn btn-primary btn-sm msg-filter-btn';
      });
    });
  }
};