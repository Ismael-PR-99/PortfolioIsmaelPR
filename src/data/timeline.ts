export type TimelineType = 'education' | 'experience';

export interface TimelineItem {
  id: string;
  type: TimelineType;
  badge: string;
  dateStart: string;
  dateStartEn?: string;
  dateEnd: string;
  dateEndEn?: string;
  title: string;
  titleEn?: string;
  institution: string;
  location: string;
  locationEn?: string;
  description: string;
  descriptionEn?: string;
  tags?: string[];
  tagsEn?: string[];
  current?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    id: 'kentia-ai-cybersecurity',
    type: 'experience',
    badge: 'Empleo',
    dateStart: 'Ago 2026',
    dateStartEn: 'Aug 2026',
    dateEnd: '',
    title: 'IA y Ciberseguridad',
    titleEn: 'AI & Cybersecurity',
    institution: 'Kentia Engineering',
    location: 'Sevilla, España',
    locationEn: 'Seville, Spain',
    description:
      'Trabajo en IA y ciberseguridad en Kentia Engineering. También contribuyo a KENTIA Calibration Manager, aplicación web y de escritorio para gestionar el ciclo de vida de calibraciones de ECUs, y a tareas de seguridad de aplicaciones.',
    descriptionEn:
      'I work in AI and cybersecurity at Kentia Engineering. I also contribute to KENTIA Calibration Manager, a web and desktop application for managing the lifecycle of ECU calibrations, and to application security work.',
    tags: ['React', 'Tauri', 'FastAPI', 'PostgreSQL', 'Docker', 'Ciberseguridad'],
    tagsEn: ['React', 'Tauri', 'FastAPI', 'PostgreSQL', 'Docker', 'Cybersecurity'],
    current: true,
  },
  {
    id: 'kentia-full-stack',
    type: 'experience',
    badge: 'Empleo',
    dateStart: 'Mar 2026',
    dateEnd: 'Ago 2026',
    dateEndEn: 'Aug 2026',
    title: 'Desarrollador Full Stack',
    titleEn: 'Full Stack Developer',
    institution: 'Kentia Engineering',
    location: 'Sevilla, España',
    locationEn: 'Seville, Spain',
    description:
      'Contribuí al desarrollo full stack de KENTIA Calibration Manager, aplicación web y de escritorio para gestionar calibraciones de ECUs.',
    descriptionEn:
      'I contributed to the full-stack development of KENTIA Calibration Manager, a web and desktop application for managing ECU calibrations.',
    tags: ['React', 'Tauri', 'FastAPI', 'PostgreSQL'],
  },
  {
    id: 'ifcd0112',
    type: 'education',
    badge: 'Certificación',
    dateStart: '2025',
    dateEnd: '2026',
    title: 'IFCD0112 — Programación con Lenguajes Orientados a Objetos y Bases de Datos Relacionales',
    institution: 'Core Network',
    location: 'Sevilla, España',
    description:
      'Certificado de profesionalidad de nivel 3. Profundización en programación orientada a objetos, bases de datos relacionales y desarrollo de aplicaciones multiplataforma.',
    tags: ['Java', 'POO', 'SQL', 'UML'],
    current: true,
  },
  {
    id: 'practicas-alcala',
    type: 'experience',
    badge: 'Prácticas',
    dateStart: 'Mar 2025',
    dateEnd: 'Jun 2025',
    title: 'Desarrollador en prácticas',
    institution: 'Ayuntamiento de Alcalá de Guadaíra',
    location: 'Alcalá de Guadaíra, Sevilla',
    description:
      'Prácticas profesionales del Grado Superior DAW. Desarrollo de aplicaciones web con Vue.js, Spring Boot y Laravel. Control de versiones con Git y GitHub en proyectos del departamento de informática.',
    tags: ['Vue.js', 'Spring Boot', 'Laravel', 'JavaScript', 'PHP', 'GitHub'],
  },
  {
    id: 'daw-cesur',
    type: 'education',
    badge: 'Formación',
    dateStart: 'Sep 2023',
    dateEnd: 'Jun 2025',
    title: 'Técnico Superior en Desarrollo de Aplicaciones Web (DAW)',
    institution: 'Cesur Sevilla',
    location: 'Sevilla, España',
    description:
      'Grado Superior con formación integral en desarrollo web full-stack: frontend, backend, bases de datos y despliegue. Java, PHP, JavaScript, Spring Boot, Laravel, Django, MySQL y PostgreSQL.',
    tags: ['HTML/CSS', 'JavaScript', 'PHP', 'Java', 'MySQL', 'Laravel', 'Spring Boot'],
  },
];
