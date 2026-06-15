import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, Globe } from 'lucide-react'
import { 
  countries as allCountries 
} from '@/lib/programmatic-seo-config'
import { 
  generateCountryPageMetadata, 
  getCanonicalUrl 
} from '@/lib/programmatic-seo-utils'
import { pdfTools } from '@/lib/tools-data'

interface Props {
  params: Promise<{ 'country-variant': string }>
}

export async function generateStaticParams() {
  const params = []
  
  for (const country of allCountries) {
    for (const tool of pdfTools.slice(0, 15)) {
      params.push({
        'country-variant': `${country.slug}__${tool.id}`
      })
    }
  }
  
  return params
}

export async function generateMetadata({ params: paramsProm }: Props): Promise<Metadata> {
  const params = await paramsProm
  const splitResult = params['country-variant']?.split('__')
  
  if (!splitResult || splitResult.length !== 2) return {}
  
  const [countrySlug, toolId] = splitResult
  const tool = pdfTools.find(t => t.id === toolId)
  const country = allCountries.find(c => c.slug === countrySlug)
  
  if (!tool || !country) return {}
  
  const metadata = generateCountryPageMetadata(
    tool.name,
    tool.id,
    country.name,
    country.code
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

export default async function CountryVariantPage({ params: paramsProm }: Props) {
  const params = await paramsProm
  const splitResult = params['country-variant']?.split('__')
  
  if (!splitResult || splitResult.length !== 2) {
    notFound()
  }
  
  const [countrySlug, toolId] = splitResult
  const tool = pdfTools.find(t => t.id === toolId)
  const country = allCountries.find(c => c.slug === countrySlug)
  
  if (!tool || !country) {
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
                <Globe className="h-3 w-3" />
                {country.name}
              </Badge>
              <Badge variant="outline">{country.currency}</Badge>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {tool.name} in {country.name}
            </h1>
            <p className="text-xl text-slate-600 mb-6">
              Popular {tool.name.toLowerCase()} tool for {country.name}. Fast, secure, and easy to use.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-8 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Why Use {tool.name} in {country.name}?
            </h2>
            <ul className="space-y-3 text-slate-600 mb-6">
              <li>✓ Popular in {country.name}</li>
              <li>✓ Works in {country.language}</li>
              <li>✓ Fast connection for {country.name}</li>
              <li>✓ Secure and private</li>
              <li>✓ Completely free to use</li>
            </ul>

            <Link href={`/tools/${tool.id}`}>
              <Button size="lg" className="w-full">
                Use {tool.name} Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Popular in {country.name}</h3>
              <p className="text-blue-800 text-sm">
                {tool.name} is widely used by professionals and students in {country.name}.
              </p>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="font-semibold text-green-900 mb-3">100% Free</h3>
              <p className="text-green-800 text-sm">
                No subscriptions, no hidden charges. Use {tool.name} completely free.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
