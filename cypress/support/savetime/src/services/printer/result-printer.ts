import { translation } from "../handler/translation-handler";
import {
  CypressRunResultCompare,
  RunResultCompare,
  TestResultCompare,
} from "../../classes/cypress-run-result-compare";
import {
  getMaxDurationDifference,
  getMaxDurationDifferencePercentage,
  isPercentageValues,
} from "../store/settings-store";

const MIN_BORDER = 0;
const MIN_BORDER_PERCENTAGE = 100;

let nothingToCompare: HTMLElement;
let somethingToCompare: HTMLElement;
let colors: string[];
let cypressRunResultCompare: CypressRunResultCompare;

function init() {
  nothingToCompare = document.getElementById("nothingToCompare");
  nothingToCompare.innerText = translation.nothingToCompare;
  somethingToCompare = document.getElementById("somethingToCompare");
  colors = initializeGradient();
}

export function getMinBorder() {
  return isPercentageValues() ? MIN_BORDER_PERCENTAGE : MIN_BORDER;
}

export function printResult(result: CypressRunResultCompare) {
  init();
  cypressRunResultCompare = result;
  if (result === null) {
    nothingToCompare.style.display = "block";
    somethingToCompare.style.display = "none";
  } else {
    fillOverallTables();
    fillRunTables();
    nothingToCompare.style.display = "none";
    somethingToCompare.style.display = "block";
  }
}

function fillOverallTables() {
  const overall__wrapper = document.getElementById("overall__wrapper");
  overall__wrapper.innerHTML = getOverallContent(cypressRunResultCompare);
}

function getOverallContent(cypressRunResultCompare: CypressRunResultCompare) {
  return `
    <table id="overall__table">
      <caption id="overall__caption">
        ${translation.overall__caption}
      </caption>
      <tr id="overall__durationDifference">
        <th id="overall__durationDifference__th">
          ${translation.overall__durationDifference__th}
        </th>
        <td id="overall__durationDifference__td"
          class="td__duration"
          style="
            ${getAdjustedStyle(cypressRunResultCompare)}
          ">
          ${getAdjustedDurationDifference(cypressRunResultCompare)}
        </td>
      </tr>
      <tr id="overall__durationDifferenceWithoutMissingTests">
        <th id="overall__durationDifferenceWithoutMissingTests__th">
          ${translation.overall__durationDifferenceWithoutMissingTests__th}
        </th>
        <td id="overall__durationDifferenceWithoutMissingTests__td"
          class="td__duration"
          style="
            ${getAdjustedStyle(cypressRunResultCompare)}
          ">
          ${getAdjustedDurationDifferenceWithoutMissingTests(
            cypressRunResultCompare
          )}
        </td>
      </tr>
    </table>
  `;
}

function fillRunTables() {
  const run__wrapper = document.getElementById("run__wrapper");
  const innerHTMLArray: string[] = [];
  cypressRunResultCompare.runs.forEach(
    (value: RunResultCompare, index: number) => {
      innerHTMLArray.push(getRunTableContent(value, index));
    }
  );
  run__wrapper.innerHTML = innerHTMLArray.join(" ");
}

function getRunTableContent(
  runResultCompare: RunResultCompare,
  indexRun: number
) {
  const testHTMLArray: string[] = [];
  runResultCompare.tests.forEach((testResultCompare, indexTest) => {
    testHTMLArray.push(
      getTestRowContent(testResultCompare, indexRun, indexTest)
    );
  });
  return `
    <table id="run-${indexRun}">
      <caption id="run__caption-${indexRun}">
        ${translation.file + ": " + runResultCompare.name}
      </caption>
      <tr id="run__durationDifference-${indexRun}">
        <th id="run__durationDifference__th-${indexRun}">
          ${translation.run__durationDifference__th}
        </th>
        <td id="run__durationDifference__td-${indexRun}" 
          class="td__duration"
          style="
            ${getAdjustedStyle(runResultCompare)}
          ">
          ${getAdjustedDurationDifference(runResultCompare)}
        </td>
      </tr>
      <tr id="run__durationDifferenceWithoutMissingTests-${indexRun}">
        <th id="run__durationDifferenceWithoutMissingTests__th-${indexRun}">
          ${translation.run__durationDifferenceWithoutMissingTests__th}
        </th>
        <td id="run__durationDifferenceWithoutMissingTests__td-${indexRun}" 
          class="td__duration"
          style="
            ${getAdjustedStyle(runResultCompare)}
          ">
          ${getAdjustedDurationDifferenceWithoutMissingTests(runResultCompare)} 
        </td>
      </tr>
    </table>
    <table>
      <tr id="run__test-${indexRun}">
        <th id="run__test__name__th-${indexRun}">
          ${translation.run__test__name__th}
        </th>
        <th id="run__test__durationDifference__th-${indexRun}">
          ${translation.run__test__durationDifference__th}
        </th>
      </tr>
      ${testHTMLArray.join(" ")}
    </table>
  `;
}

function getTestRowContent(
  testResultCompare: TestResultCompare,
  indexRun: number,
  indexTest: number
) {
  return `
    <tr id="run__test-${indexRun}-${indexTest}">
      <td id="run__test__durationDifference__td-${indexRun}-${indexTest}">
        ${testResultCompare.title.join(": ")}
      </td>
      <td 
        id="run__test__durationDifference__td-${indexRun}-${indexTest}" 
        class="td__duration" 
        style="
          ${getAdjustedStyle(testResultCompare)}
        ">
        ${getAdjustedDurationDifference(testResultCompare)}
      </td>
    </tr>
  `;
}

function initializeGradient() {
  const canvas = document.getElementById(
    "compareInfos__rating__gradient"
  ) as HTMLCanvasElement;
  const colors: string[] = [];
  const canvasContext = canvas.getContext("2d", { willReadFrequently: true });
  const gradient = canvasContext.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "green");
  gradient.addColorStop(0.5, "yellow");
  gradient.addColorStop(1, "red");
  canvasContext.fillStyle = gradient;
  canvasContext.fillRect(0, 0, canvas.width, canvas.height);
  let cpunt = 0;
  if (canvas.width > 1) {
    for (let i = 0; i < canvas.width; i += (canvas.width - 1) / 99) {
      const rgb = canvasContext.getImageData(i, 1, 1, 1).data;
      colors.push(
        "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + rgb[3] + ")"
      );
    }
  }
  document.getElementById("compareInfos__rating__title").innerHTML =
    translation.compareInfos__rating__title;
  document.getElementById("compareInfos__rating__min").innerHTML =
    isPercentageValues() ? "100%" : "0" + translation.milliseconds;
  document.getElementById("compareInfos__rating__max").innerHTML =
    isPercentageValues()
      ? getMaxDurationDifferencePercentage() + "%"
      : getMaxDurationDifference() + translation.milliseconds;
  return colors;
}

function getColorByDuration(duration: number) {
  let position;
  if (isPercentageValues()) {
    position =
      (colors.length * (duration - MIN_BORDER_PERCENTAGE)) /
      (getMaxDurationDifferencePercentage() - MIN_BORDER_PERCENTAGE);
  } else {
    position = (colors.length * duration) / getMaxDurationDifference();
  }
  console.log("POS", duration, position);
  if (position >= colors.length) {
    position = colors.length - 1;
  } else if (position < 0) {
    position = 0;
  }
  return colors[Number(position.toFixed(0))];
}

function getAdjustedStyle(
  resultCompare: TestResultCompare | RunResultCompare | CypressRunResultCompare
) {
  return `background-color: ${getColorByDuration(
    isPercentageValues()
      ? resultCompare.durationDifferencePercentage
      : resultCompare.durationDifference
  )}`;
}

function getAdjustedDurationDifference(
  resultCompare: TestResultCompare | RunResultCompare | CypressRunResultCompare
) {
  if (isPercentageValues()) {
    return resultCompare.durationDifferencePercentage + "%";
  }
  return resultCompare.durationDifference + translation.milliseconds;
}

function getAdjustedDurationDifferenceWithoutMissingTests(
  resultCompare: RunResultCompare | CypressRunResultCompare
) {
  if (isPercentageValues()) {
    return resultCompare.durationDifferenceWithoutMissingTestsPercentage + "%";
  }
  return (
    resultCompare.durationDifferenceWithoutMissingTests +
    translation.milliseconds
  );
}
