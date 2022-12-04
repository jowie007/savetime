import { translation } from "../handler/translation-handler";
import {
  CypressDifference,
  CypressRunResultCompare,
  RunResultCompare,
  TestResultCompare,
} from "../../classes/cypress-run-result-compare";
import {
  getMaxDurationDifference,
  getMaxDurationDifferencePercentage,
  isOnlyCriticalTests,
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
  const durationRange = getDurationRange(cypressRunResultCompare);
  return `
    <h2 id="overall__title">
      ${translation.overall__caption}
      
    </h2>
    <div id="overall__report">
      ${
        translation.overall__report1.trim() +
        " " +
        durationRange[0] +
        " " +
        translation.overall__report2.trim() +
        " " +
        durationRange[1] +
        "."
      }
      <div 
        id='overall__report__tooltip'  
        class="tooltip overall__report__tooltip">
        ?
        <span 
          id='overall__report__tooltip__text' 
          class="tooltip__text overall__report__tooltip__text">
          ${translation.overall__report3.trim()}.
        </span>
      </div>
    </div>
    <table id="overall__table">
      <tr id="overall__durationDifference">
        <th id="overall__durationDifference__th">
          ${translation.overall__durationDifference__th}
        </th>
        <td id="overall__durationDifference__td"
          class="td__duration"
          style="
            ${getAdjustedStyle(cypressRunResultCompare)}
          ">
          ${getAdjustedDurationDifferenceString(cypressRunResultCompare)}
        </td>
      </tr>
    </table>
  `;
  /*
      <tr id="overall__durationDifferenceWithoutMissingTests">
      <th id="overall__durationDifferenceWithoutMissingTests__th">
        ${translation.overall__durationDifferenceWithoutMissingTests__th}
      </th>
      <td id="overall__durationDifferenceWithoutMissingTests__td"
        class="td__duration"
        style="
          ${getAdjustedStyle(cypressRunResultCompare)}
        ">
        ${getAdjustedDurationDifferenceWithoutMissingTestsString(
          cypressRunResultCompare
        )}
      </td>
    </tr>
  */
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
  const joinedTestHTMLArray = testHTMLArray.join(" ");
  return (
    `
    <h3 id="run__caption-${indexRun}">
      ${translation.file + ": " + runResultCompare.name}
    </h3>
    ` +
    (runResultCompare.differenceDetectedMessage !==
    CypressDifference.NO_DIFFERENCE
      ? `
      <div         
        class="run__info run__info-${
          runResultCompare.differenceDetectedMessage
        }">
        ${translation[runResultCompare.differenceDetectedMessage]}
      </div>`
      : (!isOnlyCriticalTests()
          ? `
    <table id="run-${indexRun}">
      <tr id="run__durationDifference-${indexRun}">
        <th id="run__durationDifference__th-${indexRun}">
          ${translation.run__durationDifference__th}
        </th>
        <td id="run__durationDifference__td-${indexRun}" 
          class="td__duration"
          style="
            ${getAdjustedStyle(runResultCompare)}
          ">
          ${getAdjustedDurationDifferenceString(runResultCompare)}
        </td>
      </tr>
    </table>
    `
          : "") +
        `
    <table>
      <tr id="run__test-${indexRun}">
        <th id="run__test__name__th-${indexRun}">
          ${translation.run__test__name__th}
        </th>
        <th id="run__test__durationDifference__th-${indexRun}">
          ${translation.run__test__durationDifference__th}
        </th>
      </tr>
      ${joinedTestHTMLArray}
    </table>
  `)
  );

  /*
        <tr id="run__durationDifferenceWithoutMissingTests-${indexRun}">
        <th id="run__durationDifferenceWithoutMissingTests__th-${indexRun}">
          ${translation.run__durationDifferenceWithoutMissingTests__th}
        </th>
        <td id="run__durationDifferenceWithoutMissingTests__td-${indexRun}" 
          class="td__duration"
          style="
            ${getAdjustedStyle(runResultCompare)}
          ">
          ${getAdjustedDurationDifferenceWithoutMissingTestsString(
            runResultCompare
          )} 
        </td>
      </tr> 
      */
}

function getTestRowContent(
  testResultCompare: TestResultCompare,
  indexRun: number,
  indexTest: number
) {
  return isOnlyCriticalTests() && !isCriticalTest(testResultCompare)
    ? ""
    : `
    <tr id="run__test-${indexRun}-${indexTest}">
      <td id="run__test__durationDifference__td__name-${indexRun}-${indexTest}">
        ${testResultCompare.title.join(": ")}
      </td>
      <td 
        id="run__test__durationDifference__td__duration-${indexRun}-${indexTest}" 
        class="td__duration${
          isDifferenceDetected(testResultCompare)
            ? ` td__duration-${testResultCompare.differenceDetectedMessage}`
            : ""
        }" 
        style="
          ${getAdjustedStyle(testResultCompare)}
        ">
        ${
          testResultCompare.differenceDetectedMessage ===
          CypressDifference.NO_DIFFERENCE
            ? getAdjustedDurationDifferenceString(testResultCompare)
            : translation[testResultCompare.differenceDetectedMessage]
        }
        ${getAttemptCountTooltip(testResultCompare, indexRun, indexTest)}
      </td>
    </tr>
  `;
}

function getAttemptCountTooltip(
  testResultCompare: TestResultCompare,
  indexRun: number,
  indexTest: number
) {
  return isDifferenceDetected(testResultCompare)
    ? ""
    : testResultCompare.attemptCountRun1 !== testResultCompare.attemptCountRun2
    ? `
    <div 
      id='run__test__durationDifference__td__duration__tooltip-${indexRun}-${indexTest}'  
      class="tooltip run__test__durationDifference__td__duration__tooltip">
      !
      <span 
        id='run__test__durationDifference__td__duration__tooltip__text-${indexRun}-${indexTest}' 
        class="tooltip__text run__test__durationDifference__td__duration__tooltip__text">
        ${translation.run__test__durationDifference__td__duration__tooltip__text.trim()}:<br/>
        ${testResultCompare.attemptCountRun1}
        ${
          testResultCompare.attemptCountRun1 > 1
            ? translation.runs
            : translation.run
        }<br/>
        ${translation.versus}<br/>
        ${testResultCompare.attemptCountRun2}
        ${
          testResultCompare.attemptCountRun2 > 1
            ? translation.runs
            : translation.run
        }
      </span>
    </div>
  `
    : "";
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

function isCriticalTest(resultCompare: TestResultCompare) {
  if (isPercentageValues()) {
    return (
      resultCompare.durationDifferencePercentage >
      getMaxDurationDifferencePercentage()
    );
  }
  return resultCompare.durationDifference > getMaxDurationDifference();
}

function getColorByDuration(duration: number) {
  return colors[getPositionByDuration(duration)];
}

function getPositionByDuration(duration: number) {
  let position;
  if (isPercentageValues()) {
    position =
      (colors.length * (duration - MIN_BORDER_PERCENTAGE)) /
      (getMaxDurationDifferencePercentage() - MIN_BORDER_PERCENTAGE);
  } else {
    position = (colors.length * duration) / getMaxDurationDifference();
  }
  if (position >= colors.length) {
    position = colors.length - 1;
  } else if (position < 0) {
    position = 0;
  }
  return Number(position.toFixed(0));
}

function getAdjustedStyle(
  resultCompare: TestResultCompare | RunResultCompare | CypressRunResultCompare
) {
  return isDifferenceDetected(resultCompare)
    ? ""
    : `background-color: ${getColorByDuration(
        isPercentageValues()
          ? resultCompare.durationDifferencePercentage
          : resultCompare.durationDifference
      )}`;
}

function isDifferenceDetected(
  resultCompare: TestResultCompare | RunResultCompare | CypressRunResultCompare
) {
  return (
    (resultCompare instanceof TestResultCompare ||
      resultCompare instanceof RunResultCompare) &&
    resultCompare.differenceDetectedMessage !== CypressDifference.NO_DIFFERENCE
  );
}

function getDurationRange(resultCompare: CypressRunResultCompare) {
  console.log(resultCompare);
  if (isPercentageValues()) {
    return [
      resultCompare.lowestDurationDifferencePercentage + "%",
      resultCompare.highestDurationDifferencePercentage + "%",
    ];
  }
  return [
    resultCompare.lowestDurationDifference + translation.milliseconds,
    resultCompare.highestDurationDifference + translation.milliseconds,
  ];
}

function getAdjustedDurationDifferenceString(
  resultCompare: TestResultCompare | RunResultCompare | CypressRunResultCompare
) {
  if (isPercentageValues()) {
    return resultCompare.durationDifferencePercentage + "%";
  }
  return resultCompare.durationDifference + translation.milliseconds;
}

// function getAdjustedDurationDifferenceWithoutMissingTestsString(
//   resultCompare: RunResultCompare | CypressRunResultCompare
// ) {
//   if (isPercentageValues()) {
//     return resultCompare.durationDifferenceWithoutMissingTestsPercentage + "%";
//   }
//   return (
//     resultCompare.durationDifferenceWithoutMissingTests +
//     translation.milliseconds
//   );
// }
