'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  sizes?: string;
  fill?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  fallbackSrc?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  loading?: 'lazy' | 'eager';
  onLoad?: () => void;
  onError?: () => void;
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  sizes,
  fill = false,
  placeholder = 'empty',
  blurDataURL,
  fallbackSrc = '/imgs/default-placeholder.jpg',
  objectFit = 'cover',
  loading = 'lazy',
  onLoad,
  onError,
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    setImageSrc(fallbackSrc);
    onError?.();
  };

  // Generate blur data URL for placeholder
  const generateBlurDataURL = (w: number, h: number) => {
    // Only run on client side
    if (typeof window === 'undefined') {
      return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxMCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjZjNmNGY2Ii8+Cjwvc3ZnPgo=';
    }
    
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#f3f4f6';
      ctx.fillRect(0, 0, w, h);
    }
    return canvas.toDataURL();
  };

  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(10, 10);

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center"
          style={{ width: fill ? '100%' : width, height: fill ? '100%' : height }}
        >
          <svg 
            className="w-8 h-8 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      )}

      {/* Optimized Image */}
      <Image
        src={imageSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        sizes={sizes || (fill ? '100vw' : `${width}px`)}
        placeholder={placeholder}
        blurDataURL={placeholder === 'blur' ? defaultBlurDataURL : undefined}
        loading={priority ? 'eager' : loading}
        style={{
          objectFit: objectFit,
          transition: 'opacity 0.3s ease-in-out',
          opacity: isLoading ? 0 : 1,
        }}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          'transition-opacity duration-300',
          isLoading && 'opacity-0',
          !isLoading && 'opacity-100'
        )}
      />

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">Image not available</p>
          </div>
        </div>
      )}
    </div>
  );
}

// Specialized image components for different use cases
export function ProductImage({ 
  src, 
  alt, 
  className,
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={400}
      height={300}
      className={className}
      priority={priority}
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      fallbackSrc="/imgs/default-product.jpg"
    />
  );
}

export function CategoryImage({ 
  src, 
  alt, 
  className,
  priority = false 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={600}
      height={400}
      className={className}
      priority={priority}
      quality={85}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      placeholder="blur"
      fallbackSrc="/imgs/default-category.jpg"
    />
  );
}

export function HeroImage({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      className={className}
      priority={true}
      quality={90}
      sizes="100vw"
      placeholder="blur"
      fallbackSrc="/imgs/hero-bg.jpg"
      objectFit="cover"
    />
  );
}

export function ServiceImage({ 
  src, 
  alt, 
  className 
}: { 
  src: string; 
  alt: string; 
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={800}
      height={600}
      className={className}
      priority={false}
      quality={85}
      sizes="(max-width: 768px) 100vw, 50vw"
      placeholder="blur"
      fallbackSrc="/imgs/default-service.jpg"
    />
  );
}

// Image gallery component for product pages
export function ImageGallery({ 
  images, 
  alt, 
  className 
}: { 
  images: string[]; 
  alt: string; 
  className?: string;
}) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <ProductImage 
        src="/imgs/default-product.jpg" 
        alt={alt} 
        className={className}
        priority={true}
      />
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {/* Main Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <OptimizedImage
          src={images[selectedImage]}
          alt={`${alt} - Image ${selectedImage + 1}`}
          fill
          priority={true}
          quality={90}
          sizes="(max-width: 768px) 100vw, 50vw"
          placeholder="blur"
          className="rounded-lg"
        />
      </div>

      {/* Thumbnail Images */}
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                'flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors',
                selectedImage === index 
                  ? 'border-blue-600' 
                  : 'border-gray-200 hover:border-gray-300'
              )}
            >
              <OptimizedImage
                src={image}
                alt={`${alt} thumbnail ${index + 1}`}
                width={80}
                height={80}
                quality={70}
                className="w-full h-full"
                objectFit="cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}