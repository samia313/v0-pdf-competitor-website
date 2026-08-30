import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pdfilio.com'

  // Public, indexable pages only. Private/admin routes should never be in the sitemap.
  const pages: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/tools`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/faq`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.4 },
  ]

  return pages
}