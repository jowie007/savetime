import { Settings } from "../../classes/settings";
import { readSettings, saveSettings } from "../handler/settings-file-handler";
import { Locale } from "../handler/translation-handler";

let settings: Settings;

export function initSettingsStore() {
  settings = readSettings();
}

export function getSettings() {
  return settings;
}

export function setLocale(locale: Locale) {
  settings.locale = locale;
  saveSettings(settings);
}

export function getMaxDurationDifference() {
  return settings.maxDurationDifference;
}

export function setMaxDurationDifference(maxDurationDifference: number) {
  settings.maxDurationDifference = maxDurationDifference;
  saveSettings(settings);
}
