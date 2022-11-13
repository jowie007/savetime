import * as fs from 'fs'
import * as path from 'path'

export enum Locale {
  EN = 0,
  DE = 1,
}

const languageFlags = ['🇬🇧', '🇩🇪']

class Translations {
  [key: string]: string
}

let selectedLocale = Locale.EN

export const translations: Translations = new Translations()

export function getLanguageFlagByLocale(locale: number) {
  return languageFlags[locale]
}

export function readTranslationsFile(): void {
  const csv = fs.readFileSync(
    path.resolve(__dirname, '../../../translations.csv'),
  )
  csv
    .toString()
    .split('\n')
    .forEach((value) => {
      const valueArray = value.split('|')
      translations[valueArray.shift()] = valueArray[selectedLocale]
    })
}

export function setSelectedLocale(locale: Locale): void {
  selectedLocale = locale
  readTranslationsFile()
}
