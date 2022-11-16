import { translation } from "../handler/translation-handler";
import {
  CypressRunResultCompare,
  RunResultCompare,
  TestResultCompare,
} from "../../classes/cypress-run-result-compare";
import { getMaxDurationDifference } from "../store/settings-store";

let nothingToCompare: HTMLElement;
let somethingToCompare: HTMLElement;
let colors: string[];

function init() {
  nothingToCompare = document.getElementById("nothingToCompare");
  nothingToCompare.innerText = translation.nothingToCompare;
  somethingToCompare = document.getElementById("somethingToCompare");
  colors = initializeGradient();
}

export function printResult(result: CypressRunResultCompare): void {
  init();
  if (result === null) {
    nothingToCompare.style.display = "block";
    somethingToCompare.style.display = "none";
  } else {
    fillOverallTables(result);
    fillRunTables(result);
    nothingToCompare.style.display = "none";
    somethingToCompare.style.display = "block";
  }
}

function fillOverallTables(
  cypressRunResultCompare: CypressRunResultCompare
): void {
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
            ${getStyleByDurationDifference(
              cypressRunResultCompare.durationDifference
            )}
          ">
          ${cypressRunResultCompare.durationDifference}
        </td>
      </tr>
      <tr id="overall__durationDifferenceWithoutMissingTests">
        <th id="overall__durationDifferenceWithoutMissingTests__th">
          ${translation.overall__durationDifferenceWithoutMissingTests__th}
        </th>
        <td id="overall__durationDifferenceWithoutMissingTests__td"
          class="td__duration"
          style="
            ${getStyleByDurationDifference(
              cypressRunResultCompare.durationDifferenceWithoutMissingTests
            )}
          ">
          ${cypressRunResultCompare.durationDifferenceWithoutMissingTests}
        </td>
      </tr>
    </table>
  `;
}

function fillRunTables(cypressRunResultCompare: CypressRunResultCompare) {
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
            ${getStyleByDurationDifference(runResultCompare.durationDifference)}
          ">
          ${runResultCompare.durationDifference}
        </td>
      </tr>
      <tr id="run__durationDifferenceWithoutMissingTests-${indexRun}">
        <th id="run__durationDifferenceWithoutMissingTests__th-${indexRun}">
          ${translation.run__durationDifferenceWithoutMissingTests__th}
        </th>
        <td id="run__durationDifferenceWithoutMissingTests__td-${indexRun}" 
          class="td__duration"
          style="
            ${getStyleByDurationDifference(
              runResultCompare.durationDifferenceWithoutMissingTests
            )}
          ">
          ${runResultCompare.durationDifferenceWithoutMissingTests} 
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
          ${getStyleByDurationDifference(testResultCompare.durationDifference)}
        ">
        ${testResultCompare.durationDifference}
      </td>
    </tr>
  `;
}

function initializeGradient(): string[] {
  const canvas = document.getElementById(
    "compareInfos__rating__gradient"
  ) as HTMLCanvasElement;
  const colors: string[] = [];
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, "green");
  gradient.addColorStop(0.5, "yellow");
  gradient.addColorStop(1, "red");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const canvasContext = canvas.getContext("2d");
  for (let i = 0; i < canvas.width; i += canvas.width / 100) {
    const rgb = canvasContext.getImageData(i, 1, 1, 1).data;
    colors.push(
      "rgba(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + "," + rgb[3] + ")"
    );
  }
  return colors;
}

function getColorByDuration(duration: number) {
  let position = (colors.length * duration) / getMaxDurationDifference();
  if (position >= colors.length) {
    position = colors.length - 1;
  } else if (position < 0) {
    position = 0;
  }
  return colors[Number(position.toFixed(0))];
}

function getStyleByDurationDifference(durationDifference: number) {
  return `background-color: ${getColorByDuration(durationDifference)}`;
}
