import { getAllFileDetails } from "../handler/cypress-file-handler";
import { translation } from "../handler/translation-handler";

let selection__datepicker__heading: HTMLElement;
let selection__datepicker__wrapper: HTMLDivElement;
let files: Map<number, Date>;

export function printDatepicker() {
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
  selection__datepicker__heading.innerHTML = getDatePickerTitle(2022, 10);
  selection__datepicker__wrapper.innerHTML = getWeekdayContent();
  selection__datepicker__wrapper.innerHTML += getDatePickerContent(2022, 10);
}

function getDatePickerTitle(year: number, month: number) {
  return (
    `<button 
        id='selection__datepicker__navigation__back'
        class='selection__datepicker__navigation'
        />
        ${translation.selection__datepicker__navigation__back}
    </button>` +
    `<h2>${
      translation.months.split(",")[month] +
      " " +
      new Date(year, month).getFullYear()
    }</h2>` +
    `<button 
        id='selection__datepicker__navigation__forwards'
        class='selection__datepicker__navigation'
        />
        ${translation.selection__datepicker__navigation__forwards}
    </button>`
  );
}

function getDayArray(year: number, month: number) {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  // 0 -> Mon, 1 -> Tue, 2 -> Wed, 3 -> Thu
  // 4 -> Fri, 5 -> Sat, 6 -> Sun
  const firstDayOfMonthNumber =
    firstDayOfMonth.getDay() - 1 < 0 ? 6 : firstDayOfMonth.getDay() - 1;
  let days = Array(firstDayOfMonthNumber).fill("");
  days = [...days, ...getValidDayArray(year, month)];
  days = [...days, ...Array(7 - (days.length % 7)).fill("")];
  return days;
}

function getValidDayArray(year: number, month: number) {
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

function getDatePickerContent(year: number, month: number) {
  console.log(files);
  const htmlArray = [];
  let invalidFieldCount = 0;
  console.log(getDayArray(year, month));
  for (let day of getDayArray(year, month)) {
    let id;
    const dayInvalid = day === "";
    if (dayInvalid) {
      id = "__invalid-" + invalidFieldCount;
      invalidFieldCount++;
    } else {
      id = "-" + day;
    }
    htmlArray.push(
      `<button id='selection__datepicker__day${id} class="selection__datepicker__day${
        dayInvalid ? " selection__datepicker__day__invalid" : ""
      }">${day}</button>`
    );
  }
  return htmlArray.join(" ");
}
