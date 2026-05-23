export function initMenu(): void {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');

  if (!nav || !toggle || !links) return;

  const open = () => {
    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
  };

  const close = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  };

  toggle.addEventListener('click', () => {
    if (nav.classList.contains('nav-open')) {
      close();
    } else {
      open();
    }
  });

  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') close();
  });

  document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-open') && !nav.contains(e.target as Node)) {
      close();
    }
  });

  window.addEventListener(
    'scroll',
    () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    },
    { passive: true }
  );
}
