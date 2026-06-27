class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  register(path, handler) {
    this.routes[path] = handler;
  }

  navigate(path) {
    window.location.hash = path;
  }

  handleRoute() {
    const fullHash = window.location.hash.slice(1) || '/';
    const pathOnly = fullHash.split('?')[0];
    const handler = this.routes[pathOnly];

    if (handler) {
      handler();
      this.currentRoute = fullHash;
      if (typeof handler.afterRender === 'function') {
        var self = this;
        setTimeout(function() { handler.afterRender(); }, 0);
      }
    } else {
      this.navigate('/');
    }

    this.updateActiveNav(fullHash);
  }

  updateActiveNav(hash) {
    const pathOnly = hash.split('?')[0];
    document.querySelectorAll('[data-nav]').forEach(link => {
      const href = link.getAttribute('href');
      const linkPath = href.split('?')[0];
      const isActive = linkPath === `#${pathOnly}` || (hash === '/' && href === '#/');
      link.classList.toggle('active', isActive);
    });
  }

  init() {
    this.handleRoute();
  }
}

const router = new Router();
