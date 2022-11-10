import { printDropdowns } from "./services/printers/dropdown-printer.js";
import { readTranslationsFile } from "./services/translation-handler.js";

window.addEventListener("DOMContentLoaded", async () => {
  // const replaceText = (selector: string, text: string) => {
  //   const element = document.getElementById(selector)
  //   if (element) element.innerText = text
  // }
  //   for (const type of ['chrome', 'node', 'electron']) {
  //     replaceText(`${type}-version`, process.versions[type])
  //   }
  readTranslationsFile();
  printDropdowns();
});
