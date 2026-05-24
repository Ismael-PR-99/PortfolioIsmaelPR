export interface TechItem {
  name: string;
  level: 'primary' | 'secondary';
}

export interface StackCategory {
  id: string;
  title: string;
  description: string;
  icon: 'backend' | 'frontend' | 'database' | 'tools';
  techs: TechItem[];
}

export const stack: StackCategory[] = [
  {
    id: 'backend',
    title: 'Backend',
    description: 'Lógica de negocio, APIs y arquitectura del servidor',
    icon: 'backend',
    techs: [
      { name: 'Java', level: 'primary' },
      { name: 'PHP', level: 'primary' },
      { name: 'Python', level: 'primary' },
      { name: 'Laravel', level: 'primary' },
      { name: 'Spring Boot', level: 'primary' },
      { name: 'Django', level: 'primary' },
      { name: 'Node.js', level: 'secondary' },
      { name: 'REST APIs', level: 'secondary' },
    ],
  },
  {
    id: 'frontend',
    title: 'Frontend',
    description: 'Interfaces de usuario, componentes y experiencia visual',
    icon: 'frontend',
    techs: [
      { name: 'JavaScript', level: 'primary' },
      { name: 'React', level: 'primary' },
      { name: 'Tailwind CSS', level: 'primary' },
      { name: 'TypeScript', level: 'secondary' },
      { name: 'HTML / CSS', level: 'secondary' },
      { name: 'Blade', level: 'secondary' },
      { name: 'React Native', level: 'secondary' },
    ],
  },
  {
    id: 'database',
    title: 'Bases de datos',
    description: 'Diseño, consultas y administración de datos',
    icon: 'database',
    techs: [
      { name: 'MySQL', level: 'primary' },
      { name: 'PostgreSQL', level: 'primary' },
      { name: 'Eloquent ORM', level: 'secondary' },
      { name: 'SQL', level: 'secondary' },
    ],
  },
  {
    id: 'tools',
    title: 'Herramientas',
    description: 'Flujo de trabajo, control de versiones y despliegue',
    icon: 'tools',
    techs: [
      { name: 'Git', level: 'primary' },
      { name: 'GitHub', level: 'primary' },
      { name: 'Docker', level: 'secondary' },
      { name: 'Linux', level: 'secondary' },
      { name: 'Postman', level: 'secondary' },
      { name: 'Figma', level: 'secondary' },
    ],
  },
];
