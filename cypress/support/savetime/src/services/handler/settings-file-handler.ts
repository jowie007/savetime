import { INITIAL_SETTINGS, SaveSettings, Settings } from "../../classes/settings";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const SETTINGS_FILE = __dirname + "/../../../src/settings.json";

export function readSettings(): Settings {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8")) as Settings;
  } catch (e) {
    console.log("Unable to read settings");
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: Settings) {
  fs.writeFileSync(
    SETTINGS_FILE,
    JSON.stringify(settings as SaveSettings, null, "\t"),
    (err: any) => {
      if (err) {
        console.error(err);
      }
    }
  );
}
