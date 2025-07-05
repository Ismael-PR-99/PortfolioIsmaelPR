document.addEventListener('DOMContentLoaded', () => {

    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });

    // --- CURSOR PERSONALIZADO ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    const interactiveElements = document.querySelectorAll('.interactive');

    // Ocultar el cursor inicialmente y prepararlo para la animación
    gsap.set([cursorDot, cursorOutline], { opacity: 0 });

    // Usamos GSAP para una animación más fluida y fiable
    document.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;

        // Hacemos visible el cursor en el primer movimiento
        if (gsap.getProperty(cursorDot, "opacity") === 0) {
            gsap.to([cursorDot, cursorOutline], { opacity: 1, duration: 0.3 });
        }

        // Mueve el punto central instantáneamente
        gsap.to(cursorDot, { 
            x: clientX, 
            y: clientY, 
            duration: 0.1, 
            ease: 'power2.out' 
        });

        // Mueve el contorno con un ligero retraso para el efecto de "arrastre"
        gsap.to(cursorOutline, { 
            x: clientX, 
            y: clientY, 
            duration: 0.4, 
            ease: 'power2.out' 
        });
    });

    // Añade la clase 'interactive' a todos los enlaces y botones para que el cursor reaccione
    document.querySelectorAll('a, button, .interactive').forEach(el => {
        el.addEventListener('mouseover', () => {
            gsap.to(cursorOutline, { 
                scale: 1.5, 
                backgroundColor: 'rgba(61, 218, 215, 0.1)',
                duration: 0.3
            });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(cursorOutline, { 
                scale: 1, 
                backgroundColor: 'transparent',
                duration: 0.3
            });
        });
    });


    // --- BARRA DE PROGRESO DE SCROLL ---
    const progressBar = document.getElementById('scroll-progress-bar');
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = `${scrollPercentage}%`;
    });

    // --- ANIMACIÓN DE TEXTO CON GSAP ---
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        text.split('').forEach(char => {
            const span = document.createElement('span');
            // Si el caracter es un espacio, usamos un espacio de no ruptura (&nbsp;)
            // para asegurar que el span tenga anchura y el espacio se muestre.
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = char;
            }
            span.style.display = 'inline-block';
            heroTitle.appendChild(span);
        });

        gsap.from('.hero h1 span', {
            y: 20,
            opacity: 0,
            duration: 1,
            ease: 'power3.out',
            stagger: 0.05
        });
    }

    // --- INICIALIZACIÓN DE AOS ---
    AOS.init({
        duration: 1000, // Duración de la animación
        once: true,     // La animación solo ocurre una vez
        offset: 100,    // Offset (en px) desde el borde de la ventana
    });

    // --- MENÚ MODAL MÓVIL ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu-modal');
    const backdrop = document.getElementById('mobile-menu-backdrop');
    const closeButton = document.getElementById('mobile-menu-close-btn');
    const menuLinks = mobileMenu.querySelectorAll('a');

    const openMenu = () => {
        gsap.to(backdrop, { opacity: 1, duration: 0.3, onStart: () => backdrop.classList.remove('hidden') });
        gsap.to(mobileMenu, { 
            x: '0%', 
            opacity: 1, 
            duration: 0.4, 
            ease: 'power3.out',
            onStart: () => mobileMenu.classList.remove('hidden') 
        });
        document.body.classList.add('overflow-hidden'); // Evita el scroll del body
    };

    const closeMenu = () => {
        gsap.to(mobileMenu, { 
            x: '100%', 
            opacity: 0, 
            duration: 0.3, 
            ease: 'power3.in',
            onComplete: () => mobileMenu.classList.add('hidden') 
        });
        gsap.to(backdrop, { 
            opacity: 0, 
            duration: 0.3, 
            onComplete: () => backdrop.classList.add('hidden') 
        });
        document.body.classList.remove('overflow-hidden');
    };

    menuToggle.addEventListener('click', openMenu);
    closeButton.addEventListener('click', closeMenu);
    backdrop.addEventListener('click', closeMenu);

    // Cierra el menú al hacer clic en un enlace para navegar a la sección
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });


    // --- SCROLL SUAVE ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- THEME TOGGLE ---
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');
    const leavesContainer = document.querySelector('.leaves-container');

    // Función para aplicar el tema
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
            sunIcon.classList.add('hidden');
            moonIcon.classList.remove('hidden');
            leavesContainer.classList.add('spring');
        } else {
            document.documentElement.removeAttribute('data-theme');
            sunIcon.classList.remove('hidden');
            moonIcon.classList.add('hidden');
            leavesContainer.classList.remove('spring');
        }
    };

    // Cargar el tema guardado al iniciar
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Event listener para el botón
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // --- ANIMACIÓN DE SALIDA ---
    document.querySelectorAll('a[href]:not([href^="#"])').forEach(link => {
        link.addEventListener('click', function(e) {
            const destination = this.href;
            const isExternal = this.target === '_blank';

            // Si es un enlace externo que se abre en una nueva pestaña, no hacemos la animación de salida.
            if (isExternal) {
                return;
            }

            // Prevenir la navegación inmediata para poder animar la salida
            e.preventDefault();

            // Animación de fade-out con GSAP
            gsap.to(document.body, {
                opacity: 0,
                duration: 0.5, // Duración de la animación en segundos
                ease: 'power1.in',
                onComplete: () => {
                    // Navegar a la nueva página cuando la animación termine
                    window.location.href = destination;
                }
            });
        });
    });

    // ========= Starry Background Animation =========
    (function() {
        const canvas = document.getElementById('stars-bg');
        const ctx = canvas.getContext('2d');
        let stars = [];
        const numStars = 150;

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        function createStars() {
            stars = [];
            for (let i = 0; i < numStars; i++) {
                stars.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 1.5 + 0.5,
                    alpha: Math.random(),
                    delta: Math.random() * 0.02 + 0.005
                });
            }
        }

        function drawStars() {
            // Fill canvas background black for dark mode
            ctx.fillStyle = '#000';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            stars.forEach(star => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
                ctx.fill();
                star.alpha += star.delta;
                if (star.alpha <= 0 || star.alpha >= 1) star.delta = -star.delta;
            });
        }

        function animateStars() {
            if (document.documentElement.getAttribute('data-theme') === 'dark') {
                drawStars();
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            requestAnimationFrame(animateStars);
        }

        createStars();
        animateStars();
    })();

});
