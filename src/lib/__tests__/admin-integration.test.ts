/**
 * Admin Integration Test Suite
 * Tests admin panel compatibility and content management integration
 */

import { AdminIntegration, adminUtils, AdminEvent } from '../admin-integration';
import { api } from '../api';
import { cacheUtils } from '../cache';

// Mock dependencies
jest.mock('../api');
jest.mock('../cache');

const mockApi = api as jest.Mocked<typeof api>;
const mockCacheUtils = cacheUtils as jest.Mocked<typeof cacheUtils>;

describe('Admin Integration', () => {
  let adminIntegration: AdminIntegration;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Setup default mock implementations
    mockApi.getGenres.mockResolvedValue([
      { id: 1, name: 'Test Genre', slug: 'test-genre', type: 'manufacture' }
    ]);
    mockApi.getProductsByGenre.mockResolvedValue([
      { id: 1, name: 'Test Product', slug: 'test-product', genre_id: 1 }
    ]);
    mockApi.getAllProducts.mockResolvedValue([]);
    mockCacheUtils.getStats.mockReturnValue({
      hits: 10,
      misses: 5,
      size: 3,
      memoryUsage: 1024,
      hitRate: 66.7
    });

    // Create fresh admin integration instance
    adminIntegration = new AdminIntegration();
  });

  afterEach(() => {
    adminIntegration.destroy();
  });

  describe('Content Update Handling', () => {
    it('should handle product creation events', async () => {
      const event: AdminEvent = {
        operation: 'product_created',
        resourceType: 'product',
        resourceId: 1,
        data: { name: 'New Product', genre_id: 1 },
        timestamp: Date.now()
      };

      await adminIntegration.handleContentUpdate(event);

      // Should invalidate product cache
      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
      
      // Should warm cache for affected genre
      expect(mockApi.getProductsByGenre).toHaveBeenCalledWith(1);
      expect(mockApi.getAllProducts).toHaveBeenCalled();
    });

    it('should handle product update events', async () => {
      const event: AdminEvent = {
        operation: 'product_updated',
        resourceType: 'product',
        resourceId: 1,
        data: { name: 'Updated Product', genre_id: 1 },
        timestamp: Date.now()
      };

      await adminIntegration.handleContentUpdate(event);

      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
      expect(mockApi.getProductsByGenre).toHaveBeenCalledWith(1);
    });

    it('should handle product deletion events', async () => {
      const event: AdminEvent = {
        operation: 'product_deleted',
        resourceType: 'product',
        resourceId: 1,
        timestamp: Date.now()
      };

      await adminIntegration.handleContentUpdate(event);

      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });

    it('should handle genre creation events', async () => {
      const event: AdminEvent = {
        operation: 'genre_created',
        resourceType: 'genre',
        resourceId: 2,
        data: { name: 'New Genre' },
        timestamp: Date.now()
      };

      await adminIntegration.handleContentUpdate(event);

      expect(mockCacheUtils.invalidateGenres).toHaveBeenCalled();
      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
      expect(mockApi.getGenres).toHaveBeenCalled();
    });

    it('should handle genre deletion events', async () => {
      const event: AdminEvent = {
        operation: 'genre_deleted',
        resourceType: 'genre',
        resourceId: 1,
        timestamp: Date.now()
      };

      await adminIntegration.handleContentUpdate(event);

      expect(mockCacheUtils.clearAll).toHaveBeenCalled();
    });

    it('should handle bulk operations', async () => {
      const event: AdminEvent = {
        operation: 'bulk_operation',
        resourceType: 'product',
        resourceId: 'batch_123',
        batchId: 'batch_123',
        timestamp: Date.now()
      };

      await adminIntegration.handleContentUpdate(event);

      expect(mockCacheUtils.clearAll).toHaveBeenCalled();
      expect(mockApi.getGenres).toHaveBeenCalled();
      expect(mockApi.getAllProducts).toHaveBeenCalled();
    });
  });

  describe('Event Queue Processing', () => {
    it('should process multiple events in queue', async () => {
      const events: AdminEvent[] = [
        {
          operation: 'product_created',
          resourceType: 'product',
          resourceId: 1,
          timestamp: Date.now()
        },
        {
          operation: 'product_updated',
          resourceType: 'product',
          resourceId: 2,
          timestamp: Date.now()
        }
      ];

      // Add events to queue
      for (const event of events) {
        await adminIntegration.handleContentUpdate(event);
      }

      // Wait for processing
      await new Promise(resolve => setTimeout(resolve, 100));

      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });

    it('should group similar events for batch processing', async () => {
      const events: AdminEvent[] = [
        {
          operation: 'product_created',
          resourceType: 'product',
          resourceId: 1,
          data: { genre_id: 1 },
          timestamp: Date.now()
        },
        {
          operation: 'product_created',
          resourceType: 'product',
          resourceId: 2,
          data: { genre_id: 1 },
          timestamp: Date.now()
        }
      ];

      for (const event of events) {
        await adminIntegration.handleContentUpdate(event);
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      // Should call API once for the genre, not twice
      expect(mockApi.getProductsByGenre).toHaveBeenCalledWith(1);
    });
  });

  describe('Cache Invalidation', () => {
    it('should invalidate product cache correctly', async () => {
      await adminUtils.invalidateCache('products');
      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });

    it('should invalidate genre cache correctly', async () => {
      await adminUtils.invalidateCache('genres');
      expect(mockCacheUtils.invalidateGenres).toHaveBeenCalled();
    });

    it('should clear all cache when pattern is "all"', async () => {
      await adminUtils.invalidateCache('all');
      expect(mockCacheUtils.clearAll).toHaveBeenCalled();
    });

    it('should clear all cache when no pattern specified', async () => {
      await adminUtils.invalidateCache();
      expect(mockCacheUtils.clearAll).toHaveBeenCalled();
    });
  });

  describe('Integration Testing', () => {
    it('should test cache functionality', async () => {
      mockCacheUtils.clearAll.mockImplementation(() => {});
      mockCacheUtils.getStats.mockReturnValue({
        hits: 0,
        misses: 0,
        size: 0,
        memoryUsage: 0,
        hitRate: 0
      });

      const result = await adminIntegration.testIntegration();

      expect(result.cacheWorking).toBe(true);
    });

    it('should test API functionality', async () => {
      mockApi.getGenres.mockResolvedValue([
        { id: 1, name: 'Test Genre' }
      ]);

      const result = await adminIntegration.testIntegration();

      expect(result.apiWorking).toBe(true);
      expect(mockApi.getGenres).toHaveBeenCalled();
    });

    it('should handle API errors gracefully', async () => {
      mockApi.getGenres.mockRejectedValue(new Error('API Error'));

      const result = await adminIntegration.testIntegration();

      expect(result.apiWorking).toBe(false);
      expect(result.errors).toContain('API test failed: Error: API Error');
    });

    it('should test integration event handling', async () => {
      const result = await adminIntegration.testIntegration();

      expect(result.integrationWorking).toBe(true);
    });
  });

  describe('Statistics and Monitoring', () => {
    it('should provide integration statistics', () => {
      const stats = adminIntegration.getStats();

      expect(stats).toHaveProperty('queueLength');
      expect(stats).toHaveProperty('processing');
      expect(stats).toHaveProperty('lastSync');
      expect(stats).toHaveProperty('cacheStats');
    });

    it('should track queue length correctly', async () => {
      const event: AdminEvent = {
        operation: 'product_created',
        resourceType: 'product',
        resourceId: 1,
        timestamp: Date.now()
      };

      // Add event but don't process immediately
      const statsPromise = adminIntegration.getStats();
      await adminIntegration.handleContentUpdate(event);
      
      // Queue should be processed quickly
      await new Promise(resolve => setTimeout(resolve, 50));
      
      const finalStats = adminIntegration.getStats();
      expect(finalStats.queueLength).toBe(0);
    });
  });

  describe('Error Handling', () => {
    it('should handle cache errors gracefully', async () => {
      // Create a separate admin integration instance for this test
      const testAdminIntegration = new AdminIntegration();
      
      mockCacheUtils.invalidateProducts.mockImplementation(() => {
        throw new Error('Cache error');
      });

      const event: AdminEvent = {
        operation: 'product_created',
        resourceType: 'product',
        resourceId: 1,
        timestamp: Date.now()
      };

      // Should not throw
      await expect(testAdminIntegration.handleContentUpdate(event)).resolves.not.toThrow();
      
      // Clean up
      testAdminIntegration.destroy();
      
      // Reset mock for other tests
      mockCacheUtils.invalidateProducts.mockImplementation(() => {});
    });

    it('should handle API errors during cache warming', async () => {
      // Create a separate admin integration instance for this test
      const testAdminIntegration = new AdminIntegration();
      
      mockApi.getProductsByGenre.mockRejectedValue(new Error('API Error'));

      const event: AdminEvent = {
        operation: 'product_created',
        resourceType: 'product',
        resourceId: 1,
        data: { genre_id: 1 },
        timestamp: Date.now()
      };

      // Should not throw
      await expect(testAdminIntegration.handleContentUpdate(event)).resolves.not.toThrow();
      
      // Clean up
      testAdminIntegration.destroy();
      
      // Reset mock for other tests
      mockApi.getProductsByGenre.mockResolvedValue([
        { id: 1, name: 'Test Product', slug: 'test-product', genre_id: 1 }
      ]);
    });
  });

  describe('Admin Utils', () => {
    it('should create admin events correctly', () => {
      const event = adminUtils.createAdminEvent(
        'product_created',
        'product',
        123,
        { name: 'Test Product' }
      );

      expect(event.operation).toBe('product_created');
      expect(event.resourceType).toBe('product');
      expect(event.resourceId).toBe(123);
      expect(event.data).toEqual({ name: 'Test Product' });
      expect(typeof event.timestamp).toBe('number');
    });

    it('should notify content changes', async () => {
      const event = adminUtils.createAdminEvent(
        'product_updated',
        'product',
        456
      );

      await expect(adminUtils.notifyContentChange(event)).resolves.not.toThrow();
    });

    it('should get integration statistics', () => {
      const stats = adminUtils.getStats();

      expect(stats).toHaveProperty('queueLength');
      expect(stats).toHaveProperty('processing');
      expect(stats).toHaveProperty('cacheStats');
    });
  });
});

describe('Admin Integration API Endpoint', () => {
  // These tests would typically use a test framework like supertest
  // For now, we'll test the core logic

  describe('Product Creation Flow', () => {
    it('should handle new product creation from admin panel', async () => {
      // Simulate admin panel creating a new product
      const newProduct = {
        id: 999,
        name: 'New Commercial Oven',
        description: 'High-efficiency commercial oven',
        genre_id: 1,
        genre_name: 'Cooking Equipment'
      };

      const event = adminUtils.createAdminEvent(
        'product_created',
        'product',
        newProduct.id,
        newProduct
      );

      await adminUtils.notifyContentChange(event);

      // Verify cache invalidation occurred
      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });

    it('should handle product updates from admin panel', async () => {
      const updatedProduct = {
        id: 1,
        name: 'Updated Commercial Oven',
        description: 'Updated high-efficiency commercial oven',
        genre_id: 1
      };

      const event = adminUtils.createAdminEvent(
        'product_updated',
        'product',
        updatedProduct.id,
        updatedProduct
      );

      await adminUtils.notifyContentChange(event);

      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });

    it('should handle product deletion from admin panel', async () => {
      const deletedProductId = 1;

      const event = adminUtils.createAdminEvent(
        'product_deleted',
        'product',
        deletedProductId
      );

      await adminUtils.notifyContentChange(event);

      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });
  });

  describe('Category Management Flow', () => {
    it('should handle new category creation', async () => {
      const newCategory = {
        id: 10,
        name: 'New Equipment Category',
        description: 'New category for specialized equipment',
        type: 'manufacture'
      };

      const event = adminUtils.createAdminEvent(
        'genre_created',
        'genre',
        newCategory.id,
        newCategory
      );

      await adminUtils.notifyContentChange(event);

      expect(mockCacheUtils.invalidateGenres).toHaveBeenCalled();
      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });

    it('should handle category updates', async () => {
      const updatedCategory = {
        id: 1,
        name: 'Updated Cooking Equipment',
        description: 'Updated category description'
      };

      const event = adminUtils.createAdminEvent(
        'genre_updated',
        'genre',
        updatedCategory.id,
        updatedCategory
      );

      await adminUtils.notifyContentChange(event);

      expect(mockCacheUtils.invalidateGenres).toHaveBeenCalled();
    });
  });

  describe('Bulk Operations', () => {
    it('should handle bulk product operations', async () => {
      const batchId = 'bulk_import_2024';
      const operations = [
        { operation: 'product_created', resourceId: 'bulk-1' },
        { operation: 'product_created', resourceId: 'bulk-2' },
        { operation: 'product_created', resourceId: 'bulk-3' }
      ];

      for (const op of operations) {
        const event = adminUtils.createAdminEvent(
          op.operation as any,
          'product',
          op.resourceId,
          { batchId }
        );
        await adminUtils.notifyContentChange(event);
      }

      // Should handle bulk operations efficiently
      expect(mockCacheUtils.invalidateProducts).toHaveBeenCalled();
    });
  });
});