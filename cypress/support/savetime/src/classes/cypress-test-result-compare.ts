export enum CypressDifference {
  NO_DIFFERENCE = "noDifference",
  NOT_FOUND_FIRST = "notFoundFirst",
  NOT_FOUND_SECOND = "notFoundSecond",
}

export enum CypressFailed {
  FAILED_NONE = "failedNone",
  FAILED_BOTH = "failedBoth",
  FAILED_FIRST = "failedFirst",
  FAILED_SECOND = "failedSecond",
}

export class CypressRunResultCompare {
  durationDifference: number;
  durationDifferencePercentage: number;
  lowestDurationDifference: number | undefined;
  highestDurationDifference: number | undefined;
  lowestDurationDifferencePercentage: number | undefined;
  highestDurationDifferencePercentage: number | undefined;
  runs: RunResultCompare[];

  constructor() {
    this.durationDifference = 0;
    this.runs = [];
  }
}

export class RunResultCompare {
  durationDifference: number;
  durationDifferencePercentage: number;
  tests: TestResultCompare[];
  name: string;
  differenceDetected: CypressDifference;

  constructor() {
    this.durationDifference = 0;
    this.tests = [];
    this.name = "";
    this.differenceDetected = CypressDifference.NO_DIFFERENCE;
  }
}

export class TestResultCompare {
  title: string[];
  durationDifference: number;
  durationDifferencePercentage: number;
  attemptCountRun1: number;
  attemptCountRun2: number;
  differenceDetected: CypressDifference;
  failDetected: CypressFailed;

  constructor() {
    this.title = [];
    this.durationDifference = 0;
    this.attemptCountRun1 = 0;
    this.attemptCountRun2 = 0;
    this.differenceDetected = CypressDifference.NO_DIFFERENCE;
    this.failDetected = CypressFailed.FAILED_NONE;
  }
}
