import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Tools | Merge, Split, Compress & Edit PDFs Free | PDFilio',
  description: 'Complete collection of free PDF tools. Merge, split, compress, rotate, edit and organize PDF documents online without software.',
  keywords: 'pdf tools, merge pdf, split pdf, compress pdf, pdf editor, pdf converter',
}

export default function SiloLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
