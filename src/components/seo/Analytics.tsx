'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// Google Analytics tracking
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
  }
}

export function GoogleAnalytics({ gaId }: { gaId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gaId || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    
    window.gtag('config', gaId, {
      page_path: url,
    });
  }, [pathname, searchParams, gaId]);

  return null;
}

// Track custom events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track page views
export const trackPageView = (url: string, title: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
      page_path: url,
      page_title: title,
    });
  }
};

// Track conversions
export const trackConversion = (conversionId: string, value?: number, currency: string = 'INR') => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: conversionId,
      value: value,
      currency: currency,
    });
  }
};

// Track form submissions
export const trackFormSubmission = (formName: string, formType: 'contact' | 'inquiry' | 'quote') => {
  trackEvent('form_submit', 'engagement', `${formType}_form_${formName}`);
};

// Track product interactions
export const trackProductView = (productName: string, category: string, price?: string) => {
  trackEvent('view_item', 'ecommerce', productName);
  
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'view_item', {
      currency: 'INR',
      value: price ? parseFloat(price) : undefined,
      items: [{
        item_id: productName.toLowerCase().replace(/\s+/g, '-'),
        item_name: productName,
        item_category: category,
        price: price ? parseFloat(price) : undefined,
      }]
    });
  }
};

// Track search
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'search', {
      search_term: searchTerm,
      results_count: resultsCount,
    });
  }
};

// Track phone calls
export const trackPhoneCall = (phoneNumber: string) => {
  trackEvent('phone_call', 'contact', phoneNumber);
};

// Track email clicks
export const trackEmailClick = (emailAddress: string) => {
  trackEvent('email_click', 'contact', emailAddress);
};

// Track WhatsApp clicks
export const trackWhatsAppClick = () => {
  trackEvent('whatsapp_click', 'contact', 'whatsapp_button');
};

// Track quote requests
export const trackQuoteRequest = (productName?: string, serviceName?: string) => {
  const label = productName || serviceName || 'general';
  trackEvent('quote_request', 'conversion', label);
};

// Track consultation bookings
export const trackConsultationBooking = (serviceType: string) => {
  trackEvent('consultation_booking', 'conversion', serviceType);
};

// Performance tracking
export const trackPerformance = () => {
  if (typeof window !== 'undefined' && 'performance' in window) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        if (perfData && window.gtag) {
          // Track page load time
          const loadTime = perfData.loadEventEnd - perfData.loadEventStart;
          window.gtag('event', 'timing_complete', {
            name: 'load',
            value: Math.round(loadTime)
          });

          // Track Time to First Byte
          const ttfb = perfData.responseStart - perfData.requestStart;
          window.gtag('event', 'timing_complete', {
            name: 'ttfb',
            value: Math.round(ttfb)
          });
        }
      }, 0);
    });
  }
};

// Core Web Vitals tracking
export const trackWebVitals = () => {
  if (typeof window !== 'undefined') {
    // Track Largest Contentful Paint (LCP)
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          const lcp = entry.startTime;
          if (window.gtag) {
            window.gtag('event', 'web_vitals', {
              name: 'LCP',
              value: Math.round(lcp),
              event_category: 'performance'
            });
          }
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // Browser doesn't support this metric
    }

    // Track Cumulative Layout Shift (CLS)
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
        }
      }
    });

    try {
      clsObserver.observe({ entryTypes: ['layout-shift'] });
      
      // Report CLS when page is hidden
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden' && window.gtag) {
          window.gtag('event', 'web_vitals', {
            name: 'CLS',
            value: Math.round(clsValue * 1000),
            event_category: 'performance'
          });
        }
      });
    } catch (e) {
      // Browser doesn't support this metric
    }
  }
};

// Initialize analytics
export const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    trackPerformance();
    trackWebVitals();
  }
};

// Hook for using analytics in components
export const useAnalytics = () => {
  useEffect(() => {
    initializeAnalytics();
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackConversion,
    trackFormSubmission,
    trackProductView,
    trackSearch,
    trackPhoneCall,
    trackEmailClick,
    trackWhatsAppClick,
    trackQuoteRequest,
    trackConsultationBooking,
  };
};