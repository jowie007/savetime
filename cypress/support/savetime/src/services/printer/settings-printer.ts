import { initializeHTML } from '../../preload'
import {
  getLanguageFlagByLocale,
  Locale,
  translation,
} from '../handler/translation-handler'
import { setLocale } from '../store/settings-store'

let initialized = false
let settings__button: HTMLElement
let settings__panel: HTMLElement
let clickedLocale: Locale

function init() {
  if (!initialized) {
    initializeAccordionButton()
    fillSettings()
    initialized = true
  }
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
      class='settings__language__button'
      onclick='${onLocaleButtonClick}'>
        ${getLanguageFlagByLocale(locale)}
    </button>
    `
}

function onLocaleButtonClick() {
  // TODO Wont work like this, because click is triggered on init
  setLocale(Number(clickedLocale))
  initializeHTML()
}

export function printSettings(): void {
  init()
}
