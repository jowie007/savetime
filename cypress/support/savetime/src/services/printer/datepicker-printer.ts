import {
  compareFilesByNumber,
  getAllFileDetails,
} from "../handler/cypress-file-handler";
import { getFormatDateWithPosition } from "../handler/date-handler";
import { translation } from "../handler/translation-handler";
import { getCypressLogFiles } from "../store/cypress-file-store";
import { printResult } from "./result-printer";

let selection__datepicker__day: HTMLDivElement;
let selection__datepicker__selection__datepicker__buttonFirst: HTMLButtonElement;
let selection__datepicker__selection__datepicker__buttonSecond: HTMLButtonElement;
let selection__datepicker__selection__datepicker__buttonSwap: HTMLButtonElement;
let selection__datepicker__selection__datepicker__buttonReset: HTMLButtonElement;
let selection__datepicker__day__heading: HTMLDivElement;
let selection__datepicker__day__wrapper: HTMLDivElement;
let selection__datepicker__test__heading: HTMLDivElement;
let selection__datepicker__test__wrapper: HTMLDivElement;
let selectedFirst: number;
let selectedSecond: number;
let year: number;
let month: number;
let day: number;
let dayFileMap: Map<number, Map<number, Date>>;
let clickedButton: number;
let shown: boolean;
let initializedBefore: boolean;

export function printDatepicker() {
  init();
}

function init() {
  if (!initializedBefore) {
    initializedBefore = true;
    shown = false;
    selection__datepicker__selection__datepicker__buttonFirst =
      document.getElementById(
        "selection__datepicker__selection__datepicker__buttonFirst"
      ) as HTMLButtonElement;
    selection__datepicker__selection__datepicker__buttonSecond =
      document.getElementById(
        "selection__datepicker__selection__datepicker__buttonSecond"
      ) as HTMLButtonElement;
    selection__datepicker__selection__datepicker__buttonSwap =
      document.getElementById(
        "selection__datepicker__selection__datepicker__buttonSwap"
      ) as HTMLButtonElement;
    selection__datepicker__selection__datepicker__buttonSwap.innerHTML =
      translation.swap;
    selection__datepicker__selection__datepicker__buttonReset =
      document.getElementById(
        "selection__datepicker__selection__datepicker__buttonReset"
      ) as HTMLButtonElement;
    selection__datepicker__selection__datepicker__buttonReset.innerHTML =
      translation.reset;
    initselection__datepicker__buttonFirstClickListener();
    initselection__datepicker__buttonSecondClickListener();
    initselection__datepicker__buttonSwapClickListener();
    initselection__datepicker__buttonResetClickListener();
  } else {
    if (shown) {
      initializeDayHeading();
      if (day !== undefined) {
        initializeDatePickerSecondTitle();
      }
    }
  }
  selection__datepicker__day = document.getElementById(
    "selection__datepicker__day"
  ) as HTMLDivElement;
  selection__datepicker__day__heading = document.getElementById(
    "selection__datepicker__day__heading"
  ) as HTMLDivElement;
  selection__datepicker__day__wrapper = document.getElementById(
    "selection__datepicker__day__wrapper"
  ) as HTMLDivElement;
  selection__datepicker__test__heading = document.getElementById(
    "selection__datepicker__test__heading"
  ) as HTMLDivElement;
  selection__datepicker__test__wrapper = document.getElementById(
    "selection__datepicker__test__wrapper"
  ) as HTMLDivElement;
  initializeSelectedElements();
  printResultsElement();
}

function toggleDatePickerContent() {
  if (shown) {
    clearDatePickerContent();
  } else {
    year = new Date().getFullYear();
    month = new Date().getMonth();
    initializeDatePickerContent();
  }
  selection__datepicker__day.style.display =
    selection__datepicker__day.style.display === "block" ? "none" : "block";
  shown = !shown;
}

function initializeDayHeading() {
  selection__datepicker__day__heading.innerHTML = getDatePickerFirstTitle();
  initPreviousButtonClickListener();
  initNextButtonClickListener();
}

function initializeDatePickerContent() {
  initializeDayHeading();
  selection__datepicker__day__wrapper.innerHTML = getWeekdayContent();
  selection__datepicker__day__wrapper.innerHTML += getDatePickerSelectContent();
  initDateButtonClickListeners();
}

function clearDatePickerContent() {
  selection__datepicker__selection__datepicker__buttonFirst.classList.remove(
    "selection__datepicker__button__selected"
  );
  selection__datepicker__selection__datepicker__buttonSecond.classList.remove(
    "selection__datepicker__button__selected"
  );
  day = undefined;
  clickedButton = undefined;
  selection__datepicker__day__heading.innerHTML = "";
  selection__datepicker__day__wrapper.innerHTML = "";
  selection__datepicker__test__heading.innerHTML = "";
  selection__datepicker__test__wrapper.innerHTML = "";
}

function initializeSelectedElements() {
  const itemsSize = getAllFileDetails().size;
  if (!selectedFirst || !selectedSecond) {
    setSelectedFirst(itemsSize - 1);
    setSelectedSecond((selectedSecond = itemsSize));
  }
}

function setSelectedFirst(key: number) {
  selectedFirst = key;
  selection__datepicker__selection__datepicker__buttonFirst.innerHTML =
    getFormatDateWithPosition(getAllFileDetails().get(key), key);
  printResultsElement();
}

function setSelectedSecond(key: number) {
  selectedSecond = key;
  selection__datepicker__selection__datepicker__buttonSecond.innerHTML =
    getFormatDateWithPosition(getAllFileDetails().get(key), key);
  printResultsElement();
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
      translation.months.split(",")[month] +
      " " +
      new Date(year, month).getFullYear()
    }</h2>` +
    `<button 
        id='selection__datepicker__navigation__next'
        class='selection__datepicker__navigation'
        />
        ${translation.selection__datepicker__navigation__next}
    </button>`
  );
}

function getDatePickerSecondTitle() {
  return `<h2>${
    day +
    ". " +
    translation.months.split(",")[month] +
    " " +
    new Date(year, month).getFullYear()
  }</h2>`;
}

function getDayArray() {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  // 0 -> Mon, 1 -> Tue, 2 -> Wed, 3 -> Thu
  // 4 -> Fri, 5 -> Sat, 6 -> Sun
  const firstDayOfMonthNumber =
    firstDayOfMonth.getDay() - 1 < 0 ? 6 : firstDayOfMonth.getDay() - 1;
  let days = Array(firstDayOfMonthNumber).fill("");
  days = [...days, ...getValidDayArray()];
  if (days.length % 7 !== 0) {
    days = [...days, ...Array(7 - (days.length % 7)).fill("")];
  }
  return days;
}

function getValidDayArray() {
  const lastDayOfMonth = new Date(year, month, 0);
  const lastDayOfMonthDay = lastDayOfMonth.getDate();
  let days = [];
  let count = 1;
  while (count <= lastDayOfMonthDay) {
    days.push(count.toString());
    count++;
  }
  return days;
}

function getWeekdayContent() {
  const htmlArray = [];
  const weekdays = translation.weekdays.split(",");
  let count = 0;
  for (let weekday of weekdays) {
    htmlArray.push(
      `<div id='selection__datepicker__weekday-${count}' class="selection__datepicker__weekday">
        ${weekday}
       </div>`
    );
    count++;
  }
  return htmlArray.join(" ");
}

function getDatePickerSelectContent() {
  dayFileMap = new Map();
  getCypressLogFiles().forEach((value, key) => {
    if (value.getFullYear() === year && value.getMonth() === month) {
      const date = value.getDate();
      if (dayFileMap.has(date)) {
        dayFileMap.set(
          date,
          new Map([...Array.from(dayFileMap.get(date)), [key, value]])
        );
      } else {
        dayFileMap.set(date, new Map([[key, value]]));
      }
    }
  });
  const htmlArray = [];
  let invalidFieldCount = 0;
  for (let day of getDayArray()) {
    let id;
    const dayInvalid = day === "";
    if (dayInvalid) {
      id = "__invalid-" + invalidFieldCount;
      invalidFieldCount++;
    } else {
      id = "-" + day;
    }
    const value = dayFileMap.get(Number(day));
    const positionCount = value ? (value.size > 5 ? 5 : value.size) : 0;
    htmlArray.push(
      `<button id='selection__datepicker__day${id}' class="selection__datepicker__day${
        dayInvalid
          ? " selection__datepicker__day__invalid"
          : " selection__datepicker__day-" + positionCount
      }">${day}</button>`
    );
  }
  return htmlArray.join(" ");
}

function printResultsElement() {
  printResult(compareFilesByNumber(selectedFirst, selectedSecond));
}

function initializeDatePickerSecondTitle() {
  selection__datepicker__test__heading.innerHTML = getDatePickerSecondTitle();
}

function initializeDatePickerSecondSelectContent() {
  const htmlArray: string[] = [];
  dayFileMap.get(day).forEach((value, key) => {
    htmlArray.push(
      `<button id='selection__datepicker__test-${key}' class="selection__datepicker__test">
        ${getFormatDateWithPosition(value, key)}
       </button>`
    );
  });
  selection__datepicker__test__wrapper.innerHTML = htmlArray.join(" ");
  initTestButtonClickListener();
}

function initselection__datepicker__buttonFirstClickListener() {
  selection__datepicker__selection__datepicker__buttonFirst.addEventListener(
    "click",
    () => {
      const previousClickedButton = clickedButton;
      clickedButton = 1;
      if (previousClickedButton === 1) {
        toggleDatePickerContent();
      } else {
        selection__datepicker__selection__datepicker__buttonFirst.classList.add(
          "selection__datepicker__button__selected"
        );
        if (previousClickedButton === 2) {
          selection__datepicker__selection__datepicker__buttonSecond.classList.remove(
            "selection__datepicker__button__selected"
          );
        } else {
          toggleDatePickerContent();
        }
      }
    }
  );
}

function initselection__datepicker__buttonSecondClickListener() {
  selection__datepicker__selection__datepicker__buttonSecond.addEventListener(
    "click",
    () => {
      const previousClickedButton = clickedButton;
      clickedButton = 2;
      if (previousClickedButton === 2) {
        toggleDatePickerContent();
      } else {
        selection__datepicker__selection__datepicker__buttonSecond.classList.add(
          "selection__datepicker__button__selected"
        );
        if (previousClickedButton === 1) {
          selection__datepicker__selection__datepicker__buttonFirst.classList.remove(
            "selection__datepicker__button__selected"
          );
        } else {
          toggleDatePickerContent();
        }
      }
    }
  );
}

function initselection__datepicker__buttonSwapClickListener() {
  selection__datepicker__selection__datepicker__buttonSwap.addEventListener(
    "click",
    () => {
      let selectedFirstTemp = selectedFirst;
      selectedFirst = selectedSecond;
      selectedSecond = selectedFirstTemp;
      let selection__datepicker__selection__datepicker__buttonFirstHTMLTemp =
        selection__datepicker__selection__datepicker__buttonFirst.innerHTML;
      selection__datepicker__selection__datepicker__buttonFirst.innerHTML =
        selection__datepicker__selection__datepicker__buttonSecond.innerHTML;
      selection__datepicker__selection__datepicker__buttonSecond.innerHTML =
        selection__datepicker__selection__datepicker__buttonFirstHTMLTemp;
      printResultsElement();
    }
  );
}

function initselection__datepicker__buttonResetClickListener() {
  selection__datepicker__selection__datepicker__buttonReset.addEventListener(
    "click",
    () => {
      const itemsSize = getAllFileDetails().size;
      setSelectedFirst(itemsSize - 1);
      setSelectedSecond((selectedSecond = itemsSize));
      printResultsElement();
    }
  );
}

function initPreviousButtonClickListener() {
  document
    .getElementById(`selection__datepicker__navigation__previous`)
    .addEventListener("click", () => {
      if (month === 0) {
        month = 11;
        year -= 1;
      } else {
        month -= 1;
      }
      initializeDatePickerContent();
    });
}

function initNextButtonClickListener() {
  document
    .getElementById(`selection__datepicker__navigation__next`)
    .addEventListener("click", () => {
      if (month === 11) {
        month = 0;
        year += 1;
      } else {
        month += 1;
      }
      initializeDatePickerContent();
    });
}

function initDateButtonClickListeners() {
  const elements = document.getElementsByClassName(
    `selection__datepicker__day`
  );
  for (let index = 0; index < elements.length; index++) {
    const item = elements.item(index);
    if (!item.classList.contains("selection__datepicker__day-0")) {
      item.addEventListener("click", () => {
        const splitId = item.id.split("-");
        day = Number(splitId[splitId.length - 1]);
        initializeDatePickerSecondTitle();
        initializeDatePickerSecondSelectContent();
      });
    }
  }
}

function initTestButtonClickListener() {
  const elements = document.getElementsByClassName(
    `selection__datepicker__test`
  );
  for (let index = 0; index < elements.length; index++) {
    const item = elements.item(index);
    item.addEventListener("click", () => {
      if (clickedButton === 1) {
        setSelectedFirst(Number(item.innerHTML.trim().split(":")[0]));
      } else {
        setSelectedSecond(Number(item.innerHTML.trim().split(":")[0]));
      }
      toggleDatePickerContent();
    });
  }
}
