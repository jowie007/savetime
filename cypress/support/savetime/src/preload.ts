import { formatDate } from './services/date-handler.js'
import {
  compareFilesByNumber,
  getAllFileDetails,
} from './services/file-handler.js'
import { printResult } from './services/result-printer.js'

const delimiter = ':'

var selectElement1: HTMLSelectElement
var selectElement2: HTMLSelectElement

function getSelectedFirst(): number {
  return Number(selectElement1.value.split(delimiter)[0])
}
function getSelectedSecond(): number {
  return Number(selectElement2.value.split(delimiter)[0])
}

function setcompareResultsElement(): void {
  printResult(compareFilesByNumber(getSelectedFirst(), getSelectedSecond()))
}

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector: string, text: string) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
  //   for (const type of ['chrome', 'node', 'electron']) {
  //     replaceText(`${type}-version`, process.versions[type])
  //   }
  selectElement1 = document.getElementById('dropdown1') as HTMLSelectElement
  selectElement2 = document.getElementById('dropdown2') as HTMLSelectElement
  getAllFileDetails().forEach((value, key) => {
    const text = key.toString() + delimiter + ' ' + formatDate(value)
    const newOption1 = document.createElement('option')
    const newOption2 = document.createElement('option')
    newOption1.text = text
    newOption2.text = text
    newOption1.setAttribute('id', 'dropdown1-' + key)
    newOption2.setAttribute('id', 'dropdown2-' + key)
    selectElement1.add(newOption1)
    selectElement2.add(newOption2)
  })
  selectElement1.onchange = function () {
    console.log('Key: ', selectElement1.value.split(delimiter)[0])
    setcompareResultsElement()
  }
  selectElement2.onchange = function () {
    console.log('Key: ', selectElement2.value.split(delimiter)[0])
    setcompareResultsElement()
  }
  setcompareResultsElement()
})
