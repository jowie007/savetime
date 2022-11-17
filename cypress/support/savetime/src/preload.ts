import { printDropdowns } from "./services/printer/dropdown-printer.js";
import {
  initTranslations,
  readTranslationsFile,
} from "./services/handler/translation-handler.js";
import { printSettings } from "./services/printer/settings-printer.js";
import { initSettingsStore } from "./services/store/settings-store.js";
import { printTitle } from "./services/printer/title-printer.js";
import { printDatepicker } from "./services/printer/datepicker-printer.js";

window.addEventListener("DOMContentLoaded", async () => {
  initSettingsStore();
  readTranslationsFile();
  initializeHTML();
});

export function initializeHTML() {
  initTranslations();
  printTitle();
  printSettings();
  printDropdowns();
  printDatepicker();
}
