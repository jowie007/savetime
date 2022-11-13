import { Locale } from '../services/handler/translation-handler'

export class Settings {
  locale: Locale

  constructor(locale: Locale) {
    this.locale = locale
  }
}
