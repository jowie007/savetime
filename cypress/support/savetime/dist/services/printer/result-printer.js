"use strict";
exports.__esModule = true;
exports.printResult = exports.getMinBorder = void 0;
var translation_handler_1 = require("../handler/translation-handler");
var cypress_test_result_compare_1 = require("../../classes/cypress-test-result-compare");
var settings_store_1 = require("../store/settings-store");
// TODO Handle new or deleted files
var MIN_BORDER = 0;
var MIN_BORDER_PERCENTAGE = 100;
var nothingToCompare;
var somethingToCompare;
var colors;
var cypressRunResultCompare;
function init() {
    nothingToCompare = document.getElementById('nothingToCompare');
    nothingToCompare.innerText = translation_handler_1.translation.nothingToCompare;
    somethingToCompare = document.getElementById('somethingToCompare');
    colors = initializeGradient();
}
function getMinBorder() {
    return (0, settings_store_1.isPercentageValues)() ? MIN_BORDER_PERCENTAGE : MIN_BORDER;
}
exports.getMinBorder = getMinBorder;
function printResult(result) {
    init();
    cypressRunResultCompare = result;
    if (result === null) {
        nothingToCompare.style.display = 'block';
        somethingToCompare.style.display = 'none';
    }
    else {
        fillOverallTables();
        fillRunTables();
        nothingToCompare.style.display = 'none';
        somethingToCompare.style.display = 'block';
    }
}
exports.printResult = printResult;
function fillOverallTables() {
    var overall__wrapper = document.getElementById('overall__wrapper');
    overall__wrapper.innerHTML = getOverallContent(cypressRunResultCompare);
}
function getOverallContent(cypressRunResultCompare) {
    var durationRange = getDurationRange(cypressRunResultCompare);
    return "\n    <h2 id=\"overall__title\">\n      ".concat(translation_handler_1.translation.overall__caption, "\n      \n    </h2>\n    <div id=\"overall__report\">\n      ").concat(translation_handler_1.translation.overall__report1.trim() +
        ' ' +
        durationRange[0] +
        ' ' +
        translation_handler_1.translation.overall__report2.trim() +
        ' ' +
        durationRange[1] +
        '.', "\n      <div \n        id='overall__report__tooltip'  \n        class=\"tooltip overall__report__tooltip\">\n        ?\n        <span \n          id='overall__report__tooltip__text' \n          class=\"tooltip__text overall__report__tooltip__text\">\n          ").concat(translation_handler_1.translation.overall__report3.trim(), ".\n        </span>\n      </div>\n    </div>\n    <table id=\"overall__table\">\n      <tr id=\"overall__durationDifference\">\n        <th id=\"overall__durationDifference__th\">\n          ").concat(translation_handler_1.translation.overall__durationDifference__th, "\n        </th>\n        <td id=\"overall__durationDifference__td\"\n          class=\"td__duration\"\n          style=\"\n            ").concat(getAdjustedStyle(cypressRunResultCompare), "\n          \">\n          ").concat(getAdjustedDurationDifferenceString(cypressRunResultCompare), "\n        </td>\n      </tr>\n    </table>\n  ");
    /*
        <tr id="overall__durationDifferenceWithoutMissingTests">
        <th id="overall__durationDifferenceWithoutMissingTests__th">
          ${translation.overall__durationDifferenceWithoutMissingTests__th}
        </th>
        <td id="overall__durationDifferenceWithoutMissingTests__td"
          class="td__duration"
          style="
            ${getAdjustedStyle(cypressRunResultCompare)}
          ">
          ${getAdjustedDurationDifferenceWithoutMissingTestsString(
            cypressRunResultCompare
          )}
        </td>
      </tr>
    */
}
function fillRunTables() {
    var run__wrapper = document.getElementById('run__wrapper');
    var innerHTMLArray = [];
    cypressRunResultCompare.runs.forEach(function (value, index) {
        innerHTMLArray.push(getRunTableContent(value, index));
    });
    run__wrapper.innerHTML = innerHTMLArray.join(' ');
}
function getRunTableContent(runResultCompare, indexRun) {
    var testHTMLArray = [];
    runResultCompare.tests.forEach(function (testResultCompare, indexTest) {
        testHTMLArray.push(getTestRowContent(testResultCompare, indexRun, indexTest));
    });
    var joinedTestHTMLArray = testHTMLArray.join(' ');
    return joinedTestHTMLArray.trim() !== '' ||
        runResultCompare.differenceDetected !== cypress_test_result_compare_1.CypressDifference.NO_DIFFERENCE
        ? "\n    <h3 id=\"run__caption-".concat(indexRun, "\">\n      ").concat(translation_handler_1.translation.file + ': ' + runResultCompare.name, "\n    </h3>\n    ") +
            (runResultCompare.differenceDetected !== cypress_test_result_compare_1.CypressDifference.NO_DIFFERENCE
                ? "\n      <div         \n        class=\"run__info run__info-".concat(runResultCompare.differenceDetected, "\">\n        ").concat(translation_handler_1.translation[runResultCompare.differenceDetected], "\n      </div>")
                : (!(0, settings_store_1.isOnlyCriticalTests)()
                    ? "\n    <table id=\"run-".concat(indexRun, "\">\n      <tr id=\"run__durationDifference-").concat(indexRun, "\">\n        <th id=\"run__durationDifference__th-").concat(indexRun, "\">\n          ").concat(translation_handler_1.translation.run__durationDifference__th, "\n        </th>\n        <td id=\"run__durationDifference__td-").concat(indexRun, "\" \n          class=\"td__duration\"\n          style=\"\n            ").concat(getAdjustedStyle(runResultCompare), "\n          \">\n          ").concat(getAdjustedDurationDifferenceString(runResultCompare), "\n        </td>\n      </tr>\n    </table>\n    ")
                    : '') +
                    "\n    <table>\n      <tr id=\"run__test-".concat(indexRun, "\">\n        <th id=\"run__test__name__th-").concat(indexRun, "\">\n          ").concat(translation_handler_1.translation.run__test__name__th, "\n        </th>\n        <th id=\"run__test__durationDifference__th-").concat(indexRun, "\">\n          ").concat(translation_handler_1.translation.run__test__durationDifference__th, "\n        </th>\n      </tr>\n      ").concat(joinedTestHTMLArray, "\n    </table>\n  "))
        : '';
    /*
          <tr id="run__durationDifferenceWithoutMissingTests-${indexRun}">
          <th id="run__durationDifferenceWithoutMissingTests__th-${indexRun}">
            ${translation.run__durationDifferenceWithoutMissingTests__th}
          </th>
          <td id="run__durationDifferenceWithoutMissingTests__td-${indexRun}"
            class="td__duration"
            style="
              ${getAdjustedStyle(runResultCompare)}
            ">
            ${getAdjustedDurationDifferenceWithoutMissingTestsString(
              runResultCompare
            )}
          </td>
        </tr>
        */
}
function getTestRowContent(testResultCompare, indexRun, indexTest) {
    return (0, settings_store_1.isOnlyCriticalTests)() && !isCriticalTest(testResultCompare)
        ? ''
        : "\n    <tr id=\"run__test-".concat(indexRun, "-").concat(indexTest, "\">\n      <td id=\"run__test__durationDifference__td__name-").concat(indexRun, "-").concat(indexTest, "\">\n        ").concat(testResultCompare.title.join(': '), "\n      </td>\n      <td \n        id=\"run__test__durationDifference__td__duration-").concat(indexRun, "-").concat(indexTest, "\" \n        class=\"td__duration").concat(testResultCompare.failDetected !== cypress_test_result_compare_1.CypressFailed.FAILED_NONE
            ? " td__duration-".concat(testResultCompare.failDetected)
            : isDifferenceDetected(testResultCompare)
                ? " td__duration-".concat(testResultCompare.differenceDetected)
                : '', "\" \n        style=\"\n          ").concat(getAdjustedStyle(testResultCompare), "\n        \">\n        ").concat(testResultCompare.failDetected !== cypress_test_result_compare_1.CypressFailed.FAILED_NONE
            ? translation_handler_1.translation[testResultCompare.failDetected]
            : testResultCompare.differenceDetected ===
                cypress_test_result_compare_1.CypressDifference.NO_DIFFERENCE
                ? getAdjustedDurationDifferenceString(testResultCompare)
                : translation_handler_1.translation[testResultCompare.differenceDetected], "\n        ").concat(getAttemptCountTooltip(testResultCompare, indexRun, indexTest), "\n      </td>\n    </tr>\n  ");
}
function getAttemptCountTooltip(testResultCompare, indexRun, indexTest) {
    return isDifferenceDetected(testResultCompare)
        ? ''
        : testResultCompare.attemptCountRun1 !== testResultCompare.attemptCountRun2
            ? "\n    <div \n      id='run__test__durationDifference__td__duration__tooltip-".concat(indexRun, "-").concat(indexTest, "'  \n      class=\"tooltip run__test__durationDifference__td__duration__tooltip\">\n      !\n      <span \n        id='run__test__durationDifference__td__duration__tooltip__text-").concat(indexRun, "-").concat(indexTest, "' \n        class=\"tooltip__text run__test__durationDifference__td__duration__tooltip__text\">\n        ").concat(translation_handler_1.translation.run__test__durationDifference__td__duration__tooltip__text.trim(), ":<br/>\n        ").concat(testResultCompare.attemptCountRun1, "\n        ").concat(testResultCompare.attemptCountRun1 > 1
                ? translation_handler_1.translation.runs
                : translation_handler_1.translation.run, "<br/>\n        ").concat(translation_handler_1.translation.versus, "<br/>\n        ").concat(testResultCompare.attemptCountRun2, "\n        ").concat(testResultCompare.attemptCountRun2 > 1
                ? translation_handler_1.translation.runs
                : translation_handler_1.translation.run, "\n      </span>\n    </div>\n  ")
            : '';
}
function initializeGradient() {
    var canvas = document.getElementById('compareInfos__rating__gradient');
    var colors = [];
    var canvasContext = canvas.getContext('2d', { willReadFrequently: true });
    var gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
    gradient.addColorStop(0, 'green');
    gradient.addColorStop(0.5, 'yellow');
    gradient.addColorStop(1, 'red');
    canvasContext.fillStyle = gradient;
    canvasContext.fillRect(0, 0, canvas.width, canvas.height);
    if (canvas.width > 1) {
        for (var i = 0; i < canvas.width; i += (canvas.width - 1) / 99) {
            var rgb = canvasContext.getImageData(i, 1, 1, 1).data;
            colors.push('rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + rgb[3] + ')');
        }
    }
    document.getElementById('compareInfos__rating__title').innerHTML =
        translation_handler_1.translation.compareInfos__rating__title;
    document.getElementById('compareInfos__rating__min').innerHTML = (0, settings_store_1.isPercentageValues)() ? '100%' : '0' + translation_handler_1.translation.milliseconds;
    document.getElementById('compareInfos__rating__max').innerHTML = (0, settings_store_1.isPercentageValues)()
        ? (0, settings_store_1.getMaxDurationDifferencePercentage)() + '%'
        : (0, settings_store_1.getMaxDurationDifference)() + translation_handler_1.translation.milliseconds;
    return colors;
}
function isCriticalTest(resultCompare) {
    if ((0, settings_store_1.isPercentageValues)()) {
        return (resultCompare.durationDifferencePercentage >
            (0, settings_store_1.getMaxDurationDifferencePercentage)());
    }
    return resultCompare.durationDifference > (0, settings_store_1.getMaxDurationDifference)();
}
function getColorByDuration(duration) {
    return colors[getPositionByDuration(duration)];
}
function getPositionByDuration(duration) {
    var position;
    if ((0, settings_store_1.isPercentageValues)()) {
        position =
            (colors.length * (duration - MIN_BORDER_PERCENTAGE)) /
                ((0, settings_store_1.getMaxDurationDifferencePercentage)() - MIN_BORDER_PERCENTAGE);
    }
    else {
        position = (colors.length * duration) / (0, settings_store_1.getMaxDurationDifference)();
    }
    if (position >= colors.length) {
        position = colors.length - 1;
    }
    else if (position < 0) {
        position = 0;
    }
    return Number(position.toFixed(0));
}
function getAdjustedStyle(resultCompare) {
    return isDifferenceDetected(resultCompare)
        ? ''
        : "background-color: ".concat(getColorByDuration((0, settings_store_1.isPercentageValues)()
            ? resultCompare.durationDifferencePercentage
            : resultCompare.durationDifference));
}
function isDifferenceDetected(resultCompare) {
    return ((resultCompare instanceof cypress_test_result_compare_1.TestResultCompare ||
        resultCompare instanceof cypress_test_result_compare_1.RunResultCompare) &&
        resultCompare.differenceDetected !== cypress_test_result_compare_1.CypressDifference.NO_DIFFERENCE);
}
function getDurationRange(resultCompare) {
    if ((0, settings_store_1.isPercentageValues)()) {
        return [
            resultCompare.lowestDurationDifferencePercentage + '%',
            resultCompare.highestDurationDifferencePercentage + '%',
        ];
    }
    return [
        resultCompare.lowestDurationDifference + translation_handler_1.translation.milliseconds,
        resultCompare.highestDurationDifference + translation_handler_1.translation.milliseconds,
    ];
}
function getAdjustedDurationDifferenceString(resultCompare) {
    if ((0, settings_store_1.isPercentageValues)()) {
        return resultCompare.durationDifferencePercentage + '%';
    }
    return resultCompare.durationDifference + translation_handler_1.translation.milliseconds;
}
// function getAdjustedDurationDifferenceWithoutMissingTestsString(
//   resultCompare: RunResultCompare | CypressRunResultCompare
// ) {
//   if (isPercentageValues()) {
//     return resultCompare.durationDifferenceWithoutMissingTestsPercentage + "%";
//   }
//   return (
//     resultCompare.durationDifferenceWithoutMissingTests +
//     translation.milliseconds
//   );
// }
//# sourceMappingURL=result-printer.js.map