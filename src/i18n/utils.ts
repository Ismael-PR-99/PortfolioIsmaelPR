import { ui, type Lang, type UiKey } from './ui';
import { BASE_URL } from '@config/site';

export function getLangFromUrl(url: URL): Lang {
  const [, , lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return 'es';
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key] ?? ui['es'][key];
  };
}

export function getAlternateLang(lang: Lang): Lang {
  return lang === 'es' ? 'en' : 'es';
}

export function getAlternatePath(lang: Lang): string {
  return lang === 'es' ? `${BASE_URL}/en/` : `${BASE_URL}/`;
}
