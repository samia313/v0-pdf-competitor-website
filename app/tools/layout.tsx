import { Metadata } from 'next'
import { metaTitles, metaDescriptions } from '@/lib/meta-titles'
import { generateAllSchemas } from '@/lib/schema-generator'
import { getToolSchema } from '@/lib/tool-schemas'

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  const toolPath = params.slug?.join('-') || ''
  const toolKey = toolPath.toLowerCase() as keyof typeof metaTitles
  
  const title = metaTitles[toolKey] || 'Free PDF Tool | PDFilio'
  const description = metaDescriptions[toolKey] || 'Free online PDF tool from PDFilio'

  // Generate schemas
  const toolSchema = getToolSchema(toolPath)
  const schemas = toolSchema ? generateAllSchemas(toolSchema) : []

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.pdfilio.com/tools/${toolPath}`,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }

  // Add schemas as script tag data
  if (schemas.length > 0) {
    metadata.other = {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@graph': schemas
      })
    } as any
  }

  return metadata
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}


