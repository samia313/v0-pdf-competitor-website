// Locale configuration and utilities
export type Locale = 'en' | 'ur' | 'hi' | 'es' | 'fr' | 'de' | 'ar' | 'pt' | 'zh' | 'ja' | 'ru' | 'it' | 'nl' | 'ko' | 'tr' | 'vi'

export interface LocaleConfig {
  code: Locale
  name: string
  nativeName: string
  direction: 'ltr' | 'rtl'
  currency: string
  currencyCode: string
  dateFormat: string
  timeFormat: string
  numberFormat: string
  decimalSeparator: string
  thousandsSeparator: string
}

export const localeConfigs: Record<Locale, LocaleConfig> = {
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    currency: '$',
    currencyCode: 'USD',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    numberFormat: 'en-US',
    decimalSeparator: '.',
    thousandsSeparator: ','
  },
  ur: {
    code: 'ur',
    name: 'Urdu',
    nativeName: 'اردو',
    direction: 'rtl',
    currency: 'Rs',
    currencyCode: 'PKR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'ur-PK',
    decimalSeparator: '.',
    thousandsSeparator: ','
  },
  hi: {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    direction: 'ltr',
    currency: '₹',
    currencyCode: 'INR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'hi-IN',
    decimalSeparator: '.',
    thousandsSeparator: ','
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    currency: '€',
    currencyCode: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'es-ES',
    decimalSeparator: ',',
    thousandsSeparator: '.'
  },
  fr: {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    direction: 'ltr',
    currency: '€',
    currencyCode: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'fr-FR',
    decimalSeparator: ',',
    thousandsSeparator: ' '
  },
  de: {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    direction: 'ltr',
    currency: '€',
    currencyCode: 'EUR',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: '24h',
    numberFormat: 'de-DE',
    decimalSeparator: ',',
    thousandsSeparator: '.'
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    currency: 'ر.س',
    currencyCode: 'SAR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'ar-SA',
    decimalSeparator: '٫',
    thousandsSeparator: '٬'
  },
  pt: {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    direction: 'ltr',
    currency: 'R$',
    currencyCode: 'BRL',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'pt-BR',
    decimalSeparator: ',',
    thousandsSeparator: '.'
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr',
    currency: '¥',
    currencyCode: 'CNY',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: '24h',
    numberFormat: 'zh-CN',
    decimalSeparator: '.',
    thousandsSeparator: ','
  },
  ja: {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    direction: 'ltr',
    currency: '¥',
    currencyCode: 'JPY',
    dateFormat: 'YYYY/MM/DD',
    timeFormat: '24h',
    numberFormat: 'ja-JP',
    decimalSeparator: '.',
    thousandsSeparator: ','
  },
  ru: {
    code: 'ru',
    name: 'Russian',
    nativeName: 'Русский',
    direction: 'ltr',
    currency: '₽',
    currencyCode: 'RUB',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: '24h',
    numberFormat: 'ru-RU',
    decimalSeparator: ',',
    thousandsSeparator: ' '
  },
  it: {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    direction: 'ltr',
    currency: '€',
    currencyCode: 'EUR',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'it-IT',
    decimalSeparator: ',',
    thousandsSeparator: '.'
  },
  nl: {
    code: 'nl',
    name: 'Dutch',
    nativeName: 'Nederlands',
    direction: 'ltr',
    currency: '€',
    currencyCode: 'EUR',
    dateFormat: 'DD-MM-YYYY',
    timeFormat: '24h',
    numberFormat: 'nl-NL',
    decimalSeparator: ',',
    thousandsSeparator: '.'
  },
  ko: {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    direction: 'ltr',
    currency: '₩',
    currencyCode: 'KRW',
    dateFormat: 'YYYY.MM.DD',
    timeFormat: '24h',
    numberFormat: 'ko-KR',
    decimalSeparator: '.',
    thousandsSeparator: ','
  },
  tr: {
    code: 'tr',
    name: 'Turkish',
    nativeName: 'Türkçe',
    direction: 'ltr',
    currency: '₺',
    currencyCode: 'TRY',
    dateFormat: 'DD.MM.YYYY',
    timeFormat: '24h',
    numberFormat: 'tr-TR',
    decimalSeparator: ',',
    thousandsSeparator: '.'
  },
  vi: {
    code: 'vi',
    name: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    direction: 'ltr',
    currency: '₫',
    currencyCode: 'VND',
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    numberFormat: 'vi-VN',
    decimalSeparator: ',',
    thousandsSeparator: '.'
  }
}

// Get locale config by code
export function getLocaleConfig(locale: Locale): LocaleConfig {
  return localeConfigs[locale] || localeConfigs.en
}

// Format currency based on locale
export function formatCurrency(amount: number, locale: Locale): string {
  const config = getLocaleConfig(locale)
  return new Intl.NumberFormat(config.numberFormat, {
    style: 'currency',
    currency: config.currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount)
}

// Format date based on locale
export function formatDate(date: Date, locale: Locale): string {
  const config = getLocaleConfig(locale)
  return new Intl.DateTimeFormat(config.numberFormat, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).format(date)
}

// Format time based on locale
export function formatTime(date: Date, locale: Locale): string {
  const config = getLocaleConfig(locale)
  return new Intl.DateTimeFormat(config.numberFormat, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: config.timeFormat === '12h'
  }).format(date)
}

// Format number based on locale
export function formatNumber(num: number, locale: Locale, decimals = 2): string {
  const config = getLocaleConfig(locale)
  return new Intl.NumberFormat(config.numberFormat, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(num)
}

// Get all supported locales
export function getAllLocales(): Locale[] {
  return Object.keys(localeConfigs) as Locale[]
}

// Get locale direction (for RTL support)
export function getLocaleDirection(locale: Locale): 'ltr' | 'rtl' {
  return getLocaleConfig(locale).direction
}

// Get native language name
export function getNativeLanguageName(locale: Locale): string {
  return getLocaleConfig(locale).nativeName
}

// Check if locale is RTL
export function isRTL(locale: Locale): boolean {
  return getLocaleDirection(locale) === 'rtl'
}
