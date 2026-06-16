import { Locale, getAllLocales } from './locale-utils'

export interface AlternateLink {
  hrefLang: string
  href: string
}

/**
 * Generate hreflang tags for multilingual SEO
 * @param locale Current locale code
 * @param pathname Current page path (without locale prefix)
 * @param baseUrl Site base URL (e.g., https://pdfilio.com)
 * @returns Array of alternate links for hreflang
 */
export function generateHreflangs(
  locale: Locale,
  pathname: string,
  baseUrl: string
): AlternateLink[] {
  const alternates: AlternateLink[] = []
  const allLocales = getAllLocales()

  // Add links for all language variants
  allLocales.forEach(loc => {
    const href = `${baseUrl}/${loc}${pathname === '/' ? '' : pathname}`
    alternates.push({
      hrefLang: loc === 'zh' ? 'zh-CN' : `${loc}`,
      href
    })
  })

  // Add x-default for English
  alternates.push({
    hrefLang: 'x-default',
    href: `${baseUrl}/en${pathname === '/' ? '' : pathname}`
  })

  return alternates
}

/**
 * Generate metadata for multilingual pages
 */
export function generateMultilingualMetadata(
  baseTitle: string,
  baseDescription: string,
  locale: Locale,
  pathname: string,
  baseUrl: string
) {
  const alternates = generateHreflangs(locale, pathname, baseUrl)

  return {
    title: baseTitle,
    description: baseDescription,
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url: `${baseUrl}/${locale}${pathname === '/' ? '' : pathname}`,
      locale: locale === 'zh' ? 'zh_CN' : locale,
      alternateLocale: getAllLocales()
        .filter(l => l !== locale)
        .map(l => (l === 'zh' ? 'zh_CN' : l))
    },
    alternates: {
      canonical: `${baseUrl}/${locale}${pathname === '/' ? '' : pathname}`,
      languages: alternates.reduce((acc, alt) => {
        acc[alt.hrefLang] = alt.href
        return acc
      }, {} as Record<string, string>)
    }
  }
}

/**
 * Create lang attribute for HTML element
 */
export function getHtmlLang(locale: Locale): string {
  const langMap: Record<Locale, string> = {
    en: 'en',
    ur: 'ur-PK',
    hi: 'hi-IN',
    es: 'es',
    fr: 'fr',
    de: 'de',
    ar: 'ar',
    pt: 'pt-BR',
    zh: 'zh-CN',
    ja: 'ja',
    ru: 'ru',
    it: 'it',
    nl: 'nl',
    ko: 'ko',
    tr: 'tr',
    vi: 'vi'
  }
  return langMap[locale] || 'en'
}

/**
 * Generate structured data (JSON-LD) for language alternatives
 */
export function generateLanguageAlternatives(
  pathname: string,
  baseUrl: string
): string {
  const alternates = generateHreflangs('en', pathname, baseUrl)

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    'inLanguage': getAllLocales().map(locale => getHtmlLang(locale as Locale)),
    'availableLanguage': alternates.map(alt => ({
      '@type': 'Language',
      '@id': `${baseUrl}/${alt.hrefLang}`,
      name: alt.hrefLang
    }))
  }

  return JSON.stringify(structuredData)
}

/**
 * Get locale from URL pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const allLocales = getAllLocales()
  const segments = pathname.split('/').filter(Boolean)
  const firstSegment = segments[0] as Locale

  if (allLocales.includes(firstSegment)) {
    return firstSegment
  }

  return 'en'
}

/**
 * Remove locale prefix from pathname
 */
export function removeLocalePrefix(pathname: string, locale: Locale): string {
  return pathname.startsWith(`/${locale}`) ? pathname.slice(locale.length + 1) : pathname
}

/**
 * Generate language switcher links
 */
export function generateLanguageSwitcherLinks(
  currentPathname: string,
  baseUrl: string
): Array<{ locale: Locale; href: string; label: string; nativeName: string }> {
  const allLocales = getAllLocales()
  const currentLocale = getLocaleFromPathname(currentPathname)
  const pathWithoutLocale = removeLocalePrefix(currentPathname, currentLocale)

  return allLocales.map(locale => ({
    locale,
    href: `${baseUrl}/${locale}${pathWithoutLocale}`,
    label: getHtmlLang(locale),
    nativeName: getNativeLanguageName(locale)
  }))
}

/**
 * Get native language name for display
 */
export function getNativeLanguageName(locale: Locale): string {
  const nameMap: Record<Locale, string> = {
    en: 'English',
    ur: 'اردو',
    hi: 'हिन्दी',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    ar: 'العربية',
    pt: 'Português',
    zh: '中文',
    ja: '日本語',
    ru: 'Русский',
    it: 'Italiano',
    nl: 'Nederlands',
    ko: '한국어',
    tr: 'Türkçe',
    vi: 'Tiếng Việt'
  }
  return nameMap[locale] || locale
}
