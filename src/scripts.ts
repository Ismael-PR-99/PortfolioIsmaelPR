import { initProductionDebug } from './production-debug';

// Configuración global
const CONFIG = {
  PARTICLE_COUNT: 15
} as const;

// Clase principal de la aplicación
class PortfolioApp {
  private cvButton: HTMLElement | null;
  private animationId: number | null = null;

  constructor() {
    this.cvButton = document.querySelector('.btn-cv-contact');
  }

  public init(): void {
    console.log('🚀 Inicializando PortfolioApp...');
    
    if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      initProductionDebug();
    }
    
    this.verifyElements();
    this.initializeEffects();
    this.initializeCVButtonChase();
    this.initializeScrollReveal();
    
    console.log('✅ PortfolioApp inicializada correctamente');
  }

  private verifyElements(): void {
    console.log('=== VERIFICACIÓN DE ELEMENTOS ===');
    console.log('CV button:', this.cvButton ? '✅' : '❌');
    
    const sections = ['#hero', '#experience', '#projects', '#contact'];
    sections.forEach(selector => {
      const element = document.querySelector(selector);
      console.log(`Sección ${selector}:`, element ? '✅' : '❌');
    });
  }

  private initializeEffects(): void {
    console.log('✨ Efectos inicializados');
  }

  private initializeCVButtonChase(): void {
    if (!this.cvButton) {
      console.warn('⚠️ Botón CV no encontrado');
      return;
    }

    const contactSection = document.getElementById('contact');
    if (!contactSection) {
      console.warn('⚠️ Sección de contacto no encontrada');
      return;
    }

    const chaseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('🎯 Sección de contacto visible');
        } else {
          this.returnButtonToOriginalPosition();
        }
      });
    }, { threshold: 0.3 });

    chaseObserver.observe(contactSection);

    this.cvButton.addEventListener('click', (e: MouseEvent) => {
      this.handleCVButtonClick(e);
    });
  }


  private returnButtonToOriginalPosition(): void {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    
    if (this.cvButton) {
      this.cvButton.style.transform = 'translate3d(0, 0, 0) scale(1)';
      this.cvButton.style.boxShadow = '0 4px 12px rgba(162, 224, 72, 0.3)';
      this.cvButton.style.filter = '';
    }
  }

  private handleCVButtonClick(e: MouseEvent): void {
    if (this.cvButton) {
      this.cvButton.style.animation = 'cvButtonSuccess 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      this.cvButton.style.transform = 'scale(1.4)';
      this.cvButton.style.filter = 'brightness(1.3) saturate(1.4) hue-rotate(10deg)';
      this.cvButton.style.boxShadow = `
        0 15px 35px rgba(162, 224, 72, 0.6),
        0 0 25px rgba(162, 224, 72, 0.8),
        inset 0 0 15px rgba(255, 255, 255, 0.3)
      `;
    }

    this.createSuccessParticles(e);
    this.showSuccessMessage();
    
    setTimeout(() => {
      this.returnButtonToOriginalPosition();
    }, 1200);
  }

  private createSuccessParticles(e: MouseEvent): void {
    for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
      const particle = document.createElement('div');
      const size = 4 + Math.random() * 8;
      const hue = 60 + Math.random() * 60;
      
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
      
      document.body.appendChild(particle);
      
      setTimeout(() => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      }, 2000);
    }
  }

  private showSuccessMessage(): void {
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
    
    setTimeout(() => {
      if (message.parentNode) {
        message.parentNode.removeChild(message);
      }
    }, 2000);
  }

  private initializeScrollReveal(): void {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    if (fadeInSections.length === 0) {
      console.log('ℹ️ No se encontraron elementos .fade-in-section');
      return;
    }

    console.log(`🎬 Inicializando scroll reveal para ${fadeInSections.length} elementos`);

    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: 0.1,
      rootMargin: '-50px 0px'
    };

    const fadeInObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          console.log('✨ Elemento entró en vista:', entry.target);
        }
      });
    }, observerOptions);

    fadeInSections.forEach(section => {
      fadeInObserver.observe(section);
    });

    console.log('✅ Scroll reveal inicializado correctamente');
  }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  const app = new PortfolioApp();
  app.init();
}); 
