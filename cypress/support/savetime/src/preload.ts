import { formatDate } from './services/date-handler.js'
import { getAllFileDetails } from './services/file-handler.js'

const delimiter = ':'

window.addEventListener('DOMContentLoaded', () => {
  // const replaceText = (selector: string, text: string) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
  //   for (const type of ['chrome', 'node', 'electron']) {
  //     replaceText(`${type}-version`, process.versions[type])
  //   }
  var dynamicSelect = document.getElementById('dropdown1') as HTMLSelectElement
  getAllFileDetails().forEach((value, key) => {
    var newOption = document.createElement('option')
    newOption.setAttribute('id', 'dropdown1-' + key)
    newOption.text = key.toString() + delimiter + ' ' + formatDate(value)
    dynamicSelect.add(newOption)
  })
  dynamicSelect.onchange = function () {
    console.log('Key: ', dynamicSelect.value.split(delimiter)[0])
  }
})
