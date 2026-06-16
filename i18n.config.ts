import { getRequestConfig } from 'next-intl/server'
import { routing } from '@/lib/i18n/routing'

// Import all messages statically
import enMessages from './messages/en.json'
import urMessages from './messages/ur.json'
import hiMessages from './messages/hi.json'
import esMessages from './messages/es.json'
import frMessages from './messages/fr.json'
import deMessages from './messages/de.json'
import arMessages from './messages/ar.json'
import ptMessages from './messages/pt.json'
import zhMessages from './messages/zh.json'
import jaMessages from './messages/ja.json'
import ruMessages from './messages/ru.json'
import itMessages from './messages/it.json'
import nlMessages from './messages/nl.json'
import koMessages from './messages/ko.json'
import trMessages from './messages/tr.json'
import viMessages from './messages/vi.json'

const messages: Record<string, any> = {
  en: enMessages,
  ur: urMessages,
  hi: hiMessages,
  es: esMessages,
  fr: frMessages,
  de: deMessages,
  ar: arMessages,
  pt: ptMessages,
  zh: zhMessages,
  ja: jaMessages,
  ru: ruMessages,
  it: itMessages,
  nl: nlMessages,
  ko: koMessages,
  tr: trMessages,
  vi: viMessages
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = requestLocale

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: messages[locale] || messages['en']
  }
})
