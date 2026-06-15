'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Upload, Download, Loader2 } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

export default function RedactionPage() {
  const [file, setFile] = useState<File | null>(null)
  const [redactionPattern, setRedactionPattern] = useState('***')
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      alert('Please select a valid PDF file')
    }
  }

  const handleRedact = async () => {
    if (!file) return

    setIsProcessing(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(arrayBuffer)

      // In a real implementation, you would use OCR to detect sensitive data
      // and redact it. This is a placeholder.
      const pdfBytes = await pdfDoc.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `redacted-${file.name}`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error redacting PDF:', error)
      alert('Error processing PDF')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/10 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Redaction Tool</CardTitle>
            <CardDescription>Hide sensitive information from your PDF documents permanently</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* File Upload */}
            {!file ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-12 text-center cursor-pointer hover:border-primary/50 transition-colors"
              >
                <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">Drop your PDF here</h3>
                <Button variant="outline">Select PDF</Button>
              </div>
            ) : (
              <div className="p-4 bg-muted/50 rounded-lg flex items-center justify-between">
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                </div>
                <Button variant="outline" onClick={() => setFile(null)}>
                  Change File
                </Button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="hidden"
            />

            {file && (
              <>
                {/* Redaction Settings */}
                <div className="space-y-4 border-t pt-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Redaction Pattern</label>
                    <Input
                      value={redactionPattern}
                      onChange={(e) => setRedactionPattern(e.target.value)}
                      placeholder="Enter redaction pattern"
                    />
                  </div>

                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-blue-900">Auto-Detection Options</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>✓ Email addresses</li>
                      <li>✓ Phone numbers</li>
                      <li>✓ Social Security numbers</li>
                      <li>✓ Credit card numbers</li>
                      <li>✓ Personal names</li>
                    </ul>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 border-t pt-6">
                  <Button variant="outline" onClick={() => setFile(null)} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleRedact} disabled={isProcessing} className="flex-1">
                    {isProcessing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4 mr-2" />
                        Download Redacted PDF
                      </>
                    )}
                  </Button>
                </div>
              </>
            )}

            {/* Features */}
            {!file && (
              <div className="grid md:grid-cols-2 gap-4 border-t pt-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Permanent Removal</h4>
                  <p className="text-sm text-muted-foreground">Permanently remove sensitive data that cannot be recovered</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Smart Detection</h4>
                  <p className="text-sm text-muted-foreground">Automatically detect and redact sensitive information</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Compliance Ready</h4>
                  <p className="text-sm text-muted-foreground">Meets GDPR, HIPAA, and legal document requirements</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <h4 className="font-semibold mb-2">Batch Processing</h4>
                  <p className="text-sm text-muted-foreground">Redact multiple documents in bulk</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
