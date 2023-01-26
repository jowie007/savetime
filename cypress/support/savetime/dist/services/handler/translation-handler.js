"use strict";
exports.__esModule = true;
exports.readTranslationsFile = exports.getLanguageFlagByLocale = exports.initTranslations = exports.translation = void 0;
var fs = require("fs");
var path = require("path");
var locale_1 = require("../../classes/locale");
var settings_store_1 = require("../store/settings-store");
// https://upload.wikimedia.org/wikipedia/commons/a/ae/Flag_of_the_United_Kingdom.svg
// https://commons.wikimedia.org/wiki/File:Flag_of_Germany.svg
var languageFlags = [
    "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 60 30\" width=\"1200\" height=\"600\">\n    <clipPath id=\"s\">\n      <path d=\"M0,0 v30 h60 v-30 z\"/>\n    </clipPath>\n    <clipPath id=\"t\">\n      <path d=\"M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z\"/>\n    </clipPath>\n    <g clip-path=\"url(#s)\">\n      <path d=\"M0,0 v30 h60 v-30 z\" fill=\"#012169\"/>\n      <path d=\"M0,0 L60,30 M60,0 L0,30\" stroke=\"#fff\" stroke-width=\"6\"/>\n      <path d=\"M0,0 L60,30 M60,0 L0,30\" clip-path=\"url(#t)\" stroke=\"#C8102E\" stroke-width=\"4\"/>\n      <path d=\"M30,0 v30 M0,15 h60\" stroke=\"#fff\" stroke-width=\"10\"/>\n      <path d=\"M30,0 v30 M0,15 h60\" stroke=\"#C8102E\" stroke-width=\"6\"/>\n    </g>\n  </svg>",
    "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1000\" height=\"600\" viewBox=\"0 0 5 3\">\n    <desc>Flag of Germany</desc>\n    <rect id=\"black_stripe\" width=\"5\" height=\"3\" y=\"0\" x=\"0\" fill=\"#000\"/>\n    <rect id=\"red_stripe\" width=\"5\" height=\"2\" y=\"1\" x=\"0\" fill=\"#D00\"/>\n    <rect id=\"gold_stripe\" width=\"5\" height=\"1\" y=\"2\" x=\"0\" fill=\"#FFCE00\"/>\n  </svg>"
];
var Translations = /** @class */ (function () {
    function Translations() {
    }
    return Translations;
}());
var Translation = /** @class */ (function () {
    function Translation() {
    }
    return Translation;
}());
var selectedLocale;
var translations = new Translations();
exports.translation = new Translation();
function initTranslations() {
    selectedLocale = (0, settings_store_1.getSettings)().locale;
    document
        .getElementsByTagName('html')
        .item(0)
        .setAttribute('lang', selectedLocale.toLowerCase());
    for (var _i = 0, _a = Object.entries(translations); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        exports.translation[key] = value[getLocaleIndex(selectedLocale)];
    }
}
exports.initTranslations = initTranslations;
function getLocaleIndex(locale) {
    return Object.keys(locale_1.Locale).indexOf(locale);
}
function getLanguageFlagByLocale(locale) {
    return languageFlags[getLocaleIndex(locale)];
}
exports.getLanguageFlagByLocale = getLanguageFlagByLocale;
function readTranslationsFile() {
    var csv = fs.readFileSync(path.resolve(__dirname, '../../../translations.csv'));
    csv
        .toString()
        .split('\n')
        .forEach(function (value) {
        var valueArray = value.split('|');
        translations[valueArray.shift()] = valueArray;
    });
}
exports.readTranslationsFile = readTranslationsFile;
//# sourceMappingURL=translation-handler.js.map