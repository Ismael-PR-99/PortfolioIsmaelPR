import { 
  SectionConfig, 
  HamburgerConfig, 
  ChaseConfig,
  ScrollSource,
  DeviceType,
  SectionClass,
  HamburgerElement,
  NavPanelElement,
  CVButtonElement
} from './types';

// Configuración global
const CONFIG = {
  MOBILE_BREAKPOINT: 768,
  HEADER_HEIGHT_MOBILE: 60,
  HEADER_HEIGHT_DESKTOP: 80,
  ANIMATION_DURATION: 300,
  CHASE_ESCAPE_DISTANCE: 150,
  CHASE_MAX_SPEED: 8,
  PARTICLE_COUNT: 15,

} as const;

// Estado global de la aplicación
class AppState {
  private _hamburgerConfig: HamburgerConfig = {
    isActive: false,
    isMobile: false,
    currentClass: SectionClass.ON_GREEN_BG
  };



  private _chaseConfig: ChaseConfig = {
    isChasing: false,
    mouseSpeed: 0,
    escapeDistance: CONFIG.CHASE_ESCAPE_DISTANCE,
    maxSpeed: CONFIG.CHASE_MAX_SPEED
  };

  get hamburgerConfig(): HamburgerConfig {
    return { ...this._hamburgerConfig };
  }

  set hamburgerConfig(config: Partial<HamburgerConfig>) {
    this._hamburgerConfig = { ...this._hamburgerConfig, ...config };
  }



  get chaseConfig(): ChaseConfig {
    return { ...this._chaseConfig };
  }

  set chaseConfig(config: Partial<ChaseConfig>) {
    this._chaseConfig = { ...this._chaseConfig, ...config };
  }

  get isMobile(): boolean {
    return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
  }
}

// Clase principal de la aplicación
class PortfolioApp {
  private state: AppState;
  private hamburger: HamburgerElement;
  private navPanel: NavPanelElement;

  private cvButton: CVButtonElement;
  private animationId: number | null = null;
  // private mouseMoveTimeout: number | null = null; // Para implementación futura

  constructor() {
    this.state = new AppState();
    this.hamburger = document.getElementById('hamburger-menu') as HamburgerElement;
    this.navPanel = document.getElementById('nav-panel') as NavPanelElement;

    this.cvButton = document.querySelector('.btn-cv-contact') as CVButtonElement;
  }

  public init(): void {
    console.log('🚀 Inicializando PortfolioApp...');
    
    this.verifyElements();
    this.initializeHamburgerMenu();
    this.initializeSmoothScroll();
    this.initializeHamburgerColorChange();

    this.initializeEffects();
    this.initializeCVButtonChase();
    this.initializeScrollReveal();

    
    console.log('✅ PortfolioApp inicializada correctamente');
  }

  private verifyElements(): void {
    console.log('=== VERIFICACIÓN DE ELEMENTOS ===');
    console.log('Hamburger menu:', this.hamburger ? '✅' : '❌');
    console.log('Nav panel:', this.navPanel ? '✅' : '❌');

    console.log('CV button:', this.cvButton ? '✅' : '❌');
    
    const sections = ['#hero', '#experience', '#projects', '#contact'];
    sections.forEach(selector => {
      const element = document.querySelector(selector);
      console.log(`Sección ${selector}:`, element ? '✅' : '❌');
    });
  }

  private initializeHamburgerMenu(): void {
    console.log('🔧 Inicializando menú hamburguesa...');
    
    if (!this.hamburger || !this.navPanel) {
      console.warn('⚠️ Elementos del menú hamburguesa no encontrados');
      console.log('Hamburger:', this.hamburger);
      console.log('Nav panel:', this.navPanel);
      return;
    }

    console.log('✅ Elementos encontrados, configurando eventos...');
    const navLinks = this.navPanel.querySelectorAll('a');
    console.log('Enlaces encontrados:', navLinks.length);
    
    const toggleMenu = (): void => {
      console.log('🔄 Alternando menú...');
      const newState = !this.state.hamburgerConfig.isActive;
      this.state.hamburgerConfig = { isActive: newState };
      console.log('Nuevo estado:', newState);
      
      if (newState) {
        this.openMenu(navLinks);
      } else {
        this.closeMenu(navLinks);
      }
    };

    // Event listeners
    this.hamburger.addEventListener('click', (e: Event) => {
      console.log('🖱️ Click en hamburger detectado en TypeScript');
      e.preventDefault();
      toggleMenu();
    });

    navLinks.forEach((link: Element) => {
      link.addEventListener('click', (e: Event) => {
        this.handleNavLinkClick(e, link as HTMLAnchorElement, toggleMenu);
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.state.hamburgerConfig.isActive) {
        toggleMenu();
      }
    });

    // Cerrar al hacer clic fuera
    this.navPanel.addEventListener('click', (e: Event) => {
      if (e.target === this.navPanel) {
        toggleMenu();
      }
    });
  }

  private openMenu(navLinks: NodeListOf<Element>): void {
    console.log('🚀 Abriendo menú...');
    this.hamburger?.classList.add('is-active');
    this.navPanel?.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    
    console.log('Clases hamburger después de abrir:', this.hamburger?.className);
    console.log('Clases nav panel después de abrir:', this.navPanel?.className);
    
    // Efecto de entrada para los enlaces
    navLinks.forEach((link: Element, index: number) => {
      setTimeout(() => {
        (link as HTMLElement).style.transform = 'translateY(0) rotateX(0deg) scale(1)';
        (link as HTMLElement).style.opacity = '1';
      }, 200 + (index * 100));
    });
  }

  private closeMenu(navLinks: NodeListOf<Element>): void {
    console.log('🚪 Cerrando menú...');
    this.hamburger?.classList.remove('is-active');
    
    console.log('Clases hamburger después de cerrar:', this.hamburger?.className);
    
    // Animación de salida
    navLinks.forEach((link: Element, index: number) => {
      setTimeout(() => {
        (link as HTMLElement).style.transform = 'translateY(30px) rotateX(20deg) scale(0.9)';
        (link as HTMLElement).style.opacity = '0';
      }, index * 50);
    });
    
    setTimeout(() => {
      this.navPanel?.classList.remove('is-active');
      document.body.style.overflow = 'auto';
      console.log('Clases nav panel después de cerrar:', this.navPanel?.className);
    }, 300);
  }

  private handleNavLinkClick(_e: Event, link: HTMLAnchorElement, toggleMenu: () => void): void {
    const href = link.getAttribute('href');
    console.log(`🔗 Clic en enlace: ${href}`);
    
    if (link.classList.contains('cv-link')) {
      console.log('📄 Navegando al CV');
      if (this.navPanel?.classList.contains('is-active')) {
        toggleMenu();
      }
      return;
    }
    
    setTimeout(() => {
      if (this.navPanel?.classList.contains('is-active')) {
        toggleMenu();
      }
    }, 100);
  }

  private initializeSmoothScroll(): void {
    const smoothScrollToElement = (targetElement: HTMLElement, source: ScrollSource = 'general'): boolean => {
      if (!targetElement) return false;
      
      const headerHeight = this.state.isMobile ? CONFIG.HEADER_HEIGHT_MOBILE : CONFIG.HEADER_HEIGHT_DESKTOP;
      const elementPosition = targetElement.offsetTop;
      const finalPosition = Math.max(0, elementPosition - headerHeight);
      
      console.log(`📍 Scroll desde ${source}:`, {
        target: targetElement.id || targetElement.className,
        elementPosition,
        headerHeight,
        finalPosition,
        isMobile: this.state.isMobile
      });
      
      window.scrollTo({
        top: finalPosition,
        behavior: 'smooth'
      });
      
      return true;
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId!) as HTMLElement;
        
        if (targetElement) {
          const isFromHamburger = this.closest('#nav-panel') !== null;
          const source: ScrollSource = isFromHamburger ? 'hamburger' : 'general';
          smoothScrollToElement(targetElement, source);
        } else {
          console.warn(`❌ Elemento no encontrado: ${targetId}`);
        }
      });
    });
  }

  private initializeHamburgerColorChange(): void {
    if (!this.hamburger) return;

    const sections: SectionConfig[] = [
      { element: document.querySelector('.hero'), class: SectionClass.ON_GREEN_BG },
      { element: document.getElementById('experience'), class: SectionClass.ON_LIGHT_BG },
      { element: document.getElementById('projects'), class: SectionClass.ON_DARK_BG },
      { element: document.getElementById('contact'), class: SectionClass.ON_LIGHT_BG }
    ];

    this.hamburger.classList.add(SectionClass.ON_GREEN_BG);

    const observerOptions: IntersectionObserverInit = {
      root: null,
      threshold: this.state.isMobile ? 0.3 : 0.5,
      rootMargin: this.state.isMobile ? '-50px 0px' : '-100px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.hamburger?.classList.remove(SectionClass.ON_GREEN_BG, SectionClass.ON_LIGHT_BG, SectionClass.ON_DARK_BG);
          
          const currentSection = sections.find(section => section.element === entry.target);
          if (currentSection) {
            this.hamburger?.classList.add(currentSection.class);
            const deviceType: DeviceType = this.state.isMobile ? 'mobile' : 'desktop';
            console.log(`${deviceType} - Cambiando hamburger a: ${currentSection.class}`);
          }
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      if (section.element) {
        sectionObserver.observe(section.element);
      }
    });
  }



  private initializeEffects(): void {
    // Aquí se pueden agregar otros efectos como partículas, ripple, etc.
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

    // Variables para el efecto de persecución (implementación futura)
    // let mouseX = 0;
    // let mouseY = 0;
    // let buttonX = 0;
    // let buttonY = 0;

    const chaseObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.state.chaseConfig.isChasing = true;
          console.log('🎯 Iniciando persecución del botón CV');
        } else {
          this.state.chaseConfig.isChasing = false;
          this.returnButtonToOriginalPosition();
        }
      });
    }, { threshold: 0.3 });

    chaseObserver.observe(contactSection);

    // Mouse tracking con throttling (implementación futura)
    // document.addEventListener('mousemove', (e: MouseEvent) => {
    //   mouseX = e.clientX;
    //   mouseY = e.clientY;
    //   
    //   if (this.mouseMoveTimeout) return;
    //   this.mouseMoveTimeout = window.setTimeout(() => {
    //     this.mouseMoveTimeout = null;
    //   }, CONFIG.CURSOR_THROTTLE);
    // }, { passive: true });

    // Efecto de clic
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
    this.state.chaseConfig.isChasing = false;
    
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
      this.state.chaseConfig.isChasing = true;
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