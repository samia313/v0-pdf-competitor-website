import Link from 'next/link'
import { FileText } from 'lucide-react'
import { categories, pdfTools } from '@/lib/tools-data'

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                PDF<span className="text-primary">Master</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Free online PDF tools to merge, split, compress, and convert PDF files. Fast, easy, and secure.
            </p>
          </div>

          {/* Tool Categories */}
          {categories.slice(0, 4).map((category) => (
            <div key={category.id}>
              <h3 className="font-semibold mb-4 text-foreground">{category.name}</h3>
              <ul className="space-y-2">
                {pdfTools
                  .filter((tool) => tool.category === category.id)
                  .slice(0, 5)
                  .map((tool) => (
                    <li key={tool.id}>
                      <Link
                        href={tool.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PDFMaster. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
