import type { Metadata } from 'next'
import SplitPdfClient from './split-pdf-client'

export const metadata: Metadata = {
  title: 'Split PDF Online | Extract PDF Pages | PDFilio',
  description: 'Split a PDF into individual pages or extract selected pages online. Fast, simple and secure PDF splitting with PDFilio.',
  alternates: { canonical: 'https://www.pdfilio.com/tools/split-pdf' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Split PDF Online | Extract PDF Pages | PDFilio',
    description: 'Split a PDF into individual pages or extract selected pages online with PDFilio.',
    url: 'https://www.pdfilio.com/tools/split-pdf',
    type: 'website',
  },
}

export default function SplitPdfPage() {
  return <SplitPdfClient />
}
