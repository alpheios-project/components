/* eslint-env jest */
import LexicalQuery from '../../../src/lib/queries/lexical-query'
import Options from '../../../src/lib/options/options'
import LanguageOptionDefaults from '../../../src/settings/language-options-defaults'

describe('lexical-query.test.js', () => {
  let emptyPromise
  beforeEach(() => {
    emptyPromise = () => { return new Promise((resolve, reject) => {}) }
  })

  it('parses lexicon options', async () => {
    let languageDefs = new LanguageOptionDefaults()
    let languageOptions = new Options(languageDefs, emptyPromise, emptyPromise)

    let siteFixture = JSON.parse(`
      [
        {
          "name": "testsite",
          "uriMatch": "https?://example.org",
          "resourceOptions": {
            "lexiconsShort-lat": ["https://github.com/alpheios-project/xx"]
          }
        }
      ]
    `)
    let allSiteOptions = []
    for (let site of siteFixture) {
      let siteDefs = new LanguageOptionDefaults(`alpheios-${site.name}-options`)
      let loader = () => {
        return new Promise((resolve, reject) => {
          resolve(site.resourceOptions)
        })
      }
      let resOpts = new Options(siteDefs, loader, emptyPromise)
      await resOpts.load(() => { })
      allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: resOpts })
    }
    let mockSelector = {
      location: 'http://example.org',
      languageCode: 'lat'
    }
    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: allSiteOptions,
      langOpts: {}
    })
    expect(query.getLexiconOptions('lexiconsShort')).toEqual({allow: ['https://github.com/alpheios-project/xx']})
  })
})
