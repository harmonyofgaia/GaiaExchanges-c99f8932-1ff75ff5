/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Keep existing TypeScript config
    ignoreBuildErrors: false,
  },
  eslint: {
    // Keep existing ESLint config
    ignoreDuringBuilds: false,
  },
  images: {
    domains: ['localhost'],
  },
  // Enable compatibility with existing Vite project structure
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': './src',
    };
    return config;
  },
  // Optimize for Vercel deployment
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-tabs'],
  },
  // Prevent infinite loops during build
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
};

export default nextConfig;