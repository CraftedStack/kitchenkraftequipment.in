/**
 * Public-website visibility flags.
 *
 * These control what a VISITOR sees (Services section on/off, Manufacturing and
 * Best Selling sections on/off). A Super Admin toggles them from the admin
 * panel's Feature Flags screen; there is no redeploy and no code change.
 *
 * Read on the server during render. The backend serves them with an ETag and
 * `no-cache, must-revalidate`, and we hold them in the Next.js data cache for a
 * short window so a burst of requests doesn't hammer the API while a toggle
 * still shows up quickly.
 */

export type ServicesDisabledMode = 'moved' | 'redirect';

export interface PublicFlags {
  /** Services section visible on the public site. */
  services: boolean;
  /** Manufacturing section visible. */
  manufacturing: boolean;
  /** Best Selling section visible. */
  bestSelling: boolean;
  /**
   * What /services does while `services` is false:
   *  - 'moved'    → friendly, noindex "we've reorganized" page linking onward
   *  - 'redirect' → permanent redirect to /products
   */
  servicesDisabledMode: ServicesDisabledMode;
}

/**
 * Defaults mirror the backend fallback in routes/settings.js. Chosen so that a
 * failed request degrades to "the site looks normal": products visible,
 * services hidden (the client no longer offers them). Never let a backend
 * hiccup blank the site or silently resurrect a section that was turned off.
 */
export const DEFAULT_PUBLIC_FLAGS: PublicFlags = {
  services: false,
  manufacturing: true,
  bestSelling: true,
  servicesDisabledMode: 'moved',
};

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

/** How long a fetched flag set stays in the Next.js data cache, in seconds. */
const FLAGS_TTL_SECONDS = 60;

/**
 * Fetch the public visibility flags. Safe to call from any server component —
 * concurrent calls within the TTL share one cached response.
 *
 * Never throws: any failure returns DEFAULT_PUBLIC_FLAGS.
 */
export async function getPublicFlags(): Promise<PublicFlags> {
  try {
    const response = await fetch(`${API_BASE}/api/settings/public-flags`, {
      next: { revalidate: FLAGS_TTL_SECONDS, tags: ['public-flags'] },
    } as RequestInit);

    if (!response.ok) return DEFAULT_PUBLIC_FLAGS;

    const data = await response.json();
    if (!data?.success || !data.flags) return DEFAULT_PUBLIC_FLAGS;

    const mode = data.flags.servicesDisabledMode;

    return {
      services: data.flags.services === true,
      manufacturing: data.flags.manufacturing === true,
      bestSelling: data.flags.bestSelling === true,
      servicesDisabledMode: mode === 'redirect' ? 'redirect' : 'moved',
    };
  } catch {
    // Swallow — the public site must render even if the API is unreachable.
    return DEFAULT_PUBLIC_FLAGS;
  }
}
