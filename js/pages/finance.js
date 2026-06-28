window.pages = window.pages || {};

window.pages.finance = {
  title: 'Finance',
  render: function() {
    var invoices = window.Store.get('invoices') || [];
    var finance = window.Store.get('finance') || {};

    var statsRow = '<div class="stats-row mb-lg"><div class="stat-card"><span class="stat-value">&euro;' + (finance.earnings || 0).toLocaleString() + '</span><span class="stat-label">Earnings</span></div><div class="stat-card"><span class="stat-value">&euro;' + (finance.pending || 0).toLocaleString() + '</span><span class="stat-label">Pending</span></div><div class="stat-card"><span class="stat-value">&euro;' + (finance.ytd || 0).toLocaleString() + '</span><span class="stat-label">YTD</span></div></div>';

    var invoicesHtml = invoices.length > 0 ? '<table class="table" style="width:100%;"><thead><tr><th class="text-left text-sm text-muted p-sm">Date</th><th class="text-left text-sm text-muted p-sm">Job</th><th class="text-right text-sm text-muted p-sm">Amount</th><th class="text-right text-sm text-muted p-sm">Status</th></tr></thead><tbody>' + invoices.map(function(inv) {
      var statusTag = inv.status === 'Paid' ? 'tag-success' : (inv.status === 'Pending' ? 'tag-warning' : 'tag-muted');
      return '<tr><td class="p-sm text-sm">' + Sanitize.esc(inv.date) + '</td><td class="p-sm text-sm">' + Sanitize.esc(inv.job) + '</td><td class="p-sm text-sm text-right">&euro;' + (inv.amount || 0).toLocaleString() + '</td><td class="p-sm text-right"><span class="tag ' + statusTag + '">' + Sanitize.esc(inv.status) + '</span></td></tr>';
    }).join('') + '</tbody></table>' : '<div class="card p-lg text-center"><p class="text-muted">No invoices yet.</p></div>';

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Finance</h1></div>' + statsRow + '<div class="card p-md"><h2 class="section-title mb-md">Invoices</h2>' + invoicesHtml + '</div></section>';
  },
  afterRender: function() {
  }
};