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
  institution: string;
  location: string;
  description: string;
  tags?: string[];
  current?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    id: 'kentia',
    type: 'experience',
    badge: 'Empleo',
    dateStart: 'Mar 2026',
    dateEnd: '',
    title: 'Desarrollador Full Stack',
    institution: 'Kentia engineering',
    location: 'Sevilla, España',
    description:
      'Diseñé y desarrollé HERKO Calibration Manager, aplicación de escritorio (Tauri + React + FastAPI) para gestión de calibraciones de ECUs automotrices. Parsers propios para formatos A2L, DCM y S37, flujo de aprobación de work packages con 8 roles diferenciados, trazabilidad completa vía audit log y migración de MongoDB a PostgreSQL. Actualmente ampliando funciones hacia análisis de ciberseguridad: revisión de vulnerabilidades en dependencias, buenas prácticas OWASP y primeros pasos con herramientas de análisis estático de código (SAST).',
    tags: ['React', 'Tauri', 'FastAPI', 'PostgreSQL', 'Docker', 'Ciberseguridad'],
    current: true,
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
