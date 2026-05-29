import { PDFDocument, rgb, StandardFonts, degrees } from 'pdf-lib'

// Merge multiple PDFs into one
export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create()
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const pdf = await PDFDocument.load(arrayBuffer)
    const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())
    pages.forEach((page) => mergedPdf.addPage(page))
  }
  
  return mergedPdf.save()
}

// Split PDF by page ranges
export async function splitPDF(
  file: File,
  ranges: { start: number; end: number }[]
): Promise<Uint8Array[]> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const results: Uint8Array[] = []
  
  for (const range of ranges) {
    const newPdf = await PDFDocument.create()
    const pageIndices = []
    for (let i = range.start - 1; i < range.end && i < pdf.getPageCount(); i++) {
      pageIndices.push(i)
    }
    const pages = await newPdf.copyPages(pdf, pageIndices)
    pages.forEach((page) => newPdf.addPage(page))
    results.push(await newPdf.save())
  }
  
  return results
}

// Extract specific pages from PDF
export async function extractPages(file: File, pageNumbers: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const newPdf = await PDFDocument.create()
  
  const pageIndices = pageNumbers.map((n) => n - 1).filter((i) => i >= 0 && i < pdf.getPageCount())
  const pages = await newPdf.copyPages(pdf, pageIndices)
  pages.forEach((page) => newPdf.addPage(page))
  
  return newPdf.save()
}

// Remove pages from PDF
export async function removePages(file: File, pagesToRemove: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const newPdf = await PDFDocument.create()
  
  const allPages = pdf.getPageIndices()
  const pageIndicesToKeep = allPages.filter((i) => !pagesToRemove.includes(i + 1))
  const pages = await newPdf.copyPages(pdf, pageIndicesToKeep)
  pages.forEach((page) => newPdf.addPage(page))
  
  return newPdf.save()
}

// Compress PDF (reduce quality)
export async function compressPDF(file: File, quality: 'low' | 'medium' | 'high' = 'medium'): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  
  // Basic compression by removing metadata and optimizing
  pdf.setTitle('')
  pdf.setAuthor('')
  pdf.setSubject('')
  pdf.setKeywords([])
  pdf.setProducer('')
  pdf.setCreator('')
  
  return pdf.save({
    useObjectStreams: true,
    addDefaultPage: false,
  })
}

// Rotate PDF pages
export async function rotatePDF(
  file: File,
  rotation: 90 | 180 | 270,
  pageNumbers?: number[]
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const pages = pdf.getPages()
  
  pages.forEach((page, index) => {
    if (!pageNumbers || pageNumbers.includes(index + 1)) {
      const currentRotation = page.getRotation().angle
      page.setRotation(degrees(currentRotation + rotation))
    }
  })
  
  return pdf.save()
}

// Add watermark to PDF
export async function addWatermark(
  file: File,
  text: string,
  options: {
    fontSize?: number
    opacity?: number
    color?: { r: number; g: number; b: number }
    rotation?: number
    position?: 'center' | 'diagonal'
  } = {}
): Promise<Uint8Array> {
  const {
    fontSize = 50,
    opacity = 0.3,
    color = { r: 0.5, g: 0.5, b: 0.5 },
    rotation = -45,
    position = 'diagonal',
  } = options
  
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const font = await pdf.embedFont(StandardFonts.HelveticaBold)
  const pages = pdf.getPages()
  
  for (const page of pages) {
    const { width, height } = page.getSize()
    const textWidth = font.widthOfTextAtSize(text, fontSize)
    
    let x = (width - textWidth) / 2
    let y = height / 2
    
    if (position === 'diagonal') {
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(color.r, color.g, color.b),
        opacity,
        rotate: degrees(rotation),
      })
    } else {
      page.drawText(text, {
        x,
        y,
        size: fontSize,
        font,
        color: rgb(color.r, color.g, color.b),
        opacity,
      })
    }
  }
  
  return pdf.save()
}

// Protect PDF with password
export async function protectPDF(file: File, password: string): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  
  return pdf.save({
    userPassword: password,
    ownerPassword: password,
  })
}

// Add page numbers to PDF
export async function addPageNumbers(
  file: File,
  options: {
    position?: 'bottom-center' | 'bottom-right' | 'bottom-left' | 'top-center' | 'top-right' | 'top-left'
    fontSize?: number
    startFrom?: number
    format?: 'number' | 'page-x-of-y'
  } = {}
): Promise<Uint8Array> {
  const {
    position = 'bottom-center',
    fontSize = 12,
    startFrom = 1,
    format = 'number',
  } = options
  
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const font = await pdf.embedFont(StandardFonts.Helvetica)
  const pages = pdf.getPages()
  const totalPages = pages.length
  
  pages.forEach((page, index) => {
    const { width, height } = page.getSize()
    const pageNum = index + startFrom
    
    let text = format === 'page-x-of-y' ? `Page ${pageNum} of ${totalPages}` : `${pageNum}`
    const textWidth = font.widthOfTextAtSize(text, fontSize)
    
    let x: number
    let y: number
    
    switch (position) {
      case 'bottom-left':
        x = 40
        y = 30
        break
      case 'bottom-right':
        x = width - textWidth - 40
        y = 30
        break
      case 'top-left':
        x = 40
        y = height - 30
        break
      case 'top-right':
        x = width - textWidth - 40
        y = height - 30
        break
      case 'top-center':
        x = (width - textWidth) / 2
        y = height - 30
        break
      default:
        x = (width - textWidth) / 2
        y = 30
    }
    
    page.drawText(text, {
      x,
      y,
      size: fontSize,
      font,
      color: rgb(0, 0, 0),
    })
  })
  
  return pdf.save()
}

// Convert images to PDF
export async function imagesToPDF(files: File[]): Promise<Uint8Array> {
  const pdf = await PDFDocument.create()
  
  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer()
    const uint8Array = new Uint8Array(arrayBuffer)
    
    let image
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdf.embedJpg(uint8Array)
    } else if (file.type === 'image/png') {
      image = await pdf.embedPng(uint8Array)
    } else {
      continue
    }
    
    const { width, height } = image
    const page = pdf.addPage([width, height])
    page.drawImage(image, {
      x: 0,
      y: 0,
      width,
      height,
    })
  }
  
  return pdf.save()
}

// Get PDF info
export async function getPDFInfo(file: File): Promise<{
  pageCount: number
  title?: string
  author?: string
}> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  
  return {
    pageCount: pdf.getPageCount(),
    title: pdf.getTitle(),
    author: pdf.getAuthor(),
  }
}

// Reorder PDF pages
export async function reorderPages(file: File, newOrder: number[]): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  const newPdf = await PDFDocument.create()
  
  const pageIndices = newOrder.map((n) => n - 1).filter((i) => i >= 0 && i < pdf.getPageCount())
  const pages = await newPdf.copyPages(pdf, pageIndices)
  pages.forEach((page) => newPdf.addPage(page))
  
  return newPdf.save()
}

// Add signature to PDF
export async function addSignature(
  file: File,
  signatureDataUrl: string,
  pageNumber: number,
  position: { x: number; y: number; width: number; height: number }
): Promise<Uint8Array> {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await PDFDocument.load(arrayBuffer)
  
  // Convert base64 to bytes
  const base64Data = signatureDataUrl.split(',')[1]
  const signatureBytes = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0))
  
  const signatureImage = await pdf.embedPng(signatureBytes)
  const pages = pdf.getPages()
  const page = pages[pageNumber - 1]
  
  if (page) {
    page.drawImage(signatureImage, {
      x: position.x,
      y: position.y,
      width: position.width,
      height: position.height,
    })
  }
  
  return pdf.save()
}

// Download helper
export function downloadPDF(data: Uint8Array, filename: string) {
  const blob = new Blob([data], { type: 'application/pdf' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// Download as ZIP (for multiple files)
export async function downloadAsZip(files: { data: Uint8Array; name: string }[], zipName: string) {
  const JSZip = (await import('jszip')).default
  const zip = new JSZip()
  
  files.forEach(({ data, name }) => {
    zip.file(name, data)
  })
  
  const content = await zip.generateAsync({ type: 'blob' })
  const url = URL.createObjectURL(content)
  const a = document.createElement('a')
  a.href = url
  a.download = zipName
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
