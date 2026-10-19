/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Removing output: 'export' to enable middleware functionality
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
