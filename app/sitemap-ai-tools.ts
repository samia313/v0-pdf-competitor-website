import { MetadataRoute } from 'next'
import { pdfTools } from '@/lib/tools-data'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pdfilio.com'
  
  // Get only premium AI tools
  const aiTools = pdfTools.filter(tool => tool.category === 'ai' && tool.premium)
  
  const pages: MetadataRoute.Sitemap = aiTools.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  return pages
}
