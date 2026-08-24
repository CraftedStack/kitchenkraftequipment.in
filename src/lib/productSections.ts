import type { SEOGenre } from './api';

/**
 * The public site splits the catalogue into two sections by genre type:
 *
 *   manufacture -> /manufacturing/[category]      (custom-made)
 *   resell      -> /products/[category]           (resold stock)
 *
 * The URL itself tells a visitor (and a crawler) which kind of product they are
 * looking at, and lets each section grow its own sub-structure later — e.g.
 * resell categories split by brand.
 */
export type GenreType = 'manufacture' | 'resell';

export interface ProductSection {
  type: GenreType;
  /** URL prefix for this section's category pages, no trailing slash. */
  basePath: string;
  /** Label used for this section's breadcrumb crumb. */
  label: string;
}

export const MANUFACTURING_SECTION: ProductSection = {
  type: 'manufacture',
  basePath: '/manufacturing',
  label: 'Manufacturing',
};

export const PRODUCTS_SECTION: ProductSection = {
  type: 'resell',
  basePath: '/products',
  label: 'Products',
};

/** Which section a genre belongs to, derived from its type. */
export function sectionForGenre(genre: Pick<SEOGenre, 'type'>): ProductSection {
  return genre.type === 'manufacture' ? MANUFACTURING_SECTION : PRODUCTS_SECTION;
}

/** Canonical path for a category page. */
export function categoryPath(genre: Pick<SEOGenre, 'type' | 'slug'>): string {
  return `${sectionForGenre(genre).basePath}/${genre.slug}`;
}

/** Canonical path for a product detail page. */
export function productPath(
  genre: Pick<SEOGenre, 'type' | 'slug'>,
  productSlug: string
): string {
  return `${categoryPath(genre)}/${productSlug}`;
}

/**
 * Slugs owned by static landing pages. A genre must never shadow one of these,
 * in either section — Next matches static routes first, so a colliding genre
 * would become unreachable.
 */
export const RESERVED_SLUGS = new Set(['manufactured', 'best-selling']);
