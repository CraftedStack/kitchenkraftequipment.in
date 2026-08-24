'use client';

import React, { useState, useEffect } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaUser, FaBuilding, FaComment, FaTimes, FaCheck } from 'react-icons/fa';
import { trackFormSubmission, trackPhoneCall, trackWhatsAppClick } from '@/components/seo/Analytics';

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

interface MobileContactFormProps {
  initialProduct?: string;
  className?: string;
  onSuccess?: () => void;
}

export default function MobileContactForm({ 
  initialProduct = '', 
  className = '',
  onSuccess 
}: MobileContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: initialProduct ? `I am interested in ${initialProduct}. Please provide more information.` : ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const totalSteps = 3;

  // Form validation
  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'phone':
        if (!value.trim()) return 'Phone number is required';
        const phoneRegex = /^[6-9]\d{9}$/;
        const cleanPhone = value.replace(/\D/g, '');
        if (!phoneRegex.test(cleanPhone)) return 'Please enter a valid 10-digit phone number';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      
      default:
        return '';
    }
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
    setTouchedFields(prev => new Set(prev).add(name));
    
    const error = validateField(name, value);
    if (error) {
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const stepFields = {
      1: ['name', 'email', 'phone'],
      2: ['company', 'service'],
      3: ['message']
    };

    const fieldsToValidate = stepFields[step as keyof typeof stepFields] || [];
    const newErrors: FormErrors = {};
    let isValid = true;

    fieldsToValidate.forEach(field => {
      const error = validateField(field, formData[field as keyof FormData]);
      if (error && (field === 'name' || field === 'email' || field === 'phone' || field === 'message')) {
        newErrors[field] = error;
        isValid = false;
      }
    });

    setErrors(prev => ({ ...prev, ...newErrors }));
    return isValid;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(3)) {
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
          const newErrors: FormErrors = {};
          result.errors.forEach((error: any) => {
            newErrors[error.field] = error.message;
          });
          setErrors(newErrors);
        } else {
          setErrors({ submit: result.message || 'Something went wrong. Please try again.' });
        }
        return;
      }

      trackFormSubmission('mobile', 'contact');
      setIsSubmitted(true);
      onSuccess?.();
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: 'Network error. Please check your connection and try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Success state
  if (isSubmitted) {
    return (
      <div className={`mobile-contact-form ${className}`}>
        <div className="text-center py-8">
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-600" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your message has been sent successfully. We'll get back to you within 24 hours.
          </p>
          
          {/* Quick Actions */}
          <div className="space-y-3">
            <a
              href="tel:+918830696290"
              onClick={() => trackPhoneCall('+918830696290')}
              className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <FaPhone className="inline mr-2" />
              Call Us Now
            </a>
            <a
              href="https://wa.me/918830696290"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick()}
              className="block w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              <FaWhatsapp className="inline mr-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`mobile-contact-form ${className}`}>
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Basic Information */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
            
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                <FaUser className="inline mr-2" />
                Full Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                <FaEnvelope className="inline mr-2" />
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email address"
                autoComplete="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                <FaPhone className="inline mr-2" />
                Phone Number *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your 10-digit phone number"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Business Information */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Business Information</h2>
            
            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                <FaBuilding className="inline mr-2" />
                Company Name
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
                placeholder="Enter your company name (optional)"
                autoComplete="organization"
              />
            </div>

            {/* Service Interest */}
            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
                What can we help with?
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
              >
                {/* Enquiry types, not service pages — these stay accurate whether
                    or not the Services section is enabled. */}
                <option value="">Select an option (optional)</option>
                <option value="manufacturing">Custom Equipment Manufacturing</option>
                <option value="products">Product Enquiry</option>
                <option value="quote">General Quote Request</option>
                <option value="support">Technical Support</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 3: Message */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Your Message</h2>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                <FaComment className="inline mr-2" />
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-vertical text-lg ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Please describe your requirements, project details, or questions..."
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                {formData.message.length}/500 characters
              </p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={prevStep}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {currentStep < totalSteps ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}
      </form>

      {/* Quick Contact Options */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-600 text-center mb-4">
          Need immediate assistance?
        </p>
        <div className="grid grid-cols-2 gap-3">
          <a
            href="tel:+918830696290"
            onClick={() => trackPhoneCall('+918830696290')}
            className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            <FaPhone className="mr-2" size={14} />
            Call Now
          </a>
          <a
            href="https://wa.me/918830696290"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick()}
            className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            <FaWhatsapp className="mr-2" size={14} />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}