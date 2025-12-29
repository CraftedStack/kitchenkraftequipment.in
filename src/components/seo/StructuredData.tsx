'use client';

import React from 'react';

interface StructuredDataProps {
  data: any;
  id?: string;
}

export default function StructuredData({ data, id }: StructuredDataProps) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 0)
      }}
    />
  );
}

// Organization Schema Component
export function OrganizationSchema() {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kitchen Kraft Equipments",
    "url": "https://kitchenkraftequipments.com",
    "logo": "https://kitchenkraftequipments.com/imgs/logo.png",
    "description": "Leading manufacturer of commercial kitchen equipment in Pune. Quality stainless steel kitchen solutions for hotels, restaurants, and food businesses.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "telephone": "+91-XXXXXXXXXX",
      "email": "info@kitchenkraftequipments.com",
      "availableLanguage": ["English", "Hindi", "Marathi"]
    },
    "foundingDate": "2010",
    "numberOfEmployees": "10-50",
    "industry": "Commercial Kitchen Equipment Manufacturing",
    "areaServed": {
      "@type": "Country",
      "name": "India"
    },
    "knowsAbout": [
      "Commercial Kitchen Equipment",
      "Stainless Steel Manufacturing",
      "Kitchen Design",
      "Restaurant Equipment",
      "Hotel Kitchen Solutions"
    ],
    "sameAs": [
      // Add social media URLs when available
    ]
  };

  return <StructuredData data={organizationData} id="organization-schema" />;
}

// Local Business Schema Component
export function LocalBusinessSchema() {
  const localBusinessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Kitchen Kraft Equipments",
    "description": "Leading manufacturer of commercial kitchen equipment in Pune. Quality stainless steel kitchen solutions for hotels, restaurants, and food businesses.",
    "url": "https://kitchenkraftequipments.com",
    "telephone": "+91-XXXXXXXXXX",
    "email": "info@kitchenkraftequipments.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pune",
      "addressRegion": "Maharashtra",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "18.5204",
      "longitude": "73.8567"
    },
    "openingHours": [
      "Mo-Sa 09:00-18:00"
    ],
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Bank Transfer", "Check"],
    "currenciesAccepted": "INR",
    "hasMap": "https://maps.google.com/?q=Kitchen+Kraft+Equipments+Pune",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "150",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  return <StructuredData data={localBusinessData} id="local-business-schema" />;
}

// Website Schema Component
export function WebsiteSchema() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Kitchen Kraft Equipments",
    "url": "https://kitchenkraftequipments.com",
    "description": "Leading manufacturer of commercial kitchen equipment in Pune. Quality stainless steel kitchen solutions for hotels, restaurants, and food businesses.",
    "publisher": {
      "@type": "Organization",
      "name": "Kitchen Kraft Equipments"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://kitchenkraftequipments.com/products?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Commercial Kitchen Equipment Categories",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Manufacturing Products",
          "url": "https://kitchenkraftequipments.com/products"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Reseller Products",
          "url": "https://kitchenkraftequipments.com/products"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Services",
          "url": "https://kitchenkraftequipments.com/services"
        }
      ]
    }
  };

  return <StructuredData data={websiteData} id="website-schema" />;
}

// FAQ Schema Component
export function FAQSchema({ faqs }: { faqs: Array<{ question: string; answer: string }> }) {
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq, index) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return <StructuredData data={faqData} id="faq-schema" />;
}

// Service Schema Component
export function ServiceSchema({ 
  serviceName, 
  serviceDescription, 
  serviceUrl 
}: { 
  serviceName: string; 
  serviceDescription: string; 
  serviceUrl: string; 
}) {
  const serviceData = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": serviceName,
    "description": serviceDescription,
    "url": serviceUrl,
    "provider": {
      "@type": "Organization",
      "name": "Kitchen Kraft Equipments",
      "url": "https://kitchenkraftequipments.com"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Pune, Maharashtra, India"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Commercial Kitchen Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": serviceName
          }
        }
      ]
    }
  };

  return <StructuredData data={serviceData} id={`service-schema-${serviceName.toLowerCase().replace(/\s+/g, '-')}`} />;
}

// Product Schema Component
export function ProductSchema({ 
  product 
}: { 
  product: {
    name: string;
    description: string;
    image?: string;
    price?: string;
    sku?: string;
    brand?: string;
  }
}) {
  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image || "https://kitchenkraftequipments.com/imgs/default-product.jpg",
    "brand": {
      "@type": "Brand",
      "name": product.brand || "Kitchen Kraft Equipments"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Kitchen Kraft Equipments",
      "url": "https://kitchenkraftequipments.com"
    },
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "INR",
      "seller": {
        "@type": "Organization",
        "name": "Kitchen Kraft Equipments"
      },
      ...(product.price && { price: product.price })
    },
    "category": "Commercial Kitchen Equipment",
    "material": "Stainless Steel",
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Material",
        "value": "Stainless Steel"
      },
      {
        "@type": "PropertyValue",
        "name": "Usage",
        "value": "Commercial Kitchen"
      }
    ]
  };

  return <StructuredData data={productData} id={`product-schema-${product.name.toLowerCase().replace(/\s+/g, '-')}`} />;
}

// Breadcrumb Schema Component
export function BreadcrumbSchema({ 
  items 
}: { 
  items: Array<{ name: string; url: string }> 
}) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <StructuredData data={breadcrumbData} id="breadcrumb-schema" />;
}