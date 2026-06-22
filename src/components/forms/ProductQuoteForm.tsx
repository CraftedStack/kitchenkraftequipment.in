'use client';

import React, { useState, useMemo } from 'react';
import { FaPhone, FaWhatsapp, FaEnvelope, FaSearch, FaTimes, FaCheck } from 'react-icons/fa';
import { SEOProduct } from '@/lib/types';

interface ProductQuoteFormProps {
  /** All available products (fetched server-side) */
  allProducts: SEOProduct[];
  /** Product name pre-selected from URL param */
  preselectedProduct?: string;
}

interface FormData {
  name: string;
  phone: string;
  email: string;
  urgency: 'immediate' | 'within_week' | 'within_month' | 'planning';
  message: string;
}

const URGENCY_OPTIONS = [
  { value: 'immediate', label: 'Immediate (within 30 min response)' },
  { value: 'within_week', label: 'Within a Week' },
  { value: 'within_month', label: 'Within a Month' },
  { value: 'planning', label: 'Just Planning' },
] as const;

export default function ProductQuoteForm({ allProducts, preselectedProduct }: ProductQuoteFormProps) {
  // Multi-select state — initialise with pre-selected product if provided
  const [selectedProducts, setSelectedProducts] = useState<string[]>(() => {
    if (preselectedProduct) {
      // Find exact or partial match
      const match = allProducts.find(
        (p) => p.name === preselectedProduct || p.name.toLowerCase() === preselectedProduct.toLowerCase()
      );
      return match ? [match.name] : preselectedProduct ? [preselectedProduct] : [];
    }
    return [];
  });

  const [productSearch, setProductSearch] = useState('');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    urgency: 'within_week',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionId, setSubmissionId] = useState('');

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return allProducts;
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.genre_name?.toLowerCase().includes(q)
    );
  }, [allProducts, productSearch]);

  // Group filtered products by category for better UX
  const groupedProducts = useMemo(() => {
    const groups: Record<string, SEOProduct[]> = {};
    for (const p of filteredProducts) {
      const cat = p.genre_name || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    }
    return groups;
  }, [filteredProducts]);

  const toggleProduct = (name: string) => {
    setSelectedProducts((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
    if (errors.products) setErrors((e) => ({ ...e, products: '' }));
  };

  const removeProduct = (name: string) => {
    setSelectedProducts((prev) => prev.filter((n) => n !== name));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (selectedProducts.length === 0) newErrors.products = 'Please select at least one product.';
    if (!formData.name.trim()) newErrors.name = 'Name is required.';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters.';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required.';
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\D/g, '')))
      newErrors.phone = 'Enter a valid 10-digit Indian mobile number.';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = 'Enter a valid email address.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      const productLabel = selectedProducts.join(', ');
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || undefined,
          urgency: formData.urgency,
          message: formData.message || undefined,
          productName: productLabel,
          productNames: selectedProducts,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) {
          const fieldErrors: Record<string, string> = {};
          result.errors.forEach((err: { field: string; message: string }) => {
            fieldErrors[err.field] = err.message;
          });
          setErrors(fieldErrors);
        } else {
          setErrors({ submit: result.message || 'Submission failed. Please try again.' });
        }
        return;
      }

      setSubmissionId(result.data?.submissionId || '');
      setSubmitted(true);
    } catch {
      setErrors({ submit: 'Something went wrong. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-5 sm:p-8 text-center">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5">
          <FaCheck className="text-green-600 text-2xl sm:text-3xl" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Quote Request Received!</h2>
        {submissionId && (
          <p className="text-sm text-gray-500 mb-3">Reference: {submissionId}</p>
        )}
        <p className="text-gray-600 mb-2">
          Our team will contact you within{' '}
          <span className="font-semibold text-blue-600">
            {formData.urgency === 'immediate' ? '30 minutes' : '2 hours'}
          </span>{' '}
          with detailed pricing.
        </p>
        <div className="bg-blue-50 rounded-xl p-3 sm:p-4 mb-5 sm:mb-6 text-left">
          <p className="text-sm font-semibold text-blue-800 mb-2">Products requested:</p>
          <ul className="space-y-1">
            {selectedProducts.map((name) => (
              <li key={name} className="flex items-center gap-2 text-sm text-blue-700">
                <FaCheck className="text-blue-500 flex-shrink-0" size={12} />
                {name}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-sm text-gray-500 mb-4">Need immediate help?</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="tel:+918830696290"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            <FaPhone size={14} /> Call Now
          </a>
          <a
            href="https://wa.me/918830696290"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
          >
            <FaWhatsapp size={14} /> WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-5 py-5 sm:px-8 sm:py-6">
          <h1 className="text-xl sm:text-2xl font-bold text-white mb-1">Get a Free Quote</h1>
          <p className="text-blue-100 text-sm">
            Select one or more products — we&apos;ll send you a detailed price proposal.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="p-5 sm:p-8 space-y-6 sm:space-y-7">

          {/* ── SECTION 1: Product Selection ── */}
          <section>
            <h2 className="text-base font-semibold text-gray-900 mb-1 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
              Select Products
              <span className="text-red-500">*</span>
            </h2>
            <p className="text-sm text-gray-500 mb-3">
              Click to select. You can choose multiple products.
            </p>

            {/* Selected chips */}
            {selectedProducts.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {selectedProducts.map((name) => (
                  <span
                    key={name}
                    className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium px-2.5 py-1.5 rounded-full"
                  >
                    {name}
                    <button
                      type="button"
                      onClick={() => removeProduct(name)}
                      className="inline-flex items-center text-blue-500 hover:text-red-500 transition-colors duration-150 hover:scale-110 active:scale-90"
                      style={{ transition: "color 150ms ease, transform 150ms ease" }}
                      aria-label={`Remove ${name}`}
                    >
                      <FaTimes size={11} />
                    </button>
                  </span>
                ))}
              </div>
            )}

            {/* Search within products */}
            <div className="relative mb-3">
              <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input
                type="text"
                placeholder="Search products..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              />
              {productSearch && (
                <button
                  type="button"
                  onClick={() => setProductSearch('')}
                  className="btn-close absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </div>

            {/* Product checkbox list, grouped by category */}
            <div className="border border-gray-200 rounded-xl overflow-hidden max-h-60 sm:max-h-72 overflow-y-auto">
              {Object.keys(groupedProducts).length === 0 ? (
                <p className="text-center text-gray-500 text-sm py-6">No products found.</p>
              ) : (
                Object.entries(groupedProducts).map(([category, products]) => (
                  <div key={category}>
                    <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                      <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {category}
                      </span>
                    </div>
                    {products.map((product) => {
                      const isSelected = selectedProducts.includes(product.name);
                      return (
                        <label
                          key={product.id}
                          className={`flex items-center gap-3 px-3 sm:px-4 py-2.5 sm:py-3 cursor-pointer transition-colors border-b border-gray-100 last:border-0 ${
                            isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                          }`}
                        >
                          {/* Custom checkbox */}
                          <span
                            className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? 'bg-blue-600 border-blue-600'
                                : 'border-gray-300 bg-white'
                            }`}
                          >
                            {isSelected && <FaCheck className="text-white" size={10} />}
                          </span>
                          <input
                            type="checkbox"
                            className="sr-only"
                            checked={isSelected}
                            onChange={() => toggleProduct(product.name)}
                          />
                          <span className={`text-sm flex-1 ${isSelected ? 'text-blue-800 font-medium' : 'text-gray-700'}`}>
                            {product.name}
                          </span>
                          {product.price && (
                            <span className="text-xs text-gray-500 flex-shrink-0">
                              ₹{parseFloat(product.price).toLocaleString('en-IN')}
                            </span>
                          )}
                        </label>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {errors.products && (
              <p className="mt-1.5 text-sm text-red-600">{errors.products}</p>
            )}
            {selectedProducts.length > 0 && (
              <p className="mt-1.5 text-xs text-blue-600 font-medium">
                {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
              </p>
            )}
          </section>

          {/* ── SECTION 2: Contact Details ── */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
              Your Details
            </h2>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.name ? 'border-red-400' : 'border-gray-300'
                }`}
              />
              {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>

            {/* Phone + Email row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.phone ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className={`w-full px-4 py-3 border rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>
            </div>
          </section>

          {/* ── SECTION 3: Urgency + Message ── */}
          <section className="space-y-4">
            <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
              <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
              Timeline &amp; Requirements
            </h2>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                When do you need this?
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors bg-white"
              >
                {URGENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Requirements <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows={3}
                placeholder="Quantity, size, customization, or any other requirements..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              />
            </div>
          </section>

          {/* Submit error */}
          {errors.submit && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-sm text-red-600">{errors.submit}</p>
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3.5 sm:py-4 px-6 rounded-xl font-semibold text-white text-sm sm:text-base transition-all duration-200 flex items-center justify-center gap-2 ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Sending Request...
              </>
            ) : (
              <>
                Get Free Quote
                {selectedProducts.length > 0 && (
                  <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                    {selectedProducts.length} item{selectedProducts.length > 1 ? 's' : ''}
                  </span>
                )}
              </>
            )}
          </button>

          {/* Alternative contact */}
          <div className="pt-2 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500 mb-3">Or reach us directly:</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="tel:+918830696290" className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                <FaPhone size={13} /> Call
              </a>
              <a href="https://wa.me/918830696290" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-green-600 hover:text-green-800 text-sm font-medium transition-colors">
                <FaWhatsapp size={13} /> WhatsApp
              </a>
              <a href="mailto:info@kitchenkraftequipments.com" className="flex items-center gap-1.5 text-red-600 hover:text-red-800 text-sm font-medium transition-colors">
                <FaEnvelope size={13} /> Email
              </a>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}
