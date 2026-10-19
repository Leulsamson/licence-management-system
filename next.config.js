/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Removing output: 'export' to enable middleware functionality
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  outputFileTracingIncludes: {
    '/*': ['./node_modules/.prisma/client/**'],
  },
};

module.exports = nextConfig;
