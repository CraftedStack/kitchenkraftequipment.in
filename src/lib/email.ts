/**
 * Email Service Utilities
 * Handles email sending and template generation for form submissions
 */

import { COMPANY_INFO } from './constants';

// Email template interfaces
interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface ContactEmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  service?: string;
  message: string;
  submissionId: string;
}

interface InquiryEmailData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  productName: string;
  categoryName?: string;
  quantity?: number;
  message?: string;
  submissionId: string;
  inquiryType: 'product' | 'service' | 'quote';
}

// Email service class
export class EmailService {
  private static instance: EmailService;
  
  private constructor() {}
  
  static getInstance(): EmailService {
    if (!EmailService.instance) {
      EmailService.instance = new EmailService();
    }
    return EmailService.instance;
  }

  /**
   * Generate contact form confirmation email for customer
   */
  generateContactConfirmationEmail(data: ContactEmailData): EmailTemplate {
    const subject = `Thank you for contacting ${COMPANY_INFO.name}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2563eb; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9fafb; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #2563eb; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          .contact-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${COMPANY_INFO.name}</h1>
            <p>Thank you for your message!</p>
          </div>
          
          <div class="content">
            <h2>Hello ${data.name},</h2>
            
            <p>Thank you for contacting us. We have received your message and will get back to you within 24 hours.</p>
            
            <div class="contact-info">
              <h3>Your Message Details:</h3>
              <p><strong>Reference ID:</strong> ${data.submissionId}</p>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
              ${data.service ? `<p><strong>Service Interest:</strong> ${data.service}</p>` : ''}
              <p><strong>Message:</strong> ${data.message}</p>
            </div>
            
            <p>Our team will review your inquiry and respond with the information you requested.</p>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="tel:${COMPANY_INFO.contact.phone}" class="button">Call Us: ${COMPANY_INFO.contact.phone}</a>
              <a href="https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}" class="button">WhatsApp</a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>${COMPANY_INFO.name}</strong></p>
            <p>${COMPANY_INFO.contact.address.full}</p>
            <p>Phone: ${COMPANY_INFO.contact.phone} | Email: ${COMPANY_INFO.contact.email}</p>
            <p>Business Hours: ${COMPANY_INFO.contact.hours.display}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const text = `
      Thank you for contacting ${COMPANY_INFO.name}!
      
      Hello ${data.name},
      
      We have received your message and will get back to you within 24 hours.
      
      Your Message Details:
      Reference ID: ${data.submissionId}
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      ${data.company ? `Company: ${data.company}` : ''}
      ${data.service ? `Service Interest: ${data.service}` : ''}
      Message: ${data.message}
      
      Need immediate assistance?
      Call: ${COMPANY_INFO.contact.phone}
      WhatsApp: ${COMPANY_INFO.contact.whatsapp}
      
      Best regards,
      ${COMPANY_INFO.name}
      ${COMPANY_INFO.contact.address.full}
      ${COMPANY_INFO.contact.email}
    `;
    
    return { subject, html, text };
  }

  /**
   * Generate inquiry confirmation email for customer
   */
  generateInquiryConfirmationEmail(data: InquiryEmailData): EmailTemplate {
    const subject = `Your ${data.inquiryType} inquiry has been received - ${COMPANY_INFO.name}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #059669; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f0fdf4; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 14px; }
          .button { display: inline-block; background: #059669; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
          .inquiry-info { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #059669; }
          .next-steps { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${COMPANY_INFO.name}</h1>
            <p>Your inquiry has been received!</p>
          </div>
          
          <div class="content">
            <h2>Hello ${data.name},</h2>
            
            <p>Thank you for your ${data.inquiryType} inquiry. Our sales team will contact you within 2 hours with detailed information and pricing.</p>
            
            <div class="inquiry-info">
              <h3>Your Inquiry Details:</h3>
              <p><strong>Reference ID:</strong> ${data.submissionId}</p>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> ${data.email}</p>
              <p><strong>Phone:</strong> ${data.phone}</p>
              ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
              <p><strong>${data.inquiryType === 'product' ? 'Product' : 'Service'}:</strong> ${data.productName}</p>
              ${data.categoryName ? `<p><strong>Category:</strong> ${data.categoryName}</p>` : ''}
              ${data.quantity ? `<p><strong>Quantity:</strong> ${data.quantity}</p>` : ''}
              ${data.message ? `<p><strong>Message:</strong> ${data.message}</p>` : ''}
            </div>
            
            <div class="next-steps">
              <h3>What happens next?</h3>
              <ul>
                <li>Our sales team will review your inquiry</li>
                <li>We will prepare a detailed quotation</li>
                <li>You will receive a call within 2 hours</li>
                <li>We can schedule a consultation if needed</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
              <a href="tel:${COMPANY_INFO.contact.phone}" class="button">Call Us: ${COMPANY_INFO.contact.phone}</a>
              <a href="https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}" class="button">WhatsApp</a>
            </div>
          </div>
          
          <div class="footer">
            <p><strong>${COMPANY_INFO.name}</strong></p>
            <p>${COMPANY_INFO.contact.address.full}</p>
            <p>Phone: ${COMPANY_INFO.contact.phone} | Email: ${COMPANY_INFO.contact.email}</p>
            <p>Business Hours: ${COMPANY_INFO.contact.hours.display}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const text = `
      Your ${data.inquiryType} inquiry has been received - ${COMPANY_INFO.name}
      
      Hello ${data.name},
      
      Thank you for your ${data.inquiryType} inquiry. Our sales team will contact you within 2 hours with detailed information and pricing.
      
      Your Inquiry Details:
      Reference ID: ${data.submissionId}
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      ${data.company ? `Company: ${data.company}` : ''}
      ${data.inquiryType === 'product' ? 'Product' : 'Service'}: ${data.productName}
      ${data.categoryName ? `Category: ${data.categoryName}` : ''}
      ${data.quantity ? `Quantity: ${data.quantity}` : ''}
      ${data.message ? `Message: ${data.message}` : ''}
      
      What happens next?
      - Our sales team will review your inquiry
      - We will prepare a detailed quotation
      - You will receive a call within 2 hours
      - We can schedule a consultation if needed
      
      Need immediate assistance?
      Call: ${COMPANY_INFO.contact.phone}
      WhatsApp: ${COMPANY_INFO.contact.whatsapp}
      
      Best regards,
      ${COMPANY_INFO.name}
      ${COMPANY_INFO.contact.address.full}
      ${COMPANY_INFO.contact.email}
    `;
    
    return { subject, html, text };
  }

  /**
   * Generate notification email for internal team
   */
  generateInternalNotificationEmail(data: ContactEmailData | InquiryEmailData, type: 'contact' | 'inquiry'): EmailTemplate {
    const subject = `New ${type} form submission - ${data.name}`;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #fef2f2; }
          .info-box { background: white; padding: 15px; border-radius: 6px; margin: 15px 0; border-left: 4px solid #dc2626; }
          .urgent { background: #fee2e2; padding: 10px; border-radius: 6px; margin: 10px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New ${type.charAt(0).toUpperCase() + type.slice(1)} Submission</h1>
            <p>Action Required</p>
          </div>
          
          <div class="content">
            <div class="urgent">
              <strong>⚠️ URGENT:</strong> New ${type} form submission requires immediate attention.
              ${type === 'inquiry' ? 'Customer expects response within 2 hours.' : 'Customer expects response within 24 hours.'}
            </div>
            
            <div class="info-box">
              <h3>Customer Information:</h3>
              <p><strong>Reference ID:</strong> ${data.submissionId}</p>
              <p><strong>Name:</strong> ${data.name}</p>
              <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
              <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
              ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
              
              ${type === 'inquiry' && 'productName' in data ? `
                <p><strong>Product/Service:</strong> ${data.productName}</p>
                ${data.categoryName ? `<p><strong>Category:</strong> ${data.categoryName}</p>` : ''}
                ${data.quantity ? `<p><strong>Quantity:</strong> ${data.quantity}</p>` : ''}
                <p><strong>Inquiry Type:</strong> ${data.inquiryType}</p>
              ` : ''}
              
              ${type === 'contact' && 'service' in data && data.service ? `
                <p><strong>Service Interest:</strong> ${data.service}</p>
              ` : ''}
              
              <p><strong>Message:</strong></p>
              <p style="background: #f9fafb; padding: 10px; border-radius: 4px;">${data.message}</p>
            </div>
            
            <div class="info-box">
              <h3>Required Actions:</h3>
              <ul>
                <li>Call customer within ${type === 'inquiry' ? '2 hours' : '24 hours'}</li>
                <li>Send detailed information/quotation</li>
                <li>Update CRM system</li>
                <li>Schedule follow-up if needed</li>
              </ul>
            </div>
            
            <p><strong>Submission Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      </body>
      </html>
    `;
    
    const text = `
      New ${type.charAt(0).toUpperCase() + type.slice(1)} Form Submission - ACTION REQUIRED
      
      URGENT: New ${type} form submission requires immediate attention.
      ${type === 'inquiry' ? 'Customer expects response within 2 hours.' : 'Customer expects response within 24 hours.'}
      
      Customer Information:
      Reference ID: ${data.submissionId}
      Name: ${data.name}
      Email: ${data.email}
      Phone: ${data.phone}
      ${data.company ? `Company: ${data.company}` : ''}
      
      ${type === 'inquiry' && 'productName' in data ? `
      Product/Service: ${data.productName}
      ${data.categoryName ? `Category: ${data.categoryName}` : ''}
      ${data.quantity ? `Quantity: ${data.quantity}` : ''}
      Inquiry Type: ${data.inquiryType}
      ` : ''}
      
      ${type === 'contact' && 'service' in data && data.service ? `
      Service Interest: ${data.service}
      ` : ''}
      
      Message: ${data.message}
      
      Required Actions:
      - Call customer within ${type === 'inquiry' ? '2 hours' : '24 hours'}
      - Send detailed information/quotation
      - Update CRM system
      - Schedule follow-up if needed
      
      Submission Time: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
    `;
    
    return { subject, html, text };
  }

  /**
   * Send email (placeholder - integrate with your email service)
   * This would typically integrate with services like:
   * - SendGrid
   * - AWS SES
   * - Nodemailer with SMTP
   * - Resend
   * - Postmark
   */
  async sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
    try {
      // Placeholder for actual email sending logic
      console.log('Email would be sent to:', to);
      console.log('Subject:', template.subject);
      console.log('HTML length:', template.html.length);
      console.log('Text length:', template.text.length);
      
      // In a real implementation, you would:
      // 1. Configure your email service (SendGrid, AWS SES, etc.)
      // 2. Send the email using the service's API
      // 3. Handle errors and retries
      // 4. Log the email sending for audit purposes
      
      // Simulate successful email sending
      return true;
    } catch (error) {
      console.error('Email sending failed:', error);
      return false;
    }
  }

  /**
   * Send multiple emails (customer confirmation + internal notification)
   */
  async sendFormSubmissionEmails(
    data: ContactEmailData | InquiryEmailData, 
    type: 'contact' | 'inquiry'
  ): Promise<{ customerEmailSent: boolean; internalEmailSent: boolean }> {
    try {
      // Generate customer confirmation email
      const customerTemplate = type === 'contact' 
        ? this.generateContactConfirmationEmail(data as ContactEmailData)
        : this.generateInquiryConfirmationEmail(data as InquiryEmailData);
      
      // Generate internal notification email
      const internalTemplate = this.generateInternalNotificationEmail(data, type);
      
      // Send emails
      const customerEmailSent = await this.sendEmail(data.email, customerTemplate);
      const internalEmailSent = await this.sendEmail(COMPANY_INFO.contact.email, internalTemplate);
      
      return { customerEmailSent, internalEmailSent };
    } catch (error) {
      console.error('Failed to send form submission emails:', error);
      return { customerEmailSent: false, internalEmailSent: false };
    }
  }
}

// Export singleton instance
export const emailService = EmailService.getInstance();