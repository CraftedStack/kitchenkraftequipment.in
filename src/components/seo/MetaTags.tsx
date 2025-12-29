'use client';

import Head from 'next/head';

interface MetaTagsProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  noindex?: boolean;
  nofollow?: boolean;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function MetaTags({
  title,
  description,
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  noindex = false,
  nofollow = false,
  author,
  publishedTime,
  modifiedTime,
}: MetaTagsProps) {
  const siteUrl = 'https://kitchenkraftequipments.com';
  const defaultImage = `${siteUrl}/imgs/og-image.jpg`;
  
  return (
    <Head>
      {/* Basic Meta Tags */}
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      {author && <meta name="author" content={author} />}
      
      {/* Robots Meta Tags */}
      <meta 
        name="robots" 
        content={`${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`} 
      />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImage || defaultImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Kitchen Kraft Equipments" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Article specific Open Graph tags */}
      {ogType === 'article' && (
        <>
          {publishedTime && <meta property="article:published_time" content={publishedTime} />}
          {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
          {author && <meta property="article:author" content={author} />}
        </>
      )}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage || defaultImage} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="web" />
      <meta name="rating" content="general" />
      
      {/* Geo Meta Tags for Local SEO */}
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Pune" />
      <meta name="geo.position" content="18.5204;73.8567" />
      <meta name="ICBM" content="18.5204, 73.8567" />
      
      {/* Business Meta Tags */}
      <meta name="business:contact_data:street_address" content="Industrial Area, Pune" />
      <meta name="business:contact_data:locality" content="Pune" />
      <meta name="business:contact_data:region" content="Maharashtra" />
      <meta name="business:contact_data:postal_code" content="411000" />
      <meta name="business:contact_data:country_name" content="India" />
      
      {/* Preconnect for Performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch for External Resources */}
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      <link rel="dns-prefetch" href="//fonts.gstatic.com" />
    </Head>
  );
}

// Specific meta tag components for different page types
export function ProductMetaTags({ 
  productName, 
  description, 
  price, 
  image, 
  category 
}: {
  productName: string;
  description: string;
  price?: string;
  image?: string;
  category: string;
}) {
  const keywords = [
    productName.toLowerCase(),
    category.toLowerCase(),
    'commercial kitchen equipment',
    'pune',
    'kitchen kraft',
    'stainless steel',
    ...(price ? ['price', 'cost', 'buy'] : [])
  ];

  return (
    <MetaTags
      title={`${productName} - Commercial Kitchen Equipment | Kitchen Kraft`}
      description={description}
      keywords={keywords}
      ogImage={image}
      ogType="article"
    />
  );
}

export function CategoryMetaTags({ 
  categoryName, 
  description, 
  productCount 
}: {
  categoryName: string;
  description: string;
  productCount: number;
}) {
  const keywords = [
    categoryName.toLowerCase(),
    'commercial kitchen equipment',
    'pune',
    'kitchen kraft',
    'manufacturer',
    'stainless steel'
  ];

  return (
    <MetaTags
      title={`${categoryName} - Commercial Kitchen Equipment | Kitchen Kraft`}
      description={`${description} Browse ${productCount} products in ${categoryName.toLowerCase()}.`}
      keywords={keywords}
    />
  );
}

export function ServiceMetaTags({ 
  serviceName, 
  description 
}: {
  serviceName: string;
  description: string;
}) {
  const keywords = [
    serviceName.toLowerCase(),
    'commercial kitchen services',
    'pune',
    'kitchen kraft',
    'professional services'
  ];

  return (
    <MetaTags
      title={`${serviceName} - Kitchen Kraft Equipments | Pune`}
      description={description}
      keywords={keywords}
    />
  );
}