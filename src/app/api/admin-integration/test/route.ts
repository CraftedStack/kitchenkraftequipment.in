/**
 * Admin Integration Test Endpoint
 * Provides testing and monitoring capabilities for admin panel integration
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminIntegration, adminUtils, AdminEvent } from '@/lib/admin-integration';
import { api } from '@/lib/api';
import { cacheUtils } from '@/lib/cache';

/**
 * GET - Test admin integration status
 */
export async function GET() {
  try {
    console.log('[ADMIN_INTEGRATION_TEST] Running integration tests...');
    
    // Run comprehensive integration test
    const testResult = await adminIntegration.testIntegration();
    const stats = adminIntegration.getStats();
    
    // Additional API endpoint tests
    let apiEndpointsWorking = false;
    let cacheInvalidationWorking = false;
    
    try {
      // Test API endpoints
      const genres = await api.getGenres();
      const products = genres.length > 0 ? await api.getProductsByGenre(genres[0].id) : [];
      apiEndpointsWorking = Array.isArray(genres) && Array.isArray(products);
    } catch (error) {
      testResult.errors.push(`API endpoints test failed: ${error}`);
    }
    
    try {
      // Test cache invalidation
      const initialStats = cacheUtils.getStats();
      cacheUtils.clearAll();
      const clearedStats = cacheUtils.getStats();
      cacheInvalidationWorking = clearedStats.size === 0;
    } catch (error) {
      testResult.errors.push(`Cache invalidation test failed: ${error}`);
    }
    
    // Determine overall status
    const allTestsPassed = testResult.cacheWorking && 
                          testResult.apiWorking && 
                          testResult.integrationWorking && 
                          apiEndpointsWorking && 
                          cacheInvalidationWorking;
    
    const someTestsPassed = testResult.cacheWorking || 
                           testResult.apiWorking || 
                           testResult.integrationWorking || 
                           apiEndpointsWorking || 
                           cacheInvalidationWorking;
    
    const status = allTestsPassed ? 'success' : 
                   someTestsPassed ? 'partial_failure' : 'error';
    
    // Generate recommendations
    const recommendations: string[] = [];
    if (!testResult.cacheWorking) {
      recommendations.push('Check cache system configuration');
    }
    if (!testResult.apiWorking) {
      recommendations.push('Verify backend API is running and accessible');
    }
    if (!testResult.integrationWorking) {
      recommendations.push('Check admin integration event handling');
    }
    if (!apiEndpointsWorking) {
      recommendations.push('Verify API endpoints are responding correctly');
    }
    if (!cacheInvalidationWorking) {
      recommendations.push('Check cache invalidation mechanisms');
    }
    if (stats.queueLength > 10) {
      recommendations.push('High queue length detected - check processing performance');
    }
    if (stats.cacheStats.hitRate < 50) {
      recommendations.push('Low cache hit rate - consider cache warming strategies');
    }
    
    const response = {
      status,
      timestamp: Date.now(),
      tests: {
        cacheWorking: testResult.cacheWorking,
        apiWorking: testResult.apiWorking,
        integrationWorking: testResult.integrationWorking,
        apiEndpointsWorking,
        cacheInvalidationWorking
      },
      stats,
      errors: testResult.errors,
      recommendations
    };
    
    console.log('[ADMIN_INTEGRATION_TEST] Test completed:', { status, errorCount: testResult.errors.length });
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('[ADMIN_INTEGRATION_TEST] Test failed:', error);
    
    return NextResponse.json({
      status: 'error',
      timestamp: Date.now(),
      tests: {
        cacheWorking: false,
        apiWorking: false,
        integrationWorking: false,
        apiEndpointsWorking: false,
        cacheInvalidationWorking: false
      },
      stats: {
        queueLength: 0,
        processing: false,
        lastSync: 0,
        cacheStats: {
          hits: 0,
          misses: 0,
          size: 0,
          memoryUsage: 0,
          hitRate: 0
        }
      },
      errors: [`Test execution failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      recommendations: ['Check system logs for detailed error information']
    }, { status: 500 });
  }
}

/**
 * PUT - Handle admin integration actions
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[ADMIN_INTEGRATION_TEST] Received action:', body);
    
    switch (body.action) {
      case 'invalidate_cache':
        await adminUtils.invalidateCache(body.pattern);
        return NextResponse.json({
          success: true,
          message: `Cache invalidated: ${body.pattern || 'all'}`,
          timestamp: Date.now()
        });
        
      case 'test_product_creation':
        return await handleTestProductCreation(body);
        
      case 'test_product_update':
        return await handleTestProductUpdate(body);
        
      case 'test_product_deletion':
        return await handleTestProductDeletion(body);
        
      case 'test_bulk_operation':
        return await handleTestBulkOperation(body);
        
      default:
        return NextResponse.json(
          { error: `Unknown action: ${body.action}` },
          { status: 400 }
        );
    }
    
  } catch (error) {
    console.error('[ADMIN_INTEGRATION_TEST] Action failed:', error);
    
    return NextResponse.json({
      error: 'Action failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * POST - Simulate admin panel events for testing
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('[ADMIN_INTEGRATION_TEST] Simulating admin event:', body);
    
    // Create admin event
    const adminEvent: AdminEvent = {
      operation: body.operation || 'product_updated',
      resourceType: body.resourceType || 'product',
      resourceId: body.resourceId || 'test-product',
      data: body.data,
      timestamp: Date.now(),
      batchId: body.batchId
    };
    
    // Handle the event
    await adminIntegration.handleContentUpdate(adminEvent);
    
    return NextResponse.json({
      success: true,
      message: 'Admin event processed',
      event: adminEvent,
      timestamp: Date.now()
    });
    
  } catch (error) {
    console.error('[ADMIN_INTEGRATION_TEST] Event simulation failed:', error);
    
    return NextResponse.json({
      error: 'Event simulation failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

/**
 * Test product creation simulation
 */
async function handleTestProductCreation(body: any) {
  const testProduct = {
    id: Date.now(),
    name: body.productName || 'Test Product',
    description: 'Test product for admin integration',
    genre_id: body.genreId || 1,
    genre_name: body.genreName || 'Test Category'
  };
  
  const adminEvent = adminUtils.createAdminEvent(
    'product_created',
    'product',
    testProduct.id,
    testProduct
  );
  
  await adminUtils.notifyContentChange(adminEvent);
  
  return NextResponse.json({
    success: true,
    message: 'Product creation test completed',
    testProduct,
    event: adminEvent
  });
}

/**
 * Test product update simulation
 */
async function handleTestProductUpdate(body: any) {
  const testProduct = {
    id: body.productId || 1,
    name: body.productName || 'Updated Test Product',
    description: 'Updated test product for admin integration',
    genre_id: body.genreId || 1,
    genre_name: body.genreName || 'Test Category'
  };
  
  const adminEvent = adminUtils.createAdminEvent(
    'product_updated',
    'product',
    testProduct.id,
    testProduct
  );
  
  await adminUtils.notifyContentChange(adminEvent);
  
  return NextResponse.json({
    success: true,
    message: 'Product update test completed',
    testProduct,
    event: adminEvent
  });
}

/**
 * Test product deletion simulation
 */
async function handleTestProductDeletion(body: any) {
  const productId = body.productId || 'test-product-deleted';
  
  const adminEvent = adminUtils.createAdminEvent(
    'product_deleted',
    'product',
    productId
  );
  
  await adminUtils.notifyContentChange(adminEvent);
  
  return NextResponse.json({
    success: true,
    message: 'Product deletion test completed',
    productId,
    event: adminEvent
  });
}

/**
 * Test bulk operation simulation
 */
async function handleTestBulkOperation(body: any) {
  const batchId = `batch_${Date.now()}`;
  const operations = body.operations || [
    { operation: 'product_created', resourceId: 'bulk-1' },
    { operation: 'product_updated', resourceId: 'bulk-2' },
    { operation: 'product_deleted', resourceId: 'bulk-3' }
  ];
  
  const events = operations.map((op: any) => 
    adminUtils.createAdminEvent(
      op.operation,
      'product',
      op.resourceId,
      { batchId }
    )
  );
  
  // Process all events
  for (const event of events) {
    await adminUtils.notifyContentChange(event);
  }
  
  return NextResponse.json({
    success: true,
    message: 'Bulk operation test completed',
    batchId,
    eventsProcessed: events.length,
    events
  });
}

/**
 * OPTIONS - CORS support
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}