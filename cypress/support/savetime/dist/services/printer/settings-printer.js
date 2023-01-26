"use strict";
exports.__esModule = true;
exports.printSettings = void 0;
var cypress_log_type_1 = require("../../classes/cypress-log-type");
var locale_1 = require("../../classes/locale");
var preload_1 = require("../../preload");
var translation_handler_1 = require("../handler/translation-handler");
var cypress_file_store_1 = require("../store/cypress-file-store");
var settings_store_1 = require("../store/settings-store");
var result_printer_1 = require("./result-printer");
var settings__button;
var settings__panel;
var initializedBefore = false;
function init() {
    if (!initializedBefore) {
        initializeAccordionButton();
    }
    fillSettings();
    initializedBefore = true;
}
function initializeAccordionButton() {
    settings__button = document.getElementById('settings__button');
    settings__panel = document.getElementById('settings__panel');
    settings__button.textContent = translation_handler_1.translation.settings;
    settings__button.addEventListener('click', function () {
        this.classList.toggle('settings__active');
        settings__panel.style.display =
            settings__panel.style.display === 'block' ? 'none' : 'block';
    });
}
function fillSettings() {
    settings__panel.innerHTML = getSettingsContent();
    initLocaleButtonsClickListeners();
    initTypeButtonsClickListeners();
    initMaxDurationDifferenceChangeListener();
    initCompareSpansChangeListener();
    initPercentageValuesChangeListener();
    initOnlyCriticalTestsChangeListener();
}
function getSettingsContent() {
    var languageFlagsHTMLArray = [];
    Object.values(locale_1.Locale).forEach(function (locale) {
        languageFlagsHTMLArray.push(getFlagButtonContentByLocale(locale));
    });
    return "\n    <div id='settings__language__wrapper' class='settings__item'>\n      <label id='settings__language__label' for='settings__language'>\n        ".concat(translation_handler_1.translation.settings__language__label, "\n      </label>\n      <div id='settings__language'>\n        ").concat(languageFlagsHTMLArray.join(' '), "\n      </div>\n    </div>\n    <div id='settings__type__wrapper' class='settings__item'>\n      <label id='settings__type__label' for='settings__type'>\n        ").concat(translation_handler_1.translation.settings__type__label, "\n      </label>\n      <div id='settings__type'>\n        <button id='settings__type__button-e2e'\n          class='settings__type__button'>\n          ").concat(translation_handler_1.translation.settings__type__e2e, "\n        </button>\n        <button id='settings__type__button-component'\n          class='settings__type__button'>\n          ").concat(translation_handler_1.translation.settings__type__component, "\n        </button>\n      </div>\n    </div>\n    <div id='settings__maxDurationDifference__wrapper' class='settings__item'>\n      <label id='settings__maxDurationDifference__label' for='settings__maxDurationDifference'>\n        ").concat((0, settings_store_1.isPercentageValues)()
        ? translation_handler_1.translation.settings__maxDurationDifference__label__percentage
        : translation_handler_1.translation.settings__maxDurationDifference__label, "\n      </label>\n      <input \n        id='settings__maxDurationDifference' \n        type='number' \n        min='").concat((0, result_printer_1.getMinBorder)(), "' \n        value='").concat((0, settings_store_1.isPercentageValues)()
        ? (0, settings_store_1.getMaxDurationDifferencePercentage)()
        : (0, settings_store_1.getMaxDurationDifference)(), "' \n        oninput=\"validity.valid||(value='');\"\n        />\n    </div>\n    <div id='settings__compareSpans' class='settings__item'>\n      <label id='settings__compareSpans__label' for='settings__compareSpans__checkbox'>\n        ").concat(translation_handler_1.translation.settings__compareSpans__label, "\n      </label>\n      <input \n        id='settings__compareSpans__checkbox' \n        type='checkbox'\n        ").concat((0, settings_store_1.isCompareSpans)() ? 'checked' : '', "\n        />\n    </div>\n    <div id='settings__percentageValues' class='settings__item'>\n      <label id='settings__percentageValues__label' for='settings__percentageValues__checkbox'>\n        ").concat(translation_handler_1.translation.settings__percentageValues__label, "\n      </label>\n      <input \n        id='settings__percentageValues__checkbox' \n        type='checkbox'\n        ").concat((0, settings_store_1.isPercentageValues)() ? 'checked' : '', "\n        />\n    </div>\n    <div id='settings__onlyCriticalTests' class='settings__item'>\n    <label id='settings__onlyCriticalTests__label' for='settings__onlyCriticalTests__checkbox'>\n      ").concat(translation_handler_1.translation.settings__onlyCriticalTests__label, "\n    </label>\n    <input \n      id='settings__onlyCriticalTests__checkbox' \n      type='checkbox'\n      ").concat((0, settings_store_1.isOnlyCriticalTests)() ? 'checked' : '', "\n      />\n  </div>\n    ");
}
function getFlagButtonContentByLocale(locale) {
    return "\n    <button id='settings__language__button-".concat(locale, "'\n      class='settings__language__button'>\n        ").concat((0, translation_handler_1.getLanguageFlagByLocale)(locale), "\n    </button>\n    ");
}
function initLocaleButtonsClickListeners() {
    Object.values(locale_1.Locale).forEach(function (locale) {
        document
            .getElementById("settings__language__button-".concat(locale))
            .addEventListener('click', function () {
            if (locale !== (0, settings_store_1.getLocale)()) {
                (0, settings_store_1.setLocale)(locale);
                (0, preload_1.initializeHTML)();
            }
        });
    });
}
function initTypeButtonsClickListeners() {
    var settings__type__buttonE2E = document.getElementById('settings__type__button-e2e');
    var settings__type__buttonComponent = document.getElementById('settings__type__button-component');
    if ((0, settings_store_1.getType)() === cypress_log_type_1.CypressLogType.e2e) {
        settings__type__buttonE2E.classList.add('selectedButton');
    }
    else if ((0, settings_store_1.getType)() === cypress_log_type_1.CypressLogType.component) {
        settings__type__buttonComponent.classList.add('selectedButton');
    }
    settings__type__buttonE2E.addEventListener('click', function () {
        if ((0, settings_store_1.getType)() !== cypress_log_type_1.CypressLogType.e2e) {
            settings__type__buttonE2E.classList.add('selectedButton');
            (0, settings_store_1.setType)(cypress_log_type_1.CypressLogType.e2e);
            (0, cypress_file_store_1.initCypressFileStore)();
            (0, preload_1.initializeHTML)(true);
        }
        else {
            settings__type__buttonE2E.classList.remove('selectedButton');
        }
    });
    settings__type__buttonComponent.addEventListener('click', function () {
        if ((0, settings_store_1.getType)() !== cypress_log_type_1.CypressLogType.component) {
            settings__type__buttonComponent.classList.add('selectedButton');
            (0, settings_store_1.setType)(cypress_log_type_1.CypressLogType.component);
            (0, cypress_file_store_1.initCypressFileStore)();
            (0, preload_1.initializeHTML)(true);
        }
        else {
            settings__type__buttonComponent.classList.remove('selectedButton');
        }
    });
}
function initMaxDurationDifferenceChangeListener() {
    document
        .getElementById("settings__maxDurationDifference")
        .addEventListener('change', function (change) {
        var newValue = Number(change.target.value);
        if ((0, settings_store_1.isPercentageValues)()) {
            (0, settings_store_1.setMaxDurationDifferencePercentage)(newValue);
        }
        else {
            (0, settings_store_1.setMaxDurationDifference)(newValue);
        }
        (0, preload_1.initializeHTML)();
    });
}
function initCompareSpansChangeListener() {
    document
        .getElementById("settings__compareSpans__checkbox")
        .addEventListener('change', function () {
        (0, settings_store_1.setCompareSpans)(!(0, settings_store_1.isCompareSpans)());
        (0, preload_1.initializeHTML)();
    });
}
function initPercentageValuesChangeListener() {
    document
        .getElementById("settings__percentageValues__checkbox")
        .addEventListener('change', function () {
        (0, settings_store_1.setPercentageValues)(!(0, settings_store_1.isPercentageValues)());
        (0, preload_1.initializeHTML)();
    });
}
function initOnlyCriticalTestsChangeListener() {
    document
        .getElementById("settings__onlyCriticalTests__checkbox")
        .addEventListener('change', function () {
        (0, settings_store_1.setOnlyCriticalTests)(!(0, settings_store_1.isOnlyCriticalTests)());
        (0, preload_1.initializeHTML)();
    });
}
function printSettings() {
    init();
}
exports.printSettings = printSettings;
//# sourceMappingURL=settings-printer.js.map