import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { getPublicFlags } from '@/lib/publicFlags';
import { seoManager } from '@/lib/seo';
import ProductTypeLanding from '@/components/products/ProductTypeLanding';

// Render at request time — data comes from a live API.
export const dynamic = 'force-dynamic';

const PAGE_KEY = 'products-best-selling';
const SLUG = 'best-selling';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'Best Selling Commercial Kitchen Equipment | Kitchen Kraft Pune',
    description:
      page?.seo_description ||
      'Browse our best-selling commercial kitchen equipment. Ready-to-ship products from trusted manufacturers.',
    keywords: (page?.seo_keywords || 'best selling kitchen equipment, commercial kitchen equipment pune')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: `/products/${SLUG}`,
  });
}

export default async function BestSellingPage() {
  const flags = await getPublicFlags();
  if (!flags.bestSelling) notFound();

  return (
    <ProductTypeLanding
      type="resell"
      pageKey={PAGE_KEY}
      slug={SLUG}
      fallbackHeading="Best Selling Products"
    />
  );
}
