import { Settings } from '../../classes/settings'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

const SETTINGS_FILE = __dirname + '/../../settings.json'

export function readSettings(): Settings {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf8')) as Settings
  } catch (e) {
    console.log('Unable to read settings')
    return new Settings()
  }
}
