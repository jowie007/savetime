import * as fs from 'fs'
import * as path from 'path'

export const enum Locale {
  EN = 0,
  DE = 1,
}

const translations = new Map<string, Array<string>>()
translations.set('nothingToCompare', [
  'Nothing to compare',
  'Nichts zu vergleichen',
])

function readFile(): void {
  fs.readFile(path.resolve(__dirname, '../../translations.csv'), function (
    err: any,
    csv: Buffer,
  ) {
    if (err) {
      throw err
    }
    csv
      .toString()
      .split('\n')
      .forEach((value) => {
        const valueArray = value.split('|')
        translations.set(valueArray.shift(), valueArray)
      })
    console.log(translations)
  })
}

readFile()

export function getTranslation(identifier: string, locale: Locale): string {
  return translations.get(identifier)[locale]
}
