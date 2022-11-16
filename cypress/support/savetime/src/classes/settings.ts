import { Locale } from "../services/handler/translation-handler";

export class Settings {
  locale: Locale;
  maxDurationDifference: number;
  maxDurationDifferencePercentage: number;
  percentageValues: boolean;

  constructor(
    locale: Locale,
    maxDurationDifference: number,
    maxDurationDifferencePercentage: number,
    percentageValues: boolean
  ) {
    this.locale = locale;
    this.maxDurationDifference = maxDurationDifference;
    this.maxDurationDifferencePercentage = maxDurationDifferencePercentage;
    this.percentageValues = percentageValues;
  }
}

export const INITIAL_SETTINGS: Settings = {
  locale: 1,
  maxDurationDifference: 1000,
  maxDurationDifferencePercentage: 200,
  percentageValues: false,
};
