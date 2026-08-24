import { Metadata } from 'next';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import ContentPage from '@/components/sections/ContentPage';

// Copy is admin-editable via page_seo, so render per request.
export const dynamic = 'force-dynamic';

const PAGE_KEY = 'terms';
const PATH = '/terms';
const FALLBACK_HEADING = 'Terms of Service';
const FALLBACK_BODY =
  'By using this website you agree to our terms of service. Product information is provided in good faith and prices shown are indicative. A written quotation sets out the terms that apply to your order.';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY).catch(() => null);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'Terms of Service',
    description: page?.seo_description || 'The terms that apply when you use the Kitchen Kraft Equipments website and request quotations or equipment.',
    keywords: (page?.seo_keywords || 'terms of service, terms and conditions, kitchen kraft equipments')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: PATH,
  });
}

export default function TermsPage() {
  return (
    <ContentPage
      pageKey={PAGE_KEY}
      path={PATH}
      fallbackHeading={FALLBACK_HEADING}
      fallbackBody={FALLBACK_BODY}
    />
  );
}
