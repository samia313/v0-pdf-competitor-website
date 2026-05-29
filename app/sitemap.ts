import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://pdfmaster.com'
  
  // Static pages
  const staticPages = [
    '',
    '/tools',
    '/pricing',
    '/about',
    '/contact',
    '/faq',
    '/privacy',
    '/terms',
    '/sign-in',
    '/sign-up',
  ]

  // Tool pages
  const toolPages = [
    '/tools/merge-pdf',
    '/tools/split-pdf',
    '/tools/compress-pdf',
    '/tools/rotate-pdf',
    '/tools/remove-pages',
    '/tools/organize-pdf',
    '/tools/add-page-numbers',
    '/tools/add-watermark',
    '/tools/edit-pdf',
    '/tools/sign-pdf',
    '/tools/protect-pdf',
    '/tools/unlock-pdf',
    '/tools/jpg-to-pdf',
    '/tools/pdf-to-jpg',
    '/tools/pdf-to-png',
    '/tools/word-to-pdf',
    '/tools/pdf-to-word',
    '/tools/excel-to-pdf',
    '/tools/pdf-to-excel',
    '/tools/ppt-to-pdf',
    '/tools/pdf-to-ppt',
    '/tools/html-to-pdf',
    '/tools/ocr-pdf',
    '/tools/ai-summarizer',
    '/tools/translate-pdf',
  ]

  const allPages = [...staticPages, ...toolPages]

  return allPages.map((page) => ({
    url: `${baseUrl}${page}`,
    lastModified: new Date(),
    changeFrequency: page === '' ? 'daily' : 'weekly',
    priority: page === '' ? 1 : page.startsWith('/tools/') ? 0.9 : 0.8,
  }))
}
