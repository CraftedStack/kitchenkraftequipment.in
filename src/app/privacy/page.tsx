import { Metadata } from 'next';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import ContentPage from '@/components/sections/ContentPage';

// Copy is admin-editable via page_seo, so render per request.
export const dynamic = 'force-dynamic';

const PAGE_KEY = 'privacy';
const PATH = '/privacy';
const FALLBACK_HEADING = 'Privacy Policy';
const FALLBACK_BODY =
  'We collect only the information you choose to share with us through our contact, enquiry and quote forms, and we use it solely to respond to your enquiry. Contact us for full details of how we handle your information.';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY).catch(() => null);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'Privacy Policy',
    description: page?.seo_description || 'How Kitchen Kraft Equipments collects, uses and protects the personal information you share with us.',
    keywords: (page?.seo_keywords || 'privacy policy, data protection, kitchen kraft equipments')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: PATH,
  });
}

export default function PrivacyPage() {
  return (
    <ContentPage
      pageKey={PAGE_KEY}
      path={PATH}
      fallbackHeading={FALLBACK_HEADING}
      fallbackBody={FALLBACK_BODY}
    />
  );
}
