import type { Metadata } from "next";
import { Geist, Geist_Mono, Syncopate, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syncopate = Syncopate({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-syncopate",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://naxus.com.mx'),
  alternates: {
    canonical: '/',
  },
  title: "Naxus | Desarrollo y Arquitectura de Software",
  description: "Materializamos cualquier idea en ecosistemas digitales de alto rendimiento. Desarrollo de software, web y apps a la medida.",
  openGraph: {
    title: 'Naxus | Ingeniería y Arquitectura de Software',
    description: 'Materializamos cualquier idea en ecosistemas digitales de alto rendimiento. Desarrollamos software para escalar tu negocio.',
    url: 'https://naxus.com.mx',
    siteName: 'Naxus',
    images: [
      {
        url: 'https://naxus.com.mx/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naxus | Desarrollo y Arquitectura de Software',
    description: 'Ingeniería de software, sistemas a la medida y plataformas web escalables.',
    images: ['https://naxus.com.mx/og-image.png'],
  },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Naxus',
  alternateName: 'Naxus Software Engineering',
  url: 'https://naxus.com.mx',
  logo: 'https://naxus.com.mx/logo-mark.png',
  description:
    'Ingeniería de software, sistemas a la medida, inteligencia artificial aplicada, arquitectura cloud y plataformas web de alto rendimiento.',
  email: 'sergiolive360@gmail.com',
  areaServed: 'MX',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+52-618-320-2065',
      contactType: 'sales',
      availableLanguage: ['Spanish', 'English'],
    },
  ],
};

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} ${syncopate.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
