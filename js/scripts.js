document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger-menu');
    const navPanel = document.getElementById('nav-panel');

    if (hamburger && navPanel) {
        const navLinks = navPanel.querySelectorAll('a');

        // Función para alternar el menú
        const toggleMenu = () => {
            hamburger.classList.toggle('is-active');
            navPanel.classList.toggle('is-active');
        };

        // Abrir/cerrar menú con el botón
        hamburger.addEventListener('click', toggleMenu);

        // Cerrar el menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navPanel.classList.contains('is-active')) {
                    toggleMenu();
                }
            });
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

    // --- CAMBIO DE COLOR DE HAMBURGUESA SOBRE FONDO OSCURO ---
    const projectSection = document.getElementById('projects');

    if (hamburger && projectSection) {
        const observerOptions = {
            root: null, // viewport
            threshold: 0.01, // Se activa en cuanto un píxel sea visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    hamburger.classList.add('on-dark-bg');
                } else {
                    hamburger.classList.remove('on-dark-bg');
                }
            });
        }, observerOptions);

        observer.observe(projectSection);
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
});
