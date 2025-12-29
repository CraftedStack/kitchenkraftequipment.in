/**
 * Kitchen Kraft API Integration Layer
 * Maintains compatibility with existing backend endpoints while adding SEO enhancements
 */

// Base interfaces matching existing API responses
export interface Genre {
  id: number;
  name: string;
  description: string;
  image: string;
  type: 'manufacture' | 'resell';
}

export interface Product {
  id: number;
  name: string;
  image: string;
  description: string;
  price?: string;
  genre_id?: number;
  genre_name?: string;
}

// Enhanced interfaces with SEO properties
export interface SEOGenre extends Genre {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
}

export interface SEOProduct extends Product {
  slug: string;
  categorySlug: string;
  seoTitle: string;
  seoDescription: string;
  keywords: string[];
  specifications?: Record<string, string>;
}

// API Error types
export class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public endpoint?: string
  ) {
    super(message);
    this.name = 'APIError';
  }
}

import { cacheUtils, CACHE_CONFIG } from './cache';

/**
 * Kitchen Kraft API Client
 * Handles all API interactions with enhanced caching and error handling
 */
export class KitchenKraftAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  }

  /**
   * Generic fetch method with enhanced caching and error handling
   */
  private async fetchWithCache<T>(
    endpoint: string,
    cacheKey?: string
  ): Promise<T> {
    const key = cacheKey || `api_${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}`;
    
    return cacheUtils.cacheApiResponse(
      key,
      async () => {
        const response = await fetch(`${this.baseURL}${endpoint}`, {
          headers: {
            'Content-Type': 'application/json',
          },
          // Add cache control headers
          cache: 'no-store', // Let our cache handle it
        });
        
        if (!response.ok) {
          throw new APIError(
            `Failed to fetch from ${endpoint}`,
            response.status,
            endpoint
          );
        }

        const data = await response.json();
        return data;
      },
      CACHE_CONFIG.TTL.PRODUCTS
    );
  }

  /**
   * Generate SEO-friendly slug from name
   */
  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * Enhance genre data with SEO properties
   */
  private enhanceGenreWithSEO(genre: Genre): SEOGenre {
    const slug = this.generateSlug(genre.name);
    const baseKeywords = [
      genre.name.toLowerCase(),
      'commercial kitchen equipment',
      'pune',
      'kitchen kraft',
      'manufacturer'
    ];

    // Add type-specific keywords
    if (genre.type === 'manufacture') {
      baseKeywords.push('manufacturing', 'custom equipment');
    } else {
      baseKeywords.push('reseller', 'best sellers');
    }

    return {
      ...genre,
      slug,
      seoTitle: `${genre.name} - Commercial Kitchen Equipment | Kitchen Kraft Equipments`,
      seoDescription: `Professional ${genre.name.toLowerCase()} for commercial kitchens in Pune. ${genre.description || `Quality ${genre.name.toLowerCase()} from Kitchen Kraft Equipments.`}`.substring(0, 160),
      keywords: baseKeywords
    };
  }

  /**
   * Enhance product data with SEO properties
   */
  private enhanceProductWithSEO(product: Product, categorySlug?: string): SEOProduct {
    const slug = this.generateSlug(product.name);
    const category = categorySlug || (product.genre_name ? this.generateSlug(product.genre_name) : '');
    
    const baseKeywords = [
      product.name.toLowerCase(),
      'commercial kitchen equipment',
      'pune',
      'kitchen kraft'
    ];

    // Add category-specific keywords
    if (product.genre_name) {
      baseKeywords.push(product.genre_name.toLowerCase());
    }

    // Add price-related keywords if price exists
    if (product.price) {
      baseKeywords.push('price', 'cost', 'buy');
    }

    return {
      ...product,
      slug,
      categorySlug: category,
      seoTitle: `${product.name} - Commercial Kitchen Equipment | Kitchen Kraft`,
      seoDescription: `${product.description || product.name} - Professional commercial kitchen equipment from Kitchen Kraft Equipments, Pune. Get quote for ${product.name.toLowerCase()}.`.substring(0, 160),
      keywords: baseKeywords
    };
  }

  /**
   * Fetch all genres with SEO enhancement
   * Maintains compatibility with existing /api/genres endpoint
   */
  async getGenres(): Promise<SEOGenre[]> {
    return cacheUtils.cacheGenres(async () => {
      const genres: Genre[] = await this.fetchWithCache('/api/genres', 'genres');
      
      if (!Array.isArray(genres)) {
        throw new APIError('Invalid genres response format');
      }

      return genres.map(genre => this.enhanceGenreWithSEO(genre));
    });
  }

  /**
   * Fetch genres filtered by type (manufacture/resell)
   * Maintains existing filtering logic from ProductContainer
   */
  async getGenresByType(type: 'manufacture' | 'resell'): Promise<SEOGenre[]> {
    const allGenres = await this.getGenres();
    return allGenres.filter(genre => genre.type === type);
  }

  /**
   * Fetch products by genre ID with SEO enhancement
   * Maintains compatibility with existing /api/products/genre/${id} endpoint
   */
  async getProductsByGenre(genreId: number): Promise<SEOProduct[]> {
    return cacheUtils.cacheApiResponse(
      `products_genre_${genreId}`,
      async () => {
        const products: Product[] = await this.fetchWithCache(
          `/api/products/genre/${genreId}`,
          `products-genre-${genreId}`
        );

        if (!Array.isArray(products)) {
          throw new APIError('Invalid products response format');
        }

        // Get genre info for category slug
        const genres = await this.getGenres();
        const genre = genres.find(g => g.id === genreId);
        const categorySlug = genre?.slug || '';

        return products.map(product => this.enhanceProductWithSEO(product, categorySlug));
      },
      CACHE_CONFIG.TTL.PRODUCTS
    );
  }

  /**
   * Find genre by slug
   */
  async getGenreBySlug(slug: string): Promise<SEOGenre | null> {
    const genres = await this.getGenres();
    return genres.find(genre => genre.slug === slug) || null;
  }

  /**
   * Find product by category slug and product slug
   */
  async getProductBySlug(categorySlug: string, productSlug: string): Promise<SEOProduct | null> {
    const genre = await this.getGenreBySlug(categorySlug);
    if (!genre) return null;

    const products = await this.getProductsByGenre(genre.id);
    return products.find(product => product.slug === productSlug) || null;
  }

  /**
   * Get all products across all categories (for sitemap generation)
   */
  async getAllProducts(): Promise<SEOProduct[]> {
    return cacheUtils.cacheAllProducts(async () => {
      const genres = await this.getGenres();
      const allProducts: SEOProduct[] = [];

      for (const genre of genres) {
        try {
          const products = await this.getProductsByGenre(genre.id);
          allProducts.push(...products);
        } catch (error) {
          console.warn(`Failed to fetch products for genre ${genre.id}:`, error);
          // Continue with other genres
        }
      }

      return allProducts;
    });
  }

  /**
   * Clear cache (useful for testing or forced refresh)
   */
  clearCache(): void {
    cacheUtils.clearAll();
  }

  /**
   * Get cache statistics (for debugging)
   */
  getCacheStats(): { hitRate: number; size: number; memoryUsage: number } {
    return cacheUtils.getStats();
  }

  /**
   * Invalidate specific cache patterns
   */
  invalidateCache(pattern?: string): void {
    if (pattern) {
      // Use cache manager's invalidatePattern method
      cacheUtils.invalidateProducts();
    } else {
      cacheUtils.clearAll();
    }
  }
}

// Export singleton instance
export const api = new KitchenKraftAPI();