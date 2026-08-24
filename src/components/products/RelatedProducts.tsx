'use client';

import React from 'react';
import Link from 'next/link';
import { SEOProduct } from '@/lib/types';
import { getDisplayImageUrl } from '@/lib/imageUtils';
import { getSaleInfo, formatINR } from '@/lib/sale';

interface RelatedProductsProps {
  /**
   * Section these products live in — '/manufacturing' or '/products'.
   * Related products always share the current category, so they share its
   * section too. Defaults to '/products'.
   */
  basePath?: string;
  products: SEOProduct[];
  categoryName: string;
  categorySlug: string;
}

export default function RelatedProducts({ products, categoryName, categorySlug, basePath = '/products' }: RelatedProductsProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Related Products
            </h2>
            <p className="text-lg text-gray-600">
              More {categoryName.toLowerCase()} from our collection
            </p>
          </div>

          <Link
            href={`${basePath}/${categorySlug}`}
            className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
          >
            View All {categoryName}
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
            >
              <Link href={`${basePath}/${product.categorySlug}/${product.slug}`}>
                <div className="relative h-48 bg-white overflow-hidden p-2 flex items-center justify-center">
                  {(() => {
                    const imageUrl = getDisplayImageUrl(product.image, { width: 400, height: 400, quality: 80 });
                    return imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={product.image_alt || product.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          target.parentElement?.querySelector('.placeholder-fallback')?.classList.remove('hidden');
                        }}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                    );
                  })()}

                  {/* Fallback for error */}
                  <div className="placeholder-fallback hidden absolute inset-0 flex items-center justify-center bg-gray-50">
                    <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>

                  {/* Price Badge (sale-aware) */}
                  {product.price && (() => {
                    const s = getSaleInfo(product);
                    return s.onSale ? (
                      <div className="absolute top-2 right-2 flex flex-col items-end gap-0.5">
                        <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">{formatINR(s.sale!)}</div>
                        <div className="bg-white/90 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">{s.percent}% OFF</div>
                      </div>
                    ) : (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
                        {product.price}
                      </div>
                    );
                  })()}

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white text-gray-900 px-4 py-2 rounded-lg font-medium text-sm">
                        View Details
                      </div>
                    </div>
                  </div>
                </div>
              </Link>

              <div className="p-4">
                <Link href={`${basePath}/${product.categorySlug}/${product.slug}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {product.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <Link
                    href={`${basePath}/${product.categorySlug}/${product.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                  >
                    View Details
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>

                  <button
                    onClick={() => {
                      window.location.href = `/contact?product=${encodeURIComponent(product.name)}`;
                    }}
                    className="bg-blue-600 text-white text-xs px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                  >
                    Inquire
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More CTA */}
        <div className="text-center mt-12">
          <Link
            href={`${basePath}/${categorySlug}`}
            className="inline-flex items-center bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View All {categoryName} Products
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}