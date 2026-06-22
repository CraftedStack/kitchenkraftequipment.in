/**
 * Enhanced Footer Component
 * Comprehensive footer with sitemap links and SEO optimization
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NAVIGATION, COMPANY_INFO, SITE_CONFIG } from '@/lib/constants';
import { api } from '@/lib/api';

export default async function Footer() {
  const currentYear = new Date().getFullYear();

  let productLinks = NAVIGATION.footer.products;
  let serviceLinks = NAVIGATION.footer.services;
  let companyPhone = COMPANY_INFO.contact.phone;
  let companyEmail = COMPANY_INFO.contact.email;
  let companyAddress = COMPANY_INFO.contact.address.full;
  let companyName = COMPANY_INFO.name;

  try {
    const [genres, services, metadata] = await Promise.all([
      api.getGenres(),
      api.getServices(),
      api.getCompanyMetadata()
    ]);

    if (genres && genres.length > 0) {
      productLinks = genres.slice(0, 6).map(g => ({
        name: g.name,
        href: `/products/${g.slug}`
      }));
    }

    if (services && services.length > 0) {
      serviceLinks = services.slice(0, 6).map(s => ({
        name: s.title,
        href: `/services/${s.slug}`
      }));
    }

    if (metadata) {
      if (metadata.name)    companyName    = metadata.name;
      if (metadata.phone)   companyPhone   = metadata.phone;
      if (metadata.email)   companyEmail   = metadata.email;
      if (metadata.address) companyAddress = metadata.address;
    }
  } catch (error) {
    console.error('Failed to load dynamic footer data:', error);
  }

  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-4">
              <Image
                src="/imgs/logo.png"
                alt={COMPANY_INFO.name}
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <div>
                <h3 className="text-xl font-bold">Kitchen Kraft</h3>
                <p className="text-sm text-gray-400">Equipments</p>
              </div>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              {COMPANY_INFO.description}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>{companyPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-4 w-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>{companyEmail}</span>
              </div>
              <div className="flex items-start space-x-2">
                <svg className="h-4 w-4 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>{companyAddress}</span>
              </div>
            </div>
          </div>

          {/* Products Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-white tracking-wide">Products</h4>
            <ul className="space-y-2">
              {productLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company & Support Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 mb-6">
              {NAVIGATION.footer.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h5 className="text-md font-semibold mb-3">Support</h5>
            <ul className="space-y-2">
              {NAVIGATION.footer.support.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Business Hours & Additional Info */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="text-sm text-gray-400">
                <strong>Business Hours:</strong> {COMPANY_INFO.contact.hours.weekdays}
              </div>
              <div className="text-sm text-gray-400">
                {COMPANY_INFO.contact.hours.weekend}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                href="/contact?type=quote"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Get Free Quote
              </Link>
              <Link
                href={`tel:${COMPANY_INFO.contact.phone}`}
                className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:border-gray-500 hover:text-white transition-colors"
              >
                Call Now
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright & Legal */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-sm text-gray-400">
              © {currentYear} {COMPANY_INFO.name}. All rights reserved.
            </div>

            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/sitemap.xml" className="hover:text-white transition-colors">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": COMPANY_INFO.name,
            "url": SITE_CONFIG.url,
            "logo": `${SITE_CONFIG.url}/imgs/logo.png`,
            "description": COMPANY_INFO.description,
            "address": {
              "@type": "PostalAddress",
              "streetAddress": COMPANY_INFO.contact.address.street,
              "addressLocality": COMPANY_INFO.contact.address.city,
              "addressRegion": COMPANY_INFO.contact.address.state,
              "addressCountry": COMPANY_INFO.contact.address.country,
              "postalCode": COMPANY_INFO.contact.address.pincode
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": COMPANY_INFO.contact.phone,
              "contactType": "customer service",
              "email": COMPANY_INFO.contact.email
            },
            "openingHours": "Mo-Sa 09:00-18:00"
          })
        }}
      />
    </footer>
  );
}