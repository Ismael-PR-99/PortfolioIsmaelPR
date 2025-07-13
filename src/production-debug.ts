// Script de debug específico para producción
export function initProductionDebug() {
  console.log('🔍 PRODUCTION DEBUG INICIADO');
  console.log('- URL actual:', window.location.href);
  console.log('- Base URL:', document.querySelector('base')?.href || 'No definida');
  console.log('- User Agent:', navigator.userAgent);
  console.log('- Viewport:', `${window.innerWidth}x${window.innerHeight}`);
  
  // Verificar elementos críticos después de un delay
  setTimeout(() => {
    console.log('=== VERIFICACIÓN DE ELEMENTOS EN PRODUCCIÓN ===');
    
    const hamburger = document.getElementById('hamburger-menu');
    const navPanel = document.getElementById('nav-panel');
    
    console.log('Hamburger menu:', hamburger ? '✅ Encontrado' : '❌ No encontrado');
    console.log('Nav panel:', navPanel ? '✅ Encontrado' : '❌ No encontrado');
    
    if (hamburger) {
      console.log('- Hamburger ID:', hamburger.id);
      console.log('- Hamburger clases:', hamburger.className);
      console.log('- Hamburger data-initialized:', hamburger.dataset?.['initialized'] || 'No definido');
      console.log('- Hamburger estilos computados:', {
        position: getComputedStyle(hamburger).position,
        zIndex: getComputedStyle(hamburger).zIndex,
        display: getComputedStyle(hamburger).display,
        visibility: getComputedStyle(hamburger).visibility,
        opacity: getComputedStyle(hamburger).opacity
      });
      
      // Verificar eventos
      let hasEventListeners = false;
      try {
        const clonedElement = hamburger.cloneNode(true);
        if (clonedElement !== hamburger) {
          // Si los elementos son diferentes después del clonado, probablemente hay eventos
          hasEventListeners = true;
        }
      } catch (e) {
        console.log('No se pudo verificar event listeners:', e);
      }
      console.log('- Posibles event listeners:', hasEventListeners ? '✅' : '❓');
    }
    
    if (navPanel) {
      console.log('- Nav panel ID:', navPanel.id);
      console.log('- Nav panel clases:', navPanel.className);
      console.log('- Nav panel estilos computados:', {
        position: getComputedStyle(navPanel).position,
        zIndex: getComputedStyle(navPanel).zIndex,
        transform: getComputedStyle(navPanel).transform,
        opacity: getComputedStyle(navPanel).opacity,
        pointerEvents: getComputedStyle(navPanel).pointerEvents
      });
      
      const navLinks = navPanel.querySelectorAll('a');
      console.log('- Enlaces en nav panel:', navLinks.length);
      navLinks.forEach((link, index) => {
        console.log(`  - Enlace ${index + 1}:`, {
          href: link.getAttribute('href'),
          text: link.textContent?.trim(),
          classes: link.className
        });
      });
    }
    
    // Verificar secciones
    const sections = [
      { id: 'hero', element: document.querySelector('.hero') },
      { id: 'experience', element: document.getElementById('experience') },
      { id: 'projects', element: document.getElementById('projects') },
      { id: 'contact', element: document.getElementById('contact') }
    ];
    
    console.log('=== VERIFICACIÓN DE SECCIONES ===');
    sections.forEach(section => {
      console.log(`Sección ${section.id}:`, section.element ? '✅' : '❌');
      if (section.element) {
        console.log(`- ${section.id} clases:`, section.element.className);
      }
    });
    
    // Verificar CSS Variables
    const rootStyles = getComputedStyle(document.documentElement);
    console.log('=== VARIABLES CSS ===');
    console.log('--primary:', rootStyles.getPropertyValue('--primary'));
    console.log('--secondary:', rootStyles.getPropertyValue('--secondary'));
    console.log('--lime-green:', rootStyles.getPropertyValue('--lime-green'));
    console.log('--text-light:', rootStyles.getPropertyValue('--text-light'));
    
    console.log('=== FIN VERIFICACIÓN PRODUCCIÓN ===');
  }, 1000);
  
  // Capturar errores
  window.addEventListener('error', (e) => {
    console.error('❌ ERROR EN PRODUCCIÓN:', {
      message: e.message,
      filename: e.filename,
      lineno: e.lineno,
      colno: e.colno,
      error: e.error
    });
  });
  
  // Capturar errores de promesas
  window.addEventListener('unhandledrejection', (e) => {
    console.error('❌ PROMESA RECHAZADA EN PRODUCCIÓN:', e.reason);
  });
  
  // Test manual del menú
  (window as any).testHamburgerMenu = function() {
    console.log('🧪 TESTING MANUAL DEL MENÚ...');
    const hamburger = document.getElementById('hamburger-menu');
    const navPanel = document.getElementById('nav-panel');
    
    if (!hamburger || !navPanel) {
      console.error('❌ Elementos no encontrados para test');
      return;
    }
    
    console.log('Disparando evento click en hamburger...');
    hamburger.click();
    
    setTimeout(() => {
      console.log('Estado después del click:');
      console.log('- Hamburger clases:', hamburger.className);
      console.log('- Nav panel clases:', navPanel.className);
      console.log('- Nav panel transform:', getComputedStyle(navPanel).transform);
      console.log('- Nav panel opacity:', getComputedStyle(navPanel).opacity);
    }, 100);
  };
  
  console.log('💡 Para probar el menú manualmente, ejecuta: testHamburgerMenu()');
}
