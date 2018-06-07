/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Lookup from '@/vue-components/lookup.vue'
import Setting from '@/vue-components/setting.vue'

import Vue from 'vue/dist/vue'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import TempStorageArea from '@/lib/options/temp-storage-area.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'

import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup.js'

describe('lookup.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

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

  it('2 Lookup - full renders and click lookup button execute', async () => {
    LexicalQueryLookup.create = jest.fn(function () {
      return {
        getData: function () { return new Promise((resolve, reject) => { resolve(true) }) }
      }
    })

    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
      }
    })

    expect(cmp.vm.options).toBeDefined()
    expect(cmp.vm.resourceOptions).toBeDefined()

    jest.spyOn(cmp.vm, 'clearTooltipText')

    expect(cmp.vm.options.items.lookupLanguage.currentValue).toEqual(cmp.vm.options.items.lookupLanguage.defaultValue)

    expect(cmp.vm.lookupLanguage.currentTextValue()).toEqual(options.items.lookupLanguage.currentTextValue())

    let lang = options.items.lookupLanguage.values.filter(v => v.text === options.items.lookupLanguage.currentTextValue())

    expect(cmp.vm.lexiconSettingName).toEqual(`lexiconsShort-${lang[0].value}`)
    expect(cmp.vm.lexiconsFiltered).toEqual(resourceOptions.items.lexiconsShort.filter((item) => item.name === `lexiconsShort-${lang[0].value}`))

    expect(cmp.find('input').exists()).toBeTruthy()

    cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).not.toHaveBeenCalled()

    cmp.setData({
      lookuptext: 'footext'
    })
    expect(cmp.find('input').element.value).toEqual('footext')

    cmp.find('button').trigger('click')

    await Vue.nextTick()
    expect(LexicalQueryLookup.create).toHaveBeenCalled()

    expect(cmp.vm.clearTooltipText).toHaveBeenCalled()
    expect(cmp.vm.lookuptext).toEqual('')
  })

  it('3 Lookup - if LexicalQuery failed - lookupText won\'t be cleared', async () => {
    LexicalQueryLookup.create = jest.fn(function () {
      return {
        getData: function () { return new Promise((resolve, reject) => { reject(new Error('Test Lexical Query error')) }) }
      }
    })
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
      }
    })

    cmp.setData({
      lookuptext: 'footext'
    })

    jest.spyOn(cmp.vm, 'clearTooltipText')

    cmp.find('button').trigger('click')
    await Vue.nextTick()
    expect(LexicalQueryLookup.create).toHaveBeenCalled()

    expect(cmp.vm.clearTooltipText).not.toHaveBeenCalled()
    expect(cmp.vm.lookuptext).toEqual('footext')
  })
  /*
  it('4 Lookup - created with parent language', () => {
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions },
        parentLanguage: 'Latin'
      }
    })

    // expect(cmp.vm.initLanguage).toEqual('Latin')
    // expect(cmp.vm.currentLanguage).toEqual('Latin')
    expect(cmp.vm.options.items.lookupLanguage.currentTextValue()).toEqual('Latin')

    expect(cmp.vm.lexiconSettingName).toEqual(`lexiconsShort-lat`)
    expect(cmp.vm.lexiconsFiltered).toEqual(resourceOptions.items.lexiconsShort.filter((item) => item.name === `lexiconsShort-lat`))
    expect(cmp.vm.lookupLanguage.currentTextValue()).toEqual('Latin')
  })
*/
  it('5 Lookup - settings block', () => {
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
      }
    })
    expect(cmp.vm.showLanguageSettings).toBeFalsy()
    expect(cmp.find('.alpheios-lookup__settings-items').element.style.display).toEqual('none')

    cmp.find('.alpheios-lookup__settings-link').trigger('click')

    expect(cmp.vm.showLanguageSettings).toBeTruthy()
    expect(cmp.find('.alpheios-lookup__settings-items').element.style.display).not.toEqual('none')

    expect(cmp.findAll(Setting).length).toEqual(1)

    cmp.vm.switchLookupSettings()
    expect(cmp.vm.showLanguageSettings).toBeFalsy()

    cmp.vm.switchLookupSettings()
    expect(cmp.vm.showLanguageSettings).toBeTruthy()
  })

  it('6 Lookup - settings block events', () => {
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
      }
    })

    cmp.vm.settingChange('lookupLanguage', 'Greek')
    expect(cmp.vm.options.items.lookupLanguage.currentTextValue()).toEqual('Greek')
    expect(cmp.vm.lookupLanguage.currentTextValue()).toEqual('Greek')

    cmp.vm.resourceSettingChange('lexiconsShort-grc', ['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
    let keyinfo = resourceOptions.parseKey('lexiconsShort-grc')

    expect(cmp.vm.resourceOptions.items[keyinfo.setting][0].currentTextValue()).toEqual(['Liddell, Scott, Jones', 'Autenrieth Homeric Lexicon'])
  })

  it('7 Lookup - check required props', () => {
    let cmp = mount(Lookup)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "uiController"'))
  })
})
