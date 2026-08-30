'use client'

import { useState, useCallback } from 'react'
import { PDFDocument } from 'pdf-lib'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Minimize2, Download, Loader2 } from 'lucide-react'

export default function CompressPdfClient() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [quality, setQuality] = useState<'low' | 'medium' | 'high'>('medium')
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [compressedBlob, setCompressedBlob] = useState<Blob | null>(null)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
      setOriginalSize(newFiles[0].size)
      setCompressedSize(0)
      setCompressedBlob(null)
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setOriginalSize(0)
    setCompressedSize(0)
    setCompressedBlob(null)
  }, [])

  const handleCompress = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    try {
      const fileBuffer = await files[0].arrayBuffer()
      const pdf = await PDFDocument.load(fileBuffer)
      const compressedPdf = await PDFDocument.create()
      const pages = await compressedPdf.copyPages(pdf, pdf.getPageIndices())
      pages.forEach((page) => compressedPdf.addPage(page))
      compressedPdf.setTitle('')
      compressedPdf.setAuthor('')
      compressedPdf.setSubject('')
      compressedPdf.setKeywords([])
      compressedPdf.setProducer('')
      compressedPdf.setCreator('')
      const pdfBytes = await compressedPdf.save({ useObjectStreams: true, addDefaultPage: false })
      setCompressedSize(pdfBytes.length)
      const zip = new JSZip()
      zip.file('compressed.pdf', pdfBytes)
      const zipBlob = await zip.generateAsync({ type: 'blob' })
      setCompressedBlob(zipBlob)
    } catch (error) {
      console.error('[PDFilio] Error compressing PDF:', error)
      alert('Error compressing PDF. Please make sure the file is a valid PDF.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handleDownload = () => {
    if (compressedBlob) saveAs(compressedBlob, 'compressed-pdf.zip')
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / 1024 / 1024).toFixed(2) + ' MB'
  }

  const compressionRatio = compressedSize > 0 && originalSize > 0
    ? Math.round((1 - compressedSize / originalSize) * 100)
    : 0

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white mb-4"><Minimize2 className="h-8 w-8" /></div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">Compress PDF</h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">Reduce PDF file size while maintaining quality. Fast and easy to use.</p>
              </div>
              <AdBanner slot="compress-top" className="mb-8" />
              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader accept={{ 'application/pdf': ['.pdf'] }} maxFiles={1} onFilesSelected={handleFilesSelected} files={files} onRemoveFile={handleRemoveFile} title="Drop a PDF file here" description="or click to browse" />
                {files.length > 0 && (
                  <div className="mt-6 space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-secondary/50 text-center"><span className="text-sm text-muted-foreground block">Original Size</span><span className="font-semibold text-foreground text-lg">{formatSize(originalSize)}</span></div>
                      <div className="p-4 rounded-lg bg-primary/10 text-center"><span className="text-sm text-muted-foreground block">{compressedSize > 0 ? 'Compressed Size' : 'Estimated'}</span><span className="font-semibold text-primary text-lg">{compressedSize > 0 ? formatSize(compressedSize) : '~' + formatSize(originalSize * 0.7)}</span></div>
                    </div>
                    {compressedSize > 0 && <div className="p-4 rounded-lg bg-green-500/10 text-center"><span className="text-green-600 dark:text-green-400 font-semibold text-lg">Reduced by {compressionRatio}%</span></div>}
                    <div className="space-y-4">
                      <Label className="text-base font-semibold">Compression Level</Label>
                      <RadioGroup value={quality} onValueChange={(v) => setQuality(v as 'low' | 'medium' | 'high')}>
                        <div className="grid grid-cols-3 gap-4">
                          {(['high', 'medium', 'low'] as const).map((level) => (
                            <div key={level} className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${quality === level ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}>
                              <RadioGroupItem value={level} id={level} className="sr-only" />
                              <Label htmlFor={level} className="cursor-pointer text-center block"><span className="font-semibold block capitalize">{level}</span><span className="text-xs text-muted-foreground">{level === 'high' ? 'Best quality' : level === 'medium' ? 'Recommended' : 'Smallest size'}</span></Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="mt-6 bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-700/50 rounded-2xl p-6 md:p-8">
                      <div className="text-center mb-4"><h3 className="text-lg font-semibold text-foreground mb-2">Ready to Compress?</h3><p className="text-sm text-muted-foreground mb-6">Click the button below to start compressing your PDF</p></div>
                      <Button size="lg" className="w-full text-base bg-emerald-600 hover:bg-emerald-700 text-white" onClick={handleCompress} disabled={isProcessing}>{isProcessing ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Compressing...</> : <><Minimize2 className="mr-2 h-5 w-5" />Start Compress Process</>}</Button>
                    </div>
                    {!isProcessing && compressedBlob && <div className="mt-6 bg-gradient-to-r from-green-900/40 to-green-800/20 border border-green-700/50 rounded-2xl p-6 md:p-8"><div className="text-center mb-4"><h3 className="text-lg font-semibold text-green-400 mb-2">✓ Compression Complete!</h3><p className="text-sm text-muted-foreground mb-6">Your compressed PDF is ready to download as ZIP</p><p className="text-sm text-green-600 dark:text-green-400 font-semibold">Reduced by {compressionRatio}% ({formatSize(originalSize)} → {formatSize(compressedSize)})</p></div><Button size="lg" className="w-full text-base bg-green-600 hover:bg-green-700 text-white" onClick={handleDownload}><Download className="mr-2 h-5 w-5" />Download Compressed PDF (ZIP)</Button></div>}
                  </div>
                )}
              </div>
              <AdBanner slot="compress-bottom" className="mt-12" />
              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none"><h2>How to Compress PDF Files Online</h2><p>Reduce your PDF file size with our browser-based PDF compressor for email attachments, web uploads, and storage.</p><h3>Compression Options</h3><ul><li><strong>High Quality:</strong> Minimal compression, preserves document quality</li><li><strong>Medium:</strong> Balanced compression</li><li><strong>Low Quality:</strong> Maximum compression for the smallest file size</li></ul></div>
            </div>
            <AdSidebar slot="compress-sidebar" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
