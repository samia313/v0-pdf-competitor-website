import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Conversion Guide | Convert PDF to Any Format | PDFilio',
  description: 'Complete PDF conversion guides. Learn how to convert PDF to Word, Excel, PowerPoint, images and more without losing quality or formatting.',
  keywords: 'PDF conversion, convert PDF, PDF to Word, Word to PDF, format conversion, file conversion',
}

export default function PDFConversionLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
