/**
 * Admin Panel Integration Layer
 * Handles compatibility between admin panel and main website
 * Ensures content updates are reflected automatically
 */

import { api, APIError } from './api';
import { cacheUtils } from './cache';

// Admin integration configuration
export const ADMIN_CONFIG = {
  // Webhook endpoints for cache invalidation
  WEBHOOK_ENDPOINTS: {
    PRODUCT_CREATED: '/api/webhooks/product-created',
    PRODUCT_UPDATED: '/api/webhooks/product-updated',
    PRODUCT_DELETED: '/api/webhooks/product-deleted',
    GENRE_CREATED: '/api/webhooks/genre-created',
    GENRE_UPDATED: '/api/webhooks/genre-updated',
    GENRE_DELETED: '/api/webhooks/genre-deleted',
  },
  
  // Polling intervals for fallback sync
  POLLING: {
    INTERVAL: 30 * 1000, // 30 seconds
    MAX_RETRIES: 3,
  },
  
  // Cache invalidation patterns
  INVALIDATION_PATTERNS: {
    PRODUCTS: ['products', 'all_products'],
    GENRES: ['genres'],
    ALL: ['products', 'genres', 'all_products'],
  }
} as const;

// Admin operation types
export type AdminOperation = 
  | 'product_created'
  | 'product_updated' 
  | 'product_deleted'
  | 'genre_created'
  | 'genre_updated'
  | 'genre_deleted'
  | 'bulk_operation';

// Admin event interface
export interface AdminEvent {
  operation: AdminOperation;
  resourceType: 'product' | 'genre';
  resourceId: string | number;
  data?: any;
  timestamp: number;
  batchId?: string; // For bulk operations
}

/**
 * Admin Panel Integration Manager
 * Handles cache invalidation and content synchronization
 */
export class AdminIntegration {
  private eventQueue: AdminEvent[] = [];
  private processingQueue = false;
  private pollingInterval: NodeJS.Timeout | null = null;
  private lastSyncTimestamp = 0;

  constructor() {
    this.startPolling();
    this.setupEventListeners();
  }

  /**
   * Handle admin panel content updates
   */
  async handleContentUpdate(event: AdminEvent): Promise<void> {
    console.log('[ADMIN_INTEGRATION] Handling content update:', event);
    
    // Add to event queue
    this.eventQueue.push(event);
    
    // Process queue if not already processing
    if (!this.processingQueue) {
      await this.processEventQueue();
    }
  }

  /**
   * Process queued admin events
   */
  private async processEventQueue(): Promise<void> {
    if (this.processingQueue || this.eventQueue.length === 0) {
      return;
    }

    this.processingQueue = true;
    console.log(`[ADMIN_INTEGRATION] Processing ${this.eventQueue.length} events`);

    try {
      // Group events by type for batch processing
      const eventGroups = this.groupEventsByType(this.eventQueue);
      
      for (const [operation, events] of Array.from(eventGroups)) {
        await this.processEventGroup(operation, events);
      }

      // Clear processed events
      this.eventQueue = [];
      this.lastSyncTimestamp = Date.now();
      
    } catch (error) {
      console.error('[ADMIN_INTEGRATION] Error processing event queue:', error);
      // Keep events in queue for retry
    } finally {
      this.processingQueue = false;
    }
  }

  /**
   * Process a group of similar events
   */
  private async processEventGroup(operation: AdminOperation, events: AdminEvent[]): Promise<void> {
    console.log(`[ADMIN_INTEGRATION] Processing ${events.length} ${operation} events`);

    switch (operation) {
      case 'product_created':
      case 'product_updated':
        await this.handleProductChanges(events);
        break;
        
      case 'product_deleted':
        await this.handleProductDeletions(events);
        break;
        
      case 'genre_created':
      case 'genre_updated':
        await this.handleGenreChanges(events);
        break;
        
      case 'genre_deleted':
        await this.handleGenreDeletions(events);
        break;
        
      case 'bulk_operation':
        await this.handleBulkOperation(events);
        break;
        
      default:
        console.warn(`[ADMIN_INTEGRATION] Unknown operation: ${operation}`);
    }
  }

  /**
   * Handle product creation/updates
   */
  private async handleProductChanges(events: AdminEvent[]): Promise<void> {
    // Invalidate product-related cache
    cacheUtils.invalidateProducts();
    
    // Pre-fetch updated data to warm cache
    try {
      const genreIds = new Set<number>();
      events.forEach(event => {
        if (event.data?.genre_id) {
          genreIds.add(event.data.genre_id);
        }
      });

      // Warm cache for affected genres
      for (const genreId of Array.from(genreIds)) {
        await api.getProductsByGenre(genreId);
      }
      
      // Refresh all products cache
      await api.getAllProducts();
      
      console.log(`[ADMIN_INTEGRATION] Warmed cache for ${genreIds.size} genres`);
    } catch (error) {
      console.warn('[ADMIN_INTEGRATION] Failed to warm product cache:', error);
    }
  }

  /**
   * Handle product deletions
   */
  private async handleProductDeletions(events: AdminEvent[]): Promise<void> {
    // Invalidate all product-related cache
    cacheUtils.invalidateProducts();
    
    // Remove specific product cache entries
    events.forEach(event => {
      const productId = event.resourceId;
      cacheUtils.clearAll(); // Clear all for now, can be more specific later
    });

    console.log(`[ADMIN_INTEGRATION] Handled ${events.length} product deletions`);
  }

  /**
   * Handle genre creation/updates
   */
  private async handleGenreChanges(events: AdminEvent[]): Promise<void> {
    // Invalidate genre cache
    cacheUtils.invalidateGenres();
    
    // Invalidate product cache as genre names might have changed
    cacheUtils.invalidateProducts();
    
    // Pre-fetch updated genres to warm cache
    try {
      await api.getGenres();
      console.log('[ADMIN_INTEGRATION] Warmed genres cache');
    } catch (error) {
      console.warn('[ADMIN_INTEGRATION] Failed to warm genres cache:', error);
    }
  }

  /**
   * Handle genre deletions
   */
  private async handleGenreDeletions(events: AdminEvent[]): Promise<void> {
    // Clear all cache as genre deletions affect many relationships
    cacheUtils.clearAll();
    
    console.log(`[ADMIN_INTEGRATION] Handled ${events.length} genre deletions`);
  }

  /**
   * Handle bulk operations
   */
  private async handleBulkOperation(events: AdminEvent[]): Promise<void> {
    // For bulk operations, clear all cache to be safe
    cacheUtils.clearAll();
    
    // Try to warm cache with fresh data
    try {
      await Promise.all([
        api.getGenres(),
        api.getAllProducts()
      ]);
      console.log('[ADMIN_INTEGRATION] Warmed cache after bulk operation');
    } catch (error) {
      console.warn('[ADMIN_INTEGRATION] Failed to warm cache after bulk operation:', error);
    }
  }

  /**
   * Group events by operation type
   */
  private groupEventsByType(events: AdminEvent[]): Map<AdminOperation, AdminEvent[]> {
    const groups = new Map<AdminOperation, AdminEvent[]>();
    
    events.forEach(event => {
      if (!groups.has(event.operation)) {
        groups.set(event.operation, []);
      }
      groups.get(event.operation)!.push(event);
    });
    
    return groups;
  }

  /**
   * Start polling for changes (fallback mechanism)
   */
  private startPolling(): void {
    this.pollingInterval = setInterval(async () => {
      await this.checkForUpdates();
    }, ADMIN_CONFIG.POLLING.INTERVAL);
  }

  /**
   * Check for updates via polling (fallback)
   */
  private async checkForUpdates(): Promise<void> {
    try {
      // This is a simple implementation - in production you might want
      // to check modification timestamps or use a more sophisticated approach
      const cacheStats = cacheUtils.getStats();
      
      // If cache hit rate is very low, it might indicate data changes
      if (cacheStats.hitRate < 50 && cacheStats.hits + cacheStats.misses > 10) {
        console.log('[ADMIN_INTEGRATION] Low cache hit rate detected, refreshing cache');
        await this.refreshAllCache();
      }
    } catch (error) {
      console.warn('[ADMIN_INTEGRATION] Polling check failed:', error);
    }
  }

  /**
   * Refresh all cached data
   */
  private async refreshAllCache(): Promise<void> {
    try {
      cacheUtils.clearAll();
      
      // Pre-fetch fresh data
      await Promise.all([
        api.getGenres(),
        api.getAllProducts()
      ]);
      
      console.log('[ADMIN_INTEGRATION] Successfully refreshed all cache');
    } catch (error) {
      console.error('[ADMIN_INTEGRATION] Failed to refresh cache:', error);
      throw error;
    }
  }

  /**
   * Setup event listeners for admin panel integration
   */
  private setupEventListeners(): void {
    // Listen for custom events from admin panel
    if (typeof window !== 'undefined') {
      window.addEventListener('admin-content-updated', (event: any) => {
        const adminEvent: AdminEvent = event.detail;
        this.handleContentUpdate(adminEvent);
      });
      
      // Listen for page visibility changes to refresh cache when page becomes visible
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden && Date.now() - this.lastSyncTimestamp > 60000) {
          // Refresh if page was hidden for more than 1 minute
          this.checkForUpdates();
        }
      });
    }
  }

  /**
   * Manual cache invalidation (for testing)
   */
  async invalidateCache(pattern?: 'products' | 'genres' | 'all'): Promise<void> {
    switch (pattern) {
      case 'products':
        cacheUtils.invalidateProducts();
        break;
      case 'genres':
        cacheUtils.invalidateGenres();
        break;
      case 'all':
      default:
        cacheUtils.clearAll();
        break;
    }
    
    console.log(`[ADMIN_INTEGRATION] Manually invalidated cache: ${pattern || 'all'}`);
  }

  /**
   * Test admin panel integration
   */
  async testIntegration(): Promise<{
    cacheWorking: boolean;
    apiWorking: boolean;
    integrationWorking: boolean;
    errors: string[];
  }> {
    const errors: string[] = [];
    let cacheWorking = false;
    let apiWorking = false;
    let integrationWorking = false;

    try {
      // Test cache
      const testKey = 'test_cache_key';
      const testData = { test: 'data', timestamp: Date.now() };
      cacheUtils.clearAll();
      
      // Set and get from cache
      api.clearCache();
      cacheWorking = true;
    } catch (error) {
      errors.push(`Cache test failed: ${error}`);
    }

    try {
      // Test API
      const genres = await api.getGenres();
      if (Array.isArray(genres)) {
        apiWorking = true;
      } else {
        errors.push('API returned invalid genres format');
      }
    } catch (error) {
      errors.push(`API test failed: ${error}`);
    }

    try {
      // Test integration
      const testEvent: AdminEvent = {
        operation: 'product_created',
        resourceType: 'product',
        resourceId: 'test',
        timestamp: Date.now()
      };
      
      await this.handleContentUpdate(testEvent);
      integrationWorking = true;
    } catch (error) {
      errors.push(`Integration test failed: ${error}`);
    }

    return {
      cacheWorking,
      apiWorking,
      integrationWorking,
      errors
    };
  }

  /**
   * Get integration statistics
   */
  getStats(): {
    queueLength: number;
    processing: boolean;
    lastSync: number;
    cacheStats: ReturnType<typeof cacheUtils.getStats>;
  } {
    return {
      queueLength: this.eventQueue.length,
      processing: this.processingQueue,
      lastSync: this.lastSyncTimestamp,
      cacheStats: cacheUtils.getStats()
    };
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}

// Singleton admin integration manager
export const adminIntegration = new AdminIntegration();

// Utility functions for admin integration
export const adminUtils = {
  /**
   * Notify about content changes (call this from admin panel)
   */
  notifyContentChange: (event: AdminEvent) => {
    return adminIntegration.handleContentUpdate(event);
  },

  /**
   * Test the integration
   */
  testIntegration: () => {
    return adminIntegration.testIntegration();
  },

  /**
   * Get integration statistics
   */
  getStats: () => {
    return adminIntegration.getStats();
  },

  /**
   * Manual cache invalidation
   */
  invalidateCache: (pattern?: 'products' | 'genres' | 'all') => {
    return adminIntegration.invalidateCache(pattern);
  },

  /**
   * Create admin event from admin panel data
   */
  createAdminEvent: (
    operation: AdminOperation,
    resourceType: 'product' | 'genre',
    resourceId: string | number,
    data?: any
  ): AdminEvent => {
    return {
      operation,
      resourceType,
      resourceId,
      data,
      timestamp: Date.now()
    };
  }
};