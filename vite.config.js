import { defineConfig } from 'vite';

export default defineConfig({
  base: '/PortfolioIsmaelPR/', // Para GitHub Pages
  root: '.',
  publicDir: 'public', // Directorio para archivos estáticos
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    assetsDir: 'assets',
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks: undefined, // Evitar chunks separados para un portfolio simple
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      }
    },
    // Optimizaciones para producción
    minify: true,
    sourcemap: false, // Desactivar sourcemaps en producción
    target: 'es2015', // Compatibilidad con navegadores más antiguos
  },
  server: {
    open: true,
    port: 3000
  },
  // Asegurar que los archivos TypeScript se procesen correctamente
  esbuild: {
    target: 'es2015'
  }
}); 