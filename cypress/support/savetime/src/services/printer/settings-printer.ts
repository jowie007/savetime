import { initializeHTML } from '../../preload'
import {
  getLanguageFlagByLocale,
  Locale,
  translation,
} from '../handler/translation-handler'
import { setLocale } from '../store/settings-store'

let settings__button: HTMLElement
let settings__panel: HTMLElement

function init() {
  initializeAccordionButton()
  fillSettings()
}

function initializeAccordionButton() {
  settings__button = document.getElementById('settings__button')
  settings__panel = document.getElementById('settings__panel')
  settings__button.textContent = translation.settings
  settings__button.addEventListener('click', function () {
    this.classList.toggle('active')
    settings__panel.style.display =
      settings__panel.style.display === 'block' ? 'none' : 'block'
  })
}

function fillSettings(): void {
  settings__panel.innerHTML = getSettingsContent()
  initLocaleButtonsClickListeners()
}

function getSettingsContent(): string {
  const languageFlagsHTMLArray: string[] = []
  Object.values(Locale).forEach((locale) => {
    if (!Number.isNaN(Number(locale))) {
      languageFlagsHTMLArray.push(getFlagButtonContentByLocale(Number(locale)))
    }
  })
  return `
    <label id='settings__languageLabel'>
        ${translation.language}
    </label>
    ${languageFlagsHTMLArray.join(' ')}
  `
}

function getFlagButtonContentByLocale(locale: number): string {
  return `
    <button id='settings__language__button-${locale}'
      class='settings__language__button'>
        ${getLanguageFlagByLocale(locale)}
    </button>
    `
}

function initLocaleButtonsClickListeners() {
  Object.values(Locale).forEach((locale) => {
    if (!Number.isNaN(Number(locale))) {
      console.log('started loading')
      document
        .getElementById(`settings__language__button-${locale}`)
        .addEventListener('click', () => {
          setLocale(Number(locale))
          initializeHTML()
        })
    }
  })
}

export function printSettings(): void {
  init()
}
