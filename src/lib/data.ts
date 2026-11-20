export const WHATSAPP_NUMBER = '5216183202065';
export const CONTACT_EMAIL = 'sergiolive360@gmail.com';

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export type ProjectColorKey = 'cyan' | 'purple' | 'amber';

export const projectColorStyles: Record<
  ProjectColorKey,
  {
    badge: string;
    title: string;
    dot: string;
    highlight: string;
    cta: string;
  }
> = {
  cyan: {
    badge: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    title: 'text-cyan-400',
    dot: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
    highlight: 'text-cyan-400 border-cyan-500/25 bg-cyan-500/10',
    cta: 'text-cyan-400',
  },
  purple: {
    badge: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    title: 'text-purple-400',
    dot: 'bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]',
    highlight: 'text-purple-400 border-purple-500/25 bg-purple-500/10',
    cta: 'text-purple-400',
  },
  amber: {
    badge: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    title: 'text-amber-400',
    dot: 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.6)]',
    highlight: 'text-amber-400 border-amber-500/25 bg-amber-500/10',
    cta: 'text-amber-400',
  },
};

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  color: ProjectColorKey;
  defaultService: string;
  image: string;
  overview: string;
  highlights: string[];
  architecture: { name: string; desc: string }[];
  tech: string[];
}

export const projectsData: Record<string, ProjectItem> = {
  eyemax: {
    id: 'eyemax',
    title: 'EYEMAX',
    tag: 'Computer Vision & Edge AI',
    color: 'cyan',
    defaultService: 'IA & Arquitectura Cloud',
    image: '/project-eyemax.png',
    overview:
      'Eyemax es un sistema inteligente de punto de venta y escaneo visual diseñado para la industria de la joyería. Su objetivo principal es resolver el problema de la identificación manual de inventario: permite a los vendedores tomar una fotografía de cualquier pieza de joyería y, en cuestión de segundos, la inteligencia artificial identifica el modelo exacto, cruzando la información con el catálogo y existencias en tiempo real.',
    highlights: [
      'Identificación visual en segundos',
      'Arquitectura híbrida Local + Cloud',
      'Cruce de inventario en tiempo real',
    ],
    architecture: [
      {
        name: 'Capa Local (Velocidad)',
        desc: 'Procesa la imagen localmente utilizando modelos de visión vectorial para encontrar similitudes matemáticas en el catálogo al instante (Vector Search).',
      },
      {
        name: 'Capa Cloud (Precisión)',
        desc: 'Si existen piezas muy similares, el sistema delega la decisión final a un LLM multimodal avanzado (Gemini) para extraer características finas.',
      },
    ],
    tech: [
      'Python',
      'Flask',
      'ONNX Runtime (DINOv2/CLIP)',
      'Google Gemini 2.5 Flash',
      'Firebase Firestore',
      'Pandas',
      'WebRTC',
    ],
  },
  zeus: {
    id: 'zeus',
    title: 'PRO-ZEUS',
    tag: 'AI Cloud Architect',
    color: 'purple',
    defaultService: 'IA & Arquitectura Cloud',
    image: '/project-zeus.png',
    overview:
      'PRO-ZEUS es una plataforma SaaS innovadora diseñada para revolucionar el mundo de DevOps y la arquitectura en la nube. A través de un motor de Inteligencia Artificial integrado, la plataforma permite a los usuarios diseñar, visualizar y desplegar infraestructuras de grado empresarial utilizando simples comandos en lenguaje natural.',
    highlights: [
      'Lenguaje natural → Código Terraform',
      'Orquestación Cloud automatizada',
      'Credenciales BYOC encriptadas',
    ],
    architecture: [
      {
        name: 'Generación IaC con IA',
        desc: 'Traducción de lenguaje natural a código Terraform estructurado en tiempo real, aplicando las mejores prácticas de ciberseguridad.',
      },
      {
        name: 'Dashboard & BYOC',
        desc: 'Monitoreo visual de recursos simulados, inicio de sesión seguro con Google y un módulo para encriptar credenciales de nube.',
      },
    ],
    tech: [
      'React.js',
      'Vite',
      'Node.js',
      'Google Gemini 2.5 Flash',
      'HashiCorp Terraform',
      'Firebase Auth',
      'Recharts',
    ],
  },
  biosalud: {
    id: 'biosalud',
    title: 'BIOSALUD',
    tag: 'Web App Clínica',
    color: 'amber',
    defaultService: 'Desarrollo Web',
    image: '/project-biosalud.png',
    overview:
      'Desarrollo de una aplicación web multipágina (SPA) de diseño premium para una profesional de la nutrición clínica. El objetivo principal fue digitalizar y automatizar el flujo de captación de pacientes, pasando de un modelo tradicional a una clínica virtual moderna con agendamiento automatizado.',
    highlights: [
      'Agendamiento 100% automatizado',
      'Experiencia Mobile-First',
      'Flujo diseñado para conversión',
    ],
    architecture: [
      {
        name: 'UI/UX Minimalista',
        desc: 'Interfaz diseñada desde cero utilizando una paleta de colores orgánicos y tipografías elegantes para transmitir confianza y profesionalismo.',
      },
      {
        name: 'Single Page Application',
        desc: 'Enrutamiento fluido sin recargas de página, optimizado para móviles (Mobile-First) con integración nativa a la API de Calendly.',
      },
    ],
    tech: [
      'React.js',
      'Vite',
      'React Router DOM',
      'Custom CSS3 (Variables, Grid)',
      'Lucide React',
      'Calendly API',
    ],
  },
};

export interface ServiceSpec {
  label: string;
  value: string;
  accent?: boolean;
}

export const serviceSlugs = [
  'desarrollo-web',
  'desarrollo-de-software',
  'ia-y-arquitectura-cloud',
  'diseno-ui-ux',
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export interface ServiceItem {
  slug: ServiceSlug;
  title: string;
  shortDesc: string;
  subtitle: string;
  description: string;
  defaultProjectType: string;
  ctaLabel: string;
  features: string[];
  idealFor: string[];
  specs: ServiceSpec[];
}

export const servicesData: Record<ServiceSlug, ServiceItem> = {
  'desarrollo-web': {
    slug: 'desarrollo-web',
    title: 'Desarrollo Web',
    shortDesc:
      'Sitios web corporativos, tiendas e-commerce y aplicaciones web escalables.',
    subtitle:
      'Sitios web corporativos, tiendas e-commerce y aplicaciones web escalables.',
    description:
      'En Naxus construimos ecosistemas web de alto rendimiento. No usamos plantillas lentas; desarrollamos código limpio, arquitecturas modernas y optimizadas para SEO que garantizan tiempos de carga en milisegundos y una experiencia de usuario impecable.',
    defaultProjectType: 'Desarrollo Web',
    ctaLabel: 'Cotizar Desarrollo Web',
    features: [
      'Arquitectura escalable',
      'Optimización de motores de búsqueda (SEO Técnico)',
      'Integración con APIs y bases de datos',
      'Seguridad de nivel bancario',
    ],
    idealFor: [
      'Empresas que buscan presencia digital sólida orientada a generar clientes reales.',
      'Comercios que necesitan tiendas en línea rápidas, seguras y sin fricción al pagar.',
      'Equipos que requieren portales web conectados con sus sistemas internos o CRM.',
    ],
    specs: [
      { label: 'Status', value: 'Operational' },
      { label: 'Arquitectura', value: 'Alto Rendimiento & SEO' },
      { label: 'Carga', value: 'Optimización Core Web Vitals' },
      { label: 'Disponibilidad', value: '99.9% Uptime', accent: true },
    ],
  },
  'desarrollo-de-software': {
    slug: 'desarrollo-de-software',
    title: 'Desarrollo de Software',
    shortDesc: 'Sistemas a medida, automatización y plataformas robustas.',
    subtitle: 'Sistemas a medida, automatización y plataformas robustas.',
    description:
      'Transformamos cuellos de botella operativos en ventajas competitivas. Nuestro equipo de ingenieros diseña software a la medida de los procesos críticos de tu empresa, garantizando que tu tecnología escale a la misma velocidad que tu negocio.',
    defaultProjectType: 'Software a Medida',
    ctaLabel: 'Cotizar Sistema a Medida',
    features: [
      'Sistemas ERP y CRM a la medida',
      'Arquitectura de Microservicios',
      'Automatización de procesos operativos',
      'Infraestructura Cloud escalable de nivel empresarial',
    ],
    idealFor: [
      'Negocios que operan con hojas de cálculo o herramientas desconectadas y quieren centralizar todo.',
      'Empresas que necesitan automatizar inventarios, cotizaciones, facturación o flujos internos.',
      'Organizaciones que buscan construir su propia plataforma SaaS o producto digital propietario.',
    ],
    specs: [
      { label: 'Status', value: 'Operational' },
      { label: 'Arquitectura', value: 'Modular & Escalable' },
      { label: 'Seguridad', value: 'Cifrado & Auditoría Continua' },
      { label: 'Confiabilidad', value: 'Alta Disponibilidad 24/7', accent: true },
    ],
  },
  'ia-y-arquitectura-cloud': {
    slug: 'ia-y-arquitectura-cloud',
    title: 'IA & Arquitectura Cloud',
    shortDesc:
      'Soluciones con inteligencia artificial, automatización avanzada e infraestructura cloud escalable.',
    subtitle:
      'Inteligencia artificial aplicada, visión por computadora e infraestructura escalable de nivel empresarial.',
    description:
      'Diseñamos arquitecturas inteligentes y entornos en la nube pensados para operar sin interrupciones. Desde motores de visión por computadora y asistentes internos con IA hasta despliegues automatizados listos para escalar con tu operación.',
    defaultProjectType: 'IA & Arquitectura Cloud',
    ctaLabel: 'Cotizar IA & Cloud',
    features: [
      'Integración de modelos de IA y visión por computadora',
      'Automatización inteligente de flujos y análisis de datos',
      'Arquitectura Cloud resiliente y autoescalable',
      'Despliegue continuo, ciberseguridad y monitoreo 24/7',
    ],
    idealFor: [
      'Empresas que quieren incorporar visión artificial o automatización con IA en su operación diaria.',
      'Plataformas con alto crecimiento que requieren infraestructura estable, segura y sin caídas.',
      'Equipos que buscan modernizar sistemas legados y automatizar despliegues en la nube.',
    ],
    specs: [
      { label: 'Status', value: 'Operational' },
      { label: 'Arquitectura', value: 'Cloud Native & IA Aplicada' },
      { label: 'Seguridad', value: 'Encriptación & Alta Resiliencia' },
      { label: 'Escalamiento', value: 'Auto-Scaling 24/7', accent: true },
    ],
  },
  'diseno-ui-ux': {
    slug: 'diseno-ui-ux',
    title: 'Diseño UI/UX',
    shortDesc: 'Interfaces espectaculares enfocadas en la conversión.',
    subtitle: 'Interfaces espectaculares enfocadas en la conversión.',
    description:
      'El buen diseño no solo se ve bien, sino que vende. Creamos experiencias digitales intuitivas y estéticamente superiores que retienen a tus usuarios, reducen la fricción y aumentan directamente tus tasas de conversión.',
    defaultProjectType: 'Diseño UI/UX',
    ctaLabel: 'Cotizar Diseño UI/UX',
    features: [
      'Investigación y flujos de usuario (UX)',
      'Diseño de interfaces premium (UI)',
      'Prototipado interactivo',
      'Sistemas de Diseño (Design Systems)',
    ],
    idealFor: [
      'Productos digitales existentes cuya interfaz luce anticuada o confunde a los usuarios.',
      'Startups y empresas que quieren validar visualmente su sistema antes de escribir código.',
      'Plataformas que buscan elevar su tasa de conversión y proyectar una marca de primer nivel.',
    ],
    specs: [
      { label: 'Status', value: 'Operational' },
      { label: 'Metodología', value: 'Design Systems & Prototipos' },
      { label: 'Enfoque', value: 'Conversión & Accesibilidad' },
      { label: 'Entregables', value: 'UI Kit Interactivo', accent: true },
    ],
  },
};

export const ENGINEERING_GUARANTEES = [
  {
    code: '01',
    title: 'Código 100% Propietario',
    desc: 'Al concluir el proyecto, el repositorio y la propiedad intelectual pertenecen por completo a tu empresa.',
  },
  {
    code: '02',
    title: 'Entregas Demostrables',
    desc: 'Avances visibles en cada sprint con demos reales en entornos de prueba, sin cajas negras ni sorpresas.',
  },
  {
    code: '03',
    title: 'Arquitectura Sin Plantillas',
    desc: 'Ingeniería construida a la medida de tu operación para garantizar velocidad, seguridad y escalabilidad.',
  },
];

export const FAQ_ITEMS = [
  {
    q: '¿El código fuente y la propiedad intelectual quedan a nombre de mi empresa?',
    a: 'Sí. Una vez liquidadas las entregas pactadas, todo el código fuente, bases de datos y activos digitales son 100% propiedad de tu empresa, sin licencias ocultas ni ataduras.',
  },
  {
    q: '¿Cómo cotizan un proyecto y cuál es el proceso para arrancar?',
    a: 'Iniciamos con una sesión breve de Discovery sin costo para entender tu operación y objetivos. Con eso definimos alcance cerrado, arquitectura recomendada, cronograma por fases e inversión exacta.',
  },
  {
    q: '¿En cuánto tiempo pueden lanzar una primera versión funcional?',
    a: 'Depende del alcance: sitios web corporativos y plataformas de captación se entregan en pocas semanas, mientras que sistemas a medida o productos SaaS avanzan por sprints cortos con demos funcionales desde el primer mes.',
  },
  {
    q: '¿Ofrecen soporte, mantenimiento y evolución después del lanzamiento?',
    a: 'Sí. Contamos con planes de soporte técnico, monitoreo continuo de infraestructura y evolución de nuevas funcionalidades para que tu plataforma nunca se quede atrás conforme crece tu negocio.',
  },
  {
    q: '¿Trabajan con empresas en cualquier parte de México o el extranjero?',
    a: 'Sí. Operamos de forma 100% remota con clientes en todo México y el extranjero, manteniendo comunicación directa con el equipo técnico y revisiones semanales de avance.',
  },
];
