import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      // CloudFront CDN — add your distribution domain here once created
      // e.g. { protocol: 'https', hostname: 'd1abc123.cloudfront.net' }
      {
        protocol: 'https',
        hostname: '*.cloudfront.net',
      },
      // S3 direct (keep as fallback until CloudFront is live)
      {
        protocol: 'https',
        hostname: 's3.ap-south-1.amazonaws.com',
        pathname: '/kitchenkraftequipement.in/**',
      },
      {
        protocol: 'https',
        hostname: 'kitchenkraftequipement.in.s3.ap-south-1.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
