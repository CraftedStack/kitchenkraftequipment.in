import type { PublicFlags } from './publicFlags';

export interface NavItem {
  name: string;
  href: string;
  description?: string;
}

export interface MainNavItem extends NavItem {
  children?: NavItem[];
}

/**
 * Single source of truth for the public site's main navigation.
 *
 * Previously the nav was declared twice — in lib/constants.ts (NAVIGATION) and
 * again in hooks/useNavigation.ts (fallbackNavigation) — and the two had
 * drifted: one pointed at `/products?type=manufacture` while the footer used
 * `/products/manufactured`. Two URLs for one listing is a duplicate-content
 * split, so both now derive from this function.
 *
 * Sections the flags disable are omitted entirely rather than hidden with CSS,
 * so a disabled section leaves no crawlable link behind.
 */
export function buildMainNavigation(flags: PublicFlags): MainNavItem[] {
  const productChildren: NavItem[] = [
    { name: 'All Products', href: '/products', description: 'Browse our complete product catalog' },
  ];

  if (flags.bestSelling) {
    productChildren.push({
      name: 'Best Selling',
      href: '/products/best-selling',
      description: 'Ready-to-ship equipment from trusted manufacturers',
    });
  }

  const nav: MainNavItem[] = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products', children: productChildren },
  ];

  if (flags.manufacturing) {
    nav.push({
      name: 'Manufacturing',
      href: '/manufacturing',
      description: 'Custom stainless steel equipment built to your specification',
    });
  }

  if (flags.services) {
    nav.push({ name: 'Services', href: '/services' });
  }

  nav.push({ name: 'About Us', href: '/about' });
  nav.push({ name: 'Contact', href: '/contact' });

  return nav;
}

/** Flat version (no children) for the simple header / mobile menu. */
export function buildFlatNavigation(flags: PublicFlags): NavItem[] {
  return buildMainNavigation(flags).map(({ name, href }) => ({ name, href }));
}
