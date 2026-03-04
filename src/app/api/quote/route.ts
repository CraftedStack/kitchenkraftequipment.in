import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

// Validation schema for quick quote form
const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email address').optional(),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  productName: z.string().optional(),
  productNames: z.array(z.string()).optional(), // multi-product selection
  categoryName: z.string().optional(),
  serviceName: z.string().optional(),
  urgency: z.enum(['immediate', 'within_week', 'within_month', 'planning']).default('within_week'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validatedData = quoteSchema.parse(body);

    // Determine quote type based on provided information
    let quoteType = 'general';
    let subject = 'General Quote Request';

    // Resolve the effective product label (multi takes precedence over single)
    const effectiveProductName =
      validatedData.productNames && validatedData.productNames.length > 0
        ? validatedData.productNames.join(', ')
        : validatedData.productName || null;

    if (effectiveProductName) {
      quoteType = 'product';
      subject = `Quote Request for ${effectiveProductName}`;
    } else if (validatedData.categoryName) {
      quoteType = 'category';
      subject = `Quote Request for ${validatedData.categoryName}`;
    } else if (validatedData.serviceName) {
      quoteType = 'service';
      subject = `Quote Request for ${validatedData.serviceName}`;
    }

    const productService =
      effectiveProductName ||
      validatedData.categoryName ||
      validatedData.serviceName ||
      null;

    // Forward submission to backend for persistent storage
    try {
      await fetch(`${BACKEND_URL}/api/quotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submission_type: 'quote',
          customer_name: validatedData.name,
          email: validatedData.email || '',
          phone: validatedData.phone,
          product_service: productService,
          message: validatedData.message || null,
          metadata: {
            quoteType,
            subject,
            urgency: validatedData.urgency,
            categoryName: validatedData.categoryName || null,
            serviceName: validatedData.serviceName || null,
            productNames: validatedData.productNames || null,
          },
        }),
      });
    } catch (forwardErr) {
      console.error('[quote] Failed to forward to backend:', forwardErr);
    }

    const submissionId = `QUOTE_${Date.now()}`;
    const responseTime = validatedData.urgency === 'immediate' ? '30 minutes' : '2 hours';

    return NextResponse.json({
      success: true,
      message: `Thank you! We will contact you within ${responseTime} with your quote.`,
      data: {
        submissionId,
        timestamp: new Date().toISOString(),
        quoteType,
        subject,
        urgency: validatedData.urgency,
        estimatedResponseTime: responseTime,
        contactMethods: [
          'Phone call from our sales team',
          'WhatsApp message with quote details',
          'Email with detailed proposal',
        ],
      },
    }, { status: 200 });

  } catch (error) {
    console.error('Quick quote submission error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please check your input and try again.',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message,
        })),
      }, { status: 400 });
    }

    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again later.',
    }, { status: 500 });
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
