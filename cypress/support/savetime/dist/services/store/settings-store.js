"use strict";
exports.__esModule = true;
exports.setOnlyCriticalTests = exports.isOnlyCriticalTests = exports.setPercentageValues = exports.isPercentageValues = exports.setCompareSpans = exports.isCompareSpans = exports.setMaxDurationDifferencePercentage = exports.getMaxDurationDifferencePercentage = exports.setMaxDurationDifference = exports.getMaxDurationDifference = exports.getType = exports.setType = exports.getLocale = exports.setLocale = exports.getSettings = exports.initSettingsStore = void 0;
var settings_file_handler_1 = require("../handler/settings-file-handler");
var settings;
function initSettingsStore() {
    settings = (0, settings_file_handler_1.readSettings)();
}
exports.initSettingsStore = initSettingsStore;
function getSettings() {
    return settings;
}
exports.getSettings = getSettings;
function setLocale(locale) {
    settings.locale = locale;
    (0, settings_file_handler_1.saveSettings)(settings);
}
exports.setLocale = setLocale;
function getLocale() {
    return settings.locale;
}
exports.getLocale = getLocale;
function setType(type) {
    settings.type = type;
    (0, settings_file_handler_1.saveSettings)(settings);
}
exports.setType = setType;
function getType() {
    return settings.type;
}
exports.getType = getType;
function getMaxDurationDifference() {
    return settings.maxDurationDifference;
}
exports.getMaxDurationDifference = getMaxDurationDifference;
function setMaxDurationDifference(maxDurationDifference) {
    settings.maxDurationDifference = maxDurationDifference;
    (0, settings_file_handler_1.saveSettings)(settings);
}
exports.setMaxDurationDifference = setMaxDurationDifference;
function getMaxDurationDifferencePercentage() {
    return settings.maxDurationDifferencePercentage;
}
exports.getMaxDurationDifferencePercentage = getMaxDurationDifferencePercentage;
function setMaxDurationDifferencePercentage(maxDurationDifferencePercentage) {
    settings.maxDurationDifferencePercentage = maxDurationDifferencePercentage;
    (0, settings_file_handler_1.saveSettings)(settings);
}
exports.setMaxDurationDifferencePercentage = setMaxDurationDifferencePercentage;
function isCompareSpans() {
    return settings.compareSpans;
}
exports.isCompareSpans = isCompareSpans;
function setCompareSpans(compareSpans) {
    settings.compareSpans = compareSpans;
}
exports.setCompareSpans = setCompareSpans;
function isPercentageValues() {
    return settings.percentageValues;
}
exports.isPercentageValues = isPercentageValues;
function setPercentageValues(percentageValues) {
    settings.percentageValues = percentageValues;
    (0, settings_file_handler_1.saveSettings)(settings);
}
exports.setPercentageValues = setPercentageValues;
function isOnlyCriticalTests() {
    return settings.onlyCriticalTests;
}
exports.isOnlyCriticalTests = isOnlyCriticalTests;
function setOnlyCriticalTests(onlyCriticalTests) {
    settings.onlyCriticalTests = onlyCriticalTests;
    (0, settings_file_handler_1.saveSettings)(settings);
}
exports.setOnlyCriticalTests = setOnlyCriticalTests;
//# sourceMappingURL=settings-store.js.map