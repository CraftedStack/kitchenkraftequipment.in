'use client';

import React, { useState } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope } from 'react-icons/fa';
import { trackQuoteRequest, trackPhoneCall, trackWhatsAppClick, trackEmailClick } from '@/components/seo/Analytics';

interface QuickQuoteFormProps {
  productName?: string;
  categoryName?: string;
  className?: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export default function QuickQuoteForm({ 
  productName, 
  categoryName, 
  className = '' 
}: QuickQuoteFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    message: productName 
      ? `I am interested in ${productName}. Please provide pricing and availability details.`
      : categoryName
      ? `I am interested in ${categoryName} products. Please provide pricing and product information.`
      : 'I am interested in your commercial kitchen equipment. Please provide more information.'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productName,
          categoryName,
          urgency: 'within_week' // Default urgency for quick quotes
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle validation errors
          const newErrors: {[key: string]: string} = {};
          result.errors.forEach((error: any) => {
            newErrors[error.field] = error.message;
          });
          setErrors(newErrors);
        } else {
          setErrors({ submit: result.message || 'Failed to submit. Please try again.' });
        }
        return;
      }

      // Success - redirect to thank you page
      trackQuoteRequest(productName, categoryName);
      const submissionId = result.data?.submissionId;
      let thankYouUrl = '/thank-you?type=quote';
      
      if (productName) {
        thankYouUrl += `&product=${encodeURIComponent(productName)}`;
      } else if (categoryName) {
        thankYouUrl += `&category=${encodeURIComponent(categoryName)}`;
      }
      
      if (submissionId) {
        thankYouUrl += `&id=${submissionId}`;
      }
      
      window.location.href = thankYouUrl;
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Failed to submit. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
        <div className="text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Quote Request Received!
          </h3>
          <p className="text-gray-600 mb-6">
            Thank you for your interest. Our team will contact you within 2 hours with pricing and details.
          </p>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-500 mb-4">Need immediate assistance?</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="tel:+918830696290"
                onClick={() => trackPhoneCall('+918830696290')}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaPhone className="w-4 h-4 mr-2" />
                Call Now
              </a>
              <a
                href="https://wa.me/918830696290"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick()}
                className="flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FaWhatsapp className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Get Quick Quote
        </h3>
        <p className="text-gray-600 text-sm">
          {productName 
            ? `Get instant pricing for ${productName}`
            : categoryName
            ? `Get pricing for ${categoryName} products`
            : 'Get competitive pricing for commercial kitchen equipment'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name Field */}
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name *"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone Number *"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Email Address (Optional)"
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
            placeholder="Additional requirements or questions..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Sending...
            </span>
          ) : (
            'Get Free Quote'
          )}
        </button>

        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}
      </form>

      {/* Alternative Contact Methods */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-3 text-center">Or contact us directly:</p>
        <div className="flex justify-center space-x-4">
          <a
            href="tel:+918830696290"
            className="flex items-center text-blue-600 hover:text-blue-800 text-sm"
          >
            <FaPhone className="w-4 h-4 mr-1" />
            Call
          </a>
          <a
            href="https://wa.me/918830696290"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-green-600 hover:text-green-800 text-sm"
          >
            <FaWhatsapp className="w-4 h-4 mr-1" />
            WhatsApp
          </a>
          <a
            href="mailto:info@kitchenkraftequipments.com"
            onClick={() => trackEmailClick('info@kitchenkraftequipments.com')}
            className="flex items-center text-red-600 hover:text-red-800 text-sm"
          >
            <FaEnvelope className="w-4 h-4 mr-1" />
            Email
          </a>
        </div>
      </div>
    </div>
  );
}