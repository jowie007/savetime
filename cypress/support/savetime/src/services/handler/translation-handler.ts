import * as fs from 'fs'
import * as path from 'path'
import { Locale } from '../../classes/locale'
import { getSettings } from '../store/settings-store'

const languageFlags = ['🇬🇧', '🇩🇪']

class Translations {
  [key: string]: string[]
}

class Translation {
  [key: string]: string
}

let selectedLocale: Locale

const translations: Translations = new Translations()

export const translation: Translation = new Translation()

export function initTranslations() {
  selectedLocale = getSettings().locale
  document
    .getElementsByTagName('html')
    .item(0)
    .setAttribute('lang', selectedLocale.toLowerCase())
  for (const [key, value] of Object.entries(translations)) {
    translation[key] = value[getLocaleIndex(selectedLocale)]
  }
}

function getLocaleIndex(locale: Locale) {
  return Object.keys(Locale).indexOf(locale)
}

export function getLanguageFlagByLocale(locale: Locale) {
  return languageFlags[getLocaleIndex(locale)]
}

export function readTranslationsFile() {
  const csv = fs.readFileSync(
    path.resolve(__dirname, '../../../translations.csv'),
  )
  csv
    .toString()
    .split('\n')
    .forEach((value) => {
      const valueArray = value.split('|')
      translations[valueArray.shift()] = valueArray
    })
}
