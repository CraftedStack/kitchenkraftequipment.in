import { Metadata } from 'next';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import ContentPage from '@/components/sections/ContentPage';

// Copy is admin-editable via page_seo, so render per request.
export const dynamic = 'force-dynamic';

const PAGE_KEY = 'careers';
const PATH = '/careers';
const FALLBACK_HEADING = 'Careers';
const FALLBACK_BODY =
  'We do not have any specific openings listed at the moment. If you have experience in this industry, get in touch through our Contact page and we will keep your details on file.';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY).catch(() => null);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'Careers',
    description: page?.seo_description || 'Work with Kitchen Kraft Equipments, a commercial kitchen equipment manufacturer in Pune.',
    keywords: (page?.seo_keywords || 'careers, jobs, kitchen kraft equipments, pune jobs')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: PATH,
  });
}

export default function CareersPage() {
  return (
    <ContentPage
      pageKey={PAGE_KEY}
      path={PATH}
      fallbackHeading={FALLBACK_HEADING}
      fallbackBody={FALLBACK_BODY}
    />
  );
}
