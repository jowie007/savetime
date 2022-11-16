import { initializeHTML } from "../../preload";
import {
  getLanguageFlagByLocale,
  Locale,
  translation,
} from "../handler/translation-handler";
import {
  getMaxDurationDifference,
  isPercentageValues,
  setLocale,
  setMaxDurationDifference,
  setPercentageValues,
} from "../store/settings-store";

let settings__button: HTMLElement;
let settings__panel: HTMLElement;
let initializedBefore = false;

function init() {
  if (!initializedBefore) {
    initializeAccordionButton();
  }
  fillSettings();
  initializedBefore = true;
}

function initializeAccordionButton() {
  settings__button = document.getElementById("settings__button");
  settings__panel = document.getElementById("settings__panel");
  settings__button.textContent = translation.settings;
  settings__button.addEventListener("click", function () {
    this.classList.toggle("settings__active");
    settings__panel.style.display =
      settings__panel.style.display === "block" ? "none" : "block";
  });
}

function fillSettings() {
  settings__panel.innerHTML = getSettingsContent();
  initLocaleButtonsClickListeners();
  initMaxDurationDifferenceChangeListener();
  initPercentageValuesChangeListener();
}

function getSettingsContent() {
  const languageFlagsHTMLArray: string[] = [];
  Object.values(Locale).forEach((locale) => {
    if (!Number.isNaN(Number(locale))) {
      languageFlagsHTMLArray.push(getFlagButtonContentByLocale(Number(locale)));
    }
  });
  return `
    <div id='settings__language__wrapper' class='settings__item'>
      <label id='settings__language__label' for='settings__language'>
        ${translation.settings__language__label}
      </label><br/>
      <div id='settings__language'>
        ${languageFlagsHTMLArray.join(" ")}
      </div>
    </div>
    <div id='settings__maxDurationDifference__wrapper' class='settings__item'>
      <label id='settings__maxDurationDifference__label' for='settings__maxDurationDifference'>
        ${translation.settings__maxDurationDifference__label}
      </label><br/>
      <input 
        id='settings__maxDurationDifference' 
        type='number' 
        min='1' 
        value='${getMaxDurationDifference()}' 
        oninput="validity.valid||(value='');"
        />
    </div>
    <div id='settings__percentageValues' class='settings__item'>
      <label id='settings__percentageValues__label' for='settings__maxDurationDifference'>
        ${translation.settings__percentageValues__label}
      </label><br/>
      <input 
        id='settings__percentageValues__checkbox' 
        type='checkbox'
        ${isPercentageValues() ? "checked" : ""}
        />
    </div>
    `;
}

function getFlagButtonContentByLocale(locale: number) {
  return `
    <button id='settings__language__button-${locale}'
      class='settings__language__button'>
        ${getLanguageFlagByLocale(locale)}
    </button>
    `;
}

function initLocaleButtonsClickListeners() {
  Object.values(Locale).forEach((locale) => {
    if (!Number.isNaN(Number(locale))) {
      document
        .getElementById(`settings__language__button-${locale}`)
        .addEventListener("click", () => {
          setLocale(Number(locale));
          initializeHTML();
        });
    }
  });
}

function initMaxDurationDifferenceChangeListener() {
  document
    .getElementById(`settings__maxDurationDifference`)
    .addEventListener("change", (change) => {
      setMaxDurationDifference(
        Number((change.target as HTMLInputElement).value)
      );
      initializeHTML();
    });
}

function initPercentageValuesChangeListener() {
  document
    .getElementById(`settings__percentageValues__checkbox`)
    .addEventListener("change", () => {
      setPercentageValues(!isPercentageValues());
      initializeHTML();
    });
}

export function printSettings() {
  init();
}
