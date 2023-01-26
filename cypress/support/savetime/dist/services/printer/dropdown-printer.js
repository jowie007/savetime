// import { DELIMITER, getFormatDateWithPosition } from '../handler/date-handler'
// import { compareFilesByNumber } from '../handler/cypress-file-handler'
// import { printResult } from './result-printer'
// import { getCypressLogFiles } from '../store/cypress-file-store'
// import { getType } from '../store/settings-store';
// let selection__dropdown1: HTMLSelectElement
// let selection__dropdown2: HTMLSelectElement
// let selectedIndex1: number
// let selectedIndex2: number
// let dropdownLength: number
// function getSelectedFirst(): number {
//   return Number(selection__dropdown1.value.split(DELIMITER)[0])
// }
// function getSelectedSecond(): number {
//   return Number(selection__dropdown2.value.split(DELIMITER)[0])
// }
// function printResultsElement() {
//   printResult(compareFilesByNumber(getType(), getSelectedFirst(), getSelectedSecond()))
// }
// function init() {
//   selection__dropdown1 = document.getElementById(
//     'selection__dropdown1',
//   ) as HTMLSelectElement
//   selection__dropdown2 = document.getElementById(
//     'selection__dropdown2',
//   ) as HTMLSelectElement
//   initDropdownOnChangeHandler()
//   clearSelectElement(selection__dropdown1)
//   clearSelectElement(selection__dropdown2)
//   const optionHTMLArray1: string[] = []
//   const optionHTMLArray2: string[] = []
//   dropdownLength = 0
//   getCypressLogFiles().forEach((value, key) => {
//     optionHTMLArray1.push(getOption('selection__dropdown1', key, value))
//     optionHTMLArray2.push(getOption('selection__dropdown2', key, value))
//     dropdownLength++
//   })
//   selection__dropdown1.innerHTML = optionHTMLArray1.join(' ')
//   selection__dropdown2.innerHTML = optionHTMLArray2.join(' ')
//   setSelectedElements()
//   printResultsElement()
// }
// export function printDropdowns() {
//   init()
// }
// function setSelectedElements() {
//   if (!selectedIndex1 || !selectedIndex2) {
//     selectedIndex1 = dropdownLength - 1
//     selectedIndex2 = dropdownLength
//   }
//   selection__dropdown1.value = document
//     .getElementById(`selection__dropdown1-${selectedIndex1}`)
//     .innerHTML.trim()
//   selection__dropdown2.value = document
//     .getElementById(`selection__dropdown2-${selectedIndex2}`)
//     .innerHTML.trim()
// }
// function getOption(id: string, key: number, date: Date) {
//   return `
//     <option id="${id}-${key}">
//       ${getFormatDateWithPosition(date, key)}
//     </tr>
//   `
// }
// function clearSelectElement(selectElement: HTMLSelectElement) {
//   for (let index = 0; index < selectElement.length; index++) {
//     selectElement.remove(0)
//   }
// }
// function initDropdownOnChangeHandler() {
//   selection__dropdown1.onchange = function () {
//     printResultsElement()
//     selectedIndex1 = getSelectedFirst()
//   }
//   selection__dropdown2.onchange = function () {
//     printResultsElement()
//     selectedIndex2 = getSelectedSecond()
//   }
// }
//# sourceMappingURL=dropdown-printer.js.map