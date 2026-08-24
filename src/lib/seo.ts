/**
 * SEO Management Utilities
 * Handles metadata generation, structured data, and SEO optimization
 */

import { Metadata } from 'next';
import { SEOGenre, SEOProduct } from './api';
import { getSaleInfo } from './sale';
import { categoryPath } from './productSections';

// Base site configuration
export const SITE_CONFIG = {
  name: 'Kitchen Kraft Equipments',
  description: 'Leading manufacturer of commercial kitchen equipment in Pune. Quality stainless steel kitchen solutions for hotels, restaurants, and food businesses.',
  url: 'https://kitchenkraftequipments.com',
  ogImage: '/imgs/og-image.jpg',
  keywords: [
    'kitchen equipment manufacturers',
    'commercial kitchen equipment',
    'kitchen equipment pune',
    'stainless steel kitchen equipment',
    'hotel kitchen equipment',
    'restaurant equipment',
    'kitchen kraft'
  ]
} as const;

// Page metadata interface
export interface PageMetadata {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  openGraph: {
    title: string;
    description: string;
    images: string[];
    url: string;
    type: 'website' | 'article';
  };
  twitter?: {
    card: 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
}

/**
 * SEO Manager Class
 * Centralized SEO metadata and structured data generation
 */
export class SEOManager {
  private baseURL: string;

  constructor(baseURL: string = SITE_CONFIG.url) {
    this.baseURL = baseURL;
  }

  /**
   * Generate metadata for homepage
   */
  generateHomepageMetadata(): Metadata {
    return {
      title: 'Kitchen Equipment Manufacturers in Pune | Kitchen Kraft Equipments',
      description: SITE_CONFIG.description,
      keywords: SITE_CONFIG.keywords,
      openGraph: {
        title: 'Kitchen Equipment Manufacturers in Pune | Kitchen Kraft Equipments',
        description: SITE_CONFIG.description,
        url: this.baseURL,
        siteName: SITE_CONFIG.name,
        images: [
          {
            url: `${this.baseURL}${SITE_CONFIG.ogImage}`,
            width: 1200,
            height: 630,
            alt: 'Kitchen Kraft Equipments - Commercial Kitchen Equipment'
          }
        ],
        locale: 'en_IN',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: 'Kitchen Equipment Manufacturers in Pune | Kitchen Kraft Equipments',
        description: SITE_CONFIG.description,
        images: [`${this.baseURL}${SITE_CONFIG.ogImage}`],
      },
      alternates: {
        canonical: this.baseURL,
      },
      verification: {
        google: process.env.GOOGLE_VERIFICATION_CODE || 'x2qUlZkazdravZsndVB3cJTU5ljfQ4kYHfXSmyfY7zU',
      },
    };
  }

  /**
   * Generate metadata for product category pages
   */
  generateCategoryMetadata(category: SEOGenre): Metadata {
    const title = `${category.name} - Commercial Kitchen Equipment | Kitchen Kraft`;
    const description = `Professional ${category.name.toLowerCase()} for commercial kitchens in Pune. Browse our range of ${category.name.toLowerCase()} from Kitchen Kraft Equipments.`;
    // Canonical follows the genre's section (/manufacturing vs /products);
    // hardcoding /products pointed manufacturing pages at a URL that 301s away.
    const url = `${this.baseURL}${categoryPath(category)}`;

    return {
      title,
      description,
      keywords: [
        ...category.keywords,
        `${category.name.toLowerCase()} pune`,
        `commercial ${category.name.toLowerCase()}`,
        'kitchen equipment manufacturers'
      ],
      openGraph: {
        title,
        description: category.description || description,
        url,
        siteName: SITE_CONFIG.name,
        images: [
          {
            url: category.image || `${this.baseURL}/imgs/default-category.jpg`,
            width: 1200,
            height: 630,
            alt: `${category.name} - Kitchen Kraft Equipments`
          }
        ],
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: category.description || description,
        images: [category.image || `${this.baseURL}/imgs/default-category.jpg`],
      },
      alternates: {
        canonical: url,
      },
    };
  }

  /**
   * Generate metadata for individual product pages
   */
  generateProductMetadata(product: SEOProduct, basePath: string = '/products'): Metadata {
    const title = `${product.name} - Commercial Kitchen Equipment | Kitchen Kraft`;
    const description = `${product.description || product.name} - Professional commercial kitchen equipment from Kitchen Kraft Equipments, Pune. Get quote for ${product.name.toLowerCase()}.`;
    // basePath is the section this product is served from — see productSections.
    const url = `${this.baseURL}${basePath}/${product.categorySlug}/${product.slug}`;

    return {
      title,
      description,
      keywords: [
        ...product.keywords,
        `${product.name.toLowerCase()} pune`,
        `${product.name.toLowerCase()} price`,
        'commercial kitchen equipment quote'
      ],
      openGraph: {
        title,
        description,
        url,
        siteName: SITE_CONFIG.name,
        images: [
          {
            url: product.image || `${this.baseURL}/imgs/default-product.jpg`,
            width: 1200,
            height: 630,
            alt: `${product.name} - Kitchen Kraft Equipments`
          }
        ],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
        images: [product.image || `${this.baseURL}/imgs/default-product.jpg`],
      },
      alternates: {
        canonical: url,
      },
    };
  }

  /**
   * Generate metadata for service pages
   */
  generateServiceMetadata(
    serviceName: string,
    serviceDescription: string,
    serviceSlug: string
  ): Metadata {
    const title = `${serviceName} - Kitchen Kraft Equipments | Pune`;
    const description = `${serviceDescription} Professional ${serviceName.toLowerCase()} services from Kitchen Kraft Equipments in Pune.`;
    const url = `${this.baseURL}/services/${serviceSlug}`;

    return {
      title,
      description,
      keywords: [
        serviceName.toLowerCase(),
        `${serviceName.toLowerCase()} pune`,
        'commercial kitchen services',
        'kitchen equipment services',
        'kitchen kraft'
      ],
      openGraph: {
        title,
        description,
        url,
        siteName: SITE_CONFIG.name,
        images: [
          {
            url: `${this.baseURL}/imgs/services-${serviceSlug}.jpg`,
            width: 1200,
            height: 630,
            alt: `${serviceName} - Kitchen Kraft Equipments`
          }
        ],
        type: 'website',
      },
      alternates: {
        canonical: url,
      },
    };
  }

  /**
   * Generate metadata for static pages
   */
  generateStaticPageMetadata(
    pageTitle: string,
    pageDescription: string,
    pagePath: string,
    additionalKeywords: string[] = []
  ): Metadata {
    const title = `${pageTitle} | Kitchen Kraft Equipments`;
    const url = `${this.baseURL}${pagePath}`;

    return {
      title,
      description: pageDescription,
      keywords: [
        ...SITE_CONFIG.keywords,
        ...additionalKeywords,
        pageTitle.toLowerCase()
      ],
      openGraph: {
        title,
        description: pageDescription,
        url,
        siteName: SITE_CONFIG.name,
        images: [
          {
            url: `${this.baseURL}${SITE_CONFIG.ogImage}`,
            width: 1200,
            height: 630,
            alt: `${pageTitle} - Kitchen Kraft Equipments`
          }
        ],
        type: 'website',
      },
      alternates: {
        canonical: url,
      },
    };
  }

  /**
   * Generate metadata for pages with custom parameters
   */
  generatePageMetadata(params: {
    title: string;
    description: string;
    keywords: string[];
    path: string;
  }): Metadata {
    const title = `${params.title} | Kitchen Kraft Equipments`;
    const url = `${this.baseURL}${params.path}`;

    return {
      title,
      description: params.description,
      keywords: [
        ...SITE_CONFIG.keywords,
        ...params.keywords
      ],
      openGraph: {
        title,
        description: params.description,
        url,
        siteName: SITE_CONFIG.name,
        images: [
          {
            url: `${this.baseURL}${SITE_CONFIG.ogImage}`,
            width: 1200,
            height: 630,
            alt: `${params.title} - Kitchen Kraft Equipments`
          }
        ],
        type: 'website',
      },
      alternates: {
        canonical: url,
      },
    };
  }
}

/**
 * Structured Data Schemas
 */
export class StructuredDataManager {
  private baseURL: string;

  constructor(baseURL: string = SITE_CONFIG.url) {
    this.baseURL = baseURL;
  }

  /**
   * Generate Organization schema
   */
  generateOrganizationSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "url": this.baseURL,
      "logo": `${this.baseURL}/imgs/logo.png`,
      "description": SITE_CONFIG.description,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "telephone": "+918830696290",
        "email": "info@kitchenkraftequipments.com"
      },
      "sameAs": [
        // Add social media URLs when available
      ]
    };
  }

  /**
   * Generate Product schema
   */
  generateProductSchema(product: SEOProduct) {
    const schema: any = {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": product.name,
      "description": product.description || `Professional ${product.name} for commercial kitchens`,
      "image": product.image,
      "manufacturer": {
        "@type": "Organization",
        "name": SITE_CONFIG.name,
        "url": this.baseURL
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "INR",
        "seller": {
          "@type": "Organization",
          "name": SITE_CONFIG.name
        }
      }
    };

    // Add price if available. schema.org requires a bare numeric value (no ₹,
    // no thousands separators) and INR is set above via priceCurrency. When the
    // product is on sale, advertise the sale price so search results match the page.
    const sale = getSaleInfo(product);
    const numericPrice = sale.onSale ? sale.sale : sale.original;
    if (numericPrice != null) {
      schema.offers.price = String(numericPrice);
    }

    return schema;
  }

  /**
   * Generate Service schema
   */
  generateServiceSchema(serviceName: string, serviceDescription: string) {
    return {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": serviceName,
      "description": serviceDescription,
      "provider": {
        "@type": "Organization",
        "name": SITE_CONFIG.name,
        "url": this.baseURL
      },
      "areaServed": {
        "@type": "Place",
        "name": "Pune, Maharashtra, India"
      }
    };
  }

  /**
   * Generate BreadcrumbList schema
   */
  generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": crumb.url
      }))
    };
  }

  /**
   * Generate LocalBusiness schema
   */
  generateLocalBusinessSchema() {
    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": SITE_CONFIG.name,
      "description": SITE_CONFIG.description,
      "url": this.baseURL,
      "telephone": "+918830696290",
      "email": "info@kitchenkraftequipments.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Pune",
        "addressRegion": "Maharashtra",
        "addressCountry": "IN"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "18.5204", // Pune coordinates
        "longitude": "73.8567"
      },
      "openingHours": "Mo-Sa 09:00-18:00",
      "priceRange": "$$"
    };
  }
}

// Export singleton instances
export const seoManager = new SEOManager();
export const structuredDataManager = new StructuredDataManager();

// Utility functions
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text;
  
  const truncated = text.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');
  
  return lastSpace > 0 
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
}