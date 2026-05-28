'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Edit, Download, Loader2 } from 'lucide-react'

export default function EditPdfPage() {
  const [files, setFiles] = useState<File[]>([])

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-500 text-white mb-4">
                  <Edit className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Edit PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Add text, images, and shapes to your PDF documents.
                </p>
              </div>

              <AdBanner slot="edit-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a PDF file here"
                  description="or click to browse"
                />

                {files.length > 0 && (
                  <div className="mt-6 space-y-6">
                    <div className="p-8 rounded-lg bg-secondary/50 text-center">
                      <Edit className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        PDF Editor
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-md mx-auto">
                        Our full PDF editor is coming soon! For now, try our other tools like:
                      </p>
                      <div className="flex flex-wrap justify-center gap-2 mt-4">
                        <a href="/tools/add-watermark" className="text-primary hover:underline text-sm">
                          Add Watermark
                        </a>
                        <span className="text-muted-foreground">•</span>
                        <a href="/tools/add-page-numbers" className="text-primary hover:underline text-sm">
                          Page Numbers
                        </a>
                        <span className="text-muted-foreground">•</span>
                        <a href="/tools/sign-pdf" className="text-primary hover:underline text-sm">
                          Sign PDF
                        </a>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <AdBanner slot="edit-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>PDF Editing Features (Coming Soon)</h2>
                <ul>
                  <li>Add text annotations</li>
                  <li>Insert images</li>
                  <li>Draw shapes and highlights</li>
                  <li>Whiteout sensitive content</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="edit-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
