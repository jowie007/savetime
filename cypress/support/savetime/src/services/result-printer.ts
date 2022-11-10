import { translations } from "./translation-handler";
import {
  CypressRunResultCompare,
  RunResultCompare,
  TestResultCompare,
} from "../classes/cypress-run-result-compare";

let initialized = false;
let nothingToCompare: HTMLElement;
let somethingToCompare: HTMLElement;
let overall__caption: HTMLElement;
let overall__durationDifference__th: HTMLElement;
let overall__durationDifference__td: HTMLElement;
let overall__durationDifferenceWithoutMissingTests__th: HTMLElement;
let overall__durationDifferenceWithoutMissingTests__td: HTMLElement;
let run__wrapper: HTMLElement;

function init() {
  if (!initialized) {
    nothingToCompare = document.getElementById("nothingToCompare");
    nothingToCompare.innerText = translations.nothingToCompare;
    somethingToCompare = document.getElementById("somethingToCompare");
    overall__caption = document.getElementById("overall__caption");
    overall__durationDifference__th = document.getElementById(
      "overall__durationDifference__th"
    );
    overall__durationDifference__td = document.getElementById(
      "overall__durationDifference__td"
    );
    overall__durationDifferenceWithoutMissingTests__th =
      document.getElementById(
        "overall__durationDifferenceWithoutMissingTests__th"
      );
    overall__durationDifferenceWithoutMissingTests__td =
      document.getElementById(
        "overall__durationDifferenceWithoutMissingTests__td"
      );
    run__wrapper = document.getElementById("run__wrapper");
  }
}

export function printResult(result: CypressRunResultCompare): void {
  init();
  if (result === null) {
    nothingToCompare.style.visibility = "visible";
    somethingToCompare.style.visibility = "hidden";
  } else {
    fillOverallTables(result);
    fillRunTables(result);
    nothingToCompare.style.visibility = "hidden";
    somethingToCompare.style.visibility = "visible";
  }
}

function fillOverallTables(result: CypressRunResultCompare): void {
  overall__caption.innerText = translations.overall__caption;
  overall__durationDifference__th.innerText =
    translations.overall__durationDifference__th;
  overall__durationDifferenceWithoutMissingTests__th.innerText =
    translations.overall__durationDifferenceWithoutMissingTests__th;
  overall__durationDifference__td.innerText =
    result.durationDifference.toString();
  overall__durationDifferenceWithoutMissingTests__td.innerText =
    result.durationDifferenceWithoutMissingTests.toString();
}

function fillRunTables(result: CypressRunResultCompare) {
  run__wrapper.innerHTML = "";
  const innerHTMLArray: string[] = [];
  result.runs.forEach((value: RunResultCompare, index: number) => {
    innerHTMLArray.push(runTableContent(value, index));
  });
  run__wrapper.insertAdjacentHTML("afterend", innerHTMLArray.join(" "));
}

function runTableContent(runResultCompare: RunResultCompare, indexRun: number) {
  const testHTMLArray: string[] = [];
  runResultCompare.tests.forEach((testResultCompare, indexTest) => {
    testHTMLArray.push(testContentRow(testResultCompare, indexRun, indexTest));
  });
  return `
    <table id="run-${indexRun}">
      <caption id="run__caption-${indexRun}">
        ${translations.file + ": " + runResultCompare.name}
      </caption>
      <tr id="run__durationDifference-${indexRun}">
        <th id="run__durationDifference__th-${indexRun}">
          ${translations.run__durationDifference__th}
        </th>
        <td id="run__durationDifference__td-${indexRun}">
          ${runResultCompare.durationDifference}
        </td>
      </tr>
      <tr id="run__durationDifferenceWithoutMissingTests-${indexRun}">
        <th id="run__durationDifferenceWithoutMissingTests__th-${indexRun}">
          ${translations.run__durationDifferenceWithoutMissingTests__th}
        </th>
        <td id="run__durationDifferenceWithoutMissingTests__td-${indexRun}">
          ${runResultCompare.durationDifferenceWithoutMissingTests} 
        </td>
      </tr>
    </table>
    <table>
      <tr id="run__test-${indexRun}">
        <th id="run__test__name__th-${indexRun}">
          ${translations.run__test__name__th}
        </th>
        <th id="run__test__durationDifference__th-${indexRun}">
          ${translations.run__test__durationDifference__th}
        </th>
      </tr>
      ${testHTMLArray.join(" ")}
    </table>
  `;
}

function testContentRow(
  testResultCompare: TestResultCompare,
  indexRun: number,
  indexTest: number
) {
  return `
    <tr id="run__test-${indexRun}-${indexTest}">
      <td id="run__test__durationDifference__td-${indexRun}-${indexTest}">
        ${testResultCompare.title}
      </td>
      <td id="run__test__durationDifference__td-${indexRun}-${indexTest}">
        ${testResultCompare.durationDifference}
      </td>
    </tr>
  `;
}
