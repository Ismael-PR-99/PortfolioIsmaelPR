// Menú hamburguesa
document.getElementById('menu-toggle').addEventListener('click', function() {
    const nav = document.getElementById('main-nav');
    nav.classList.toggle('hidden');
});

// Fondo estrellado animado
const canvas = document.getElementById('stars-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

const stars = [];
const starCount = 150;

for (let i = 0; i < starCount; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random(),
        speed: Math.random() * 0.5
    });
}

function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        
        // Animación de parpadeo
        star.opacity += (Math.random() - 0.5) * 0.02;
        star.opacity = Math.max(0.1, Math.min(1, star.opacity));
        
        // Movimiento lento
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    
    requestAnimationFrame(drawStars);
}

drawStars();

// Cursor trail
const trail = document.getElementById('cursorTrail');
let mouseX = 0, mouseY = 0;
let posX = 0, posY = 0;
const speed = 0.1; // suavizado

// Captura posición del puntero
document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Loop de animación del cursor trail
function animate() {
    // interpola la posición
    posX += (mouseX - posX) * speed;
    posY += (mouseY - posY) * speed;
    trail.style.transform = `translate(${posX}px, ${posY}px)`;
    requestAnimationFrame(animate);
}
animate();

// Scroll suave para los enlaces de navegación
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
