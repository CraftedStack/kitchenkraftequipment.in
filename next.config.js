/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@/components', '@/lib'],
  },

  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
      },
    ],
  },

  // Compression
  compress: true,

  // Headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Security headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          // Performance headers
          // NOTE: X-Robots-Tag is deliberately NOT set globally here.
          // A blanket 'index, follow' header applies to every route and
          // overrides per-page intent — it contradicted the `noindex` meta tag
          // on pages that opt out (e.g. /services while the section is
          // disabled), sending crawlers a mixed signal. Indexing is controlled
          // per page through the Metadata API (`robots` in generateMetadata),
          // which is the single source of truth.
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60'
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          },
        ],
      },
      {
        source: '/imgs/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=60'
          },
        ],
      },
    ];
  },

  // Redirects for SEO
  async redirects() {
    return [
      // Redirect old URLs to new structure if needed
      {
        source: '/product/:slug',
        destination: '/products/:slug',
        permanent: true,
      },
      {
        source: '/service/:slug',
        destination: '/services/:slug',
        permanent: true,
      },
      // The manufacturing landing page was promoted from a child of /products
      // to its own top-level section. Permanent so any accumulated ranking and
      // any existing link lands on the canonical URL.
      {
        source: '/products/manufactured',
        destination: '/manufacturing',
        permanent: true,
      },
      // Legacy query-param forms predate the dedicated landing pages and are
      // still linked from parts of the nav. Collapsing them removes a
      // duplicate-content split where two URLs served the same listing.
      {
        source: '/products',
        has: [{ type: 'query', key: 'type', value: 'manufacture' }],
        destination: '/manufacturing',
        permanent: true,
      },
      {
        source: '/products',
        has: [{ type: 'query', key: 'type', value: 'resell' }],
        destination: '/products/best-selling',
        permanent: true,
      },
      // Per-category redirects between /products and /manufacturing are handled
      // by src/middleware.ts, which resolves each genre's type from live data.
      // They were previously a hardcoded slug list here, which broke silently
      // whenever a genre was renamed or retyped in the admin panel.
    ];
  },

  // Bundle analyzer (enable with ANALYZE=true)
  ...(process.env.ANALYZE === 'true' && {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false,
            reportFilename: '../bundle-analyzer-report.html',
          })
        );
      }
      return config;
    },
  }),

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations.
    // Client only: applying this splitChunks config to the server build bundles
    // browser-only vendor code into a server chunk, which throws
    // "ReferenceError: self is not defined" when prerendering. Next already
    // chunks the server build sensibly on its own.
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
            },
          },
        },
      };
    }

    // Tree shaking for better bundle size
    config.optimization.usedExports = true;
    config.optimization.sideEffects = false;

    return config;
  },

  // Output configuration
  output: 'standalone',
  
  // Power optimizations
  poweredByHeader: false,
  
  // Strict mode for better performance
  reactStrictMode: true,

  // Ignore ESLint errors during build (for deployment)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Ignore TypeScript errors during build (for deployment)
  typescript: {
    ignoreBuildErrors: true,
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};

module.exports = nextConfig;