/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Lookup from '@/vue/components/lookup.vue'
import Setting from '@/vue/components/setting.vue'

import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import TempStorageArea from '@/lib/options/temp-storage-area.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'

import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup.js'

describe('lookup.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let contentOptions
  let resourceOptions
  let store
  let api
  let l10nModule

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      modules: {
        app: {
          state: {}
        }
      }
    })

    contentOptions = new Options(ContentOptionDefaults, TempStorageArea)
    resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    api = {
      settings: {
        contentOptions,
        resourceOptions
      }
    }

    l10nModule = new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr([
        [enUS, Locales.en_US],
        [enUSData, Locales.en_US],
        [enUSInfl, Locales.en_US],
        [enGB, Locales.en_GB]
      ])
    })
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it.skip('1 Lookup - renders a vue instance (min requirements)', () => {
    let cmp = mount(Lookup, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it.skip('2 Lookup - full renders and click lookup button execute', () => {
    let fn = LexicalQueryLookup.create
    LexicalQueryLookup.create = function () {
      return {
        getData: function () { }
      }
    }

    let cmp = mount(Lookup, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.settings.contentOptions).toBeDefined()
    expect(cmp.vm.settings.resourceOptions).toBeDefined()

    expect(cmp.vm.currentLanguage).toEqual(contentOptions.items.lookupLanguage.currentTextValue())

    expect(cmp.find('input').exists()).toBeTruthy()
    jest.spyOn(LexicalQueryLookup, 'create')

    // TODO: Redo this after changes in Vue components are finalized
    /* cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).not.toHaveBeenCalled() */

    cmp.setData({
      lookuptext: 'footext'
    })
    expect(cmp.find('input').element.value).toEqual('footext')

    // TODO: Redo this after changes in Vue components are finalized
    /* cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).toHaveBeenCalled() */

    LexicalQueryLookup.create = fn
  })

  it.skip('3 Lookup - created with parent language', () => {
    let cmp = mount(Lookup, {
      propsData: {
        parentLanguage: 'Latin'
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.currentLanguage).toEqual('Latin')
    expect(cmp.vm.settings.contentOptions.items.lookupLanguage.currentTextValue()).toEqual('Latin')

    expect(cmp.vm.lexiconSettingName).toEqual(`lexiconsShort-lat`)
    expect(cmp.vm.lexiconsFiltered).toEqual(resourceOptions.items.lexiconsShort.filter((item) => item.name === `lexiconsShort-lat`))
  })

  it.skip('4 Lookup - settings block', () => {
    let cmp = mount(Lookup, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.find('.alpheios-lookup__settings-items').element.style.display).toEqual('none')

    // cmp.find('.alpheios-lookup__settings-link').trigger('click')

    cmp.vm.overrideLanguage = true
    expect(cmp.find('.alpheios-lookup__settings-items').element.style.display).not.toEqual('none')

    expect(cmp.findAll(Setting).length).toEqual(1)
  })

  it.skip('5 Lookup - settings block events', () => {
    let cmp = mount(Lookup, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.settingChange('', 'Greek')
    expect(cmp.vm.instanceContentOptions.items.lookupLanguage.currentTextValue()).toEqual('Greek')
    expect(cmp.vm.currentLanguage).toEqual('Greek')

    cmp.vm.resourceSettingChange('lexiconsShort-grc', ['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
    let keyinfo = resourceOptions.parseKey('lexiconsShort-grc')

    expect(cmp.vm.instanceResourceOptions.items[keyinfo.setting][0].currentTextValue()).toEqual(['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
  })

  it.skip('6 Lookup - override language check - not checked by default', () => {
    let cmp = mount(Lookup, {
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.overrideLanguage).toBeFalsy()
  })

  it.skip('7 Lookup - watch clearLookupText - clears lookuptext and restore show language data from override language check', () => {
    let cmp = mount(Lookup, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.lookuptext = 'some text'
    cmp.vm.overrideLanguage = false
    cmp.vm.clearLookupText = true

    expect(cmp.vm.lookuptext).toEqual('')
  })
})
