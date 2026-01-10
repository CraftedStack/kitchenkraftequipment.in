'use client';

import React from 'react';
import Link from 'next/link';
import { SEOGenre } from '@/lib/api';
import { getDisplayImageUrl } from '@/lib/imageUtils';

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
      {categories.map((category) => {
        const imageUrl = getDisplayImageUrl(category.image, { width: 400, height: 300, quality: 80 });
        
        return (
        <div
          key={category.id}
          className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-2"
        >
          {/* Category Image - Using same structure as CategoryCard */}
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden relative">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={`${category.name} - Commercial Kitchen Equipment`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
                onLoad={() => {
                  console.log('CategoryGrid - Image loaded successfully:', imageUrl);
                }}
                onError={(e) => {
                  console.error('CategoryGrid - Image failed to load:', imageUrl);
                  console.error('CategoryGrid - Original image URL:', category.image);
                  // Hide the failed image and show fallback
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent && !parent.querySelector('.image-fallback')) {
                    const fallback = document.createElement('div');
                    fallback.className = 'image-fallback w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 absolute inset-0';
                    fallback.innerHTML = `
                      <div class="text-center p-6">
                        <div class="w-16 h-16 mx-auto mb-3 bg-blue-200 rounded-full flex items-center justify-center">
                          <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                          </svg>
                        </div>
                        <p class="text-sm text-blue-600 font-medium">${category.name}</p>
                        <p class="text-xs text-blue-500 mt-1">Category</p>
                      </div>
                    `;
                    parent.appendChild(fallback);
                  }
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                <div className="text-center p-6">
                  <div className="w-16 h-16 mx-auto mb-3 bg-blue-200 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <p className="text-sm text-blue-600 font-medium">{category.name}</p>
                  <p className="text-xs text-blue-500 mt-1">No Image Available</p>
                </div>
              </div>
            )}

            {/* Type Badge */}
            <div className="absolute top-3 right-3 bg-white bg-opacity-90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
              {type === 'manufacture' ? 'Custom Made' : 'Ready to Ship'}
            </div>
          </div>

          {/* Category Content */}
          <div className="p-6 bg-white">
            <div className="mb-4">
              <h3 className="font-bold text-gray-900 text-xl mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                {category.name}
              </h3>
              
              {category.description && (
                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                  {category.description}
                </p>
              )}
            </div>

            {/* Category Features */}
            <div className="mb-4 flex flex-wrap gap-1">
              <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                {type === 'manufacture' ? 'Manufacturing' : 'Best Sellers'}
              </span>
              <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                Commercial Grade
              </span>
              <span className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                Professional
              </span>
            </div>

            {/* Category Description */}
            <div className="text-center">
              <p className="text-gray-600 text-sm mb-4">
                {type === 'manufacture' 
                  ? `Custom manufactured ${category.name.toLowerCase()} with high-grade stainless steel`
                  : `Premium ${category.name.toLowerCase()} from trusted brands for professional kitchens`
                }
              </p>
              
              {/* View Products Button */}
              <Link
                href={`/products/${category.slug}`}
                className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700 transition-colors"
              >
                <span>View Products</span>
                <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Quality Assured</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-3 h-3 mr-1 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Expert Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
}