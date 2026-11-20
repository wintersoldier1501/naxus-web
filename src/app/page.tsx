'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Layers,
  Code2,
  ArrowRight,
  Activity,
  X,
  CheckCircle2,
  Menu,
} from 'lucide-react';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ContactModal } from '@/components/ContactModal';
import {
  projectsData,
  projectColorStyles,
  servicesData,
  serviceSlugs,
  buildWhatsAppUrl,
  CONTACT_EMAIL,
} from '@/lib/data';

const METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Discovery & Arquitectura',
    desc: 'Análisis profundo de requerimientos, diseño de bases de datos y selección del stack tecnológico óptimo para tu visión.',
  },
  {
    step: '02',
    title: 'Desarrollo Ágil',
    desc: 'Ingeniería de software con sprints rápidos, código limpio y revisiones continuas para asegurar el máximo rendimiento.',
  },
  {
    step: '03',
    title: 'QA & Ciberseguridad',
    desc: 'Pruebas de estrés automatizadas, auditorías de vulnerabilidades y un control de calidad exhaustivo antes de salir a la luz.',
  },
  {
    step: '04',
    title: 'Deploy & Monitoreo',
    desc: 'Lanzamiento a producción en infraestructura de nivel empresarial, preparado para escalar automáticamente y monitoreo 24/7.',
  },
];

const NAV_LINKS = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#metodologia', label: 'Metodología' },
  { href: '#equipo', label: 'Equipo' },
];

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModal, setContactModal] = useState<{
    open: boolean;
    service?: string;
    context?: string;
  }>({ open: false });

  useEffect(() => {
    if (!activeProject) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow || 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeProject]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const handleCardMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  const openContact = (service?: string, context?: string) => {
    setMobileMenuOpen(false);
    setContactModal({ open: true, service, context });
  };

  const activeProjectData = activeProject ? projectsData[activeProject] : null;
  const activeColorStyle = activeProjectData
    ? projectColorStyles[activeProjectData.color]
    : null;

  const directWhatsAppHref = buildWhatsAppUrl(
    'Hola equipo Naxus, me interesa desarrollar un proyecto tecnológico para escalar mi empresa.'
  );

  return (
    <main className="min-h-screen bg-[#12141c] text-white selection:bg-[#d4d8c5]/30 font-sans overflow-x-clip">
      {/* STICKY NAVIGATION WITH SOLID BACKGROUND */}
      <header className="sticky top-0 z-50 w-full bg-[#12141c] border-b border-[#d4d8c5]/10">
        <nav className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 max-w-7xl mx-auto w-full">
          <a href="#" className="flex items-center gap-2 md:gap-4">
            <img
              src="/logo-transparent.svg"
              alt="Naxus Logo"
              className="w-10 h-10 md:w-14 md:h-14 object-contain scale-110"
            />
            <span
              className="text-xl md:text-3xl font-bold tracking-[0.2em] text-[#d4d8c5] uppercase"
              style={{ fontFamily: 'var(--font-syncopate)' }}
            >
              Naxus
            </span>
          </a>

          <div className="hidden md:flex gap-8 text-sm font-mono uppercase tracking-widest text-gray-400">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#d4d8c5] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => openContact()}
              className="tech-border px-4 py-2 md:px-6 md:py-2.5 text-[10px] md:text-xs font-bold tracking-widest text-[#d4d8c5] uppercase bg-black/50 hover:bg-[#d4d8c5] hover:text-[#11131a] transition-all cursor-pointer"
            >
              Contactar
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileMenuOpen}
              className="md:hidden p-2 border border-[#d4d8c5]/20 text-[#d4d8c5] bg-black/40 hover:bg-white/5 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22 }}
              className="md:hidden bg-[#12141c] border-t border-[#d4d8c5]/10 overflow-hidden"
            >
              <div className="px-4 py-5 flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-2 px-3 text-sm font-mono uppercase tracking-widest text-gray-300 hover:text-[#d4d8c5] hover:bg-white/5 rounded-sm transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
                <button
                  type="button"
                  onClick={() => openContact()}
                  className="mt-2 tech-border w-full py-3 bg-[#d4d8c5] text-[#11131a] font-bold uppercase tracking-widest text-xs cursor-pointer"
                >
                  Iniciar Proyecto
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* 1. HERO WITH INTERACTIVE PARTICLE BACKGROUND */}
      <div className="relative min-h-[85vh] flex flex-col">
        <ParticleBackground />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#d4d8c5]/5 rounded-[100%] blur-[100px] pointer-events-none z-0" />

        {/* CENTERED HERO SECTION */}
        <section className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full py-12 lg:py-0">
          {/* TEXT COLUMN */}
          <div className="flex flex-col items-start text-left w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-1.5 border border-[#d4d8c5]/20 bg-black/50 backdrop-blur-md text-[#d4d8c5] text-[10px] md:text-xs font-mono tracking-widest uppercase mb-6 md:mb-8 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#d4d8c5] animate-pulse" />
              Infraestructura Digital
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className="text-[clamp(2.15rem,8.4vw,4.5rem)] sm:text-6xl md:text-7xl lg:text-6xl xl:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-[0.95] uppercase w-full"
            >
              <span className="text-white block">DESARROLLAMOS</span>
              <span className="text-[#d4d8c5]/80 block">TU VISIÓN.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
              className="mt-2 text-base md:text-xl text-gray-400 max-w-xl font-light leading-relaxed"
            >
              Materializamos cualquier idea en ecosistemas digitales de alto
              rendimiento. <br className="hidden md:block" />
              Desarrollamos software, aplicaciones y plataformas tecnológicas
              diseñadas para escalar tu negocio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
              className="mt-8 md:mt-10 flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button
                type="button"
                onClick={() => openContact()}
                className="tech-border w-full sm:w-auto relative inline-flex items-center justify-center gap-3 px-6 py-4 md:px-9 md:py-4 bg-[#d4d8c5] text-[#11131a] font-bold uppercase tracking-widest text-xs md:text-sm transition-all hover:bg-white hover:shadow-[0_0_40px_-10px_rgba(212,216,197,0.8)] cursor-pointer"
              >
                <Terminal className="w-4 h-4" />
                Hablar con un experto
              </button>

              <a
                href="#proyectos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 border border-[#d4d8c5]/20 bg-black/40 backdrop-blur-md text-[#d4d8c5] font-mono uppercase tracking-widest text-xs md:text-sm hover:bg-white/5 hover:border-[#d4d8c5]/40 transition-all"
              >
                Ver proyectos <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>

          {/* ANIMATION COLUMN — CLEANLY STACKED ON MOBILE, FLOATING ON DESKTOP */}
          <div className="relative w-full flex flex-col gap-5 mt-4 lg:mt-0 lg:block lg:h-[500px]">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl opacity-50 animate-pulse pointer-events-none" />

            {/* Main Terminal Window */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
              transition={{
                opacity: { duration: 0.8 },
                x: { duration: 0.8 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut' },
              }}
              className="relative lg:absolute lg:right-0 lg:top-12 w-full max-w-sm mx-auto lg:mx-0 lg:w-80 bg-black/65 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
              <div className="bg-white/5 px-4 py-3 flex gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-4 lg:p-6 font-mono text-xs md:text-sm flex flex-col gap-3 lg:gap-4">
                <div className="flex gap-2 text-gray-400">
                  <span className="text-cyan-400">~</span> system.init()
                </div>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                  }}
                  className="h-1.5 lg:h-2 bg-cyan-400/80 rounded-full w-3/4 shadow-[0_0_8px_rgba(34,211,238,0.5)]"
                />
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.2,
                  }}
                  className="h-1.5 lg:h-2 bg-purple-500/60 rounded-full w-1/2"
                />
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    repeatType: 'reverse',
                    delay: 0.4,
                  }}
                  className="h-1.5 lg:h-2 bg-cyan-400/50 rounded-full w-5/6"
                />
                <div className="flex gap-2 text-gray-400 mt-1 lg:mt-2">
                  <span className="text-emerald-400">✔</span>{' '}
                  deploying_architecture
                </div>
              </div>
            </motion.div>

            {/* Floating Performance Card (Vertical SVG) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1, y: [0, 14, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.25 },
                scale: { duration: 0.8, delay: 0.25 },
                y: { duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 },
              }}
              className="relative lg:absolute lg:left-10 lg:bottom-20 w-full max-w-[260px] mx-auto lg:mx-0 lg:w-56 bg-[#12141c]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 lg:p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">
                  Escalabilidad
                </div>
              </div>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-1">
                100x
              </div>
              <div className="mt-4 h-16 w-full relative">
                <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
                  <path d="M 50 55 L 25 30" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 50 55 L 75 30" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 25 30 L 10 5" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 25 30 L 40 5" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 75 30 L 60 5" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 75 30 L 90 5" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />

                  <motion.path
                    d="M 50 55 L 25 30 L 10 5"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeDasharray="10 100"
                    animate={{ strokeDashoffset: [100, -50] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                    style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
                  />
                  <motion.path
                    d="M 50 55 L 25 30 L 40 5"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeDasharray="10 100"
                    animate={{ strokeDashoffset: [100, -50] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 0.3,
                    }}
                    style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
                  />
                  <motion.path
                    d="M 50 55 L 75 30 L 60 5"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeDasharray="10 100"
                    animate={{ strokeDashoffset: [100, -50] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 0.6,
                    }}
                    style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
                  />
                  <motion.path
                    d="M 50 55 L 75 30 L 90 5"
                    stroke="#34d399"
                    strokeWidth="2"
                    strokeDasharray="10 100"
                    animate={{ strokeDashoffset: [100, -50] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'linear',
                      delay: 0.9,
                    }}
                    style={{ filter: 'drop-shadow(0 0 4px #34d399)' }}
                  />

                  <circle
                    cx="50"
                    cy="55"
                    r="4"
                    fill="#34d399"
                    className="drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]"
                  />
                  <circle cx="25" cy="30" r="3" fill="#34d399" />
                  <circle cx="75" cy="30" r="3" fill="#34d399" />
                  <motion.circle
                    cx="10"
                    cy="5"
                    r="2"
                    fill="#34d399"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                  />
                  <motion.circle
                    cx="40"
                    cy="5"
                    r="2"
                    fill="#34d399"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.circle
                    cx="60"
                    cy="5"
                    r="2"
                    fill="#34d399"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
                  />
                  <motion.circle
                    cx="90"
                    cy="5"
                    r="2"
                    fill="#34d399"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity, delay: 0.9 }}
                  />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="border-y border-[#d4d8c5]/10 bg-black/40 backdrop-blur-md relative z-10 overflow-hidden py-4">
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 20 }}
            className="flex gap-16 items-center whitespace-nowrap opacity-60"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                {[
                  'DESARROLLO WEB',
                  'SISTEMAS A MEDIDA',
                  'DISEÑO UI/UX',
                  'E-COMMERCE',
                  'APPS MÓVILES',
                  'SOFTWARE EMPRESARIAL',
                ].map((service) => (
                  <span
                    key={service}
                    className="text-sm font-mono font-bold tracking-widest uppercase flex items-center gap-2"
                  >
                    <Layers className="w-4 h-4" /> {service}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. SERVICIOS */}
      <section
        id="servicios"
        className="py-24 md:py-32 max-w-7xl mx-auto px-6 relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16">
            <h2 className="text-sm font-mono text-[#d4d8c5] tracking-widest uppercase mb-2">
              // Nuestras Capacidades
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold">
              Arquitectura y Software.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Desarrollo Web */}
            <Link
              href={`/servicios/${serviceSlugs[0]}`}
              onMouseMove={handleCardMouseMove}
              className="tech-border bg-[#12141c] p-8 hover:bg-[#d4d8c5]/5 transition-colors group cursor-pointer flex flex-col h-full relative"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="spotlight-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="h-16 mb-8 flex items-center">
                  <div className="w-16 h-12 relative flex flex-col border border-white/10 rounded-md overflow-hidden bg-[#12141c] shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
                    <div className="h-3 bg-white/5 border-b border-white/10 flex items-center gap-1 px-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
                    </div>
                    <div className="flex-1 p-1.5 flex flex-col gap-1 relative overflow-hidden bg-black/50">
                      <motion.div
                        animate={{ y: ['100%', '0%', '0%', '-100%'] }}
                        transition={{
                          duration: 4,
                          times: [0, 0.15, 0.85, 1],
                          repeat: Infinity,
                        }}
                        className="absolute inset-0 p-1.5 flex flex-col gap-1"
                      >
                        <div className="h-1.5 w-1/3 bg-cyan-400 rounded-sm shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                        <div className="flex gap-1 flex-1">
                          <div className="w-1/4 h-full bg-purple-500/30 rounded-sm" />
                          <div className="flex-1 flex flex-col gap-1">
                            <div className="flex-1 bg-emerald-400/30 rounded-sm" />
                            <div className="flex-1 bg-emerald-400/30 rounded-sm" />
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">
                  {servicesData['desarrollo-web'].title}
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-8">
                  Sitios web corporativos, tiendas e-commerce y aplicaciones web
                  escalables. Código limpio, rápido y optimizado para SEO.
                </p>
                <span className="mt-auto text-xs font-mono text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explorar <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Card 2: Desarrollo de Software */}
            <Link
              href={`/servicios/${serviceSlugs[1]}`}
              onMouseMove={handleCardMouseMove}
              className="tech-border bg-[#12141c] p-8 hover:bg-[#d4d8c5]/5 transition-colors group cursor-pointer flex flex-col h-full relative"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="spotlight-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="h-16 mb-8 flex items-center">
                  <div className="w-20 h-16 flex items-center justify-center relative font-mono text-2xl font-bold">
                    <motion.span
                      animate={{
                        x: [-3, 0, -3],
                        color: ['#22d3ee', '#a855f7', '#22d3ee'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-cyan-400"
                    >
                      {'{'}
                    </motion.span>
                    <div className="flex flex-col gap-1.5 mx-2 w-8">
                      <motion.div
                        animate={{ width: ['0%', '100%', '0%'] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="h-1 bg-emerald-400 rounded-full shadow-[0_0_5px_rgba(52,211,153,0.8)]"
                      />
                      <motion.div
                        animate={{ width: ['0%', '80%', '0%'] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.3,
                        }}
                        className="h-1 bg-purple-500 rounded-full shadow-[0_0_5px_rgba(168,85,247,0.8)]"
                      />
                      <motion.div
                        animate={{ width: ['0%', '100%', '0%'] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: 0.6,
                        }}
                        className="h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]"
                      />
                    </div>
                    <motion.span
                      animate={{
                        x: [3, 0, 3],
                        color: ['#a855f7', '#22d3ee', '#a855f7'],
                      }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-purple-500"
                    >
                      {'}'}
                    </motion.span>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">
                  {servicesData['desarrollo-de-software'].title}
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-8">
                  Creamos sistemas a medida, automatización de procesos y
                  plataformas robustas para optimizar las operaciones de tu
                  empresa.
                </p>
                <span className="mt-auto text-xs font-mono text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explorar <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>

            {/* Card 3: Diseño UI/UX */}
            <Link
              href={`/servicios/${serviceSlugs[2]}`}
              onMouseMove={handleCardMouseMove}
              className="tech-border bg-[#12141c] p-8 hover:bg-[#d4d8c5]/5 transition-colors group cursor-pointer flex flex-col h-full relative"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="spotlight-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="h-16 mb-8 flex items-center">
                  <div className="w-16 h-16 relative border border-white/10 rounded bg-black/40 p-1.5 flex gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                    <div className="w-3 h-full border border-white/10 rounded-sm bg-white/5" />
                    <div className="flex-1 flex flex-col gap-1.5 relative">
                      <div className="h-2 w-full border border-white/10 rounded-[2px] bg-white/5" />
                      <div className="flex-1 border border-white/10 rounded-sm flex items-center justify-center relative overflow-hidden bg-white/5">
                        <motion.div
                          animate={{
                            scale: [1, 0.9, 1],
                            backgroundColor: [
                              'rgba(255,255,255,0.05)',
                              'rgba(52,211,153,0.5)',
                              'rgba(255,255,255,0.05)',
                            ],
                            borderColor: [
                              'rgba(255,255,255,0.1)',
                              'rgba(52,211,153,1)',
                              'rgba(255,255,255,0.1)',
                            ],
                          }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          className="w-6 h-3 border rounded-[2px]"
                        />
                        <motion.svg
                          viewBox="0 0 24 24"
                          className="absolute w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] z-10"
                          animate={{ x: [12, 0, 12], y: [12, 0, 12] }}
                          transition={{ duration: 2.5, repeat: Infinity }}
                          fill="currentColor"
                        >
                          <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 5z" />
                        </motion.svg>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">
                  {servicesData['diseno-ui-ux'].title}
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-8">
                  Interfaces de usuario espectaculares enfocadas en la
                  conversión. Experiencias digitales que enamoran a tus clientes.
                </p>
                <span className="mt-auto text-xs font-mono text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explorar <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 3. PROYECTOS (PORTAFOLIO) */}
      <section
        id="proyectos"
        className="py-24 md:py-32 bg-black/50 border-y border-[#d4d8c5]/10 relative z-10 animated-dots"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6 }}
          className="max-w-7xl mx-auto px-6"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-mono text-[#d4d8c5] tracking-widest uppercase mb-2">
                // Casos de Estudio
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold">
                Proyectos Destacados.
              </h3>
            </div>
            <span className="text-xs font-mono text-[#d4d8c5]/70 uppercase tracking-widest border border-[#d4d8c5]/15 bg-[#12141c]/80 px-3 py-1.5 self-start md:self-auto">
              03 Casos Seleccionados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Project 1: Eyemax */}
            <div
              onClick={() => setActiveProject('eyemax')}
              onMouseMove={handleCardMouseMove}
              className="group cursor-pointer md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#12141c] p-6 sm:p-8 tech-border hover:bg-[#d4d8c5]/5 transition-colors relative"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="spotlight-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10 w-full aspect-video bg-[#1a1d27] overflow-hidden rounded-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />
                <img
                  src="/project-eyemax.png"
                  alt="Eyemax AI System"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#12141c]/85 backdrop-blur-md text-cyan-400 text-xs font-mono uppercase tracking-wider border border-cyan-500/35 rounded-full">
                    Computer Vision
                  </span>
                  <span className="px-3 py-1 bg-[#12141c]/85 backdrop-blur-md text-purple-400 text-xs font-mono uppercase tracking-wider border border-purple-500/35 rounded-full">
                    Edge AI
                  </span>
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  EYEMAX{' '}
                  <span className="text-xs font-mono text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest">
                    Activo
                  </span>
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-5">
                  Sistema inteligente de punto de venta y escaneo visual para la
                  industria joyera. Identifica inventario al instante capturando
                  una foto, operando bajo una arquitectura Dual-Layer RAG con
                  modelos de visión vectorial y LLMs multimodales.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {projectsData.eyemax.highlights.map((item) => (
                    <span
                      key={item}
                      className={`text-xs font-mono px-2.5 py-1 rounded-sm border ${projectColorStyles.cyan.highlight}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    'Python',
                    'Flask',
                    'ONNX',
                    'Gemini 2.5 Flash',
                    'Firebase',
                    'Pandas',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-[#d4d8c5]/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Explorar Arquitectura <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Featured Project 2: PRO-ZEUS */}
            <div
              onClick={() => setActiveProject('zeus')}
              onMouseMove={handleCardMouseMove}
              className="group cursor-pointer md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#12141c] p-6 sm:p-8 tech-border hover:bg-[#d4d8c5]/5 transition-colors relative"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="spotlight-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10 order-2 md:order-1">
                <h4 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  PRO-ZEUS{' '}
                  <span className="text-xs font-mono text-purple-400 border border-purple-400/30 bg-purple-400/10 px-2 py-1 rounded-full uppercase tracking-widest">
                    SaaS
                  </span>
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-5">
                  Arquitecto Cloud potenciado por IA que diseña y despliega
                  infraestructuras de grado empresarial. Traduce lenguaje
                  natural a código Terraform estructurado en tiempo real,
                  orquestando servidores, bases de datos y redes en segundos.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {projectsData.zeus.highlights.map((item) => (
                    <span
                      key={item}
                      className={`text-xs font-mono px-2.5 py-1 rounded-sm border ${projectColorStyles.purple.highlight}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    'React.js',
                    'Node.js',
                    'Terraform',
                    'Gemini 2.5 Flash',
                    'Firebase',
                    'Vite',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-[#d4d8c5]/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Ver Dashboard <ArrowRight className="w-4 h-4" />
                </span>
              </div>

              <div className="relative z-10 order-1 md:order-2 w-full aspect-video bg-[#1a1d27] overflow-hidden rounded-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />
                <img
                  src="/project-zeus.png"
                  alt="PRO-ZEUS Dashboard"
                  className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 right-4 z-20 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#12141c]/85 backdrop-blur-md text-emerald-400 text-xs font-mono uppercase tracking-wider border border-emerald-500/35 rounded-full">
                    DevOps
                  </span>
                  <span className="px-3 py-1 bg-[#12141c]/85 backdrop-blur-md text-blue-400 text-xs font-mono uppercase tracking-wider border border-blue-500/35 rounded-full">
                    IaC
                  </span>
                </div>
              </div>
            </div>

            {/* Featured Project 3: BIOSALUD */}
            <div
              onClick={() => setActiveProject('biosalud')}
              onMouseMove={handleCardMouseMove}
              className="group cursor-pointer md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#12141c] p-6 sm:p-8 tech-border hover:bg-[#d4d8c5]/5 transition-colors relative"
            >
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="spotlight-glow absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10 w-full aspect-video bg-[#1a1d27] overflow-hidden rounded-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent z-10 pointer-events-none" />
                <img
                  src="/project-biosalud.png"
                  alt="Biosalud Web Platform"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-[#12141c]/85 backdrop-blur-md text-emerald-400 text-xs font-mono uppercase tracking-wider border border-emerald-500/35 rounded-full">
                    Web App
                  </span>
                  <span className="px-3 py-1 bg-[#12141c]/85 backdrop-blur-md text-amber-400 text-xs font-mono uppercase tracking-wider border border-amber-500/35 rounded-full">
                    UI/UX
                  </span>
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  BIOSALUD{' '}
                  <span className="text-xs font-mono text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest">
                    Lanzado
                  </span>
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-5">
                  Plataforma clínica premium diseñada para digitalizar la
                  captación de pacientes. Arquitectura Single Page Application
                  (SPA) de alto rendimiento con agendamiento automatizado e
                  interfaz minimalista orientada a la conversión.
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {projectsData.biosalud.highlights.map((item) => (
                    <span
                      key={item}
                      className={`text-xs font-mono px-2.5 py-1 rounded-sm border ${projectColorStyles.amber.highlight}`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {[
                    'React.js',
                    'Vite',
                    'React Router',
                    'CSS Grid',
                    'Calendly API',
                    'Lucide',
                  ].map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-mono text-[#d4d8c5]/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                  Ver Diseño <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 4. METODOLOGÍA (2-COLUMN RESPONSIVE WITH STICKY HEADER) */}
      <section
        id="metodologia"
        className="py-24 md:py-32 max-w-7xl mx-auto px-6 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            <h2 className="text-sm font-mono text-[#d4d8c5] tracking-widest uppercase mb-2">
              // Ingeniería de Precisión
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold mb-6">
              Nuestra Metodología.
            </h3>
            <p className="text-gray-400 font-light leading-relaxed mb-8 max-w-md">
              Cada sistema sigue un proceso estructurado de punta a punta: desde
              la arquitectura inicial hasta el despliegue en producción con
              monitoreo continuo.
            </p>
            <div className="inline-flex items-center gap-3 px-4 py-2 border border-[#d4d8c5]/15 bg-black/40 text-xs font-mono text-[#d4d8c5]/80 uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
              04 Fases · Entregas Iterativas
            </div>
          </motion.div>

          <div className="lg:col-span-7">
            <div className="relative border-l border-gray-800 ml-3 md:ml-4">
              <motion.div
                className="absolute top-0 left-[-1px] w-[2px] bg-gradient-to-b from-emerald-400 to-cyan-400"
                initial={{ height: 0 }}
                whileInView={{ height: '100%' }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
                viewport={{ once: true, amount: 0.15 }}
              />

              {METHODOLOGY_STEPS.map((item, index) => (
                <motion.div
                  key={item.step}
                  className="mb-12 last:mb-0 relative pl-8 md:pl-12"
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.1 }}
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="absolute top-1 -left-[5px] w-[10px] h-[10px] rounded-full bg-[#12141c] border-2 border-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] z-10" />

                  <span className="text-xs font-mono text-emerald-400 tracking-widest mb-1 block">
                    FASE {item.step}
                  </span>
                  <h4 className="text-xl md:text-2xl font-bold mb-3 text-[#d4d8c5]">
                    {item.title}
                  </h4>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. EQUIPO */}
      <section
        id="equipo"
        className="py-24 md:py-32 max-w-7xl mx-auto px-6 relative z-10 border-t border-[#d4d8c5]/10"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-sm font-mono text-[#d4d8c5] tracking-widest uppercase mb-2">
              // Núcleo Operativo
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold">
              Conoce al Equipo.
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Team Member 1 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 tech-border bg-[#1a1d27] rounded-full mb-6 flex items-center justify-center overflow-hidden relative">
                <img
                  src="/ceo-profile.png"
                  alt="Sergio M. - CEO & DevOps Architect"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 border-2 border-[#d4d8c5]/10 rounded-full pointer-events-none group-hover:border-cyan-400/50 transition-colors" />
              </div>
              <h4 className="text-xl font-bold">Socio Fundador</h4>
              <p className="text-[#d4d8c5] text-sm font-mono uppercase tracking-wider mb-2">
                CEO & DevOps Architect
              </p>
              <span className="text-gray-400 font-light">Sergio M.</span>
            </div>

            {/* Team Member 2 */}
            <div className="flex flex-col items-center text-center group">
              <div className="w-40 h-40 tech-border bg-[#1a1d27] rounded-full mb-6 flex items-center justify-center overflow-hidden relative">
                <img
                  src="/roberto.png"
                  alt="Roberto Sariñana - Asesor Técnico"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 border-2 border-[#d4d8c5]/10 rounded-full pointer-events-none group-hover:border-cyan-400/50 transition-colors" />
              </div>
              <h4 className="text-xl font-bold">Asesor Técnico</h4>
              <p className="text-[#d4d8c5] text-sm font-mono uppercase tracking-wider mb-2">
                Backend Engineer
              </p>
              <span className="text-gray-400 font-light">Roberto Sariñana</span>
            </div>

            {/* Team Member 3 */}
            <div className="flex flex-col items-center text-center group sm:col-span-2 md:col-span-1">
              <div className="w-40 h-40 tech-border bg-[#1a1d27] rounded-full mb-6 flex items-center justify-center overflow-hidden relative">
                <img
                  src="/paulina-profile.png"
                  alt="Paulina López - COO"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 border-2 border-[#d4d8c5]/10 rounded-full pointer-events-none group-hover:border-cyan-400/50 transition-colors" />
              </div>
              <h4 className="text-xl font-bold">Directora de Operaciones</h4>
              <p className="text-[#d4d8c5] text-sm font-mono uppercase tracking-wider mb-2">
                Chief Operating Officer
              </p>
              <span className="text-gray-400 font-light">Paulina López</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* TERMINAL CTA SECTION */}
      <section className="py-24 md:py-32 bg-[#0a0b0f] relative overflow-hidden border-t border-[#d4d8c5]/10">
        <div className="absolute inset-0 hex-grid-container opacity-30">
          <div className="hex-grid" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10"
        >
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-14 shadow-[0_0_50px_-12px_rgba(34,211,238,0.15)] relative overflow-hidden group hover:shadow-[0_0_80px_-12px_rgba(34,211,238,0.25)] transition-shadow duration-700">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent blur-[80px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-700" />

            <div className="relative z-10 flex flex-col items-start">
              <div className="flex gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>

              <div className="font-mono text-sm md:text-base text-cyan-400 mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>root@naxus:~$ ./deploy_vision.sh</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 text-white leading-none">
                ¿LISTO PARA <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4d8c5] via-[#d4d8c5] to-[#d4d8c5]/60">
                  ESCALAR TU EMPRESA?
                </span>
              </h2>

              <div className="text-sm md:text-base font-mono font-light mb-8 text-gray-400 space-y-2">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  {'>'} Analizando requerimientos técnicos... [OK]
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.45 }}
                >
                  {'>'} Diseñando arquitectura de alto rendimiento... [OK]
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.75 }}
                  className="text-emerald-400"
                >
                  {'>'} Sistema listo. Esperando inicialización.
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openContact()}
                  className="group/btn relative px-6 py-4 md:px-8 md:py-4 bg-transparent border border-cyan-500/50 text-cyan-400 font-mono uppercase tracking-widest text-xs md:text-sm overflow-hidden transition-all hover:bg-cyan-500/10 hover:border-cyan-400 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 md:gap-3 font-bold">
                    <Code2 className="w-4 h-4" /> [ INICIAR_PROYECTO ]{' '}
                    <span className="w-2 h-4 bg-cyan-400 animate-pulse" />
                  </span>
                </button>

                <a
                  href={directWhatsAppHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono text-gray-400 hover:text-[#d4d8c5] transition-colors flex items-center justify-center gap-1.5 py-2"
                >
                  o escribir directo por WhatsApp <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d4d8c5]/10 bg-black py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img
              src="/logo-transparent.svg"
              alt="Naxus Logo"
              className="w-12 h-12 object-contain scale-110 opacity-80"
            />
            <span
              className="text-2xl font-bold tracking-[0.2em] text-[#d4d8c5] uppercase"
              style={{ fontFamily: 'var(--font-syncopate)' }}
            >
              Naxus
            </span>
          </div>

          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex flex-wrap justify-center gap-5 text-xs font-mono uppercase tracking-widest text-gray-500">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-[#d4d8c5] transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <p className="text-gray-500 text-xs font-mono">
              © {new Date().getFullYear()} Naxus Software Engineering. · All
              systems operational.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-6">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm font-mono text-gray-400 hover:text-[#d4d8c5] transition-colors uppercase tracking-widest text-center"
            >
              {CONTACT_EMAIL}
            </a>
            <a
              href={buildWhatsAppUrl(
                'Hola equipo Naxus, me interesa desarrollar un proyecto tecnológico.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-mono text-gray-400 hover:text-[#d4d8c5] transition-colors uppercase tracking-widest text-center"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </footer>

      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProjectData && activeColorStyle && (
          <div
            className="fixed inset-0 z-[100] flex items-center sm:items-start justify-center p-4 sm:p-10 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/80 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20"
            onClick={() => setActiveProject(null)}
            role="dialog"
            aria-modal="true"
            aria-label={activeProjectData.title}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#12141c] tech-border rounded-xl overflow-hidden flex flex-col shadow-2xl z-10 my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Cerrar proyecto"
                className="absolute top-4 right-4 z-50 p-2 bg-[#12141c]/90 backdrop-blur-md hover:bg-white rounded-full text-white hover:text-[#12141c] transition-colors border border-white/25 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header Image */}
              <div className="w-full h-64 sm:h-80 relative bg-[#1a1d27] shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-[#12141c]/60 to-black/25 z-10" />
                <img
                  src={activeProjectData.image}
                  alt={activeProjectData.title}
                  className="w-full h-full object-cover object-top opacity-85"
                />
                <div className="absolute bottom-6 left-6 sm:left-10 z-20">
                  <span
                    className={`inline-block px-3 py-1 bg-[#12141c]/80 backdrop-blur-md text-xs font-mono uppercase tracking-wider border rounded-full mb-3 ${activeColorStyle.badge}`}
                  >
                    {activeProjectData.tag}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black">
                    {activeProjectData.title}
                  </h3>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                  {/* Left Column (Overview & Architecture) */}
                  <div className="md:col-span-2 space-y-8">
                    <section>
                      <h4 className="text-sm font-mono text-[#d4d8c5] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Terminal className="w-4 h-4" /> Resumen del Proyecto
                      </h4>
                      <p className="text-gray-300 leading-relaxed font-light text-lg">
                        {activeProjectData.overview}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-sm font-mono text-[#d4d8c5] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Arquitectura & Solución
                      </h4>
                      <div className="space-y-4">
                        {activeProjectData.architecture.map((item, i) => (
                          <div
                            key={i}
                            className="p-4 bg-white/5 border border-white/10 rounded-sm"
                          >
                            <h5
                              className={`font-bold mb-2 flex items-center gap-2 ${activeColorStyle.title}`}
                            >
                              <CheckCircle2 className="w-4 h-4" /> {item.name}
                            </h5>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">
                              {item.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Right Column (Impact & Tech Stack) */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="text-sm font-mono text-[#d4d8c5] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Activity className="w-4 h-4" /> Impacto Clave
                      </h4>
                      <div className="flex flex-col gap-2">
                        {activeProjectData.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className={`px-3 py-2 rounded-sm border text-xs font-mono ${activeColorStyle.highlight}`}
                          >
                            {highlight}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section>
                      <h4 className="text-sm font-mono text-[#d4d8c5] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Code2 className="w-4 h-4" /> Stack Tecnológico
                      </h4>
                      <div className="flex flex-col gap-2">
                        {activeProjectData.tech.map((tech, i) => (
                          <div
                            key={i}
                            className="px-4 py-2 border border-white/10 rounded-sm bg-white/5 text-sm font-mono text-[#d4d8c5] flex items-center gap-3"
                          >
                            <div
                              className={`w-2 h-2 rounded-full shrink-0 ${activeColorStyle.dot}`}
                            />
                            {tech}
                          </div>
                        ))}
                      </div>
                    </section>

                    <button
                      type="button"
                      onClick={() => {
                        const title = activeProjectData.title;
                        setActiveProject(null);
                        openContact('Software a Medida', `Proyecto similar a ${title}`);
                      }}
                      className="w-full py-3 px-4 bg-[#d4d8c5] text-[#11131a] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      Cotizar proyecto similar <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CONTACT / BRIEF MODAL */}
      <ContactModal
        isOpen={contactModal.open}
        onClose={() => setContactModal((prev) => ({ ...prev, open: false }))}
        initialService={contactModal.service}
        initialContext={contactModal.context}
      />
    </main>
  );
}
