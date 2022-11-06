import { formatDate } from './services/date-handler.js'
import {
  compareFilesByNumber,
  getAllFileDetails,
} from './services/file-handler.js'
import { printResult } from './services/result-printer.js'

const delimiter = ':'

var dynamicSelect1: HTMLSelectElement
var dynamicSelect2: HTMLSelectElement
var compareResults: HTMLElement

function getSelectedFirst(): number {
  return Number(dynamicSelect1.value.split(delimiter)[0])
}
function getSelectedSecond(): number {
  return Number(dynamicSelect2.value.split(delimiter)[0])
}

function setCompareResults(): void {
  compareResults = printResult(
    compareFilesByNumber(getSelectedFirst(), getSelectedSecond()),
  )
}

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector: string, text: string) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
  //   for (const type of ['chrome', 'node', 'electron']) {
  //     replaceText(`${type}-version`, process.versions[type])
  //   }
  dynamicSelect1 = document.getElementById('dropdown1') as HTMLSelectElement
  dynamicSelect2 = document.getElementById('dropdown2') as HTMLSelectElement
  compareResults = document.getElementById('compareResults') as HTMLElement
  getAllFileDetails().forEach((value, key) => {
    const text = key.toString() + delimiter + ' ' + formatDate(value)
    const newOption1 = document.createElement('option')
    const newOption2 = document.createElement('option')
    newOption1.text = text
    newOption2.text = text
    newOption1.setAttribute('id', 'dropdown1-' + key)
    newOption2.setAttribute('id', 'dropdown2-' + key)
    dynamicSelect1.add(newOption1)
    dynamicSelect2.add(newOption2)
  })
  dynamicSelect1.onchange = function () {
    console.log('Key: ', dynamicSelect1.value.split(delimiter)[0])
    setCompareResults()
  }
  dynamicSelect2.onchange = function () {
    console.log('Key: ', dynamicSelect2.value.split(delimiter)[0])
    setCompareResults()
  }
  setCompareResults()
})
