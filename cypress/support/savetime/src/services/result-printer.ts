import { getTranslation, Locale } from './translation-handler'
import {
  CypressRunResultCompare,
  RunResultCompare,
} from '../classes/cypress-run-result-compare'

let initialized = false
let nothingToCompare: HTMLElement
let somethingToCompare: HTMLElement
let overall__caption: HTMLElement
let overall__durationDifference__th: HTMLElement
let overall__durationDifference__td: HTMLElement
let overall__durationDifferenceWithoutMissingTests__th: HTMLElement
let overall__durationDifferenceWithoutMissingTests__td: HTMLElement
let run: HTMLElement
// let run__caption: HTMLElement
// let run__durationDifference__th: HTMLElement
// let run__durationDifference__td: HTMLElement
// let run__durationDifferenceWithoutMissingTests__th: HTMLElement
// let run__durationDifferenceWithoutMissingTests__td: HTMLElement

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
    run = document.getElementById('run')
    run.style.visibility = 'hidden'
    // run__caption = document.getElementById('run__caption')
    // run__durationDifference__th = document.getElementById(
    //   'run__durationDifference__th',
    // )
    // run__durationDifference__td = document.getElementById(
    //   'run__durationDifference__td',
    // )
    // run__durationDifferenceWithoutMissingTests__th = document.getElementById(
    //   'run__durationDifferenceWithoutMissingTests__th',
    // )
    // run__durationDifferenceWithoutMissingTests__td = document.getElementById(
    //   'run__durationDifferenceWithoutMissingTests__td',
    // )
  }
}

export function printResult(result: CypressRunResultCompare): void {
  init()
  if (result === null) {
    nothingToCompare.style.visibility = 'visible'
    somethingToCompare.style.visibility = 'hidden'
  } else {
    fillOverallTables(result)
    fillRunTables(result)
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

function fillRunTables(result: CypressRunResultCompare) {
  result.runs.forEach((value: RunResultCompare, index: number) => {
    const run__clone = run.cloneNode(true) as HTMLElement
    run__clone.id += '-' + index
    run__clone.style.visibility = 'visible'
    const childElements = run__clone.getElementsByTagName('*')
    let count = 0
    let element = childElements[count]
    while (element) {
      console.log(element.id)
      if (element.id !== '') {
        element.id += '-' + index
      }
      count++
      element = childElements[count]
    }
    somethingToCompare.append(run__clone)
  })
}
