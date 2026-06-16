// Blog content clusters for topical authority
export interface BlogCluster {
  id: string
  name: string
  slug: string
  description: string
  longDescription: string
  keywords: string[]
  articleCount: number
  hubPath: string
  color: string // Tailwind color
}

export const blogClusters: Record<string, BlogCluster> = {
  'pdf-conversion': {
    id: 'pdf-conversion',
    name: 'PDF Conversion',
    slug: 'pdf-conversion',
    description: 'Complete guides on converting PDFs to and from other formats.',
    longDescription: 'Master PDF conversion with our comprehensive collection of guides covering Word, Excel, PowerPoint, images, and more. Learn best practices for maintaining formatting and compatibility across all file types.',
    keywords: ['PDF conversion', 'convert PDF', 'PDF to Word', 'Word to PDF', 'format conversion', 'file conversion'],
    articleCount: 50,
    hubPath: '/blog/pdf-conversion',
    color: 'blue'
  },
  'pdf-editing': {
    id: 'pdf-editing',
    name: 'PDF Editing',
    slug: 'pdf-editing',
    description: 'How-to guides for editing, managing, and manipulating PDF documents.',
    longDescription: 'Learn how to merge, split, rotate, compress, protect, and organize PDF documents. Complete tutorials on every PDF editing task from adding page numbers to extracting pages.',
    keywords: ['PDF editing', 'merge PDF', 'split PDF', 'compress PDF', 'PDF tools', 'document management'],
    articleCount: 50,
    hubPath: '/blog/pdf-editing',
    color: 'purple'
  },
  'ai-pdf': {
    id: 'ai-pdf',
    name: 'AI PDF Tools',
    slug: 'ai-pdf',
    description: 'AI-powered document analysis, summarization, and intelligent processing.',
    longDescription: 'Explore cutting-edge AI capabilities for PDFs. Learn to chat with documents, summarize with AI, extract information, translate content, and automate document analysis with machine learning.',
    keywords: ['AI PDF', 'PDF AI', 'document AI', 'AI summarizer', 'PDF analysis', 'OCR', 'document extraction'],
    articleCount: 50,
    hubPath: '/blog/ai-pdf',
    color: 'emerald'
  },
  'resume-career': {
    id: 'resume-career',
    name: 'Resume & Career',
    slug: 'resume-career',
    description: 'Resume optimization, ATS systems, and job application strategies.',
    longDescription: 'Optimize your resume for ATS systems, build standout applications, and land your dream job. Learn formatting best practices, keyword optimization, cover letter writing, and career application strategies.',
    keywords: ['ATS resume', 'resume optimization', 'resume builder', 'cover letter', 'job application', 'career'],
    articleCount: 50,
    hubPath: '/blog/resume-career',
    color: 'amber'
  }
}

export function getCluster(clusterId: string): BlogCluster | undefined {
  return blogClusters[clusterId]
}

export function getClusterBySlug(slug: string): BlogCluster | undefined {
  return Object.values(blogClusters).find(c => c.slug === slug)
}

export function getAllClusters(): BlogCluster[] {
  return Object.values(blogClusters)
}

export function getClusterArticleCount(clusterId: string): number {
  const cluster = blogClusters[clusterId]
  return cluster ? cluster.articleCount : 0
}

export function getRelatedClusters(clusterId: string, limit: number = 3): BlogCluster[] {
  return Object.values(blogClusters)
    .filter(c => c.id !== clusterId)
    .slice(0, limit)
}

export const clusterBreadcrumbs = {
  'pdf-conversion': { parent: 'Blog', parentUrl: '/blog', current: 'PDF Conversion' },
  'pdf-editing': { parent: 'Blog', parentUrl: '/blog', current: 'PDF Editing' },
  'ai-pdf': { parent: 'Blog', parentUrl: '/blog', current: 'AI PDF Tools' },
  'resume-career': { parent: 'Blog', parentUrl: '/blog', current: 'Resume & Career' }
}
