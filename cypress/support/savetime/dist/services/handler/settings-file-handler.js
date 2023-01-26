"use strict";
exports.__esModule = true;
exports.saveSettings = exports.readSettings = void 0;
var settings_1 = require("../../classes/settings");
// eslint-disable-next-line @typescript-eslint/no-var-requires
var fs = require("fs");
var SETTINGS_FILE = __dirname + "/../../../src/settings.json";
function readSettings() {
    try {
        return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
    }
    catch (e) {
        console.log("Unable to read settings");
        return settings_1.INITIAL_SETTINGS;
    }
}
exports.readSettings = readSettings;
function saveSettings(settings) {
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, "\t"), function (err) {
        if (err) {
            console.error(err);
        }
    });
}
exports.saveSettings = saveSettings;
//# sourceMappingURL=settings-file-handler.js.map