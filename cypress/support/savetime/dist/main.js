"use strict";
exports.__esModule = true;
var electron_1 = require("electron");
var path = require("path");
function createWindow() {
    var win = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            sandbox: false,
            preload: path.join(__dirname, "preload.js")
        },
        icon: path.join(__dirname, "/assets/logo_savetime.ico")
    });
    win.loadFile("../index.html");
    win.webContents.openDevTools({ mode: "bottom" });
}
electron_1.app.whenReady().then(function () {
    createWindow();
    electron_1.app.on("activate", function () {
        if (electron_1.BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
//# sourceMappingURL=main.js.map