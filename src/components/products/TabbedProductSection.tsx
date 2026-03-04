'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { api } from '@/lib/api';
import { SEOGenre } from '@/lib/api';
import CategoryGrid from './CategoryGrid';

const SESSION_KEY_TAB = 'products_active_tab';
const SESSION_KEY_SCROLL = 'products_scroll_y';

interface Tab {
  id: 'manufacturing' | 'bestselling';
  label: string;
  icon: string;
  type: 'manufacture' | 'resell';
}

const tabs: Tab[] = [
  {
    id: 'manufacturing',
    label: 'Manufacturing Products',
    icon: '🔧',
    type: 'manufacture'
  },
  {
    id: 'bestselling',
    label: 'Best Selling Products',
    icon: '⭐',
    type: 'resell'
  }
];

const CATEGORIES_PER_BATCH = 6; // Load 6 categories per batch (2x3 grid)

interface TabData {
  categories: SEOGenre[];
  allCategories: SEOGenre[];
  hasMore: boolean;
  loading: boolean;
  error: string | null;
  scrollPosition: number;
}

export default function TabbedProductSection() {
  const [activeTab, setActiveTab] = useState<'manufacturing' | 'bestselling'>(() => {
    if (typeof window !== 'undefined') {
      const saved = sessionStorage.getItem(SESSION_KEY_TAB);
      if (saved === 'manufacturing' || saved === 'bestselling') return saved;
    }
    return 'manufacturing';
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // Separate data for each tab
  const [tabData, setTabData] = useState<Record<string, TabData>>({
    manufacturing: {
      categories: [],
      allCategories: [],
      hasMore: true,
      loading: false,
      error: null,
      scrollPosition: 0
    },
    bestselling: {
      categories: [],
      allCategories: [],
      hasMore: true,
      loading: false,
      error: null,
      scrollPosition: 0
    }
  });

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingTriggerRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const didRestoreScroll = useRef(false);

  // Fetch all categories for a tab type
  const fetchAllCategoriesForTab = useCallback(async (tabId: 'manufacturing' | 'bestselling') => {
    const tabInfo = tabs.find(tab => tab.id === tabId)!;
    
    try {
      const categories = await api.getGenresByType(tabInfo.type);
      return categories;
    } catch (err) {
      console.error('Error fetching categories:', err);
      throw new Error('Failed to load categories. Please try again later.');
    }
  }, []);

  // Load initial batch for a tab
  const loadInitialBatch = useCallback(async (tabId: 'manufacturing' | 'bestselling') => {
    setTabData(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        loading: true,
        error: null
      }
    }));

    try {
      const allCategories = await fetchAllCategoriesForTab(tabId);
      const initialCategories = allCategories.slice(0, CATEGORIES_PER_BATCH);
      
      setTabData(prev => ({
        ...prev,
        [tabId]: {
          ...prev[tabId],
          categories: initialCategories,
          allCategories,
          hasMore: allCategories.length > CATEGORIES_PER_BATCH,
          loading: false,
          error: null
        }
      }));
    } catch (err) {
      setTabData(prev => ({
        ...prev,
        [tabId]: {
          ...prev[tabId],
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load categories'
        }
      }));
    }
  }, [fetchAllCategoriesForTab]);

  // Load next batch of categories
  const loadNextBatch = useCallback((tabId: 'manufacturing' | 'bestselling') => {
    const currentTabData = tabData[tabId];
    
    if (currentTabData.loading || !currentTabData.hasMore) return;

    setTabData(prev => ({
      ...prev,
      [tabId]: {
        ...prev[tabId],
        loading: true
      }
    }));

    // Simulate loading delay for smooth UX
    setTimeout(() => {
      const currentLength = currentTabData.categories.length;
      const nextBatch = currentTabData.allCategories.slice(
        currentLength,
        currentLength + CATEGORIES_PER_BATCH
      );
      
      setTabData(prev => ({
        ...prev,
        [tabId]: {
          ...prev[tabId],
          categories: [...prev[tabId].categories, ...nextBatch],
          hasMore: currentLength + nextBatch.length < prev[tabId].allCategories.length,
          loading: false
        }
      }));
    }, 300);
  }, [tabData]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (!loadingTriggerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !tabData[activeTab].loading && tabData[activeTab].hasMore) {
          loadNextBatch(activeTab);
        }
      },
      {
        rootMargin: '100px' // Trigger 100px before the element comes into view
      }
    );

    observerRef.current.observe(loadingTriggerRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [activeTab, tabData, loadNextBatch]);

  // Handle tab switching
  const handleTabSwitch = useCallback(async (tabId: 'manufacturing' | 'bestselling') => {
    if (tabId === activeTab || isTransitioning) return;

    setIsTransitioning(true);

    setTimeout(() => {
      setActiveTab(tabId);
      sessionStorage.setItem(SESSION_KEY_TAB, tabId);
      setIsTransitioning(false);

      // Load initial batch if tab hasn't been loaded yet
      if (tabData[tabId].categories.length === 0 && !tabData[tabId].loading) {
        loadInitialBatch(tabId);
      }

      // Scroll just to the tab bar, not the top of the page
      if (containerRef.current) {
        const y = containerRef.current.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 150);
  }, [activeTab, isTransitioning, tabData, loadInitialBatch]);

  // Load initial data — load whichever tab was active when user left
  useEffect(() => {
    const initializeData = async () => {
      setInitialLoading(true);
      await loadInitialBatch(activeTab);
      setInitialLoading(false);
    };

    initializeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Restore scroll position after data loads (back-navigation)
  useEffect(() => {
    if (initialLoading || didRestoreScroll.current) return;
    const saved = sessionStorage.getItem(SESSION_KEY_SCROLL);
    if (saved) {
      const y = parseInt(saved, 10);
      sessionStorage.removeItem(SESSION_KEY_SCROLL);
      // rAF ensures layout is painted before we scroll
      requestAnimationFrame(() => {
        window.scrollTo({ top: y, behavior: 'instant' as ScrollBehavior });
      });
    }
    didRestoreScroll.current = true;
  }, [initialLoading]);

  // Save scroll position when user clicks into a category or product page
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor?.href) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.pathname.startsWith('/products/')) {
        sessionStorage.setItem(SESSION_KEY_SCROLL, String(window.scrollY));
      }
    };
    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  // Retry function
  const handleRetry = useCallback(() => {
    loadInitialBatch(activeTab);
  }, [activeTab, loadInitialBatch]);

  const activeTabData = tabs.find(tab => tab.id === activeTab)!;
  const currentTabData = tabData[activeTab];

  return (
    <section className="py-12 md:py-16" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-100 p-1 rounded-lg inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabSwitch(tab.id)}
                className={`
                  px-6 py-3 rounded-md font-medium transition-all duration-200 flex items-center space-x-2
                  ${activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                  }
                `}
                aria-pressed={activeTab === tab.id}
                role="tab"
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="relative">
          {/* Loading Overlay for Tab Switching */}
          {isTransitioning && (
            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}

          {/* Content Area */}
          <div className={`transition-opacity duration-200 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center space-x-3">
                <span className="text-3xl">{activeTabData.icon}</span>
                <span>{activeTabData.label}</span>
              </h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                {activeTab === 'manufacturing' 
                  ? 'Explore our manufacturing categories - precision-engineered stainless steel equipment manufactured to your exact specifications. Built for durability, efficiency, and compliance with food safety standards.'
                  : 'Browse our best-selling product categories - curated selection of top-quality commercial kitchen equipment from trusted manufacturers. Ready-to-ship solutions for immediate deployment in your kitchen.'
                }
              </p>
            </div>

            {/* Categories Display */}
            <div className="mb-8">
              {/* Initial Loading State */}
              {initialLoading && activeTab === 'manufacturing' && (
                <div className="text-center py-12">
                  <div className="inline-flex items-center space-x-2">
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce"></div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-4 h-4 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <p className="mt-4 text-gray-600">Loading categories...</p>
                </div>
              )}

              {/* Error State */}
              {currentTabData.error && (
                <div className="text-center py-12">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                    <p className="text-red-600 mb-4">{currentTabData.error}</p>
                    <button
                      onClick={handleRetry}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Categories Grid */}
              {!initialLoading && !currentTabData.error && currentTabData.categories.length > 0 && (
                <>
                  <CategoryGrid 
                    categories={currentTabData.categories} 
                    type={activeTabData.type}
                  />
                  
                  {/* Infinite Scroll Loading Trigger */}
                  {currentTabData.hasMore && (
                    <div ref={loadingTriggerRef} className="py-8">
                      {currentTabData.loading && (
                        <div className="text-center">
                          <div className="inline-flex items-center space-x-2">
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <p className="mt-2 text-gray-600 text-sm">Loading more categories...</p>
                        </div>
                      )}
                    </div>
                  )}
                  
                  {/* End of Categories Indicator */}
                  {!currentTabData.hasMore && currentTabData.categories.length > CATEGORIES_PER_BATCH && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center space-x-2 text-gray-500">
                        <div className="w-12 h-px bg-gray-300"></div>
                        <span className="text-sm font-medium">You've seen all categories</span>
                        <div className="w-12 h-px bg-gray-300"></div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Empty State */}
              {!initialLoading && !currentTabData.error && currentTabData.categories.length === 0 && (
                <div className="text-center py-12">
                  <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Categories Found</h3>
                  <p className="text-gray-600">
                    No categories are currently available in this section.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}