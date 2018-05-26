/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Panel from '@/vue-components/panel.vue'
import Tooltip from '@/vue-components/tooltip.vue'
import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

import Options from '@/lib/options/options.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import LocalStorageArea from '@/lib/options/local-storage-area.js'

describe('panel.test.js', () => {
  let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
  let options = new Options(ContentOptionDefaults, LocalStorageArea)

  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let panelDataProps = {
    classes: [],
    fullDefinition: '',
    grammaRes: {
      url: 'grammResUrl.test'
    },
    inflectionComponentData: {
      enabled: true,
      inflextionData: false,
      visible: false
    },
    inflectionIDs: {
      localeSwitcher: '',
      tableBody: '',
      viewSelector: ''
    },
    inflections: {
      localeSwitcher: null,
      tableBody: null,
      viewSelector: null
    },
    infoComponentData: {
      languageName: 'Latin',
      manifest: {
        name: '',
        version: ''
      }
    },
    isOpen: false,
    l10n: l10n,
    lexemes: [],
    messages: [],
    minWidth: 400,
    notification: {
      important: false,
      showLanguageSwitcher: false,
      text: '',
      visible: false
    },
    resourceSettings: resourceOptions,
    settings: options,
    shortDefinitions: [],
    status: {
      languageName: '',
      selectedText: ''
    },
    styles: {
      zIndex: 2000
    },
    tabs: {
      definitions: false,
      inflections: false,
      info: true,
      options: false,
      status: false,
      treebank: false
    },
    treebankComponentData: {},
    uiOptions: { items: {} },
    verboseMode: false
  }

  let defaultStubs = ['grammar', 'lookup', 'setting', 'close-icon', 'attach-left-icon', 'attach-right-icon', 'definitions-icon', 'inflections-icon', 'status-icon', 'options-icon', 'grammar-icon', 'treebank-icon', '', 'reskin-font-color']

  let defComputed = {
    uiController: function () {
      return { }
    }
  }

  let checkTooltipData = {
    'Help': {
      tooltipText: 'TOOLTIP_HELP',
      tabName: 'info'
    },
    'Definitions': {
      tooltipText: 'TOOLTIP_DEFINITIONS',
      tabName: 'definitions'
    },
    'Inflection Tables': {
      tooltipText: 'TOOLTIP_INFLECT',
      tabName: 'inflections'
    },
    'Grammar': {
      tooltipText: 'TOOLTIP_GRAMMAR',
      tabName: 'grammar'
    },
    'Diagram': {
      tooltipText: 'TOOLTIP_TREEBANK',
      tabName: 'treebank'
    },
    'Options': {
      tooltipText: 'TOOLTIP_OPTIONS',
      tabName: 'options'
    },
    'Status Messages': {
      tooltipText: 'TOOLTIP_STATUS',
      tabName: 'status'
    }
  }

  it('1 Panel - has a header panel with buttons - alpheios-panel__header-btn-group--center', () => {
    let cmpEmpty = mount(Panel, {
      attachToDocument: true,
      propsData: { data: Object.assign({}, panelDataProps) },
      stubs: defaultStubs,
      computed: defComputed
    })
    expect(cmpEmpty.find('.alpheios-panel__header-btn-group--center').exists()).toBeTruthy()
  })

  it('2 Panel - alpheios-panel__header-btn-group--center has buttons', () => {
    let cmpEmpty = mount(Panel, {
      attachToDocument: true,
      propsData: { data: Object.assign({}, panelDataProps) },
      stubs: defaultStubs,
      computed: defComputed
    })

    let tooltips = cmpEmpty.find('.alpheios-panel__header-btn-group--center').findAll(Tooltip)
    let buttonsForCheck = Object.keys(checkTooltipData)

    for (let i = 0; i < tooltips.length; i++) {
      let curTooltip = tooltips.at(i)
      let checkText = curTooltip.vm.tooltipText

      if (curTooltip.vm.$slots.default[0].tag === 'span' && buttonsForCheck.indexOf(checkText) > -1) {
        let curSpan = curTooltip.vm.$slots.default[0]

        expect(curTooltip.vm.tooltipText).toEqual(l10n.messages[checkTooltipData[checkText].tooltipText])
      }
    }
  })

  let btnClassesArr = ['alpheios-panel__header-nav-btn-info', 'alpheios-panel__header-nav-btn-definitions', 'alpheios-panel__header-nav-btn-inflections', 'alpheios-panel__header-nav-btn-grammar', 'alpheios-panel__header-nav-btn-treebank', 'alpheios-panel__header-nav-btn-options', 'alpheios-panel__header-nav-btn-status']
  for (let i = 0; i < btnClassesArr.length; i++) {
    it(`${i + 3} Popup - Each button in a popup's header buttons group has click event that executes showTab for a specific tab (${btnClassesArr[i]})`, async () => {
      let cmpEmpty = mount(Panel, {
        attachToDocument: true,
        propsData: { data: Object.assign({}, panelDataProps) },
        stubs: defaultStubs,
        computed: defComputed
      })

      let curBtn = cmpEmpty.find('.alpheios-panel__header-btn-group--center').find(`.${btnClassesArr[i]}`)
      let checkText = curBtn.vnode.elm.nextSibling.nextSibling.textContent.replace(/\n/g, '').trim().replace('undefined', '')
      curBtn.trigger('click')

      await Vue.nextTick()

      expect(cmpEmpty.emitted()['changetab']).toBeTruthy()
      expect(cmpEmpty.emitted()['changetab'][0]).toEqual([checkTooltipData[checkText].tabName])
    })
  }
})
