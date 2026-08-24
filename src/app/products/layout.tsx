/**
 * Products Layout
 * Shared page chrome for all product pages.
 */

import { LayoutProps } from '@/lib/types';

/**
 * Breadcrumbs are rendered by each page, not here. Every page under this
 * layout supplies its own trail with real category and product names, so a
 * layout-level <Breadcrumbs /> produced a second, slug-derived trail directly
 * above it.
 */
export default function ProductsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}