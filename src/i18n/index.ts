import { es } from './es';
import { en } from './en';

export type Lang = 'es' | 'en';

let currentLang: Lang = 'es';

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
}

export function t(key: string): string {
  const dict = currentLang === 'es' ? es : en;
  return dict[key] ?? key;
}

export function applyTranslations(): void {
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset['i18n']!;
    el.textContent = t(key);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-html]').forEach((el) => {
    const key = el.dataset['i18nHtml']!;
    el.innerHTML = t(key);
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-aria]').forEach((el) => {
    const key = el.dataset['i18nAria']!;
    el.setAttribute('aria-label', t(key));
  });

  document.querySelectorAll<HTMLElement>('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset['i18nPlaceholder']!;
    (el as HTMLInputElement).placeholder = t(key);
  });

  document.title = t('meta.title');
}
