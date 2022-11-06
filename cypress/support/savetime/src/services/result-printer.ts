import { getTranslation, Locale } from './translation-handler'
import { CypressRunResultCompare } from '../classes/cypress-run-result-compare'

export function printResult(result: CypressRunResultCompare): HTMLElement {
  const element = document.createElement('div')
  if (result === null) {
    element.innerText = getTranslation('nothingToCompare', Locale.DE)
    console.log(getTranslation('nothingToCompare', Locale.DE))
    return
  }
  const durationDifference = document.createElement('div')
  durationDifference.textContent = String(result.durationDifference)
  element.appendChild(durationDifference)
  return element
}
