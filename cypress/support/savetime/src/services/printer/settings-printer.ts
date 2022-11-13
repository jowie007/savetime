import { values } from 'cypress/types/lodash'
import {
  getLanguageFlagByLocale,
  Locale,
  translations,
} from '../handler/translation-handler'

let initialized = false
let settings__button: HTMLElement
let settings__panel: HTMLElement

function init() {
  if (!initialized) {
    initializeButton()
    fillSettings()
    initialized = true
  }
}

function initializeButton() {
  settings__button = document.getElementById('settings__button')
  settings__panel = document.getElementById('settings__panel')
  settings__button.textContent = translations.settings
  settings__button.addEventListener('click', function () {
    this.classList.toggle('active')
    settings__panel.style.display =
      settings__panel.style.display === 'block' ? 'none' : 'block'
  })
}

function fillSettings(): void {
  settings__panel.innerHTML = getSettingsContent()
}

function getSettingsContent(): string {
  const languageFlagsHTMLArray: string[] = []
  Object.values(Locale).forEach((locale) => {
    console.log(locale, Number(locale))
    if (!Number.isNaN(Number(locale))) {
      languageFlagsHTMLArray.push(getFlagButtonContentByLocale(Number(locale)))
    }
  })
  return `
    <label id='settings__languageLabel'>
        ${translations.language}
    </label>
    ${languageFlagsHTMLArray.join(' ')}
  `
}

function getFlagButtonContentByLocale(locale: number): string {
  return `
      <button id='settings__language_button-${locale}'>
          ${getLanguageFlagByLocale(locale)}
      </label>
    `
}

export function printSettings(): void {
  init()
}
