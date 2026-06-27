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
    const hash = window.location.hash.slice(1) || '/';
    const handler = this.routes[hash];

    if (handler) {
      handler();
      this.currentRoute = hash;
    } else {
      this.navigate('/');
    }

    this.updateActiveNav(hash);
  }

  updateActiveNav(hash) {
    document.querySelectorAll('[data-nav]').forEach(link => {
      const href = link.getAttribute('href');
      const isActive = href === `#${hash}` || (hash === '/' && href === '#/');
      link.classList.toggle('active', isActive);
    });
  }

  init() {
    this.handleRoute();
  }
}

const router = new Router();
