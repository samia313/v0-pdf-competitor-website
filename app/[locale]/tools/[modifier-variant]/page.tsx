import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { 
  modifiers as allModifiers 
} from '@/lib/programmatic-seo-config'
import { 
  generateModifierPageMetadata, 
  getCanonicalUrl 
} from '@/lib/programmatic-seo-utils'
import { pdfTools } from '@/lib/tools-data'
import { locales } from '@/lib/i18n/config'

interface Props {
  params: Promise<{ locale: string; 'modifier-variant': string }>
}

export async function generateStaticParams() {
  const params = []
  
  // Generate all locale + modifier + tool combinations
  for (const locale of locales) {
    for (const modifier of allModifiers) {
      for (const tool of pdfTools.slice(0, 15)) {
        params.push({
          locale,
          'modifier-variant': `${tool.id}__${modifier.slug}`
        })
      }
    }
  }
  
  return params
}

export async function generateMetadata({ params: paramsProm }: Props): Promise<Metadata> {
  const params = await paramsProm
  // Use __ as separator to avoid confusion with hyphens in tool IDs
  const splitResult = params['modifier-variant']?.split('__')
  
  if (!splitResult || splitResult.length !== 2) return {}
  
  const [toolId, modifierSlug] = splitResult
  const tool = pdfTools.find(t => t.id === toolId)
  const modifier = allModifiers.find(m => m.slug === modifierSlug)
  
  if (!tool || !modifier) return {}
  
  const metadata = generateModifierPageMetadata(
    tool.name,
    tool.id,
    modifier.name,
    modifier.keyword
  )
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      url: metadata.canonicalUrl,
    },
    alternates: {
      canonical: metadata.canonicalUrl,
    },
  }
}

export default async function ModifierVariantPage({ params: paramsProm }: Props) {
  const params = await paramsProm
  const splitResult = params['modifier-variant']?.split('__')
  
  if (!splitResult || splitResult.length !== 2) {
    notFound()
  }
  
  const [toolId, modifierSlug] = splitResult
  const tool = pdfTools.find(t => t.id === toolId)
  const modifier = allModifiers.find(m => m.slug === modifierSlug)
  
  if (!tool || !modifier) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link href={`/tools/${tool.id}`}>
            <Button variant="ghost" size="sm" className="mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to {tool.name}
            </Button>
          </Link>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge>{modifier.name}</Badge>
              <Badge variant="outline">Variant</Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {modifier.name} {tool.name}
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              {modifier.description}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why Use {modifier.name} {tool.name}?
            </h2>
            <ul className="space-y-3 text-slate-600 mb-6">
              <li>✓ {modifier.description}</li>
              <li>✓ Works on desktop, tablet, and mobile</li>
              <li>✓ Secure and auto-deleting</li>
              <li>✓ No registration needed</li>
            </ul>

            <Link href={`/tools/${tool.id}`}>
              <Button size="lg" className="w-full">
                Use {modifier.name} {tool.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
