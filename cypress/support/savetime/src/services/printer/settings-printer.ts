import { CypressLogType } from '../../classes/cypress-log-type'
import { Locale } from '../../classes/locale'
import { initializeHTML } from '../../preload'
import {
  getLanguageFlagByLocale,
  translation,
} from '../handler/translation-handler'
import { initCypressFileStore } from '../store/cypress-file-store'
import {
  getLocale,
  getMaxDurationDifference,
  getMaxDurationDifferencePercentage,
  getType,
  isCompareSpans,
  isOnlyCriticalTests,
  isPercentageValues,
  setCompareSpans,
  setLocale,
  setMaxDurationDifference,
  setMaxDurationDifferencePercentage,
  setOnlyCriticalTests,
  setPercentageValues,
  setType,
} from '../store/settings-store'
import { getMinBorder } from './result-printer'

let settings__button: HTMLButtonElement
let settings__panel: HTMLElement

let initializedBefore = false

function init() {
  if (!initializedBefore) {
    initializeAccordionButton()
  }
  fillSettings()
  initializedBefore = true
}

function initializeAccordionButton() {
  settings__button = document.getElementById(
    'settings__button',
  ) as HTMLButtonElement
  settings__panel = document.getElementById('settings__panel')
  settings__button.textContent = translation.settings
  settings__button.addEventListener('click', function () {
    this.classList.toggle('settings__active')
    settings__panel.style.display =
      settings__panel.style.display === 'block' ? 'none' : 'block'
  })
}

function fillSettings() {
  settings__panel.innerHTML = getSettingsContent()
  initLocaleButtonsClickListeners()
  initTypeButtonsClickListeners()
  initMaxDurationDifferenceChangeListener()
  initCompareSpansChangeListener()
  initPercentageValuesChangeListener()
  initOnlyCriticalTestsChangeListener()
}

function getSettingsContent() {
  const languageFlagsHTMLArray: string[] = []
  Object.values(Locale).forEach((locale) => {
    languageFlagsHTMLArray.push(getFlagButtonContentByLocale(locale))
  })
  return `
    <div id='settings__language__wrapper' class='settings__item'>
      <label id='settings__language__label' for='settings__language'>
        ${translation.settings__language__label}
      </label>
      <div id='settings__language'>
        ${languageFlagsHTMLArray.join(' ')}
      </div>
    </div>
    <div id='settings__type__wrapper' class='settings__item'>
      <label id='settings__type__label' for='settings__type'>
        ${translation.settings__type__label}
      </label>
      <div id='settings__type'>
        <button id='settings__type__button-e2e'
          class='settings__type__button'>
          ${translation.settings__type__e2e}
        </button>
        <button id='settings__type__button-component'
          class='settings__type__button'>
          ${translation.settings__type__component}
        </button>
      </div>
    </div>
    <div id='settings__maxDurationDifference__wrapper' class='settings__item'>
      <label id='settings__maxDurationDifference__label' for='settings__maxDurationDifference'>
        ${
          isPercentageValues()
            ? translation.settings__maxDurationDifference__label__percentage
            : translation.settings__maxDurationDifference__label
        }
      </label>
      <input 
        id='settings__maxDurationDifference' 
        type='number' 
        min='${getMinBorder()}' 
        value='${
          isPercentageValues()
            ? getMaxDurationDifferencePercentage()
            : getMaxDurationDifference()
        }' 
        oninput="validity.valid||(value='');"
        />
    </div>
    <div id='settings__compareSpans' class='settings__item'>
      <label id='settings__compareSpans__label' for='settings__compareSpans__checkbox'>
        ${translation.settings__compareSpans__label}
      </label>
      <input 
        id='settings__compareSpans__checkbox' 
        type='checkbox'
        ${isCompareSpans() ? 'checked' : ''}
        />
    </div>
    <div id='settings__percentageValues' class='settings__item'>
      <label id='settings__percentageValues__label' for='settings__percentageValues__checkbox'>
        ${translation.settings__percentageValues__label}
      </label>
      <input 
        id='settings__percentageValues__checkbox' 
        type='checkbox'
        ${isPercentageValues() ? 'checked' : ''}
        />
    </div>
    <div id='settings__onlyCriticalTests' class='settings__item'>
    <label id='settings__onlyCriticalTests__label' for='settings__onlyCriticalTests__checkbox'>
      ${translation.settings__onlyCriticalTests__label}
    </label>
    <input 
      id='settings__onlyCriticalTests__checkbox' 
      type='checkbox'
      ${isOnlyCriticalTests() ? 'checked' : ''}
      />
  </div>
    `
}

function getFlagButtonContentByLocale(locale: Locale) {
  return `
    <button id='settings__language__button-${locale}'
      class='settings__language__button'>
        ${getLanguageFlagByLocale(locale)}
    </button>
    `
}

function initLocaleButtonsClickListeners() {
  Object.values(Locale).forEach((locale) => {
    document
      .getElementById(`settings__language__button-${locale}`)
      .addEventListener('click', () => {
        if (locale !== getLocale()) {
          setLocale(locale)
          initializeHTML()
        }
      })
  })
}

function initTypeButtonsClickListeners() {
  const settings__type__buttonE2E = document.getElementById(
    'settings__type__button-e2e',
  ) as HTMLButtonElement
  const settings__type__buttonComponent = document.getElementById(
    'settings__type__button-component',
  ) as HTMLButtonElement
  if (getType() === CypressLogType.e2e) {
    settings__type__buttonE2E.classList.add('selectedButton')
  } else if (getType() === CypressLogType.component) {
    settings__type__buttonComponent.classList.add('selectedButton')
  }
  settings__type__buttonE2E.addEventListener('click', () => {
    if (getType() !== CypressLogType.e2e) {
      settings__type__buttonE2E.classList.add('selectedButton')
      setType(CypressLogType.e2e)
      initCypressFileStore()
      initializeHTML(true)
    } else {
      settings__type__buttonE2E.classList.remove('selectedButton')
    }
  })
  settings__type__buttonComponent.addEventListener('click', () => {
    if (getType() !== CypressLogType.component) {
      settings__type__buttonComponent.classList.add('selectedButton')
      setType(CypressLogType.component)
      initCypressFileStore()
      initializeHTML(true)
    } else {
      settings__type__buttonComponent.classList.remove('selectedButton')
    }
  })
}

function initMaxDurationDifferenceChangeListener() {
  document
    .getElementById(`settings__maxDurationDifference`)
    .addEventListener('change', (change) => {
      const newValue = Number((change.target as HTMLInputElement).value)
      if (isPercentageValues()) {
        setMaxDurationDifferencePercentage(newValue)
      } else {
        setMaxDurationDifference(newValue)
      }
      initializeHTML()
    })
}

function initCompareSpansChangeListener() {
  document
    .getElementById(`settings__compareSpans__checkbox`)
    .addEventListener('change', () => {
      setCompareSpans(!isCompareSpans())
      initializeHTML()
    })
}

function initPercentageValuesChangeListener() {
  document
    .getElementById(`settings__percentageValues__checkbox`)
    .addEventListener('change', () => {
      setPercentageValues(!isPercentageValues())
      initializeHTML()
    })
}

function initOnlyCriticalTestsChangeListener() {
  document
    .getElementById(`settings__onlyCriticalTests__checkbox`)
    .addEventListener('change', () => {
      setOnlyCriticalTests(!isOnlyCriticalTests())
      initializeHTML()
    })
}

export function printSettings() {
  init()
}
