import Link from 'next/link';
import { api, type PageSeo } from '@/lib/api';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import CategoryGrid from '@/components/products/CategoryGrid';
import FeaturedProducts from '@/components/products/FeaturedProducts';

interface Props {
  type: 'manufacture' | 'resell';
  pageKey: string;
  /**
   * This landing page's own slug, e.g. 'best-selling'. Combined with `basePath`
   * to build the canonical href for the breadcrumb trail.
   */
  slug: string;
  fallbackHeading: string;
  /**
   * Where this landing page lives. Defaults to '/products' for pages nested
   * under the products hub; '/manufacturing' is top-level and passes ''.
   */
  basePath?: string;
  /**
   * Show a cross-section teaser after this section's own grid — manufacturing
   * promotes resell stock and vice versa. Opt-in per page: this component also
   * renders /products/best-selling, which sits inside the products hub and
   * would otherwise repeat the teaser already shown there.
   */
  crossSell?: boolean;
}

/**
 * Shared landing page for a product TYPE (manufacture / resell). Lists the
 * categories of that type, each linking into the existing, unchanged
 * /products/[category] URLs. Heading + intro come from admin-editable page_seo.
 */
export default async function ProductTypeLanding({
  type,
  pageKey,
  slug,
  fallbackHeading,
  basePath = '/products',
  crossSell = false,
}: Props) {
  let categories: Awaited<ReturnType<typeof api.getGenresByType>> = [];
  let pageSeo: PageSeo | null = null;

  try {
    [categories, pageSeo] = await Promise.all([
      api.getGenresByType(type),
      api.getPageSeo(pageKey),
    ]);
  } catch (error) {
    console.error(`[${pageKey}] Failed to load landing data:`, error);
  }

  const heading = pageSeo?.heading?.trim() || fallbackHeading;
  const intro = pageSeo?.intro_content?.trim() || '';

  // A top-level page (basePath '') sits directly under Home; a nested one keeps
  // the Products crumb between them.
  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    ...(basePath ? [{ name: 'Products', href: basePath }] : []),
    { name: heading, href: `${basePath}/${slug}` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} />

      {/* Hero / intro */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{heading}</h1>
          {intro && (
            <p className="text-lg md:text-xl max-w-3xl mx-auto text-blue-50">{intro}</p>
          )}
        </div>
      </section>


      {/* Category grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {categories.length > 0 ? (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Browse Categories</h2>
                <p className="text-gray-600 mt-1">
                  {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} available
                </p>
              </div>

              <CategoryGrid categories={categories} type={type} />
            </>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Available</h3>
              <p className="text-gray-600 mb-6">There are currently no categories in this section.</p>
              <Link href="/products" className="text-blue-600 hover:text-blue-800 font-medium">
                ← Back to All Products
              </Link>
            </div>
          )}
        </div>
      </section>


      {/* Discover grid — a random selection from this section, so visitors see
          real products without picking a category first. */}
      <FeaturedProducts
        type={type}
        title={type === 'manufacture' ? 'Discover What We Build' : 'Discover Our Products'}
        subtitle={
          type === 'manufacture'
            ? 'A selection of equipment we manufacture to order.'
            : 'A selection from our best-selling range.'
        }
        ctaHref="/contact"
        ctaLabel="Get a Quote"
      />

      {/* Cross-section teaser — someone browsing custom manufacturing may not
          know we also stock ready-to-ship equipment, and vice versa. Capped at
          4 so it stays a teaser rather than competing with the grid above. */}
      {crossSell && (
        <FeaturedProducts
          type={type === 'manufacture' ? 'resell' : 'manufacture'}
          title={type === 'manufacture' ? 'Ready to Ship Today' : 'We Also Build to Order'}
          subtitle={
            type === 'manufacture'
              ? 'Stocked equipment from trusted manufacturers, available now.'
              : 'Custom stainless steel equipment manufactured to your specification.'
          }
          ctaHref={type === 'manufacture' ? '/products' : '/manufacturing'}
          ctaLabel={type === 'manufacture' ? 'Browse Products' : 'Explore Manufacturing'}
        />
      )}

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our experts can help you select the right equipment for your commercial kitchen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get a Quote
            </Link>
            <Link href="/products" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
