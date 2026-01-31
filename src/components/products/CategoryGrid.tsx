'use client';

import React from 'react';
import Link from 'next/link';
import { SEOGenre } from '@/lib/api';
import CategoryCard from '@/components/ui/CategoryCard';

interface CategoryGridProps {
  categories: SEOGenre[];
  type: 'manufacture' | 'resell';
  className?: string;
}

export default function CategoryGrid({ categories, type, className = '' }: CategoryGridProps) {
  if (!categories || categories.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
        <p className="text-gray-600">
          No categories are currently available for this section.
        </p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${className}`}>
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          type={type}
          className="h-full"
        />
      ))}
    </div>
  );
}