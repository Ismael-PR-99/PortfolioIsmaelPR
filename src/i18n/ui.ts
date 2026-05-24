export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const ui = {
  es: {
    // Nav
    'nav.inicio': 'Inicio',
    'nav.stack': 'Stack',
    'nav.trayectoria': 'Trayectoria',
    'nav.proyectos': 'Proyectos',
    'nav.contacto': 'Contacto',
    'nav.menu.open': 'Abrir menú',
    'nav.menu.close': 'Cerrar menú',

    // Hero
    'hero.badge': 'Disponible para prácticas',
    'hero.greeting': 'Hola, soy',
    'hero.role': 'Desarrollador Web Full Stack',
    'hero.bio':
      'Desarrollo aplicaciones web full stack con Java, PHP, Python y JavaScript. Manejo Laravel, Spring Boot, Django y React desde el backend hasta el frontend. Busco prácticas donde seguir creciendo y aportar desde el primer día.',
    'hero.chip.location': 'Sevilla, España',
    'hero.chip.level': 'Junior',
    'hero.chip.type': 'Full Stack',
    'hero.cta.projects': 'Ver proyectos',
    'hero.cta.cv': 'Descargar CV',

    // Stack
    'stack.label': 'Tecnologías',
    'stack.title': 'Mi stack técnico',
    'stack.subtitle':
      'Herramientas y frameworks con los que trabajo en proyectos reales.',
    'stack.backend.title': 'Backend',
    'stack.backend.desc': 'Lógica de negocio, APIs y arquitectura del servidor',
    'stack.frontend.title': 'Frontend',
    'stack.frontend.desc': 'Interfaces de usuario, componentes y experiencia visual',
    'stack.database.title': 'Bases de datos',
    'stack.database.desc': 'Diseño, consultas y administración de datos',
    'stack.tools.title': 'Herramientas',
    'stack.tools.desc': 'Flujo de trabajo, control de versiones y despliegue',

    // Timeline
    'timeline.label': 'Trayectoria',
    'timeline.title': 'Mi camino hasta aquí',
    'timeline.subtitle':
      'Formación y experiencia que me han dado las bases para trabajar en proyectos reales.',
    'timeline.filter.all': 'Todo',
    'timeline.filter.experience': 'Experiencia',
    'timeline.filter.education': 'Educación',
    'timeline.current': 'En curso',
    'timeline.present': 'Actualidad',
    'timeline.badge.education': 'Formación',
    'timeline.badge.cert': 'Certificación',
    'timeline.badge.experience': 'Prácticas',

    // Projects
    'projects.label': 'Proyectos',
    'projects.title': 'Lo que he construido',
    'projects.subtitle':
      'Proyectos reales desarrollados durante mi formación. Código propio, desplegado en producción.',
    'projects.live': 'En producción',
    'projects.cta.app': 'Ver app',
    'projects.cta.github': 'GitHub',

    // Contact
    'contact.label': 'Contacto',
    'contact.title': 'Conectemos',
    'contact.subtitle':
      'Estoy abierto a oportunidades de prácticas y puestos junior.\nSi tienes un proyecto o una oferta, hablemos.',
    'contact.linkedin.desc': 'Perfil profesional',
    'contact.github.desc': 'Código y proyectos',
    'contact.instagram.desc': 'Día a día',
    'contact.cv.divider': 'o descarga mi CV',
    'contact.cv.btn': 'Descargar CV — PDF',

    // Footer
    'footer.built': 'Hecho con',
  },

  en: {
    // Nav
    'nav.inicio': 'Home',
    'nav.stack': 'Stack',
    'nav.trayectoria': 'Journey',
    'nav.proyectos': 'Projects',
    'nav.contacto': 'Contact',
    'nav.menu.open': 'Open menu',
    'nav.menu.close': 'Close menu',

    // Hero
    'hero.badge': 'Open to internships',
    'hero.greeting': 'Hi, I\'m',
    'hero.role': 'Full Stack Web Developer',
    'hero.bio':
      'I build full stack web apps with Java, PHP, Python and JavaScript. I work with Laravel, Spring Boot, Django and React across the whole stack. Looking for an internship where I can keep growing and contribute from day one.',
    'hero.chip.location': 'Seville, Spain',
    'hero.chip.level': 'Junior',
    'hero.chip.type': 'Full Stack',
    'hero.cta.projects': 'See projects',
    'hero.cta.cv': 'Download CV',

    // Stack
    'stack.label': 'Technologies',
    'stack.title': 'My tech stack',
    'stack.subtitle': 'Tools and frameworks I use in real projects.',
    'stack.backend.title': 'Backend',
    'stack.backend.desc': 'Business logic, APIs and server architecture',
    'stack.frontend.title': 'Frontend',
    'stack.frontend.desc': 'User interfaces, components and visual experience',
    'stack.database.title': 'Databases',
    'stack.database.desc': 'Schema design, queries and data management',
    'stack.tools.title': 'Tools',
    'stack.tools.desc': 'Workflow, version control and deployment',

    // Timeline
    'timeline.label': 'Journey',
    'timeline.title': 'My path so far',
    'timeline.subtitle':
      'Training and experience that gave me the foundation to work on real projects.',
    'timeline.filter.all': 'All',
    'timeline.filter.experience': 'Experience',
    'timeline.filter.education': 'Education',
    'timeline.current': 'Ongoing',
    'timeline.present': 'Present',
    'timeline.badge.education': 'Education',
    'timeline.badge.cert': 'Certificate',
    'timeline.badge.experience': 'Internship',

    // Projects
    'projects.label': 'Projects',
    'projects.title': 'What I\'ve built',
    'projects.subtitle':
      'Real projects built during my training. Own code, deployed to production.',
    'projects.live': 'Live',
    'projects.cta.app': 'View app',
    'projects.cta.github': 'GitHub',

    // Contact
    'contact.label': 'Contact',
    'contact.title': 'Let\'s connect',
    'contact.subtitle':
      'I\'m open to internship opportunities and junior positions.\nIf you have a project or an offer, let\'s talk.',
    'contact.linkedin.desc': 'Professional profile',
    'contact.github.desc': 'Code and projects',
    'contact.instagram.desc': 'Day to day',
    'contact.cv.divider': 'or download my CV',
    'contact.cv.btn': 'Download CV — PDF',

    // Footer
    'footer.built': 'Built with',
  },
} as const;

export type UiKey = keyof typeof ui.es;
