// Image URL utilities for handling various image sources securely
// Based on the working implementation from admin panel

/**
 * Converts any image URL to a secure, displayable format
 * Handles HTTP->HTTPS conversion, S3 URLs, relative paths, etc.
 */
export const getSecureImageUrl = (image: string | File | undefined): string | null => {
  try {
    if (!image) return null;
    
    if (typeof image === "string") {
      const url = image.trim();
      
      // Handle empty strings
      if (!url) return null;
      
      // Debug logging for S3 URLs
      if (url.includes('amazonaws.com')) {
        console.log('Processing S3 URL:', url);
      }
      
      // Data URLs - return as-is (they're already secure)
      if (url.startsWith("data:")) {
        return url;
      }
      
      // Handle relative paths from local server
      if (url.startsWith("/")) {
        // Use the backend server URL from environment
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        return `${backendUrl}${url}`;
      }
      
      // Handle protocol-relative URLs (//example.com/image.jpg)
      if (url.startsWith("//")) {
        return `https:${url}`;
      }
      
      // Handle URLs without protocol
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        // Check if it looks like a domain/URL
        if (url.includes(".") && (url.includes("/") || url.includes("amazonaws.com") || url.includes("s3."))) {
          return `https://${url}`;
        }
        // If it doesn't look like a URL, treat as relative path
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        return `${backendUrl}/${url}`;
      }
      
      // Convert HTTP to HTTPS for security (except localhost in development)
      if (url.startsWith("http://")) {
        // Allow HTTP for localhost in development
        if (url.includes("localhost") || url.includes("127.0.0.1")) {
          return url;
        }
        // Convert HTTP to HTTPS for all other domains
        return url.replace("http://", "https://");
      }
      
      // HTTPS URLs - check for S3 certificate issues and fix them
      if (url.startsWith("https://")) {
        const fixedUrl = fixS3Url(url);
        if (fixedUrl !== url) {
          console.log('S3 URL fixed:', url, '->', fixedUrl);
        }
        return fixedUrl;
      }
      
      // Fallback: assume it's a domain and add HTTPS
      return `https://${url}`;
    }
    
    // Handle File objects (for newly uploaded files before saving)
    if (image instanceof File) {
      try {
        return URL.createObjectURL(image);
      } catch (error) {
        console.error('Error creating object URL:', error);
        return null;
      }
    }
    
    return null;
    
  } catch (error) {
    console.error('Error processing image URL:', error);
    // If any error occurs during image URL processing, return null
    // This ensures the app doesn't break and can show fallback UI
    return null;
  }
};

/**
 * Converts S3 URLs with certificate issues to standard S3 format
 */
export const fixS3Url = (url: string): string => {
  try {
    if (!url.includes('amazonaws.com')) return url;
    
    // Fix custom domain S3 URLs that have certificate issues
    // Pattern: https://bucketname.s3.region.amazonaws.com/path
    const customDomainMatch = url.match(/https?:\/\/(.+?)\.s3\.([^.]+)\.amazonaws\.com\/(.+)/);
    if (customDomainMatch) {
      const [, bucketName, region, path] = customDomainMatch;
      
      // Validate extracted components
      if (!bucketName || !region || !path) {
        console.warn('Invalid S3 URL components extracted from:', url);
        return url;
      }
      
      const fixedUrl = `https://s3.${region}.amazonaws.com/${bucketName}/${path}`;
      console.log('Fixed S3 URL:', url, '->', fixedUrl);
      return fixedUrl;
    }
    
    // Also handle URLs that might already be in standard format
    const standardMatch = url.match(/https?:\/\/s3\.([^.]+)\.amazonaws\.com\/(.+)/);
    if (standardMatch) {
      // Already in standard format, ensure HTTPS
      return url.startsWith('https://') ? url : url.replace('http://', 'https://');
    }
    
    // If no patterns match, return original URL
    return url;
    
  } catch (error) {
    console.error('Error fixing S3 URL:', error);
    // If any error occurs during URL processing, return original URL
    return url;
  }
};

/**
 * Optimizes image URL for display (adds parameters for optimization if supported)
 */
export const optimizeImageUrl = (url: string, options?: { width?: number; height?: number; quality?: number }): string => {
  if (!url || url.startsWith('data:')) return url;
  
  try {
    const parsedUrl = new URL(url);
    
    // For S3 URLs, don't add optimization parameters
    if (parsedUrl.hostname.includes('amazonaws.com') || parsedUrl.hostname.includes('s3.')) {
      return parsedUrl.toString();
    }

    // For backend image proxy URLs, don't add optimization parameters either
    // The proxy streams raw S3 bytes and doesn't support resizing
    if (parsedUrl.pathname.includes('/api/images/')) {
      return parsedUrl.toString();
    }
    
    // For other image services, add optimization parameters if provided
    if (options?.width) parsedUrl.searchParams.set('w', options.width.toString());
    if (options?.height) parsedUrl.searchParams.set('h', options.height.toString());
    if (options?.quality) parsedUrl.searchParams.set('q', options.quality.toString());
    
    return parsedUrl.toString();
  } catch {
    return url;
  }
};

/**
 * Debug function to log image URL processing
 */
export const debugImageUrl = (originalUrl: string | File | undefined, processedUrl: string | null) => {
  // Only log in development
  if (process.env.NODE_ENV === 'development' && processedUrl === null && originalUrl) {
    console.error('Image URL processing failed:', {
      original: originalUrl,
      type: typeof originalUrl,
    });
  }
};

// Export commonly used combinations
export const getDisplayImageUrl = (image: string | File | undefined, options?: { width?: number; height?: number; quality?: number }): string | null => {
  const secureUrl = getSecureImageUrl(image);
  if (!secureUrl) return null;
  
  const optimizedUrl = optimizeImageUrl(secureUrl, options);
  
  // Debug in development
  debugImageUrl(image, optimizedUrl);
  
  return optimizedUrl;
};

/**
 * Preloads an image to check if it's accessible
 */
export const preloadImage = (url: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
    
    // Timeout after 10 seconds
    setTimeout(() => resolve(false), 10000);
  });
};