import { Locale } from "../services/handler/translation-handler";

export class Settings {
  locale: Locale;
  maxDurationDifference: number;
  percentageValues: boolean;

  constructor(
    locale: Locale,
    maxDurationDifference: number,
    percentageValues: boolean
  ) {
    this.locale = locale;
    this.maxDurationDifference = maxDurationDifference;
    this.percentageValues = percentageValues;
  }
}

export const INITIAL_SETTINGS: Settings = {
  locale: 1,
  maxDurationDifference: 1000,
  percentageValues: false,
};
