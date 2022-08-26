window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
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
})
