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
};

export default nextConfig;