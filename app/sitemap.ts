import { MetadataRoute } from 'next'
import { pdfTools } from '@/lib/tools-data'
import { locales } from '@/lib/i18n/config'

const BASE_URL = 'https://www.pdfilio.com'

const STATIC_PAGES = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
  { path: '/tools', priority: 0.9, changeFrequency: 'weekly' as const },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const },
  { path: '/faq', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: '/contact', priority: 0.6, changeFrequency: 'monthly' as const },
  { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const },
  { path: '/terms', priority: 0.4, changeFrequency: 'yearly' as const },
]

const PUBLIC_TOOLS = pdfTools.filter(
  (tool) => !(tool.category === 'ai' && tool.premium)
)

function localizedPath(locale: string, path: string) {
  return locale === 'en' ? path : `/${locale}${path}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []

  for (const locale of locales) {
    for (const page of STATIC_PAGES) {
      const path = localizedPath(locale, page.path)
      entries.push({
        url: `${BASE_URL}${path}`,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [lang, `${BASE_URL}${localizedPath(lang, page.path)}`])
          ),
        },
      })
    }

    for (const tool of PUBLIC_TOOLS) {
      const path = localizedPath(locale, tool.href)
      entries.push({
        url: `${BASE_URL}${path}`,
        changeFrequency: 'weekly',
        priority: tool.popular ? 0.85 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((lang) => [lang, `${BASE_URL}${localizedPath(lang, tool.href)}`])
          ),
        },
      })
    }
  }

  return entries
}