import * as fs from 'fs'
import * as path from 'path'
import { getSettings } from '../store/settings-store'

export enum Locale {
  EN = 0,
  DE = 1,
}

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
  for (const [key, value] of Object.entries(translations)) {
    translation[key] = value[selectedLocale]
  }
}

export function getLanguageFlagByLocale(locale: number) {
  return languageFlags[locale]
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
