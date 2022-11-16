import { initializeHTML } from "../../preload";
import {
  getLanguageFlagByLocale,
  Locale,
  translation,
} from "../handler/translation-handler";
import {
  getMaxDurationDifference,
  setLocale,
  setMaxDurationDifference,
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

function fillSettings(): void {
  settings__panel.innerHTML = getSettingsContent();
  initLocaleButtonsClickListeners();
  initMaxDurationDifferenceChangeListener();
}

function getSettingsContent(): string {
  const languageFlagsHTMLArray: string[] = [];
  Object.values(Locale).forEach((locale) => {
    if (!Number.isNaN(Number(locale))) {
      languageFlagsHTMLArray.push(getFlagButtonContentByLocale(Number(locale)));
    }
  });
  return `
    <div id='settings__language__wrapper' class='settings__item'>
      <label id='settings__languageLabel' for='settings__language'>
        ${translation.settings__languageLabel}
      </label>
      <div id='settings__language'>
        ${languageFlagsHTMLArray.join(" ")}
      </div>
    </div>
    <div id='settings__maxDurationDifference__wrapper' class='settings__item'>
      <label id='settings__maxDurationDifferenceLabel' for='settings__maxDurationDifference'>
        ${translation.settings__maxDurationDifferenceLabel}
      </label><br/>
      <input id='settings__maxDurationDifference' type='number' min='1' value='${getMaxDurationDifference()}' oninput="validity.valid||(value='');"/>
    </div>
    `;
}

function getFlagButtonContentByLocale(locale: number): string {
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
      console.log("started loading");
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

export function printSettings(): void {
  init();
}
