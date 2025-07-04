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

    // --- MENÚ HAMBURGUESA ---
    document.getElementById('menu-toggle').addEventListener('click', function() {
        const nav = document.getElementById('main-nav');
        nav.classList.toggle('hidden');
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

});
