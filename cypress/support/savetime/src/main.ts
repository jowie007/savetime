import { app, BrowserWindow } from "electron";
import * as path from "path";

function createWindow() {
  console.log("DIRNAME", __dirname);

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      sandbox: false,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "/assets/logo_savetime.ico"),
  });

  win.loadFile("../index.html");
  win.webContents.openDevTools({ mode: "bottom" });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
