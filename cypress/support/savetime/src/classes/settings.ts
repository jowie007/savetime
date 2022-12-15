import { CypressLogType } from './cypress-log-type'
import { Locale } from './locale'

export class SaveSettings {
  locale: Locale
  type: CypressLogType
  maxDurationDifference: number
  maxDurationDifferencePercentage: number
  percentageValues: boolean
  onlyCriticalTests: boolean

  constructor(
    locale: Locale,
    type: CypressLogType,
    maxDurationDifference: number,
    maxDurationDifferencePercentage: number,
    percentageValues: boolean,
    onlyCriticalTests: boolean,
  ) {
    this.locale = locale
    this.type = type
    this.maxDurationDifference = maxDurationDifference
    this.maxDurationDifferencePercentage = maxDurationDifferencePercentage
    this.percentageValues = percentageValues
    this.onlyCriticalTests = onlyCriticalTests
  }
}

export class Settings extends SaveSettings {
  locale: Locale
  type: CypressLogType
  maxDurationDifference: number
  maxDurationDifferencePercentage: number
  compareSpans: boolean
  percentageValues: boolean
  onlyCriticalTests: boolean

  constructor(
    locale: Locale,
    type: CypressLogType,
    maxDurationDifference: number,
    maxDurationDifferencePercentage: number,
    percentageValues: boolean,
    onlyCriticalTests: boolean,
  ) {
    super(
      locale,
      type,
      maxDurationDifference,
      maxDurationDifferencePercentage,
      percentageValues,
      onlyCriticalTests,
    )
    this.compareSpans = false
  }
}

export const INITIAL_SETTINGS: Settings = {
  locale: Locale.EN,
  type: CypressLogType.e2e,
  maxDurationDifference: 1000,
  maxDurationDifferencePercentage: 200,
  compareSpans: false,
  percentageValues: false,
  onlyCriticalTests: false,
}
