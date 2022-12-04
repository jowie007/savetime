export enum CypressDifference {
  NO_DIFFERENCE = 'noDifference',
  NOT_FOUND_FIRST = 'notFoundFirst',
  NOT_FOUND_SECOND = 'notFoundSecond',
}

export class CypressRunResultCompare {
  durationDifference: number
  durationDifferencePercentage: number
  durationDifferenceWithoutMissingTests: number
  durationDifferenceWithoutMissingTestsPercentage: number
  lowestDurationDifference: number | undefined
  highestDurationDifference: number | undefined
  lowestDurationDifferencePercentage: number | undefined
  highestDurationDifferencePercentage: number | undefined
  runs: RunResultCompare[]

  constructor() {
    this.durationDifference = 0
    this.runs = []
  }
}

export class RunResultCompare {
  durationDifference: number
  durationDifferencePercentage: number
  durationDifferenceWithoutMissingTests: number
  durationDifferenceWithoutMissingTestsPercentage: number
  tests: TestResultCompare[]
  name: string
  differenceDetectedMessage: CypressDifference

  constructor() {
    this.durationDifference = 0
    this.tests = []
    this.name = ''
    this.differenceDetectedMessage = CypressDifference.NO_DIFFERENCE
  }
}

export class TestResultCompare {
  title: string[]
  durationDifference: number
  durationDifferencePercentage: number
  attemptCountRun1: number
  attemptCountRun2: number
  differenceDetectedMessage: CypressDifference

  constructor() {
    this.title = []
    this.durationDifference = 0
    this.attemptCountRun1 = 0
    this.attemptCountRun2 = 0
    this.differenceDetectedMessage = CypressDifference.NO_DIFFERENCE
  }
}
