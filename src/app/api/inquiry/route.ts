import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for product inquiry form
const inquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  productName: z.string().min(1, 'Product name is required').max(100, 'Product name must be less than 100 characters'),
  productId: z.number().optional(),
  categoryName: z.string().optional(),
  quantity: z.number().min(1, 'Quantity must be at least 1').optional().default(1),
  message: z.string().max(500, 'Message must be less than 500 characters').optional(),
  inquiryType: z.enum(['product', 'service', 'quote']).default('product'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = inquirySchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification to sales team
    // 3. Send confirmation email to customer
    // 4. Create lead in CRM system
    
    // For now, we'll simulate the process
    console.log('Product inquiry submission:', validatedData);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // In a real implementation, you would:
    // - Save the inquiry to your database with proper categorization
    // - Send detailed email to sales team with product information
    // - Send personalized confirmation email to customer
    // - Set up follow-up reminders
    // - Track inquiry source and conversion
    
    const submissionId = `INQ_${validatedData.inquiryType.toUpperCase()}_${Date.now()}`;
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your inquiry. Our team will contact you within 2 hours with detailed information.',
      data: {
        submissionId,
        timestamp: new Date().toISOString(),
        productName: validatedData.productName,
        estimatedResponseTime: '2 hours',
        nextSteps: [
          'Our sales team will review your inquiry',
          'We will prepare a detailed quotation',
          'You will receive a call within 2 hours',
          'We will schedule a consultation if needed'
        ]
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Product inquiry submission error:', error);
    
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