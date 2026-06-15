import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowRight, FileText, Zap, Lock, Edit } from 'lucide-react'
import { getSilo } from '@/lib/topic-clusters'

const pdfTools = [
  { id: 'merge-pdf', name: 'Merge PDF', icon: 'FileText', desc: 'Combine multiple PDFs into one' },
  { id: 'split-pdf', name: 'Split PDF', icon: 'FileText', desc: 'Extract specific pages' },
  { id: 'compress-pdf', name: 'Compress PDF', icon: 'Zap', desc: 'Reduce file size' },
  { id: 'rotate-pdf', name: 'Rotate PDF', icon: 'Edit', desc: 'Turn pages 90/180/270°' },
  { id: 'remove-pages', name: 'Remove Pages', icon: 'FileText', desc: 'Delete unwanted pages' },
  { id: 'organize-pdf', name: 'Organize PDF', icon: 'FileText', desc: 'Rearrange pages' },
  { id: 'add-page-numbers', name: 'Add Page Numbers', icon: 'Edit', desc: 'Number your pages' },
  { id: 'add-watermark', name: 'Add Watermark', icon: 'Lock', desc: 'Protect with watermark' },
  { id: 'edit-pdf', name: 'Edit PDF', icon: 'Edit', desc: 'Modify text & content' },
  { id: 'protect-pdf', name: 'Protect PDF', icon: 'Lock', desc: 'Encrypt with password' },
  { id: 'unlock-pdf', name: 'Unlock PDF', icon: 'Lock', desc: 'Remove protection' },
  { id: 'crop-pdf', name: 'Crop PDF', icon: 'Edit', desc: 'Trim page edges' },
]

export default function PDFToolsHub() {
  const silo = getSilo('pdf-tools')

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-4">PDF Tools Collection</Badge>
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Free PDF Tools
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl">
              {silo?.description}
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {pdfTools.map(tool => (
              <Link key={tool.id} href={`/tools/${tool.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">{tool.name}</CardTitle>
                    <CardDescription>{tool.desc}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" size="sm" className="w-full">
                      Use Tool <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Benefits Section */}
          <div className="bg-blue-50 rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Why Choose PDFilio PDF Tools?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">100% Free</h3>
                <p className="text-slate-600">No hidden charges, no subscriptions required.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Secure & Private</h3>
                <p className="text-slate-600">Your files are processed securely and auto-deleted.</p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">No Installation</h3>
                <p className="text-slate-600">Works directly in your browser.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
