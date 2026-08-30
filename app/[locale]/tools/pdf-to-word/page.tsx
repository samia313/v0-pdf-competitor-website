import type { Metadata } from 'next'
import PdfToWordClient from './pdf-to-word-client'

const BASE_URL = 'https://www.pdfilio.com'

export const metadata: Metadata = {
  title: 'PDF to Word Converter Online | PDF to DOCX | PDFilio',
  description: 'Convert PDF files to editable Word DOCX documents online. Fast browser-based PDF to Word conversion with a simple download workflow.',
  alternates: { canonical: `${BASE_URL}/tools/pdf-to-word` },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'PDF to Word Converter Online | PDF to DOCX | PDFilio',
    description: 'Convert PDF files to editable Word DOCX documents online with PDFilio.',
    url: `${BASE_URL}/tools/pdf-to-word`,
    type: 'website',
  },
}

export default function PdfToWordPage() {
  return <PdfToWordClient />
}
