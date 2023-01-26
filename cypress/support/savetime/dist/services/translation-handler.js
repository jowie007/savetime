"use strict";
exports.__esModule = true;
exports.getTranslation = exports.setSelectedLocale = void 0;
var fs = require("fs");
var path = require("path");
var selectedLocale = 0 /* Locale.EN */;
var translations = new Map();
translations.set('nothingToCompare', [
    'Nothing to compare',
    'Nichts zu vergleichen',
]);
function readFile() {
    fs.readFile(path.resolve(__dirname, '../../translations.csv'), function (err, csv) {
        if (err) {
            throw err;
        }
        csv
            .toString()
            .split('\n')
            .forEach(function (value) {
            var valueArray = value.split('|');
            translations.set(valueArray.shift(), valueArray);
        });
        console.log(translations);
    });
}
readFile();
function setSelectedLocale(locale) {
    selectedLocale = locale;
}
exports.setSelectedLocale = setSelectedLocale;
function getTranslation(identifier) {
    return translations.get(identifier)[selectedLocale];
}
exports.getTranslation = getTranslation;
//# sourceMappingURL=translation-handler.js.map