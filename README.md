# Ismael Piña Ramos — Portfolio

[![Deploy to GitHub Pages](https://github.com/Ismael-PR-99/PortfolioIsmaelPR/actions/workflows/deploy.yml/badge.svg)](https://github.com/Ismael-PR-99/PortfolioIsmaelPR/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

**Live:** [ismael-pr-99.github.io/PortfolioIsmaelPR](https://ismael-pr-99.github.io/PortfolioIsmaelPR/)

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Build | Vite 5 + TypeScript 5 strict |
| Styles | CSS `@layer` — tokens → base → layout → components |
| i18n | ES/EN vanilla (sin librerías), `localStorage` + `navigator.language` fallback |
| Formulario | [Web3Forms](https://web3forms.com/) |
| CI/CD | GitHub Actions → `npm ci` → `tsc` → `eslint` → `vite build` → Pages |
| Performance | AVIF+WebP+PNG `<picture>`, SVG favicon, `preload` hero, Lighthouse CI budget |
| SEO | Open Graph, Twitter Card, JSON-LD `Person`, sitemap.xml, robots.txt |
| A11y | WCAG 2.2 AA — foco visible, ARIA correctos, skip-link, `prefers-reduced-motion` |

## Estructura

```
src/
├── main.ts                  # Entry point
├── site.config.ts           # BASE_URL y SITE_URL (cambiar para dominio propio)
├── modules/
│   ├── menu.ts              # Hamburguesa + nav responsivo
│   ├── scroll.ts            # Smooth scroll + scroll-reveal
│   ├── theme.ts             # Light/dark + prefers-color-scheme
│   ├── i18n.ts              # Toggle ES/EN
│   ├── effects.ts           # CV button effect
│   └── contact.ts           # Web3Forms
├── i18n/
│   ├── es.ts
│   ├── en.ts
│   └── index.ts
├── styles/
│   ├── tokens.css           # Design tokens (paleta, espaciado, tipografía)
│   ├── base.css             # Reset moderno + focus visible
│   ├── layout.css           # Grid + contenedores
│   ├── utilities.css
│   └── components/          # button, card, nav, hero, project-card, contact, footer
└── lib/
    └── logger.ts            # Log solo en DEV

public/
├── favicon.svg
├── og.png                   # 1200×630 Open Graph image
├── robots.txt
├── sitemap.xml
└── images/                  # AVIF + WebP originales
```

## Correr en local

```bash
git clone https://github.com/Ismael-PR-99/PortfolioIsmaelPR.git
cd PortfolioIsmaelPR
npm install
npm run dev        # http://localhost:5173/PortfolioIsmaelPR/
```

### Otros scripts

```bash
npm run build          # Compila + optimiza imágenes → dist/
npm run preview        # Preview del build en local
npm run typecheck      # tsc --noEmit (0 errores strict)
npm run lint           # ESLint @typescript-eslint/recommended-strict
npm run lint:fix       # Autofix
npm run format         # Prettier
```

## Migrar a dominio propio

Editar dos líneas en `src/site.config.ts`:

```ts
export const BASE_URL = '/';           // era '/PortfolioIsmaelPR/'
export const SITE_URL = 'https://tudominio.com';
```

Y actualizar `base` en `vite.config.js` a `'/'`.

## CI/CD

Cada push a `main` ejecuta:

1. `tsc --noEmit` — falla si hay error de tipos
2. `eslint src/` — falla si hay `console.log` en producción u otro warning
3. `vite build` — genera `dist/`
4. Deploy a GitHub Pages
5. Lighthouse CI audit contra `.github/lighthouse-budget.json` (LCP < 2s, JS < 30 KB, CSS < 25 KB)

## Contacto

- **Email:** ismael199904@gmail.com
- **LinkedIn:** [ismael-piña-ramos](https://www.linkedin.com/in/ismael-pi%C3%B1a-ramos-1b6b121b4/)
- **GitHub:** [@Ismael-PR-99](https://github.com/Ismael-PR-99)
