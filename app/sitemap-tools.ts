import { MetadataRoute } from 'next'
import { pdfTools } from '@/lib/tools-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pdfilio.com'

  // Include public tools that are intended to be discoverable in search.
  // Premium AI tools are excluded because they require authenticated access.
  const publicTools = pdfTools.filter(tool => tool.category !== 'ai' || !tool.premium)

  return publicTools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    changeFrequency: 'weekly' as const,
    priority: tool.popular ? 0.85 : 0.8,
  }))
}