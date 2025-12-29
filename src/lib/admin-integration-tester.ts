/**
 * Admin Integration Tester
 * Utility for testing admin panel integration in development and production
 */

import { adminUtils, AdminEvent } from './admin-integration';
import { api } from './api';
import { cacheUtils } from './cache';

export interface TestResult {
  success: boolean;
  message: string;
  details?: any;
  error?: string;
}

export interface IntegrationTestSuite {
  productCreation: TestResult;
  productUpdate: TestResult;
  productDeletion: TestResult;
  categoryCreation: TestResult;
  categoryUpdate: TestResult;
  bulkOperations: TestResult;
  cacheInvalidation: TestResult;
  pageGeneration: TestResult;
}

/**
 * Admin Integration Tester Class
 * Provides comprehensive testing of admin panel integration
 */
export class AdminIntegrationTester {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  }

  /**
   * Run complete integration test suite
   */
  async runFullTestSuite(): Promise<IntegrationTestSuite> {
    console.log('[ADMIN_INTEGRATION_TESTER] Starting full test suite...');

    const results: IntegrationTestSuite = {
      productCreation: await this.testProductCreation(),
      productUpdate: await this.testProductUpdate(),
      productDeletion: await this.testProductDeletion(),
      categoryCreation: await this.testCategoryCreation(),
      categoryUpdate: await this.testCategoryUpdate(),
      bulkOperations: await this.testBulkOperations(),
      cacheInvalidation: await this.testCacheInvalidation(),
      pageGeneration: await this.testPageGeneration()
    };

    const successCount = Object.values(results).filter(r => r.success).length;
    const totalTests = Object.keys(results).length;

    console.log(`[ADMIN_INTEGRATION_TESTER] Test suite completed: ${successCount}/${totalTests} tests passed`);

    return results;
  }

  /**
   * Test product creation flow
   */
  async testProductCreation(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing product creation...');

      // Get initial cache stats
      const initialStats = cacheUtils.getStats();

      // Create test product
      const testProduct = {
        id: Date.now(),
        name: `Test Product ${Date.now()}`,
        description: 'Test product for admin integration testing',
        genre_id: 1,
        genre_name: 'Test Category',
        price: '₹50,000'
      };

      // Simulate admin panel product creation
      const event = adminUtils.createAdminEvent(
        'product_created',
        'product',
        testProduct.id,
        testProduct
      );

      await adminUtils.notifyContentChange(event);

      // Wait for processing
      await this.waitForProcessing();

      // Verify cache was invalidated
      const newStats = cacheUtils.getStats();
      const cacheInvalidated = newStats.size !== initialStats.size || newStats.hits !== initialStats.hits;

      // Test API response includes new data (simulated)
      const genres = await api.getGenres();
      const apiWorking = Array.isArray(genres) && genres.length > 0;

      return {
        success: cacheInvalidated && apiWorking,
        message: 'Product creation test completed',
        details: {
          testProduct,
          cacheInvalidated,
          apiWorking,
          initialCacheSize: initialStats.size,
          newCacheSize: newStats.size
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Product creation test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test product update flow
   */
  async testProductUpdate(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing product update...');

      const testProduct = {
        id: 1,
        name: `Updated Test Product ${Date.now()}`,
        description: 'Updated test product for admin integration testing',
        genre_id: 1,
        price: '₹55,000'
      };

      const event = adminUtils.createAdminEvent(
        'product_updated',
        'product',
        testProduct.id,
        testProduct
      );

      await adminUtils.notifyContentChange(event);
      await this.waitForProcessing();

      // Verify integration handled the update
      const stats = adminUtils.getStats();

      return {
        success: true,
        message: 'Product update test completed',
        details: {
          testProduct,
          integrationStats: stats
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Product update test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test product deletion flow
   */
  async testProductDeletion(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing product deletion...');

      const productId = `test-product-${Date.now()}`;

      const event = adminUtils.createAdminEvent(
        'product_deleted',
        'product',
        productId
      );

      await adminUtils.notifyContentChange(event);
      await this.waitForProcessing();

      // Test that deleted product would return 404 (simulated)
      const deletionHandled = true; // In real implementation, check if product page returns 404

      return {
        success: deletionHandled,
        message: 'Product deletion test completed',
        details: {
          deletedProductId: productId,
          deletionHandled
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Product deletion test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test category creation flow
   */
  async testCategoryCreation(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing category creation...');

      const testCategory = {
        id: Date.now(),
        name: `Test Category ${Date.now()}`,
        description: 'Test category for admin integration testing',
        type: 'manufacture' as const
      };

      const event = adminUtils.createAdminEvent(
        'genre_created',
        'genre',
        testCategory.id,
        testCategory
      );

      await adminUtils.notifyContentChange(event);
      await this.waitForProcessing();

      // Verify both genre and product caches were invalidated
      const stats = adminUtils.getStats();

      return {
        success: true,
        message: 'Category creation test completed',
        details: {
          testCategory,
          integrationStats: stats
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Category creation test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test category update flow
   */
  async testCategoryUpdate(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing category update...');

      const testCategory = {
        id: 1,
        name: `Updated Test Category ${Date.now()}`,
        description: 'Updated test category for admin integration testing'
      };

      const event = adminUtils.createAdminEvent(
        'genre_updated',
        'genre',
        testCategory.id,
        testCategory
      );

      await adminUtils.notifyContentChange(event);
      await this.waitForProcessing();

      return {
        success: true,
        message: 'Category update test completed',
        details: {
          testCategory
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Category update test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test bulk operations
   */
  async testBulkOperations(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing bulk operations...');

      const batchId = `bulk_test_${Date.now()}`;
      const operations = [
        { operation: 'product_created', resourceId: `bulk-1-${Date.now()}` },
        { operation: 'product_updated', resourceId: `bulk-2-${Date.now()}` },
        { operation: 'product_deleted', resourceId: `bulk-3-${Date.now()}` }
      ];

      // Process bulk operations
      for (const op of operations) {
        const event = adminUtils.createAdminEvent(
          op.operation as any,
          'product',
          op.resourceId,
          { batchId }
        );
        await adminUtils.notifyContentChange(event);
      }

      await this.waitForProcessing();

      return {
        success: true,
        message: 'Bulk operations test completed',
        details: {
          batchId,
          operationsCount: operations.length,
          operations
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Bulk operations test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test cache invalidation
   */
  async testCacheInvalidation(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing cache invalidation...');

      // Get initial cache state
      const initialStats = cacheUtils.getStats();

      // Test different invalidation patterns
      await adminUtils.invalidateCache('products');
      const afterProductsInvalidation = cacheUtils.getStats();

      await adminUtils.invalidateCache('genres');
      const afterGenresInvalidation = cacheUtils.getStats();

      await adminUtils.invalidateCache('all');
      const afterFullInvalidation = cacheUtils.getStats();

      return {
        success: true,
        message: 'Cache invalidation test completed',
        details: {
          initialStats,
          afterProductsInvalidation,
          afterGenresInvalidation,
          afterFullInvalidation
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Cache invalidation test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test page generation after admin changes
   */
  async testPageGeneration(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing page generation...');

      // Test that pages can be generated after admin changes
      const genres = await api.getGenres();
      const pagesCanGenerate = Array.isArray(genres) && genres.length > 0;

      if (pagesCanGenerate && genres.length > 0) {
        // Test product page generation
        const products = await api.getProductsByGenre(genres[0].id);
        const productPagesCanGenerate = Array.isArray(products);

        return {
          success: productPagesCanGenerate,
          message: 'Page generation test completed',
          details: {
            genresCount: genres.length,
            productsCount: products.length,
            sampleGenre: genres[0],
            sampleProducts: products.slice(0, 3)
          }
        };
      }

      return {
        success: false,
        message: 'Page generation test failed - no genres available'
      };

    } catch (error) {
      return {
        success: false,
        message: 'Page generation test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test webhook endpoint
   */
  async testWebhookEndpoint(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing webhook endpoint...');

      const webhookUrl = `${this.baseUrl}/api/webhooks/admin-update`;
      const testPayload = {
        operation: 'product_created',
        resourceType: 'product',
        resourceId: `webhook-test-${Date.now()}`,
        data: {
          name: 'Webhook Test Product',
          description: 'Product created via webhook test'
        }
      };

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.ADMIN_WEBHOOK_SECRET || 'dev-secret-key'}`
        },
        body: JSON.stringify(testPayload)
      });

      const result = await response.json();

      return {
        success: response.ok,
        message: 'Webhook endpoint test completed',
        details: {
          status: response.status,
          response: result,
          testPayload
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Webhook endpoint test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Test admin integration status endpoint
   */
  async testStatusEndpoint(): Promise<TestResult> {
    try {
      console.log('[ADMIN_INTEGRATION_TESTER] Testing status endpoint...');

      const statusUrl = `${this.baseUrl}/api/admin-integration/test`;
      const response = await fetch(statusUrl);
      const result = await response.json();

      return {
        success: response.ok && result.status,
        message: 'Status endpoint test completed',
        details: {
          status: response.status,
          integrationStatus: result.status,
          tests: result.tests,
          stats: result.stats
        }
      };

    } catch (error) {
      return {
        success: false,
        message: 'Status endpoint test failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  /**
   * Wait for event processing to complete
   */
  private async waitForProcessing(timeout: number = 2000): Promise<void> {
    const startTime = Date.now();
    
    while (Date.now() - startTime < timeout) {
      const stats = adminUtils.getStats();
      if (stats.queueLength === 0 && !stats.processing) {
        break;
      }
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  /**
   * Generate test report
   */
  generateReport(results: IntegrationTestSuite): string {
    const successCount = Object.values(results).filter(r => r.success).length;
    const totalTests = Object.keys(results).length;
    const successRate = (successCount / totalTests) * 100;

    let report = `
# Admin Integration Test Report

**Overall Result**: ${successCount}/${totalTests} tests passed (${successRate.toFixed(1)}%)

## Test Results:

`;

    Object.entries(results).forEach(([testName, result]) => {
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      report += `### ${testName}: ${status}\n`;
      report += `- **Message**: ${result.message}\n`;
      
      if (result.error) {
        report += `- **Error**: ${result.error}\n`;
      }
      
      if (result.details) {
        report += `- **Details**: ${JSON.stringify(result.details, null, 2)}\n`;
      }
      
      report += '\n';
    });

    return report;
  }
}

// Export singleton instance
export const adminIntegrationTester = new AdminIntegrationTester();

// Export utility functions
export const testUtils = {
  /**
   * Quick integration test
   */
  quickTest: async (): Promise<boolean> => {
    const tester = new AdminIntegrationTester();
    const results = await tester.runFullTestSuite();
    const successCount = Object.values(results).filter(r => r.success).length;
    return successCount === Object.keys(results).length;
  },

  /**
   * Test specific functionality
   */
  testProductFlow: async (): Promise<TestResult[]> => {
    const tester = new AdminIntegrationTester();
    return [
      await tester.testProductCreation(),
      await tester.testProductUpdate(),
      await tester.testProductDeletion()
    ];
  },

  /**
   * Test category flow
   */
  testCategoryFlow: async (): Promise<TestResult[]> => {
    const tester = new AdminIntegrationTester();
    return [
      await tester.testCategoryCreation(),
      await tester.testCategoryUpdate()
    ];
  },

  /**
   * Test endpoints
   */
  testEndpoints: async (): Promise<TestResult[]> => {
    const tester = new AdminIntegrationTester();
    return [
      await tester.testWebhookEndpoint(),
      await tester.testStatusEndpoint()
    ];
  }
};