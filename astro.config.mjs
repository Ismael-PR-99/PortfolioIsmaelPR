import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ismael-pr-99.github.io',
  base: '/PortfolioIsmaelPR',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
