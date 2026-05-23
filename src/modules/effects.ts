const PARTICLE_COUNT = 15;

function createParticles(e: MouseEvent): void {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const particle = document.createElement('div');
    const size = 4 + Math.random() * 8;
    const hue = 60 + Math.random() * 60;

    particle.style.cssText = `
      position:fixed;width:${size}px;height:${size}px;
      background:hsl(${hue},80%,60%);border-radius:50%;
      pointer-events:none;z-index:9999;
      left:${e.clientX - size / 2}px;top:${e.clientY - size / 2}px;
      box-shadow:0 0 ${size * 2}px hsl(${hue},80%,60%);
      animation:fadeOut 1.5s ease forwards;
    `;

    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 1600);
  }
}

function showSuccessMessage(): void {
  const msg = document.createElement('div');
  msg.textContent = '¡Excelente! 🎉';
  msg.style.cssText = `
    position:fixed;left:50%;top:30%;transform:translate(-50%,-50%);
    background:linear-gradient(45deg,var(--secondary,#a2e048),var(--accent,#8e7cc3));
    color:var(--bg-primary,#1a1a2e);padding:15px 25px;border-radius:25px;
    font-weight:bold;font-size:1.2rem;z-index:10000;pointer-events:none;
    box-shadow:0 10px 30px rgba(0,0,0,.3);animation:fadeOut 2s ease forwards;
  `;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

export function initCVButtonEffects(): void {
  const btn = document.querySelector<HTMLElement>('.btn-cv-contact');
  if (!btn) return;

  btn.addEventListener('click', (e) => {
    createParticles(e);
    showSuccessMessage();
  });
}
