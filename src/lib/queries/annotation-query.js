import Query from './query.js'
import LanguageOptionDefaults from '../options/language-option-defaults'
import Options from '../options/options'

export default class AnnotationQuery extends Query {
  constructor (name, options) {
    super(name)
    this.ui = options.uiController
    this.l10n = options.l10n
    this.document = options.document
  }

  static create (options) {
    return Query.create(AnnotationQuery, options)
  }

  getData () {
    let saver = () => {
      return new Promise((resolve, reject) => {
        reject(new Error('save not implemented'))
      })
    }
    let siteFixture = JSON.parse(`
      [
        {
          "name": "testsite",
          "uriMatch": "http://thelatinlibrary.com/caesar/gall1",
          "resourceOptions": {
            "treebanks-lat": ["http://127.0.0.1:4000/alpheios-treebanks/tbext.html?owner=perseids-project&repo=harrington_trees&collid=lattb&objid=7229&doc=lattb.7229.1&chunk=1&w=3&owner=perseids-project&repos=harrington_trees"]
          }
        }
      ]
    `)
    let siteOptions = []
    for (let site of siteFixture) {
      let siteDefs = new LanguageOptionDefaults(`alpheios-${site.name}-options`)
      let loader = () => {
        return new Promise((resolve, reject) => {
          resolve(site.resourceOptions)
        })
      }
      let resOpts = new Options(siteDefs, loader, saver)
      let ui = this.ui
      resOpts.load(() => {
        siteOptions.push({ uriMatch: site.uriMatch, resourceOptions: resOpts })
        let siteMatch = siteOptions.filter((s) => this.document.location.href.match(new RegExp(s.uriMatch)) && s.resourceOptions.items.treebanks)
        if (siteMatch.length > 0) {
          ui.updatePageAnnotationData({ treebank: { page: { src: siteMatch[0].resourceOptions.items.treebanks[0].currentValue[0] } } })
        }
      })
    }
    this.finalize('complete')
  }

  finalize (result) {
    console.log('Finalizing AnnotationQuery')
    Query.destroy(this)
    return result
  }
}
