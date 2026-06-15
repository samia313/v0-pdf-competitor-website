import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AI PDF Tools Guide | Chat, Summarize & Analyze PDFs with AI | PDFilio',
  description: 'Learn to use AI for PDF analysis, summarization, translation, and intelligent document processing. Complete guides on cutting-edge AI PDF tools.',
  keywords: 'AI PDF, PDF AI, AI summarizer, PDF analysis, OCR, document extraction, AI tools',
}

export default function AIPDFLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
