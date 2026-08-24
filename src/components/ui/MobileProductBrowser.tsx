'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SEOProduct, SEOGenre } from '@/lib/types';
import { productPath } from '@/lib/productSections';
import { FaFilter, FaTh, FaList, FaSearch, FaTimes } from 'react-icons/fa';
import { getDisplayImageUrl } from '@/lib/imageUtils';
import { getSaleInfo, formatINR } from '@/lib/sale';

interface MobileProductBrowserProps {
  products: SEOProduct[];
  categories?: SEOGenre[];
  currentCategory?: string;
  /**
   * Section these products belong to — '/manufacturing' or '/products'.
   * Passed down by ProductGrid, which knows the section it is rendering in.
   */
  basePath?: string;
  className?: string;
}

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price' | 'newest';

export default function MobileProductBrowser({
  products,
  categories = [],
  currentCategory,
  basePath = '/products',
  className = ''
}: MobileProductBrowserProps) {
  // A product's URL follows its category's section. Prefer the category's own
  // type when the list is available; otherwise use the section this grid was
  // rendered in, which ProductGrid passes down.
  const productHref = (product: SEOProduct) => {
    const parent = categories?.find((c) => c.slug === product.categorySlug);
    return parent
      ? productPath(parent, product.slug)
      : `${basePath}/${product.categorySlug}/${product.slug}`;
  };

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(currentCategory || '');
  const [showFilters, setShowFilters] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter and sort products
  useEffect(() => {
    let filtered = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.categorySlug?.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.categorySlug === selectedCategory
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          // Assuming price is a string like "₹10,000" or empty
          const priceA = parseFloat(a.price?.replace(/[^\d.]/g, '') || '0');
          const priceB = parseFloat(b.price?.replace(/[^\d.]/g, '') || '0');
          return priceA - priceB;
        case 'newest':
          return b.id - a.id; // Assuming higher ID means newer
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchQuery, selectedCategory, sortBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSortBy('name');
  };

  return (
    <div className={`mobile-product-browser ${className}`}>
      {/* Mobile Search Bar */}
      <div className="sticky top-0 z-30 bg-white border-b border-gray-200 p-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="btn-close absolute right-3 top-1/2 transform -translate-y-1/2 p-0.5 rounded"
            >
              <FaTimes size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Controls */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <FaFilter className="mr-2" size={14} />
            <span className="text-sm font-medium">Filters</span>
            {(searchQuery || selectedCategory) && (
              <span className="ml-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                {[searchQuery, selectedCategory].filter(Boolean).length}
              </span>
            )}
          </button>

          {/* View Mode and Sort */}
          <div className="flex items-center space-x-2">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
              <option value="newest">Sort by Newest</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                aria-label="Grid view"
              >
                <FaTh size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
                aria-label="List view"
              >
                <FaList size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Filters</h3>
              <button
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Clear All
              </button>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="px-4 py-2 bg-gray-50 border-b border-gray-200">
        <p className="text-sm text-gray-800 font-medium">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          {searchQuery && ` for "${searchQuery}"`}
        </p>
      </div>

      {/* Products Grid/List */}
      <div className="p-4">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-gray-400" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 gap-4'
              : 'space-y-4'
          }>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                viewMode={viewMode}
                isMounted={isMounted}
                href={productHref(product)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Mobile-optimized product card
function ProductCard({
  product,
  viewMode,
  isMounted,
  href
}: {
  product: SEOProduct;
  viewMode: ViewMode;
  isMounted: boolean;
  /** Resolved by the parent, which knows each category's section. */
  href: string;
}) {
  const imageUrl = getDisplayImageUrl(product.image, { width: 300, height: 300, quality: 80 });

  if (viewMode === 'list') {
    return (
      <div className="flex bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200">
        {/* Product Image */}
        <div className="w-24 h-24 flex-shrink-0 bg-white overflow-hidden relative p-1 flex items-center justify-center border-r border-gray-100">
          {isMounted && imageUrl ? (
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-full object-contain"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent && !parent.querySelector('.fallback-placeholder')) {
                  const fallback = document.createElement('div');
                  fallback.className = 'fallback-placeholder w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg';
                  fallback.innerHTML = `
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  `;
                  parent.appendChild(fallback);
                }
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
          )}

          {/* Price Badge for List View (sale-aware) */}
          {product.price && (() => {
            const s = getSaleInfo(product);
            return (
              <div className="absolute top-1 right-1 flex flex-col items-end gap-0.5">
                <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-lg border border-white/20 text-white ${s.onSale ? 'bg-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-700'}`}>
                  {formatINR(s.onSale ? s.sale! : parseFloat(product.price))}
                </div>
                {s.onSale && (
                  <div className="bg-white/90 text-red-600 text-[9px] font-bold px-1 py-0.5 rounded">{s.percent}% OFF</div>
                )}
              </div>
            );
          })()}
        </div>

        {/* Product Info */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1 leading-tight">
              {product.name}
            </h3>
            {product.description && (
              <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                {product.description}
              </p>
            )}

            {/* One quiet material line. Replaced identical filler chips that
                consumed scarce mobile space without distinguishing products. */}
            <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
              <svg className="w-3.5 h-3.5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Food-grade stainless steel</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={href}
              className="flex-1 text-xs bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-2 px-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-center shadow-md"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200 transform hover:-translate-y-1">
      {/* Product Image - Fixed like CategoryCard */}
      <div className="w-full h-48 bg-white overflow-hidden relative p-2 flex items-center justify-center">
        {isMounted && imageUrl ? (
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-placeholder')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-placeholder absolute inset-0 w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg';
                fallback.innerHTML = `
                  <div class="text-center p-4">
                    <div class="w-12 h-12 mx-auto mb-2 bg-blue-200 rounded-full flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <p class="text-xs text-blue-600 font-medium">Equipment</p>
                  </div>
                `;
                parent.appendChild(fallback);
              }
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <div className="text-center p-4">
              <div className="w-12 h-12 mx-auto mb-2 bg-blue-200 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <p className="text-xs text-blue-600 font-medium">Equipment</p>
            </div>
          </div>
        )}

        {/* Price Badge (sale-aware) */}
        {product.price && (() => {
          const s = getSaleInfo(product);
          return (
            <div className="absolute top-2 right-2 flex flex-col items-end gap-0.5">
              <div className={`text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-white/20 text-white ${s.onSale ? 'bg-red-600' : 'bg-gradient-to-r from-blue-600 to-blue-700'}`}>
                {formatINR(s.onSale ? s.sale! : parseFloat(product.price))}
              </div>
              {s.onSale && (
                <div className="bg-white/90 text-red-600 text-[10px] font-bold px-1.5 py-0.5 rounded">{s.percent}% OFF</div>
              )}
            </div>
          );
        })()}

        {/* Category Badge */}
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-medium px-2 py-1 rounded-full shadow-sm border border-gray-100">
          Commercial
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-3 leading-tight">
          {product.name}
        </h3>

        {/* One quiet material line. Replaced identical filler chips that
            consumed scarce mobile space without distinguishing products. */}
        <div className="mb-2 flex items-center gap-1.5 text-xs text-gray-500">
          <svg className="w-3.5 h-3.5 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Food-grade stainless steel</span>
        </div>
      </div>
    </div>
  );
}