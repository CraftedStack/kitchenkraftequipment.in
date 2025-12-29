/**
 * Admin Panel Webhook Handler
 * Receives notifications from admin panel about content updates
 * Handles cache invalidation and content synchronization
 */

import { NextRequest, NextResponse } from 'next/server';
import { adminIntegration, AdminEvent } from '@/lib/admin-integration';

// Webhook security (in production, use proper authentication)
const WEBHOOK_SECRET = process.env.ADMIN_WEBHOOK_SECRET || 'dev-secret-key';

/**
 * Handle POST requests from admin panel
 */
export async function POST(request: NextRequest) {
  try {
    // Verify webhook secret
    const authHeader = request.headers.get('authorization');
    const providedSecret = authHeader?.replace('Bearer ', '');
    
    if (providedSecret !== WEBHOOK_SECRET) {
      console.warn('[WEBHOOK] Unauthorized webhook request');
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    console.log('[WEBHOOK] Received admin update:', body);

    // Validate request body
    if (!body.operation || !body.resourceType || !body.resourceId) {
      return NextResponse.json(
        { error: 'Invalid webhook payload' },
        { status: 400 }
      );
    }

    // Create admin event
    const adminEvent: AdminEvent = {
      operation: body.operation,
      resourceType: body.resourceType,
      resourceId: body.resourceId,
      data: body.data,
      timestamp: Date.now(),
      batchId: body.batchId
    };

    // Handle the content update
    await adminIntegration.handleContentUpdate(adminEvent);

    console.log('[WEBHOOK] Successfully processed admin update');
    
    return NextResponse.json({
      success: true,
      message: 'Content update processed',
      timestamp: Date.now()
    });

  } catch (error) {
    console.error('[WEBHOOK] Error processing admin update:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

/**
 * Handle GET requests for webhook status
 */
export async function GET() {
  try {
    const stats = adminIntegration.getStats();
    
    return NextResponse.json({
      status: 'active',
      webhook: 'admin-update',
      stats,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('[WEBHOOK] Error getting webhook status:', error);
    
    return NextResponse.json(
      { error: 'Failed to get webhook status' },
      { status: 500 }
    );
  }
}

/**
 * Handle OPTIONS requests for CORS
 */
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}