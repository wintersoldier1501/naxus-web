'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Layers, Code2, Rocket, MonitorSmartphone, Users, ArrowUpRight, ArrowRight, Server, Activity, X, CheckCircle2 } from 'lucide-react';

const projectsData: Record<string, any> = {
  eyemax: {
    title: "EYEMAX",
    tag: "Computer Vision & Edge AI",
    color: "cyan",
    image: "/project-eyemax.png",
    overview: "Eyemax es un sistema inteligente de punto de venta y escaneo visual diseñado para la industria de la joyería. Su objetivo principal es resolver el problema de la identificación manual de inventario: permite a los vendedores tomar una fotografía de cualquier pieza de joyería y, en cuestión de segundos, la inteligencia artificial identifica el modelo exacto, cruzando la información con el catálogo y existencias en tiempo real.",
    architecture: [
      { name: "Capa Local (Velocidad)", desc: "Procesa la imagen localmente utilizando modelos de visión vectorial para encontrar similitudes matemáticas en el catálogo al instante (Vector Search)." },
      { name: "Capa Cloud (Precisión)", desc: "Si existen piezas muy similares, el sistema delega la decisión final a un LLM multimodal avanzado (Gemini) para extraer características finas." }
    ],
    tech: ["Python", "Flask", "ONNX Runtime (DINOv2/CLIP)", "Google Gemini 3.6 Flash", "Firebase Firestore", "Pandas", "WebRTC"]
  },
  zeus: {
    title: "PRO-ZEUS",
    tag: "AI Cloud Architect",
    color: "purple",
    image: "/project-zeus.png",
    overview: "PRO-ZEUS es una plataforma SaaS innovadora diseñada para revolucionar el mundo de DevOps y la arquitectura en la nube. A través de un motor de Inteligencia Artificial integrado, la plataforma permite a los usuarios diseñar, visualizar y desplegar infraestructuras de grado empresarial utilizando simples comandos en lenguaje natural.",
    architecture: [
      { name: "Generación IaC con IA", desc: "Traducción de lenguaje natural a código Terraform estructurado en tiempo real, aplicando las mejores prácticas de ciberseguridad." },
      { name: "Dashboard & BYOC", desc: "Monitoreo visual de recursos simulados, inicio de sesión seguro con Google y un módulo para encriptar credenciales de nube." }
    ],
    tech: ["React.js", "Vite", "Node.js", "Google Gemini 2.5 Flash", "HashiCorp Terraform", "Firebase Auth", "Recharts"]
  },
  biosalud: {
    title: "BIOSALUD",
    tag: "Web App Clínica",
    color: "amber",
    image: "/project-biosalud.png",
    overview: "Desarrollo de una aplicación web multipágina (SPA) de diseño premium para una profesional de la nutrición clínica. El objetivo principal fue digitalizar y automatizar el flujo de captación de pacientes, pasando de un modelo tradicional a una clínica virtual moderna con agendamiento automatizado.",
    architecture: [
      { name: "UI/UX Minimalista", desc: "Interfaz diseñada desde cero utilizando una paleta de colores orgánicos y tipografías elegantes para transmitir confianza y profesionalismo." },
      { name: "Single Page Application", desc: "Enrutamiento fluido sin recargas de página, optimizado para móviles (Mobile-First) con integración nativa a la API de Calendly." }
    ],
    tech: ["React.js", "Vite", "React Router DOM", "Custom CSS3 (Variables, Grid)", "Lucide React", "Calendly API"]
  }
};

export default function Home() {
  const [activeProject, setActiveProject] = useState<string | null>(null);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [activeProject]);
  return (
    <main className="min-h-screen bg-[#12141c] text-white selection:bg-[#d4d8c5]/30 font-sans overflow-x-hidden">
      
      {/* 1. TECH GRID BACKGROUND & HERO */}
      <div className="relative min-h-[90vh] flex flex-col">
        <div className="hex-grid-container opacity-70">
          <div className="hex-grid"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#d4d8c5]/5 rounded-[100%] blur-[100px] pointer-events-none z-0"></div>

        {/* NAVIGATION */}
        {/* NAVIGATION */}
        <nav className="relative z-50 flex items-center justify-between px-4 md:px-8 py-4 md:py-6 max-w-7xl mx-auto w-full border-b border-[#d4d8c5]/10">
          <div className="flex items-center gap-2 md:gap-4">
            <img src="/logo-transparent.svg" alt="Naxus Logo" className="w-10 h-10 md:w-16 md:h-16 object-contain scale-110" />
            <span className="text-xl md:text-3xl font-bold tracking-[0.2em] text-[#d4d8c5] uppercase" style={{ fontFamily: 'var(--font-syncopate)' }}>Naxus</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-mono uppercase tracking-widest text-gray-500">
            <a href="#servicios" className="hover:text-[#d4d8c5] transition-colors">Servicios</a>
            <a href="#proyectos" className="hover:text-[#d4d8c5] transition-colors">Proyectos</a>
            <a href="#equipo" className="hover:text-[#d4d8c5] transition-colors">Equipo</a>
          </div>
          <button className="tech-border px-4 py-2 md:px-6 md:py-2 text-[10px] md:text-xs font-bold tracking-widest text-[#d4d8c5] uppercase bg-black/50 backdrop-blur hover:bg-[#d4d8c5] hover:text-[#11131a] transition-all">
            Contactar
          </button>
        </nav>

        {/* CENTERED HERO SECTION */}
        <section className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center px-4 md:px-8 lg:px-12 max-w-7xl mx-auto w-full pb-12 lg:pb-0">
          {/* TEXT COLUMN */}
          <div className="flex flex-col items-start text-left pt-8 md:pt-12 lg:pt-0 w-full overflow-hidden">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-1.5 border border-[#d4d8c5]/20 bg-black/50 backdrop-blur-md text-[#d4d8c5] text-[10px] md:text-xs font-mono tracking-widest uppercase mb-6 md:mb-8 whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#d4d8c5] animate-pulse"></span>
              Infraestructura Digital
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              className="text-[11vw] sm:text-6xl md:text-7xl font-black mb-4 md:mb-6 tracking-tighter leading-[0.9] uppercase w-full"
            >
              <span className="text-white block truncate md:overflow-visible">DESARROLLAMOS</span>
              <span className="text-[#d4d8c5]/70 block truncate md:overflow-visible">TU VISIÓN.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              className="mt-2 text-base md:text-xl text-gray-400 max-w-xl font-light leading-relaxed"
            >
              Materializamos cualquier idea en ecosistemas digitales de alto rendimiento. <br className="hidden md:block" />
              Desarrollamos software, aplicaciones y plataformas tecnológicas diseñadas para escalar tu negocio.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="mt-8 md:mt-12 w-full sm:w-auto"
            >
              <button className="tech-border w-full sm:w-auto relative inline-flex items-center justify-center gap-3 px-6 py-4 md:px-10 md:py-4 bg-[#d4d8c5] text-[#11131a] font-bold uppercase tracking-widest text-xs md:text-sm overflow-hidden transition-all hover:bg-white hover:shadow-[0_0_40px_-10px_rgba(212,216,197,0.8)]">
                <Terminal className="w-4 h-4" />
                Hablar con un experto
              </button>
            </motion.div>
          </div>

          {/* ANIMATION COLUMN */}
          <div className="relative w-full h-[350px] lg:h-[500px] flex items-center justify-center mt-4 lg:mt-0">
            {/* Glowing backdrop */}
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-purple-500/5 to-transparent rounded-full blur-3xl opacity-50 animate-pulse"></div>
            
            {/* Main Terminal Window */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
              transition={{ opacity: {duration: 0.8}, x: {duration: 0.8}, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute right-0 lg:right-0 top-4 lg:top-12 w-[85%] max-w-sm lg:w-80 bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl"
            >
              {/* Terminal Header */}
              <div className="bg-white/5 px-4 py-3 flex gap-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              {/* Terminal Body */}
              <div className="p-4 lg:p-6 font-mono text-xs md:text-sm flex flex-col gap-3 lg:gap-4">
                <div className="flex gap-2 text-gray-400"><span className="text-cyan-400">~</span> system.init()</div>
                <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} className="h-1.5 lg:h-2 bg-cyan-400/80 rounded-full w-3/4 shadow-[0_0_8px_rgba(34,211,238,0.5)]"></motion.div>
                <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse", delay: 0.2 }} className="h-1.5 lg:h-2 bg-purple-500/60 rounded-full w-1/2"></motion.div>
                <motion.div initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse", delay: 0.4 }} className="h-1.5 lg:h-2 bg-cyan-400/50 rounded-full w-5/6"></motion.div>
                <div className="flex gap-2 text-gray-400 mt-1 lg:mt-2"><span className="text-emerald-400">✔</span> deploying_architecture</div>
              </div>
            </motion.div>

            {/* Floating Performance Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1, y: [0, 20, 0] }}
              transition={{ opacity: {duration: 0.8, delay: 0.3}, scale: {duration: 0.8, delay: 0.3}, y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 } }}
              className="absolute left-0 lg:left-10 bottom-0 lg:bottom-20 w-[65%] max-w-[220px] lg:w-56 bg-[#12141c]/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 lg:p-6 shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <Activity className="w-5 h-5 text-emerald-400" />
                </div>
                <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">Escalabilidad</div>
              </div>
              <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-1">100x</div>
              <div className="mt-4 h-16 w-full relative">
                <svg viewBox="0 0 100 60" className="w-full h-full overflow-visible">
                  {/* Background faint lines */}
                  <path d="M 10 30 L 40 15" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 10 30 L 40 45" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 40 15 L 80 5" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 40 15 L 80 25" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 40 45 L 80 35" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  <path d="M 40 45 L 80 55" stroke="rgba(52,211,153,0.1)" strokeWidth="2" />
                  
                  {/* Animated Data Packets (Paths with dash offset) */}
                  <motion.path d="M 10 30 L 40 15 L 80 5" stroke="#34d399" strokeWidth="2" strokeDasharray="10 100" animate={{ strokeDashoffset: [100, -50] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} style={{ filter: "drop-shadow(0 0 4px #34d399)" }} />
                  <motion.path d="M 10 30 L 40 15 L 80 25" stroke="#34d399" strokeWidth="2" strokeDasharray="10 100" animate={{ strokeDashoffset: [100, -50] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.3 }} style={{ filter: "drop-shadow(0 0 4px #34d399)" }} />
                  <motion.path d="M 10 30 L 40 45 L 80 35" stroke="#34d399" strokeWidth="2" strokeDasharray="10 100" animate={{ strokeDashoffset: [100, -50] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.6 }} style={{ filter: "drop-shadow(0 0 4px #34d399)" }} />
                  <motion.path d="M 10 30 L 40 45 L 80 55" stroke="#34d399" strokeWidth="2" strokeDasharray="10 100" animate={{ strokeDashoffset: [100, -50] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.9 }} style={{ filter: "drop-shadow(0 0 4px #34d399)" }} />

                  {/* Nodes */}
                  <circle cx="10" cy="30" r="4" fill="#34d399" className="drop-shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  <circle cx="40" cy="15" r="3" fill="#34d399" />
                  <circle cx="40" cy="45" r="3" fill="#34d399" />
                  <motion.circle cx="80" cy="5" r="2" fill="#34d399" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0 }} />
                  <motion.circle cx="80" cy="25" r="2" fill="#34d399" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.3 }} />
                  <motion.circle cx="80" cy="35" r="2" fill="#34d399" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.6 }} />
                  <motion.circle cx="80" cy="55" r="2" fill="#34d399" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 1, repeat: Infinity, delay: 0.9 }} />
                </svg>
              </div>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE */}
        <div className="border-y border-[#d4d8c5]/10 bg-black/40 backdrop-blur-md relative z-10 overflow-hidden py-4">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
            className="flex gap-16 items-center whitespace-nowrap opacity-50"
          >
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-16 items-center">
                {['DESARROLLO WEB', 'SISTEMAS A MEDIDA', 'DISEÑO UI/UX', 'E-COMMERCE', 'APPS MÓVILES', 'SOFTWARE EMPRESARIAL'].map((service) => (
                  <span key={service} className="text-sm font-mono font-bold tracking-widest uppercase flex items-center gap-2">
                    <Layers className="w-4 h-4" /> {service}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* 2. SERVICIOS */}
      <section id="servicios" className="py-32 max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
          <h2 className="text-sm font-mono text-[#d4d8c5] tracking-widest uppercase mb-2">// Nuestras Capacidades</h2>
          <h3 className="text-4xl md:text-5xl font-bold">Arquitectura y Software.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="tech-border bg-[#12141c] p-8 hover:bg-[#d4d8c5]/5 transition-colors group cursor-pointer">
            <div className="w-16 h-12 mb-8 relative flex flex-col border border-white/10 rounded-md overflow-hidden bg-[#12141c] shadow-[0_0_15px_rgba(34,211,238,0.1)] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all">
              <div className="h-3 bg-white/5 border-b border-white/10 flex items-center gap-1 px-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-red-500/80" />
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/80" />
                <div className="w-1.5 h-1.5 rounded-full bg-green-500/80" />
              </div>
              <div className="flex-1 p-1.5 flex flex-col gap-1 relative overflow-hidden bg-black/50">
                 <motion.div animate={{ y: ["100%", "0%", "0%", "-100%"] }} transition={{ duration: 4, times: [0, 0.15, 0.85, 1], repeat: Infinity }} className="absolute inset-0 p-1.5 flex flex-col gap-1">
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
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">Desarrollo Web</h4>
            <p className="text-gray-400 leading-relaxed font-light mb-6">
              Sitios web corporativos, tiendas e-commerce y aplicaciones web escalables. Código limpio, rápido y optimizado para SEO.
            </p>
            <span className="text-xs font-mono text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Explorar <ArrowRight className="w-4 h-4"/></span>
          </div>
          
          {/* Card 2 */}
          <div className="tech-border bg-[#12141c] p-8 hover:bg-[#d4d8c5]/5 transition-colors group cursor-pointer">
            <div className="w-20 h-16 mb-8 flex items-center justify-center relative font-mono text-2xl font-bold">
              <motion.span animate={{ x: [-3, 0, -3], color: ["#22d3ee", "#a855f7", "#22d3ee"] }} transition={{ duration: 2, repeat: Infinity }} className="text-cyan-400">{"{"}</motion.span>
              <div className="flex flex-col gap-1.5 mx-2 w-8">
                <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-1 bg-emerald-400 rounded-full shadow-[0_0_5px_rgba(52,211,153,0.8)]" />
                <motion.div animate={{ width: ["0%", "80%", "0%"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} className="h-1 bg-purple-500 rounded-full shadow-[0_0_5px_rgba(168,85,247,0.8)]" />
                <motion.div animate={{ width: ["0%", "100%", "0%"] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }} className="h-1 bg-cyan-400 rounded-full shadow-[0_0_5px_rgba(34,211,238,0.8)]" />
              </div>
              <motion.span animate={{ x: [3, 0, 3], color: ["#a855f7", "#22d3ee", "#a855f7"] }} transition={{ duration: 2, repeat: Infinity }} className="text-purple-500">{"}"}</motion.span>
            </div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">Desarrollo de Software</h4>
            <p className="text-gray-400 leading-relaxed font-light mb-6">
              Creamos sistemas a medida, automatización de procesos y plataformas robustas para optimizar las operaciones de tu empresa.
            </p>
            <span className="text-xs font-mono text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 group-hover:translate-x-2 transition-transform">
              <ArrowRight className="w-4 h-4" /> Descubrir más
            </span>
          </div>

          {/* Card 3 */}
          <div className="tech-border bg-[#12141c] p-8 hover:bg-[#d4d8c5]/5 transition-colors group cursor-pointer">
            <div className="w-16 h-16 mb-8 relative border border-white/10 rounded bg-black/40 p-1.5 flex gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.1)] group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
              {/* Sidebar */}
              <div className="w-3 h-full border border-white/10 rounded-sm bg-white/5" />
              {/* Main Content Area */}
              <div className="flex-1 flex flex-col gap-1.5 relative">
                {/* Header */}
                <div className="h-2 w-full border border-white/10 rounded-[2px] bg-white/5" />
                {/* Hero / Button */}
                <div className="flex-1 border border-white/10 rounded-sm flex items-center justify-center relative overflow-hidden bg-white/5">
                   {/* Animated Button */}
                   <motion.div 
                     animate={{ scale: [1, 0.9, 1], backgroundColor: ["rgba(255,255,255,0.05)", "rgba(52,211,153,0.5)", "rgba(255,255,255,0.05)"], borderColor: ["rgba(255,255,255,0.1)", "rgba(52,211,153,1)", "rgba(255,255,255,0.1)"] }} 
                     transition={{ duration: 2.5, repeat: Infinity }}
                     className="w-6 h-3 border rounded-[2px]"
                   />
                   {/* Animated Cursor */}
                   <motion.svg 
                     viewBox="0 0 24 24" 
                     className="absolute w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)] z-10"
                     animate={{ x: [12, 0, 12], y: [12, 0, 12] }}
                     transition={{ duration: 2.5, repeat: Infinity }}
                     fill="currentColor"
                   >
                     <path d="M7 2l12 11.2-5.8.5 3.3 7.3-2.2.9-3.2-7.4-4.4 5z"/>
                   </motion.svg>
                </div>
              </div>
            </div>
            <h4 className="text-xl font-bold mb-4 uppercase tracking-wide">Diseño UI/UX</h4>
            <p className="text-gray-400 leading-relaxed font-light mb-6">
              Interfaces de usuario espectaculares enfocadas en la conversión. Experiencias digitales que enamoran a tus clientes.
            </p>
            <span className="text-xs font-mono text-[#d4d8c5] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Explorar <ArrowRight className="w-4 h-4"/></span>
          </div>
        </div>
      </section>

      {/* 3. PROYECTOS (PORTAFOLIO) */}
      <section id="proyectos" className="py-32 bg-black/50 border-y border-[#d4d8c5]/10 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-sm font-mono text-[#d4d8c5] tracking-widest uppercase mb-2">// Casos de Estudio</h2>
              <h3 className="text-4xl md:text-5xl font-bold">Proyectos Destacados.</h3>
            </div>
            <button className="text-xs font-mono text-[#d4d8c5] uppercase tracking-widest hover:underline flex items-center gap-2">
              Ver todos <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Featured Project 1: Eyemax */}
            <div onClick={() => setActiveProject('eyemax')} className="group cursor-pointer md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#12141c] p-8 tech-border hover:bg-[#d4d8c5]/5 transition-colors">
              <div className="w-full aspect-video bg-[#1a1d27] overflow-hidden relative rounded-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                <img src="/project-eyemax.png" alt="Eyemax AI System" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                   <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 text-xs font-mono uppercase tracking-wider border border-cyan-500/30 rounded-full">Computer Vision</span>
                   <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-xs font-mono uppercase tracking-wider border border-purple-500/30 rounded-full">Edge AI</span>
                </div>
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  EYEMAX <span className="text-xs font-mono text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest">Activo</span>
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-6">
                  Sistema inteligente de punto de venta y escaneo visual para la industria joyera. Identifica inventario al instante capturando una foto, operando bajo una arquitectura Dual-Layer RAG con modelos de visión vectorial y LLMs multimodales.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['Python', 'Flask', 'ONNX', 'Gemini 3.6 Flash', 'Firebase', 'Pandas'].map(tech => (
                    <span key={tech} className="text-xs font-mono text-[#d4d8c5]/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm bg-white/5">{tech}</span>
                  ))}
                </div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Explorar Arquitectura <ArrowRight className="w-4 h-4"/></span>
              </div>
            </div>

            {/* Featured Project 2: PRO-ZEUS */}
            <div onClick={() => setActiveProject('zeus')} className="group cursor-pointer md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#12141c] p-8 tech-border hover:bg-[#d4d8c5]/5 transition-colors">
              <div className="order-2 md:order-1">
                <h4 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  PRO-ZEUS <span className="text-xs font-mono text-purple-400 border border-purple-400/30 bg-purple-400/10 px-2 py-1 rounded-full uppercase tracking-widest">SaaS</span>
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-6">
                  Arquitecto Cloud potenciado por IA que diseña y despliega infraestructuras de grado empresarial. Traduce lenguaje natural a código Terraform estructurado en tiempo real, orquestando servidores, bases de datos y redes en segundos.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React.js', 'Node.js', 'Terraform', 'Gemini 2.5 Flash', 'Firebase', 'Vite'].map(tech => (
                    <span key={tech} className="text-xs font-mono text-[#d4d8c5]/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm bg-white/5">{tech}</span>
                  ))}
                </div>
                <span className="text-xs font-mono text-purple-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Ver Dashboard <ArrowRight className="w-4 h-4"/></span>
              </div>
              <div className="order-1 md:order-2 w-full aspect-video bg-[#1a1d27] overflow-hidden relative rounded-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                <img src="/project-zeus.png" alt="PRO-ZEUS Dashboard" className="w-full h-full object-cover object-left-top group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 right-4 z-20 flex gap-2">
                   <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider border border-emerald-500/30 rounded-full">DevOps</span>
                   <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider border border-blue-500/30 rounded-full">IaC</span>
                </div>
              </div>
            </div>

            {/* Featured Project 3: BIOSALUD */}
            <div onClick={() => setActiveProject('biosalud')} className="group cursor-pointer md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#12141c] p-8 tech-border hover:bg-[#d4d8c5]/5 transition-colors">
              <div className="w-full aspect-video bg-[#1a1d27] overflow-hidden relative rounded-sm border border-white/10">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none"></div>
                <img src="/project-biosalud.png" alt="Biosalud Web Platform" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                   <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-wider border border-emerald-500/30 rounded-full">Web App</span>
                   <span className="px-3 py-1 bg-amber-500/20 text-amber-400 text-xs font-mono uppercase tracking-wider border border-amber-500/30 rounded-full">UI/UX</span>
                </div>
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-4 flex items-center gap-3">
                  BIOSALUD <span className="text-xs font-mono text-emerald-400 border border-emerald-400/30 bg-emerald-400/10 px-2 py-1 rounded-full uppercase tracking-widest">Lanzado</span>
                </h4>
                <p className="text-gray-400 leading-relaxed font-light mb-6">
                  Plataforma clínica premium diseñada para digitalizar la captación de pacientes. Arquitectura Single Page Application (SPA) de alto rendimiento con agendamiento automatizado e interfaz minimalista orientada a la conversión.
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {['React.js', 'Vite', 'React Router', 'CSS Grid', 'Calendly API', 'Lucide'].map(tech => (
                    <span key={tech} className="text-xs font-mono text-[#d4d8c5]/60 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-sm bg-white/5">{tech}</span>
                  ))}
                </div>
                <span className="text-xs font-mono text-amber-400 uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">Ver Diseño <ArrowRight className="w-4 h-4"/></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EQUIPO */}
      <section id="equipo" className="py-32 max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-sm font-mono text-[#d4d8c5] tracking-widest uppercase mb-2">// Núcleo Operativo</h2>
          <h3 className="text-4xl md:text-5xl font-bold">Conoce al Equipo.</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {/* Team Member 1 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-40 h-40 tech-border bg-[#1a1d27] rounded-full mb-6 flex items-center justify-center overflow-hidden relative">
              <img src="/ceo-profile.png" alt="CEO" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 border-2 border-[#d4d8c5]/10 rounded-full pointer-events-none group-hover:border-cyan-400/50 transition-colors"></div>
            </div>
            <h4 className="text-xl font-bold">Socio Fundador</h4>
            <p className="text-[#d4d8c5] text-sm font-mono uppercase tracking-wider mb-2">CEO & Lead Architect</p>
            <span className="text-gray-400 font-light">Sergio Ibarra</span>
          </div>
          
          {/* Team Member 2 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-40 h-40 tech-border bg-[#1a1d27] rounded-full mb-6 flex items-center justify-center overflow-hidden">
              <Users className="w-12 h-12 text-[#d4d8c5]/50 group-hover:scale-110 transition-transform" />
            </div>
            <h4 className="text-xl font-bold">Director Creativo</h4>
            <p className="text-[#d4d8c5] text-sm font-mono uppercase tracking-wider mb-2">Head of Design</p>
            <span className="text-gray-400 font-light">Nombre Apellido</span>
          </div>

          {/* Team Member 3 */}
          <div className="flex flex-col items-center text-center group">
            <div className="w-40 h-40 tech-border bg-[#1a1d27] rounded-full mb-6 flex items-center justify-center overflow-hidden relative">
              <img src="/paulina-profile.png" alt="Paulina Lopez - COO" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 border-2 border-[#d4d8c5]/10 rounded-full pointer-events-none group-hover:border-cyan-400/50 transition-colors"></div>
            </div>
            <h4 className="text-xl font-bold">Directora de Operaciones</h4>
            <p className="text-[#d4d8c5] text-sm font-mono uppercase tracking-wider mb-2">Chief Operating Officer</p>
            <span className="text-gray-400 font-light">Paulina Lopez</span>
          </div>
        </div>
      </section>

      {/* TERMINAL CTA SECTION */}
      <section className="py-32 bg-[#0a0b0f] relative overflow-hidden border-t border-[#d4d8c5]/10">
        <div className="absolute inset-0 hex-grid-container opacity-30">
          <div className="hex-grid"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-8 relative z-10">
          <div className="bg-black/80 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-16 shadow-[0_0_50px_-12px_rgba(34,211,238,0.15)] relative overflow-hidden group hover:shadow-[0_0_80px_-12px_rgba(34,211,238,0.25)] transition-shadow duration-700">
            {/* Ambient glow behind the terminal */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-cyan-500/10 via-purple-500/10 to-transparent blur-[80px] pointer-events-none group-hover:opacity-100 opacity-50 transition-opacity duration-700"></div>
            
            <div className="relative z-10 flex flex-col items-start">
              {/* Fake Mac Window Dots */}
              <div className="flex gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              </div>
              
              {/* Animated Code typing */}
              <div className="font-mono text-sm md:text-base text-cyan-400 mb-6 flex items-center gap-2">
                <Terminal className="w-4 h-4" />
                <span>root@naxus:~$ ./deploy_vision.sh</span>
              </div>

              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 text-white leading-none">
                ¿LISTO PARA <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4d8c5] to-gray-500">
                  ESCALAR TU EMPRESA?
                </span>
              </h2>
              
              <div className="text-sm md:text-base font-mono font-light mb-12 text-gray-400 space-y-2">
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  {">"} Analizando requerimientos técnicos... [OK]
                </motion.p>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  {">"} Diseñando arquitectura de alto rendimiento... [OK]
                </motion.p>
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.0 }} className="text-emerald-400">
                  {">"} Sistema listo. Esperando inicialización.
                </motion.p>
              </div>

              <a href="mailto:contacto@naxus.com" className="group/btn relative px-4 py-4 md:px-8 md:py-4 bg-transparent border border-cyan-500/50 text-cyan-400 font-mono uppercase tracking-widest text-[10px] sm:text-xs md:text-sm overflow-hidden transition-all hover:bg-cyan-500/10 hover:border-cyan-400">
                <span className="relative z-10 flex items-center gap-2 md:gap-3 font-bold">
                  <Code2 className="w-4 h-4" /> [ INICIAR_PROYECTO ] <span className="w-2 h-4 bg-cyan-400 animate-pulse"></span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#d4d8c5]/10 bg-black py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4">
            <img src="/logo-transparent.svg" alt="Naxus Logo" className="w-12 h-12 object-contain scale-110 opacity-80" />
            <span className="text-2xl font-bold tracking-[0.2em] text-[#d4d8c5] uppercase" style={{ fontFamily: 'var(--font-syncopate)' }}>Naxus</span>
          </div>
          
          <p className="text-gray-500 text-sm font-mono text-center md:text-left">
            © {new Date().getFullYear()} Naxus Digital Agency.<br/>All systems operational.
          </p>

          <div className="flex gap-6">
            <a href="mailto:contacto@naxus.com" className="text-sm font-mono text-gray-500 hover:text-[#d4d8c5] transition-colors uppercase tracking-widest">Email</a>
            <a href="#" className="text-sm font-mono text-gray-500 hover:text-[#d4d8c5] transition-colors uppercase tracking-widest">LinkedIn</a>
            <a href="#" className="text-sm font-mono text-gray-500 hover:text-[#d4d8c5] transition-colors uppercase tracking-widest">WhatsApp</a>
          </div>
        </div>
      </footer>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
      {/* PROJECT MODAL */}
      <AnimatePresence>
        {activeProject && projectsData[activeProject] && (
          <div className="fixed inset-0 z-[100] flex items-center sm:items-start justify-center p-4 sm:p-10 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black/80 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20" onClick={() => setActiveProject(null)}>
            {/* Backdrop */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 backdrop-blur-md" />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-[#12141c] tech-border rounded-xl overflow-hidden flex flex-col shadow-2xl z-10 my-auto"
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button onClick={() => setActiveProject(null)} className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors border border-white/10">
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header Image */}
              <div className="w-full h-64 sm:h-80 relative bg-[#1a1d27] shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-[#12141c] via-[#12141c]/50 to-transparent z-10"></div>
                <img src={projectsData[activeProject].image} alt={projectsData[activeProject].title} className="w-full h-full object-cover object-top opacity-80" />
                <div className="absolute bottom-6 left-6 sm:left-10 z-20">
                  <span className={`inline-block px-3 py-1 bg-${projectsData[activeProject].color}-500/20 text-${projectsData[activeProject].color}-400 text-xs font-mono uppercase tracking-wider border border-${projectsData[activeProject].color}-500/30 rounded-full mb-3`}>
                    {projectsData[activeProject].tag}
                  </span>
                  <h3 className="text-4xl md:text-5xl font-black">{projectsData[activeProject].title}</h3>
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
                        {projectsData[activeProject].overview}
                      </p>
                    </section>

                    <section>
                      <h4 className="text-sm font-mono text-[#d4d8c5] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Arquitectura & Solución
                      </h4>
                      <div className="space-y-4">
                        {projectsData[activeProject].architecture.map((item: any, i: number) => (
                          <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-sm">
                            <h5 className={`font-bold text-${projectsData[activeProject].color}-400 mb-2 flex items-center gap-2`}>
                              <CheckCircle2 className="w-4 h-4" /> {item.name}
                            </h5>
                            <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>

                  {/* Right Column (Tech Stack) */}
                  <div className="space-y-8">
                    <section>
                      <h4 className="text-sm font-mono text-[#d4d8c5] uppercase tracking-widest mb-4 flex items-center gap-2">
                        <Code2 className="w-4 h-4" /> Stack Tecnológico
                      </h4>
                      <div className="flex flex-col gap-2">
                        {projectsData[activeProject].tech.map((tech: string, i: number) => (
                          <div key={i} className="px-4 py-2 border border-white/10 rounded-sm bg-white/5 text-sm font-mono text-[#d4d8c5] flex items-center gap-3">
                            <div className={`w-1.5 h-1.5 rounded-full bg-${projectsData[activeProject].color}-400`} />
                            {tech}
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    {/* Fake Deploy Action for Aesthetics */}
                    <button className={`w-full py-4 bg-${projectsData[activeProject].color}-500/10 hover:bg-${projectsData[activeProject].color}-500/20 text-${projectsData[activeProject].color}-400 border border-${projectsData[activeProject].color}-500/30 font-mono uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2`}>
                      <Server className="w-4 h-4" /> Ver Repositorio
                    </button>
                  </div>

                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}
