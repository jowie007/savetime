import {
  initTranslations,
  readTranslationsFile,
} from './services/handler/translation-handler.js'
import { printSettings } from './services/printer/settings-printer.js'
import { initSettingsStore } from './services/store/settings-store.js'
import { printDatepicker } from './services/printer/datepicker-printer.js'
import { initCypressFileStore } from './services/store/cypress-file-store.js'

window.addEventListener('DOMContentLoaded', async () => {
  initSettingsStore()
  initCypressFileStore()
  readTranslationsFile()
  initializeHTML()
})

export function initializeHTML(reInitPickers: boolean = false) {
  initTranslations()
  printSettings()
  printDatepicker(reInitPickers)
}
