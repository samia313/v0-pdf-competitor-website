export interface ToolSchema {
  toolId: string
  toolName: string
  description: string
  url: string
  category: string
  faqs: Array<{ question: string; answer: string }>
  steps: Array<{ position: number; name: string; text: string }>
}

export function generateSoftwareApplicationSchema(tool: ToolSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.toolName,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'Productivity',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2500',
      bestRating: '5',
      worstRating: '1'
    }
  }
}

export function generateFAQSchema(tool: ToolSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: tool.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}

export function generateBreadcrumbSchema(toolName: string, toolId: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.pdfilio.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: 'https://www.pdfilio.com/tools'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: toolName,
        item: `https://www.pdfilio.com/tools/${toolId}`
      }
    ]
  }
}

export function generateHowToSchema(tool: ToolSchema) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: `How to ${tool.toolName}`,
    description: `Step by step guide on how to use ${tool.toolName}`,
    totalTime: 'PT5M',
    step: tool.steps.map(step => ({
      '@type': 'HowToStep',
      position: step.position,
      name: step.name,
      text: step.text
    }))
  }
}

export function generateAllSchemas(tool: ToolSchema) {
  return [
    generateSoftwareApplicationSchema(tool),
    generateFAQSchema(tool),
    generateBreadcrumbSchema(tool.toolName, tool.toolId),
    generateHowToSchema(tool)
  ]
}

export interface SiloData {
  siloId: string
  siloName: string
  siloDescription: string
  url: string
  tools: Array<{ name: string; url: string }>
}

export function generateCollectionSchema(silo: SiloData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Collection',
    name: `${silo.siloName} Collection`,
    description: silo.siloDescription,
    url: silo.url,
    hasPart: silo.tools.map((tool, index) => ({
      '@type': 'SoftwareApplication',
      position: index + 1,
      name: tool.name,
      url: tool.url,
      applicationCategory: 'Productivity',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }))
  }
}

export function generateOrganizationSchema(silo: SiloData) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: `PDFilio ${silo.siloName}`,
    description: silo.siloDescription,
    url: silo.url,
    areaServed: 'Worldwide',
    knowsAbout: silo.tools.map(tool => tool.name)
  }
}
