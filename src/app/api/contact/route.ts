import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Validation schema for contact form
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  company: z.string().max(100, 'Company name must be less than 100 characters').optional(),
  service: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(500, 'Message must be less than 500 characters'),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate the request body
    const validatedData = contactSchema.parse(body);
    
    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Send confirmation email to user
    
    // For now, we'll simulate the process
    console.log('Contact form submission:', validatedData);
    
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real implementation, you would:
    // - Save the inquiry to your database
    // - Send an email to your team
    // - Send a confirmation email to the customer
    // - Integrate with CRM systems if needed
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you within 24 hours.',
      data: {
        submissionId: `CONTACT_${Date.now()}`,
        timestamp: new Date().toISOString(),
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Contact form submission error:', error);
    
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