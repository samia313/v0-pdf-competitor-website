import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfilio.com'

  const pages = [
    { url: '/', changefreq: 'daily', priority: '1.0' },
    { url: '/tools', changefreq: 'weekly', priority: '0.9' },
    { url: '/blog', changefreq: 'weekly', priority: '0.8' },
    { url: '/pricing', changefreq: 'monthly', priority: '0.8' },
    { url: '/about', changefreq: 'monthly', priority: '0.7' },
    { url: '/contact', changefreq: 'monthly', priority: '0.7' },
    { url: '/faq', changefreq: 'monthly', priority: '0.7' },
    { url: '/privacy', changefreq: 'yearly', priority: '0.5' },
    { url: '/terms', changefreq: 'yearly', priority: '0.5' },
  ]

  const tools = [
    '/tools/merge-pdf',
    '/tools/split-pdf',
    '/tools/compress-pdf',
    '/tools/edit-pdf',
    '/tools/pdf-to-word',
    '/tools/word-to-pdf',
    '/tools/pdf-to-jpg',
    '/tools/jpg-to-pdf',
    '/tools/pdf-to-excel',
    '/tools/excel-to-pdf',
    '/tools/pdf-to-png',
    '/tools/pdf-to-ppt',
    '/tools/ppt-to-pdf',
    '/tools/html-to-pdf',
    '/tools/add-watermark',
    '/tools/add-page-numbers',
    '/tools/remove-pages',
    '/tools/rotate-pdf',
    '/tools/organize-pdf',
    '/tools/protect-pdf',
    '/tools/unlock-pdf',
    '/tools/sign-pdf',
    '/tools/ocr-pdf',
    '/tools/translate-pdf',
    '/tools/ai-summarizer',
  ]

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
  ${tools
    .map(
      (tool) => `
  <url>
    <loc>${baseUrl}${tool}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('')}
</urlset>`

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
