/**
 * Products Loading Component
 * Loading state for product pages
 */

import { ProductGridSkeleton } from '@/components/ui/LoadingSpinner';

export default function ProductsLoading() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>

      {/* Products Grid Skeleton */}
      <ProductGridSkeleton count={6} />
    </div>
  );
}