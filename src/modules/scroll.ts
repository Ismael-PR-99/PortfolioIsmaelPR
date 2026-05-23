import { logger } from '../lib/logger';

export function initScrollReveal(): void {
  const sections = document.querySelectorAll<HTMLElement>('.fade-in-section');
  if (sections.length === 0) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          logger.log('scroll-reveal: in-view', entry.target.id);
        }
      });
    },
    { threshold: 0.1, rootMargin: '-50px 0px' }
  );

  sections.forEach((el) => observer.observe(el));
}

export function initSmoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId) return;
      const target = document.querySelector<HTMLElement>(targetId);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
