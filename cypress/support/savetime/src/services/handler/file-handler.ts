import {
  CypressRunResultCompare,
  RunResultCompare,
  TestResultCompare,
} from "../../classes/cypress-run-result-compare";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");
const RESULT_RAW_DIR = __dirname + "/../../results/raw";
const RESULT_COMP_DIR = __dirname + "/../../results/compare";

export { RESULT_COMP_DIR };

export function getFileNumber(): string {
  let count = 0;
  const firstCharsDigits = /\d{1,}$/;
  try {
    fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
      const firstChars = filename.split("_")[0];
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

function getRecentTwoFileNumbers() {
  let previousLatest = 0;
  let latest = 0;
  const firstCharsDigits = /\d{1,}$/;
  fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
    const firstChars = filename.split("_")[0];
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

export function getAllFileNumbers() {
  const fileNumbers: number[] = [];
  const firstCharsDigits = /\d{1,}$/;
  fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
    const firstChars = filename.split("_")[0];
    if (firstCharsDigits.test(firstChars)) {
      const position = Number(firstChars);
      fileNumbers.push(position);
    }
  });
  return fileNumbers;
}

export function getAllFileDetails() {
  const fileDetails = new Map<number, Date>();
  const firstCharsDigits = /\d{1,}$/;
  fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
    const splittedString = filename.split(/\D/);
    const firstChars = splittedString[0];
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
  return fileDetails;
}

export function compareRecentTwoFiles() {
  const recentTwoFileNumbers = getRecentTwoFileNumbers();
  compareFilesByNumber(recentTwoFileNumbers[0], recentTwoFileNumbers[1]);
}

export function compareFilesByNumber(
  firstNumber: number,
  secondNumber: number
): CypressRunResultCompare | null {
  let firstContent: CypressCommandLine.CypressRunResult;
  let secondContent: CypressCommandLine.CypressRunResult;
  try {
    fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
      const firstChars = filename.split("_")[0];
      const firstCharsDigits = /\d{1,}$/;
      if (
        firstCharsDigits.test(firstChars) &&
        (Number(firstChars) === firstNumber ||
          Number(firstChars) === secondNumber)
      ) {
        const data: CypressCommandLine.CypressRunResult = JSON.parse(
          fs.readFileSync(`${RESULT_RAW_DIR}/${filename}`, "utf8")
        );
        if (Number(firstChars) === firstNumber) {
          firstContent = data;
        } else {
          secondContent = data;
        }
      }
    });
  } catch (e) {
    console.log("Unable to compare files by number");
  }
  console.log(firstNumber, secondNumber);
  return firstContent && secondContent
    ? compareFilesByContent(firstContent, secondContent)
    : null;
}

function compareFilesByContent(
  firstLog: CypressCommandLine.CypressRunResult,
  secondLog: CypressCommandLine.CypressRunResult
): CypressRunResultCompare {
  const cypressRunResultCompare = new CypressRunResultCompare();
  try {
    cypressRunResultCompare.durationDifference =
      secondLog.totalDuration - firstLog.totalDuration;
    cypressRunResultCompare.runs = [];
    let durationDifferenceOfMissingTestsCombined = 0;

    for (const secondRunResultCompare of secondLog.runs) {
      const runResultCompare = new RunResultCompare();
      runResultCompare.name = secondRunResultCompare.spec.name;
      let firstRunResultFound = false;
      for (const firstRunResultCompare of firstLog.runs) {
        if (
          secondRunResultCompare.spec.name === firstRunResultCompare.spec.name
        ) {
          firstRunResultFound = true;
          runResultCompare.durationDifference =
            secondRunResultCompare.stats.duration -
            firstRunResultCompare.stats.duration;
          let durationDifferenceOfMissingTests = 0;
          for (const secondTestResultCompare of secondRunResultCompare.tests) {
            const testResultCompare = new TestResultCompare();
            testResultCompare.title = secondTestResultCompare.title;
            let firstTestResultFound = false;
            const secondTestResultCompareLastAttempt =
              secondTestResultCompare.attempts.pop();
            for (const firstTestResultCompare of firstRunResultCompare.tests) {
              if (
                firstTestResultCompare.title[0] ===
                  secondTestResultCompare.title[0] &&
                firstTestResultCompare.title[1] ===
                  secondTestResultCompare.title[1]
              ) {
                firstTestResultFound = true;
                const firstTestResultCompareLastAttempt =
                  firstTestResultCompare.attempts.pop();
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
  } catch (_) {
    console.log("Unable to create compare file.");
  }
  return cypressRunResultCompare;
}

export function createCypressLog(
  results:
    | CypressCommandLine.CypressRunResult
    | CypressCommandLine.CypressFailedRunResult
) {
  if (results.status === "finished") {
    fs.mkdirSync(RESULT_RAW_DIR, { recursive: true }, (err: any) => {
      if (err) {
        console.error(err);
      }
    });
    fs.writeFileSync(
      `${RESULT_RAW_DIR}/${getFileNumber()}_${new Date()
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

function createCypressCompareLog(
  firstNumber: number,
  secondNumber: number,
  logs: CypressRunResultCompare
) {
  fs.mkdirSync(RESULT_COMP_DIR, { recursive: true }, (err: any) => {
    if (err) {
      console.error(err);
    }
  });
  fs.writeFileSync(
    `${RESULT_COMP_DIR}/${secondNumber}_vs_${firstNumber}.json`,
    JSON.stringify(logs, null, "\t"),
    (err: any) => {
      if (err) {
        console.error(err);
      }
    }
  );
}
