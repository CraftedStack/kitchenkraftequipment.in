import { NextRequest, NextResponse } from 'next/server';

/**
 * Routes a category URL to the section that matches its genre type:
 *
 *   type 'manufacture' -> /manufacturing/[category]
 *   type 'resell'      -> /products/[category]
 *
 * This replaces a hardcoded per-slug redirect list in next.config.js. A static
 * redirect cannot look up a genre's type, so renaming a genre or switching it
 * between manufacture and resell in the admin panel silently broke the list.
 * Resolving it from live data means the URLs follow the data automatically.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/** Slugs owned by static landing pages — never treat these as genres. */
const RESERVED = new Set(['manufactured', 'best-selling']);

interface GenreRow {
  name?: string;
  type?: string;
}

/**
 * Mirrors the slug generation in lib/api.ts. The API returns genre names, not
 * slugs, so the slug has to be derived the same way on both sides.
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Cached slug -> basePath map. Middleware runs on every matched request, so
// this avoids an API round trip per navigation.
let cache: { map: Map<string, string>; expires: number } | null = null;
const TTL_MS = 60_000;

async function getSectionMap(): Promise<Map<string, string> | null> {
  if (cache && cache.expires > Date.now()) return cache.map;

  try {
    const res = await fetch(`${API_BASE}/api/genres`, {
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return cache?.map ?? null;

    const body = await res.json();
    const rows: GenreRow[] = Array.isArray(body) ? body : (body?.data ?? []);

    const map = new Map<string, string>();
    for (const row of rows) {
      if (!row?.name) continue;
      const slug = slugify(row.name);
      if (!slug || RESERVED.has(slug)) continue;
      map.set(slug, row.type === 'manufacture' ? '/manufacturing' : '/products');
    }

    if (map.size === 0) return cache?.map ?? null;

    cache = { map, expires: Date.now() + TTL_MS };
    return map;
  } catch {
    // Serve a stale map rather than misrouting while the API is unreachable.
    return cache?.map ?? null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const match = pathname.match(/^\/(products|manufacturing)\/([^/]+)(\/[^/]+)?\/?$/);
  if (!match) return NextResponse.next();

  const [, currentSection, categorySlug, productPart] = match;
  if (RESERVED.has(categorySlug)) return NextResponse.next();

  const map = await getSectionMap();
  // Unknown genre, or the API is down: let the route render (and 404) itself
  // rather than redirecting on a guess.
  if (!map) return NextResponse.next();

  const correct = map.get(categorySlug);
  if (!correct) return NextResponse.next();

  if (correct === `/${currentSection}`) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `${correct}/${categorySlug}${productPart ?? ''}`;
  return NextResponse.redirect(url, 308);
}

export const config = {
  matcher: ['/products/:path*', '/manufacturing/:path*'],
};
