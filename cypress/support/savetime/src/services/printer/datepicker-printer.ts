import { getAllFileDetails } from "../handler/cypress-file-handler";

let selection__datepicker: HTMLDivElement;
let files: Map<number, Date>;

export function printDatepicker() {
  init();
}

function init() {
  files = getAllFileDetails();
  selection__datepicker = document.getElementById(
    "selection__datepicker"
  ) as HTMLDivElement;
  selection__datepicker.innerHTML = getDatePickerContent(2022, 10);
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

function getDatePickerContent(year: number, month: number) {
  console.log(files);
  const htmlArray = [];
  let invalidFieldCount = 0;
  console.log(getDayArray(year, month));
  for (let day of getDayArray(year, month)) {
    let id;
    const dayInvalid = day === "";
    if (dayInvalid) {
      id = "invalid-" + invalidFieldCount;
      invalidFieldCount++;
    } else {
      id = day;
    }
    htmlArray.push(
      `<button id='${id} class="selection__datepicker__day${
        dayInvalid ? " selection__datepicker__day__invalid" : ""
      }">${day}</button>`
    );
  }
  return htmlArray.join(" ");
}
