// Utilities for generating programmatic SEO pages

export type PageVariant = 'modifier' | 'country' | 'industry' | 'combined'

export interface ProgrammaticPageParams {
  toolId: string
  modifier?: string // e.g., 'free', 'online'
  country?: string // e.g., 'pakistan', 'india'
  industry?: string // e.g., 'lawyers', 'students'
  variant: PageVariant
}

export interface PageMetadata {
  title: string
  description: string
  keywords: string[]
  canonicalUrl: string
  hreflangTags?: Array<{ lang: string; url: string }>
}

/**
 * Generate modifier-based URL
 * Example: /tools/merge-pdf-free
 */
export function generateModifierUrl(toolId: string, modifierSlug: string): string {
  return `/tools/${toolId}-${modifierSlug}`
}

/**
 * Generate country-based URL
 * Example: /pdf-tools-pakistan/merge-pdf
 */
export function generateCountryUrl(countrySlug: string, toolId: string): string {
  return `/pdf-tools-${countrySlug}/${toolId}`
}

/**
 * Generate country-based URL with modifier
 * Example: /pdf-tools-pakistan/merge-pdf-free
 */
export function generateCountryModifierUrl(countrySlug: string, toolId: string, modifierSlug: string): string {
  return `/pdf-tools-${countrySlug}/${toolId}-${modifierSlug}`
}

/**
 * Generate industry-based URL
 * Example: /pdf-tools-for-lawyers/merge-pdf
 */
export function generateIndustryUrl(industrySlug: string, toolId: string): string {
  return `/pdf-tools-for-${industrySlug}/${toolId}`
}

/**
 * Generate industry-based URL with modifier
 * Example: /pdf-tools-for-lawyers/merge-pdf-free
 */
export function generateIndustryModifierUrl(industrySlug: string, toolId: string, modifierSlug: string): string {
  return `/pdf-tools-for-${industrySlug}/${toolId}-${modifierSlug}`
}

/**
 * Get canonical URL (main tool page)
 */
export function getCanonicalUrl(toolId: string, baseUrl: string = 'https://www.pdfilio.com'): string {
  return `${baseUrl}/tools/${toolId}`
}

/**
 * Generate modifier page metadata
 */
export function generateModifierPageMetadata(
  toolName: string,
  toolId: string,
  modifierName: string,
  modifierKeyword: string,
  baseUrl: string = 'https://www.pdfilio.com'
): PageMetadata {
  const url = generateModifierUrl(toolId, modifierKeyword)
  return {
    title: `${modifierName} ${toolName} Tool | PDFilio`,
    description: `${modifierName} ${toolName} tool. ${modifierKeyword.charAt(0).toUpperCase() + modifierKeyword.slice(1)}, fast, and secure online ${toolName} processing.`,
    keywords: [
      `${modifierKeyword} ${toolName}`,
      `${modifierKeyword} ${toolName.toLowerCase()}`,
      `best ${modifierKeyword} ${toolName.toLowerCase()}`,
    ],
    canonicalUrl: getCanonicalUrl(toolId, baseUrl),
  }
}

/**
 * Generate country page metadata
 */
export function generateCountryPageMetadata(
  toolName: string,
  toolId: string,
  countryName: string,
  countryCode: string,
  baseUrl: string = 'https://www.pdfilio.com'
): PageMetadata {
  const url = generateCountryUrl(countryName.toLowerCase().replace(/\s/g, '-'), toolId)
  return {
    title: `${toolName} in ${countryName} | Free ${toolName} Tool | PDFilio`,
    description: `${toolName} for ${countryName}. Fast, secure, and easy to use online ${toolName} tool. Popular in ${countryName}.`,
    keywords: [
      `${toolName} ${countryName}`,
      `${toolName.toLowerCase()} ${countryName.toLowerCase()}`,
      `free ${toolName} in ${countryName}`,
    ],
    canonicalUrl: getCanonicalUrl(toolId, baseUrl),
    hreflangTags: [
      { lang: 'en', url: `${baseUrl}${url}` },
      { lang: `en-${countryCode}`, url: `${baseUrl}${url}` },
      { lang: 'x-default', url: getCanonicalUrl(toolId, baseUrl) },
    ],
  }
}

/**
 * Generate industry page metadata
 */
export function generateIndustryPageMetadata(
  toolName: string,
  toolId: string,
  industryName: string,
  industrySlug: string,
  baseUrl: string = 'https://www.pdfilio.com'
): PageMetadata {
  const url = generateIndustryUrl(industrySlug, toolId)
  return {
    title: `${toolName} for ${industryName} | Professional PDF Tools | PDFilio`,
    description: `${toolName} designed for ${industryName}. Streamline your workflow with our professional ${toolName.toLowerCase()} tool.`,
    keywords: [
      `${toolName} for ${industryName.toLowerCase()}`,
      `professional ${toolName.toLowerCase()}`,
      `${industryName} ${toolName.toLowerCase()}`,
    ],
    canonicalUrl: getCanonicalUrl(toolId, baseUrl),
  }
}

/**
 * Generate all variants for a tool
 */
export function generateAllVariantsForTool(
  toolId: string,
  toolName: string,
  modifiers: Array<{ slug: string; name: string; keyword: string }>,
  countries: Array<{ slug: string; name: string; code: string }>,
  industries: Array<{ slug: string; name: string }>,
  baseUrl?: string
) {
  const variants = []

  // Modifier variants
  for (const mod of modifiers) {
    variants.push({
      url: generateModifierUrl(toolId, mod.slug),
      metadata: generateModifierPageMetadata(toolName, toolId, mod.name, mod.keyword, baseUrl),
      type: 'modifier',
    })
  }

  // Country variants
  for (const country of countries) {
    variants.push({
      url: generateCountryUrl(country.slug, toolId),
      metadata: generateCountryPageMetadata(toolName, toolId, country.name, country.code, baseUrl),
      type: 'country',
    })
  }

  // Industry variants
  for (const industry of industries) {
    variants.push({
      url: generateIndustryUrl(industry.slug, toolId),
      metadata: generateIndustryPageMetadata(toolName, toolId, industry.name, industry.slug, baseUrl),
      type: 'industry',
    })
  }

  return variants
}
