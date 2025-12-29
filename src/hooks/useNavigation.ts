'use client';

import { useState, useEffect } from 'react';
import { api, SEOGenre } from '@/lib/api';
import { NAVIGATION } from '@/lib/constants';

interface NavigationItem {
  name: string;
  href: string;
  description?: string;
}

interface MainNavigationItem {
  name: string;
  href: string;
  children?: NavigationItem[];
}

export function useNavigation() {
  // Provide a complete fallback navigation structure that matches NAVIGATION.main
  const fallbackNavigation: MainNavigationItem[] = [
    { name: "Home", href: "/" },
    {
      name: "Services",
      href: "/services",
      children: [
        {
          name: "Commercial Kitchen Design",
          href: "/services/commercial-kitchen-design",
          description: "Custom kitchen layouts optimized for efficiency"
        },
        {
          name: "Equipment Manufacturing",
          href: "/services/equipment-manufacturing",
          description: "Custom stainless steel equipment manufacturing"
        },
        {
          name: "Installation & Maintenance",
          href: "/services/installation-maintenance",
          description: "Professional installation and ongoing support"
        },
        {
          name: "Expert Consultation",
          href: "/services/consultation",
          description: "Professional advice and planning services"
        }
      ]
    },
    {
      name: "Products",
      href: "/products",
      children: [
        {
          name: "All Products",
          href: "/products",
          description: "Browse our complete product catalog"
        },
        {
          name: "Custom Manufacturing",
          href: "/products?type=manufacture",
          description: "Custom-built equipment solutions"
        },
        {
          name: "Premium Brands",
          href: "/products?type=resell",
          description: "Top-quality branded equipment"
        }
      ]
    },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const [navigation, setNavigation] = useState<MainNavigationItem[]>(() => {
    // Safely access NAVIGATION with fallback
    try {
      const initialNav = NAVIGATION?.main || fallbackNavigation;
      console.log('Initial navigation loaded:', initialNav.map(item => ({ 
        name: item.name, 
        hasChildren: !!item.children,
        childrenCount: item.children?.length || 0 
      })));
      return initialNav;
    } catch (error) {
      console.warn('NAVIGATION not available, using fallback:', error);
      return fallbackNavigation;
    }
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function enhanceNavigation() {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch categories from API
        const genres = await api.getGenres();
        
        // Group by type
        const manufacturingCategories = genres.filter(g => g.type === 'manufacture');
        const resellerCategories = genres.filter(g => g.type === 'resell');

        // Build enhanced products navigation
        const productsChildren: NavigationItem[] = [
          {
            name: "All Products",
            href: "/products",
            description: "Browse our complete product catalog"
          }
        ];

        // Add manufacturing categories
        if (manufacturingCategories.length > 0) {
          productsChildren.push({
            name: "Custom Manufacturing",
            href: "/products?type=manufacture",
            description: "Custom-built equipment solutions"
          });

          // Add top manufacturing categories
          manufacturingCategories.slice(0, 3).forEach(category => {
            productsChildren.push({
              name: category.name,
              href: `/products/${category.slug}`,
              description: category.description || `Professional ${category.name.toLowerCase()}`
            });
          });
        }

        // Add reseller categories
        if (resellerCategories.length > 0) {
          productsChildren.push({
            name: "Premium Brands",
            href: "/products?type=resell",
            description: "Top-quality branded equipment"
          });

          // Add top reseller categories
          resellerCategories.slice(0, 3).forEach(category => {
            productsChildren.push({
              name: category.name,
              href: `/products/${category.slug}`,
              description: category.description || `Quality ${category.name.toLowerCase()}`
            });
          });
        }

        // Build enhanced navigation using the static navigation as base
        const baseNavigation = (() => {
          try {
            return NAVIGATION?.main || fallbackNavigation;
          } catch (error) {
            console.warn('NAVIGATION not available in enhancement, using fallback:', error);
            return fallbackNavigation;
          }
        })();

        const enhancedNavigation = baseNavigation.map(item => {
          if (item.name === "Products") {
            return {
              ...item,
              children: productsChildren
            };
          }
          return item;
        });

        console.log('Enhanced navigation:', enhancedNavigation.map(item => ({ 
          name: item.name, 
          hasChildren: !!item.children,
          childrenCount: item.children?.length || 0 
        })));

        setNavigation(enhancedNavigation);
      } catch (err) {
        console.error('Failed to enhance navigation:', err);
        setError(err instanceof Error ? err.message : 'Failed to load navigation');
        // Keep the static navigation as fallback
      } finally {
        setIsLoading(false);
      }
    }

    enhanceNavigation();
  }, []);

  return { navigation, isLoading, error };
}

export type { NavigationItem, MainNavigationItem };