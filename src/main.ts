import './styles/main.css';
import { initMenu } from './modules/menu';
import { initTheme } from './modules/theme';
import { initI18n } from './modules/i18n';
import { initScrollReveal, initSmoothScroll } from './modules/scroll';
import { initCVButtonEffects } from './modules/effects';
import { initContactForm } from './modules/contact';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initI18n();
  initMenu();
  initSmoothScroll();
  initScrollReveal();
  initCVButtonEffects();
  initContactForm();
});
