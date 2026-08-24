'use client';

import React from 'react';
import Link from 'next/link';
import { SEOGenre } from '@/lib/api';
import { getDisplayImageUrl } from '@/lib/imageUtils';
import { categoryPath } from '@/lib/productSections';

interface CategoryCardProps {
  category: SEOGenre;
  type: 'manufacture' | 'resell';
  className?: string;
}

export default function CategoryCard({ category, type, className = '' }: CategoryCardProps) {
  const imageUrl = getDisplayImageUrl(category.image, { width: 400, height: 300, quality: 80 });

  return (
    <Link
      href={categoryPath(category)}
      className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 hover-lift ${className}`}
    >
      {/* Category Image - Improved for visibility */}
      <div className="w-full h-56 md:h-64 bg-white overflow-hidden relative p-3 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.image_alt || `${category.name} - Commercial Kitchen Equipment`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={320}
            loading="lazy"
            decoding="async"
            onLoad={() => {
              // Image loaded successfully
            }}
            onError={(e) => {
              console.error('Image failed to load:', imageUrl);
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-center p-3">
              <div className="w-10 h-10 mx-auto mb-2 bg-blue-200 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <p className="text-xs text-blue-600 font-medium">{category.name}</p>
            </div>
          </div>
        )}

        {/* Type Badge */}
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm border border-gray-100">
          {type === 'manufacture' ? 'Custom Made' : 'Ready to Ship'}
        </div>
      </div>

      {/* Category Content */}
      <div className="p-3">
        <h3 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">
          {category.name}
        </h3>

        {category.description && (
          <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-2">
            {category.description}
          </p>
        )}

        {/* Type chip.
            Replaces two chips ("Commercial", "Quality") that appeared on every
            category and so distinguished nothing. The manufacture/resell type
            is the one attribute that genuinely differs between categories, and
            it tells a buyer whether this is built to order or ready to ship. */}
        <div className="mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600">
            <svg className="w-3.5 h-3.5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {type === 'manufacture' ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-8.25m0-11.25h6.375c.621 0 1.125.504 1.125 1.125v9m-8.25 0V6.375c0-.621.504-1.125 1.125-1.125H9.75" />
              )}
            </svg>
            {type === 'manufacture' ? 'Built to order' : 'Ready to ship'}
          </span>
        </div>

        {/* View Products Link */}
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-medium text-xs group-hover:text-blue-700 transition-colors">
            View Products
          </span>
          <svg className="w-3 h-3 text-blue-600 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}