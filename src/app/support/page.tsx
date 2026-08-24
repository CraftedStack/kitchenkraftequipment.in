import { Metadata } from 'next';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import ContentPage from '@/components/sections/ContentPage';

// Copy is admin-editable via page_seo, so render per request.
export const dynamic = 'force-dynamic';

const PAGE_KEY = 'support';
const PATH = '/support';
const FALLBACK_HEADING = 'Support';
const FALLBACK_BODY =
  'Our team supports the equipment we supply and manufacture, from installation through to routine maintenance. Contact us with your invoice number and a description of the issue.';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY).catch(() => null);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'Support',
    description: page?.seo_description || 'Installation, maintenance and technical support for commercial kitchen equipment from Kitchen Kraft Equipments, Pune.',
    keywords: (page?.seo_keywords || 'kitchen equipment support, installation, maintenance, pune')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: PATH,
  });
}

export default function SupportPage() {
  return (
    <ContentPage
      pageKey={PAGE_KEY}
      path={PATH}
      fallbackHeading={FALLBACK_HEADING}
      fallbackBody={FALLBACK_BODY}
    />
  );
}
