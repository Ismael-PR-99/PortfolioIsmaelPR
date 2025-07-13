import { 
  SectionClass, 
  DeviceType,
  HamburgerElement,
  NavPanelElement,
  CursorElement
} from './types';

// Configuración
const CONFIG = {
  MOBILE_BREAKPOINT: 768,
  HEADER_HEIGHT_MOBILE: 60,
  HEADER_HEIGHT_DESKTOP: 80
} as const;

// Clase para la versión simplificada
class SimplePortfolioApp {
  private hamburger: HamburgerElement;
  private navPanel: NavPanelElement;
  private cursor: CursorElement;
  private isMenuOpen: boolean = false;

  constructor() {
    this.hamburger = document.getElementById('hamburger-menu') as HamburgerElement;
    this.navPanel = document.getElementById('nav-panel') as NavPanelElement;
    this.cursor = document.querySelector('.custom-cursor') as CursorElement;
  }

  public init(): void {
    console.log('🚀 DOM cargado, versión simplificada...');
    
    this.verifyElements();
    this.initializeHamburgerMenu();
    this.initializeSmoothScroll();
    this.initializeHamburgerColorChange();
    this.initializeCustomCursor();
    
    console.log('✅ Scripts simplificados cargados');
  }

  private verifyElements(): void {
    console.log('=== VERIFICACIÓN INICIAL ===');
    console.log('Hamburger menu:', this.hamburger ? '✅' : '❌');
    console.log('Nav panel:', this.navPanel ? '✅' : '❌');
    console.log('Nav links count:', this.navPanel ? this.navPanel.querySelectorAll('a').length : 0);
  }

  private initializeHamburgerMenu(): void {
    if (!this.hamburger || !this.navPanel) {
      console.warn('⚠️ Elementos del menú no encontrados');
      return;
    }

    const navLinks = this.navPanel.querySelectorAll('a');
    console.log('Enlaces encontrados:', navLinks.length);
    navLinks.forEach((link: Element, index: number) => {
      console.log(`Enlace ${index + 1}: ${link.textContent?.trim()} -> ${(link as HTMLAnchorElement).href}`);
    });

    const toggleMenu = (): void => {
      this.isMenuOpen = !this.isMenuOpen;
      
      if (this.isMenuOpen) {
        this.hamburger?.classList.add('is-active');
        this.navPanel?.classList.add('is-active');
        document.body.style.overflow = 'hidden';
      } else {
        this.hamburger?.classList.remove('is-active');
        this.navPanel?.classList.remove('is-active');
        document.body.style.overflow = 'auto';
      }
    };

    // Event listeners
    this.hamburger.addEventListener('click', (e: Event) => {
      e.preventDefault();
      toggleMenu();
    });

    navLinks.forEach((link: Element) => {
      link.addEventListener('click', () => {
        const href = (link as HTMLAnchorElement).getAttribute('href');
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
      });
    });
  }

  private initializeSmoothScroll(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor: Element) => {
      anchor.addEventListener('click', function(this: HTMLAnchorElement, e: Event) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId!) as HTMLElement;
        
        if (targetElement) {
          const headerHeight = window.innerWidth <= CONFIG.MOBILE_BREAKPOINT 
            ? CONFIG.HEADER_HEIGHT_MOBILE 
            : CONFIG.HEADER_HEIGHT_DESKTOP;
          const elementPosition = targetElement.offsetTop - headerHeight;
          
          window.scrollTo({
            top: Math.max(0, elementPosition),
            behavior: 'smooth'
          });
          
          console.log(`📍 Navegando a: ${targetId}`);
        }
      });
    });
  }

  private initializeHamburgerColorChange(): void {
    if (!this.hamburger) return;

    // Configuración de secciones para el cambio de color (eliminada porque no se usa)

    this.hamburger.classList.add(SectionClass.ON_GREEN_BG);

    const updateHamburgerColorByScroll = (): void => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const heroSection = document.querySelector('.hero');
      const experienceSection = document.getElementById('experience');
      const projectsSection = document.getElementById('projects');
      const contactSection = document.getElementById('contact');
      
      let currentClass: string = SectionClass.ON_GREEN_BG;
      
      if (heroSection && scrollY < (heroSection as HTMLElement).offsetHeight * 0.7) {
        currentClass = SectionClass.ON_GREEN_BG;
      } else if (experienceSection && experienceSection.offsetTop && experienceSection.offsetHeight &&
                 scrollY >= experienceSection.offsetTop - windowHeight * 0.3 && 
                 scrollY < experienceSection.offsetTop + experienceSection.offsetHeight - windowHeight * 0.3) {
        currentClass = SectionClass.ON_LIGHT_BG;
      } else if (projectsSection && projectsSection.offsetTop && projectsSection.offsetHeight &&
                 scrollY >= projectsSection.offsetTop - windowHeight * 0.3 && 
                 scrollY < projectsSection.offsetTop + projectsSection.offsetHeight - windowHeight * 0.3) {
        currentClass = SectionClass.ON_DARK_BG;
      } else if (contactSection && contactSection.offsetTop && scrollY >= contactSection.offsetTop - windowHeight * 0.3) {
        currentClass = SectionClass.ON_LIGHT_BG;
      }
      
      if (this.hamburger && !this.hamburger.classList.contains(currentClass)) {
        this.hamburger.classList.remove(SectionClass.ON_GREEN_BG, SectionClass.ON_LIGHT_BG, SectionClass.ON_DARK_BG);
        this.hamburger.classList.add(currentClass);
        const deviceType: DeviceType = window.innerWidth <= CONFIG.MOBILE_BREAKPOINT ? 'mobile' : 'desktop';
        console.log(`${deviceType} - Hamburger color: ${currentClass} (scroll: ${scrollY})`);
      }
    };
    
    window.addEventListener('scroll', updateHamburgerColorByScroll);
    updateHamburgerColorByScroll();

    const initializeHamburgerBehavior = (): void => {
      const isMobile = window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
      
      if (isMobile) {
        this.hamburger?.classList.add('mobile-mode');
        
        const lines = this.hamburger?.querySelectorAll('.line');
        lines?.forEach((line: Element) => {
          if (this.hamburger?.classList.contains('is-active')) {
            (line as HTMLElement).style.backgroundColor = 'var(--lime-green)';
            (line as HTMLElement).style.boxShadow = '0 0 4px rgba(162,224,72,0.6)';
          }
        });
        
        console.log('🔧 Hamburger configurado para móvil');
      } else {
        this.hamburger?.classList.remove('mobile-mode');
        console.log('🔧 Hamburger configurado para escritorio');
      }
    };
    
    initializeHamburgerBehavior();
    window.addEventListener('resize', initializeHamburgerBehavior);
  }

  private initializeCustomCursor(): void {
    if (!this.cursor) {
      console.warn('⚠️ Elemento cursor no encontrado');
      return;
    }

    if (window.innerWidth > CONFIG.MOBILE_BREAKPOINT) {
      console.log('✅ Activando cursor para escritorio');
      this.cursor.style.display = 'block';
      document.body.classList.add('custom-cursor-active');
      
      const mousemoveHandler = (e: MouseEvent): void => {
        this.cursor!.style.left = `${e.clientX}px`;
        this.cursor!.style.top = `${e.clientY}px`;
      };

      window.addEventListener('mousemove', mousemoveHandler);

      const interactiveElements = document.querySelectorAll('a, button, .card');
      interactiveElements.forEach((el: Element) => {
        el.addEventListener('mouseenter', () => {
          this.cursor?.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
          this.cursor?.classList.remove('hover');
        });
      });
    } else {
      this.cursor.style.display = 'none';
      document.body.classList.remove('custom-cursor-active');
      console.log('🚫 Cursor deshabilitado en móvil');
    }

    // Responsive cursor handling
    window.addEventListener('resize', () => {
      clearTimeout((window as any).cursorResizeTimeout);
      (window as any).cursorResizeTimeout = setTimeout(() => {
        this.initializeCustomCursor();
      }, 100);
    });
  }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
  const app = new SimplePortfolioApp();
  app.init();
}); 