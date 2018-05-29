/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Panel from '@/vue-components/panel.vue'
import Tooltip from '@/vue-components/tooltip.vue'

import Vue from 'vue/dist/vue'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

console.error = function () {}

describe('panel.test.js', () => {
  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  it('1 Panel - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: true,
            options: false,
            status: false,
            treebank: false
          }
        }
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Panel - render with children components (min requirements)', () => {
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: true,
            options: false,
            status: false,
            treebank: false
          },
          l10n: l10n,
          grammarRes: {},
          infoComponentData: {}
        }
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.element.style.display).toEqual('none')

    expect(cmp.find('.alpheios-panel__header-btn-group--center').findAll('.alpheios-panel__header-nav-btn').length).not.toBeLessThan(7)
    expect(cmp.find('.alpheios-panel__header-btn-group--end').findAll('.alpheios-panel__header-action-btn').length).not.toBeLessThan(3)

    expect(cmp.find('.alpheios-panel__content').findAll('.alpheios-panel__tab-panel').length).not.toBeLessThan(7)

    expect(cmp.find('.alpheios-panel__notifications').exists()).toBeFalsy()
  })

  it('3 Panel - header buttons', async () => {
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: true,
            options: false,
            status: false,
            treebank: false
          },
          l10n: l10n,
          grammarRes: {},
          infoComponentData: {}
        }
      }
    })

    cmp.setMethods({
      'changeTabL': function (name) {
        console.log('I am in ChangeTab', name)
        for (let key of Object.keys(this.data.tabs)) {
          if (this.data.tabs[key]) { this.data.tabs[key] = false }
        }
        this.data.tabs[name] = true
      }
    })
    let tabsButtonsTooltips = cmp.find('.alpheios-panel__header-btn-group--center').findAll(Tooltip)

    for (let i = 0; i < tabsButtonsTooltips.length; i++) {
      switch (tabsButtonsTooltips.at(i).vm.tooltipText) {
        case l10n.messages.TOOLTIP_HELP:
          expect(tabsButtonsTooltips.at(i).find('.alpheios-panel__header-nav-btn').hasClass('active')).toBeTruthy()
          break
        default:
          expect(tabsButtonsTooltips.at(i).find('.alpheios-panel__header-nav-btn').hasClass('active')).toBeFalsy()
          break
      }
    }

    for (let i = 0; i < tabsButtonsTooltips.length; i++) {
      tabsButtonsTooltips.at(i).find('.alpheios-panel__header-nav-btn').trigger('click')
      await Vue.nextTick()

      expect(cmp.emitted()['changetab'].length).toEqual(i + 1)

      let tabName = ''

      switch (tabsButtonsTooltips.at(i).vm.tooltipText) {
        case l10n.messages.TOOLTIP_HELP:
          tabName = 'info'
          break
        case l10n.messages.TOOLTIP_DEFINITIONS:
          tabName = 'definitions'
          break
        case l10n.messages.TOOLTIP_INFLECT:
          tabName = 'inflections'
          break
        case l10n.messages.TOOLTIP_GRAMMAR:
          tabName = 'grammar'
          break
        case l10n.messages.TOOLTIP_TREEBANK:
          tabName = 'treebank'
          break
        case l10n.messages.TOOLTIP_OPTIONS:
          tabName = 'options'
          break
        case l10n.messages.TOOLTIP_STATUS:
          tabName = 'status'
          break
        default:
          tabName = ''
          break
      }
      if (tabName.length > 0) {
        expect(cmp.emitted()['changetab'][i]).toEqual([tabName])
        cmp.vm.changeTabL(tabName)
        await Vue.nextTick()
        expect(cmp.vm.data.tabs[tabName]).toBeTruthy()
        expect(cmp.find('.alpheios-panel__content').find(`.alpheios-panel__tab__${tabName}`).element.style.display).not.toEqual('none')
      }

      expect(Object.keys(cmp.vm.data.tabs).filter(key => cmp.vm.data.tabs[key] === true).length).toEqual(1)
    }
  })
})
