export type Locale = (typeof locales)[number]

export const locales = ['ja', 'en', 'id', 'ko', 'cn'] as const
export const localeLabels = [
  { emoji: '🇯🇵', label: '日本語' },
  { emoji: '🇺🇸', label: 'English' },
  { emoji: '🇮🇩', label: 'Bahasa Indonesia' },
  { emoji: '🇰🇷', label: '한국어' },
  { emoji: '🇨🇳', label: '中文' },
] as const
export const defaultLocale: Locale = 'ja'
