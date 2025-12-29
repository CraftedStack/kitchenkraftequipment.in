/**
 * Breadcrumb Navigation Component
 * SEO-friendly breadcrumb navigation with structured data
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { BreadcrumbItem } from '@/lib/types';

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();

  // Generate breadcrumbs from pathname if items not provided
  const breadcrumbs = items || generateBreadcrumbsFromPath(pathname);

  if (breadcrumbs.length <= 1) {
    return null; // Don't show breadcrumbs for homepage or single-level pages
  }

  // Generate structured data for breadcrumbs
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://kitchenkraftequipments.com${crumb.href}`
    }))
  };

  return (
    <>
      <nav
        className={cn(
          'flex items-center space-x-1 text-sm text-gray-600',
          className
        )}
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center space-x-1">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && (
                <svg
                  className="h-4 w-4 text-gray-400 mx-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              
              {crumb.current || index === breadcrumbs.length - 1 ? (
                <span
                  className="text-gray-900 font-medium"
                  aria-current="page"
                >
                  {crumb.name}
                </span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-gray-600 hover:text-blue-600 transition-colors"
                >
                  {crumb.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </>
  );
}

// Helper function to generate breadcrumbs from pathname
function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' }
  ];

  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Convert segment to readable name
    const name = segmentToName(segment, segments, index);
    
    breadcrumbs.push({
      name,
      href: currentPath,
      current: isLast
    });
  });

  return breadcrumbs;
}

// Helper function to convert URL segment to readable name
function segmentToName(segment: string, segments: string[], index: number): string {
  // Handle specific routes
  const routeNames: Record<string, string> = {
    'products': 'Products',
    'services': 'Services',
    'about': 'About Us',
    'contact': 'Contact',
    'gallery': 'Gallery',
    'commercial-kitchen-design': 'Kitchen Design',
    'equipment-manufacturing': 'Manufacturing',
    'installation-maintenance': 'Installation & Maintenance',
    'consultation': 'Consultation',
    'cooking-equipment': 'Cooking Equipment',
    'refrigeration': 'Refrigeration',
    'food-preparation': 'Food Preparation',
    'storage-solutions': 'Storage Solutions',
    'dishwashing-equipment': 'Dishwashing Equipment'
  };

  if (routeNames[segment]) {
    return routeNames[segment];
  }

  // Convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// Preset breadcrumb configurations for common pages
export const BREADCRUMB_CONFIGS = {
  products: (categorySlug?: string, productSlug?: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' },
      { name: 'Products', href: '/products' }
    ];

    if (categorySlug) {
      breadcrumbs.push({
        name: segmentToName(categorySlug, [], 0),
        href: `/products/${categorySlug}`
      });
    }

    if (productSlug) {
      breadcrumbs.push({
        name: segmentToName(productSlug, [], 0),
        href: `/products/${categorySlug}/${productSlug}`,
        current: true
      });
    }

    return breadcrumbs;
  },

  services: (serviceSlug?: string): BreadcrumbItem[] => {
    const breadcrumbs: BreadcrumbItem[] = [
      { name: 'Home', href: '/' },
      { name: 'Services', href: '/services' }
    ];

    if (serviceSlug) {
      breadcrumbs.push({
        name: segmentToName(serviceSlug, [], 0),
        href: `/services/${serviceSlug}`,
        current: true
      });
    }

    return breadcrumbs;
  }
};