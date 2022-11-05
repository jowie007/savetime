import { getAllFileDetails } from './services/file-handler.js'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  //   for (const type of ['chrome', 'node', 'electron']) {
  //     replaceText(`${type}-version`, process.versions[type])
  //   }

  const langArray = [{ display: 'display', value: 'value' }]

  console.log(getAllFileDetails())

  var dynamicSelect = document.getElementById('dropdown1') as HTMLSelectElement
  langArray.forEach((item) => {
    var newOption = document.createElement('option')
    newOption.text = item.display
    dynamicSelect.add(newOption)
  })
})
