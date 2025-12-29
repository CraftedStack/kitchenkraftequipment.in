'use client';

import React, { useState } from 'react';
import { FORM_CONFIG, ERROR_MESSAGES, SUCCESS_MESSAGES } from '@/lib/constants';
import MobileContactForm from '@/components/forms/MobileContactForm';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Get initial product from URL params if available
  const getInitialProduct = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      return urlParams.get('product') || '';
    }
    return '';
  };

  const validateField = (name: string, value: string): string => {
    const config = FORM_CONFIG.contact.fields[name as keyof typeof FORM_CONFIG.contact.fields];
    
    if (!config) return '';

    // Required field validation
    if (config.required && !value.trim()) {
      return ERROR_MESSAGES.form.required;
    }

    // Email validation
    if (name === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return ERROR_MESSAGES.form.email;
      }
    }

    // Phone validation
    if (name === 'phone' && value) {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(value.replace(/\D/g, ''))) {
        return ERROR_MESSAGES.form.phone;
      }
    }

    // Length validation
    if (config.minLength && value.length < config.minLength) {
      return ERROR_MESSAGES.form.minLength.replace('{min}', config.minLength.toString());
    }

    if (config.maxLength && value.length > config.maxLength) {
      return ERROR_MESSAGES.form.maxLength.replace('{max}', config.maxLength.toString());
    }

    return '';
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          // Handle validation errors
          const newErrors: FormErrors = {};
          result.errors.forEach((error: any) => {
            newErrors[error.field] = error.message;
          });
          setErrors(newErrors);
        } else {
          setErrors({ submit: result.message || ERROR_MESSAGES.form.generic });
        }
        return;
      }

      // Success - redirect to thank you page
      const submissionId = result.data?.submissionId;
      const thankYouUrl = `/thank-you?type=contact${submissionId ? `&id=${submissionId}` : ''}`;
      window.location.href = thankYouUrl;
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: ERROR_MESSAGES.form.generic });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Thank You!
        </h3>
        <p className="text-gray-600 mb-6">
          {SUCCESS_MESSAGES.form.contact}
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Contact Form */}
      <div className="lg:hidden">
        <MobileContactForm 
          initialProduct={getInitialProduct()}
          onSuccess={() => setIsSubmitted(true)}
        />
      </div>

      {/* Desktop Contact Form */}
      <form onSubmit={handleSubmit} className="hidden lg:block space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.phone ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your 10-digit phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        {/* Company Field */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.company ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter your company name (optional)"
          />
          {errors.company && (
            <p className="mt-1 text-sm text-red-600">{errors.company}</p>
          )}
        </div>

        {/* Service Field */}
        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Service Interest
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
              errors.service ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select a service (optional)</option>
            <option value="kitchen-design">Commercial Kitchen Design</option>
            <option value="manufacturing">Equipment Manufacturing</option>
            <option value="installation">Installation & Maintenance</option>
            <option value="consultation">Kitchen Planning Consultation</option>
            <option value="quote">General Quote Request</option>
            <option value="support">Technical Support</option>
            <option value="other">Other</option>
          </select>
          {errors.service && (
            <p className="mt-1 text-sm text-red-600">{errors.service}</p>
          )}
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleInputChange}
            onBlur={handleBlur}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical ${
              errors.message ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Please describe your requirements, project details, or questions..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <div>
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
                Sending Message...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="text-sm text-gray-500">
          <p>
            By submitting this form, you agree to our privacy policy. We will use your 
            information only to respond to your inquiry and provide relevant services.
          </p>
        </div>
      </form>
    </>
  );
}