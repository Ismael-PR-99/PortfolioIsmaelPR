import { defineConfig } from 'vite';

export default defineConfig({
  base: '/PortfolioIsmaelPR/', // Añadido para GitHub Pages
  root: '.',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: 'index.html'
    }
  },
  server: {
    open: true
  }
}); 