import { MetadataRoute } from 'next';
import { api } from '@/lib/api';
import { getPublicFlags } from '@/lib/publicFlags';
import { categoryPath, productPath } from '@/lib/productSections';
import { SITE_CONFIG } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  // Disabled sections must not be advertised to crawlers.
  const flags = await getPublicFlags();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...(flags.services
      ? [{
          url: `${baseUrl}/services`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }]
      : []),
    ...(flags.manufacturing
      ? [{
          url: `${baseUrl}/manufacturing`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }]
      : []),
    ...(flags.bestSelling
      ? [{
          url: `${baseUrl}/products/best-selling`,
          lastModified: new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.9,
        }]
      : []),
  ];

  try {
    // Only advertise absolute http(s) image URLs to the sitemap — Google Images
    // ignores relative paths, and a bad value can invalidate the whole entry.
    const absoluteImage = (img?: string): string[] =>
      img && /^https?:\/\//.test(img) ? [img] : [];

    // Dynamic category pages — each lives under the section matching its type
    // (/manufacturing for custom-made, /products for resell).
    const categories = await api.getGenres();
    const categoryPages: MetadataRoute.Sitemap = categories.map((category) => ({
      url: `${baseUrl}${categoryPath(category)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
      images: absoluteImage(category.image),
    }));

    // Dynamic product pages — advertise the primary image plus any gallery
    // images. A product's URL follows its category's section.
    const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));
    const allProducts = await api.getAllProducts();
    const productPages: MetadataRoute.Sitemap = allProducts.flatMap((product) => {
      const parent = categoryBySlug.get(product.categorySlug);
      // Skip a product whose category we cannot resolve — better to omit it
      // than to advertise a URL that 404s.
      if (!parent) return [];
      const galleryImages = (product.images || [])
        .flatMap((img) => absoluteImage(img.image_url));
      const productImages = [...absoluteImage(product.image), ...galleryImages];
      return [{
        url: `${baseUrl}${productPath(parent, product.slug)}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        ...(productImages.length > 0 ? { images: productImages } : {}),
      }];
    });

    // Dynamic service pages — omitted entirely while the section is disabled.
    let servicePages: MetadataRoute.Sitemap = [];
    if (flags.services) {
      const services = await api.getServices();
      servicePages = services.map((s) => ({
        url: `${baseUrl}/services/${s.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.8,
      }));
    }

    return [...staticPages, ...categoryPages, ...productPages, ...servicePages];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    // Return static pages only if API fails
    return staticPages;
  }
}