import { Metadata } from 'next'
import { metaTitles, metaDescriptions } from '@/lib/meta-titles'

export async function generateMetadata({ params }: { params: { slug?: string[] } }): Promise<Metadata> {
  const toolPath = params.slug?.join('-') || ''
  const toolKey = toolPath.toLowerCase() as keyof typeof metaTitles
  
  const title = metaTitles[toolKey] || 'Free PDF Tool | PDFilio'
  const description = metaDescriptions[toolKey] || 'Free online PDF tool from PDFilio'

  return {
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
}

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
