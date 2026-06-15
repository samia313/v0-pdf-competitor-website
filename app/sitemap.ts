import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pdfilio.com'
  const locales = ['en', 'ur', 'hi', 'es', 'fr', 'de', 'ar', 'pt', 'zh', 'ja', 'ru', 'it', 'nl', 'ko', 'tr', 'vi']
  
  const staticPages = [
    { path: '/', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/tools', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/pricing', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/privacy', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/terms', priority: 0.6, changeFrequency: 'yearly' as const },
  ]

  const sitemap: MetadataRoute.Sitemap = []

  // Add multilingual URLs for all static pages
  locales.forEach((locale) => {
    staticPages.forEach((page) => {
      const url = locale === 'en' 
        ? `${baseUrl}${page.path}`
        : `${baseUrl}/${locale}${page.path}`

      sitemap.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [
              lang,
              lang === 'en'
                ? `${baseUrl}${page.path}`
                : `${baseUrl}/${lang}${page.path}`,
            ])
          ),
        },
      })
    })
  })

  return sitemap
}
