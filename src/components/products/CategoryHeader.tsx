'use client';

import React from 'react';
import Link from 'next/link';
import { SEOGenre } from '@/lib/types';
import { getDisplayImageUrl } from '@/lib/imageUtils';

interface CategoryHeaderProps {
  category: SEOGenre;
  productCount: number;
}

export default function CategoryHeader({ category, productCount }: CategoryHeaderProps) {
  const isManufacturing = category.type === 'manufacture';
  const imageUrl = getDisplayImageUrl(category.image, { width: 800, height: 600, quality: 90 });

  return (
    <section className={`py-16 ${isManufacturing ? 'bg-gradient-to-r from-blue-600 to-blue-800' : 'bg-gradient-to-r from-green-600 to-green-800'} text-white`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex items-center mb-4">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${isManufacturing
                ? 'bg-blue-500 bg-opacity-30 text-blue-100'
                : 'bg-green-500 bg-opacity-30 text-green-100'
                }`}>
                {isManufacturing ? 'Manufacturing' : 'Reseller'}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {category.name}
            </h1>

            <p className="text-xl mb-6">
              {category.description || `Professional ${category.name.toLowerCase()} for commercial kitchens in Pune. Quality equipment designed for restaurants, hotels, and food service businesses.`}
            </p>

            <div className="flex items-center mb-8">
              <div className="bg-white bg-opacity-20 rounded-lg p-4 mr-6">
                <div className="text-2xl font-bold text-gray-900">{productCount}</div>
                <div className="text-sm text-gray-700">Products Available</div>
              </div>

              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900">
                  {isManufacturing ? 'Custom' : 'Ready'}
                </div>
                <div className="text-sm text-gray-700">
                  {isManufacturing ? 'Manufacturing' : 'Stock'}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={`/contact?category=${encodeURIComponent(category.name)}`}
                className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
              >
                Get Quote
              </Link>

              {isManufacturing ? (
                <Link
                  href="/services/equipment-manufacturing"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-center"
                >
                  Manufacturing Process
                </Link>
              ) : (
                <Link
                  href="/contact?type=consultation"
                  className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors text-center"
                >
                  Expert Consultation
                </Link>
              )}
            </div>
          </div>

          <div className="relative">
            {/* Category Image */}
            <div className="relative h-96 bg-white overflow-hidden rounded-lg shadow-lg border border-gray-100 p-4 flex items-center justify-center">
              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={`${category.name} - Commercial Kitchen Equipment`}
                  className="w-full h-full object-contain"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.parentElement?.querySelector('.placeholder-fallback')?.classList.remove('hidden');
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                  <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
              )}

              {/* Fallback for error */}
              <div className="placeholder-fallback hidden absolute inset-0 flex items-center justify-center bg-gray-50">
                <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>

              {/* Category Features Overlay - Repositioned to bottom */}
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-100 p-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Quality Assured
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Fast Delivery
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z" />
                    </svg>
                    Expert Support
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    Best Prices
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}