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

LexicalQueryLookup.create = function () {
  return {
    getData: function () { }
  }
}

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

  it('2 Lookup - full renders and click lookup button execute', () => {
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
      }
    })

    expect(cmp.vm.options).toBeDefined()
    expect(cmp.vm.resourceOptions).toBeDefined()

    expect(cmp.vm.currentLanguage).toEqual(options.items.preferredLanguage.currentTextValue())
    expect(cmp.vm.initLanguage).toBeNull()

    expect(cmp.vm.preferredLanguage.currentTextValue()).toEqual(cmp.vm.options.items.preferredLanguage.currentTextValue())

    expect(cmp.find('input').exists()).toBeTruthy()
    jest.spyOn(LexicalQueryLookup, 'create')

    cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).not.toHaveBeenCalled()

    cmp.setData({
      lookuptext: 'footext'
    })
    expect(cmp.find('input').element.value).toEqual('footext')

    cmp.find('button').trigger('click')
    expect(LexicalQueryLookup.create).toHaveBeenCalled()
  })

  it('3 Lookup - created with parent language', () => {
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions },
        parentLanguage: 'Latin'
      }
    })

    expect(cmp.vm.initLanguage).toEqual('Latin')
    expect(cmp.vm.currentLanguage).toEqual('Latin')
    expect(cmp.vm.options.items.preferredLanguage.currentTextValue()).toEqual('Latin')

    expect(cmp.vm.lexiconSettingName).toEqual(`lexiconsShort-lat`)
    expect(cmp.vm.lexiconsFiltered).toEqual(resourceOptions.items.lexiconsShort.filter((item) => item.name === `lexiconsShort-lat`))
    expect(cmp.vm.preferredLanguage.currentTextValue()).toEqual(cmp.vm.options.items.preferredLanguage.currentTextValue())
  })

  it('4 Lookup - settings block', () => {
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

  it('5 Lookup - settings block events', () => {
    let options = new Options(ContentOptionDefaults, TempStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, TempStorageArea)

    let cmp = mount(Lookup, {
      propsData: {
        uiController: { l10n: l10n, options: options, resourceOptions: resourceOptions }
      }
    })

    cmp.vm.settingChange('', 'Greek')
    expect(cmp.vm.options.items.preferredLanguage.currentTextValue()).toEqual('Greek')
    expect(cmp.vm.currentLanguage).toEqual('Greek')

    cmp.vm.resourceSettingChange('lexiconsShort-grc', ['Middle Liddell'])

    // expect(cmp.vm.resourceOptions.items[keyinfo.setting][0].curr).toEqual(resourceOptions.items[keyinfo.setting].filter((f) => f.name === 'lexiconsShort-grc').forEach((f) => { f.setTextValue(['Middle Liddell']) }))
  })
})
