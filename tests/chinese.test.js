import 'whatwg-fetch'

import { ClientAdapters } from 'alpheios-client-adapters'
import { Constants, LanguageModelFactory } from 'alpheios-data-models'

import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup'
import TextSelector from '@/lib/selection/text-selector'
import Options from '@/lib/options/options.js'
import LocalStorageArea from '@/lib/options/local-storage-area.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'

describe('chinese.test.js', () => {

  it.skip('Chinese test - ClientAdapters prototype', async () => {
    const targetWord = '阿摩尼亚'

    let result = await ClientAdapters.morphology.chineseloc({
        method: 'getHomonym',
        clientId: 'testClientID',
        params: {
        languageID: Constants.LANG_CHINESE,
        word: targetWord
        }
    })
    console.info('result', result)
  })

  it.skip('Chinese test - LexicalQueryLookup prototype', async () => {
    const targetWord = '阿摩尼亚'
    let sa2 = new LocalStorageArea('alpheios-resource-settings')
    let resourceOptions = new Options(LanguageOptionDefaults, sa2)

    let textSelector = TextSelector.createObjectFromText(targetWord, Constants.LANG_CHINESE)
    

    let lexQuery = LexicalQueryLookup
        .create(textSelector, resourceOptions, null, null, 'test', null)
    lexQuery.getData()
  })
})