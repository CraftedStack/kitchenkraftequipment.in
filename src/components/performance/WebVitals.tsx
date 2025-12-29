'use client';

import { useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';

// Core Web Vitals thresholds
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 }, // Largest Contentful Paint
  FID: { good: 100, poor: 300 },   // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },  // Cumulative Layout Shift
  TTFB: { good: 800, poor: 1800 }, // Time to First Byte
  FCP: { good: 1800, poor: 3000 }, // First Contentful Paint
} as const;

// Performance metric interface
interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
  url: string;
}

// Global performance tracking
declare global {
  interface Window {
    webVitalsCallback?: (metric: PerformanceMetric) => void;
  }
}

/**
 * Web Vitals Monitoring Component
 */
export default function WebVitals() {
  const pathname = usePathname();

  const reportMetric = useCallback((metric: PerformanceMetric) => {
    // Send to analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'web_vitals', {
        event_category: 'performance',
        event_label: metric.name,
        value: Math.round(metric.value),
        custom_map: {
          metric_rating: metric.rating,
          page_path: metric.url,
        },
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Web Vitals] ${metric.name}:`, {
        value: metric.value,
        rating: metric.rating,
        url: metric.url,
      });
    }

    // Call custom callback if provided
    if (window.webVitalsCallback) {
      window.webVitalsCallback(metric);
    }
  }, []);

  const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
    const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
    if (!threshold) return 'good';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const createMetric = (name: string, value: number): PerformanceMetric => ({
    name,
    value,
    rating: getRating(name, value),
    timestamp: Date.now(),
    url: pathname,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Largest Contentful Paint (LCP)
    const observeLCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1];
        if (lastEntry) {
          reportMetric(createMetric('LCP', lastEntry.startTime));
        }
      });

      try {
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        console.warn('LCP observation not supported');
      }

      return observer;
    };

    // First Input Delay (FID)
    const observeFID = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.entryType === 'first-input') {
            const fid = (entry as any).processingStart - entry.startTime;
            reportMetric(createMetric('FID', fid));
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        console.warn('FID observation not supported');
      }

      return observer;
    };

    // Cumulative Layout Shift (CLS)
    const observeCLS = () => {
      let clsValue = 0;
      let sessionValue = 0;
      let sessionEntries: any[] = [];

      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          if (!(entry as any).hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (
              sessionValue &&
              entry.startTime - lastSessionEntry.startTime < 1000 &&
              entry.startTime - firstSessionEntry.startTime < 5000
            ) {
              sessionValue += (entry as any).value;
              sessionEntries.push(entry);
            } else {
              sessionValue = (entry as any).value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
            }
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('CLS observation not supported');
      }

      // Report CLS when page becomes hidden
      const reportCLS = () => {
        if (clsValue > 0) {
          reportMetric(createMetric('CLS', clsValue));
        }
      };

      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'hidden') {
          reportCLS();
        }
      });

      window.addEventListener('beforeunload', reportCLS);

      return observer;
    };

    // First Contentful Paint (FCP)
    const observeFCP = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            reportMetric(createMetric('FCP', entry.startTime));
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['paint'] });
      } catch (e) {
        console.warn('FCP observation not supported');
      }

      return observer;
    };

    // Time to First Byte (TTFB)
    const measureTTFB = () => {
      const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (navigationEntry) {
        const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
        reportMetric(createMetric('TTFB', ttfb));
      }
    };

    // Initialize observers
    const observers = [
      observeLCP(),
      observeFID(),
      observeCLS(),
      observeFCP(),
    ];

    // Measure TTFB
    if (document.readyState === 'complete') {
      measureTTFB();
    } else {
      window.addEventListener('load', measureTTFB);
    }

    // Cleanup
    return () => {
      observers.forEach((observer) => {
        if (observer) {
          observer.disconnect();
        }
      });
    };
  }, [pathname, reportMetric, createMetric]);

  return null; // This component doesn't render anything
}

/**
 * Performance Budget Monitor
 * Warns when performance budgets are exceeded
 */
export function PerformanceBudgetMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;

    const checkBudgets = () => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (!navigation) return;

      const metrics = {
        'DOM Content Loaded': navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        'Load Complete': navigation.loadEventEnd - navigation.loadEventStart,
        'Total Page Load': navigation.loadEventEnd - navigation.fetchStart,
        'DNS Lookup': navigation.domainLookupEnd - navigation.domainLookupStart,
        'TCP Connection': navigation.connectEnd - navigation.connectStart,
        'Server Response': navigation.responseEnd - navigation.responseStart,
      };

      const budgets = {
        'DOM Content Loaded': 1500,
        'Load Complete': 2000,
        'Total Page Load': 3000,
        'DNS Lookup': 200,
        'TCP Connection': 300,
        'Server Response': 500,
      };

      Object.entries(metrics).forEach(([name, value]) => {
        const budget = budgets[name as keyof typeof budgets];
        if (value > budget) {
          console.warn(`⚠️ Performance Budget Exceeded: ${name} took ${Math.round(value)}ms (budget: ${budget}ms)`);
        } else {
          console.log(`✅ Performance Budget OK: ${name} took ${Math.round(value)}ms (budget: ${budget}ms)`);
        }
      });
    };

    if (document.readyState === 'complete') {
      setTimeout(checkBudgets, 1000);
    } else {
      window.addEventListener('load', () => setTimeout(checkBudgets, 1000));
    }
  }, []);

  return null;
}

/**
 * Resource Loading Monitor
 * Tracks resource loading performance
 */
export function ResourceLoadingMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      entries.forEach((entry) => {
        if (entry.entryType === 'resource') {
          const resource = entry as PerformanceResourceTiming;
          
          // Track slow resources
          if (resource.duration > 1000) {
            console.warn(`🐌 Slow Resource: ${resource.name} took ${Math.round(resource.duration)}ms`);
            
            // Send to analytics
            if (window.gtag) {
              window.gtag('event', 'slow_resource', {
                event_category: 'performance',
                event_label: resource.name,
                value: Math.round(resource.duration),
              });
            }
          }

          // Track large resources
          if (resource.transferSize > 500000) { // 500KB
            console.warn(`📦 Large Resource: ${resource.name} is ${Math.round(resource.transferSize / 1024)}KB`);
            
            if (window.gtag) {
              window.gtag('event', 'large_resource', {
                event_category: 'performance',
                event_label: resource.name,
                value: Math.round(resource.transferSize / 1024),
              });
            }
          }
        }
      });
    });

    try {
      observer.observe({ entryTypes: ['resource'] });
    } catch (e) {
      console.warn('Resource observation not supported');
    }

    return () => observer.disconnect();
  }, []);

  return null;
}

/**
 * Hook for accessing performance metrics
 */
export function usePerformanceMetrics() {
  const getMetrics = useCallback(() => {
    if (typeof window === 'undefined') return null;

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (!navigation) return null;

    return {
      ttfb: navigation.responseStart - navigation.requestStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalPageLoad: navigation.loadEventEnd - navigation.fetchStart,
      dnsLookup: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcpConnection: navigation.connectEnd - navigation.connectStart,
      serverResponse: navigation.responseEnd - navigation.responseStart,
    };
  }, []);

  return { getMetrics };
}