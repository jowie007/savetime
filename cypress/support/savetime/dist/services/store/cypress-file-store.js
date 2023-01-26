"use strict";
exports.__esModule = true;
exports.getCypressLogFiles = exports.initCypressFileStore = void 0;
var cypress_file_handler_1 = require("../handler/cypress-file-handler");
var settings_store_1 = require("./settings-store");
var files;
function initCypressFileStore() {
    files = (0, cypress_file_handler_1.getAllFileDetails)((0, settings_store_1.getType)());
}
exports.initCypressFileStore = initCypressFileStore;
function getCypressLogFiles() {
    return files;
}
exports.getCypressLogFiles = getCypressLogFiles;
//# sourceMappingURL=cypress-file-store.js.map