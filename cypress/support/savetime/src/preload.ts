import {
  initTranslations,
  readTranslationsFile,
} from './services/handler/translation-handler.js'
import { printSettings } from './services/printer/settings-printer.js'
import { initSettingsStore } from './services/store/settings-store.js'
import { printDatepicker } from './services/printer/datepicker-printer.js'
import { initCypressFileStoreStore } from './services/store/cypress-file-store.js'

window.addEventListener('DOMContentLoaded', async () => {
  initCypressFileStoreStore()
  initSettingsStore()
  readTranslationsFile()
  initializeHTML()
})

export function initializeHTML() {
  initTranslations()
  printSettings()
  printDatepicker()
}
