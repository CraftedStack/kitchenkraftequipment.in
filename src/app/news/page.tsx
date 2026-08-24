import { Metadata } from 'next';
import Link from 'next/link';
import { api } from '@/lib/api';
import { seoManager } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

// Copy is admin-editable via page_seo, so render per request.
export const dynamic = 'force-dynamic';

const PAGE_KEY = 'news';
const PATH = '/news';

export async function generateMetadata(): Promise<Metadata> {
  const page = await api.getPageSeo(PAGE_KEY).catch(() => null);
  return seoManager.generatePageMetadata({
    title: page?.seo_title || 'News & Updates',
    description:
      page?.seo_description ||
      'Product launches, workshop news and updates from Kitchen Kraft Equipments, Pune.',
    keywords: (page?.seo_keywords || 'kitchen kraft news, commercial kitchen equipment updates, pune')
      .split(',')
      .map((k) => k.trim())
      .filter(Boolean),
    path: PATH,
  });
}

export default async function NewsPage() {
  const page = await api.getPageSeo(PAGE_KEY).catch(() => null);

  const heading = page?.heading?.trim() || 'Good news is on the way';
  const intro =
    page?.intro_content?.trim() ||
    'We are putting together product launches, workshop updates and news from the Kitchen Kraft floor. Check back shortly.';

  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'News & Updates', href: PATH },
        ]}
      />

      <section className="py-20 md:py-28">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/*
            Three dots on a staggered pulse. CSS-only so it costs no JavaScript,
            and animation-delay is inline because the values are per-element.
            The whole block is gated behind prefers-reduced-motion in
            globals.css, so it holds still for anyone who asks for that.
          */}
          <div className="flex items-center justify-center gap-2 mb-8" aria-hidden="true">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="news-pulse-dot block w-2.5 h-2.5 rounded-full bg-blue-600"
                style={{ animationDelay: `${i * 180}ms` }}
              />
            ))}
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
            {heading}
          </h1>

          <p className="text-gray-600 leading-relaxed mb-10">{intro}</p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Browse Products
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center border border-gray-300 bg-white text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
