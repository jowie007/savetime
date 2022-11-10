import { formatDate } from "../handler/date-handler";
import { compareFilesByNumber, getAllFileDetails } from "../handler/file-handler";
import { printResult } from "./result-printer";

const delimiter = ":";

let initialized = false;

let selectElement1: HTMLSelectElement;
let selectElement2: HTMLSelectElement;

function getSelectedFirst(): number {
  return Number(selectElement1.value.split(delimiter)[0]);
}
function getSelectedSecond(): number {
  return Number(selectElement2.value.split(delimiter)[0]);
}

function setcompareResultsElement(): void {
  printResult(compareFilesByNumber(getSelectedFirst(), getSelectedSecond()));
}

function init() {
  if (!initialized) {
    selectElement1 = document.getElementById("dropdown1") as HTMLSelectElement;
    selectElement2 = document.getElementById("dropdown2") as HTMLSelectElement;
    initDropdownOnChangeHandler();
    setcompareResultsElement();
    initialized = true;
  }
}

export function printDropdowns(): void {
  init();
  getAllFileDetails().forEach((value, key) => {
    const text = key.toString() + delimiter + " " + formatDate(value);
    const newOption1 = document.createElement("option");
    const newOption2 = document.createElement("option");
    newOption1.text = text;
    newOption2.text = text;
    newOption1.setAttribute("id", "dropdown1-" + key);
    newOption2.setAttribute("id", "dropdown2-" + key);
    selectElement1.add(newOption1);
    selectElement2.add(newOption2);
  });
}

function initDropdownOnChangeHandler() {
  selectElement1.onchange = function () {
    setcompareResultsElement();
  };
  selectElement2.onchange = function () {
    setcompareResultsElement();
  };
}
