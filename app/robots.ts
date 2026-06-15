import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/auth/', '/dashboard/', '.env'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'anthropic-ai',
        disallow: '/',
      },
      {
        userAgent: 'Claude-Web',
        disallow: '/',
      },
    ],
    sitemap: [
      'https://www.pdfilio.com/sitemap.xml',
      'https://www.pdfilio.com/sitemap-pages.xml',
      'https://www.pdfilio.com/sitemap-tools.xml',
      'https://www.pdfilio.com/sitemap-ai-tools.xml',
      'https://www.pdfilio.com/sitemap-blog.xml',
    ],
  }
}
