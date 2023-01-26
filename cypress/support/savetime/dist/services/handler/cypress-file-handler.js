"use strict";
exports.__esModule = true;
exports.createCypressLog = exports.compareFilesByNumber = exports.compareFilesByNumberSpan = exports.getAllFileDetails = exports.getAllFileNumbers = exports.getFileNumber = void 0;
var cypress_log_type_1 = require("../../classes/cypress-log-type");
var cypress_test_result_compare_1 = require("../../classes/cypress-test-result-compare");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require('fs');
var RESULT_DIR_E2E = __dirname + '/../../../results/e2e';
var RESULT_DIR_COMPONENT = __dirname + '/../../../results/component';
function getPathByCypressLogType(type) {
    return type === cypress_log_type_1.CypressLogType.e2e ? RESULT_DIR_E2E : RESULT_DIR_COMPONENT;
}
function getFileNumber(type) {
    var count = 0;
    var firstCharsDigits = /\d{1,}$/;
    try {
        fs.readdirSync(getPathByCypressLogType(type)).forEach(function (filename) {
            var firstChars = filename.split('_')[0];
            if (firstCharsDigits.test(firstChars)) {
                var position = Number(firstChars);
                if (position > count) {
                    count = position;
                }
            }
        });
    }
    catch (_) {
        console.log('No previous log files found.');
    }
    count = count + 1;
    return String(count);
}
exports.getFileNumber = getFileNumber;
function getRecentTwoFileNumbers(type) {
    var previousLatest = 0;
    var latest = 0;
    var firstCharsDigits = /\d{1,}$/;
    fs.readdirSync(getPathByCypressLogType(type)).forEach(function (filename) {
        var firstChars = filename.split('_')[0];
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
function getAllFileNumbers(type) {
    var fileNumbers = [];
    var firstCharsDigits = /\d{1,}$/;
    fs.readdirSync(getPathByCypressLogType(type)).forEach(function (filename) {
        var firstChars = filename.split('_')[0];
        if (firstCharsDigits.test(firstChars)) {
            var position = Number(firstChars);
            fileNumbers.push(position);
        }
    });
    return fileNumbers;
}
exports.getAllFileNumbers = getAllFileNumbers;
function getAllFileDetails(type) {
    var fileDetails = new Map();
    var firstCharsDigits = /\d{1,}$/;
    fs.readdirSync(getPathByCypressLogType(type)).forEach(function (filename) {
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
    var ret = new Map(Array.from(fileDetails).sort(function (a, b) {
        return a[0] - b[0];
    }));
    return ret;
}
exports.getAllFileDetails = getAllFileDetails;
// export function compareRecentTwoFiles() {
//   const recentTwoFileNumbers = getRecentTwoFileNumbers()
//   compareFilesByNumber(recentTwoFileNumbers[0], recentTwoFileNumbers[1])
// }
function compareFilesByNumberSpan(type, firstSpanStart, firstSpanEnd, secondSpanStart, secondSpanEnd) {
    if (firstSpanStart > firstSpanEnd) {
        var firstSpanStartTemp = firstSpanStart;
        firstSpanStart = firstSpanEnd;
        firstSpanEnd = firstSpanStartTemp;
    }
    if (secondSpanStart > secondSpanEnd) {
        var secondSpanStartTemp = secondSpanStart;
        secondSpanStart = secondSpanEnd;
        secondSpanEnd = secondSpanStartTemp;
    }
    var firstSpanFileNumbers = Array.from({ length: firstSpanEnd - firstSpanStart + 1 }, function (_, i) { return i + firstSpanStart; });
    var secondSpanFileNumbers = Array.from({ length: secondSpanEnd - secondSpanStart + 1 }, function (_, i) { return i + secondSpanStart; });
    var firstContent = [];
    var secondContent = [];
    try {
        fs.readdirSync(getPathByCypressLogType(type)).forEach(function (filename) {
            var firstChars = filename.split('_')[0];
            var firstCharsDigits = /\d{1,}$/;
            if (firstCharsDigits.test(firstChars) &&
                (firstSpanFileNumbers.includes(Number(firstChars)) ||
                    secondSpanFileNumbers.includes(Number(firstChars)))) {
                var data = JSON.parse(fs.readFileSync("".concat(getPathByCypressLogType(type), "/").concat(filename), 'utf8'));
                if (firstSpanFileNumbers.includes(Number(firstChars))) {
                    firstContent.push(data);
                }
                if (secondSpanFileNumbers.includes(Number(firstChars))) {
                    secondContent.push(data);
                }
            }
        });
    }
    catch (e) {
        console.log(e, 'Unable to compare files by number span');
    }
    return firstContent && secondContent
        ? compareCypressRunResults(getMeanContent(firstContent), getMeanContent(secondContent))
        : null;
}
exports.compareFilesByNumberSpan = compareFilesByNumberSpan;
function getMeanContent(content) {
    var meanContent = content[0];
    var shortestTests = new Map();
    var longestTests = new Map();
    var elementCount = content.length;
    var first = true;
    content.forEach(function (file, fileIndex) {
        if (first) {
            meanContent.runs = file.runs;
        }
        meanContent.runs.forEach(function (meanRunResult, runIndex) {
            var matchingFileRunResult;
            file.runs.forEach(function (fileRunResult) {
                if (meanRunResult.spec.name === fileRunResult.spec.name) {
                    matchingFileRunResult = fileRunResult;
                }
            });
            if (matchingFileRunResult === undefined) {
                meanContent.runs.splice(runIndex, 1);
            }
            else {
                meanRunResult.tests.forEach(function (meanTest, testIndex) {
                    var testOk = false;
                    var meanTestTitleJoined = meanTest.title.join(': ');
                    matchingFileRunResult.tests.forEach(function (matchingFileTest) {
                        if (meanTestTitleJoined === matchingFileTest.title.join(': ') &&
                            matchingFileTest.attempts.length === 1 &&
                            meanTest.attempts.length === 1) {
                            testOk = true;
                            if (!first) {
                                meanTest.attempts[0].duration +=
                                    matchingFileTest.attempts[0].duration;
                                if (fileIndex === elementCount - 1) {
                                    meanTest.attempts[0].duration = Math.round(meanTest.attempts[0].duration / elementCount);
                                }
                                if (shortestTests.get(meanTestTitleJoined) >
                                    matchingFileTest.attempts[0].duration) {
                                    shortestTests.set(meanTestTitleJoined, matchingFileTest.attempts[0].duration);
                                }
                                if (longestTests.get(meanTestTitleJoined) <
                                    matchingFileTest.attempts[0].duration) {
                                    longestTests.set(meanTestTitleJoined, matchingFileTest.attempts[0].duration);
                                }
                            }
                            else {
                                shortestTests.set(meanTestTitleJoined, matchingFileTest.attempts[0].duration);
                                longestTests.set(meanTestTitleJoined, matchingFileTest.attempts[0].duration);
                            }
                        }
                    });
                    if (!testOk) {
                        meanRunResult.tests.splice(testIndex, 1);
                    }
                });
            }
        });
        first = false;
    });
    console.log("Shortest tests", shortestTests);
    console.log("Longest tests", longestTests);
    return meanContent;
}
function compareFilesByNumber(type, firstNumber, secondNumber) {
    var firstContent;
    var secondContent;
    try {
        fs.readdirSync(getPathByCypressLogType(type)).forEach(function (filename) {
            var firstChars = filename.split('_')[0];
            var firstCharsDigits = /\d{1,}$/;
            if (firstCharsDigits.test(firstChars) &&
                (Number(firstChars) === firstNumber ||
                    Number(firstChars) === secondNumber)) {
                var data = JSON.parse(fs.readFileSync("".concat(getPathByCypressLogType(type), "/").concat(filename), 'utf8'));
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
        console.log(e, 'Unable to compare files by number');
    }
    return firstContent && secondContent
        ? compareCypressRunResults(firstContent, secondContent)
        : null;
}
exports.compareFilesByNumber = compareFilesByNumber;
function compareCypressRunResults(firstLog, secondLog) {
    var cypressRunResultCompare = new cypress_test_result_compare_1.CypressRunResultCompare();
    // Get the total duration of the test runs
    try {
        cypressRunResultCompare.runs = [];
        var durationOfFirstCypressRunResult = 0;
        var durationOfSecondCypressRunResult = 0;
        // Iterate over all run results of the second log
        for (var _i = 0, _a = secondLog.runs; _i < _a.length; _i++) {
            var secondRunResultCompare = _a[_i];
            var durationOfFirstRunResult = 0;
            var durationOfSecondRunResult = 0;
            var runResultCompare = new cypress_test_result_compare_1.RunResultCompare();
            runResultCompare.name = secondRunResultCompare.spec.name;
            var firstRunResultFound = false;
            // Iterate over the run results of the first log
            // Until we find the file with the same name
            for (var _b = 0, _c = firstLog.runs; _b < _c.length; _b++) {
                var firstRunResultCompare = _c[_b];
                if (secondRunResultCompare.spec.name === firstRunResultCompare.spec.name) {
                    firstRunResultFound = true;
                    // Iterate over the tests of the second run result
                    for (var _d = 0, _e = secondRunResultCompare.tests; _d < _e.length; _d++) {
                        var secondResultCompareTest = _e[_d];
                        var testResultCompare = new cypress_test_result_compare_1.TestResultCompare();
                        testResultCompare.title = secondResultCompareTest.title;
                        var firstTestResultFound = false;
                        var durationOfFirstTests = 0;
                        var durationOfSecondTests = 0;
                        var _loop_1 = function (firstResultCompareTest) {
                            if (firstResultCompareTest.title[0] ===
                                secondResultCompareTest.title[0] &&
                                firstResultCompareTest.title[1] ===
                                    secondResultCompareTest.title[1]) {
                                if (firstResultCompareTest.state === 'failed') {
                                    if (secondResultCompareTest.state === 'failed') {
                                        testResultCompare.failDetected = cypress_test_result_compare_1.CypressFailed.FAILED_BOTH;
                                    }
                                    else {
                                        testResultCompare.failDetected = cypress_test_result_compare_1.CypressFailed.FAILED_FIRST;
                                    }
                                }
                                else if (secondResultCompareTest.state === 'failed') {
                                    testResultCompare.failDetected = cypress_test_result_compare_1.CypressFailed.FAILED_SECOND;
                                }
                                else {
                                    testResultCompare.failDetected = cypress_test_result_compare_1.CypressFailed.FAILED_NONE;
                                    var durationOfFirstTestAttempts_1 = 0;
                                    var durationOfSecondTestAttempts_1 = 0;
                                    firstTestResultFound = true;
                                    testResultCompare.attemptCountRun1 =
                                        firstResultCompareTest.attempts.length;
                                    testResultCompare.attemptCountRun2 =
                                        secondResultCompareTest.attempts.length;
                                    testResultCompare.differenceDetected =
                                        cypress_test_result_compare_1.CypressDifference.NO_DIFFERENCE;
                                    firstResultCompareTest.attempts.forEach(function (value) {
                                        durationOfFirstTestAttempts_1 += value.duration;
                                    });
                                    secondResultCompareTest.attempts.forEach(function (value) {
                                        durationOfSecondTestAttempts_1 += value.duration;
                                    });
                                    testResultCompare.durationDifference =
                                        durationOfSecondTestAttempts_1 - durationOfFirstTestAttempts_1;
                                    testResultCompare.durationDifferencePercentage = getPercentageDifference(durationOfSecondTestAttempts_1, durationOfFirstTestAttempts_1);
                                    durationOfFirstTests += durationOfFirstTestAttempts_1;
                                    durationOfSecondTests += durationOfSecondTestAttempts_1;
                                    if (cypressRunResultCompare.lowestDurationDifference ===
                                        undefined ||
                                        testResultCompare.durationDifference <
                                            cypressRunResultCompare.lowestDurationDifference) {
                                        cypressRunResultCompare.lowestDurationDifference =
                                            testResultCompare.durationDifference;
                                    }
                                    if (cypressRunResultCompare.highestDurationDifference ===
                                        undefined ||
                                        testResultCompare.durationDifference >
                                            cypressRunResultCompare.highestDurationDifference) {
                                        cypressRunResultCompare.highestDurationDifference =
                                            testResultCompare.durationDifference;
                                    }
                                    if (cypressRunResultCompare.lowestDurationDifferencePercentage ===
                                        undefined ||
                                        testResultCompare.durationDifferencePercentage <
                                            cypressRunResultCompare.lowestDurationDifferencePercentage) {
                                        cypressRunResultCompare.lowestDurationDifferencePercentage =
                                            testResultCompare.durationDifferencePercentage;
                                    }
                                    if (cypressRunResultCompare.highestDurationDifferencePercentage ===
                                        undefined ||
                                        testResultCompare.durationDifferencePercentage >
                                            cypressRunResultCompare.highestDurationDifferencePercentage) {
                                        cypressRunResultCompare.highestDurationDifferencePercentage =
                                            testResultCompare.durationDifferencePercentage;
                                    }
                                }
                            }
                        };
                        // Iterate over the tests of the first run result
                        // Until we find the test with the same name
                        for (var _f = 0, _g = firstRunResultCompare.tests; _f < _g.length; _f++) {
                            var firstResultCompareTest = _g[_f];
                            _loop_1(firstResultCompareTest);
                        }
                        if (!firstTestResultFound) {
                            testResultCompare.differenceDetected =
                                cypress_test_result_compare_1.CypressDifference.NOT_FOUND_FIRST;
                        }
                        durationOfFirstRunResult += durationOfFirstTests;
                        durationOfSecondRunResult += durationOfSecondTests;
                        runResultCompare.tests.push(testResultCompare);
                    }
                    // Check which tests results of the first log arent handled
                    for (var _h = 0, _j = firstRunResultCompare.tests; _h < _j.length; _h++) {
                        var firstTestResultCompare = _j[_h];
                        var secondTestResultFound = false;
                        for (var _k = 0, _l = secondRunResultCompare.tests; _k < _l.length; _k++) {
                            var secondTestResultCompare = _l[_k];
                            if (firstTestResultCompare.title[0] ===
                                secondTestResultCompare.title[0] &&
                                firstTestResultCompare.title[1] ===
                                    secondTestResultCompare.title[1]) {
                                secondTestResultFound = true;
                            }
                        }
                        if (!secondTestResultFound) {
                            var testResultCompare = new cypress_test_result_compare_1.TestResultCompare();
                            testResultCompare.title = firstTestResultCompare.title;
                            testResultCompare.differenceDetected =
                                cypress_test_result_compare_1.CypressDifference.NOT_FOUND_SECOND;
                            runResultCompare.tests.push(testResultCompare);
                        }
                    }
                    runResultCompare.durationDifference =
                        durationOfSecondRunResult - durationOfFirstRunResult;
                    runResultCompare.durationDifferencePercentage = getPercentageDifference(durationOfSecondRunResult, durationOfFirstRunResult);
                    durationOfFirstCypressRunResult += durationOfFirstRunResult;
                    durationOfSecondCypressRunResult += durationOfSecondRunResult;
                    cypressRunResultCompare.runs.push(runResultCompare);
                }
            }
            if (!firstRunResultFound) {
                runResultCompare.differenceDetected = cypress_test_result_compare_1.CypressDifference.NOT_FOUND_FIRST;
                cypressRunResultCompare.runs.push(runResultCompare);
            }
        }
        // Check which run results of the first log arent handled
        for (var _m = 0, _o = firstLog.runs; _m < _o.length; _m++) {
            var firstRunResultCompare = _o[_m];
            var secondRunResultFound = false;
            for (var _p = 0, _q = secondLog.runs; _p < _q.length; _p++) {
                var secondRunResultCompare = _q[_p];
                if (secondRunResultCompare.spec.name === firstRunResultCompare.spec.name) {
                    secondRunResultFound = true;
                }
            }
            if (!secondRunResultFound) {
                var runResultCompare = new cypress_test_result_compare_1.RunResultCompare();
                runResultCompare.name = firstRunResultCompare.spec.name;
                runResultCompare.differenceDetected = cypress_test_result_compare_1.CypressDifference.NOT_FOUND_SECOND;
                cypressRunResultCompare.runs.push(runResultCompare);
            }
        }
        // const recentTwoFileNumbers = getRecentTwoFileNumbers()
        // createCypressCompareLog(
        //   recentTwoFileNumbers[0],
        //   recentTwoFileNumbers[1],
        //   cypressRunResultCompare,
        // )
        cypressRunResultCompare.durationDifference =
            durationOfSecondCypressRunResult - durationOfFirstCypressRunResult;
        cypressRunResultCompare.durationDifferencePercentage = getPercentageDifference(durationOfSecondCypressRunResult, durationOfFirstCypressRunResult);
    }
    catch (e) {
        console.log(e, 'Unable to create compare file.');
    }
    return cypressRunResultCompare;
}
function getPercentageDifference(secondValue, firstValue) {
    return firstValue
        ? Number(((secondValue * 100) / firstValue).toFixed(2))
        : 100;
}
function createCypressLog(type, results) {
    var tempType = type;
    if (results.status === 'finished') {
        fs.mkdirSync(getPathByCypressLogType(tempType), { recursive: true }, function (err) {
            if (err) {
                console.error(err);
            }
        });
        fs.writeFileSync("".concat(getPathByCypressLogType(tempType), "/").concat(getFileNumber(tempType), "_").concat(new Date()
            .toISOString()
            .split(':')
            .join('-')
            .split('.')
            .join('-'), ".json"), JSON.stringify(results, null, '\t'), function (err) {
            if (err) {
                console.error(err);
            }
        });
    }
    else {
        console.log('Something went wrong while reading the test results.');
    }
}
exports.createCypressLog = createCypressLog;
// function createCypressCompareLog(
//   firstNumber: number,
//   secondNumber: number,
//   logs: CypressRunResultCompare,
// ) {
//   fs.mkdirSync(RESULT_COMP_DIR, { recursive: true }, (err: any) => {
//     if (err) {
//       console.error(err)
//     }
//   })
//   fs.writeFileSync(
//     `${RESULT_COMP_DIR}/${secondNumber}_vs_${firstNumber}.json`,
//     JSON.stringify(logs, null, '\t'),
//     (err: any) => {
//       if (err) {
//         console.error(err)
//       }
//     },
//   )
// }
//# sourceMappingURL=cypress-file-handler.js.map