import type { Metadata } from 'next'
import CompressPdfClient from './compress-pdf-client'

const BASE_URL = 'https://www.pdfilio.com'

export const metadata: Metadata = {
  title: 'Compress PDF Online | Reduce PDF File Size | PDFilio',
  description: 'Compress PDF files online and reduce file size for email, uploads, and storage while preserving document quality.',
  alternates: {
    canonical: `${BASE_URL}/tools/compress-pdf`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Compress PDF Online | Reduce PDF File Size | PDFilio',
    description: 'Compress PDF files online and reduce file size for email, uploads, and storage while preserving document quality.',
    url: `${BASE_URL}/tools/compress-pdf`,
    type: 'website',
  },
}

export default function CompressPdfPage() {
  return <CompressPdfClient />
}
