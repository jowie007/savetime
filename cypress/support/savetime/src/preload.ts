import { printDropdowns } from './services/printer/dropdown-printer.js'
import {
  initTranslations,
  readTranslationsFile,
} from './services/handler/translation-handler.js'
import { printSettings } from './services/printer/settings-printer.js'
import { initSettingsStore } from './services/store/settings-store.js'

window.addEventListener('DOMContentLoaded', async () => {
  initSettingsStore()
  readTranslationsFile()
  initializeHTML()
})

export function initializeHTML() {
  initTranslations()
  printSettings()
  printDropdowns()
}
