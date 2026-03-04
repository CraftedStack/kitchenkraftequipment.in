'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SEOProduct } from '@/lib/types';
import MobileProductBrowser from '@/components/ui/MobileProductBrowser';
import { getDisplayImageUrl } from '@/lib/imageUtils';

interface ProductGridProps {
  products: SEOProduct[];
  categorySlug?: string;
  className?: string;
}

export default function ProductGrid({ products, categorySlug, className = '' }: ProductGridProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!products || products.length === 0) {
    return (
      <div className={`text-center py-12 ${className}`}>
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6m-10 0h6m0 0v5m0-5h6m-6 0v-5" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
        <p className="text-gray-600">
          No products are currently available in this category.
        </p>
      </div>
    );
  }

  // Don't render images until mounted to prevent hydration issues
  if (!isMounted) {
    return (
      <div className={`${className}`}>
        {/* Mobile Product Browser Skeleton */}
        <div className="md:hidden">
          <div className="grid grid-cols-2 gap-4 p-4">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-square bg-gray-200"></div>
                <div className="p-3">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Product Grid Skeleton */}
        <div className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="aspect-square bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded-lg mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-18 animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                    <div className="h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Product Browser */}
      <div className="md:hidden">
        <MobileProductBrowser
          products={products}
          currentCategory={categorySlug}
          className={className}
        />
      </div>

      {/* Desktop Product Grid */}
      <div className="hidden md:block">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product) => {
            const imageUrl = getDisplayImageUrl(product.image, { width: 400, height: 400, quality: 80 });

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1"
              >
                {/* Product Image - Fixed like CategoryCard */}
                <div className="w-full h-48 bg-white overflow-hidden relative p-2 flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      onLoad={() => {
                        // Image loaded successfully
                      }}
                      onError={(e) => {
                        console.error('ProductGrid - Image failed to load:', imageUrl);
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                      <div className="text-center p-6">
                        <div className="w-16 h-16 mx-auto mb-3 bg-blue-200 rounded-full flex items-center justify-center">
                          <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                          </svg>
                        </div>
                        <p className="text-sm text-blue-600 font-medium">Kitchen Equipment</p>
                        <p className="text-xs text-blue-500 mt-1">Professional Grade</p>
                      </div>
                    </div>
                  )}

                  {/* Price Badge */}
                  {product.price && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm bg-opacity-95">
                      ₹{parseFloat(product.price).toLocaleString('en-IN')}
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm border border-gray-100">
                    Commercial Grade
                  </div>
                </div>

                {/* Enhanced Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                      {product.name}
                    </h3>

                    {product.description && (
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>

                  {/* Features/Specs Preview */}
                  <div className="mb-4 flex flex-wrap gap-1">
                    <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full font-medium">
                      Stainless Steel
                    </span>
                    <span className="inline-block bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full font-medium">
                      Food Grade
                    </span>
                    <span className="inline-block bg-purple-50 text-purple-700 text-xs px-2 py-1 rounded-full font-medium">
                      Commercial
                    </span>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col gap-3">
                    <Link
                      href={`/products/${product.categorySlug || categorySlug}/${product.slug}`}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center group"
                    >
                      <span>View Details</span>
                      <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>

                    <button
                      onClick={() => {
                        window.location.href = `/quote?product=${encodeURIComponent(product.name)}`;
                      }}
                      className="w-full bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 flex items-center justify-center group"
                    >
                      <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                      <span>Get Quote</span>
                    </button>
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
                        <span>Warranty</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}