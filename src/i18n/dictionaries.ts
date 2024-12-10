import { currentLocale, Locale } from './config'

const dictionaries = {
  ja: () => import('./ja.json').then((module) => module.default),
  en: () => import('./en.json').then((module) => module.default),
  id: () => import('./id.json').then((module) => module.default),
  ko: () => import('./ko.json').then((module) => module.default),
  cn: () => import('./cn.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale = currentLocale) => dictionaries[locale]?.() ?? dictionaries.en()
