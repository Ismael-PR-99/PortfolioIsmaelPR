export type TimelineType = 'education' | 'experience';

export interface TimelineItem {
  id: string;
  type: TimelineType;
  badge: string;
  dateStart: string;
  dateEnd: string;
  title: string;
  institution: string;
  location: string;
  description: string;
  tags?: string[];
  current?: boolean;
}

export const timeline: TimelineItem[] = [
  {
    id: 'ifcd0112',
    type: 'education',
    badge: 'Certificación',
    dateStart: 'Sep 2024',
    dateEnd: 'Actualidad',
    title: 'IFCD0112 — Programación con Lenguajes Orientados a Objetos',
    institution: 'SEPE / IFC Sevilla',
    location: 'Sevilla, España',
    description:
      'Certificado de profesionalidad de nivel 3. Profundización en programación orientada a objetos, desarrollo de aplicaciones multiplataforma y buenas prácticas de ingeniería del software.',
    tags: ['Java', 'POO', 'UML', 'Bases de datos'],
    current: true,
  },
  {
    id: 'practicas-daw',
    type: 'experience',
    badge: 'Prácticas',
    dateStart: 'Ene 2025',
    dateEnd: 'Jun 2025',
    title: 'Prácticas Profesionales — Desarrollo Web',
    institution: 'Cesur Sevilla',
    location: 'Sevilla, España',
    description:
      'Desarrollo de aplicaciones web en el marco del Grado Superior DAW. Trabajo con Java, PHP, JavaScript, Spring Boot, Laravel y Tailwind CSS. Participación en el ciclo completo de desarrollo: análisis, implementación y despliegue.',
    tags: ['Java', 'PHP', 'Laravel', 'Spring Boot', 'JavaScript', 'Tailwind'],
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
      'Grado Superior con formación integral en desarrollo web: frontend, backend, bases de datos y despliegue. Proyecto final: RefrigeraSpace, aplicación Laravel 12 con scraping automático y generación de PDF.',
    tags: ['HTML/CSS', 'JavaScript', 'PHP', 'Java', 'MySQL', 'Laravel', 'Spring Boot'],
  },
];
