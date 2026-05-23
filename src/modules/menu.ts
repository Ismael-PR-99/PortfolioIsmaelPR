import { t } from '../i18n/index';

export function initMenu(): void {
  const nav = document.getElementById('main-nav');
  const toggle = document.getElementById('menu-toggle');
  const links = document.getElementById('nav-links');

  if (!nav || !toggle || !links) return;

  const open = () => {
    nav.classList.add('nav-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', t('nav.closeMenu'));
  };

  const close = () => {
    nav.classList.remove('nav-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', t('nav.openMenu'));
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

  initActiveSectionTracking(links);
}

function initActiveSectionTracking(linksContainer: HTMLElement): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const navLinks = linksContainer.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');

  if (!sections.length || !navLinks.length) return;

  const setActive = (id: string) => {
    navLinks.forEach((link) => {
      if (link.getAttribute('href') === `#${id}`) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  // Default active on load
  setActive('hero');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActive(entry.target.id);
        }
      });
    },
    {
      // Trigger zone: strip just below nav, top 30% of viewport
      rootMargin: '-64px 0px -70% 0px',
      threshold: 0,
    }
  );

  sections.forEach((section) => observer.observe(section));
}
