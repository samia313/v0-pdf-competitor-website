export const locales = [
  'en',
  'ur',
  'hi',
  'es',
  'fr',
  'de',
  'ar',
  'pt',
  'zh',
  'ja',
  'ru',
  'it',
  'nl',
  'ko',
  'tr'
] as const

export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'en'

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ur: 'اردو (Urdu)',
  hi: 'हिन्दी (Hindi)',
  es: 'Español (Spanish)',
  fr: 'Français (French)',
  de: 'Deutsch (German)',
  ar: 'العربية (Arabic)',
  pt: 'Português (Portuguese)',
  zh: '简体中文 (Chinese)',
  ja: '日本語 (Japanese)',
  ru: 'Русский (Russian)',
  it: 'Italiano (Italian)',
  nl: 'Nederlands (Dutch)',
  ko: '한국어 (Korean)',
  tr: 'Türkçe (Turkish)'
}

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  ur: '🇵🇰',
  hi: '🇮🇳',
  es: '🇪🇸',
  fr: '🇫🇷',
  de: '🇩🇪',
  ar: '🇸🇦',
  pt: '🇧🇷',
  zh: '🇨🇳',
  ja: '🇯🇵',
  ru: '🇷🇺',
  it: '🇮🇹',
  nl: '🇳🇱',
  ko: '🇰🇷',
  tr: '🇹🇷'
}

// RTL languages
export const rtlLocales: Locale[] = ['ar', 'ur']

export function isRTL(locale: Locale): boolean {
  return rtlLocales.includes(locale)
}

export const localeMetadata: Record<Locale, { currency: string; country: string }> = {
  en: { currency: 'USD', country: 'United States' },
  ur: { currency: 'PKR', country: 'Pakistan' },
  hi: { currency: 'INR', country: 'India' },
  es: { currency: 'EUR', country: 'Spain' },
  fr: { currency: 'EUR', country: 'France' },
  de: { currency: 'EUR', country: 'Germany' },
  ar: { currency: 'SAR', country: 'Saudi Arabia' },
  pt: { currency: 'BRL', country: 'Brazil' },
  zh: { currency: 'CNY', country: 'China' },
  ja: { currency: 'JPY', country: 'Japan' },
  ru: { currency: 'RUB', country: 'Russia' },
  it: { currency: 'EUR', country: 'Italy' },
  nl: { currency: 'EUR', country: 'Netherlands' },
  ko: { currency: 'KRW', country: 'South Korea' },
  tr: { currency: 'TRY', country: 'Turkey' }
}
