'use client';

import React from 'react';
import Link from 'next/link';
import { SEOGenre } from '@/lib/api';
import { getDisplayImageUrl } from '@/lib/imageUtils';

interface CategoryCardProps {
  category: SEOGenre;
  type: 'manufacture' | 'resell';
  className?: string;
}

export default function CategoryCard({ category, type, className = '' }: CategoryCardProps) {
  const imageUrl = getDisplayImageUrl(category.image, { width: 400, height: 300, quality: 80 });

  return (
    <Link
      href={`/products/${category.slug}`}
      className={`group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-300 hover-lift ${className}`}
    >
      {/* Category Image - Improved for visibility */}
      <div className="w-full h-48 bg-white overflow-hidden relative p-2 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={category.image_alt || `${category.name} - Commercial Kitchen Equipment`}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
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

        {/* Features */}
        <div className="flex flex-wrap gap-1 mb-2">
          <span className="inline-block bg-blue-50 text-blue-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
            Commercial
          </span>
          <span className="inline-block bg-green-50 text-green-700 text-xs px-1.5 py-0.5 rounded-full font-medium">
            Quality
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