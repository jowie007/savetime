import { printDropdowns } from './services/printer/dropdown-printer.js'
import { readTranslationsFile } from './services/handler/translation-handler.js'
import { printSettings } from './services/printer/settings-printer.js'

window.addEventListener('DOMContentLoaded', async () => {
  readTranslationsFile()
  printSettings()
  printDropdowns()
})
