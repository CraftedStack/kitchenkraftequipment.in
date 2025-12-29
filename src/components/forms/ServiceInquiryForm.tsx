'use client';

import React, { useState } from 'react';
import { FORM_CONFIG, ERROR_MESSAGES, COMPANY_INFO } from '@/lib/constants';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  location: string;
  message: string;
}

interface FormErrors {
  [key: string]: string;
}

interface ServiceInquiryFormProps {
  serviceName: string;
  serviceSlug: string;
  className?: string;
}

export default function ServiceInquiryForm({ 
  serviceName, 
  serviceSlug, 
  className = '' 
}: ServiceInquiryFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    location: '',
    message: `I am interested in your ${serviceName} service. Please provide more information about your offerings and pricing.`
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get project type options based on service
  const getProjectTypeOptions = () => {
    switch (serviceSlug) {
      case 'commercial-kitchen-design':
        return [
          { value: 'restaurant', label: 'Restaurant Kitchen' },
          { value: 'hotel', label: 'Hotel Kitchen' },
          { value: 'catering', label: 'Catering Kitchen' },
          { value: 'cafeteria', label: 'Cafeteria/Canteen' },
          { value: 'cloud-kitchen', label: 'Cloud Kitchen' },
          { value: 'bakery', label: 'Bakery' },
          { value: 'other', label: 'Other' }
        ];
      case 'equipment-manufacturing':
        return [
          { value: 'cooking', label: 'Cooking Equipment' },
          { value: 'refrigeration', label: 'Refrigeration Equipment' },
          { value: 'preparation', label: 'Food Preparation Equipment' },
          { value: 'storage', label: 'Storage Solutions' },
          { value: 'dishwashing', label: 'Dishwashing Equipment' },
          { value: 'custom', label: 'Custom Equipment' },
          { value: 'other', label: 'Other' }
        ];
      case 'installation-maintenance':
        return [
          { value: 'new-installation', label: 'New Installation' },
          { value: 'maintenance', label: 'Regular Maintenance' },
          { value: 'repair', label: 'Equipment Repair' },
          { value: 'upgrade', label: 'Equipment Upgrade' },
          { value: 'relocation', label: 'Equipment Relocation' },
          { value: 'other', label: 'Other' }
        ];
      default:
        return [
          { value: 'consultation', label: 'General Consultation' },
          { value: 'planning', label: 'Kitchen Planning' },
          { value: 'assessment', label: 'Site Assessment' },
          { value: 'other', label: 'Other' }
        ];
    }
  };

  const validateField = (name: string, value: string): string => {
    // Required field validation
    if (['name', 'email', 'phone', 'message'].includes(name) && !value.trim()) {
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
    if (name === 'name' && value.length > 0 && value.length < 2) {
      return 'Name must be at least 2 characters long.';
    }

    if (name === 'message' && value.length > 0 && value.length < 10) {
      return 'Message must be at least 10 characters long.';
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
      const response = await fetch('/api/inquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          productName: serviceName,
          inquiryType: 'service',
          serviceName,
          serviceSlug
        }),
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
      const thankYouUrl = `/thank-you?type=service&service=${encodeURIComponent(serviceName)}${submissionId ? `&id=${submissionId}` : ''}`;
      window.location.href = thankYouUrl;
      
    } catch (error) {
      console.error('Form submission error:', error);
      setErrors({ submit: ERROR_MESSAGES.form.generic });
    } finally {
      setIsSubmitting(false);
    }
  };

  const projectTypeOptions = getProjectTypeOptions();

  return (
    <div className={`bg-white rounded-lg shadow-lg p-8 ${className}`}>
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get {serviceName} Quote
        </h3>
        <p className="text-gray-600">
          Fill out the form below and our experts will contact you with a detailed proposal.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Service Information Display */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Service Inquiry</h4>
          <p className="text-gray-700 text-sm">
            <span className="font-medium">Service:</span> {serviceName}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
              Company/Business Name
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

          {/* Project Type Field */}
          <div>
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700 mb-2">
              Project Type
            </label>
            <select
              id="projectType"
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.projectType ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select project type (optional)</option>
              {projectTypeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className="mt-1 text-sm text-red-600">{errors.projectType}</p>
            )}
          </div>

          {/* Budget Field */}
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Estimated Budget
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.budget ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select budget range (optional)</option>
              <option value="under-1-lakh">Under ₹1 Lakh</option>
              <option value="1-5-lakh">₹1 - 5 Lakh</option>
              <option value="5-10-lakh">₹5 - 10 Lakh</option>
              <option value="10-25-lakh">₹10 - 25 Lakh</option>
              <option value="25-50-lakh">₹25 - 50 Lakh</option>
              <option value="above-50-lakh">Above ₹50 Lakh</option>
              <option value="discuss">Prefer to discuss</option>
            </select>
            {errors.budget && (
              <p className="mt-1 text-sm text-red-600">{errors.budget}</p>
            )}
          </div>

          {/* Timeline Field */}
          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
              Project Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.timeline ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select timeline (optional)</option>
              <option value="immediate">Immediate (Within 1 week)</option>
              <option value="within-month">Within 1 month</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="planning">Just planning</option>
            </select>
            {errors.timeline && (
              <p className="mt-1 text-sm text-red-600">{errors.timeline}</p>
            )}
          </div>

          {/* Location Field */}
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Project Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              onBlur={handleBlur}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                errors.location ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="City, State (optional)"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-600">{errors.location}</p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Project Details / Requirements *
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
            placeholder="Please describe your project requirements, space details, specific needs, or any questions..."
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
            className={`w-full py-4 px-6 rounded-lg font-semibold transition-colors ${
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
                Sending Inquiry...
              </span>
            ) : (
              `Get ${serviceName} Quote`
            )}
          </button>
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-sm text-red-600">{errors.submit}</p>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 mb-2">Need Immediate Assistance?</h4>
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <a
              href={`tel:${COMPANY_INFO.contact.phone}`}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call: {COMPANY_INFO.contact.phone}
            </a>
            <a
              href={`https://wa.me/${COMPANY_INFO.contact.whatsapp.replace(/[^0-9]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-600 hover:text-green-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              WhatsApp
            </a>
            <a
              href={`mailto:${COMPANY_INFO.contact.email}`}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}