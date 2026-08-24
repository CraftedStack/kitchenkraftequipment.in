import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { api } from '@/lib/api';
import { getPublicFlags } from '@/lib/publicFlags';
import { seoManager } from '@/lib/seo';
import ProductTypeLanding from '@/components/products/ProductTypeLanding';

// Render at request time — data comes from a live API.
export const dynamic = 'force-dynamic';

// Kept stable from the previous /products/manufactured route so the
// admin-editable SEO copy in page_seo carries over untouched.
const PAGE_KEY = 'products-manufactured';
const SLUG = 'manufacturing';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'Custom Commercial Kitchen Equipment Manufacturing | Kitchen Kraft',
    description:
      page?.seo_description ||
      'Precision-engineered stainless steel commercial kitchen equipment manufactured to your specifications.',
    keywords: (page?.seo_keywords || 'commercial kitchen equipment manufacturer, custom kitchen equipment pune')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: `/${SLUG}`,
  });
}

export default async function ManufacturingPage() {
  const flags = await getPublicFlags();
  if (!flags.manufacturing) notFound();

  return (
    <ProductTypeLanding
      type="manufacture"
      pageKey={PAGE_KEY}
      slug={SLUG}
      fallbackHeading="Custom Manufacturing"
      basePath=""
      // Cross-sell resell stock here only when that section is actually live.
      crossSell={flags.bestSelling}
    />
  );
}
