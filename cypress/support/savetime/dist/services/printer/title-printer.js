"use strict";
exports.__esModule = true;
exports.printTitle = void 0;
var translation_handler_1 = require("../handler/translation-handler");
function printTitle() {
    init();
}
exports.printTitle = printTitle;
function init() {
    document.getElementById("title").innerHTML = translation_handler_1.translation.title;
}
//# sourceMappingURL=title-printer.js.map