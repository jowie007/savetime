export class CypressRunResultCompare {
  durationDifference: number;
  durationDifferenceWithoutMissingTests: number;
  runs: RunResultCompare[];

  constructor() {
    this.durationDifference = 0;
    this.runs = [];
  }
}

export class RunResultCompare {
  durationDifference: number;
  durationDifferenceWithoutMissingTests: number;
  tests: TestResultCompare[];
  name: string;
  differenceDetectedMessage: string | null;

  constructor() {
    this.durationDifference = 0;
    this.tests = [];
    this.name = "";
    this.differenceDetectedMessage = null;
  }
}

export class TestResultCompare {
  title: string[];
  durationDifference: number;
  attemptCountDifference: number;
  differenceDetectedMessage: string | null;

  constructor() {
    this.title = [];
    this.durationDifference = 0;
    this.attemptCountDifference = 0;
    this.differenceDetectedMessage = null;
  }
}
