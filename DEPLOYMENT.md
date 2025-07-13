# GitHub Pages Configuration

# Este archivo contiene instrucciones para configurar correctamente
# el portfolio en GitHub Pages después del build con Vite

## Pasos para desplegar:

1. Ejecutar el build:
   ```
   npm run build
   ```

2. El contenido de la carpeta `dist/` debe subirse a la rama `gh-pages` o configurarse en GitHub Pages

3. Verificar que la configuración de GitHub Pages:
   - Source: Deploy from a branch
   - Branch: main (o gh-pages si usas esa rama)
   - Folder: / (root) si subes el contenido de dist directamente

## Configuración importante:

- `base: '/PortfolioIsmaelPR/'` en vite.config.js debe coincidir con el nombre del repositorio
- Todas las rutas en el HTML usan rutas relativas (./archivo.ext)
- Los archivos estáticos están en el directorio public/

## Troubleshooting:

Si el menú hamburguesa no funciona en producción:
1. Abrir Developer Tools (F12)
2. Ir a la consola
3. Ejecutar: `testHamburgerMenu()` para hacer una prueba manual
4. Verificar que no hay errores de JavaScript en la consola
5. Verificar que los archivos CSS y JS se cargan correctamente en la pestaña Network

## URLs de referencia:
- Desarrollo: http://localhost:3000
- Producción: https://usuario.github.io/PortfolioIsmaelPR/
