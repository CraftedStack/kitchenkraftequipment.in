/**
 * Services Layout
 * Layout for all service pages with breadcrumbs and consistent structure
 */

import { getPublicFlags } from '@/lib/publicFlags';
import { LayoutProps } from '@/lib/types';

export default async function ServicesLayout({ children }: LayoutProps) {
  const flags = await getPublicFlags();

  // While the section is disabled the child renders a standalone placeholder.
  // Skip the breadcrumbs and chrome — a "Home / Services" trail above a page
  // saying services are gone is contradictory, and the crumb would link back
  // into a section that no longer exists.
  if (!flags.services) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
}