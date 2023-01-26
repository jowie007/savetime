"use strict";
exports.__esModule = true;
exports.createCypressLog = exports.compareFilesByNumber = exports.compareRecentTwoFiles = exports.getAllFileDetails = exports.getAllFileNumbers = exports.getFileNumber = exports.RESULT_COMP_DIR = void 0;
var cypress_run_result_compare_1 = require("../../classes/cypress-run-result-compare");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require("fs");
var RESULT_RAW_DIR = __dirname + "/../../../results/raw";
var RESULT_COMP_DIR = __dirname + "/../../../results/compare";
exports.RESULT_COMP_DIR = RESULT_COMP_DIR;
function getFileNumber() {
    var count = 0;
    var firstCharsDigits = /\d{1,}$/;
    try {
        fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename) {
            var firstChars = filename.split("_")[0];
            if (firstCharsDigits.test(firstChars)) {
                var position = Number(firstChars);
                if (position > count) {
                    count = position;
                }
            }
        });
    }
    catch (_) {
        console.log("No previous log files found.");
    }
    count = count + 1;
    return String(count);
}
exports.getFileNumber = getFileNumber;
function getRecentTwoFileNumbers() {
    var previousLatest = 0;
    var latest = 0;
    var firstCharsDigits = /\d{1,}$/;
    fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename) {
        var firstChars = filename.split("_")[0];
        if (firstCharsDigits.test(firstChars)) {
            var position = Number(firstChars);
            if (position > latest) {
                previousLatest = latest;
                latest = position;
            }
        }
    });
    return [previousLatest, latest];
}
function getAllFileNumbers() {
    var fileNumbers = [];
    var firstCharsDigits = /\d{1,}$/;
    fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename) {
        var firstChars = filename.split("_")[0];
        if (firstCharsDigits.test(firstChars)) {
            var position = Number(firstChars);
            fileNumbers.push(position);
        }
    });
    return fileNumbers;
}
exports.getAllFileNumbers = getAllFileNumbers;
function getAllFileDetails() {
    var fileDetails = new Map();
    var firstCharsDigits = /\d{1,}$/;
    fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename) {
        var splittedString = filename.split(/\D/);
        var firstChars = splittedString[0];
        if (firstCharsDigits.test(firstChars)) {
            var date = new Date();
            date.setFullYear(Number(splittedString[1]));
            date.setMonth(Number(splittedString[2]) - 1);
            date.setDate(Number(splittedString[3]));
            date.setHours(Number(splittedString[4]));
            date.setMinutes(Number(splittedString[5]));
            date.setSeconds(Number(splittedString[6]));
            date.setMilliseconds(Number(splittedString[7]));
            fileDetails.set(Number(firstChars), new Date(date));
        }
    });
    return fileDetails;
}
exports.getAllFileDetails = getAllFileDetails;
function compareRecentTwoFiles() {
    var recentTwoFileNumbers = getRecentTwoFileNumbers();
    compareFilesByNumber(recentTwoFileNumbers[0], recentTwoFileNumbers[1]);
}
exports.compareRecentTwoFiles = compareRecentTwoFiles;
function compareFilesByNumber(firstNumber, secondNumber) {
    var firstContent;
    var secondContent;
    try {
        fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename) {
            var firstChars = filename.split("_")[0];
            var firstCharsDigits = /\d{1,}$/;
            if (firstCharsDigits.test(firstChars) &&
                (Number(firstChars) === firstNumber ||
                    Number(firstChars) === secondNumber)) {
                var data = JSON.parse(fs.readFileSync("".concat(RESULT_RAW_DIR, "/").concat(filename), "utf8"));
                if (Number(firstChars) === firstNumber) {
                    firstContent = data;
                }
                else {
                    secondContent = data;
                }
            }
        });
    }
    catch (e) {
        console.log("Unable to compare files by number");
    }
    console.log(firstNumber, secondNumber);
    return firstContent && secondContent
        ? compareFilesByContent(firstContent, secondContent)
        : null;
}
exports.compareFilesByNumber = compareFilesByNumber;
function compareFilesByContent(firstLog, secondLog) {
    var cypressRunResultCompare = new cypress_run_result_compare_1.CypressRunResultCompare();
    try {
        cypressRunResultCompare.durationDifference =
            secondLog.totalDuration - firstLog.totalDuration;
        cypressRunResultCompare.runs = [];
        var durationDifferenceOfMissingTestsCombined = 0;
        for (var _i = 0, _a = secondLog.runs; _i < _a.length; _i++) {
            var secondRunResultCompare = _a[_i];
            var runResultCompare = new cypress_run_result_compare_1.RunResultCompare();
            runResultCompare.name = secondRunResultCompare.spec.name;
            var firstRunResultFound = false;
            for (var _b = 0, _c = firstLog.runs; _b < _c.length; _b++) {
                var firstRunResultCompare = _c[_b];
                if (secondRunResultCompare.spec.name === firstRunResultCompare.spec.name) {
                    firstRunResultFound = true;
                    runResultCompare.durationDifference =
                        secondRunResultCompare.stats.duration -
                            firstRunResultCompare.stats.duration;
                    var durationDifferenceOfMissingTests = 0;
                    for (var _d = 0, _e = secondRunResultCompare.tests; _d < _e.length; _d++) {
                        var secondTestResultCompare = _e[_d];
                        var testResultCompare = new cypress_run_result_compare_1.TestResultCompare();
                        testResultCompare.title = secondTestResultCompare.title;
                        var firstTestResultFound = false;
                        var secondTestResultCompareLastAttempt = secondTestResultCompare.attempts.pop();
                        for (var _f = 0, _g = firstRunResultCompare.tests; _f < _g.length; _f++) {
                            var firstTestResultCompare = _g[_f];
                            if (firstTestResultCompare.title[0] ===
                                secondTestResultCompare.title[0] &&
                                firstTestResultCompare.title[1] ===
                                    secondTestResultCompare.title[1]) {
                                firstTestResultFound = true;
                                var firstTestResultCompareLastAttempt = firstTestResultCompare.attempts.pop();
                                testResultCompare.attemptCountDifference =
                                    secondTestResultCompare.attempts.length -
                                        firstTestResultCompare.attempts.length;
                                testResultCompare.differenceDetectedMessage = null;
                                testResultCompare.durationDifference =
                                    secondTestResultCompareLastAttempt.duration -
                                        firstTestResultCompareLastAttempt.duration;
                            }
                        }
                        if (!firstTestResultFound) {
                            testResultCompare.durationDifference =
                                secondTestResultCompareLastAttempt.duration;
                            testResultCompare.attemptCountDifference =
                                secondTestResultCompare.attempts.length;
                            testResultCompare.differenceDetectedMessage = "NOT_FOUND";
                            durationDifferenceOfMissingTests +=
                                secondTestResultCompareLastAttempt.duration;
                        }
                        runResultCompare.tests.push(testResultCompare);
                    }
                    runResultCompare.durationDifferenceWithoutMissingTests =
                        runResultCompare.durationDifference -
                            durationDifferenceOfMissingTests;
                    durationDifferenceOfMissingTestsCombined +=
                        durationDifferenceOfMissingTests;
                    cypressRunResultCompare.runs.push(runResultCompare);
                }
            }
            if (!firstRunResultFound) {
                runResultCompare.differenceDetectedMessage = "NOT_FOUND";
            }
        }
        cypressRunResultCompare.durationDifferenceWithoutMissingTests =
            cypressRunResultCompare.durationDifference -
                durationDifferenceOfMissingTestsCombined;
        // const recentTwoFileNumbers = getRecentTwoFileNumbers()
        // createCypressCompareLog(
        //   recentTwoFileNumbers[0],
        //   recentTwoFileNumbers[1],
        //   cypressRunResultCompare,
        // )
    }
    catch (_) {
        console.log("Unable to create compare file.");
    }
    return cypressRunResultCompare;
}
function createCypressLog(results) {
    if (results.status === "finished") {
        fs.mkdirSync(RESULT_RAW_DIR, { recursive: true }, function (err) {
            if (err) {
                console.error(err);
            }
        });
        fs.writeFileSync("".concat(RESULT_RAW_DIR, "/").concat(getFileNumber(), "_").concat(new Date()
            .toISOString()
            .split(":")
            .join("-")
            .split(".")
            .join("-"), ".json"), JSON.stringify(results, null, "\t"), function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
    else {
        console.log("Something went wrong while reading the test results.");
    }
}
exports.createCypressLog = createCypressLog;
function createCypressCompareLog(firstNumber, secondNumber, logs) {
    fs.mkdirSync(RESULT_COMP_DIR, { recursive: true }, function (err) {
        if (err) {
            console.error(err);
        }
    });
    fs.writeFileSync("".concat(RESULT_COMP_DIR, "/").concat(secondNumber, "_vs_").concat(firstNumber, ".json"), JSON.stringify(logs, null, "\t"), function (err) {
        if (err) {
            console.error(err);
        }
    });
}
//# sourceMappingURL=file-handler.js.map