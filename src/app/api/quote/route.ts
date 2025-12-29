import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for quick quote form
const quoteSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().email('Please enter a valid email address').optional(),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  productName: z.string().optional(),
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
    
    if (validatedData.productName) {
      quoteType = 'product';
      subject = `Quote Request for ${validatedData.productName}`;
    } else if (validatedData.categoryName) {
      quoteType = 'category';
      subject = `Quote Request for ${validatedData.categoryName}`;
    } else if (validatedData.serviceName) {
      quoteType = 'service';
      subject = `Quote Request for ${validatedData.serviceName}`;
    }
    
    // Here you would typically:
    // 1. Save to database with high priority flag
    // 2. Send immediate notification to sales team
    // 3. Send SMS confirmation to customer
    // 4. Schedule follow-up call
    
    console.log('Quick quote submission:', validatedData);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // In a real implementation, you would:
    // - Save with priority flag for quick response
    // - Send immediate SMS/WhatsApp confirmation
    // - Notify sales team via multiple channels
    // - Set up automated follow-up sequence
    // - Track response time metrics
    
    const submissionId = `QUOTE_${Date.now()}`;
    
    // Determine response time based on urgency
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
          'Email with detailed proposal'
        ]
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Quick quote submission error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Please check your input and try again.',
        errors: error.errors.map(err => ({
          field: err.path.join('.'),
          message: err.message
        }))
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again later.'
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