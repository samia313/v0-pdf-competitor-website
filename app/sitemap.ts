import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.pdfilio.com'
const LOCALES = ['en', 'ur', 'hi', 'es', 'fr', 'de', 'ar', 'pt', 'zh', 'ja', 'ru', 'it', 'nl', 'ko', 'tr', 'vi'] as const

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      const path = locale === 'en' ? page.path : `/${locale}${page.path}`
      const url = `${BASE_URL}${path}`

      entries.push({
        url,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map((lang) => [
              lang,
              lang === 'en' ? `${BASE_URL}${page.path}` : `${BASE_URL}/${lang}${page.path}`,
            ])
          ),
        },
      })
    }
  }

  return entries
}
