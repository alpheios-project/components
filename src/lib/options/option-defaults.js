export default class OptionDefaults {
  /**
   * Base Class for holding Option defaults
   */
  constructor (domain) {
    this.domain = domain
  }

  get storageDomain () {
    return this.domain
  }

  static get defaults () {
    return { }
  }
}
