'use server'

import { Locale, defaultLocale, locales } from '@/i18n/config'
import { cookies } from 'next/headers'

// In this example the locale is read from a cookie. You could alternatively
// also read it from a database, backend service, or any other source.
const COOKIE_NAME = 'NEXT_LOCALE'

export async function getUserLocale() {
  const cookie = await cookies()
  const locale = cookie.get(COOKIE_NAME)?.value || defaultLocale
  return locales.includes(locale as Locale) ? locale : defaultLocale
}

export async function setUserLocale(locale: Locale) {
  const cookie = await cookies()
  cookie.set(COOKIE_NAME, locale)
}
