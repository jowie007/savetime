import {
  CypressDifference,
  CypressRunResultCompare,
  RunResultCompare,
  TestResultCompare,
} from '../../classes/cypress-run-result-compare'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')
const RESULT_RAW_DIR = __dirname + '/../../../results/raw'
const RESULT_COMP_DIR = __dirname + '/../../../results/compare'

export { RESULT_COMP_DIR }

export function getFileNumber() {
  let count = 0
  const firstCharsDigits = /\d{1,}$/
  try {
    fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
      const firstChars = filename.split('_')[0]
      if (firstCharsDigits.test(firstChars)) {
        const position = Number(firstChars)
        if (position > count) {
          count = position
        }
      }
    })
  } catch (_) {
    console.log('No previous log files found.')
  }
  count = count + 1
  return String(count)
}

function getRecentTwoFileNumbers() {
  let previousLatest = 0
  let latest = 0
  const firstCharsDigits = /\d{1,}$/
  fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
    const firstChars = filename.split('_')[0]
    if (firstCharsDigits.test(firstChars)) {
      const position = Number(firstChars)
      if (position > latest) {
        previousLatest = latest
        latest = position
      }
    }
  })
  return [previousLatest, latest]
}

export function getAllFileNumbers() {
  const fileNumbers: number[] = []
  const firstCharsDigits = /\d{1,}$/
  fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
    const firstChars = filename.split('_')[0]
    if (firstCharsDigits.test(firstChars)) {
      const position = Number(firstChars)
      fileNumbers.push(position)
    }
  })
  return fileNumbers
}

export function getAllFileDetails() {
  const fileDetails = new Map<number, Date>()
  const firstCharsDigits = /\d{1,}$/
  fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
    const splittedString = filename.split(/\D/)
    const firstChars = splittedString[0]
    if (firstCharsDigits.test(firstChars)) {
      const date = new Date()
      date.setFullYear(Number(splittedString[1]))
      date.setMonth(Number(splittedString[2]) - 1)
      date.setDate(Number(splittedString[3]))
      date.setHours(Number(splittedString[4]))
      date.setMinutes(Number(splittedString[5]))
      date.setSeconds(Number(splittedString[6]))
      date.setMilliseconds(Number(splittedString[7]))
      fileDetails.set(Number(firstChars), new Date(date))
    }
  })
  const ret = new Map(
    Array.from(fileDetails).sort((a, b) => {
      return a[0] - b[0]
    }),
  )
  return ret
}

export function compareRecentTwoFiles() {
  const recentTwoFileNumbers = getRecentTwoFileNumbers()
  compareFilesByNumber(recentTwoFileNumbers[0], recentTwoFileNumbers[1])
}

export function compareFilesByNumber(
  firstNumber: number,
  secondNumber: number,
): CypressRunResultCompare | null {
  let firstContent: CypressCommandLine.CypressRunResult
  let secondContent: CypressCommandLine.CypressRunResult
  try {
    fs.readdirSync(RESULT_RAW_DIR).forEach(function (filename: string) {
      const firstChars = filename.split('_')[0]
      const firstCharsDigits = /\d{1,}$/
      if (
        firstCharsDigits.test(firstChars) &&
        (Number(firstChars) === firstNumber ||
          Number(firstChars) === secondNumber)
      ) {
        const data: CypressCommandLine.CypressRunResult = JSON.parse(
          fs.readFileSync(`${RESULT_RAW_DIR}/${filename}`, 'utf8'),
        )
        if (Number(firstChars) === firstNumber) {
          firstContent = data
        } else {
          secondContent = data
        }
      }
    })
  } catch (e) {
    console.log(e, 'Unable to compare files by number')
  }
  return firstContent && secondContent
    ? compareFilesByContent(firstContent, secondContent)
    : null
}

function compareFilesByContent(
  firstLog: CypressCommandLine.CypressRunResult,
  secondLog: CypressCommandLine.CypressRunResult,
): CypressRunResultCompare {
  const cypressRunResultCompare = new CypressRunResultCompare()
  // Get the total duration of the test runs
  try {
    cypressRunResultCompare.durationDifference =
      secondLog.totalDuration - firstLog.totalDuration
    cypressRunResultCompare.durationDifferencePercentage = getPercentageDifference(
      secondLog.totalDuration,
      firstLog.totalDuration,
    )
    cypressRunResultCompare.runs = []
    let durationDifferenceOfMissingTestsCombined = 0

    // Iterate over all run results of the second log
    for (const secondRunResultCompare of secondLog.runs) {
      const runResultCompare = new RunResultCompare()
      runResultCompare.name = secondRunResultCompare.spec.name
      let firstRunResultFound = false
      // Iterate over the run results of the first log
      // Until we find the file with the same name
      for (const firstRunResultCompare of firstLog.runs) {
        if (
          secondRunResultCompare.spec.name === firstRunResultCompare.spec.name
        ) {
          firstRunResultFound = true

          // Calculate the duration differences
          runResultCompare.durationDifference =
            secondRunResultCompare.stats.duration -
            firstRunResultCompare.stats.duration
          runResultCompare.durationDifferencePercentage = getPercentageDifference(
            secondRunResultCompare.stats.duration,
            firstRunResultCompare.stats.duration,
          )
          let durationDifferenceOfMissingTests = 0

          // Iterate over the tests of the second run result
          for (const secondTestResultCompare of secondRunResultCompare.tests) {
            const testResultCompare = new TestResultCompare()
            testResultCompare.title = secondTestResultCompare.title
            let firstTestResultFound = false
            const secondTestResultCompareLastAttempt = secondTestResultCompare.attempts.pop()

            // Iterate over the tests of the first run result
            // Until we find the test with the same name
            for (const firstTestResultCompare of firstRunResultCompare.tests) {
              if (
                firstTestResultCompare.title[0] ===
                  secondTestResultCompare.title[0] &&
                firstTestResultCompare.title[1] ===
                  secondTestResultCompare.title[1]
              ) {
                firstTestResultFound = true
                // Pop the last attempt of the test
                const firstTestResultCompareLastAttempt = firstTestResultCompare.attempts.pop()
                // Plus 1, because 1 is popped
                testResultCompare.attemptCountRun1 =
                  firstTestResultCompare.attempts.length + 1
                testResultCompare.attemptCountRun2 =
                  secondTestResultCompare.attempts.length + 1
                testResultCompare.differenceDetectedMessage =
                  CypressDifference.NO_DIFFERENCE
                testResultCompare.durationDifference =
                  secondTestResultCompareLastAttempt.duration -
                  firstTestResultCompareLastAttempt.duration
                if (
                  cypressRunResultCompare.lowestDurationDifference ===
                    undefined ||
                  testResultCompare.durationDifference <
                    cypressRunResultCompare.lowestDurationDifference
                ) {
                  cypressRunResultCompare.lowestDurationDifference =
                    testResultCompare.durationDifference
                }
                if (
                  cypressRunResultCompare.highestDurationDifference ===
                    undefined ||
                  testResultCompare.durationDifference >
                    cypressRunResultCompare.highestDurationDifference
                ) {
                  cypressRunResultCompare.highestDurationDifference =
                    testResultCompare.durationDifference
                }
                testResultCompare.durationDifferencePercentage = getPercentageDifference(
                  secondTestResultCompareLastAttempt.duration,
                  firstTestResultCompareLastAttempt.duration,
                )
                if (
                  cypressRunResultCompare.lowestDurationDifferencePercentage ===
                    undefined ||
                  testResultCompare.durationDifferencePercentage <
                    cypressRunResultCompare.lowestDurationDifferencePercentage
                ) {
                  cypressRunResultCompare.lowestDurationDifferencePercentage =
                    testResultCompare.durationDifferencePercentage
                }
                if (
                  cypressRunResultCompare.highestDurationDifferencePercentage ===
                    undefined ||
                  testResultCompare.durationDifferencePercentage >
                    cypressRunResultCompare.highestDurationDifferencePercentage
                ) {
                  cypressRunResultCompare.highestDurationDifferencePercentage =
                    testResultCompare.durationDifferencePercentage
                }
              }
            }
            if (!firstTestResultFound) {
              testResultCompare.durationDifference =
                secondTestResultCompareLastAttempt.duration
              testResultCompare.attemptCountRun1 = 0
              testResultCompare.attemptCountRun2 =
                secondTestResultCompare.attempts.length
              testResultCompare.differenceDetectedMessage =
                CypressDifference.NOT_FOUND_FIRST
              durationDifferenceOfMissingTests +=
                secondTestResultCompareLastAttempt.duration
            }
            runResultCompare.tests.push(testResultCompare)
          }

          // Check which tests results of the first log arent handled
          for (const firstTestResultCompare of firstRunResultCompare.tests) {
            let secondTestResultFound = false
            for (const secondTestResultCompare of secondRunResultCompare.tests) {
              if (
                firstTestResultCompare.title[0] ===
                  secondTestResultCompare.title[0] &&
                firstTestResultCompare.title[1] ===
                  secondTestResultCompare.title[1]
              ) {
                secondTestResultFound = true
              }
            }
            if (!secondTestResultFound) {
              const testResultCompare = new TestResultCompare()
              testResultCompare.title = firstTestResultCompare.title
              testResultCompare.attemptCountRun1 =
                firstTestResultCompare.attempts.length
              testResultCompare.attemptCountRun2 = 0
              testResultCompare.differenceDetectedMessage =
                CypressDifference.NOT_FOUND_SECOND
              durationDifferenceOfMissingTests -= firstTestResultCompare.attempts.pop()
                .duration
              runResultCompare.tests.push(testResultCompare)
            }
          }
          runResultCompare.durationDifferenceWithoutMissingTests =
            runResultCompare.durationDifference -
            durationDifferenceOfMissingTests
          runResultCompare.durationDifferenceWithoutMissingTestsPercentage = getPercentageDifference(
            secondRunResultCompare.stats.duration,
            firstRunResultCompare.stats.duration,
          )
          durationDifferenceOfMissingTestsCombined += durationDifferenceOfMissingTests
          cypressRunResultCompare.runs.push(runResultCompare)
        }
      }
      if (!firstRunResultFound) {
        runResultCompare.differenceDetectedMessage =
          CypressDifference.NOT_FOUND_FIRST
        cypressRunResultCompare.runs.push(runResultCompare)
      }
    }

    // Check which run results of the first log arent handled
    for (const firstRunResultCompare of firstLog.runs) {
      let secondRunResultFound = false
      for (const secondRunResultCompare of secondLog.runs) {
        if (
          secondRunResultCompare.spec.name === firstRunResultCompare.spec.name
        ) {
          secondRunResultFound = true
        }
      }
      if (!secondRunResultFound) {
        const runResultCompare = new RunResultCompare()
        runResultCompare.name = firstRunResultCompare.spec.name
        runResultCompare.differenceDetectedMessage =
          CypressDifference.NOT_FOUND_SECOND
        cypressRunResultCompare.runs.push(runResultCompare)
      }
    }
    cypressRunResultCompare.durationDifferenceWithoutMissingTests =
      cypressRunResultCompare.durationDifference -
      durationDifferenceOfMissingTestsCombined
    cypressRunResultCompare.durationDifferenceWithoutMissingTestsPercentage = getPercentageDifference(
      secondLog.totalDuration,
      firstLog.totalDuration,
    )
    // const recentTwoFileNumbers = getRecentTwoFileNumbers()
    // createCypressCompareLog(
    //   recentTwoFileNumbers[0],
    //   recentTwoFileNumbers[1],
    //   cypressRunResultCompare,
    // )
  } catch (_) {
    console.log('Unable to create compare file.')
  }
  return cypressRunResultCompare
}

function getPercentageDifference(secondValue: number, firstValue: number) {
  return Number(((secondValue * 100) / firstValue).toFixed(2))
}

export function createCypressLog(
  results:
    | CypressCommandLine.CypressRunResult
    | CypressCommandLine.CypressFailedRunResult,
) {
  if (results.status === 'finished') {
    fs.mkdirSync(RESULT_RAW_DIR, { recursive: true }, (err: any) => {
      if (err) {
        console.error(err)
      }
    })
    fs.writeFileSync(
      `${RESULT_RAW_DIR}/${getFileNumber()}_${new Date()
        .toISOString()
        .split(':')
        .join('-')
        .split('.')
        .join('-')}.json`,
      JSON.stringify(results, null, '\t'),
      (err: any) => {
        if (err) {
          console.error(err)
        }
      },
    )
  } else {
    console.log('Something went wrong while reading the test results.')
  }
}

function createCypressCompareLog(
  firstNumber: number,
  secondNumber: number,
  logs: CypressRunResultCompare,
) {
  fs.mkdirSync(RESULT_COMP_DIR, { recursive: true }, (err: any) => {
    if (err) {
      console.error(err)
    }
  })
  fs.writeFileSync(
    `${RESULT_COMP_DIR}/${secondNumber}_vs_${firstNumber}.json`,
    JSON.stringify(logs, null, '\t'),
    (err: any) => {
      if (err) {
        console.error(err)
      }
    },
  )
}
