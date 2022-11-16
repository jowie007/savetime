import { Locale } from "../services/handler/translation-handler";

export class Settings {
  locale: Locale;
  maxDurationDifference: number;

  constructor(locale: Locale, maxDurationDifference: number) {
    this.locale = locale;
    this.maxDurationDifference = maxDurationDifference;
  }
}
