import Query from './query.js'

export default class AnnotationQuery extends Query {
  constructor (name, options) {
    super(name)
    this.ui = options.uiController
    this.l10n = options.l10n
    this.siteOptions = options.siteOptions
    this.document = options.document
  }

  static create (options) {
    return Query.create(AnnotationQuery, options)
  }

  getData () {
    this.ui.updatePageAnnotationData(this.getTreebankOptions())
    this.finalize('complete')
  }

  finalize (result) {
    console.log('Finalizing AnnotationQuery')
    Query.destroy(this)
    return result
  }

  getTreebankOptions () {
    let siteMatch = this.siteOptions.filter((s) => this.document.location.href.match(new RegExp(s.uriMatch)) && s.resourceOptions.items.treebanks)
    if (siteMatch.length > 0) {
      return { treebank: { page: { src: siteMatch[0].resourceOptions.items.treebanks.currentValue } } }
    } else {
      return { treebank: { page: {} } }
    }
  }
}
