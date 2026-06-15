import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, DollarSign, FileText, Zap } from 'lucide-react'
import { getSilo } from '@/lib/topic-clusters'

const businessTools = [
  { id: 'invoice-generator', name: 'Invoice Generator', desc: 'Create professional invoices' },
  { id: 'business-proposal-generator', name: 'Proposal Generator', desc: 'Write winning proposals' },
]

export default function BusinessToolsHub() {
  const silo = getSilo('business-tools')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-4 bg-amber-100 text-amber-800">Business</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Business Tools
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              {silo?.description}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {businessTools.map(tool => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-amber-100">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-amber-600" />
                      {tool.name}
                    </CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Create Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Professional Business Solutions</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <DollarSign className="h-8 w-8 text-amber-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Save Time</h3>
                <p className="text-slate-600">Generate documents in minutes, not hours.</p>
              </div>
              <div>
                <FileText className="h-8 w-8 text-orange-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Professional Templates</h3>
                <p className="text-slate-600">Industry-standard, customizable formats.</p>
              </div>
              <div>
                <Zap className="h-8 w-8 text-amber-600 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">Instant Results</h3>
                <p className="text-slate-600">Ready-to-use PDFs for immediate deployment.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
