import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { CONTACT_EMAIL } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Aviso de Privacidad | Naxus',
  description:
    'Aviso de privacidad integral de Naxus Software Engineering respecto al tratamiento y protección de datos personales.',
  alternates: {
    canonical: '/aviso-de-privacidad',
  },
};

export default function AvisoDePrivacidadPage() {
  return (
    <main className="min-h-screen bg-[#12141c] text-white selection:bg-[#d4d8c5]/30 font-sans overflow-x-clip flex flex-col">
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
            href="/"
            className="text-xs font-mono text-gray-400 hover:text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Volver
          </Link>
        </nav>
      </header>

      <article className="flex-1 max-w-3xl mx-auto px-6 py-16 md:py-24 w-full space-y-10">
        <div className="border-b border-white/10 pb-8">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-4">
            <ShieldCheck className="w-4 h-4" />
            <span>// Protección de Datos</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight uppercase text-white mb-4">
            Aviso de Privacidad
          </h1>
          <p className="text-sm font-mono text-gray-400">
            Última actualización: Noviembre 2026 · naxus.com.mx
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#d4d8c5] uppercase tracking-wide">
            1. Identidad del responsable
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            <strong>Naxus Software Engineering</strong> (en adelante, &ldquo;Naxus&rdquo;), con
            sitio web oficial en <span className="text-[#d4d8c5]">https://naxus.com.mx</span>,
            es responsable del tratamiento y protección de los datos personales
            que nos proporciones voluntariamente al solicitar información o
            cotizaciones de nuestros servicios tecnológicos.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#d4d8c5] uppercase tracking-wide">
            2. Datos que recabamos
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            En este sitio web no almacenamos bases de datos de visitantes sin su
            consentimiento. Únicamente recibimos los datos de contacto y
            descripción del proyecto que tú decides enviarnos voluntariamente a
            través de WhatsApp o correo electrónico (nombre, empresa y detalles
            técnicos). Adicionalmente, utilizamos analíticas web agregadas y sin
            cookies invasivas para medir rendimiento general del sitio.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#d4d8c5] uppercase tracking-wide">
            3. Finalidad del tratamiento
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            La información proporcionada se utiliza exclusivamente para atender
            tus consultas técnicas, elaborar propuestas económicas o de
            arquitectura de software y dar seguimiento a la relación comercial
            que solicites. No vendemos, alquilamos ni compartimos tu información
            con terceros con fines publicitarios.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-[#d4d8c5] uppercase tracking-wide">
            4. Derechos ARCO y contacto
          </h2>
          <p className="text-gray-400 font-light leading-relaxed">
            En cumplimiento con la Ley Federal de Protección de Datos Personales
            en Posesión de los Particulares (LFPDPPP), puedes solicitar el
            acceso, rectificación, cancelación u oposición (derechos ARCO)
            respecto al uso de tus datos enviando un correo a{' '}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-cyan-400 hover:underline font-mono"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </section>
      </article>

      <footer className="border-t border-[#d4d8c5]/10 bg-black py-10 relative z-10 text-center">
        <p className="text-gray-500 text-xs font-mono uppercase tracking-widest">
          © {new Date().getFullYear()} Naxus Software Engineering.
        </p>
      </footer>
    </main>
  );
}
