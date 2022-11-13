import { translations } from '../handler/translation-handler'

let initialized = false
let settings__button: HTMLElement
let settings__panel: HTMLElement

function init() {
  if (!initialized) {
    settings__button = document.getElementById('settings__button')
    settings__panel = document.getElementById('settings__panel')
    settings__button.textContent = translations.settings
    settings__button.addEventListener('click', function () {
      this.classList.toggle('active')
      settings__panel.style.display =
        settings__panel.style.display === 'block' ? 'none' : 'block'
    })
    initialized = true
  }
}

export function printSettings(): void {
  init()
}
