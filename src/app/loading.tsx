/**
 * Global Loading Component
 * Displays while pages are loading
 */

import { PageLoading } from '@/components/ui/LoadingSpinner';

export default function Loading() {
  return <PageLoading message="Loading Kitchen Kraft..." />;
}