import { CypressLogType } from '../../classes/cypress-log-type'
import {
  CypressDifference,
  CypressFailed,
  CypressRunResultCompare,
  RunResultCompare,
  TestResultCompare,
} from "../../classes/cypress-test-result-compare";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const RESULT_DIR_E2E = __dirname + '/../../../results/e2e'
const RESULT_DIR_COMPONENT = __dirname + '/../../../results/component'

function getPathByCypressLogType(type: CypressLogType) {
  return type === CypressLogType.e2e ? RESULT_DIR_E2E : RESULT_DIR_COMPONENT
}

export function getFileNumber(type: CypressLogType) {
  let count = 0
  const firstCharsDigits = /\d{1,}$/
  try {
    fs.readdirSync(getPathByCypressLogType(type)).forEach(function (
      filename: string,
    ) {
      const firstChars = filename.split('_')[0]
      if (firstCharsDigits.test(firstChars)) {
        const position = Number(firstChars);
        if (position > count) {
          count = position;
        }
      }
    });
  } catch (_) {
    console.log("No previous log files found.");
  }
  count = count + 1;
  return String(count);
}

function getRecentTwoFileNumbers(type: CypressLogType) {
  let previousLatest = 0
  let latest = 0
  const firstCharsDigits = /\d{1,}$/
  fs.readdirSync(getPathByCypressLogType(type)).forEach(function (
    filename: string,
  ) {
    const firstChars = filename.split('_')[0]
    if (firstCharsDigits.test(firstChars)) {
      const position = Number(firstChars);
      if (position > latest) {
        previousLatest = latest;
        latest = position;
      }
    }
  });
  return [previousLatest, latest];
}

export function getAllFileNumbers(type: CypressLogType) {
  const fileNumbers: number[] = []
  const firstCharsDigits = /\d{1,}$/
  fs.readdirSync(getPathByCypressLogType(type)).forEach(function (
    filename: string,
  ) {
    const firstChars = filename.split('_')[0]
    if (firstCharsDigits.test(firstChars)) {
      const position = Number(firstChars);
      fileNumbers.push(position);
    }
  });
  return fileNumbers;
}

export function getAllFileDetails(type: CypressLogType) {
  const fileDetails = new Map<number, Date>()
  const firstCharsDigits = /\d{1,}$/
  fs.readdirSync(getPathByCypressLogType(type)).forEach(function (
    filename: string,
  ) {
    const splittedString = filename.split(/\D/)
    const firstChars = splittedString[0]
    if (firstCharsDigits.test(firstChars)) {
      const date = new Date();
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
  const ret = new Map(
    Array.from(fileDetails).sort((a, b) => {
      return a[0] - b[0];
    })
  );
  return ret;
}

// export function compareRecentTwoFiles() {
//   const recentTwoFileNumbers = getRecentTwoFileNumbers()
//   compareFilesByNumber(recentTwoFileNumbers[0], recentTwoFileNumbers[1])
// }

export function compareFilesByNumber(
  type: CypressLogType,
  firstNumber: number,
  secondNumber: number
): CypressRunResultCompare | null {
  let firstContent: CypressCommandLine.CypressRunResult;
  let secondContent: CypressCommandLine.CypressRunResult;
  try {
    fs.readdirSync(getPathByCypressLogType(type)).forEach(function (
      filename: string,
    ) {
      const firstChars = filename.split('_')[0]
      const firstCharsDigits = /\d{1,}$/
      if (
        firstCharsDigits.test(firstChars) &&
        (Number(firstChars) === firstNumber ||
          Number(firstChars) === secondNumber)
      ) {
        const data: CypressCommandLine.CypressRunResult = JSON.parse(
          fs.readFileSync(
            `${getPathByCypressLogType(type)}/${filename}`,
            'utf8',
          ),
        )
        if (Number(firstChars) === firstNumber) {
          firstContent = data;
        } else {
          secondContent = data;
        }
      }
    });
  } catch (e) {
    console.log(e, "Unable to compare files by number");
  }
  return firstContent && secondContent
    ? compareFilesByContent(firstContent, secondContent)
    : null;
}

function compareFilesByContent(
  firstLog: CypressCommandLine.CypressRunResult,
  secondLog: CypressCommandLine.CypressRunResult
): CypressRunResultCompare {
  const cypressRunResultCompare = new CypressRunResultCompare();
  // Get the total duration of the test runs
  try {
    cypressRunResultCompare.runs = [];
    let durationOfFirstCypressRunResult = 0;
    let durationOfSecondCypressRunResult = 0;

    // Iterate over all run results of the second log
    for (const secondRunResultCompare of secondLog.runs) {
      let durationOfFirstRunResult = 0;
      let durationOfSecondRunResult = 0;
      const runResultCompare = new RunResultCompare();
      runResultCompare.name = secondRunResultCompare.spec.name;
      let firstRunResultFound = false;
      // Iterate over the run results of the first log
      // Until we find the file with the same name
      for (const firstRunResultCompare of firstLog.runs) {
        if (
          secondRunResultCompare.spec.name === firstRunResultCompare.spec.name
        ) {
          firstRunResultFound = true;
          // Iterate over the tests of the second run result
          for (const secondResultCompareTest of secondRunResultCompare.tests) {
            const testResultCompare = new TestResultCompare();
            testResultCompare.title = secondResultCompareTest.title;
            let firstTestResultFound = false;

            let durationOfFirstTests = 0;
            let durationOfSecondTests = 0;

            // Iterate over the tests of the first run result
            // Until we find the test with the same name
            for (const firstResultCompareTest of firstRunResultCompare.tests) {
              if (
                firstResultCompareTest.title[0] ===
                  secondResultCompareTest.title[0] &&
                firstResultCompareTest.title[1] ===
                  secondResultCompareTest.title[1]
              ) {
                if (firstResultCompareTest.state === "failed") {
                  if (secondResultCompareTest.state === "failed") {
                    testResultCompare.failDetected =
                      CypressFailed.FAILED_BOTH;
                  } else {
                    testResultCompare.failDetected =
                      CypressFailed.FAILED_FIRST;
                  }
                } else if (secondResultCompareTest.state === "failed") {
                  testResultCompare.failDetected =
                    CypressFailed.FAILED_SECOND;
                } else {
                  testResultCompare.failDetected = CypressFailed.FAILED_NONE;
                  let durationOfFirstTestAttempts = 0;
                  let durationOfSecondTestAttempts = 0;
                  firstTestResultFound = true;
                  testResultCompare.attemptCountRun1 =
                    firstResultCompareTest.attempts.length;
                  testResultCompare.attemptCountRun2 =
                    secondResultCompareTest.attempts.length;
                  testResultCompare.differenceDetected =
                    CypressDifference.NO_DIFFERENCE;
                  firstResultCompareTest.attempts.forEach((value) => {
                    durationOfFirstTestAttempts += value.duration;
                  });
                  secondResultCompareTest.attempts.forEach((value) => {
                    durationOfSecondTestAttempts += value.duration;
                  });
                  testResultCompare.durationDifference =
                    durationOfSecondTestAttempts - durationOfFirstTestAttempts;
                  testResultCompare.durationDifferencePercentage =
                    getPercentageDifference(
                      durationOfSecondTestAttempts,
                      durationOfFirstTestAttempts
                    );
                  durationOfFirstTests += durationOfFirstTestAttempts;
                  durationOfSecondTests += durationOfSecondTestAttempts;
                  if (
                    cypressRunResultCompare.lowestDurationDifference ===
                      undefined ||
                    testResultCompare.durationDifference <
                      cypressRunResultCompare.lowestDurationDifference
                  ) {
                    cypressRunResultCompare.lowestDurationDifference =
                      testResultCompare.durationDifference;
                  }
                  if (
                    cypressRunResultCompare.highestDurationDifference ===
                      undefined ||
                    testResultCompare.durationDifference >
                      cypressRunResultCompare.highestDurationDifference
                  ) {
                    cypressRunResultCompare.highestDurationDifference =
                      testResultCompare.durationDifference;
                  }
                  if (
                    cypressRunResultCompare.lowestDurationDifferencePercentage ===
                      undefined ||
                    testResultCompare.durationDifferencePercentage <
                      cypressRunResultCompare.lowestDurationDifferencePercentage
                  ) {
                    cypressRunResultCompare.lowestDurationDifferencePercentage =
                      testResultCompare.durationDifferencePercentage;
                  }
                  if (
                    cypressRunResultCompare.highestDurationDifferencePercentage ===
                      undefined ||
                    testResultCompare.durationDifferencePercentage >
                      cypressRunResultCompare.highestDurationDifferencePercentage
                  ) {
                    cypressRunResultCompare.highestDurationDifferencePercentage =
                      testResultCompare.durationDifferencePercentage;
                  }
                }
              }
            }
            if (!firstTestResultFound) {
              testResultCompare.differenceDetected =
                CypressDifference.NOT_FOUND_FIRST;
            }
            durationOfFirstRunResult += durationOfFirstTests;
            durationOfSecondRunResult += durationOfSecondTests;
            runResultCompare.tests.push(testResultCompare);
          }

          // Check which tests results of the first log arent handled
          for (const firstTestResultCompare of firstRunResultCompare.tests) {
            let secondTestResultFound = false;
            for (const secondTestResultCompare of secondRunResultCompare.tests) {
              if (
                firstTestResultCompare.title[0] ===
                  secondTestResultCompare.title[0] &&
                firstTestResultCompare.title[1] ===
                  secondTestResultCompare.title[1]
              ) {
                secondTestResultFound = true;
              }
            }
            if (!secondTestResultFound) {
              const testResultCompare = new TestResultCompare();
              testResultCompare.title = firstTestResultCompare.title;
              testResultCompare.differenceDetected =
                CypressDifference.NOT_FOUND_SECOND;
              runResultCompare.tests.push(testResultCompare);
            }
          }

          runResultCompare.durationDifference =
            durationOfSecondRunResult - durationOfFirstRunResult;
          runResultCompare.durationDifferencePercentage =
            getPercentageDifference(
              durationOfSecondRunResult,
              durationOfFirstRunResult
            );
          durationOfFirstCypressRunResult += durationOfFirstRunResult;
          durationOfSecondCypressRunResult += durationOfSecondRunResult;
          cypressRunResultCompare.runs.push(runResultCompare);
        }
      }
      if (!firstRunResultFound) {
        runResultCompare.differenceDetected =
          CypressDifference.NOT_FOUND_FIRST;
        cypressRunResultCompare.runs.push(runResultCompare);
      }
    }

    // Check which run results of the first log arent handled
    for (const firstRunResultCompare of firstLog.runs) {
      let secondRunResultFound = false;
      for (const secondRunResultCompare of secondLog.runs) {
        if (
          secondRunResultCompare.spec.name === firstRunResultCompare.spec.name
        ) {
          secondRunResultFound = true;
        }
      }
      if (!secondRunResultFound) {
        const runResultCompare = new RunResultCompare();
        runResultCompare.name = firstRunResultCompare.spec.name;
        runResultCompare.differenceDetected =
          CypressDifference.NOT_FOUND_SECOND;
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
    cypressRunResultCompare.durationDifferencePercentage =
      getPercentageDifference(
        durationOfSecondCypressRunResult,
        durationOfFirstCypressRunResult
      );
  } catch (_) {
    console.log("Unable to create compare file.");
  }
  return cypressRunResultCompare;
}

function getPercentageDifference(secondValue: number, firstValue: number) {
  return Number(((secondValue * 100) / firstValue).toFixed(2));
}

export function createCypressLog(
  type: CypressLogType,
  results:
    | CypressCommandLine.CypressRunResult
    | CypressCommandLine.CypressFailedRunResult
) {
  if (results.status === 'finished') {
    fs.mkdirSync(
      getPathByCypressLogType(type),
      { recursive: true },
      (err: any) => {
        if (err) {
          console.error(err)
        }
      },
    )
    fs.writeFileSync(
      `${getPathByCypressLogType(type)}/${getFileNumber(
        type,
      )}_${new Date()
        .toISOString()
        .split(":")
        .join("-")
        .split(".")
        .join("-")}.json`,
      JSON.stringify(results, null, "\t"),
      (err: any) => {
        if (err) {
          console.error(err);
        }
      }
    );
  } else {
    console.log("Something went wrong while reading the test results.");
  }
}

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
