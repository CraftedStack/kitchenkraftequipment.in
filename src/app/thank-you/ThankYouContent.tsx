'use client';

import { useSearchParams } from 'next/navigation';
import { COMPANY_INFO } from '@/lib/constants';
import { trackPhoneCall, trackWhatsAppClick, trackEmailClick } from '@/components/seo/Analytics';

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  
  // Get parameters from URL
  const type = searchParams.get('type') || 'contact';
  const submissionId = searchParams.get('id');
  const productName = searchParams.get('product');
  const serviceName = searchParams.get('service');
  
  // Determine content based on submission type
  const getContent = () => {
    switch (type) {
      case 'inquiry':
        return {
          title: 'Product Inquiry Received!',
          message: productName 
            ? `Thank you for your inquiry about ${productName}. Our sales team will contact you within 2 hours with detailed information and pricing.`
            : 'Thank you for your product inquiry. Our sales team will contact you within 2 hours with detailed information.',
          icon: '🛍️',
          nextSteps: [
            'Our sales team will review your inquiry',
            'We will prepare a detailed quotation',
            'You will receive a call within 2 hours',
            'We will schedule a consultation if needed'
          ]
        };
      
      case 'quote':
        return {
          title: 'Quote Request Received!',
          message: 'Thank you for requesting a quote. We will contact you within 2 hours with competitive pricing and detailed information.',
          icon: '💰',
          nextSteps: [
            'Our team will prepare your customized quote',
            'You will receive a call within 2 hours',
            'We will email detailed pricing information',
            'We can schedule a site visit if needed'
          ]
        };
      
      case 'service':
        return {
          title: 'Service Inquiry Received!',
          message: serviceName 
            ? `Thank you for your interest in our ${serviceName} service. Our experts will contact you soon to discuss your requirements.`
            : 'Thank you for your service inquiry. Our experts will contact you soon to discuss your requirements.',
          icon: '🔧',
          nextSteps: [
            'Our service experts will review your requirements',
            'We will schedule a consultation call',
            'We will provide a detailed service proposal',
            'We can arrange a site visit if needed'
          ]
        };
      
      default:
        return {
          title: 'Message Received!',
          message: 'Thank you for contacting Kitchen Kraft Equipments. We have received your message and will get back to you within 24 hours.',
          icon: '✉️',
          nextSteps: [
            'Our team will review your message',
            'We will respond within 24 hours',
            'We will provide the information you requested',
            'We are here to help with any questions'
          ]
        };
    }
  };

  const content = getContent();

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Message */}
        <div className="text-center mb-12">
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="text-6xl mb-6">{content.icon}</div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.title}
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
              {content.message}
            </p>
            
            {submissionId && (
              <div className="bg-blue-50 rounded-lg p-4 mb-6">
                <p className="text-sm text-blue-800">
                  <span className="font-semibold">Reference ID:</span> {submissionId}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  Please keep this reference ID for your records
                </p>
              </div>
            )}
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            What Happens Next?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {content.nextSteps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-100 rounded-full w-8 h-8 flex items-center justify-center mr-4 mt-1 flex-shrink-0">
                  <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Need Immediate Assistance?
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
              <p className="text-gray-600 mb-3">Speak with our experts directly</p>
              <a
                href={`tel:${COMPANY_INFO.contact.phone}`}
                onClick={() => trackPhoneCall(COMPANY_INFO.contact.phone)}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-block"
              >
                {COMPANY_INFO.contact.phone}
              </a>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
              <p className="text-gray-600 mb-3">Quick messages and instant responses</p>
              <a
                href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick()}
                className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-block"
              >
                Chat Now
              </a>
            </div>

            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600 mb-3">Send detailed requirements</p>
              <a
                href={`mailto:${COMPANY_INFO.contact.email}`}
                onClick={() => trackEmailClick(COMPANY_INFO.contact.email)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-block"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>

        {/* Additional Actions */}
        <div className="text-center">
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <a
              href="/"
              className="bg-gray-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block"
            >
              Return to Home
            </a>
            <a
              href="/products"
              className="border-2 border-gray-600 text-gray-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition-colors inline-block"
            >
              Browse Products
            </a>
            <a
              href="/manufacturing"
              className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-colors inline-block"
            >
              Custom Manufacturing
            </a>
          </div>
        </div>

        {/* Business Hours Reminder */}
        <div className="mt-12 text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="font-semibold text-yellow-800 mb-2">Business Hours</h3>
            <p className="text-yellow-700">
              {COMPANY_INFO.contact.hours.weekdays} | {COMPANY_INFO.contact.hours.weekend}
            </p>
            <p className="text-sm text-yellow-600 mt-2">
              Emergency support available 24/7 for existing customers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}