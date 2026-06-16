import { MetadataRoute } from 'next'
import { getSiloTools } from '@/lib/topic-clusters'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.pdfilio.com'
  const tools = getSiloTools('resume-tools')

  return tools.map(toolId => ({
    url: `${baseUrl}/tools/${toolId}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }))
}
