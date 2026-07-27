import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // NOTE: do NOT blanket-disallow '*.xml' — that would hide /sitemap.xml
      // itself from crawlers. Images are served from the backend domain
      // (BACKEND_URL /api/images), so the '/api/' rule here does not block them;
      // it only guards the public site's own API routes.
      disallow: [
        '/admin/',
        '/api/',
        '/_next/',
        '/private/',
        '*.json',
      ],
    },
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}