'use client'

import { useState, useCallback } from 'react'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileType, Download, Loader2 } from 'lucide-react'

export default function PdfToExcelPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [convertedFile, setConvertedFile] = useState<{ blob: Blob; name: string } | null>(null)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
      setConvertedFile(null)
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
    setConvertedFile(null)
  }, [])

  const handleDownload = useCallback(() => {
    if (convertedFile) {
      saveAs(convertedFile.blob, convertedFile.name)
      setConvertedFile(null)
      setFiles([])
    }
  }, [convertedFile])

  const handleConvert = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    setProgress(10)

    try {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
      
      const arrayBuffer = await files[0].arrayBuffer()
      setProgress(20)
      
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      setProgress(30)
      
      const allData: string[][] = []
      const totalPages = pdf.numPages
      
      for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()
        
        const rows: Map<number, { x: number; text: string }[]> = new Map()
        
        textContent.items.forEach((item: any) => {
          const y = Math.round(item.transform[5] / 10) * 10
          const x = Math.round(item.transform[4])
          
          if (!rows.has(y)) {
            rows.set(y, [])
          }
          rows.get(y)!.push({ x, text: item.str })
        })
        
        const sortedYs = Array.from(rows.keys()).sort((a, b) => b - a)
        
        for (const y of sortedYs) {
          const rowItems = rows.get(y)!.sort((a, b) => a.x - b.x)
          const rowData = rowItems.map(item => item.text.trim()).filter(t => t)
          if (rowData.length > 0) {
            allData.push(rowData)
          }
        }
        
        if (pageNum < totalPages) {
          allData.push([`--- Page ${pageNum + 1} ---`])
        }
        
        setProgress(30 + Math.round((pageNum / totalPages) * 50))
      }
      
      setProgress(85)
      
      const workbook = XLSX.utils.book_new()
      const worksheet = XLSX.utils.aoa_to_sheet(allData)
      
      const colWidths = allData.reduce((acc, row) => {
        row.forEach((cell, i) => {
          const len = cell?.toString().length || 0
          acc[i] = Math.max(acc[i] || 10, Math.min(len + 2, 50))
        })
        return acc
      }, [] as number[])
      
      worksheet['!cols'] = colWidths.map(w => ({ wch: w }))
      
      XLSX.utils.book_append_sheet(workbook, worksheet, 'PDF Data')
      
      setProgress(95)
      
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
      const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      
      const originalName = files[0].name.replace(/\.pdf$/i, '')
      const fileName = `${originalName}.xlsx`
      
      // Store for manual download
      setConvertedFile({ blob, name: fileName })
      setProgress(100)
    } catch (error) {
      console.error('Error converting:', error)
      alert('Error converting PDF. Please make sure it is a valid PDF file.')
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            <div className="flex-1 max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white mb-4">
                  <FileType className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  PDF to Excel
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Extract data from PDF files to Excel spreadsheets.
                </p>
              </div>

              <AdBanner slot="pdf-excel-top" className="mb-8" />

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
                  <div className="mt-6">
                    {convertedFile ? (
                      <div className="space-y-3">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
                          <p className="text-green-800 font-semibold mb-2">Conversion Complete!</p>
                          <p className="text-sm text-green-700">{convertedFile.name}</p>
                        </div>
                        <Button
                          size="lg"
                          className="w-full text-base bg-green-600 hover:bg-green-700"
                          onClick={handleDownload}
                        >
                          <Download className="mr-2 h-5 w-5" />
                          Download Excel File
                        </Button>
                      </div>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full text-base"
                        onClick={handleConvert}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Converting... {progress}%
                          </>
                        ) : (
                          <>
                            <Download className="mr-2 h-5 w-5" />
                            Convert to Excel
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <AdBanner slot="pdf-excel-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert PDF to Excel</h2>
                <p>
                  Extract tables and data from PDF documents into Excel spreadsheets.
                  Perfect for analyzing data, creating reports, or editing content.
                </p>
                <h3>Best Results</h3>
                <ul>
                  <li>PDFs with clear table structures work best</li>
                  <li>Text-based PDFs (not scanned images)</li>
                  <li>For scanned documents, use OCR first</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="pdf-excel-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
