import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDF Editing Guide | Merge, Split, Compress & Edit PDFs | PDFilio',
  description: 'Complete PDF editing guides. Learn how to merge, split, compress, rotate, and edit PDF documents. Step-by-step tutorials for all PDF editing tasks.',
  keywords: 'PDF editing, merge PDF, split PDF, compress PDF, edit PDF, PDF tools',
}

export default function PDFEditingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
