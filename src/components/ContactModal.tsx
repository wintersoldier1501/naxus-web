'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, Copy, Check, Terminal } from 'lucide-react';
import { CONTACT_EMAIL, buildWhatsAppUrl } from '@/lib/data';

const PROJECT_TYPES = [
  'Desarrollo Web',
  'Software a Medida',
  'IA & Arquitectura Cloud',
  'Diseño UI/UX',
  'App Móvil / Otro',
];

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
  initialContext?: string;
}

export function ContactModal({
  isOpen,
  onClose,
  initialService,
  initialContext,
}: ContactModalProps) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [selectedService, setSelectedService] = useState(
    initialService || PROJECT_TYPES[0]
  );
  const [details, setDetails] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (initialService) {
        setSelectedService(initialService);
      }
      setErrorMsg('');
    }
  }, [isOpen, initialService]);

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow || 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const buildBriefText = () => {
    const lines = [
      'Hola equipo Naxus, quiero iniciar un proyecto:',
      `• Nombre: ${name.trim()}`,
      company.trim() ? `• Empresa / Proyecto: ${company.trim()}` : null,
      `• Tipo de solución: ${selectedService}`,
      initialContext ? `• Referencia: ${initialContext}` : null,
      `• Detalles: ${details.trim()}`,
    ].filter(Boolean);

    return lines.join('\n');
  };

  const validateFields = () => {
    if (!name.trim() || !details.trim()) {
      setErrorMsg(
        'Por favor completa tu nombre y una breve descripción de lo que necesitas.'
      );
      return false;
    }
    setErrorMsg('');
    return true;
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFields()) return;
    const url = buildWhatsAppUrl(buildBriefText());
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEmailSubmit = () => {
    if (!validateFields()) return;
    const subject = `Nuevo Proyecto Naxus — ${selectedService} (${name.trim()})`;
    const body = buildBriefText();
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[110] flex items-center sm:items-start justify-center p-4 sm:p-10 overflow-y-auto text-left"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
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
            className="relative w-full max-w-xl bg-[#12141c] tech-border rounded-xl p-6 sm:p-8 shadow-2xl z-10 my-auto text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar ventana de contacto"
              className="absolute top-4 right-4 z-20 p-2 bg-[#12141c]/90 backdrop-blur-md hover:bg-white rounded-full text-white hover:text-[#12141c] transition-colors border border-white/25 shadow-lg cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 mb-6 pr-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest mb-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>// INICIAR_PROYECTO</span>
              </div>
              <h3
                id="contact-modal-title"
                className="text-2xl sm:text-3xl font-black tracking-tight text-white"
              >
                Cuéntanos sobre tu sistema
              </h3>
              {initialContext && (
                <p className="text-xs font-mono text-cyan-400 mt-2">
                  Referencia seleccionada: {initialContext}
                </p>
              )}
            </div>

            <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="naxus-contact-name"
                    className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5"
                  >
                    Nombre *
                  </label>
                  <input
                    id="naxus-contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 focus:border-emerald-400/60 focus:outline-none rounded-md text-sm text-white placeholder:text-gray-600 transition-colors"
                  />
                </div>
                <div>
                  <label
                    htmlFor="naxus-contact-company"
                    className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5"
                  >
                    Empresa o proyecto (opcional)
                  </label>
                  <input
                    id="naxus-contact-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="Ej. Grupo Norte / Startup"
                    className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 focus:border-emerald-400/60 focus:outline-none rounded-md text-sm text-white placeholder:text-gray-600 transition-colors"
                  />
                </div>
              </div>

              <div>
                <span className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-2">
                  ¿Qué necesitas construir?
                </span>
                <div className="flex flex-wrap gap-2">
                  {PROJECT_TYPES.map((type) => {
                    const active = selectedService === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setSelectedService(type)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-md border transition-all cursor-pointer ${
                          active
                            ? 'bg-emerald-400/15 border-emerald-400 text-emerald-300'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/25 hover:text-white'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label
                  htmlFor="naxus-contact-details"
                  className="block text-xs font-mono text-gray-400 uppercase tracking-wider mb-1.5"
                >
                  Cuéntanos brevemente tu idea o reto *
                </label>
                <textarea
                  id="naxus-contact-details"
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Ej. Necesitamos automatizar inventario y cotizaciones con un sistema web interno..."
                  className="w-full px-3.5 py-2.5 bg-black/50 border border-white/10 focus:border-emerald-400/60 focus:outline-none rounded-md text-sm text-white placeholder:text-gray-600 transition-colors resize-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs font-mono text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-md px-3 py-2">
                  {errorMsg}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#d4d8c5] text-[#11131a] font-bold uppercase tracking-widest text-xs hover:bg-white transition-all rounded-md cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  Enviar brief por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={handleEmailSubmit}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/5 border border-white/15 text-[#d4d8c5] font-mono uppercase tracking-widest text-xs hover:bg-white/10 hover:border-white/30 transition-all rounded-md cursor-pointer"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Enviar por Correo
                </button>
              </div>
            </form>

            <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <span className="text-xs font-mono text-gray-400">
                Correo directo:{' '}
                <span className="text-[#d4d8c5]">{CONTACT_EMAIL}</span>
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors self-start sm:self-auto cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">¡Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar correo</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
