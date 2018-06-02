/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Lookup from '@/vue-components/lookup.vue'

import L10n from '../../src/lib/l10n/l10n'
import Locales from '../../src/locales/locales'
import enUS from '../../src/locales/en-us/messages.json'
import enGB from '../../src/locales/en-gb/messages.json'

import Options from '../../src/lib/options/options.js'
import ContentOptionDefaults from '../../src/settings/content-options-defaults.json'
import TempStorageArea from '../../src/lib/options/temp-storage-area.js'
import LanguageOptionDefaults from '../../src/settings/language-options-defaults.json'

describe('lookup.test.js', () => {
  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  it('1 Lookup - renders a vue instance (min requirements)', () => {
    let cmp = mount(Lookup, {
      propsData: {
        uiController: null
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Lookup - full renders a vue instance', () => {
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
      }
    })

    expect(cmp.find('input').exists()).toBeTruthy()
    cmp.setData({
      lookuptext: 'footext'
    })
    expect(cmp.find('input').element.value).toEqual('footext')
  })
})
