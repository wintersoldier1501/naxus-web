import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal, CheckCircle2, Code2 } from 'lucide-react';

const servicesData = {
  'desarrollo-web': {
    title: 'Desarrollo Web',
    subtitle: 'Sitios web corporativos, tiendas e-commerce y aplicaciones web escalables.',
    description: 'En Naxus construimos ecosistemas web de alto rendimiento. No usamos plantillas lentas; desarrollamos código limpio, arquitecturas modernas y optimizadas para SEO que garantizan tiempos de carga en milisegundos y una experiencia de usuario impecable.',
    features: [
      'Arquitectura escalable',
      'Optimización de motores de búsqueda (SEO Técnico)',
      'Integración con APIs y bases de datos',
      'Seguridad de nivel bancario'
    ]
  },
  'desarrollo-de-software': {
    title: 'Desarrollo de Software',
    subtitle: 'Sistemas a medida, automatización y plataformas robustas.',
    description: 'Transformamos cuellos de botella operativos en ventajas competitivas. Nuestro equipo de ingenieros diseña software a la medida de los procesos críticos de tu empresa, garantizando que tu tecnología escale a la misma velocidad que tu negocio.',
    features: [
      'Sistemas ERP y CRM a la medida',
      'Arquitectura de Microservicios',
      'Automatización de procesos operativos',
      'Infraestructura Cloud (AWS, Azure)'
    ]
  },
  'diseno-ui-ux': {
    title: 'Diseño UI/UX',
    subtitle: 'Interfaces espectaculares enfocadas en la conversión.',
    description: 'El buen diseño no solo se ve bien, sino que vende. Creamos experiencias digitales intuitivas y estéticamente superiores que retienen a tus usuarios, reducen la fricción y aumentan directamente tus tasas de conversión.',
    features: [
      'Investigación y flujos de usuario (UX)',
      'Diseño de interfaces premium (UI)',
      'Prototipado interactivo (Figma)',
      'Sistemas de Diseño (Design Systems)'
    ]
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug as keyof typeof servicesData];

  // Fallback si la URL no existe
  if (!service) {
    return (
      <div className="min-h-screen bg-[#12141c] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">Servicio no encontrado</h1>
        <Link href="/" className="text-cyan-400 hover:underline flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#12141c] text-white selection:bg-[#d4d8c5]/30 font-sans overflow-x-hidden">
      
      {/* NAVBAR SIMPLE */}
      <nav className="relative z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 max-w-7xl mx-auto w-full border-b border-[#d4d8c5]/10">
        <Link href="/" className="flex items-center gap-2 md:gap-4">
          <img src="/logo-transparent.svg" alt="Naxus Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain scale-110" />
          <span className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#d4d8c5] uppercase" style={{ fontFamily: 'var(--font-syncopate)' }}>Naxus</span>
        </Link>
        <Link href="/" className="text-xs font-mono text-gray-500 hover:text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Volver
        </Link>
      </nav>

      {/* HERO DEL SERVICIO */}
      <section className="relative pt-20 pb-32 px-4 md:px-8 max-w-7xl mx-auto w-full">
        {/* Glow de fondo */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-[100%] blur-[120px] pointer-events-none z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#d4d8c5]/20 bg-black/50 backdrop-blur-md text-[#d4d8c5] text-xs font-mono tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse rounded-full"></span>
            Detalle del Servicio
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
            {service.title}
          </h1>
          
          <p className="text-xl text-[#d4d8c5] font-light mb-8">
            {service.subtitle}
          </p>
          
          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-12 text-left md:text-center">
            {service.description}
          </p>

          <a href="https://wa.me/5216183202065?text=Hola%20equipo%20Naxus%2C%20me%20interesa%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20servicios." target="_blank" rel="noopener noreferrer" className="tech-border relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4d8c5] text-[#11131a] font-bold uppercase tracking-widest text-sm overflow-hidden transition-all hover:bg-white hover:shadow-[0_0_40px_-10px_rgba(212,216,197,0.8)]">
            <Terminal className="w-4 h-4" />
            Cotizar Proyecto
          </a>
        </div>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS */}
      <section className="bg-black/50 border-t border-[#d4d8c5]/10 py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            
            {/* Lista de beneficios */}
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-10 text-white">
                ¿Qué incluye?
              </h2>
              <ul className="space-y-6">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg font-light">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elemento visual técnico */}
            <div className="tech-border bg-[#12141c] p-8 border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-50"></div>
              <div className="relative z-10 font-mono text-sm text-gray-400 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 border-b border-white/10 pb-4 mb-4">
                  <Code2 className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-xs">Especificaciones_Técnicas</span>
                </div>
                <p>{`> Status: Operational`}</p>
                <p>{`> Frameworks: High Performance`}</p>
                <p>{`> Deployment: Vercel CI/CD`}</p>
                <p className="text-emerald-400">{`> Rendimiento: 99.9% Uptime`}</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d4d8c5]/10 bg-black py-10 relative z-10 text-center">
        <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Naxus Digital Agency.
        </p>
      </footer>
    </main>
  );
}
