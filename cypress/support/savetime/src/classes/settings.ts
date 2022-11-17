import { Locale } from "../services/handler/translation-handler";

export class Settings {
  locale: Locale;
  maxDurationDifference: number;
  maxDurationDifferencePercentage: number;
  percentageValues: boolean;
  onlyCriticalTests: boolean;

  constructor(
    locale: Locale,
    maxDurationDifference: number,
    maxDurationDifferencePercentage: number,
    percentageValues: boolean,
    onlyCriticalTests: boolean
  ) {
    this.locale = locale;
    this.maxDurationDifference = maxDurationDifference;
    this.maxDurationDifferencePercentage = maxDurationDifferencePercentage;
    this.percentageValues = percentageValues;
    this.onlyCriticalTests = onlyCriticalTests;
  }
}

export const INITIAL_SETTINGS: Settings = {
  locale: 1,
  maxDurationDifference: 1000,
  maxDurationDifferencePercentage: 200,
  percentageValues: false,
  onlyCriticalTests: false,
};
