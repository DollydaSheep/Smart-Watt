import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true, // Disable image optimization as Netlify handles this
  },
  // Enable React strict mode
  reactStrictMode: true,
  // Disable X-Powered-By header for security
  poweredByHeader: false,
  // Enable production browser source maps
  productionBrowserSourceMaps: false,
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
