import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.glbimg.com',
      },
      {
        protocol: 'https',
        hostname: 's.glbimg.com',
      },
      {
        protocol: 'https',
        hostname: 'media.api-sports.io',
      },
    ],
  },
  experimental: {
    optimizeCss: true,
  },
};

export default nextConfig;