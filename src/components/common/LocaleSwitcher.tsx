'use client'

import { currentLocale, Locale, localeLabels, locales } from '@/i18n/config'
import { ChangeEvent } from 'react'

export default function LocaleSwitcher() {
  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    if (locales.includes(value as Locale) && value !== currentLocale) {
      const path = window.location.pathname
      const encodedValue = encodeURIComponent(value)
      const targetUrl = encodedValue === 'ja' ? `https://tokiken.com${path}` : `https://${encodedValue}.tokiken.com${path}`
      window.location.href = targetUrl
    }
  }
  return (
    <select
      className="px-2 py-1 text-xs text-white text-right bg-secondary rounded-full focus:outline-none appearance-none"
      defaultValue={currentLocale}
      onChange={onChange}>
      {locales.map((l, i) => (
        <option key={l} value={l} className="bg-none">
          {localeLabels[i].emoji} {localeLabels[i].label}
        </option>
      ))}
    </select>
  )
}
