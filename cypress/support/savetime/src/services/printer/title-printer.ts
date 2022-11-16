import { translation } from "../handler/translation-handler";

export function printTitle() {
  init();
}

function init() {
  document.getElementById("title").innerHTML = translation.title;
}
