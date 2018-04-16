import OptionDefaults from 'option-defaults'

export default class SiteOptionDefaults extends OptionDefaults {
  /**
   * Base Class for holding Option defaults
   */
  constructor (domain = 'alpheios-site-options') {
    super(domain)
  }

  get items () {
    return { }
  }
}
