import { MetadataRoute } from 'next'
import { pdfTools } from '@/lib/tools-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pdfilio.com'
  
  // Get all non-AI tools (exclude premium AI tools)
  const regularTools = pdfTools.filter(tool => tool.category !== 'ai' || !tool.premium)
  
  const pages: MetadataRoute.Sitemap = regularTools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: tool.popular ? 0.85 : 0.8,
  }))

  return pages
}
