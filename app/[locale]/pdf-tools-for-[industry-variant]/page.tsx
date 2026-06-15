import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Briefcase } from 'lucide-react'
import { 
  industries as allIndustries 
} from '@/lib/programmatic-seo-config'
import { 
  generateIndustryPageMetadata, 
  getCanonicalUrl 
} from '@/lib/programmatic-seo-utils'
import { pdfTools } from '@/lib/tools-data'

interface Props {
  params: Promise<{ 'industry-variant': string }>
}

export async function generateStaticParams() {
  const params = []
  
  for (const industry of allIndustries) {
    for (const tool of pdfTools.slice(0, 15)) {
      params.push({
        'industry-variant': `${industry.slug}__${tool.id}`
      })
    }
  }
  
  return params
}

export async function generateMetadata({ params: paramsProm }: Props): Promise<Metadata> {
  const params = await paramsProm
  const splitResult = params['industry-variant']?.split('__')
  
  if (!splitResult || splitResult.length !== 2) return {}
  
  const [industrySlug, toolId] = splitResult
  const tool = pdfTools.find(t => t.id === toolId)
  const industry = allIndustries.find(i => i.slug === industrySlug)
  
  if (!tool || !industry) return {}
  
  const metadata = generateIndustryPageMetadata(
    tool.name,
    tool.id,
    industry.name,
    industry.slug
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

export default async function IndustryVariantPage({ params: paramsProm }: Props) {
  const params = await paramsProm
  const splitResult = params['industry-variant']?.split('__')
  
  if (!splitResult || splitResult.length !== 2) {
    notFound()
  }
  
  const [industrySlug, toolId] = splitResult
  const tool = pdfTools.find(t => t.id === toolId)
  const industry = allIndustries.find(i => i.slug === industrySlug)
  
  if (!tool || !industry) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="flex items-center gap-1">
                <Briefcase className="h-3 w-3" />
                {industry.name}
              </Badge>
              <Badge variant="outline">Professional</Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {tool.name} for {industry.name}
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              {industry.description}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Perfect for {industry.name}
            </h2>
            <ul className="space-y-3 text-slate-600 mb-6">
              {industry.painPoints.map((pain, idx) => (
                <li key={idx}>✓ {pain}</li>
              ))}
              <li>✓ Trusted by professionals</li>
              <li>✓ Secure and reliable</li>
            </ul>

            <Link href={`/tools/${tool.id}`}>
              <Button size="lg" className="w-full">
                Get Started for {industry.name}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="bg-amber-50 rounded-lg p-6">
            <h3 className="font-semibold text-amber-900 mb-3">Why {industry.name} Use {tool.name}</h3>
            <p className="text-amber-800 text-sm mb-3">
              {industry.description.charAt(0).toUpperCase() + industry.description.slice(1)} rely on {tool.name} for:
            </p>
            <ul className="text-amber-800 text-sm space-y-1">
              {industry.keywords.map((keyword, idx) => (
                <li key={idx}>• {keyword}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
