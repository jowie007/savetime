import { getAllFileDetails } from '../handler/cypress-file-handler'

let files: Map<number, Date>

export function initCypressFileStoreStore() {
  files = getAllFileDetails()
}

export function getCypressLogFiles() {
  return files
}
