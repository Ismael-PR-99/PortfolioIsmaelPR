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
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                console.log(`Clic en enlace del menú: ${href}`);
                
                // Permitir que el scroll suave se ejecute primero
                setTimeout(() => {
                    if (navPanel.classList.contains('is-active')) {
                        console.log('Cerrando menú después del scroll');
                        toggleMenu();
                    }
                }, 300); // Aumentar delay para dar más tiempo al scroll
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

    // --- DEBUG: Verificar que todos los elementos existan ---
    console.log('=== DEBUG MENÚ HAMBURGUESA ===');
    console.log('Hamburger element:', hamburger);
    console.log('Nav panel element:', navPanel);
    console.log('Nav links found:', navLinks.length);
    
    // Verificar que todas las secciones de destino existan
    const targetSections = ['#hero', '#experience', '#projects', '#contact'];
    targetSections.forEach(target => {
        const element = document.querySelector(target);
        console.log(`Sección ${target}:`, element ? 'ENCONTRADA' : 'NO ENCONTRADA');
        if (element) {
            console.log(`  - Posición: ${element.offsetTop}px`);
            console.log(`  - Altura: ${element.offsetHeight}px`);
        }
    });
    console.log('=== FIN DEBUG ===');

    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Calcular offset para header fijo (ajustar según el dispositivo)
                const isMobile = window.innerWidth <= 768;
                const headerHeight = isMobile ? 60 : 80;
                const elementPosition = targetElement.offsetTop - headerHeight;
                
                // Scroll suave con offset
                window.scrollTo({
                    top: Math.max(0, elementPosition),
                    behavior: 'smooth'
                });
                
                console.log(`Navegando a: ${targetId}, posición: ${elementPosition}, móvil: ${isMobile}`);
                
                // Método alternativo para navegadores que no soporten scrollTo smooth
                if (!('scrollBehavior' in document.documentElement.style)) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            } else {
                console.warn(`Elemento no encontrado: ${targetId}`);
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
                        const deviceType = window.innerWidth <= 768 ? 'Móvil' : 'Escritorio';
                        console.log(`${deviceType} - Cambiando hamburger a: ${currentSection.class}`);
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
                                const deviceType = window.innerWidth <= 768 ? 'Móvil' : 'Escritorio';
                                console.log(`${deviceType} - Resize - Cambiando hamburger a: ${currentSection.class}`);
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

        // Método alternativo: Detección por scroll position (para móvil y escritorio)
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
                console.log(`${deviceType} Scroll: Cambiando hamburger a: ${currentClass} at scroll: ${scrollY}`);
            }
        };
        
        // Usar método de scroll para ambos móvil y escritorio como respaldo
        window.addEventListener('scroll', updateHamburgerColorByScroll);
        // Ejecutar una vez al cargar para establecer el estado inicial
        updateHamburgerColorByScroll();
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

    // Inicialización diferenciada para móvil vs escritorio
    const initializeHamburgerBehavior = () => {
        if (!hamburger) return;
        
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile) {
            // MÓVIL: Verde siempre
            hamburger.classList.remove('on-light-bg', 'on-dark-bg');
            hamburger.classList.add('on-green-bg', 'mobile-mode');
            
            // Forzar estilos inline como respaldo en móvil
            const lines = hamburger.querySelectorAll('.line');
            lines.forEach(line => {
                line.style.backgroundColor = 'var(--lime-green)';
                line.style.boxShadow = '0 0 4px rgba(162,224,72,0.6)';
            });
            
            console.log('Hamburger MÓVIL: Verde forzado');
        } else {
            // ESCRITORIO: Comportamiento normal según sección
            hamburger.classList.remove('mobile-mode');
            hamburger.classList.add('on-green-bg'); // Estado inicial in hero
            
            // Limpiar estilos inline para permitir CSS normal en escritorio
            const lines = hamburger.querySelectorAll('.line');
            lines.forEach(line => {
                line.style.backgroundColor = '';
                line.style.boxShadow = '';
            });
            
            console.log('Hamburger ESCRITORIO: Comportamiento dinámico activado');
        }
    };
    
    // Ejecutar INMEDIATAMENTE
    initializeHamburgerBehavior();
    
    // También ejecutar en resize y load
    window.addEventListener('resize', initializeHamburgerBehavior);
    window.addEventListener('load', initializeHamburgerBehavior);
    
    // --- EFECTOS DECORATIVOS ADICIONALES ---
    
    // Efecto de Partículas Flotantes
    const createFloatingParticles = () => {
        const heroSection = document.querySelector('.hero');
        if (!heroSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'floating-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Crear 20 partículas
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 2}px;
                height: ${Math.random() * 6 + 2}px;
                background: rgba(162, 224, 72, ${Math.random() * 0.3 + 0.1});
                border-radius: 50%;
                animation: float-${i} ${Math.random() * 20 + 10}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            // Añadir keyframes únicos para cada partícula
            const style = document.createElement('style');
            style.textContent = `
                @keyframes float-${i} {
                    0% { transform: translateY(0px) translateX(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { transform: translateY(-100vh) translateX(${Math.random() * 200 - 100}px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            particlesContainer.appendChild(particle);
        }
        
        heroSection.appendChild(particlesContainer);
    };
    
    // Efecto de Ondas en Cards
    const addRippleEffect = () => {
        const cards = document.querySelectorAll('.card, .project-featured-card');
        
        cards.forEach(card => {
            card.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: radial-gradient(circle, rgba(162, 224, 72, 0.3) 0%, transparent 70%);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s ease-out;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                
                // Añadir keyframes del ripple
                if (!document.querySelector('#ripple-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'ripple-keyframes';
                    style.textContent = `
                        @keyframes ripple {
                            to { transform: scale(2); opacity: 0; }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
                setTimeout(() => ripple.remove(), 600);
            });
        });
    };
    
    // Efecto de Texto Dinámico
    const createTypingEffect = () => {
        const subtitle = document.querySelector('.hero-text p:first-of-type');
        if (!subtitle) return;
        
        const text = subtitle.innerHTML;
        subtitle.innerHTML = '';
        
        const span = document.createElement('span');
        span.className = 'typing-text';
        subtitle.appendChild(span);
        
        // Añadir cursor parpadeante
        const cursor = document.createElement('span');
        cursor.className = 'typing-cursor';
        cursor.textContent = '|';
        cursor.style.cssText = `
            animation: blink 1s infinite;
            color: var(--secondary);
        `;
        subtitle.appendChild(cursor);
        
        // Añadir keyframes del cursor
        const style = document.createElement('style');
        style.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
        
        // Efecto de tipeo
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                span.innerHTML = text.slice(0, i + 1);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                setTimeout(() => cursor.style.display = 'none', 2000);
            }
        };
        
        // Iniciar después de 1 segundo
        setTimeout(typeWriter, 1000);
    };
    
    // Efecto de Scroll Magnético en Botones
    const addMagneticEffect = () => {
        const buttons = document.querySelectorAll('.btn, .btn-download, .btn-primary, .btn-secondary');
        
        buttons.forEach(button => {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                
                this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0px, 0px) scale(1)';
            });
        });
    };
    
    // Efecto de Glitch en el Título
    const addGlitchEffect = () => {
        const title = document.querySelector('.hero-text h1');
        if (!title) return;
        
        const originalText = title.textContent;
        
        title.addEventListener('mouseenter', function() {
            let iteration = 0;
            const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            const glitchInterval = setInterval(() => {
                this.textContent = originalText
                    .split('')
                    .map((char, index) => {
                        if (index < iteration) return originalText[index];
                        return glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    })
                    .join('');
                
                if (iteration >= originalText.length) {
                    clearInterval(glitchInterval);
                    this.textContent = originalText;
                }
                
                iteration += 1/3;
            }, 30);
        });
    };
    
    // Efecto de Parallax en Blobs Decorativos
    const addBlobParallax = () => {
        const blobs = document.querySelectorAll('.decor-blob');
        
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            blobs.forEach((blob, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = -(scrollY * speed);
                blob.style.transform = `translateY(${yPos}px) rotate(${scrollY * 0.02}deg)`;
            });
        });
    };
    
    // Efecto de Zoom en Imágenes de Tecnología
    const addTechIconsHover = () => {
        const techIcons = document.querySelectorAll('.project-tech img');
        
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.3) rotate(5deg)';
                this.style.filter = 'brightness(1.2) saturate(1.3)';
                this.style.zIndex = '10';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1) rotate(0deg)';
                this.style.filter = 'brightness(1) saturate(1)';
                this.style.zIndex = '1';
            });
        });
    };
    
    // Efecto de Brillo en Enlaces Sociales
    const addSocialGlow = () => {
        const socialLinks = document.querySelectorAll('.footer-social-links a');
        
        socialLinks.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.filter = 'drop-shadow(0 0 10px var(--secondary))';
                this.style.transform = 'scale(1.2) rotate(15deg)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.filter = 'none';
                this.style.transform = 'scale(1) rotate(0deg)';
            });
        });
    };
    
    // Inicializar todos los efectos
    setTimeout(() => {
        createFloatingParticles();
        addRippleEffect();
        createTypingEffect();
        addMagneticEffect();
        addGlitchEffect();
        addBlobParallax();
        addTechIconsHover();
        addSocialGlow();
    }, 500);
    
    // --- ANIMACIONES ESPECÍFICAS PARA SECCIÓN EXPERIENCIA ---
    
    // Efecto de entrada escalonada para las cards de experiencia
    const animateExperienceCards = () => {
        const experienceSection = document.getElementById('experience');
        const cards = experienceSection ? experienceSection.querySelectorAll('.card') : [];
        
        if (cards.length === 0) return;
        
        // Observer para activar animaciones cuando la sección sea visible
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionCards = entry.target.querySelectorAll('.card');
                    
                    sectionCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.transform = 'translateY(0px) scale(1)';
                            card.style.opacity = '1';
                            card.style.filter = 'blur(0px)';
                            
                            // Efecto de pulso al aparecer
                            setTimeout(() => {
                                card.style.transform = 'translateY(0px) scale(1.02)';
                                setTimeout(() => {
                                    card.style.transform = 'translateY(0px) scale(1)';
                                }, 200);
                            }, 100);
                            
                        }, index * 200); // Retraso escalonado
                    });
                    
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '-50px'
        });
        
        // Preparar cards para animación (estado inicial)
        cards.forEach(card => {
            card.style.transform = 'translateY(50px) scale(0.95)';
            card.style.opacity = '0';
            card.style.filter = 'blur(5px)';
            card.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        });
        
        cardObserver.observe(experienceSection);
    };
    
    // Efecto de hover con profundidad en cards
    const addCardDepthEffect = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            // Efecto hover con elevación
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                this.style.zIndex = '10';
                
                // Efecto de brillo en el borde
                this.style.border = '2px solid var(--secondary)';
                this.style.borderImage = 'linear-gradient(45deg, var(--secondary), var(--highlight)) 1';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0px) scale(1)';
                this.style.boxShadow = '';
                this.style.zIndex = '1';
                this.style.border = '';
                this.style.borderImage = '';
            });
            
            // Efecto de movimiento del mouse dentro de la card
            card.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateX = (y - centerY) / centerY * 5;
                const rotateY = (x - centerX) / centerX * 5;
                
                this.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
            });
        });
    };
    
    // Animación de contador para años de experiencia
    const addCounterAnimation = () => {
        const experienceItems = document.querySelectorAll('.experience-item');
        
        experienceItems.forEach(item => {
            const metaText = item.querySelector('.meta');
            if (metaText && metaText.textContent.includes('2023-2025')) {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            // Efecto de contador animado
                            const yearSpan = document.createElement('span');
                            yearSpan.className = 'animated-year';
                            yearSpan.style.color = 'var(--secondary)';
                            yearSpan.style.fontWeight = 'bold';
                            
                            let currentYear = 2023;
                            const targetYear = 2025;
                            
                            const countInterval = setInterval(() => {
                                yearSpan.textContent = currentYear;
                                if (currentYear >= targetYear) {
                                    clearInterval(countInterval);
                                    yearSpan.textContent = '2023-2025';
                                }
                                currentYear++;
                            }, 500);
                            
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                observer.observe(item);
            }
        });
    };
    
    // Efecto de resaltado de tecnologías al hacer hover
    const addTechHighlight = () => {
        const highlights = document.querySelectorAll('.card .highlight');
        
        highlights.forEach(highlight => {
            highlight.addEventListener('mouseenter', function() {
                this.style.background = 'linear-gradient(45deg, var(--secondary), var(--highlight))';
                this.style.webkitBackgroundClip = 'text';
                this.style.webkitTextFillColor = 'transparent';
                this.style.transform = 'scale(1.05)';
                this.style.textShadow = '0 0 10px rgba(162, 224, 72, 0.5)';
                this.style.transition = 'all 0.3s ease';
            });
            
            highlight.addEventListener('mouseleave', function() {
                this.style.background = '';
                this.style.webkitBackgroundClip = '';
                this.style.webkitTextFillColor = '';
                this.style.transform = 'scale(1)';
                this.style.textShadow = '';
            });
        });
    };
    
    // Efecto de progreso animado para habilidades
    const addSkillProgressBars = () => {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach((card, cardIndex) => {
            const h3 = card.querySelector('h3');
            if (h3 && (h3.textContent.includes('Experiencia') || h3.textContent.includes('Educación'))) {
                
                // Crear barra de progreso visual
                const progressContainer = document.createElement('div');
                progressContainer.className = 'skill-progress-container';
                progressContainer.style.cssText = `
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4px;
                    background: rgba(162, 224, 72, 0.2);
                    overflow: hidden;
                `;
                
                const progressBar = document.createElement('div');
                progressBar.className = 'skill-progress-bar';
                progressBar.style.cssText = `
                    height: 100%;
                    background: linear-gradient(90deg, var(--secondary), var(--highlight));
                    width: 0%;
                    transition: width 2s ease-out;
                    box-shadow: 0 0 10px rgba(162, 224, 72, 0.5);
                `;
                
                progressContainer.appendChild(progressBar);
                card.style.position = 'relative';
                card.appendChild(progressContainer);
                
                // Observer para animar cuando sea visible
                const progressObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            setTimeout(() => {
                                const percentage = cardIndex === 1 ? '85%' : cardIndex === 2 ? '95%' : '90%';
                                progressBar.style.width = percentage;
                            }, cardIndex * 300);
                            
                            progressObserver.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.5 });
                
                progressObserver.observe(card);
            }
        });
    };
    
    // Partículas específicas para la sección de experiencia
    const addExperienceParticles = () => {
        const experienceSection = document.getElementById('experience');
        if (!experienceSection) return;
        
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'experience-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        // Crear partículas en forma de código
        const codeSymbols = ['</>', '{', '}', '()', '[]', '<html>', '<css>', '<js>'];
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            particle.style.cssText = `
                position: absolute;
                color: rgba(162, 224, 72, 0.1);
                font-family: 'Courier New', monospace;
                font-size: ${Math.random() * 14 + 10}px;
                font-weight: bold;
                animation: experienceFloat${i} ${Math.random() * 15 + 20}s linear infinite;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
            `;
            
            // Keyframes únicos
            const style = document.createElement('style');
            style.textContent = `
                @keyframes experienceFloat${i} {
                    0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
                    10% { opacity: 0.1; }
                    90% { opacity: 0.1; }
                    100% { transform: translateY(-50px) rotate(360deg); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
            
            particlesContainer.appendChild(particle);
        }
        
        experienceSection.style.position = 'relative';
        experienceSection.appendChild(particlesContainer);
    };
    
    // Inicializar animaciones de experiencia con retraso
    setTimeout(() => {
        animateExperienceCards();
        addCardDepthEffect();
        addCounterAnimation();
        addTechHighlight();
        addSkillProgressBars();
        addExperienceParticles();
    }, 1000);
    
    // --- EFECTO BOTÓN CV QUE PERSIGUE EL CURSOR ---
    const addCVButtonChaseEffect = () => {
        const cvButton = document.querySelector('.btn-download');
        const contactSection = document.getElementById('contact');
        
        if (!cvButton || !contactSection) return;
        
        let isChasing = false;
        let mouseX = 0;
        let mouseY = 0;
        let buttonX = 0;
        let buttonY = 0;
        let animationId;
        
        // Configuración super proactiva - el botón será muy perseguidor
        const chaseSpeed = 0.25; // Velocidad muy alta para persecución agresiva
        const chaseDistance = 400; // Área de activación mucho más amplia
        const returnSpeed = 0.08; // Retorno más lento para mantener "interés"
        const smoothingFactor = 0.4; // Mayor factor para movimiento más directo
        const minDistance = 15; // Distancia mínima reducida para seguir muy de cerca
        const maxSpeed = 15; // Velocidad máxima aumentada para movimientos rápidos
        const proactiveDistance = 300; // Nueva distancia para comportamiento proactivo
        const escapeDistance = 80; // Distancia a la que el botón "escapa" juguetonamente
        
        // Variables adicionales para comportamiento proactivo
        let isEscaping = false;
        let escapeStartTime = 0;
        let lastMouseDirection = { x: 0, y: 0 };
        let mouseSpeed = 0;
        let anticipationMode = false;
        let playfulnessLevel = 0;
        
        // Variables para optimización de rendimiento
        let lastTime = performance.now();
        let deltaTime = 0;
        const targetFPS = 60;
        const frameTime = 1000 / targetFPS;
        
        // Guardar posición original del botón
        const originalRect = cvButton.getBoundingClientRect();
        const originalX = originalRect.left + originalRect.width / 2;
        const originalY = originalRect.top + originalRect.height / 2;
        
        // Preparar el botón para animación
        cvButton.style.position = 'relative';
        cvButton.style.transition = 'none';
        cvButton.style.zIndex = '1000';
        
        // Observer mejorado para activar el efecto cuando la sección sea visible
        const chaseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Verificar si es dispositivo móvil para ajustar comportamiento
                    const isMobile = window.innerWidth <= 768;
                    if (isMobile) {
                        // En móvil, hacer el efecto más sutil
                        chaseDistance = 150;
                        chaseSpeed *= 0.7;
                    }
                    isChasing = true;
                    startChaseAnimation();
                } else {
                    isChasing = false;
                    returnToOriginalPosition();
                }
            });
        }, {
            threshold: 0.2, // Activar más temprano
            rootMargin: '50px' // Margen adicional para activación suave
        });
        
        // Función para predecir movimiento del mouse
        const predictMouseMovement = (currentX, currentY, directionX, directionY, speed) => {
            const prediction = speed * 2; // Factor de predicción
            return {
                x: currentX + (directionX * prediction),
                y: currentY + (directionY * prediction)
            };
        };
        
        // Función para determinar si el botón debe "escapar" juguetonamente
        const shouldEscape = (distance, mouseSpeed) => {
            return distance < escapeDistance && mouseSpeed > 50 && Math.random() < 0.3;
        };
        
        // Función para calcular comportamiento proactivo
        const getProactiveBehavior = (distance, mouseSpeed) => {
            if (distance > proactiveDistance) {
                return 'attract'; // Atraer al usuario desde lejos
            } else if (distance < escapeDistance && mouseSpeed > 100) {
                return 'escape'; // Escapar juguetonamente
            } else if (distance < minDistance * 2) {
                return 'dance'; // Bailar cerca del cursor
            } else {
                return 'chase'; // Perseguir normalmente
            }
        };
        
        // Función de easing suave para movimientos más naturales
        const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
        const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        
        // Función para limitar velocidad y evitar saltos
        const clampVector = (x, y, maxLength) => {
            const length = Math.sqrt(x * x + y * y);
            if (length > maxLength) {
                return { x: (x / length) * maxLength, y: (y / length) * maxLength };
            }
            return { x, y };
        };
        
        // Función para calcular distancia entre dos puntos
        const getDistance = (x1, y1, x2, y2) => {
            return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
        };
        
        // Función de persecución optimizada con control de tiempo y fluidez mejorada
        const chaseAnimation = (currentTime) => {
            if (!isChasing) return;
            
            // Control de framerate para fluidez consistente
            deltaTime = currentTime - lastTime;
            if (deltaTime < frameTime) {
                animationId = requestAnimationFrame(chaseAnimation);
                return;
            }
            lastTime = currentTime;
            
            const currentRect = cvButton.getBoundingClientRect();
            const currentButtonX = currentRect.left + currentRect.width / 2;
            const currentButtonY = currentRect.top + currentRect.height / 2;
            
            const distance = getDistance(mouseX, mouseY, currentButtonX, currentButtonY);
            
            if (distance < chaseDistance && distance > minDistance) {
                // Calcular vector de dirección con suavizado avanzado
                const deltaX = mouseX - currentButtonX;
                const deltaY = mouseY - currentButtonY;
                
                // Normalizar la distancia para interpolación suave
                const normalizedDistance = Math.min(distance / chaseDistance, 1);
                const easeFacto = easeInOutCubic(1 - normalizedDistance);
                
                // Calcular target con factor de suavizado dinámico
                const dynamicSmoothing = smoothingFactor * (1 + easeFacto * 0.5);
                const targetX = deltaX * dynamicSmoothing;
                const targetY = deltaY * dynamicSmoothing;
                
                // Limitar velocidad máxima para evitar saltos
                const clampedTarget = clampVector(targetX - buttonX, targetY - buttonY, maxSpeed);
                
                // Aplicar interpolación exponencial mejorada con deltaTime
                const timeMultiplier = deltaTime / 16; // Normalizar a 60fps
                const adaptiveSpeed = chaseSpeed * timeMultiplier;
                
                buttonX += clampedTarget.x * adaptiveSpeed;
                buttonY += clampedTarget.y * adaptiveSpeed;
                
                // Efectos visuales más fluidos y graduales
                const intensity = Math.max(0, easeFacto);
                const scale = 1 + (intensity * 0.2); // Escala más responsiva
                const shadowIntensity = 0.2 + (intensity * 0.5);
                const glowRadius = 15 + intensity * 25;
                
                // Aplicar transformación con hardware acceleration
                cvButton.style.transform = `translate3d(${buttonX}px, ${buttonY}px, 0) scale(${scale})`;
                cvButton.style.boxShadow = `
                    0 ${3 + intensity * 12}px ${glowRadius}px rgba(162, 224, 72, ${shadowIntensity}),
                    0 0 ${glowRadius * 0.8}px rgba(162, 224, 72, ${shadowIntensity * 0.6})
                `;
                cvButton.style.filter = `brightness(${1 + intensity * 0.15}) saturate(${1 + intensity * 0.2})`;
                
                // Animación de emoción más sofisticada
                if (intensity > 0.8) {
                    cvButton.style.animation = 'cvButtonExcited 0.6s ease-in-out infinite';
                } else if (intensity > 0.5) {
                    cvButton.style.animation = 'cvButtonExcited 1s ease-in-out infinite';
                } else if (intensity > 0.2) {
                    cvButton.style.animation = 'cvButtonExcited 1.5s ease-in-out infinite';
                } else {
                    cvButton.style.animation = '';
                }
                
                // Añadir keyframes mejorados si no existen
                if (!document.querySelector('#cv-button-excited-keyframes')) {
                    const style = document.createElement('style');
                    style.id = 'cv-button-excited-keyframes';
                    style.textContent = `
                        @keyframes cvButtonExcited {
                            0%, 100% { 
                                filter: brightness(1) hue-rotate(0deg) saturate(1); 
                                transform: translate(${buttonX}px, ${buttonY}px) scale(${scale}) rotate(0deg);
                            }
                            25% { 
                                filter: brightness(1.1) hue-rotate(5deg) saturate(1.1); 
                                transform: translate(${buttonX}px, ${buttonY}px) scale(${scale * 1.02}) rotate(1deg);
                            }
                            50% { 
                                filter: brightness(1.15) hue-rotate(8deg) saturate(1.15); 
                                transform: translate(${buttonX}px, ${buttonY}px) scale(${scale * 1.03}) rotate(0deg);
                            }
                            75% { 
                                filter: brightness(1.1) hue-rotate(5deg) saturate(1.1); 
                                transform: translate(${buttonX}px, ${buttonY}px) scale(${scale * 1.02}) rotate(-1deg);
                            }
                        }
                    `;
                    document.head.appendChild(style);
                }
                
            } else if (distance >= chaseDistance) {
                // Retorno suave y natural con easing exponencial
                const decayFactor = easeOutCubic(returnSpeed);
                buttonX *= (1 - decayFactor * timeMultiplier);
                buttonY *= (1 - decayFactor * timeMultiplier);
                
                // Efectos de transición durante el retorno
                const returnIntensity = (Math.abs(buttonX) + Math.abs(buttonY)) / 100;
                const returnScale = 1 + Math.max(0, returnIntensity * 0.08);
                
                cvButton.style.transform = `translate3d(${buttonX}px, ${buttonY}px, 0) scale(${returnScale})`;
                cvButton.style.boxShadow = `
                    0 ${2 + returnIntensity * 8}px ${10 + returnIntensity * 15}px rgba(162, 224, 72, ${Math.max(0.15, returnIntensity * 0.4)}),
                    0 0 ${8 + returnIntensity * 12}px rgba(162, 224, 72, ${Math.max(0.1, returnIntensity * 0.25)})
                `;
                cvButton.style.filter = `brightness(${1 + returnIntensity * 0.05}) saturate(${1 + returnIntensity * 0.1})`;
                cvButton.style.animation = '';
            }
            
            // Usar requestAnimationFrame con timestamp para fluidez óptima
            animationId = requestAnimationFrame(chaseAnimation);
        };
        
        // Función para iniciar la animación con timestamp inicial
        const startChaseAnimation = () => {
            if (animationId) cancelAnimationFrame(animationId);
            lastTime = performance.now(); // Reset del tiempo
            chaseAnimation(lastTime);
        };
        
        // Función para volver a la posición original
        // Función mejorada para volver a la posición original
        const returnToOriginalPosition = () => {
            if (animationId) cancelAnimationFrame(animationId);
            
            let returnStartTime = performance.now();
            const returnDuration = 800; // Duración total del retorno en ms
            
            const returnAnimation = (currentTime) => {
                const elapsed = currentTime - returnStartTime;
                const progress = Math.min(elapsed / returnDuration, 1);
                
                // Usar easing out cubic para retorno natural
                const easedProgress = easeOutCubic(progress);
                
                // Interpolación suave hacia posición original
                const targetButtonX = buttonX * (1 - easedProgress);
                const targetButtonY = buttonY * (1 - easedProgress);
                
                buttonX = targetButtonX;
                buttonY = targetButtonY;
                
                // Efectos visuales durante el retorno
                const returnScale = 1 + (1 - easedProgress) * 0.05;
                const returnShadow = (1 - easedProgress) * 0.2;
                
                cvButton.style.transform = `translate3d(${buttonX}px, ${buttonY}px, 0) scale(${returnScale})`;
                cvButton.style.boxShadow = `
                    0 ${2 + (1 - easedProgress) * 6}px ${8 + (1 - easedProgress) * 12}px rgba(162, 224, 72, ${Math.max(0.1, returnShadow)}),
                    0 0 ${6 + (1 - easedProgress) * 10}px rgba(162, 224, 72, ${Math.max(0.05, returnShadow * 0.6)})
                `;
                cvButton.style.filter = `brightness(${1 + (1 - easedProgress) * 0.05})`;
                cvButton.style.animation = '';
                
                if (progress < 1) {
                    requestAnimationFrame(returnAnimation);
                } else {
                    // Reset completo al finalizar
                    cvButton.style.transform = 'translate3d(0, 0, 0) scale(1)';
                    cvButton.style.boxShadow = '0 4px 12px rgba(162, 224, 72, 0.3)';
                    cvButton.style.filter = '';
                    buttonX = 0;
                    buttonY = 0;
                }
            };
            
            requestAnimationFrame(returnAnimation);
        };
        
        // Event listener optimizado para el movimiento del mouse con throttling
        let mouseMoveTimeout;
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            
            // Throttling para mejorar rendimiento en dispositivos menos potentes
            if (mouseMoveTimeout) return;
            mouseMoveTimeout = setTimeout(() => {
                mouseMoveTimeout = null;
            }, 8); // ~120fps máximo para mouse tracking
        }, { passive: true });
        
        // Efecto especial mejorado cuando el usuario finalmente hace clic
        cvButton.addEventListener('click', function(e) {
            // Parar la animación de persecución temporalmente
            isChasing = false;
            
            // Efecto de "victoria" más dramático al hacer clic
            this.style.animation = 'cvButtonSuccess 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
            this.style.transform = `translate3d(${buttonX}px, ${buttonY}px, 0) scale(1.4)`;
            this.style.filter = 'brightness(1.3) saturate(1.4) hue-rotate(10deg)';
            this.style.boxShadow = `
                0 15px 35px rgba(162, 224, 72, 0.6),
                0 0 25px rgba(162, 224, 72, 0.8),
                inset 0 0 15px rgba(255, 255, 255, 0.3)
            `;
            
            // Crear partículas de celebración más sofisticadas
            for (let i = 0; i < 15; i++) {
                const particle = document.createElement('div');
                const size = 4 + Math.random() * 8;
                const hue = 60 + Math.random() * 60; // Colores dorados/verdes
                
                particle.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: hsl(${hue}, 80%, 60%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${e.clientX - size/2}px;
                    top: ${e.clientY - size/2}px;
                    box-shadow: 0 0 ${size * 2}px hsl(${hue}, 80%, 60%);
                    animation: cvClickParticle${i} ${1.5 + Math.random() * 0.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
                `;
                
                // Keyframes únicos para cada partícula con trayectorias más naturales
                const angle = (i / 15) * Math.PI * 2;
                const velocity = 100 + Math.random() * 100;
                const gravity = 50 + Math.random() * 30;
                const endX = Math.cos(angle) * velocity;
                const endY = Math.sin(angle) * velocity + gravity;
                
                const style = document.createElement('style');
                style.textContent = `
                    @keyframes cvClickParticle${i} {
                        0% { 
                            transform: translate(0, 0) scale(1) rotate(0deg); 
                            opacity: 1; 
                        }
                        50% {
                            transform: translate(${endX * 0.7}px, ${endY * 0.3}px) scale(1.2) rotate(180deg);
                            opacity: 0.8;
                        }
                        100% { 
                            transform: translate(${endX}px, ${endY}px) scale(0) rotate(360deg); 
                            opacity: 0; 
                        }
                    }
                `;
                document.head.appendChild(style);
                document.body.appendChild(particle);
                
                // Limpiar partícula después de la animación
                setTimeout(() => {
                    if (particle.parentNode) particle.parentNode.removeChild(particle);
                    if (style.parentNode) style.parentNode.removeChild(style);
                }, 2000);
            }
            
            // Mostrar mensaje de felicitación temporal
            const message = document.createElement('div');
            message.textContent = '¡Excelente! 🎉';
            message.style.cssText = `
                position: fixed;
                left: 50%;
                top: 30%;
                transform: translate(-50%, -50%);
                background: linear-gradient(45deg, var(--secondary), var(--accent));
                color: var(--bg-primary);
                padding: 15px 25px;
                border-radius: 25px;
                font-weight: bold;
                font-size: 1.2rem;
                z-index: 10000;
                pointer-events: none;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
                animation: successMessage 2s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
            `;
            
            document.body.appendChild(message);
            
            // Limpiar mensaje y reactivar persecución
            setTimeout(() => {
                if (message.parentNode) message.parentNode.removeChild(message);
                isChasing = true; // Reactivar la persecución
            }, 2000);
            
            // Añadir keyframes mejorados si no existen
            if (!document.querySelector('#cv-button-success-keyframes')) {
                const style = document.createElement('style');
                style.id = 'cv-button-success-keyframes';
                style.textContent = `
                    @keyframes cvButtonSuccess {
                        0% { 
                            filter: brightness(1) hue-rotate(0deg) saturate(1); 
                            box-shadow: 0 4px 12px rgba(162, 224, 72, 0.3);
                        }
                        20% { 
                            filter: brightness(1.4) hue-rotate(30deg) saturate(1.3); 
                            box-shadow: 0 8px 25px rgba(162, 224, 72, 0.5);
                        }
                        40% { 
                            filter: brightness(1.6) hue-rotate(60deg) saturate(1.5); 
                            box-shadow: 0 12px 35px rgba(162, 224, 72, 0.7);
                        }
                        60% { 
                            filter: brightness(1.4) hue-rotate(90deg) saturate(1.3); 
                            box-shadow: 0 15px 40px rgba(162, 224, 72, 0.6);
                        }
                        80% { 
                            filter: brightness(1.2) hue-rotate(60deg) saturate(1.1); 
                            box-shadow: 0 10px 30px rgba(162, 224, 72, 0.4);
                        }
                        100% { 
                            filter: brightness(1) hue-rotate(0deg) saturate(1); 
                            box-shadow: 0 4px 12px rgba(162, 224, 72, 0.3);
                        }
                    }
                    
                    @keyframes successMessage {
                        0% { transform: translate(-50%, -50%) scale(0) rotate(-10deg); opacity: 0; }
                        20% { transform: translate(-50%, -50%) scale(1.1) rotate(2deg); opacity: 1; }
                        80% { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1; }
                        100% { transform: translate(-50%, -50%) scale(0.8) rotate(0deg); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Deshabilitar persecución temporalmente después del clic para permitir navegación
            setTimeout(() => {
                returnToOriginalPosition();
            }, 1200);
        });
        
        // Efectos de hover mejorados con transiciones suaves
        cvButton.addEventListener('mouseenter', function() {
            if (isChasing) {
                this.style.filter = 'brightness(1.2) saturate(1.15) contrast(1.1)';
                this.style.textShadow = '0 0 15px rgba(162, 224, 72, 0.8), 0 0 25px rgba(162, 224, 72, 0.4)';
                this.style.transition = 'filter 0.3s ease, text-shadow 0.3s ease';
            }
        });
        
        cvButton.addEventListener('mouseleave', function() {
            this.style.filter = '';
            this.style.textShadow = '';
            this.style.transition = 'filter 0.3s ease, text-shadow 0.3s ease';
        });
        
        // Iniciar observación
        chaseObserver.observe(contactSection);
    };
    
    // Inicializar efecto de persecución del botón CV
    setTimeout(addCVButtonChaseEffect, 2000);
});
