/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Panel from '@/vue-components/panel.vue'
import Tooltip from '@/vue-components/tooltip.vue'
import Lookup from '@/vue-components/lookup.vue'
import Info from '@/vue-components/info.vue'
import ShortDef from '@/vue-components/shortdef.vue'
import Inflections from '@/vue-components/inflections.vue'
import ReskinFontColor from '@/vue-components/reskin-font-color.vue'
import Setting from '@/vue-components/setting.vue'
import Treebank from '@/vue-components/treebank.vue'
import Grammar from '@/vue-components/grammar.vue'

import Vue from 'vue/dist/vue'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import LocalStorageArea from '@/lib/options/local-storage-area.js'

console.error = function () {}
console.log = function () {}

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

  it('3 Panel - header tabs buttons', async () => {
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
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          infoComponentData: {}
        }
      }
    })

    cmp.setMethods({
      'changeTabL': function (name) {
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

  it('4 Panel - header action buttons', async () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)

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
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          infoComponentData: {},
          settings: {
            panelPosition: options.items.panelPosition
          }
        }
      }
    })

    let tabsButtonsTooltips = cmp.find('.alpheios-panel__header-btn-group--end').findAll(Tooltip)
    expect(cmp.vm.attachToLeftVisible).toBeFalsy()
    expect(cmp.vm.attachToRightVisible).toBeTruthy()

    for (let i = 0; i < tabsButtonsTooltips.length; i++) {
      switch (tabsButtonsTooltips.at(i).vm.tooltipText) {
        case l10n.messages.TOOLTIP_MOVE_PANEL_LEFT:
          expect(tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').element.style.display).toEqual('none')
          break
        case l10n.messages.TOOLTIP_MOVE_PANEL_RIGHT:
          expect(tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').element.style.display).not.toEqual('none')
          break
        case l10n.messages.TOOLTIP_CLOSE_PANEL:
          expect(tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').element.style.display).not.toEqual('none')
      }
    }

    for (let i = 0; i < tabsButtonsTooltips.length; i++) {
      switch (tabsButtonsTooltips.at(i).vm.tooltipText) {
        case l10n.messages.TOOLTIP_MOVE_PANEL_RIGHT:
          tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').trigger('click')

          await Vue.nextTick()

          expect(cmp.emitted()['setposition']).toBeTruthy()
          expect(cmp.emitted()['setposition'][0]).toEqual(['right'])

          cmp.vm.data.settings.panelPosition.currentValue = 'right'

          await Vue.nextTick()

          expect(cmp.vm.attachToLeftVisible).toBeTruthy()
          expect(cmp.vm.attachToRightVisible).toBeFalsy()

          expect(tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').element.style.display).toEqual('none')
          break
      }
    }

    for (let i = 0; i < tabsButtonsTooltips.length; i++) {
      switch (tabsButtonsTooltips.at(i).vm.tooltipText) {
        case l10n.messages.TOOLTIP_MOVE_PANEL_LEFT:
          tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').trigger('click')

          await Vue.nextTick()

          expect(cmp.emitted()['setposition']).toBeTruthy()
          expect(cmp.emitted()['setposition'][1]).toEqual(['left'])

          cmp.vm.data.settings.panelPosition.currentValue = 'left'

          await Vue.nextTick()

          expect(cmp.vm.attachToLeftVisible).toBeFalsy()
          expect(cmp.vm.attachToRightVisible).toBeTruthy()

          expect(tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').element.style.display).toEqual('none')
          break
      }
    }

    for (let i = 0; i < tabsButtonsTooltips.length; i++) {
      switch (tabsButtonsTooltips.at(i).vm.tooltipText) {
        case l10n.messages.TOOLTIP_CLOSE_PANEL:
          tabsButtonsTooltips.at(i).find('.alpheios-panel__header-action-btn').trigger('click')

          await Vue.nextTick()

          expect(cmp.emitted()['close']).toBeTruthy()
      }
    }
  })

  it('5 Panel - active info tab', () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

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
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          infoComponentData: {
            languageName: 'Latin',
            manifest: {
              name: 'Foo name',
              version: 'Foo version'
            }
          }
        }
      },
      computed: {
        'uiController': function () {
          return {
            options: options,
            resourceOptions: resourceOptions
          }
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__info').element.style.display).not.toEqual('none')

    expect(cmp.find('.alpheios-panel__tab__info').find(Lookup).exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__tab__info').find(Info).exists()).toBeTruthy()

    expect(cmp.find('.alpheios-panel__tab__info').find('.alpheios-lookup__input').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__tab__info').find('.alpheios-lookup__input').element.style.display).not.toEqual('none')

    expect(cmp.find('.alpheios-panel__tab__info').find('.alpheios-lookup__button').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__tab__info').find('.alpheios-lookup__button').element.style.display).not.toEqual('none')

    expect(cmp.find('.alpheios-panel__tab__info').find('.alpheios-lookup__settings-items').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__tab__info').find('.alpheios-lookup__settings-items').element.style.display).toEqual('none')

    expect(cmp.find('.alpheios-panel__tab__info').find(Lookup).vm.parentLanguage).toEqual('Latin')

    expect(cmp.find('.alpheios-panel__tab__info').find(Info).find('.alpheios-info__versiontext').text().indexOf('Foo name')).toBeGreaterThan(-1)
    expect(cmp.find('.alpheios-panel__tab__info').find(Info).find('.alpheios-info__versiontext').text().indexOf('Foo version')).toBeGreaterThan(-1)
    expect(cmp.find('.alpheios-panel__tab__info').find(Info).find('.alpheios-info__currentlanguage').text().indexOf('Latin')).toBeGreaterThan(-1)

    expect(cmp.find('.alpheios-panel__tab__info').find(Info).find('.alpheios-info__helptext').findAll('p').length).not.toBeLessThan(1)
  })

  it('6 Panel - active definitions tab', () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: true,
            inflections: false,
            info: false,
            options: false,
            status: false,
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          shortDefinitions: [
            { lemmaText: 'Foo lemma text', text: 'Foo lemma definition' }
          ],
          fullDefinitions: '<div>Some foo full definitions text</div>'
        }
      },
      computed: {
        'uiController': function () {
          return {
            options: options,
            resourceOptions: resourceOptions
          }
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__definitions').element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-panel__tab__definitions').find(Lookup).exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__tab__definitions').find(ShortDef).exists()).toBeTruthy()

    expect(cmp.find('.alpheios-panel__tab__definitions').find('.alpheios-panel__contentitem-full-definitions').exists()).toBeTruthy()

    expect(cmp.find('.alpheios-panel__tab__definitions').find(ShortDef).findAll('.alpheios-definition__short').length).toEqual(1)
    expect(cmp.find('.alpheios-panel__tab__definitions').find(ShortDef).find('.alpheios-definition__lemma').text()).toEqual('Foo lemma text:')
    expect(cmp.find('.alpheios-panel__tab__definitions').find(ShortDef).find('.alpheios-definition__text').text()).toEqual('Foo lemma definition')
  })

  it('7 Panel - active inflections tab - no data', async () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: true,
            info: false,
            options: false,
            status: false,
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          inflectionComponentData: {
            languageName: 'Latin',
            enabled: true
          },
          settings: options.items
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__inflections').element.style.display).not.toEqual('none')
    let inflectionsBlock = cmp.find('.alpheios-panel__tab__inflections').find(Inflections)

    expect(inflectionsBlock.exists()).toBeTruthy()

    expect(inflectionsBlock.vm.isEnabled).toBeTruthy()
    expect(inflectionsBlock.vm.isContentAvailable).toBeFalsy()

    let inflectionPlaceholders = inflectionsBlock.findAll('.alpheios-inflections__placeholder')

    for (let i = 0; i < inflectionPlaceholders.length; i++) {
      if (inflectionPlaceholders.at(i).text() === l10n.messages.PLACEHOLDER_INFLECT_UNAVAILABLE) {
        expect(inflectionPlaceholders.at(i).element.style.display).toEqual('none')
      } else if (inflectionPlaceholders.at(i).text() === l10n.messages.PLACEHOLDER_INFLECT) {
        expect(inflectionPlaceholders.at(i).element.style.display).not.toEqual('none')
      }
    }

    expect(inflectionsBlock.find('.alpheios-inflections__content').element.style.display).toEqual('none')

    cmp.vm.data.inflectionComponentData.enabled = false

    await Vue.nextTick()

    expect(inflectionsBlock.vm.isEnabled).toBeFalsy()
    expect(inflectionsBlock.vm.isContentAvailable).toBeFalsy()

    for (let i = 0; i < inflectionPlaceholders.length; i++) {
      if (inflectionPlaceholders.at(i).text() === l10n.messages.PLACEHOLDER_INFLECT_UNAVAILABLE) {
        expect(inflectionPlaceholders.at(i).element.style.display).not.toEqual('none')
      } else if (inflectionPlaceholders.at(i).text() === l10n.messages.PLACEHOLDER_INFLECT) {
        expect(inflectionPlaceholders.at(i).element.style.display).toEqual('none')
      }
    }

    expect(inflectionsBlock.find('.alpheios-inflections__content').element.style.display).toEqual('none')
  })

  it('8 Panel - active inflections tab - has data', () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)
    // let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)

    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: true,
            info: false,
            options: false,
            status: false,
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          inflectionComponentData: {
            languageName: 'Latin',
            inflectionData: {},
            enabled: true
          },
          settings: options.items
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__inflections').element.style.display).not.toEqual('none')
    let inflectionsBlock = cmp.find('.alpheios-panel__tab__inflections').find(Inflections)

    let inflectionPlaceholders = inflectionsBlock.findAll('.alpheios-inflections__placeholder')

    for (let i = 0; i < inflectionPlaceholders.length; i++) {
      expect(inflectionPlaceholders.at(i).element.style.display).toEqual('none')
    }
    expect(inflectionsBlock.find('.alpheios-inflections__content').element.style.display).not.toEqual('none')
  })

  it('9 Panel - active options tab', async () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)
    let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
    let uiOptions = new Options(UIOptionDefaults, LocalStorageArea)

    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: resourceOptions.items,
          tabs: {
            definitions: false,
            inflections: false,
            info: false,
            options: true,
            status: false,
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          inflectionComponentData: {
            languageName: 'Latin',
            inflectionData: {},
            enabled: true
          },
          settings: options.items,
          uiOptions: uiOptions
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__options').element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-panel__tab__options').find(ReskinFontColor).exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__tab__options').find(Setting).exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__tab__options').findAll(Setting).length).not.toBeLessThan(8)

    let testSettings = cmp.find('.alpheios-panel__tab__options').findAll(Setting)
    let i1 = 0
    let i2 = 0
    for (let i = 0; i < testSettings.length; i++) {
      let testSetting = testSettings.at(i)

      if (testSetting.hasClass('alpheios-panel__options-settings-preferredLanguage') ||
          testSetting.hasClass('alpheios-panel__options-settings-panelPosition') ||
          testSetting.hasClass('alpheios-panel__options-settings-popupPosition') ||
          testSetting.hasClass('alpheios-panel__options-settings-uiType') ||
          testSetting.hasClass('alpheios-panel__options-settings-verboseMode')
      ) {
        testSetting.vm.$emit('change', `fooname${i1}`, `foovalue${i1}`)

        await Vue.nextTick()

        expect(cmp.emitted()['settingchange']).toBeTruthy()
        expect(cmp.emitted()['settingchange'][i1]).toEqual([`fooname${i1}`, `foovalue${i1}`])
        i1++
      } else if (testSetting.hasClass('alpheios-panel__options-uiOptions-skin') ||
          testSetting.hasClass('alpheios-panel__options-uiOptions-popup')) {
        testSetting.vm.$emit('change', `fooname${i2}`, `foovalue${i2}`)

        await Vue.nextTick()

        expect(cmp.emitted()['ui-option-change']).toBeTruthy()
        expect(cmp.emitted()['ui-option-change'][i2]).toEqual([`fooname${i2}`, `foovalue${i2}`])
        i2++
      } else if (testSetting.hasClass('alpheios-panel__options-resourceSettings-lexicons')) {
        testSetting.vm.$emit('change', `fooname`, `foovalue`)

        await Vue.nextTick()

        expect(cmp.emitted()['resourcesettingchange']).toBeTruthy()
        expect(cmp.emitted()['resourcesettingchange'][0]).toEqual([`fooname`, `foovalue`])
      }
    }
  })

  it('10 Panel - active status tab', async () => {
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: false,
            options: false,
            status: true,
            treebank: false,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          messages: ['Foo message 1', 'Foo message 2']
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__status').element.style.display).not.toEqual('none')
    expect(cmp.find('.alpheios-panel__tab__status').findAll('.alpheios-panel__message').length).toEqual(2)
    expect(cmp.find('.alpheios-panel__tab__status').findAll('.alpheios-panel__message').at(0).text()).toEqual('Foo message 1')
    expect(cmp.find('.alpheios-panel__tab__status').findAll('.alpheios-panel__message').at(1).text()).toEqual('Foo message 2')
  })

  it('11 Panel - active treebank tab (no data)', async () => {
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: false,
            options: false,
            status: false,
            treebank: true,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {}
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__treebank').element.style.display).not.toEqual('none')
    expect(cmp.vm.treebankTabVisible).toBeTruthy()
    expect(cmp.find(Treebank).exists()).toBeFalsy()
  })

  it('12 Panel - active treebank tab (has data)', async () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: false,
            options: false,
            status: false,
            treebank: true,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          treebankComponentData: {
            visible: false,
            data: {
              word: {
                src: 'http://example.org/tb/SENTENCE/WORD',
                ref: '1-2'
              }
            }
          },
          settings: options.items
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__treebank').element.style.display).not.toEqual('none')
    expect(cmp.vm.treebankTabVisible).toBeTruthy()

    let treebankC = cmp.find(Treebank)
    expect(treebankC.exists()).toBeTruthy()
    expect(treebankC.find('iframe').exists()).toBeTruthy()

    expect(treebankC.vm.visible).toBeTruthy()
    expect(treebankC.vm.srcUrl).toEqual('')

    treebankC.vm.visible = false
    treebankC.vm.visible = true

    expect(treebankC.vm.srcUrl).toEqual('http://example.org/tb/1/2')

    cmp.vm.data.treebankComponentData.data.word.ref = '10-20'
    treebankC.vm.visible = false
    treebankC.vm.visible = true

    expect(treebankC.vm.srcUrl).toEqual('http://example.org/tb/10/20')

    cmp.vm.data.treebankComponentData.data.word.ref = undefined
    cmp.vm.data.treebankComponentData.data.page = { src: 'http://example.org/tb/100/200' }

    treebankC.vm.visible = false
    treebankC.vm.visible = true

    expect(treebankC.vm.srcUrl).toEqual('http://example.org/tb/100/200')
  })

  it('13 Panel - active grammar tab (has data)', async () => {
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: false,
            options: false,
            status: false,
            treebank: false,
            grammar: true
          },
          l10n: l10n,
          grammarRes: {
            url: 'http://example.org/',
            provider: []
          }
        }
      }
    })

    expect(cmp.find('.alpheios-panel__tab__grammar').element.style.display).not.toEqual('none')

    let grammarC = cmp.find(Grammar)
    expect(grammarC.exists()).toBeTruthy()
    expect(grammarC.find('iframe')).toBeTruthy()
    expect(grammarC.vm.res.url).toEqual('http://example.org/')

    expect(grammarC.find('.alpheios-grammar__provider').exists()).toBeTruthy()
    expect(grammarC.find('.alpheios-grammar__provider').text()).toEqual('')

    cmp.vm.data.grammarRes.provider = ['someFooProvider']

    expect(grammarC.find('.alpheios-grammar__provider').text()).toEqual('someFooProvider')
  })

  it('13 Panel - notifications part (no data)', () => {
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: false,
            options: false,
            status: false,
            treebank: true,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {}
        }
      }
    })

    expect(cmp.find('.alpheios-panel__notifications').exists()).toBeFalsy()
  })

  it('13 Panel - notifications part (has data)', async () => {
    let options = new Options(ContentOptionDefaults, LocalStorageArea)
    let cmp = mount(Panel, {
      propsData: {
        data: {
          resourceSettings: {},
          tabs: {
            definitions: false,
            inflections: false,
            info: false,
            options: false,
            status: false,
            treebank: true,
            grammar: false
          },
          l10n: l10n,
          grammarRes: {},
          notification: {
            important: false,
            text: 'Some foo text',
            showLanguageSwitcher: false
          },
          settings: options.items
        }
      }
    })
    expect(cmp.find('.alpheios-panel__notifications').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__notifications').element.style.display).toEqual('none')

    expect(cmp.find('.alpheios-panel__notifications').find('.alpheios-panel__notifications-close-btn').exists()).toBeTruthy()
    expect(cmp.find('.alpheios-panel__notifications').find(Setting)).toBeTruthy()

    cmp.vm.data.notification.important = true

    expect(cmp.find('.alpheios-panel__notifications').element.style.display).not.toEqual('none')

    cmp.find('.alpheios-panel__notifications').find('.alpheios-panel__notifications-close-btn').trigger('click')

    await Vue.nextTick()
    expect(cmp.emitted()['closenotifications']).toBeTruthy()

    expect(cmp.find('.alpheios-panel__notifications').find('.alpheios-panel__notifications-text').text()).toEqual('Some foo text')

    expect(cmp.find('.alpheios-panel__notifications').find(Setting).element.style.display).toEqual('none')

    cmp.vm.data.notification.showLanguageSwitcher = true

    expect(cmp.find('.alpheios-panel__notifications').find(Setting).element.style.display).not.toEqual('none')

    expect(cmp.find('.alpheios-panel__notifications').find(Setting).vm.showTitle).toBeFalsy()
    expect(cmp.find('.alpheios-panel__notifications').find(Setting).find('label').element.style.display).toEqual('none')
  })
})
