import { Metadata } from 'next';
import Link from 'next/link';
import { seoManager } from '@/lib/seo';
import { getPublicFlags } from '@/lib/publicFlags';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import FeaturedProducts from '@/components/products/FeaturedProducts';
import CategoryGrid from '@/components/products/CategoryGrid';
import { api } from '@/lib/api';

// Generate metadata for products page
// Render at request time so the mixed product grid reshuffles per visit and
// reflects live catalog data.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = seoManager.generatePageMetadata({
  title: 'Commercial Kitchen Equipment Products - Browse Our Range',
  description: 'Browse our range of ready-to-ship commercial kitchen equipment from trusted manufacturers, for restaurants, hotels, and food businesses in Pune.',
  keywords: [
    'commercial kitchen products',
    'kitchen equipment catalog',
    'restaurant equipment',
    'hotel kitchen equipment',
    'pune kitchen equipment',
    'kitchen equipment manufacturers'
  ],
  path: '/products'
});

const breadcrumbItems = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' }
];

export default async function ProductsPage() {
  const flags = await getPublicFlags();

  // Only resell genres belong on this hub — manufacturing has its own section.
  let categories: Awaited<ReturnType<typeof api.getGenresByType>> = [];
  try {
    categories = await api.getGenresByType('resell');
  } catch (error) {
    console.error('[products] Failed to load categories:', error);
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Commercial Kitchen Equipment
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Ready-to-ship equipment from trusted manufacturers, for
              restaurants, hotels and food businesses across Pune.
            </p>
          </div>
        </div>
      </section>

      {/* Genre grid — the resell categories that live under /products.
          Manufacturing categories have their own /manufacturing section. */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Browse by Category</h2>
            <p className="text-gray-600 mt-1">
              {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} available
            </p>
          </div>
          <CategoryGrid categories={categories} type="resell" />
        </div>
      </section>

      {/* Discover grid — resell stock, this section's own products. */}
      <FeaturedProducts />

      {/* A taste of what we manufacture. Capped at 4 so it stays a teaser for
          the /manufacturing section rather than competing with the grid above. */}
      {flags.manufacturing && (
        <FeaturedProducts
          type="manufacture"
          title="We Also Build to Order"
          subtitle="Custom stainless steel equipment manufactured to your specification."
          ctaHref="/manufacturing"
          ctaLabel="Explore Manufacturing"
        />
      )}

      {/* Why choose us. Left-aligned asymmetric split rather than three centred
          cards: every other section on this page is a centred grid, and the
          repetition made the page read as one long template. */}
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">
                Why buy from Kitchen Kraft
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Quality, durability and performance you can rely on, backed by
                people who install this equipment every week.
              </p>
            </div>

            <div className="lg:col-span-8">
              <dl className="divide-y divide-gray-100">
                <div className="flex gap-5 py-6 first:pt-0">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <dt className="text-lg font-semibold text-gray-900 mb-1">Premium quality</dt>
                    <dd className="text-gray-600 leading-relaxed">
                      Food-grade stainless steel construction for durability and
                      hygiene compliance.
                    </dd>
                  </div>
                </div>

                <div className="flex gap-5 py-6">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <dt className="text-lg font-semibold text-gray-900 mb-1">Ready stock</dt>
                    <dd className="text-gray-600 leading-relaxed">
                      Stocked lines ship quickly, so your kitchen is operational
                      sooner.
                    </dd>
                  </div>
                </div>

                <div className="flex gap-5 py-6 last:pb-0">
                  <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72M18 18.72a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <dt className="text-lg font-semibold text-gray-900 mb-1">Expert support</dt>
                    <dd className="text-gray-600 leading-relaxed">
                      Consultation, installation and ongoing maintenance from our
                      own team.
                    </dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Need Help Choosing the Right Equipment?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experts are here to help you select the perfect equipment for your 
            commercial kitchen needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get a Quote
            </Link>
            {flags.services ? (
              <Link
                href="/services"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                View Our Services
              </Link>
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
}