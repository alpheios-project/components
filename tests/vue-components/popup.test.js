/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Popup from '@/vue-components/popup.vue'
import Tooltip from '@/vue-components/tooltip.vue'
import Lookup from '@/vue-components/lookup.vue'

import Vue from 'vue/dist/vue'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

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
      propsData: Object.assign({}, emptyProps)
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Popup - render with children components (min requirements)', async () => {
    let cmp = mount(Popup, {
      propsData: Object.assign({}, emptyProps)
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__header').findAll('button').length).not.toBeLessThan(4)

    expect(cmp.find('.alpheios-popup__header').findAll(Tooltip).length).not.toBeLessThan(4)

    for (let i = 0; i < 4; i++) {
      expect(cmp.find('.alpheios-popup__header').findAll(Tooltip).at(i).find('button').exists()).toBeTruthy()

      cmp.find('.alpheios-popup__header').findAll(Tooltip).at(i).find('button').trigger('click')

      await Vue.nextTick()
      expect(cmp.emitted()['showpaneltab']).toBeTruthy()
    }

    expect(cmp.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('none')
    expect(cmp.findAll('.alpheios-popup__definitions--placeholder').filter(w => w.element.style.display !== 'none').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__providers').find('img').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-popup__providers').find('a').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()

    expect(cmp.find(Lookup)).toBeTruthy()
  })

  it('3 Popup - render with children components (l10n - check labels buttons)', async () => {
    let curProps = Object.assign({}, emptyProps)
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
    let curProps = Object.assign({}, emptyProps)
    curProps.data.l10n = l10n
    curProps.data.showProviders = false
    curProps.data.morphDataReady = true

    let cmp = mount(Popup, {
      propsData: curProps
    })

    console.warn(cmp.find('.alpheios-popup__morph-cont-ready').html())

    expect(cmp.find('.alpheios-popup__morph-cont-ready').exists())

    cmp.find('.alpheios-popup__providers').find('a').trigger('click')

    await Vue.nextTick()

    // expect(cmp.vm.showProviders).toBeTruthy()

    cmp.vm.data.showProviders = true

    console.warn('********** cmp.vm.data.showProviders', cmp.vm.showProviders)
    console.warn(cmp.find('.alpheios-popup__morph-cont-ready').html())
    /*
    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()

    cmp.find('.alpheios-popup__providers').find('a').trigger('click')

    await Vue.nextTick()

    expect(cmp.vm.data.showProviders).toBeTruthy()
    expect(cmp.find('.alpheios-popup__morph-cont-providers').exists()).toBeTruthy()
*/
  })
})
