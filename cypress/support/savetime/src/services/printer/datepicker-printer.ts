import { getAllFileDetails } from "../handler/cypress-file-handler";
import { translation } from "../handler/translation-handler";

let selection__datepicker__heading: HTMLElement;
let selection__datepicker__wrapper: HTMLDivElement;
let files: Map<number, Date>;
let year: number;
let month: number;

export function printDatepicker() {
  year = new Date().getFullYear();
  month = new Date().getMonth();
  init();
}

function init() {
  files = getAllFileDetails();
  selection__datepicker__heading = document.getElementById(
    "selection__datepicker__heading"
  ) as HTMLElement;
  selection__datepicker__wrapper = document.getElementById(
    "selection__datepicker__wrapper"
  ) as HTMLDivElement;
  selection__datepicker__heading.innerHTML = getDatePickerTitle();
  selection__datepicker__wrapper.innerHTML = getWeekdayContent();
  selection__datepicker__wrapper.innerHTML += getDatePickerContent();
  initPreviousButtonClickListener();
  initNextButtonClickListener();
}

function getDatePickerTitle() {
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

function getDatePickerContent() {
  const dayFileMap: Map<number, Map<number, Date>> = new Map();
  files.forEach((value, key) => {
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
      init();
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
      init();
    });
}
