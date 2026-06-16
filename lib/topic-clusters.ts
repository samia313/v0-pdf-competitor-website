// Topic cluster definitions for PDFilio silos
export interface Silo {
  id: string
  name: string
  slug: string
  description: string
  keywords: string[]
  tools: string[]
  hubPath: string
}

export const silos: Record<string, Silo> = {
  'pdf-tools': {
    id: 'pdf-tools',
    name: 'PDF Tools',
    slug: 'pdf-tools',
    description: 'Core PDF manipulation and editing tools for combining, splitting, compressing, and organizing PDF documents.',
    keywords: ['pdf tools', 'merge pdf', 'split pdf', 'compress pdf', 'pdf editor', 'pdf converter'],
    tools: [
      'merge-pdf',
      'split-pdf',
      'compress-pdf',
      'rotate-pdf',
      'remove-pages',
      'organize-pdf',
      'add-page-numbers',
      'add-watermark',
      'edit-pdf',
      'protect-pdf',
      'unlock-pdf',
      'crop-pdf',
    ],
    hubPath: '/tools/pdf-tools'
  },
  'ai-pdf-tools': {
    id: 'ai-pdf-tools',
    name: 'AI PDF Tools',
    slug: 'ai-pdf-tools',
    description: 'Artificial intelligence-powered PDF tools for analysis, summarization, translation, and intelligent document processing.',
    keywords: ['ai pdf', 'pdf ai', 'pdf summarizer', 'pdf chat', 'pdf analysis', 'ai document', 'ocr pdf'],
    tools: [
      'chat-with-pdf',
      'pdf-summarizer',
      'pdf-quiz-generator',
      'pdf-notes-generator',
      'ai-contract-reader',
      'pdf-translation',
      'ai-summarizer',
      'ocr-text-extraction',
    ],
    hubPath: '/tools/ai-pdf-tools'
  },
  'resume-tools': {
    id: 'resume-tools',
    name: 'Resume Tools',
    slug: 'resume-tools',
    description: 'Professional resume and career tools including resume analyzer, builder, and cover letter generator.',
    keywords: ['resume', 'resume analyzer', 'cover letter', 'job application', 'career', 'hiring'],
    tools: [
      'resume-analyzer',
      'resume-builder',
      'cover-letter-generator',
    ],
    hubPath: '/tools/resume-tools'
  },
  'business-tools': {
    id: 'business-tools',
    name: 'Business Tools',
    slug: 'business-tools',
    description: 'Business document generation tools for creating professional invoices, proposals, and business documents.',
    keywords: ['business tools', 'invoice generator', 'proposal generator', 'business documents', 'invoicing'],
    tools: [
      'invoice-generator',
      'business-proposal-generator',
    ],
    hubPath: '/tools/business-tools'
  }
}

export function getSilo(siloId: string): Silo | undefined {
  return silos[siloId]
}

export function getToolSilo(toolId: string): Silo | undefined {
  return Object.values(silos).find(silo => silo.tools.includes(toolId))
}

export function getRelatedTools(toolId: string, limit: number = 5): string[] {
  const silo = getToolSilo(toolId)
  if (!silo) return []
  
  return silo.tools.filter(t => t !== toolId).slice(0, limit)
}

export function getAllSilos(): Silo[] {
  return Object.values(silos)
}

export function getSiloTools(siloId: string): string[] {
  const silo = silos[siloId]
  return silo ? silo.tools : []
}
