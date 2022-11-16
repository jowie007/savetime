import { INITIAL_SETTINGS, Settings } from "../../classes/settings";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require("fs");

const SETTINGS_FILE = __dirname + "/../../../src/settings.json";

export function readSettings(): Settings {
  console.log("reading settings");
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8")) as Settings;
  } catch (e) {
    console.log("Unable to read settings");
    return INITIAL_SETTINGS;
  }
}

export function saveSettings(settings: Settings) {
  console.log("saving settings");
  fs.writeFileSync(
    SETTINGS_FILE,
    JSON.stringify(settings, null, "\t"),
    (err: any) => {
      if (err) {
        console.error(err);
      }
    }
  );
}
