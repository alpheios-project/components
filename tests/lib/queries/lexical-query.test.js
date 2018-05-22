/* eslint-env jest */
import LexicalQuery from '../../../src/lib/queries/lexical-query'
import Options from '../../../src/lib/options/options'
import LanguageOptionDefaults from '../../../src/settings/language-options-defaults.json'
import LocalStorageArea from '../../../src/lib/options/local-storage-area.js'
import SiteOptions from './fixtures/site-options-shortlex.json'

import { LanguageModelFactory as LMF } from 'alpheios-data-models'

describe('lexical-query.test.js', () => {
  let emptyPromise
  beforeEach(() => {
    emptyPromise = () => { return new Promise((resolve, reject) => {}) }
  })

  let mockSelector = {
    location: 'http://example.org',
    languageCode: 'lat'
  }
  let langId = LMF.getLanguageIdFromCode(mockSelector.languageCode)
  let languageOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

  let allSiteOptions = []
  for (let site of SiteOptions) {
    for (let domain of site.options) {
      let siteOpts = new Options(domain, LocalStorageArea)
      siteOpts.storageAdapter.get = emptyPromise
      siteOpts.storageAdapter.set = emptyPromise
      allSiteOptions.push({ uriMatch: site.uriMatch, resourceOptions: siteOpts })
    }
  }

  it('parses lexicon options', async () => {
    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: allSiteOptions,
      langOpts: {}
    })
    expect(query.getLexiconOptions('lexiconsShort')).toEqual({allow: ['https://github.com/alpheios-project/xx']})
  })

  it('Create function returns a new LexicalQuery with params', () => {
    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: allSiteOptions,
      langOpts: {}
    })

    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('LexicalQuery')
    expect(typeof query.ID).toEqual('string')
    expect(query.canReset).toBeFalsy()
  })

  it('If langOpts[langID].lookupMorphLast than LQ canReset = true', () => {
    let curLangOpts = {}
    curLangOpts[langId] = { lookupMorphLast: true }
    let query = LexicalQuery.create(mockSelector, {
      resourceOptions: languageOptions,
      siteOptions: allSiteOptions,
      langOpts: curLangOpts
    })

    expect(query.canReset).toBeTruthy()
  })
})
