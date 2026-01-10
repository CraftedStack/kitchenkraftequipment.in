'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { SEOGenre } from '@/lib/api';
import CategoryCard from '@/components/ui/CategoryCard';
import { TouchButton } from '@/components/ui/TouchFeedback';

export default function HomepageProductSection() {
  const [manufacturingCategories, setManufacturingCategories] = useState<SEOGenre[]>([]);
  const [resellerCategories, setResellerCategories] = useState<SEOGenre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch manufacturing categories (max 4)
        const manufacturingGenres = await api.getGenresByType('manufacture');
        setManufacturingCategories(manufacturingGenres.slice(0, 4));
        
        // Fetch reseller categories (max 4)
        const resellerGenres = await api.getGenresByType('resell');
        setResellerCategories(resellerGenres.slice(0, 4));
        
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load product categories. Please check if the backend server is running.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <section className="py-6 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
              Premium Commercial Kitchen Equipment
            </h2>
            <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-2 md:px-4 leading-relaxed">
              Discover our extensive range of high-quality commercial kitchen equipment. 
              From custom-manufactured solutions to trusted brand products.
            </p>
          </div>
          
          {/* Loading State */}
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-2">
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <p className="mt-4 text-gray-600">Loading product categories...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-6 md:py-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 md:py-16">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-6 md:mb-12">
          <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4 px-2">
            Premium Commercial Kitchen Equipment
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-3xl mx-auto px-2 md:px-4 leading-relaxed">
            Discover our extensive range of high-quality commercial kitchen equipment. 
            From custom-manufactured solutions to trusted brand products - everything you need for your professional kitchen.
          </p>
        </div>

        {/* Custom Manufactured Equipment Section */}
        <div className="mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-3 md:p-6">
            {/* Section Header */}
            <div className="flex items-center mb-3 md:mb-4">
              <div className="bg-blue-600 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">Custom Manufactured Equipment</h3>
                <p className="text-gray-700 text-xs md:text-sm mt-1">
                  Precision-engineered stainless steel equipment built to your specifications
                </p>
              </div>
            </div>

            {/* Manufacturing Categories Grid */}
            {manufacturingCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {manufacturingCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    type="manufacture"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No manufacturing categories available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Premium Brand Products Section */}
        <div className="mb-6 md:mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-3 md:p-6">
            {/* Section Header */}
            <div className="flex items-center mb-3 md:mb-4">
              <div className="bg-green-600 w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg md:text-2xl font-bold text-gray-900">Premium Brand Products</h3>
                <p className="text-gray-700 text-xs md:text-sm mt-1">
                  Top-quality equipment from trusted manufacturers, ready to ship
                </p>
              </div>
            </div>

            {/* Reseller Categories Grid */}
            {resellerCategories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                {resellerCategories.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    type="resell"
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-600">No brand product categories available at the moment.</p>
              </div>
            )}
          </div>
        </div>

        {/* Single CTA Button */}
        <div className="text-center">
          <TouchButton className="bg-gray-900 text-white px-6 md:px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
            <Link href="/products" className="block w-full h-full">
              View All Products →
            </Link>
          </TouchButton>
        </div>
      </div>
    </section>
  );
}