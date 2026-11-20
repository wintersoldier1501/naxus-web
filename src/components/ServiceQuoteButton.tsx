'use client';

import { useState } from 'react';
import { Terminal, ArrowUpRight } from 'lucide-react';
import { ContactModal } from '@/components/ContactModal';

interface ServiceQuoteButtonProps {
  serviceTitle: string;
  defaultProjectType: string;
  ctaLabel: string;
  whatsappUrl: string;
}

export function ServiceQuoteButton({
  serviceTitle,
  defaultProjectType,
  ctaLabel,
  whatsappUrl,
}: ServiceQuoteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="tech-border relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#d4d8c5] text-[#11131a] font-bold uppercase tracking-widest text-sm transition-all hover:bg-white hover:shadow-[0_0_40px_-10px_rgba(212,216,197,0.8)] cursor-pointer w-full sm:w-auto"
        >
          <Terminal className="w-4 h-4" />
          {ctaLabel}
        </button>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 px-6 py-4 border border-white/15 bg-white/5 text-xs font-mono text-[#d4d8c5] uppercase tracking-widest hover:bg-white/10 hover:border-white/30 transition-all w-full sm:w-auto"
        >
          WhatsApp Directo <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialService={defaultProjectType}
        initialContext={`Servicio: ${serviceTitle}`}
      />
    </>
  );
}
