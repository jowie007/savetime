import { Locale } from '../services/handler/translation-handler'

const FALLBACK_LANGUAGE = Locale.EN

export class Settings {
  language: Locale

  constructor(language: Locale = FALLBACK_LANGUAGE) {
    this.language = language
  }
}
