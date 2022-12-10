import { getAllFileDetails } from '../handler/cypress-file-handler'
import { getType } from './settings-store';

let files: Map<number, Date>

export function initCypressFileStore() {
  files = getAllFileDetails(getType())
}

export function getCypressLogFiles() {
  return files
}
