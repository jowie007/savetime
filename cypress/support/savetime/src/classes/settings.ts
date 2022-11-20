import { Locale } from './locale'

export class Settings {
  locale: Locale
  maxDurationDifference: number
  maxDurationDifferencePercentage: number
  percentageValues: boolean
  onlyCriticalTests: boolean

  constructor(
    locale: Locale,
    maxDurationDifference: number,
    maxDurationDifferencePercentage: number,
    percentageValues: boolean,
    onlyCriticalTests: boolean,
  ) {
    this.locale = locale
    this.maxDurationDifference = maxDurationDifference
    this.maxDurationDifferencePercentage = maxDurationDifferencePercentage
    this.percentageValues = percentageValues
    this.onlyCriticalTests = onlyCriticalTests
  }
}

export const INITIAL_SETTINGS: Settings = {
  locale: Locale.EN,
  maxDurationDifference: 1000,
  maxDurationDifferencePercentage: 200,
  percentageValues: false,
  onlyCriticalTests: false,
}
