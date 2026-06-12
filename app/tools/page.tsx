import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { ToolCard } from '@/components/tool-card'
import { AdBanner } from '@/components/ad-units'
import { pdfTools, categories } from '@/lib/tools-data'
import { ToolIcon } from '@/components/tool-icon'

export const metadata = {
  title: 'All PDF Tools - pdfilio',
  description: 'Browse all our free PDF tools. Merge, split, compress, convert and edit PDF files online.',
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              All PDF Tools
            </h1>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to work with PDFs in one place. All tools are free and easy to use.
            </p>
          </div>

          {/* Ad Banner */}
          <AdBanner slot="tools-top" className="max-w-4xl mx-auto mb-12" />

          {categories.map((category) => {
            const categoryTools = pdfTools.filter(
              (tool) => tool.category === category.id
            )
            if (categoryTools.length === 0) return null

            return (
              <div key={category.id} className="mb-16 last:mb-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <ToolIcon icon={category.icon} className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">
                      {category.name}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {categoryTools.length} tools available
                    </p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {categoryTools.map((tool) => (
                    <ToolCard key={tool.id} {...tool} />
                  ))}
                </div>
              </div>
            )
          })}

          {/* Bottom Ad */}
          <AdBanner slot="tools-bottom" className="max-w-4xl mx-auto mt-12" />
        </div>
      </main>

      <Footer />
    </div>
  )
}
