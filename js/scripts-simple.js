document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 DOM cargado, versión simplificada...');
    
    const hamburger = document.getElementById('hamburger-menu');
    const navPanel = document.getElementById('nav-panel');
    let isMenuOpen = false;

    // Verificar elementos críticos
    console.log('=== VERIFICACIÓN INICIAL ===');
    console.log('Hamburger menu:', hamburger ? '✅' : '❌');
    console.log('Nav panel:', navPanel ? '✅' : '❌');
    console.log('Nav links count:', navPanel ? navPanel.querySelectorAll('a').length : 0);
    
    if (hamburger && navPanel) {
        const navLinks = navPanel.querySelectorAll('a');
        console.log('Enlaces encontrados:', navLinks.length);
        navLinks.forEach((link, index) => {
            console.log(`Enlace ${index + 1}: ${link.textContent.trim()} -> ${link.href}`);
        });

        // Función para alternar el menú
        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                hamburger.classList.add('is-active');
                navPanel.classList.add('is-active');
                document.body.style.overflow = 'hidden';
            } else {
                hamburger.classList.remove('is-active');
                navPanel.classList.remove('is-active');
                document.body.style.overflow = 'auto';
            }
        };

        // Abrir/cerrar menú con el botón
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Cerrar el menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                console.log(`🔗 Clic en enlace: ${href}`);
                
                // Si es el enlace del CV, cerrar menú inmediatamente
                if (link.classList.contains('cv-link')) {
                    console.log('📄 Navegando al CV');
                    if (navPanel.classList.contains('is-active')) {
                        toggleMenu();
                    }
                    return;
                }
                
                // Para enlaces de ancla
                setTimeout(() => {
                    if (navPanel.classList.contains('is-active')) {
                        toggleMenu();
                    }
                }, 100);
            });
        });
    }

    // Scroll suave básico
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = window.innerWidth <= 768 ? 60 : 80;
                const elementPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: Math.max(0, elementPosition),
                    behavior: 'smooth'
                });
                
                console.log(`📍 Navegando a: ${targetId}`);
            }
        });
    });

    // --- CAMBIO DINÁMICO DE COLOR DE HAMBURGUESA SEGÚN SECCIÓN ---
    if (hamburger) {
        const sections = [
            { element: document.querySelector('.hero'), class: 'on-green-bg' },
            { element: document.getElementById('experience'), class: 'on-light-bg' },
            { element: document.getElementById('projects'), class: 'on-dark-bg' },
            { element: document.getElementById('contact'), class: 'on-light-bg' }
        ];

        // Establecer color inicial (hero section)
        hamburger.classList.add('on-green-bg');

        // Método de detección por scroll position
        const updateHamburgerColorByScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            // Obtener posiciones de las secciones
            const heroSection = document.querySelector('.hero');
            const experienceSection = document.getElementById('experience');
            const projectsSection = document.getElementById('projects');
            const contactSection = document.getElementById('contact');
            
            let currentClass = 'on-green-bg'; // Default
            
            if (heroSection && scrollY < heroSection.offsetHeight * 0.7) {
                currentClass = 'on-green-bg';
            } else if (experienceSection && scrollY >= experienceSection.offsetTop - windowHeight * 0.3 && 
                       scrollY < experienceSection.offsetTop + experienceSection.offsetHeight - windowHeight * 0.3) {
                currentClass = 'on-light-bg';
            } else if (projectsSection && scrollY >= projectsSection.offsetTop - windowHeight * 0.3 && 
                       scrollY < projectsSection.offsetTop + projectsSection.offsetHeight - windowHeight * 0.3) {
                currentClass = 'on-dark-bg';
            } else if (contactSection && scrollY >= contactSection.offsetTop - windowHeight * 0.3) {
                currentClass = 'on-light-bg';
            }
            
            // Aplicar clase solo si ha cambiado
            if (!hamburger.classList.contains(currentClass)) {
                hamburger.classList.remove('on-green-bg', 'on-light-bg', 'on-dark-bg');
                hamburger.classList.add(currentClass);
                const deviceType = window.innerWidth <= 768 ? 'Móvil' : 'Escritorio';
                console.log(`${deviceType} - Hamburger color: ${currentClass} (scroll: ${scrollY})`);
            }
        };
        
        // Usar método de scroll
        window.addEventListener('scroll', updateHamburgerColorByScroll);
        // Ejecutar una vez al cargar
        updateHamburgerColorByScroll();

        // Inicialización diferenciada para móvil vs escritorio
        const initializeHamburgerBehavior = () => {
            const isMobile = window.innerWidth <= 768;
            
            if (isMobile) {
                // MÓVIL: Verde siempre cuando el menú está activo
                hamburger.classList.add('mobile-mode');
                
                // Forzar estilos para móvil
                const lines = hamburger.querySelectorAll('.line');
                lines.forEach(line => {
                    if (hamburger.classList.contains('is-active')) {
                        line.style.backgroundColor = 'var(--lime-green)';
                        line.style.boxShadow = '0 0 4px rgba(162,224,72,0.6)';
                    }
                });
                
                console.log('🔧 Hamburger configurado para móvil');
            } else {
                // ESCRITORIO: Cambio dinámico según fondo
                hamburger.classList.remove('mobile-mode');
                console.log('🔧 Hamburger configurado para escritorio');
            }
        };
        
        // Ejecutar inmediatamente
        initializeHamburgerBehavior();
        
        // También ejecutar en resize
        window.addEventListener('resize', initializeHamburgerBehavior);
    }

    // --- CUSTOM CURSOR - SOLO ESCRITORIO --- 
    const initCustomCursor = () => {
        const cursor = document.querySelector('.custom-cursor');
        console.log('🖱️ Inicializando cursor personalizado...');
        
        if (!cursor) {
            console.warn('⚠️ Elemento cursor no encontrado');
            return;
        }

        if (window.innerWidth > 768) {
            console.log('✅ Activando cursor para escritorio');
            cursor.style.display = 'block';
            document.body.classList.add('custom-cursor-active');
            
            // Limpiar eventos previos
            if (cursor._mousemoveHandler) {
                window.removeEventListener('mousemove', cursor._mousemoveHandler);
            }

            // Handler de movimiento
            const mousemoveHandler = (e) => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            };
            cursor._mousemoveHandler = mousemoveHandler;
            window.addEventListener('mousemove', mousemoveHandler);

            // Efectos hover
            const interactiveElements = document.querySelectorAll('a, button, .card');
            interactiveElements.forEach(el => {
                el.removeEventListener('mouseenter', el._cursorEnter);
                el.removeEventListener('mouseleave', el._cursorLeave);
                
                el._cursorEnter = () => cursor.classList.add('hover');
                el._cursorLeave = () => cursor.classList.remove('hover');
                
                el.addEventListener('mouseenter', el._cursorEnter);
                el.addEventListener('mouseleave', el._cursorLeave);
            });
        } else {
            cursor.style.display = 'none';
            document.body.classList.remove('custom-cursor-active');
            console.log('🚫 Cursor deshabilitado en móvil');
        }
    };

    // Inicializar cursor
    initCustomCursor();

    // Responsive cursor handling
    window.addEventListener('resize', () => {
        clearTimeout(window.cursorResizeTimeout);
        window.cursorResizeTimeout = setTimeout(initCustomCursor, 100);
    });

    console.log('✅ Scripts simplificados cargados');
});
