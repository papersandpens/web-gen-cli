export const LOCALES = {
  EN: 'en',
  VI: 'vi'
} as const

export const LOCALE_LABELS = {
  [LOCALES.EN]: 'English',
  [LOCALES.VI]: 'Vietnamese'
} as const

export const DEFAULT_LOCALE = LOCALES.EN

export const LOCALES_OPTIONS = Object.entries(LOCALE_LABELS).map(([value, title]) => ({
  value,
  title
})) 