document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navPanel = document.getElementById('nav-panel');
    let isMenuOpen = false;

    if (hamburger && navPanel) {
        const navLinks = navPanel.querySelectorAll('a');

        // Función para alternar el menú con efectos dinámicos
        const toggleMenu = () => {
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Abrir menú
                hamburger.classList.add('is-active');
                navPanel.classList.add('is-active');
                document.body.style.overflow = 'hidden'; // Evitar scroll
                
                // Efecto de vibración en hamburger
                hamburger.style.animation = 'hamburgerPulse 0.3s ease';
                
                // Añadir efecto de entrada a los enlaces
                navLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.transform = 'translateY(0) rotateX(0deg) scale(1)';
                        link.style.opacity = '1';
                    }, 200 + (index * 100));
                });
                
            } else {
                // Cerrar menú
                hamburger.classList.remove('is-active');
                
                // Animación de salida para los enlaces
                navLinks.forEach((link, index) => {
                    setTimeout(() => {
                        link.style.transform = 'translateY(30px) rotateX(20deg) scale(0.9)';
                        link.style.opacity = '0';
                    }, index * 50);
                });
                
                // Cerrar panel después de que terminen las animaciones
                setTimeout(() => {
                    navPanel.classList.remove('is-active');
                    document.body.style.overflow = 'auto';
                }, 300);
                
                // Reset hamburger animation
                hamburger.style.animation = '';
            }
        };

        // Abrir/cerrar menú con el botón
        hamburger.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });

        // Cerrar el menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navPanel.classList.contains('is-active')) {
                    toggleMenu();
                }
            });
        });

        // Cerrar menú con tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                toggleMenu();
            }
        });

        // Cerrar menú al hacer clic fuera
        navPanel.addEventListener('click', (e) => {
            if (e.target === navPanel) {
                toggleMenu();
            }
        });
    }

    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
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

        // Configuración diferente para móvil y escritorio
        const isMobile = window.innerWidth <= 768;
        const observerOptions = {
            root: null,
            threshold: isMobile ? 0.3 : 0.5, // Umbral más bajo en móvil
            rootMargin: isMobile ? '-50px 0px' : '-100px 0px' // Menos margen en móvil
        };

        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remover todas las clases de color
                    hamburger.classList.remove('on-green-bg', 'on-light-bg', 'on-dark-bg');
                    
                    // Encontrar la sección actual y aplicar la clase correspondiente
                    const currentSection = sections.find(section => section.element === entry.target);
                    if (currentSection) {
                        hamburger.classList.add(currentSection.class);
                        console.log(`Cambiando hamburger a: ${currentSection.class}`); // Debug
                    }
                }
            });
        }, observerOptions);

        // Observar todas las secciones
        sections.forEach(section => {
            if (section.element) {
                sectionObserver.observe(section.element);
            }
        });

        // Reconfigurar observer en cambio de orientación/tamaño
        window.addEventListener('resize', () => {
            const newIsMobile = window.innerWidth <= 768;
            if (newIsMobile !== isMobile) {
                // Recrear observer con nueva configuración
                sections.forEach(section => {
                    if (section.element) {
                        sectionObserver.unobserve(section.element);
                    }
                });
                
                // Reinicializar con nueva configuración
                const newObserverOptions = {
                    root: null,
                    threshold: newIsMobile ? 0.3 : 0.5,
                    rootMargin: newIsMobile ? '-50px 0px' : '-100px 0px'
                };
                
                const newSectionObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            hamburger.classList.remove('on-green-bg', 'on-light-bg', 'on-dark-bg');
                            const currentSection = sections.find(section => section.element === entry.target);
                            if (currentSection) {
                                hamburger.classList.add(currentSection.class);
                            }
                        }
                    });
                }, newObserverOptions);
                
                sections.forEach(section => {
                    if (section.element) {
                        newSectionObserver.observe(section.element);
                    }
                });
            }
        });

        // Método alternativo: Detección por scroll position (para móvil)
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
                console.log(`Scroll method: Cambiando hamburger a: ${currentClass} at scroll: ${scrollY}`);
            }
        };
        
        // Usar método de scroll en móvil como respaldo
        if (window.innerWidth <= 768) {
            window.addEventListener('scroll', updateHamburgerColorByScroll);
            // Ejecutar una vez al cargar para establecer el estado inicial
            updateHamburgerColorByScroll();
        }
    }

    // --- SCROLL REVEAL ANIMATION ---
    const revealSections = document.querySelectorAll('.fade-in-section');

    if (revealSections.length > 0) {
        const revealObserverOptions = {
            root: null,
            threshold: 0.15, // Se activa cuando el 15% de la sección es visible
            rootMargin: '0px'
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    observer.unobserve(entry.target); // Deja de observar una vez animado
                }
            });
        }, revealObserverOptions);

        revealSections.forEach(section => {
            revealObserver.observe(section);
        });
    }

    // --- CUSTOM CURSOR --- 
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        window.addEventListener('mousemove', e => {
            cursor.style.left = `${e.clientX}px`;
            cursor.style.top = `${e.clientY}px`;
        });

        const interactiveElements = document.querySelectorAll('a, button, .card');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
        });
    }

    // --- PARALLAX EFFECT ON HERO DECORATIONS ---
    const dots = document.querySelector('.dots-square');
    const stairs = document.querySelector('.stairs');

    if (dots && stairs) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;

            // Mueve los puntos a una velocidad lenta
            dots.style.transform = `translateY(${scrollY * 0.1}px)`;

            // Mueve las escaleras un poco más rápido, manteniendo la rotación
            stairs.style.transform = `translateY(${scrollY * 0.2}px) rotate(45deg)`;
        });
    }

    // --- PROFILE IMAGE 3D HOVER TILT ---
    const profileContainer = document.querySelector('.hero-image');
    const profileImg = profileContainer ? profileContainer.querySelector('img') : null;
    if (profileContainer && profileImg) {
        profileContainer.addEventListener('mousemove', e => {
            const rect = profileContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const midX = rect.width / 2;
            const midY = rect.height / 2;
            const rotateY = ((x - midX) / midX) * 10; // máximo 10 grados
            const rotateX = ((midY - y) / midY) * 10;
            profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        profileContainer.addEventListener('mouseleave', () => {
            profileImg.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    }

    /* Activar animación del marco de la foto de perfil */
    const profileImage = document.querySelector('.hero-image');
    if (profileImage) {
        profileImage.classList.add('animate-border');
    }

    // Inicialización específica para móvil
    const initializeMobileHamburger = () => {
        if (hamburger && window.innerWidth <= 768) {
            // Forzar el estado inicial en móvil
            hamburger.classList.remove('on-green-bg', 'on-light-bg', 'on-dark-bg');
            hamburger.classList.add('on-green-bg');
            
            // Añadir clase para identificar que está en móvil
            hamburger.classList.add('mobile-mode');
            
            console.log('Hamburger inicializado para móvil con color verde');
        }
    };
    
    // Ejecutar inmediatamente
    initializeMobileHamburger();
    
    // También ejecutar en resize
    window.addEventListener('resize', initializeMobileHamburger);
});
