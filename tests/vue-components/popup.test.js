/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Popup from '@/vue-components/popup.vue'
import Tooltip from '@/vue-components/tooltip.vue'
import Lookup from '@/vue-components/lookup.vue'
import Setting from '@/vue-components/setting.vue'

import Vue from 'vue/dist/vue'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import LocalStorageArea from '@/lib/options/local-storage-area.js'

console.log = function () {}

describe('popup.test.js', () => {
  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let emptyProps = {
    data: {},
    messages: [],
    lexemes: [],
    definitions: {},
    linkedfeatures: [],
    visible: false,
    translations: {}
  }

  it('1 Popup - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Popup, {
      propsData: {
        data: {},
        messages: [],
        lexemes: [],
        definitions: {},
        linkedfeatures: [],
        visible: false,
        translations: {}
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Popup - render with children components (min requirements)', async () => {
    let cmp = mount(Popup, {
      propsData: {
        data: {},
        messages: [],
        lexemes: [],
        definitions: {},
        linkedfeatures: [],
        visible: false,
        translations: {}
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.element.style.display).toEqual('none')

    expect(cmp.find('.alpheios-popup__header').findAll('button').length).not.toBeLessThan(4)

    expect(cmp.find('.alpheios-popup__header').findAll(Tooltip).length).not.toBeLessThan(4)

    for (let i = 0; i < 4; i++) {
      expect(cmp.find('.alpheios-popup__header').findAll(Tooltip).at(i).find('button').exists()).toBeTruthy()
    }

    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')
    expect(cmp.findAll('.alpheios-popup__definitions--placeholder').filter(w => w.element.style.display !== 'none').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__providers').find('img').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__providers').find('a').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()

    expect(cmp.find(Lookup)).toBeTruthy()
  })

  it('3 Popup - render with children components (l10n - check labels buttons)', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: false,
      translations: {}
    }
    curProps.data.l10n = l10n

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.find('.alpheios-popup__more-btn-treebank').text()).toEqual(l10n.messages.LABEL_POPUP_TREEBANK)

    let tooltipsHeader = cmp.find('.alpheios-popup__header').findAll(Tooltip)

    for (let i = 0; i < tooltipsHeader.length; i++) {
      let checkText = tooltipsHeader.at(i).find('button').text()

      if (checkText === l10n.messages.LABEL_POPUP_TREEBANK) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_TREEBANK)
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_TREEBANK)
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][0]).toEqual(['treebank'])
      }

      if (checkText === l10n.messages.LABEL_POPUP_INFLECT) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_SHOW_INFLECTIONS)
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_SHOW_INFLECTIONS)
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][1]).toEqual(['inflections'])
      }

      if (checkText === l10n.messages.LABEL_POPUP_DEFINE) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_SHOW_DEFINITIONS)
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_SHOW_DEFINITIONS)
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][2]).toEqual(['definitions'])
      }

      if (checkText === l10n.messages.LABEL_POPUP_OPTIONS) {
        expect(tooltipsHeader.at(i).vm.tooltipText).toEqual(l10n.messages.TOOLTIP_SHOW_OPTIONS)
        expect(tooltipsHeader.at(i).find('.tooltiptext').text()).toEqual(l10n.messages.TOOLTIP_SHOW_OPTIONS)
        tooltipsHeader.at(i).find('button').trigger('click')

        await Vue.nextTick()
        expect(cmp.emitted()['showpaneltab'][3]).toEqual(['options'])
      }
    }
  })

  it('4 Popup - check showProviders functions', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: false,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.showProviders = false
    curProps.data.morphDataReady = true
    curProps.data.providers = [ 'Provider1', 'Provider2' ]

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.find('.alpheios-popup__morph-cont-ready').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()

    expect(cmp.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_SHOWCREDITS)

    cmp.find('.alpheios-popup__providers').find('a').trigger('click')

    await Vue.nextTick()

    expect(cmp.vm.data.showProviders).toBeTruthy()
    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeTruthy()

    expect(cmp.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_HIDECREDITS)

    expect(cmp.findAll('.alpheios-popup__morph-cont-providers .alpheios-popup__morph-cont-providers-source').at(0).text()).toEqual('Provider1')
    expect(cmp.findAll('.alpheios-popup__morph-cont-providers .alpheios-popup__morph-cont-providers-source').at(1).text()).toEqual('Provider2')
  })

  it('5 Popup - header styles and close button check', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'

    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.element.style.display).not.toEqual('none')
    expect(cmp.element.style.left).toBeDefined()
    expect(cmp.element.style.top).toBeDefined()
    expect(cmp.element.style.width).toBeDefined()
    expect(cmp.element.style.height).toBeDefined()

    expect(cmp.vm.divClasses).toEqual('')

    curProps.data.classes = ['foo1', 'foo2']
    cmp.setProps({ classesChanged: 1 })
    expect(cmp.vm.divClasses).toEqual('foo1 foo2')

    expect(cmp.find('.alpheios-popup__close-btn').exists()).toBeTruthy()

    cmp.find('.alpheios-popup__close-btn').trigger('click')

    await Vue.nextTick()

    expect(cmp.emitted()['close']).toBeTruthy()

    let tooltips = cmp.findAll(Tooltip)
    for (let i = 0; i < tooltips.length; i++) {
      if (tooltips.at(i).find('.alpheios-popup__close-btn').length === 1) {
        expect(tooltips.at(i).vm.tooltiptext).toEqual(l10n.messages.TOOLTIP_POPUP_CLOSE)
        expect(tooltips.at(i).vm.additionalStyles).toBeDefined()
      }
    }
  })

  it('6 Popup - check morph placeholders', () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }
    curProps.data.l10n = l10n
    curProps.data.morphDataReady = false
    curProps.data.currentLanguageName = 'lat'
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'
    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    let placeholder1 = cmp.findAll('.alpheios-popup__definitions--placeholder').filter(elm => elm.text() === l10n.messages.PLACEHOLDER_POPUP_DATA)

    expect(placeholder1.exists()).toBeTruthy()
    expect(placeholder1.at(0).element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')

    curProps.data.morphDataReady = false
    curProps.data.currentLanguageName = undefined

    let placeholder2 = cmp.findAll('.alpheios-popup__definitions--placeholder').filter(elm => elm.text() === l10n.messages.PLACEHOLDER_NO_LANGUAGE_POPUP_DATA)
    expect(placeholder2.exists()).toBeTruthy()
    expect(placeholder2.at(0).element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')

    curProps.data.morphDataReady = true

    let allplaceholders = cmp.findAll('.alpheios-popup__definitions--placeholder')
    for (let i = 0; i < allplaceholders.length; i++) {
      expect(allplaceholders.at(i).element.style.display).toEqual('none')
    }

    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).not.toEqual('none')
  })

  it('7 Popup - check notifications', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }
    curProps.data.l10n = l10n
    curProps.data.notification = {
      important: false,
      showLanguageSwitcher: false,
      text: '',
      visible: true
    }

    curProps.data.left = '10vw'
    curProps.data.top = '10vh'

    let options = new Options(ContentOptionDefaults, LocalStorageArea)

    curProps.data.settings = {}
    curProps.data.settings.popupPosition = options.items.popupPosition
    curProps.data.settings.popupPosition.currentValue = 'fixed'
    curProps.data.settings.preferredLanguage = options.items.preferredLanguage

    let cmp = mount(Popup, {
      propsData: curProps
    })

    expect(cmp.find('.alpheios-popup__notifications').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__notifications').element.style.display).toEqual('none')

    cmp.vm.data.notification.important = true
    await Vue.nextTick()
    expect(cmp.find('.alpheios-popup__notifications').element.style.display).not.toEqual('none')

    expect(cmp.find('.alpheios-popup__notifications-close-btn').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__notifications').find(Setting).exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__notifications').find(Setting).element.style.display).toEqual('none')

    cmp.vm.data.notification.showLanguageSwitcher = true

    await Vue.nextTick()

    expect(cmp.find('.alpheios-popup__notifications').find(Setting).element.style.display).not.toEqual('none')

    cmp.find('.alpheios-popup__notifications-close-btn').trigger('click')

    await Vue.nextTick()

    expect(cmp.emitted()['closepopupnotifications']).toBeTruthy()
  })

  it('8 Popup - check events on created, change visible and updated', async () => {
    let curProps = {
      data: {},
      messages: [],
      lexemes: [],
      definitions: {},
      linkedfeatures: [],
      visible: true,
      translations: {}
    }

    curProps.data.l10n = l10n
    curProps.data.left = '10vw'
    curProps.data.top = '10vh'

    curProps.data.settings = { popupPosition: { currentValue: 'fixed' } }

    let cmp = mount(Popup, {
      propsData: curProps
    })

    jest.spyOn(cmp.vm, 'updatePopupDimensions')
    jest.spyOn(cmp.vm, 'resetPopupDimensions')

    cmp.vm.$emit('updatePopupDimensions')

    await Vue.nextTick()

    expect(cmp.vm.updatePopupDimensions).toHaveBeenCalled()

    cmp.vm.$emit('changeStyleClass', 'fontSize', 'medium')

    await Vue.nextTick()

    expect(cmp.emitted()['ui-option-change']).toBeTruthy()
    expect(cmp.emitted()['ui-option-change'][0]).toEqual(['fontSize', 'medium'])

    cmp.vm.data.left = '9vw'

    await Vue.nextTick()

    expect(cmp.vm.updatePopupDimensions).toHaveBeenCalled()

    cmp.setProps({ visible: false })

    await Vue.nextTick()

    expect(cmp.vm.resetPopupDimensions).toHaveBeenCalled()

    cmp.setProps({ visible: true })

    await Vue.nextTick()

    expect(cmp.vm.updatePopupDimensions).toHaveBeenCalled()
  })
})
