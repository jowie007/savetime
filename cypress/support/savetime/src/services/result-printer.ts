import { getTranslation, Locale } from './translation-handler'
import { CypressRunResultCompare } from '../classes/cypress-run-result-compare'

let initialized = false
let nothingToCompare: HTMLElement
let somethingToCompare: HTMLElement
let overall__caption: HTMLElement
let overall__durationDifference__th: HTMLElement
let overall__durationDifference__td: HTMLElement
let overall__durationDifferenceWithoutMissingTests__th: HTMLElement
let overall__durationDifferenceWithoutMissingTests__td: HTMLElement

function init() {
  if (!initialized) {
    nothingToCompare = document.getElementById('nothingToCompare')
    nothingToCompare.innerText = getTranslation('nothingToCompare')
    somethingToCompare = document.getElementById('somethingToCompare')
    overall__caption = document.getElementById('overall__caption')
    overall__durationDifference__th = document.getElementById(
      'overall__durationDifference__th',
    )
    overall__durationDifference__td = document.getElementById(
      'overall__durationDifference__td',
    )
    overall__durationDifferenceWithoutMissingTests__th = document.getElementById(
      'overall__durationDifferenceWithoutMissingTests__th',
    )
    overall__durationDifferenceWithoutMissingTests__td = document.getElementById(
      'overall__durationDifferenceWithoutMissingTests__td',
    )
  }
}

export function printResult(result: CypressRunResultCompare): void {
  init()
  if (result === null) {
    nothingToCompare.style.visibility = 'visible'
    somethingToCompare.style.visibility = 'hidden'
  } else {
    fillOverallTables(result)
    nothingToCompare.style.visibility = 'hidden'
    somethingToCompare.style.visibility = 'visible'
  }
}

function fillOverallTables(result: CypressRunResultCompare): void {
  overall__caption.innerText = getTranslation('overall__caption')
  overall__durationDifference__th.innerText = getTranslation(
    'overall__durationDifference__th',
  )
  overall__durationDifferenceWithoutMissingTests__th.innerText = getTranslation(
    'overall__durationDifferenceWithoutMissingTests__th',
  )
  overall__durationDifference__td.innerText = result.durationDifference.toString()
  overall__durationDifferenceWithoutMissingTests__td.innerText = result.durationDifferenceWithoutMissingTests.toString()
}

// function createOverallTables(result: CypressRunResultCompare): HTMLElement {
//   const runs = document.createElement('div')
//   result.runs
//   return runs
// }
