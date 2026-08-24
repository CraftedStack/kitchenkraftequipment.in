import Link from 'next/link';
import { api, type SEOProduct } from '@/lib/api';
import ProductGrid from './ProductGrid';

interface Props {
  /** How many products to show. Defaults to 4 — a single row at every width. */
  count?: number;
  title?: string;
  subtitle?: string;
  /**
   * Which catalogue section to draw from. Cards link into that section, so this
   * also decides the URLs they produce.
   */
  type?: 'manufacture' | 'resell';
  /** Where the closing "browse all" button points. */
  ctaHref?: string;
  ctaLabel?: string;
}

// Fisher–Yates shuffle (unbiased) so the mix isn't the same order every render.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Ranks a product for the discover row.
 *
 * The catalogue has no popularity or view-count field, so "most relevant" is
 * approximated by presentation quality — a product that will actually look and
 * read well in a card. Ties are broken by the shuffle below, so the row still
 * varies between visits instead of showing the same items forever.
 */
function relevanceScore(p: SEOProduct): number {
  let score = 0;
  if (p.on_sale) score += 4;                                  // an active offer earns the spot
  if (p.image) score += 3;                                    // a card without an image looks broken
  if ((p.description || '').trim().length > 40) score += 2;   // enough copy to be useful
  if (p.stock_quantity == null || p.stock_quantity > 0) score += 1; // avoid promoting out-of-stock
  return score;
}

/**
 * A "discover" grid — a random selection of real products so visitors see
 * stock immediately without picking a path first.
 *
 * Always scoped to one section. Cards link to that section's URLs
 * (/manufacturing/... or /products/...), so mixing types here would produce
 * links that 404.
 */
export default async function FeaturedProducts({
  count = 4,
  title = 'Discover Our Products',
  subtitle = 'A selection from our best-selling range.',
  type = 'resell',
  ctaHref = '/products/best-selling',
  ctaLabel = 'Browse Products',
}: Props) {
  const basePath = type === 'manufacture' ? '/manufacturing' : '/products';

  let products: SEOProduct[] = [];
  try {
    const [all, genres] = await Promise.all([
      api.getAllProducts(),
      api.getGenresByType(type),
    ]);
    const slugs = new Set(genres.map((g) => g.slug));
    // Shuffle first so equally-ranked products rotate, then take the best.
    products = shuffle(all.filter((p) => slugs.has(p.categorySlug)))
      .sort((a, b) => relevanceScore(b) - relevanceScore(a))
      .slice(0, count);
  } catch (error) {
    console.error('[FeaturedProducts] Failed to load products:', error);
  }

  if (products.length === 0) return null;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">{title}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <ProductGrid products={products} basePath={basePath} className="mb-8" />

        <div className="text-center">
          <Link
            href={ctaHref}
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            {ctaLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
