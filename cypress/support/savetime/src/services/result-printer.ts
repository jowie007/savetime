import { getTranslation, Locale } from './translation-handler'
import { CypressRunResultCompare } from '../classes/cypress-run-result-compare'

export function printResult(
  wrapperElement: HTMLElement,
  result: CypressRunResultCompare,
) {
  wrapperElement.innerHTML = ''
  if (result === null) {
    wrapperElement.innerText = getTranslation('nothingToCompare', Locale.DE)
  } else {
    const overallDurationDifferenceDiv = document.createElement('div')
    overallDurationDifferenceDiv.textContent = String(result.durationDifference)
    wrapperElement.appendChild(overallDurationDifferenceDiv)
    const runs = document.createElement('div')
    result.runs;
    wrapperElement.appendChild(runs)
  }
}
