/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  compress: true,
  productionBrowserSourceMaps: false,
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  async rewrites() {
    return {
      beforeFiles: [
        // API subdomain routing: api.pdfilio.com/* -> /api/v1/*
        {
          source: '/:path*',
          destination: '/api/v1/:path*',
          has: [
            {
              type: 'host',
              value: 'api\\.pdfilio\\.com',
            },
          ],
        },
      ],
    }
  },
}

export default nextConfig
