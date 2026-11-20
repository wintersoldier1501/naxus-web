import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, CheckCircle2, Code2, Sparkles } from 'lucide-react';
import {
  servicesData,
  serviceSlugs,
  buildWhatsAppUrl,
  type ServiceSlug,
} from '@/lib/data';
import { ServiceQuoteButton } from '@/components/ServiceQuoteButton';

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData[slug as ServiceSlug];

  if (!service) {
    return {
      title: 'Servicio no encontrado | Naxus',
    };
  }

  return {
    title: `${service.title} | Naxus`,
    description: service.description,
    alternates: {
      canonical: `/servicios/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Naxus`,
      description: service.subtitle,
      url: `https://naxus.com.mx/servicios/${service.slug}`,
      siteName: 'Naxus',
      locale: 'es_MX',
      type: 'website',
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const service = servicesData[resolvedParams.slug as ServiceSlug];

  if (!service) {
    return (
      <div className="min-h-screen bg-[#12141c] text-white flex flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-4">Servicio no encontrado</h1>
        <Link
          href="/"
          className="text-cyan-400 hover:underline flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Volver al inicio
        </Link>
      </div>
    );
  }

  const otherServices = serviceSlugs
    .filter((slug) => slug !== service.slug)
    .map((slug) => servicesData[slug]);

  const serviceWhatsAppUrl = buildWhatsAppUrl(
    `Hola equipo Naxus, me interesa cotizar un proyecto de ${service.title}.`
  );

  return (
    <main className="min-h-screen bg-[#12141c] text-white selection:bg-[#d4d8c5]/30 font-sans overflow-x-clip">
      {/* NAVBAR STICKY SÓLIDO */}
      <header className="sticky top-0 z-50 w-full bg-[#12141c] border-b border-[#d4d8c5]/10">
        <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 max-w-7xl mx-auto w-full">
          <Link href="/" className="flex items-center gap-2 md:gap-4">
            <Image
              src="/logo-mark.png"
              alt="Naxus Logo"
              width={48}
              height={48}
              priority
              className="w-10 h-10 md:w-12 md:h-12 object-contain scale-110"
            />
            <span
              className="text-xl md:text-2xl font-bold tracking-[0.2em] text-[#d4d8c5] uppercase"
              style={{ fontFamily: 'var(--font-syncopate)' }}
            >
              Naxus
            </span>
          </Link>
          <Link
            href="/#servicios"
            className="text-xs font-mono text-gray-400 hover:text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </nav>
      </header>

      {/* HERO DEL SERVICIO */}
      <section className="relative pt-16 pb-24 md:pt-20 md:pb-28 px-4 md:px-8 max-w-7xl mx-auto w-full">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-cyan-500/10 rounded-[100%] blur-[120px] pointer-events-none z-0" />

        <div className="relative z-10 flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 border border-[#d4d8c5]/20 bg-black/50 backdrop-blur-md text-[#d4d8c5] text-xs font-mono tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 bg-cyan-400 animate-pulse rounded-full" />
            Detalle del Servicio
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#d4d8c5]/75">
            {service.title}
          </h1>

          <p className="text-lg md:text-xl text-[#d4d8c5] font-light mb-6">
            {service.subtitle}
          </p>

          <p className="text-base md:text-lg text-gray-400 leading-relaxed mb-12 text-left md:text-center">
            {service.description}
          </p>

          <ServiceQuoteButton
            serviceTitle={service.title}
            defaultProjectType={service.defaultProjectType}
            ctaLabel={service.ctaLabel}
            whatsappUrl={serviceWhatsAppUrl}
          />
        </div>
      </section>

      {/* SECCIÓN DE CARACTERÍSTICAS Y ESPECIFICACIONES */}
      <section className="bg-gradient-to-b from-[#0d0f16] to-[#0a0b0f] border-t border-[#d4d8c5]/10 py-20 md:py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Lista de beneficios */}
            <div>
              <h2 className="text-3xl font-bold uppercase tracking-wide mb-8 text-white">
                ¿Qué incluye?
              </h2>
              <ul className="space-y-5">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-300 text-lg font-light">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Elemento visual técnico dinámico por servicio */}
            <div className="tech-border bg-[#12141c] p-8 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-50" />
              <div className="relative z-10 font-mono text-sm text-gray-400 space-y-4">
                <div className="flex items-center gap-2 text-cyan-400 border-b border-white/10 pb-4 mb-4">
                  <Code2 className="w-5 h-5" />
                  <span className="uppercase tracking-widest text-xs">
                    Especificaciones_Técnicas
                  </span>
                </div>
                {service.specs.map((spec) => (
                  <p
                    key={spec.label}
                    className={spec.accent ? 'text-emerald-400' : 'text-gray-300'}
                  >
                    {`> ${spec.label}: ${spec.value}`}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* ¿Para quién es ideal? */}
          <div className="border-t border-white/10 pt-14">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d4d8c5] uppercase tracking-widest mb-4">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>// Casos de Aplicación</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-white">
              ¿Para quién es ideal?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {service.idealFor.map((point, idx) => (
                <div
                  key={idx}
                  className="p-6 bg-[#12141c]/90 border border-white/10 rounded-sm"
                >
                  <span className="block text-xs font-mono text-cyan-400 mb-3">
                    0{idx + 1}
                  </span>
                  <p className="text-gray-300 font-light leading-relaxed text-sm md:text-base">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Explorar otros servicios */}
          <div className="border-t border-white/10 pt-14">
            <h3 className="text-sm font-mono text-[#d4d8c5] uppercase tracking-widest mb-6">
              // Explorar otros servicios
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherServices.map((other) => (
                <Link
                  key={other.slug}
                  href={`/servicios/${other.slug}`}
                  className="tech-border bg-[#12141c] p-6 hover:bg-[#d4d8c5]/5 transition-colors group flex items-center justify-between gap-4"
                >
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-wide text-white mb-1">
                      {other.title}
                    </h4>
                    <p className="text-sm text-gray-400 font-light">
                      {other.shortDesc}
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-[#d4d8c5] shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d4d8c5]/10 bg-black py-10 relative z-10 text-center">
        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Naxus Software Engineering. ·{' '}
          <Link
            href="/aviso-de-privacidad"
            className="hover:text-[#d4d8c5] underline underline-offset-4 transition-colors"
          >
            Aviso de Privacidad
          </Link>
        </p>
      </footer>
    </main>
  );
}
