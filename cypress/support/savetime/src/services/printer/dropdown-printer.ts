import { formatDate } from '../handler/date-handler'
import {
  compareFilesByNumber,
  getAllFileDetails,
} from '../handler/cypress-file-handler'
import { printResult } from './result-printer'

const delimiter = ':'

let selectElement1: HTMLSelectElement
let selectElement2: HTMLSelectElement
let selectedIndex1: number
let selectedIndex2: number
let dropdownLength: number

function getSelectedFirst(): number {
  return Number(selectElement1.value.split(delimiter)[0])
}
function getSelectedSecond(): number {
  return Number(selectElement2.value.split(delimiter)[0])
}

function printResultsElement(): void {
  printResult(compareFilesByNumber(getSelectedFirst(), getSelectedSecond()))
}

function init() {
  selectElement1 = document.getElementById('dropdown1') as HTMLSelectElement
  selectElement2 = document.getElementById('dropdown2') as HTMLSelectElement
  initDropdownOnChangeHandler()
}

export function printDropdowns() {
  init()
  clearSelectElement(selectElement1)
  clearSelectElement(selectElement2)
  const optionHTMLArray1: string[] = []
  const optionHTMLArray2: string[] = []
  dropdownLength = 0
  getAllFileDetails().forEach((value, key) => {
    optionHTMLArray1.push(getOption('dropdown1', key, value))
    optionHTMLArray2.push(getOption('dropdown2', key, value))
    dropdownLength++
  })
  selectElement1.innerHTML = optionHTMLArray1.join(' ')
  selectElement2.innerHTML = optionHTMLArray2.join(' ')
  setSelectedElements()
  printResultsElement()
}

function setSelectedElements() {
  if (!selectedIndex1 || !selectedIndex2) {
    selectedIndex1 = dropdownLength - 1
    selectedIndex2 = dropdownLength
  }
  selectElement1.value = document
    .getElementById(`dropdown1-${selectedIndex1}`)
    .innerHTML.trim()
  selectElement2.value = document
    .getElementById(`dropdown2-${selectedIndex2}`)
    .innerHTML.trim()
}

function getOption(id: string, key: number, date: Date) {
  return `
    <option id="${id}-${key}">
      ${key.toString() + delimiter + ' ' + formatDate(date)}
    </tr>
  `
}

function clearSelectElement(selectElement: HTMLSelectElement) {
  for (let index = 0; index < selectElement.length; index++) {
    selectElement.remove(0)
  }
}

function initDropdownOnChangeHandler() {
  selectElement1.onchange = function () {
    printResultsElement()
    selectedIndex1 = getSelectedFirst()
  }
  selectElement2.onchange = function () {
    printResultsElement()
    selectedIndex2 = getSelectedSecond()
  }
}
