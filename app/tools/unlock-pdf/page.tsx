'use client'

import { useState, useCallback } from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Unlock, Download, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function UnlockPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [unlockPdfBlob, setUnlockPdfBlob] = useState<Blob | null>(null)
  const [password, setPassword] = useState('')

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  const handleUnlock = async () => {
    if (files.length === 0) return
    setIsProcessing(true)

    try {
      // Note: pdf-lib can load password-protected PDFs if you provide the password
      const { PDFDocument } = await import('pdf-lib')
      const { saveAs } = await import('file-saver')
      
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer, { password: password || undefined })
      
      // Save without encryption
      const pdfBytes = await pdf.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      saveAs(blob, `unlocked_${files[0].name}`)
    } catch (error: any) {
      console.error('Error unlocking PDF:', error)
      if (error.message?.includes('password')) {
        alert('Incorrect password or the PDF requires a password.')
      } else {
        alert('Error unlocking PDF. The file may not be password protected.')
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (!unlockPdfBlob) return
    saveAs(unlockPdfBlob, 'unlock.pdf')
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-600 text-white mb-4">
                  <Unlock className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  Unlock PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Remove password protection from your PDF document.
                </p>
              </div>

              <AdBanner slot="unlock-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 'application/pdf': ['.pdf'] }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop a password-protected PDF"
                  description="or click to browse"
                />

                {files.length > 0 && (
                  <div className="mt-6 space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="password">PDF Password (if known)</Label>
                      <Input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter PDF password"
                      />
                      <p className="text-xs text-muted-foreground">
                        Leave empty if the PDF has no password or you want to try without one.
                      </p>
                    </div>

                    <Button
                      size="lg"
                      className="flex-1 text-base"
                      onClick={handleUnlock}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Unlock className="mr-2 h-5 w-5" />
                          Unlock & Download
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="unlock-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>How to Unlock a PDF</h2>
                <p>
                  If you know the password to a protected PDF, you can remove the protection
                  and save it as an unlocked document.
                </p>
                <p className="text-sm text-muted-foreground">
                  Note: We cannot unlock PDFs if you don&apos;t know the password. This tool is
                  intended for removing protection from your own documents.
                </p>
              </div>
            </div>

            <AdSidebar slot="unlock-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
