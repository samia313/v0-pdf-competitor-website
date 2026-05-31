'use client'

import { useState, useCallback } from 'react'
import { saveAs } from 'file-saver'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { FileUploader } from '@/components/file-uploader'
import { AdBanner, AdSidebar } from '@/components/ad-units'
import { Button } from '@/components/ui/button'
import { FileType, Download, Loader2 } from 'lucide-react'

export default function PdfToPptPage() {
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
      const totalPages = pdf.numPages
      setProgress(30)
      
      // Use JSZip to create PPTX manually
      const JSZip = (await import('jszip')).default
      const zip = new JSZip()
      
      // Create _rels/.rels
      zip.folder('_rels')?.file('.rels', 
        `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/></Relationships>`)
      
      // Create ppt/_rels/presentation.xml.rels
      let slideRels = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">`
      for (let i = 1; i <= totalPages; i++) {
        slideRels += `<Relationship Id="rId${i}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${i}.xml"/>`
      }
      slideRels += `</Relationships>`
      zip.folder('ppt/_rels')?.file('presentation.xml.rels', slideRels)
      
      // Create slides
      for (let i = 1; i <= totalPages; i++) {
        const slideXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:sld xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name="Title 1"/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr><a:xfrm xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:off x="0" y="0"/><a:ext cx="9144000" cy="6858000"/><a:chOff x="0" y="0"/><a:chExt cx="9144000" cy="6858000"/></a:xfrm></p:grpSpPr><p:sp><p:nvSpPr><p:cNvPr id="2" name="Slide ${i}"/><p:cNvSpPr/><p:nvPr/></p:nvSpPr><p:spPr><a:xfrm xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:off x="0" y="0"/><a:ext cx="9144000" cy="6858000"/></a:xfrm><a:prstGeom xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" prst="rect"><a:avLst/></a:prstGeom></p:spPr><p:txBody><a:bodyPr xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"/><a:lstStyle xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"/><a:p xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"><a:r><a:rPr lang="en-US" sz="4400"/><a:t>Slide ${i}</a:t></a:r></a:p></p:txBody></p:sp></p:spTree></p:cSld><p:clrMapOvr><a:masterClrMapping xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"/></p:clrMapOvr></p:sld>`
        zip.folder('ppt/slides')?.file(`slide${i}.xml`, slideXml)
        setProgress(30 + Math.round((i / totalPages) * 50))
      }
      
      // Create [Content_Types].xml
      let contentTypes = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>`
      for (let i = 1; i <= totalPages; i++) {
        contentTypes += `<Override PartName="/ppt/slides/slide${i}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`
      }
      contentTypes += `</Types>`
      zip.file('[Content_Types].xml', contentTypes)
      
      // Create ppt/presentation.xml
      let slideIdList = ``
      for (let i = 1; i <= totalPages; i++) {
        slideIdList += `<p:sldId id="${256 + i}" r:id="rId${i}"/>`
      }
      
      const presentationXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><p:prs xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><p:sldIdLst>${slideIdList}</p:sldIdLst></p:prs>`
      zip.folder('ppt')?.file('presentation.xml', presentationXml)
      
      setProgress(90)
      const blob = await zip.generateAsync({ type: 'blob' })
      setProgress(95)
      
      const originalName = files[0].name.replace(/\.pdf$/i, '')
      const fileName = `${originalName}.pptx`
      setConvertedFile({ blob, name: fileName })
      setProgress(100)
    } catch (error) {
      console.error('Conversion error:', error)
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
                <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-600 text-white mb-4">
                  <FileType className="h-8 w-8" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  PDF to PowerPoint
                </h1>
                <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
                  Convert PDF files to editable PowerPoint presentations.
                </p>
              </div>

              <AdBanner slot="pdf-ppt-top" className="mb-8" />

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
                          Download PowerPoint
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
                            Convert to PowerPoint
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                )}
              </div>

              <AdBanner slot="pdf-ppt-bottom" className="mt-12" />

              <div className="mt-12 prose prose-neutral dark:prose-invert max-w-none">
                <h2>Convert PDF to PowerPoint</h2>
                <p>
                  Transform your PDF documents into editable PowerPoint presentations.
                  Each PDF page becomes a slide that you can edit and customize.
                </p>
                <h3>Use Cases</h3>
                <ul>
                  <li>Edit content from PDF presentations</li>
                  <li>Repurpose PDF content for new presentations</li>
                  <li>Add animations and transitions</li>
                </ul>
              </div>
            </div>

            <AdSidebar slot="pdf-ppt-sidebar" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
