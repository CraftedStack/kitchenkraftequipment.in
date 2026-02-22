/**
 * Enhanced Caching System
 * Multi-layer caching with memory, localStorage, and API response caching
 */

// Cache configuration
export const CACHE_CONFIG = {
  // Cache TTL in milliseconds
  TTL: {
    GENRES: 10 * 60 * 1000, // 10 minutes
    PRODUCTS: 5 * 60 * 1000, // 5 minutes
    STATIC_DATA: 60 * 60 * 1000, // 1 hour
    USER_PREFERENCES: 24 * 60 * 60 * 1000, // 24 hours
  },
  
  // Cache keys
  KEYS: {
    GENRES: 'kk_genres',
    PRODUCTS: 'kk_products_',
    ALL_PRODUCTS: 'kk_all_products',
    STATIC_PAGES: 'kk_static_',
    USER_PREFS: 'kk_user_prefs',
  },
  
  // Cache limits
  LIMITS: {
    MEMORY_CACHE_SIZE: 100, // Maximum number of items in memory cache
    STORAGE_CACHE_SIZE: 50, // Maximum number of items in localStorage
  }
} as const;

// Cache entry interface
interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  hits: number;
  size: number;
}

// Cache statistics interface
interface CacheStats {
  hits: number;
  misses: number;
  size: number;
  memoryUsage: number;
}

/**
 * Multi-layer Cache Manager
 * Implements memory cache with localStorage fallback
 */
export class CacheManager {
  private memoryCache = new Map<string, CacheEntry<any>>();
  private stats: CacheStats = { hits: 0, misses: 0, size: 0, memoryUsage: 0 };
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor() {
    // Start cleanup interval (every 5 minutes)
    this.startCleanup();
    
    // Listen for storage events (cross-tab synchronization)
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.handleStorageChange);
    }
  }

  /**
   * Get item from cache (memory first, then localStorage)
   */
  get<T>(key: string): T | null {
    // Try memory cache first
    const memoryEntry = this.memoryCache.get(key);
    if (memoryEntry && this.isValid(memoryEntry)) {
      memoryEntry.hits++;
      this.stats.hits++;
      return memoryEntry.data;
    }

    // Try localStorage
    if (typeof window !== 'undefined') {
      try {
        const storageData = localStorage.getItem(key);
        if (storageData) {
          const entry: CacheEntry<T> = JSON.parse(storageData);
          if (this.isValid(entry)) {
            // Promote to memory cache
            this.setMemoryCache(key, entry.data, entry.ttl);
            this.stats.hits++;
            return entry.data;
          } else {
            // Remove expired entry
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        console.warn('Cache localStorage read error:', error);
      }
    }

    this.stats.misses++;
    return null;
  }

  /**
   * Set item in cache (both memory and localStorage)
   */
  set<T>(key: string, data: T, ttl: number = CACHE_CONFIG.TTL.STATIC_DATA): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      hits: 0,
      size: this.calculateSize(data),
    };

    // Set in memory cache
    this.setMemoryCache(key, data, ttl);

    // Set in localStorage
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(key, JSON.stringify(entry));
        this.cleanupStorage();
      } catch (error) {
        console.warn('Cache localStorage write error:', error);
        // If localStorage is full, try to clean up and retry
        this.cleanupStorage();
        try {
          localStorage.setItem(key, JSON.stringify(entry));
        } catch (retryError) {
          console.warn('Cache localStorage retry failed:', retryError);
        }
      }
    }
  }

  /**
   * Remove item from cache
   */
  remove(key: string): void {
    this.memoryCache.delete(key);
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }

  /**
   * Clear all cache
   */
  clear(): void {
    this.memoryCache.clear();
    if (typeof window !== 'undefined') {
      // Collect all matching keys first, then remove (avoids index-shifting bug during iteration)
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && Object.values(CACHE_CONFIG.KEYS).some(prefix => key.startsWith(prefix))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
    this.stats = { hits: 0, misses: 0, size: 0, memoryUsage: 0 };
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats & { hitRate: number; keys: string[] } {
    const total = this.stats.hits + this.stats.misses;
    return {
      ...this.stats,
      hitRate: total > 0 ? (this.stats.hits / total) * 100 : 0,
      keys: Array.from(this.memoryCache.keys()),
    };
  }

  /**
   * Preload data into cache
   */
  async preload<T>(key: string, dataLoader: () => Promise<T>, ttl?: number): Promise<T> {
    const cached = this.get<T>(key);
    if (cached) {
      return cached;
    }

    try {
      const data = await dataLoader();
      this.set(key, data, ttl);
      return data;
    } catch (error) {
      console.error('Cache preload error:', error);
      throw error;
    }
  }

  /**
   * Invalidate cache entries by pattern
   */
  invalidatePattern(pattern: string): void {
    // Invalidate memory cache
    const keysToDelete: string[] = [];
    for (const key of Array.from(this.memoryCache.keys())) {
      if (key.includes(pattern)) {
        keysToDelete.push(key);
      }
    }
    keysToDelete.forEach(key => this.memoryCache.delete(key));

    // Invalidate localStorage
    if (typeof window !== 'undefined') {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.includes(pattern)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    }
  }

  /**
   * Private methods
   */
  private setMemoryCache<T>(key: string, data: T, ttl: number): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl,
      hits: 0,
      size: this.calculateSize(data),
    };

    this.memoryCache.set(key, entry);
    this.stats.size = this.memoryCache.size;
    this.stats.memoryUsage += entry.size;

    // Cleanup if memory cache is too large
    if (this.memoryCache.size > CACHE_CONFIG.LIMITS.MEMORY_CACHE_SIZE) {
      this.cleanupMemoryCache();
    }
  }

  private isValid<T>(entry: CacheEntry<T>): boolean {
    return Date.now() - entry.timestamp < entry.ttl;
  }

  private calculateSize(data: any): number {
    try {
      return JSON.stringify(data).length;
    } catch {
      return 0;
    }
  }

  private cleanupMemoryCache(): void {
    // Remove expired entries first
    const entriesToCheck = Array.from(this.memoryCache.entries());
    for (const [key, entry] of entriesToCheck) {
      if (!this.isValid(entry)) {
        this.memoryCache.delete(key);
        this.stats.memoryUsage -= entry.size;
      }
    }

    // If still too large, remove least recently used entries
    if (this.memoryCache.size > CACHE_CONFIG.LIMITS.MEMORY_CACHE_SIZE) {
      const entries = Array.from(this.memoryCache.entries())
        .sort(([, a], [, b]) => a.hits - b.hits);
      
      const toRemove = entries.slice(0, entries.length - CACHE_CONFIG.LIMITS.MEMORY_CACHE_SIZE);
      toRemove.forEach(([key, entry]) => {
        this.memoryCache.delete(key);
        this.stats.memoryUsage -= entry.size;
      });
    }

    this.stats.size = this.memoryCache.size;
  }

  private cleanupStorage(): void {
    if (typeof window === 'undefined') return;

    try {
      const keysToRemove: string[] = [];
      
      // Find expired entries
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && Object.values(CACHE_CONFIG.KEYS).some(prefix => key.startsWith(prefix))) {
          try {
            const data = localStorage.getItem(key);
            if (data) {
              const entry = JSON.parse(data);
              if (!this.isValid(entry)) {
                keysToRemove.push(key);
              }
            }
          } catch {
            keysToRemove.push(key);
          }
        }
      }

      // Remove expired entries
      keysToRemove.forEach(key => localStorage.removeItem(key));

      // If still too many entries, remove oldest
      const ourKeys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && Object.values(CACHE_CONFIG.KEYS).some(prefix => key.startsWith(prefix))) {
          ourKeys.push(key);
        }
      }

      if (ourKeys.length > CACHE_CONFIG.LIMITS.STORAGE_CACHE_SIZE) {
        const toRemove = ourKeys.slice(0, ourKeys.length - CACHE_CONFIG.LIMITS.STORAGE_CACHE_SIZE);
        toRemove.forEach(key => localStorage.removeItem(key));
      }
    } catch (error) {
      console.warn('Cache storage cleanup error:', error);
    }
  }

  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      this.cleanupMemoryCache();
      this.cleanupStorage();
    }, 5 * 60 * 1000); // Every 5 minutes
  }

  private handleStorageChange = (event: StorageEvent): void => {
    if (event.key && Object.values(CACHE_CONFIG.KEYS).some(prefix => event.key!.startsWith(prefix))) {
      // Invalidate memory cache for changed key
      this.memoryCache.delete(event.key);
    }
  };

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }

    if (typeof window !== 'undefined') {
      window.removeEventListener('storage', this.handleStorageChange);
    }
  }
}

// Singleton cache manager
export const cacheManager = new CacheManager();

// Utility functions for common caching patterns
export const cacheUtils = {
  /**
   * Cache API response with automatic key generation
   */
  cacheApiResponse: async <T>(
    endpoint: string,
    fetcher: () => Promise<T>,
    ttl: number = CACHE_CONFIG.TTL.PRODUCTS
  ): Promise<T> => {
    const key = `${CACHE_CONFIG.KEYS.PRODUCTS}${endpoint}`;
    return cacheManager.preload(key, fetcher, ttl);
  },

  /**
   * Cache genres data
   */
  cacheGenres: async <T>(fetcher: () => Promise<T>): Promise<T> => {
    return cacheManager.preload(CACHE_CONFIG.KEYS.GENRES, fetcher, CACHE_CONFIG.TTL.GENRES);
  },

  /**
   * Cache all products data
   */
  cacheAllProducts: async <T>(fetcher: () => Promise<T>): Promise<T> => {
    return cacheManager.preload(CACHE_CONFIG.KEYS.ALL_PRODUCTS, fetcher, CACHE_CONFIG.TTL.PRODUCTS);
  },

  /**
   * Invalidate product-related cache
   */
  invalidateProducts: (): void => {
    cacheManager.invalidatePattern('products');
  },

  /**
   * Invalidate genres cache
   */
  invalidateGenres: (): void => {
    cacheManager.remove(CACHE_CONFIG.KEYS.GENRES);
  },

  /**
   * Get cache statistics (includes keys, hitRate, hits, misses, size, memoryUsage)
   */
  getStats: () => cacheManager.getStats(),

  /**
   * Clear all cache
   */
  clearAll: () => cacheManager.clear(),
};

// React hook for cache statistics (for debugging)
export const useCacheStats = () => {
  if (typeof window === 'undefined') {
    return { hits: 0, misses: 0, size: 0, memoryUsage: 0, hitRate: 0 };
  }
  
  return cacheUtils.getStats();
};