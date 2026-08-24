import { Metadata } from 'next';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import ContentPage from '@/components/sections/ContentPage';

// Copy is admin-editable via page_seo, so render per request.
export const dynamic = 'force-dynamic';

const PAGE_KEY = 'warranty';
const PATH = '/warranty';
const FALLBACK_HEADING = 'Warranty';
const FALLBACK_BODY =
  'Equipment we manufacture is covered against defects in materials and workmanship under normal commercial use. Contact us with your invoice number to confirm the cover on your equipment.';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY).catch(() => null);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'Warranty',
    description: page?.seo_description || 'Warranty cover on commercial kitchen equipment supplied and manufactured by Kitchen Kraft Equipments, Pune.',
    keywords: (page?.seo_keywords || 'warranty, equipment warranty, kitchen equipment guarantee')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: PATH,
  });
}

export default function WarrantyPage() {
  return (
    <ContentPage
      pageKey={PAGE_KEY}
      path={PATH}
      fallbackHeading={FALLBACK_HEADING}
      fallbackBody={FALLBACK_BODY}
    />
  );
}
