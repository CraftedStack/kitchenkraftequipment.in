/**
 * Products Layout
 * Layout for all product pages with breadcrumbs and consistent structure
 */

import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { LayoutProps } from '@/lib/types';

export default function ProductsLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Breadcrumbs />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}