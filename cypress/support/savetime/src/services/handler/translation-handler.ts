import * as fs from 'fs'
import * as path from 'path'
import { Locale } from '../../classes/locale'
import { getSettings } from '../store/settings-store'

// https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg
// https://commons.wikimedia.org/wiki/File:Flag_of_Germany.svg
const languageFlags = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="1200" height="600">
    <clipPath id="s">
      <path d="M0,0 v30 h60 v-30 z"/>
    </clipPath>
    <clipPath id="t">
      <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
    </clipPath>
    <g clip-path="url(#s)">
      <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/>
    </g>
  </svg>`, 
  `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="600" viewBox="0 0 5 3">
    <desc>Flag of Germany</desc>
    <rect id="black_stripe" width="5" height="3" y="0" x="0" fill="#000"/>
    <rect id="red_stripe" width="5" height="2" y="1" x="0" fill="#D00"/>
    <rect id="gold_stripe" width="5" height="1" y="2" x="0" fill="#FFCE00"/>
  </svg>`]

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
