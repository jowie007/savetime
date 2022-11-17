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

export function getMaxDurationDifferencePercentage() {
  return settings.maxDurationDifferencePercentage;
}

export function setMaxDurationDifferencePercentage(
  maxDurationDifferencePercentage: number
) {
  settings.maxDurationDifferencePercentage = maxDurationDifferencePercentage;
  saveSettings(settings);
}

export function isPercentageValues() {
  return settings.percentageValues;
}

export function setPercentageValues(percentageValues: boolean) {
  settings.percentageValues = percentageValues;
  saveSettings(settings);
}

export function isOnlyCriticalTests() {
  return settings.onlyCriticalTests;
}

export function setOnlyCriticalTests(onlyCriticalTests: boolean) {
  settings.onlyCriticalTests = onlyCriticalTests;
  saveSettings(settings);
}
