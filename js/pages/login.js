window.pages = window.pages || {};

window.pages.login = {
  title: 'Connexion',
  render: function() {
    document.body.classList.add('login-mode');
    return '<div class="login-page"><div class="login-card"><div class="login-logo"><img src="assets/logo-platy.jpg" alt="Platy" class="login-logo-img"></div><p class="login-subtitle">Your Digital Agent for Smarter Work</p><div class="role-selector"><p class="role-label">Je suis</p><div class="role-options"><button class="role-btn" id="role-normal"><span class="material-symbols-outlined">person</span><span class="role-btn-title">Normal</span><span class="role-btn-desc">Freelance, prestataire</span></button><button class="role-btn active" id="role-entreprise"><span class="material-symbols-outlined">business</span><span class="role-btn-title">Entreprise</span><span class="role-btn-desc">Équipe, organisateur</span></button></div></div><div class="login-form"><div class="login-field"><label class="login-label">Email</label><input class="input-field" type="email" placeholder="vous@exemple.com" id="login-email"></div><div class="login-field"><label class="login-label">Mot de passe</label><input class="input-field" type="password" placeholder="••••••••" id="login-password"></div><button class="btn btn-primary btn-lg login-btn" id="login-submit-btn">Se connecter</button></div><p class="login-footer">Pas encore de compte ? <a href="#" id="signup-link">Créer un compte</a></p></div></div>';
  },
  afterRender: function() {
    // Role selection
    document.getElementById('role-normal').addEventListener('click', function() {
      document.querySelectorAll('.role-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      localStorage.setItem('platy-role', 'normal');
    });
    document.getElementById('role-entreprise').addEventListener('click', function() {
      document.querySelectorAll('.role-btn').forEach(function(b) { b.classList.remove('active'); });
      this.classList.add('active');
      localStorage.setItem('platy-role', 'entreprise');
    });

    // Login submit
    document.getElementById('login-submit-btn').addEventListener('click', window.handleLogin);

    // Signup link
    document.getElementById('signup-link').addEventListener('click', function(e) {
      e.preventDefault();
      alert('Inscription pas encore disponible');
    });
  }
};
