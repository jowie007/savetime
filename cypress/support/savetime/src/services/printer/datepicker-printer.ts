import {
  compareFilesByNumber,
  compareFilesByNumberSpan,
  getAllFileDetails,
} from '../handler/cypress-file-handler'
import { getFormatDateWithPosition } from '../handler/date-handler'
import { translation } from '../handler/translation-handler'
import { getCypressLogFiles } from '../store/cypress-file-store'
import { getType, isCompareSpans } from '../store/settings-store'
import { printResult } from './result-printer'

let selection__datepicker__day: HTMLDivElement
let selection__datepicker__buttonsFirst__legend: HTMLLegendElement
let selection__datepicker__buttonsFirst__first: HTMLButtonElement
let selection__datepicker__buttonsFirst__second: HTMLButtonElement
let selection__datepicker__buttonsSecond__legend: HTMLLegendElement
let selection__datepicker__buttonsSecond__first: HTMLButtonElement
let selection__datepicker__buttonsSecond__second: HTMLButtonElement
let selectionDatePickerButtons: HTMLButtonElement[]
let selection__datepicker__functions__legend: HTMLLegendElement
let selection__datepicker__functions__buttonSwap: HTMLButtonElement
let selection__datepicker__functions__buttonReset: HTMLButtonElement
let selection__datepicker__day__heading: HTMLDivElement
let selection__datepicker__day__wrapper: HTMLDivElement
let selection__datepicker__test__heading: HTMLDivElement
let selection__datepicker__test__wrapper: HTMLDivElement
let selectedFirstFirst: number
let selectedFirstSecond: number
let selectedSecondFirst: number
let selectedSecondSecond: number
let year: number
let month: number
let day: number
let dayFileMap: Map<number, Map<number, Date>>
let clickedButton: number
let shown: boolean
let initializedBefore: boolean

export function printDatepicker(reInitPickers: boolean) {
  init(reInitPickers)
}

function init(reInitPickers: boolean) {
  if (!initializedBefore) {
    initializedBefore = true
    shown = false
    selection__datepicker__buttonsFirst__legend = document.getElementById(
      'selection__datepicker__buttonsFirst__legend',
    ) as HTMLLegendElement
    selection__datepicker__buttonsFirst__first = document.getElementById(
      'selection__datepicker__buttonsFirst__first',
    ) as HTMLButtonElement
    selection__datepicker__buttonsFirst__second = document.getElementById(
      'selection__datepicker__buttonsFirst__second',
    ) as HTMLButtonElement
    selection__datepicker__buttonsSecond__legend = document.getElementById(
      'selection__datepicker__buttonsSecond__legend',
    ) as HTMLLegendElement
    selection__datepicker__buttonsSecond__first = document.getElementById(
      'selection__datepicker__buttonsSecond__first',
    ) as HTMLButtonElement
    selection__datepicker__buttonsSecond__second = document.getElementById(
      'selection__datepicker__buttonsSecond__second',
    ) as HTMLButtonElement
    selection__datepicker__functions__legend = document.getElementById(
      'selection__datepicker__functions__legend',
    ) as HTMLLegendElement
    selection__datepicker__functions__buttonSwap = document.getElementById(
      'selection__datepicker__functions__buttonSwap',
    ) as HTMLButtonElement
    selection__datepicker__functions__buttonReset = document.getElementById(
      'selection__datepicker__functions__buttonReset',
    ) as HTMLButtonElement
    selectionDatePickerButtons = [
      selection__datepicker__buttonsFirst__first,
      selection__datepicker__buttonsSecond__first,
      selection__datepicker__buttonsFirst__second,
      selection__datepicker__buttonsSecond__second,
    ]
    initSelectionDatepickerButtons(selectionDatePickerButtons)
    // initSelection__datepicker__buttonFirst__FirstClickListener()
    // initSelection__datepicker__buttonFirst__SecondClickListener()
    // initSelection__datepicker__buttonSecond__FirstClickListener()
    // initSelection__datepicker__buttonSecond__SecondClickListener()
    initselection__datepicker__buttonSwapClickListener()
    initselection__datepicker__buttonResetClickListener()
  } else {
    if (shown) {
      initializeDayHeading()
      if (day !== undefined) {
        initializeDatePickerSecondTitle()
      }
    }
  }
  selection__datepicker__buttonsFirst__legend.innerHTML =
    translation.selection__datepicker__buttonsFirst__legend
  selection__datepicker__buttonsSecond__legend.innerHTML =
    translation.selection__datepicker__buttonsSecond__legend
  selection__datepicker__functions__legend.innerHTML =
    translation.selection__datepicker__functions__legend
  selection__datepicker__functions__buttonSwap.innerHTML = translation.swap
  selection__datepicker__functions__buttonReset.innerHTML = translation.reset
  selection__datepicker__day = document.getElementById(
    'selection__datepicker__day',
  ) as HTMLDivElement
  selection__datepicker__day__heading = document.getElementById(
    'selection__datepicker__day__heading',
  ) as HTMLDivElement
  selection__datepicker__day__wrapper = document.getElementById(
    'selection__datepicker__day__wrapper',
  ) as HTMLDivElement
  selection__datepicker__test__heading = document.getElementById(
    'selection__datepicker__test__heading',
  ) as HTMLDivElement
  selection__datepicker__test__wrapper = document.getElementById(
    'selection__datepicker__test__wrapper',
  ) as HTMLDivElement
  initializeSelectedElements(reInitPickers)
  initializeSpanButtonsVisibility()
  printResultsElement()
}

function initializeSpanButtonsVisibility() {
  const display = isCompareSpans() ? 'block' : 'none'
  selection__datepicker__buttonsFirst__second.style.display = display
  selection__datepicker__buttonsSecond__second.style.display = display
}

function toggleDatePickerContent(close: boolean = false) {
  let display
  if (shown || close) {
    clearDatePickerContent()
    display = 'none'
    shown = false
  } else {
    year = new Date().getFullYear()
    month = new Date().getMonth()
    initializeDatePickerContent()
    display = 'block'
    shown = true
  }
  selection__datepicker__day.style.display = display
}

function initializeDayHeading() {
  selection__datepicker__day__heading.innerHTML = getDatePickerFirstTitle()
  initPreviousButtonClickListener()
  initNextButtonClickListener()
}

function initializeDatePickerContent() {
  initializeDayHeading()
  selection__datepicker__day__wrapper.innerHTML = getWeekdayContent()
  selection__datepicker__day__wrapper.innerHTML += getDatePickerSelectContent()
  initDateButtonClickListeners()
}

function clearSelectedClasses() {
  selectionDatePickerButtons.forEach((htmlElement) => {
    htmlElement.classList.remove('selectedButton')
  })
}

function clearDatePickerContent() {
  clearSelectedClasses()
  day = undefined
  clickedButton = undefined
  selection__datepicker__day__heading.innerHTML = ''
  selection__datepicker__day__wrapper.innerHTML = ''
  selection__datepicker__test__heading.innerHTML = ''
  selection__datepicker__test__wrapper.innerHTML = ''
}

function initializeSelectedElements(reInitPickers: boolean) {
  const itemsSize = getAllFileDetails(getType()).size
  if (reInitPickers || !selectedFirstFirst || !selectedSecondFirst) {
    setSelectedFirstFirst(itemsSize - 1, false)
    setSelectedSecondFirst(itemsSize, !isCompareSpans() && reInitPickers)
    toggleDatePickerContent(true)
  }
  if (isCompareSpans()) {
    setSelectedFirstSecond(itemsSize - 1, false)
    setSelectedSecondSecond(itemsSize, reInitPickers)
  }
}

function setSelectedItem(
  htmlElement: HTMLButtonElement,
  key: number,
  printResults: boolean = true,
) {
  htmlElement.innerHTML =
    key > 0
      ? getFormatDateWithPosition(getAllFileDetails(getType()).get(key), key)
      : '-'
  if (printResults) {
    printResultsElement()
  }
}

function setSelectedFirstFirst(key: number, printResults: boolean = true) {
  setSelectedItem(
    selection__datepicker__buttonsFirst__first,
    (selectedFirstFirst = key),
    printResults,
  )
}

function setSelectedFirstSecond(key: number, printResults: boolean = true) {
  setSelectedItem(
    selection__datepicker__buttonsFirst__second,
    (selectedFirstSecond = key),
    printResults,
  )
}

function setSelectedSecondFirst(key: number, printResults: boolean = true) {
  setSelectedItem(
    selection__datepicker__buttonsSecond__first,
    (selectedSecondFirst = key),
    printResults,
  )
}

function setSelectedSecondSecond(key: number, printResults: boolean = true) {
  setSelectedItem(
    selection__datepicker__buttonsSecond__second,
    (selectedSecondSecond = key),
    printResults,
  )
}

function getDatePickerFirstTitle() {
  return (
    `<button 
        id='selection__datepicker__navigation__previous'
        class='selection__datepicker__navigation'
        />
        ${translation.selection__datepicker__navigation__previous}
    </button>` +
    `<h2>${
      translation.months.split(',')[month] +
      ' ' +
      new Date(year, month).getFullYear()
    }</h2>` +
    `<button 
        id='selection__datepicker__navigation__next'
        class='selection__datepicker__navigation'
        />
        ${translation.selection__datepicker__navigation__next}
    </button>`
  )
}

function getDatePickerSecondTitle() {
  return `<h2>${
    day +
    '. ' +
    translation.months.split(',')[month] +
    ' ' +
    new Date(year, month).getFullYear()
  }</h2>`
}

function getDayArray() {
  const firstDayOfMonth = new Date(year, month, 1)
  // 0 -> Mon, 1 -> Tue, 2 -> Wed, 3 -> Thu
  // 4 -> Fri, 5 -> Sat, 6 -> Sun
  const firstDayOfMonthNumber =
    firstDayOfMonth.getDay() - 1 < 0 ? 6 : firstDayOfMonth.getDay() - 1
  let days = Array(firstDayOfMonthNumber).fill('')
  days = [...days, ...getValidDayArray()]
  if (days.length % 7 !== 0) {
    days = [...days, ...Array(7 - (days.length % 7)).fill('')]
  }
  return days
}

function getValidDayArray() {
  const lastDayOfMonth = new Date(year, month, 0)
  const lastDayOfMonthDay = lastDayOfMonth.getDate()
  let days = []
  let count = 1
  while (count <= lastDayOfMonthDay) {
    days.push(count.toString())
    count++
  }
  return days
}

function getWeekdayContent() {
  const htmlArray = []
  const weekdays = translation.weekdays.split(',')
  let count = 0
  for (let weekday of weekdays) {
    htmlArray.push(
      `<div id='selection__datepicker__weekday-${count}' class="selection__datepicker__weekday">
        ${weekday}
       </div>`,
    )
    count++
  }
  return htmlArray.join(' ')
}

function getDatePickerSelectContent() {
  dayFileMap = new Map()
  getCypressLogFiles().forEach((value, key) => {
    if (value.getFullYear() === year && value.getMonth() === month) {
      const date = value.getDate()
      if (dayFileMap.has(date)) {
        dayFileMap.set(
          date,
          new Map([...Array.from(dayFileMap.get(date)), [key, value]]),
        )
      } else {
        dayFileMap.set(date, new Map([[key, value]]))
      }
    }
  })
  const htmlArray = []
  let invalidFieldCount = 0
  for (let day of getDayArray()) {
    let id
    const dayInvalid = day === ''
    if (dayInvalid) {
      id = '__invalid-' + invalidFieldCount
      invalidFieldCount++
    } else {
      id = '-' + day
    }
    const value = dayFileMap.get(Number(day))
    const positionCount = value ? (value.size > 5 ? 5 : value.size) : 0
    htmlArray.push(
      `<button id='selection__datepicker__day${id}' class="selection__datepicker__day${
        dayInvalid
          ? ' selection__datepicker__day__invalid'
          : ' selection__datepicker__day-' + positionCount
      }">${day}</button>`,
    )
  }
  return htmlArray.join(' ')
}

function printResultsElement() {
  if (!isCompareSpans()) {
    printResult(
      compareFilesByNumber(getType(), selectedFirstFirst, selectedSecondFirst),
    )
  } else {
    printResult(
      compareFilesByNumberSpan(
        getType(),
        selectedFirstFirst,
        selectedFirstSecond,
        selectedSecondFirst,
        selectedSecondSecond,
      ),
    )
  }
}

function initializeDatePickerSecondTitle() {
  selection__datepicker__test__heading.innerHTML = getDatePickerSecondTitle()
}

function initializeDatePickerSecondSelectContent() {
  const htmlArray: string[] = []
  dayFileMap.get(day).forEach((value, key) => {
    htmlArray.push(
      `<button id='selection__datepicker__test-${key}' class="selection__datepicker__test">
        ${getFormatDateWithPosition(value, key)}
       </button>`,
    )
  })
  selection__datepicker__test__wrapper.innerHTML = htmlArray.join(' ')
  initTestButtonClickListener()
}

function initSelectionDatepickerButtons(htmlElements: HTMLButtonElement[]) {
  htmlElements.forEach((htmlElement, index) => {
    htmlElement.addEventListener('click', () => {
      const previousClickedButton = clickedButton
      clickedButton = index
      if (previousClickedButton === index) {
        toggleDatePickerContent()
      } else {
        if (previousClickedButton !== undefined) {
          clearSelectedClasses()
        } else {
          toggleDatePickerContent()
        }
        htmlElement.classList.add('selectedButton')
      }
    })
  })
}

function initSelection__datepicker__buttonFirst__FirstClickListener() {
  selection__datepicker__buttonsFirst__first.addEventListener('click', () => {
    const previousClickedButton = clickedButton
    clickedButton = 1
    if (previousClickedButton === 1) {
      toggleDatePickerContent()
    } else {
      selection__datepicker__buttonsFirst__first.classList.add('selectedButton')
      if (previousClickedButton === 2) {
        selection__datepicker__buttonsSecond__first.classList.remove(
          'selectedButton',
        )
      } else {
        toggleDatePickerContent()
      }
    }
  })
}

function initSelection__datepicker__buttonSecond__FirstClickListener() {
  selection__datepicker__buttonsSecond__first.addEventListener('click', () => {
    const previousClickedButton = clickedButton
    clickedButton = 2
    if (previousClickedButton === 2) {
      toggleDatePickerContent()
    } else {
      selection__datepicker__buttonsSecond__first.classList.add(
        'selectedButton',
      )
      if (previousClickedButton === 1) {
        selection__datepicker__buttonsFirst__first.classList.remove(
          'selectedButton',
        )
      } else {
        toggleDatePickerContent()
      }
    }
  })
}

function initselection__datepicker__buttonSwapClickListener() {
  selection__datepicker__functions__buttonSwap.addEventListener('click', () => {
    let selectedFirstFirstTemp = selectedFirstFirst
    selectedFirstFirst = selectedSecondFirst
    selectedSecondFirst = selectedFirstFirstTemp
    let selection__datepicker__buttonsFirst__firstHTMLTemp =
      selection__datepicker__buttonsFirst__first.innerHTML
    selection__datepicker__buttonsFirst__first.innerHTML =
      selection__datepicker__buttonsSecond__first.innerHTML
    selection__datepicker__buttonsSecond__first.innerHTML = selection__datepicker__buttonsFirst__firstHTMLTemp
    if (isCompareSpans()) {
      let selectedFirstSecondTemp = selectedFirstSecond
      selectedFirstSecond = selectedSecondSecond
      selectedSecondSecond = selectedFirstSecondTemp
      let selection__datepicker__buttonsFirst__secondHTMLTemp =
        selection__datepicker__buttonsFirst__second.innerHTML
      selection__datepicker__buttonsFirst__second.innerHTML =
        selection__datepicker__buttonsSecond__second.innerHTML
      selection__datepicker__buttonsSecond__second.innerHTML = selection__datepicker__buttonsFirst__secondHTMLTemp
    }
    printResultsElement()
  })
}

function initselection__datepicker__buttonResetClickListener() {
  selection__datepicker__functions__buttonReset.addEventListener(
    'click',
    () => {
      initializeSelectedElements(true)
      printResultsElement()
    },
  )
}

function initPreviousButtonClickListener() {
  document
    .getElementById(`selection__datepicker__navigation__previous`)
    .addEventListener('click', () => {
      if (month === 0) {
        month = 11
        year -= 1
      } else {
        month -= 1
      }
      initializeDatePickerContent()
    })
}

function initNextButtonClickListener() {
  document
    .getElementById(`selection__datepicker__navigation__next`)
    .addEventListener('click', () => {
      if (month === 11) {
        month = 0
        year += 1
      } else {
        month += 1
      }
      initializeDatePickerContent()
    })
}

function initDateButtonClickListeners() {
  const elements = document.getElementsByClassName(`selection__datepicker__day`)
  for (let index = 0; index < elements.length; index++) {
    const item = elements.item(index)
    if (!item.classList.contains('selection__datepicker__day-0')) {
      item.addEventListener('click', () => {
        const splitId = item.id.split('-')
        day = Number(splitId[splitId.length - 1])
        initializeDatePickerSecondTitle()
        initializeDatePickerSecondSelectContent()
      })
    }
  }
}

function initTestButtonClickListener() {
  const elements = document.getElementsByClassName(
    `selection__datepicker__test`,
  )
  for (let index = 0; index < elements.length; index++) {
    const item = elements.item(index)
    item.addEventListener('click', () => {
      if (clickedButton === 0) {
        setSelectedFirstFirst(Number(item.innerHTML.trim().split(':')[0]))
      } else if (clickedButton === 1) {
        setSelectedSecondFirst(Number(item.innerHTML.trim().split(':')[0]))
      } else if (clickedButton === 2) {
        setSelectedFirstSecond(Number(item.innerHTML.trim().split(':')[0]))
      } else if (clickedButton === 3) {
        setSelectedSecondSecond(Number(item.innerHTML.trim().split(':')[0]))
      }
      toggleDatePickerContent()
    })
  }
}
