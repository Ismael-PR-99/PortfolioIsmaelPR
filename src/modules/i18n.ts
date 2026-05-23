import { applyTranslations, getLang, setLang, type Lang } from '../i18n/index';

function updateLangBtn(btn: HTMLElement, lang: Lang): void {
  btn.textContent = lang === 'es' ? 'EN' : 'ES';
  btn.setAttribute('aria-label', lang === 'es' ? 'Switch to English' : 'Cambiar a Español');
}

export function initI18n(): void {
  const stored = localStorage.getItem('lang');
  const detected: Lang = navigator.language.startsWith('es') ? 'es' : 'en';
  const lang: Lang = stored === 'es' || stored === 'en' ? stored : detected;

  setLang(lang);
  applyTranslations();

  const btn = document.getElementById('lang-toggle');
  if (!btn) return;

  updateLangBtn(btn, lang);

  btn.addEventListener('click', () => {
    const next: Lang = getLang() === 'es' ? 'en' : 'es';
    setLang(next);
    applyTranslations();
    updateLangBtn(btn, next);
  });
}
