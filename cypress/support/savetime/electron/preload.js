window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }

  /// Von mir hinzugefügt
  fetch('../results/compare/2_vs_1.json')
    .then((response) => response.json())
    .then((data) => {
      alert(JSON.stringify(data))
      replaceText('json', JSON.stringify(data))
    })
    .catch((error) => alert(error))

  //   function readTextFile(file, callback) {
  //     var rawFile = new XMLHttpRequest()
  //     rawFile.overrideMimeType('application/json')
  //     rawFile.open('GET', file, true)
  //     rawFile.onreadystatechange = function () {
  //       if (rawFile.readyState === 4 && rawFile.status == '200') {
  //         callback(rawFile.responseText)
  //       }
  //     }
  //     rawFile.send(null)
  //   }

  //   //usage:
  //   readTextFile('../../results/compare/2_vs_1.json', function (text) {
  //     var data = JSON.parse(text)
  //     console.log(data)
  //   })
})
