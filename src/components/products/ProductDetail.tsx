'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SEOProduct, SEOGenre } from '@/lib/types';
import { getDisplayImageUrl } from '@/lib/imageUtils';

interface ProductDetailProps {
  product: SEOProduct;
  category: SEOGenre;
}

export default function ProductDetail({ product, category }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const isManufacturing = category.type === 'manufacture';

  // Mock images for demonstration - in real implementation, these would come from the product data
  const mainImage = getDisplayImageUrl(product.image, { width: 800, height: 800, quality: 90 });
  const productImages = [
    mainImage || '/imgs/default-product.jpg',
    // Add more images when available
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative">
              {/* Main Image - Fixed with object-contain */}
              <div className="relative h-96 bg-white overflow-hidden rounded-lg mb-4 border border-gray-100 flex items-center justify-center p-4">
                {productImages[selectedImage] ? (
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <svg className="w-24 h-24 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                )}

                {/* Product Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${isManufacturing
                    ? 'bg-blue-600 text-white'
                    : 'bg-green-600 text-white'
                    }`}>
                    {isManufacturing ? 'Custom Manufacturing' : 'Ready Stock'}
                  </span>
                </div>

                {/* Price Badge */}
                {product.price && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-white text-gray-900 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                      {product.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Thumbnail Images - Future Enhancement */}
              {productImages.length > 1 && (
                <div className="flex space-x-2">
                  {productImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 bg-gray-200 rounded-lg overflow-hidden ${selectedImage === index ? 'ring-2 ring-blue-600' : ''
                        }`}
                    >
                      {/* Thumbnail with object-contain */}
                      <div className="w-full h-full flex items-center justify-center bg-white p-1">
                        {image ? (
                          <img
                            src={image}
                            alt=""
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Information */}
          <div>
            {/* Category Link */}
            <div className="mb-4">
              <Link
                href={`/products/${category.slug}`}
                className="text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                ← Back to {category.name}
              </Link>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Product Description */}
            <div className="prose prose-gray max-w-none mb-8">
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.description || `Professional ${product.name.toLowerCase()} designed for commercial kitchen operations. Built with high-quality materials and precision engineering to meet the demanding requirements of restaurants, hotels, and food service businesses.`}
              </p>
            </div>

            {/* Product Highlights */}
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-gray-900 mb-4">Product Highlights</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Stainless Steel Construction</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Commercial Grade Quality</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Easy to Clean & Maintain</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm text-gray-700">Warranty Included</span>
                </div>
              </div>
            </div>

            {/* Pricing Information */}
            <div className="bg-blue-50 rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {isManufacturing ? 'Custom Manufacturing' : 'Pricing Information'}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {isManufacturing
                      ? 'Pricing varies based on specifications and customization requirements.'
                      : 'Contact us for current pricing and bulk discounts.'
                    }
                  </p>
                </div>
                {product.price && (
                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">{product.price}</div>
                    <div className="text-sm text-gray-500">Starting from</div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/quote?product=${encodeURIComponent(product.name)}`}
                  className="flex-1 bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center"
                >
                  Get Quote
                </Link>
                <Link
                  href={`/contact?product=${encodeURIComponent(product.name)}&type=inquiry`}
                  className="flex-1 border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-center"
                >
                  Send Inquiry
                </Link>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/services/consultation"
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center text-sm"
                >
                  Expert Consultation
                </Link>
                {isManufacturing && (
                  <Link
                    href="/services/equipment-manufacturing"
                    className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors text-center text-sm"
                  >
                    Manufacturing Process
                  </Link>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">Need Help?</h4>
                  <p className="text-sm text-gray-600">Call our experts for immediate assistance</p>
                </div>
                <div className="text-right">
                  <a
                    href="tel:+91-XXXXXXXXXX"
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    +91-XXXXXXXXXX
                  </a>
                  <p className="text-xs text-gray-500">Mon-Sat: 9AM-6PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}