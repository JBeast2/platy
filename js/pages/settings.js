window.pages = window.pages || {};

window.pages.settings = {
  title: 'Settings',
  render: function() {
    var user = window.Store.get('user') || {};

    return '<section class="page-section"><div class="section-header"><h1 class="section-title">Settings</h1></div><div class="card p-lg"><div class="flex gap-sm mb-lg" id="settingsTabBtns"><button class="btn btn-primary btn-sm settings-tab-btn" data-tab="profil">Profil</button><button class="btn btn-secondary btn-sm settings-tab-btn" data-tab="compte">Compte</button><button class="btn btn-secondary btn-sm settings-tab-btn" data-tab="notifications">Notifications</button><button class="btn btn-secondary btn-sm settings-tab-btn" data-tab="facturation">Facturation</button></div><div class="settings-tab-content" id="settingsTabProfil"><div class="mb-md"><label class="text-sm text-muted mb-xs block">Name</label><input class="input-field" id="settingsName" value="' + Sanitize.esc(user.name || '') + '"></div><div class="mb-md"><label class="text-sm text-muted mb-xs block">Email</label><input class="input-field" type="email" id="settingsEmail" value="' + Sanitize.esc(user.email || '') + '"></div><div class="mb-md"><label class="text-sm text-muted mb-xs block">Phone</label><input class="input-field" id="settingsPhone" value="' + Sanitize.esc(user.phone || '') + '"></div><div class="mb-md"><label class="text-sm text-muted mb-xs block">Location</label><input class="input-field" id="settingsLocation" value="' + Sanitize.esc(user.location || '') + '"></div><div class="mb-md"><label class="text-sm text-muted mb-xs block">Languages</label><input class="input-field" id="settingsLanguages" value="' + Sanitize.esc(user.languages || '') + '"></div><div class="mb-md"><label class="text-sm text-muted mb-xs block">Bio</label><textarea class="input-field" rows="3" id="settingsBio">' + Sanitize.esc(user.bio || '') + '</textarea></div><button class="btn btn-primary btn-sm" id="saveProfileBtn">Save Changes</button></div><div class="settings-tab-content" id="settingsTabCompte" style="display:none;"><h3 class="mb-sm">Account Settings</h3><p class="text-sm text-muted">Account settings coming soon.</p></div><div class="settings-tab-content" id="settingsTabNotifications" style="display:none;"><h3 class="mb-sm">Notification Settings</h3><p class="text-sm text-muted">Notification preferences coming soon.</p></div><div class="settings-tab-content" id="settingsTabFacturation" style="display:none;"><h3 class="mb-sm">Billing</h3><p class="text-sm text-muted">Billing settings coming soon.</p></div></div></section>';
  },
  afterRender: function() {
    document.querySelectorAll('.settings-tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var tab = this.getAttribute('data-tab');
        document.querySelectorAll('.settings-tab-btn').forEach(function(b) { b.className = 'btn btn-secondary btn-sm settings-tab-btn'; });
        this.className = 'btn btn-primary btn-sm settings-tab-btn';
        document.querySelectorAll('.settings-tab-content').forEach(function(c) { c.style.display = 'none'; });
        var tabContent = document.getElementById('settingsTab' + tab.charAt(0).toUpperCase() + tab.slice(1));
        if (tabContent) tabContent.style.display = 'block';
      });
    });

    var saveBtn = document.getElementById('saveProfileBtn');
    if (saveBtn) saveBtn.addEventListener('click', function() {
      alert('Profile saved!');
    });
  }
};