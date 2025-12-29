'use client';

import { useEffect, useState } from 'react';

interface WebVitalsMetrics {
  CLS: number | null;
  FID: number | null;
  FCP: number | null;
  LCP: number | null;
  TTFB: number | null;
}

interface MobilePerformanceData {
  metrics: WebVitalsMetrics;
  deviceInfo: {
    isMobile: boolean;
    isTablet: boolean;
    connectionType: string;
    screenSize: string;
    pixelRatio: number;
  };
  timestamp: number;
}

export default function MobileWebVitals() {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({
    CLS: null,
    FID: null,
    FCP: null,
    LCP: null,
    TTFB: null,
  });

  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    connectionType: 'unknown',
    screenSize: '',
    pixelRatio: 1,
  });

  const [showDebugInfo, setShowDebugInfo] = useState(false);

  useEffect(() => {
    // Detect device information
    const detectDevice = () => {
      const userAgent = navigator.userAgent;
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
      const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*\bTablet\b)/i.test(userAgent);
      
      // Get connection information
      const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
      const connectionType = connection ? connection.effectiveType || connection.type || 'unknown' : 'unknown';
      
      // Get screen information
      const screenSize = `${window.screen.width}x${window.screen.height}`;
      const pixelRatio = window.devicePixelRatio || 1;

      setDeviceInfo({
        isMobile,
        isTablet,
        connectionType,
        screenSize,
        pixelRatio,
      });
    };

    detectDevice();

    // Import and setup Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS((metric) => {
        setMetrics(prev => ({ ...prev, CLS: metric.value }));
        reportMetric('CLS', metric.value);
      });

      getFID((metric) => {
        setMetrics(prev => ({ ...prev, FID: metric.value }));
        reportMetric('FID', metric.value);
      });

      getFCP((metric) => {
        setMetrics(prev => ({ ...prev, FCP: metric.value }));
        reportMetric('FCP', metric.value);
      });

      getLCP((metric) => {
        setMetrics(prev => ({ ...prev, LCP: metric.value }));
        reportMetric('LCP', metric.value);
      });

      getTTFB((metric) => {
        setMetrics(prev => ({ ...prev, TTFB: metric.value }));
        reportMetric('TTFB', metric.value);
      });
    });

    // Show debug info in development
    if (process.env.NODE_ENV === 'development') {
      const timer = setTimeout(() => setShowDebugInfo(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const reportMetric = (name: string, value: number) => {
    // Report to analytics in production
    if (process.env.NODE_ENV === 'production' && typeof gtag !== 'undefined') {
      gtag('event', name, {
        event_category: 'Web Vitals',
        event_label: deviceInfo.isMobile ? 'Mobile' : 'Desktop',
        value: Math.round(name === 'CLS' ? value * 1000 : value),
        non_interaction: true,
      });
    }

    // Log performance issues
    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (threshold) {
      let rating = 'good';
      if (value > threshold.poor) rating = 'poor';
      else if (value > threshold.good) rating = 'needs-improvement';

      if (rating !== 'good') {
        console.warn(`Mobile Performance Warning: ${name} is ${rating} (${value})`);
      }
    }
  };

  const getMetricRating = (name: string, value: number | null): string => {
    if (value === null) return 'loading';

    const thresholds = {
      CLS: { good: 0.1, poor: 0.25 },
      FID: { good: 100, poor: 300 },
      FCP: { good: 1800, poor: 3000 },
      LCP: { good: 2500, poor: 4000 },
      TTFB: { good: 800, poor: 1800 },
    };

    const threshold = thresholds[name as keyof typeof thresholds];
    if (!threshold) return 'unknown';

    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  };

  const formatMetricValue = (name: string, value: number | null): string => {
    if (value === null) return '...';
    
    if (name === 'CLS') {
      return value.toFixed(3);
    }
    
    return `${Math.round(value)}ms`;
  };

  // Only show debug info in development or when explicitly enabled
  if (!showDebugInfo && process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 bg-black/80 text-white p-3 rounded-lg text-xs font-mono max-w-xs lg:hidden">
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Mobile Vitals</span>
        <button
          onClick={() => setShowDebugInfo(false)}
          className="text-gray-400 hover:text-white"
          aria-label="Close debug info"
        >
          ×
        </button>
      </div>
      
      <div className="space-y-1">
        {Object.entries(metrics).map(([name, value]) => {
          const rating = getMetricRating(name, value);
          const color = rating === 'good' ? 'text-green-400' : 
                      rating === 'needs-improvement' ? 'text-yellow-400' : 
                      rating === 'poor' ? 'text-red-400' : 'text-gray-400';
          
          return (
            <div key={name} className="flex justify-between">
              <span>{name}:</span>
              <span className={color}>{formatMetricValue(name, value)}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-2 pt-2 border-t border-gray-600 text-xs text-gray-400">
        <div>📱 {deviceInfo.screenSize}</div>
        <div>🌐 {deviceInfo.connectionType}</div>
        <div>📊 {deviceInfo.pixelRatio}x DPR</div>
      </div>
    </div>
  );
}

// Mobile-specific performance monitoring hook
export function useMobilePerformance() {
  const [performanceData, setPerformanceData] = useState<MobilePerformanceData | null>(null);

  useEffect(() => {
    const collectPerformanceData = async () => {
      try {
        // Get Web Vitals
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
        
        const metrics: WebVitalsMetrics = {
          CLS: null,
          FID: null,
          FCP: null,
          LCP: null,
          TTFB: null,
        };

        // Collect metrics
        getCLS((metric) => { metrics.CLS = metric.value; });
        getFID((metric) => { metrics.FID = metric.value; });
        getFCP((metric) => { metrics.FCP = metric.value; });
        getLCP((metric) => { metrics.LCP = metric.value; });
        getTTFB((metric) => { metrics.TTFB = metric.value; });

        // Get device info
        const userAgent = navigator.userAgent;
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const isTablet = /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|Android(?=.*\bTablet\b)/i.test(userAgent);
        
        const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
        const connectionType = connection ? connection.effectiveType || connection.type || 'unknown' : 'unknown';
        
        const deviceInfo = {
          isMobile,
          isTablet,
          connectionType,
          screenSize: `${window.screen.width}x${window.screen.height}`,
          pixelRatio: window.devicePixelRatio || 1,
        };

        setPerformanceData({
          metrics,
          deviceInfo,
          timestamp: Date.now(),
        });

      } catch (error) {
        console.error('Failed to collect mobile performance data:', error);
      }
    };

    collectPerformanceData();
  }, []);

  return performanceData;
}

// Mobile performance optimization utilities
export const mobilePerformanceUtils = {
  // Optimize images for mobile
  getOptimizedImageSrc: (src: string, width: number, quality = 80) => {
    // Add mobile-specific image optimization parameters
    const params = new URLSearchParams({
      w: width.toString(),
      q: quality.toString(),
      f: 'webp',
      fit: 'cover',
    });
    
    return `${src}?${params.toString()}`;
  },

  // Lazy load images with intersection observer
  setupLazyLoading: (selector: string = 'img[data-src]') => {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              imageObserver.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll(selector).forEach((img) => {
        imageObserver.observe(img);
      });
    }
  },

  // Preload critical resources
  preloadCriticalResources: (resources: string[]) => {
    resources.forEach((resource) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      
      if (resource.endsWith('.css')) {
        link.as = 'style';
      } else if (resource.endsWith('.js')) {
        link.as = 'script';
      } else if (resource.match(/\.(jpg|jpeg|png|webp|avif)$/)) {
        link.as = 'image';
      }
      
      document.head.appendChild(link);
    });
  },

  // Optimize for mobile viewport
  optimizeViewport: () => {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (!viewport) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, viewport-fit=cover';
      document.head.appendChild(meta);
    }
  },
};