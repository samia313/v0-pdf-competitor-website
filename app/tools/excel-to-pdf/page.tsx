'use client'

import { useState, useCallback } from 'react'
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileType, Download, Loader2 } from 'lucide-react'

export default function ExcelToPdfPage() {
  const [files, setFiles] = useState<File[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleFilesSelected = useCallback(async (newFiles: File[]) => {
    if (newFiles.length > 0) {
      setFiles([newFiles[0]])
    }
  }, [])

  const handleRemoveFile = useCallback(() => {
    setFiles([])
  }, [])

  const handleConvert = async () => {
    if (files.length === 0) return
    setIsProcessing(true)
    setProgress(10)

    try {
      const arrayBuffer = await files[0].arrayBuffer()
      setProgress(30)
      
      const workbook = XLSX.read(arrayBuffer, { type: 'array' })
      setProgress(50)
      
      const pdfDoc = await PDFDocument.create()
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
      const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      
      const pageWidth = 842
      const pageHeight = 595
      const margin = 40
      const fontSize = 9
      const cellPadding = 4
      const rowHeight = 20
      
      for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName]
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }) as any[][]
        
        if (data.length === 0) continue
        
        let page = pdfDoc.addPage([pageWidth, pageHeight])
        let y = pageHeight - margin
        
        page.drawText(sheetName, {
          x: margin,
          y,
          size: 14,
          font: boldFont,
          color: rgb(0, 0, 0),
        })
        y -= 30
        
        const maxCols = Math.max(...data.map(row => row?.length || 0))
        const colWidth = Math.min((pageWidth - margin * 2) / maxCols, 100)
        
        for (let rowIndex = 0; rowIndex < data.length; rowIndex++) {
          const row = data[rowIndex] || []
          
          if (y < margin + rowHeight) {
            page = pdfDoc.addPage([pageWidth, pageHeight])
            y = pageHeight - margin
          }
          
          if (rowIndex === 0) {
            page.drawRectangle({
              x: margin,
              y: y - rowHeight + cellPadding,
              width: colWidth * maxCols,
              height: rowHeight,
              color: rgb(0.9, 0.9, 0.9),
            })
          }
          
          for (let colIndex = 0; colIndex < maxCols; colIndex++) {
            const cellValue = row[colIndex]?.toString() || ''
            const x = margin + colIndex * colWidth
            
            page.drawRectangle({
              x,
              y: y - rowHeight + cellPadding,
              width: colWidth,
              height: rowHeight,
              borderColor: rgb(0.7, 0.7, 0.7),
              borderWidth: 0.5,
            })
            
            let displayText = cellValue
            const maxChars = Math.floor(colWidth / (fontSize * 0.5))
            if (displayText.length > maxChars) {
              displayText = displayText.substring(0, maxChars - 2) + '..'
            }
            
            page.drawText(displayText, {
              x: x + cellPadding,
              y: y - fontSize,
              size: fontSize,
              font: rowIndex === 0 ? boldFont : font,
              color: rgb(0, 0, 0),
            })
          }
          
          y -= rowHeight
        }
      }
      
      setProgress(90)
      
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const originalName = files[0].name.replace(/\.(xlsx?|xls|csv)$/i, '')
      saveAs(blob, `${originalName}.pdf`)
      
      setProgress(100)
    } catch (error) {
      console.error('Error converting:', error)
      alert('Error converting Excel file. Please make sure it is a valid Excel file.')
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
                  Excel to PDF
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert Excel spreadsheets to PDF format with table formatting preserved.
                </p>
              </div>

              <AdBanner slot="excel-pdf-top" className="mb-8" />

              <div className="bg-card rounded-2xl border border-border p-6 md:p-8">
                <FileUploader
                  accept={{ 
                    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
                    'application/vnd.ms-excel': ['.xls'],
                    'text/csv': ['.csv'],
                  }}
                  maxFiles={1}
                  onFilesSelected={handleFilesSelected}
                  files={files}
                  onRemoveFile={handleRemoveFile}
                  title="Drop an Excel file here"
                  description=".xlsx, .xls, .csv files supported"
                />

                {files.length > 0 && (
                  <div className="mt-6">
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
                          Convert to PDF
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              <AdBanner slot="excel-pdf-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert Excel to PDF</h2>
                <p>
                  Transform your Excel spreadsheets into PDF format. Our converter preserves
                  your table structure and formatting for professional results.
                </p>
                <h3>Supported Formats</h3>
                <ul>
                  <li><strong>.xlsx:</strong> Modern Excel format</li>
                  <li><strong>.xls:</strong> Legacy Excel format</li>
                  <li><strong>.csv:</strong> Comma-separated values</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="excel-pdf-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
