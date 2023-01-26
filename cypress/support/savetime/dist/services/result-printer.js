"use strict";
exports.__esModule = true;
exports.printResult = void 0;
var translation_handler_1 = require("./translation-handler");
var initialized = false;
var nothingToCompare;
var somethingToCompare;
var overall__caption;
var overall__durationDifference__th;
var overall__durationDifference__td;
var overall__durationDifferenceWithoutMissingTests__th;
var overall__durationDifferenceWithoutMissingTests__td;
var run;
// let run__caption: HTMLElement
// let run__durationDifference__th: HTMLElement
// let run__durationDifference__td: HTMLElement
// let run__durationDifferenceWithoutMissingTests__th: HTMLElement
// let run__durationDifferenceWithoutMissingTests__td: HTMLElement
function init() {
    if (!initialized) {
        nothingToCompare = document.getElementById('nothingToCompare');
        nothingToCompare.innerText = (0, translation_handler_1.getTranslation)('nothingToCompare');
        somethingToCompare = document.getElementById('somethingToCompare');
        overall__caption = document.getElementById('overall__caption');
        overall__durationDifference__th = document.getElementById('overall__durationDifference__th');
        overall__durationDifference__td = document.getElementById('overall__durationDifference__td');
        overall__durationDifferenceWithoutMissingTests__th = document.getElementById('overall__durationDifferenceWithoutMissingTests__th');
        overall__durationDifferenceWithoutMissingTests__td = document.getElementById('overall__durationDifferenceWithoutMissingTests__td');
        run = document.getElementById('run');
        run.style.visibility = 'hidden';
        // run__caption = document.getElementById('run__caption')
        // run__durationDifference__th = document.getElementById(
        //   'run__durationDifference__th',
        // )
        // run__durationDifference__td = document.getElementById(
        //   'run__durationDifference__td',
        // )
        // run__durationDifferenceWithoutMissingTests__th = document.getElementById(
        //   'run__durationDifferenceWithoutMissingTests__th',
        // )
        // run__durationDifferenceWithoutMissingTests__td = document.getElementById(
        //   'run__durationDifferenceWithoutMissingTests__td',
        // )
    }
}
function printResult(result) {
    init();
    if (result === null) {
        nothingToCompare.style.visibility = 'visible';
        somethingToCompare.style.visibility = 'hidden';
    }
    else {
        fillOverallTables(result);
        fillRunTables(result);
        nothingToCompare.style.visibility = 'hidden';
        somethingToCompare.style.visibility = 'visible';
    }
}
exports.printResult = printResult;
function fillOverallTables(result) {
    overall__caption.innerText = (0, translation_handler_1.getTranslation)('overall__caption');
    overall__durationDifference__th.innerText = (0, translation_handler_1.getTranslation)('overall__durationDifference__th');
    overall__durationDifferenceWithoutMissingTests__th.innerText = (0, translation_handler_1.getTranslation)('overall__durationDifferenceWithoutMissingTests__th');
    overall__durationDifference__td.innerText = result.durationDifference.toString();
    overall__durationDifferenceWithoutMissingTests__td.innerText = result.durationDifferenceWithoutMissingTests.toString();
}
function fillRunTables(result) {
    result.runs.forEach(function (value, index) {
        var run__clone = run.cloneNode(true);
        run__clone.id += '-' + index;
        run__clone.style.visibility = 'visible';
        var childElements = run__clone.getElementsByTagName('*');
        var count = 0;
        var element = childElements[count];
        while (element) {
            console.log(element.id);
            if (element.id !== '') {
                element.id += '-' + index;
            }
            count++;
            element = childElements[count];
        }
        somethingToCompare.append(run__clone);
    });
}
//# sourceMappingURL=result-printer.js.map