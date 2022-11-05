import { getAllFileNumbers } from './services/file-handler.js'

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  //   for (const type of ['chrome', 'node', 'electron']) {
  //     replaceText(`${type}-version`, process.versions[type])
  //   }

  /// Von mir hinzugefügt
  // TODO Mittels zwei dropdowns auswählen, welche Objekte verglichen werden soll,
  // wobei momentan die aktuellsten ausgewählt werden
  //   fetch('../results/compare/2_vs_1.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       replaceText('json', JSON.stringify(data))
  //     })
  //     .catch((error) => alert(error))

  const langArray = [{ display: 'display', value: 'value' }]

  console.log(getAllFileNumbers())

  var dynamicSelect = document.getElementById('dropdown1') as HTMLSelectElement
  langArray.forEach((item) => {
    var newOption = document.createElement('option')
    newOption.text = item.display
    dynamicSelect.add(newOption)
  })
})
