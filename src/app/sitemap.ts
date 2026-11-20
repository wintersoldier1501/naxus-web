import type { MetadataRoute } from 'next';
import { serviceSlugs } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://naxus.com.mx',
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...serviceSlugs.map((slug) => ({
      url: `https://naxus.com.mx/servicios/${slug}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    {
      url: 'https://naxus.com.mx/aviso-de-privacidad',
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}
