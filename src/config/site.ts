export const SITE_URL = 'https://ismael-pr-99.github.io';
export const BASE_URL = '/PortfolioIsmaelPR';

export const PROFILE = {
  name: 'Ismael Piña Ramos',
  role: {
    es: 'Desarrollador Web Full Stack',
    en: 'Full Stack Web Developer',
  },
  location: 'Sevilla, España',
  available: true,
} as const;

// Business contact for the services landing. Anything left empty is simply
// not rendered, so the page never shows a dead link or a placeholder.
export const CONTACT = {
  email: 'ismael199904@gmail.com',
  whatsapp: '', // international format, digits only: 34600000000
  whatsappLabel: '',
  bookingUrl: '', // e.g. a cal.com link for "book a call"
  hours: { es: 'L–V, 9:00–19:00', en: 'Mon–Fri, 9:00–19:00' },
} as const;

export const SOCIALS = {
  github: 'https://github.com/Ismael-PR-99',
  linkedin: 'https://www.linkedin.com/in/ismael-piña-ramos-1b6b121b4/',
  instagram: 'https://www.instagram.com/ismael_pr99/',
  cv: `${BASE_URL}/cv/CV_Piña_Ramos_Ismael.pdf`,
} as const;
