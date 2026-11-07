// Everything the services landing offers, in one place: services, the
// add-ons a client can tick when building a request, steps and FAQ.
// No public prices on purpose: every client gets a written quote.

type L = { es: string; en: string };

export type ServiceId = 'web' | 'shop' | 'desktop' | 'audit';

export interface Service {
  id: ServiceId;
  name: L;
  tagline: L;
  badge: L;
  features: L[];
  delivery: L;
}

export const services: Service[] = [
  {
    id: 'web',
    name: { es: 'Página web para tu negocio', en: 'Website for your business' },
    tagline: {
      es: 'Rápida, adaptada al móvil y lista para que te encuentren en Google.',
      en: 'Fast, mobile-ready and built to be found on Google.',
    },
    badge: { es: 'La más pedida', en: 'Most requested' },
    features: [
      { es: 'Adaptada a móvil', en: 'Mobile-ready' },
      { es: 'SEO local', en: 'Local SEO' },
      { es: 'Formulario y WhatsApp', en: 'Form + WhatsApp' },
      { es: 'Textos legales', en: 'Legal pages' },
    ],
    delivery: { es: '1–2 semanas', en: '1–2 weeks' },
  },
  {
    id: 'shop',
    name: { es: 'Tienda online con pagos', en: 'Online shop with payments' },
    tagline: {
      es: 'Vende con tarjeta: catálogo, carrito, TPV de tu banco y avisos de cada pedido.',
      en: 'Sell by card: catalogue, checkout, your bank’s gateway and an alert for every order.',
    },
    badge: { es: 'Como dtfalmetro.es', en: 'Like dtfalmetro.es' },
    features: [
      { es: 'TPV Redsys / Stripe', en: 'Redsys / Stripe' },
      { es: 'Subida de archivos', en: 'File uploads' },
      { es: 'Correos automáticos', en: 'Automatic emails' },
      { es: 'Presupuesto al instante', en: 'Instant quotes' },
    ],
    delivery: { es: '3–6 semanas', en: '3–6 weeks' },
  },
  {
    id: 'desktop',
    name: { es: 'Panel de gestión o app de escritorio', en: 'Admin panel or desktop app' },
    tagline: {
      es: 'Tus pedidos, clientes y envíos en una app propia para Windows que se actualiza sola.',
      en: 'Orders, customers and shipping in your own Windows app that updates itself.',
    },
    badge: { es: 'A medida', en: 'Custom-built' },
    features: [
      { es: 'Windows (Tauri)', en: 'Windows (Tauri)' },
      { es: 'Avisos al momento', en: 'Live alerts' },
      { es: 'Exportar a Excel', en: 'Excel export' },
      { es: 'Se actualiza sola', en: 'Self-updating' },
    ],
    delivery: { es: '3–5 semanas', en: '3–5 weeks' },
  },
  {
    id: 'audit',
    name: { es: 'Auditoría de seguridad web', en: 'Web security audit' },
    tagline: {
      es: 'Reviso tu web o API como lo haría un atacante y te entrego un informe claro con cómo arreglarlo.',
      en: 'I test your site or API the way an attacker would and hand you a clear report with the fixes.',
    },
    badge: { es: 'Ciberseguridad', en: 'Cybersecurity' },
    features: [
      { es: 'OWASP Top 10', en: 'OWASP Top 10' },
      { es: 'Prueba en vivo', en: 'Live testing' },
      { es: 'Informe en PDF', en: 'PDF report' },
      { es: 'Re-test incluido', en: 'Re-test included' },
    ],
    delivery: { es: '3–5 días', en: '3–5 days' },
  },
];

export interface Extra {
  id: string;
  name: L;
  for: ServiceId[];
}

export const extras: Extra[] = [
  { id: 'page', name: { es: 'Sección o página extra', en: 'Extra section or page' }, for: ['web', 'shop'] },
  { id: 'lang', name: { es: 'Idioma adicional', en: 'Extra language' }, for: ['web', 'shop', 'desktop'] },
  { id: 'blog', name: { es: 'Blog o noticias que editas tú', en: 'Blog you can edit yourself' }, for: ['web', 'shop'] },
  { id: 'panel', name: { es: 'Panel de escritorio para la tienda', en: 'Desktop panel for the shop' }, for: ['shop'] },
  { id: 'api', name: { es: 'Incluir la API / backend', en: 'Include the API / backend' }, for: ['audit'] },
  { id: 'domain', name: { es: 'Dominio y correo profesional', en: 'Domain and business email' }, for: ['web', 'shop'] },
  { id: 'seo', name: { es: 'Posicionamiento en Google (SEO local)', en: 'Local SEO' }, for: ['web', 'shop'] },
  { id: 'care', name: { es: 'Mantenimiento: hosting, copias y cambios', en: 'Care plan: hosting, backups and edits' }, for: ['web', 'shop', 'desktop'] },
  { id: 'report', name: { es: 'Informe para dirección o cliente final', en: 'Executive summary for management' }, for: ['audit'] },
];

export const steps: { title: L; text: L; tag: L }[] = [
  {
    tag: { es: 'Día 1', en: 'Day 1' },
    title: { es: 'Llamada de 15 minutos', en: '15-minute call' },
    text: { es: 'Me cuentas tu negocio y qué necesitas. Sin compromiso.', en: 'Tell me about your business and what you need. No strings.' },
  },
  {
    tag: { es: 'En 48 h', en: 'Within 48 h' },
    title: { es: 'Propuesta por escrito', en: 'Written proposal' },
    text: { es: 'Qué haré, cuánto cuesta y cuándo estará. Precio cerrado.', en: 'What I’ll build, what it costs and when. Fixed price.' },
  },
  {
    tag: { es: 'Semanas', en: 'Weeks' },
    title: { es: 'Diseño y desarrollo', en: 'Design and build' },
    text: { es: 'Ves avances cada pocos días en una web de pruebas y ajustamos.', en: 'You see progress every few days on a staging site and we adjust.' },
  },
  {
    tag: { es: 'Para siempre', en: 'For good' },
    title: { es: 'Publicada y tuya', en: 'Live and yours' },
    text: { es: 'La publico, te enseño a usarla y el código y el dominio son tuyos.', en: 'I launch it, show you how to use it, and the code and domain are yours.' },
  },
];

export const faq: { q: L; a: L }[] = [
  {
    q: { es: '¿Cuánto cuesta?', en: 'How much does it cost?' },
    a: {
      es: 'Depende de lo que necesites: cada negocio es un mundo. Tras una llamada de 15 minutos te mando un presupuesto cerrado por escrito, gratis y sin compromiso.',
      en: 'It depends on what you need: every business is different. After a 15-minute call I send you a fixed quote in writing, free and with no strings.',
    },
  },
  {
    q: { es: '¿Cómo se paga?', en: 'How do I pay?' },
    a: {
      es: 'La mitad al aceptar la propuesta y la otra mitad al entregar. Por transferencia o tarjeta.',
      en: 'Half when you accept the proposal and half on delivery. Bank transfer or card.',
    },
  },
  {
    q: { es: '¿La web es mía?', en: 'Do I own the site?' },
    a: {
      es: 'Sí. El dominio, los textos, el diseño y el código son tuyos. Si un día te vas, te lo llevas todo.',
      en: 'Yes. Domain, copy, design and code are yours. If you ever leave, you take everything with you.',
    },
  },
  {
    q: { es: '¿Tengo que pagar mantenimiento?', en: 'Do I have to pay for maintenance?' },
    a: {
      es: 'No es obligatorio. Si lo quieres, incluye alojamiento, copias de seguridad, actualizaciones y cambios pequeños cada mes.',
      en: 'It’s optional. If you want it, it covers hosting, backups, updates and small edits every month.',
    },
  },
  {
    q: { es: '¿Qué incluye la auditoría de seguridad?', en: 'What does the security audit cover?' },
    a: {
      es: 'Solo con tu autorización por escrito: reviso autenticación, permisos, inyecciones, XSS, configuración y cabeceras, compruebo cada hallazgo en vivo y te entrego un informe con la gravedad y cómo corregirlo. Cuando lo arreglas, lo vuelvo a probar.',
      en: 'Only with your written authorisation: I review authentication, access control, injection, XSS, configuration and headers, verify every finding live and hand you a report with severity and fixes. Once fixed, I test it again.',
    },
  },
  {
    q: { es: '¿Trabajas solo en Sevilla?', en: 'Do you only work in Seville?' },
    a: {
      es: 'Estoy en Sevilla y me gusta conocer los negocios en persona, pero trabajo con cualquier sitio de España por videollamada.',
      en: 'I’m based in Seville and like to meet in person, but I work with clients anywhere in Spain over video call.',
    },
  },
];

export const sectors: L[] = [
  { es: 'Talleres', en: 'Workshops' },
  { es: 'Tiendas online', en: 'Online shops' },
  { es: 'Restaurantes', en: 'Restaurants' },
  { es: 'Clínicas', en: 'Clinics' },
  { es: 'Imprentas', en: 'Print shops' },
  { es: 'Gimnasios', en: 'Gyms' },
  { es: 'Academias', en: 'Academies' },
  { es: 'Autónomos', en: 'Freelancers' },
];

