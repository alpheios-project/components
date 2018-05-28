/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Popup from '@/vue-components/popup.vue'
import Tooltip from '@/vue-components/tooltip.vue'

import Lookup from '@/vue-components/lookup.vue'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import ContentOptionDefaults from '@/settings/content-options-defaults.json'
import LocalStorageArea from '@/lib/options/local-storage-area.js'

let l10n = new L10n()
  .addMessages(enUS, Locales.en_US)
  .addMessages(enGB, Locales.en_GB)
  .setLocale(Locales.en_US)

let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
let options = new Options(ContentOptionDefaults, LocalStorageArea)

describe('popup.test.js', () => {
  let propsEmpty = {
    classesChanged: 1,
    data: {
      classes: ['auk--default', 'alpheios-font_medium_class', 'alpheios-color_schema_light_class'],
      currentLanguage: 'lat',
      defDataReady: false,
      draggable: true,
      fixedElementsHeight: 120,
      fixedPosition: true,
      hasTreebank: false,
      heightMax: 400,
      heightMin: 150,
      inflDataReady: false,
      l10n: l10n,
      left: '10vw',
      morphDataReady: false,
      notification: {
        important: false,
        showLanguageSwitcher: false,
        text: '',
        visible: true
      },
      placementMargin: 15,
      providers: [],
      requestStartTime: 1526774226846,
      resizable: true,
      resourceSettings: resourceOptions,
      settings: options,
      showProviders: false,
      status: {
        languageName: 'Latin',
        selectedText: 'mala'
      },
      targetRect: { top: 0, left: 0 },
      top: '10vh',
      translationsDataReady: false,
      updates: 0,
      verboseMode: false,
      viewportMargin: 5,
      width: 210
    },
    definitions: {},
    lexemes: [],
    linkedfeatures: [ 'part of speech', 'case', 'mood', 'declension', 'tense' ],
    messages: [],
    translations: {},
    visible: true
  }

  let defaultStubs = {
    'Lookup': '<div class="lookup" />',
    'CloseIcon': '<div class="closeicon" />',
    'Setting': '<div class="setting" />'
  }

  let defComputed = {
    logger: function () {
      return {
        log: function (str) { }
      }
    }
  }

  let checkTooltipData = {
    'Diagram': {
      tooltipText: 'TOOLTIP_TREEBANK',
      buttonLabel: 'LABEL_POPUP_TREEBANK',
      tabName: 'treebank'
    },
    'Inflect': {
      tooltipText: 'TOOLTIP_SHOW_INFLECTIONS',
      buttonLabel: 'LABEL_POPUP_INFLECT',
      tabName: 'inflections'
    },
    'Define': {
      tooltipText: 'TOOLTIP_SHOW_DEFINITIONS',
      buttonLabel: 'LABEL_POPUP_DEFINE',
      tabName: 'definitions'
    },
    'Options': {
      tooltipText: 'TOOLTIP_SHOW_OPTIONS',
      buttonLabel: 'LABEL_POPUP_OPTIONS',
      tabName: 'options'
    }
  }

  it('1 Popup - has a buttons group - alpheios-popup__button-area', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.find('.alpheios-popup__button-area').exists()).toBeTruthy()
  })

  it('2 Popup - A popup\'s header buttons group contains 4 buttons - alpheios-popup__more-btn', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.find('.alpheios-popup__button-area').findAll('.alpheios-popup__more-btn').length).toEqual(4)
  })

  it('3 Popup - A popup\'s header buttons group contains 4 buttons - Diagram, Inflect, Define, Options', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let buttonsArr = cmpEmpty.find('.alpheios-popup__button-area').findAll('.alpheios-popup__more-btn')
    let mappedText = []

    for (let i = 0; i < buttonsArr.length; i++) {
      mappedText.push(buttonsArr.at(i).text())
    }

    expect(mappedText.indexOf('Diagram')).toBeGreaterThan(-1)
    expect(mappedText.indexOf('Inflect')).toBeGreaterThan(-1)
    expect(mappedText.indexOf('Define')).toBeGreaterThan(-1)
    expect(mappedText.indexOf('Options')).toBeGreaterThan(-1)
  })

  it('4 Popup - Each button in a popup\'s header buttons group has alph-tooltip', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let tooltips = cmpEmpty.find('.alpheios-popup__more-btn').findAll(Tooltip)

    let buttonsForCheck = Object.keys(checkTooltipData)

    for (let i = 0; i < tooltips.length; i++) {
      let curTooltip = tooltips.at(i)
      let checkText = curTooltip.vm.$slots.default[0].text.replace(/\n/g, '').trim()

      if (curTooltip.vm.$slots.default[0].tag === 'button' && buttonsForCheck.indexOf(checkText) > -1) {
        let curButton = curTooltip.vm.$slots.default[0]

        expect(curTooltip.vm.tooltipText).toEqual(l10n.messages[checkTooltipData[checkText].tooltipText])
        expect(curButton.text()).toEqual(l10n.messages[checkTooltipData[checkText].buttonLabel])
      }
    }
  })

  let btnClassesArr = ['alpheios-popup__more-btn-treebank', 'alpheios-popup__more-btn-inflections', 'alpheios-popup__more-btn-definitions', 'alpheios-popup__more-btn-options']
  for (let i = 0; i < btnClassesArr.length; i++) {
    it(`${i + 5} Popup - Each button in a popup's header buttons group has click event that executes showTab for a specific tab (${btnClassesArr[i]})`, async () => {
      let cmpEmpty = mount(Popup, {
        attachToDocument: true,
        stubs: defaultStubs,
        propsData: Object.assign({}, propsEmpty),
        computed: defComputed
      })

      let curBtn = cmpEmpty.find('.alpheios-popup__button-area').find(`.${btnClassesArr[i]}`)
      let checkText = curBtn.text().replace(/\n/g, '').trim()
      curBtn.trigger('click')

      await Vue.nextTick()

      expect(cmpEmpty.emitted()['showpaneltab']).toBeTruthy()
      expect(cmpEmpty.emitted()['showpaneltab'][0]).toEqual([checkTooltipData[checkText].tabName])
    })
  }

  it('9 Popup - There are 2 events defined (in created) - updatePopupDimensions, changeStyleClass', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    jest.spyOn(cmpEmpty.vm, 'updatePopupDimensions')
    jest.spyOn(cmpEmpty.vm, 'uiOptionChanged')

    cmpEmpty.vm.$emit('updatePopupDimensions')
    cmpEmpty.vm.$emit('changeStyleClass', 'fontSize', 'medium')

    expect(cmpEmpty.vm.updatePopupDimensions).toHaveBeenCalled()
    expect(cmpEmpty.vm.uiOptionChanged).toHaveBeenCalledWith('fontSize', 'medium')
  })

  it('10 Popup - if popup invisible then positionLeftDm === 0px', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.visible = false

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    Vue.nextTick(function () {
      expect(cmpEmpty.vm.positionLeftDm).toEqual('0px')
    })
  })

  it('11 Popup - if popup visible then positionLeftDm > 0', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.visible = true

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })
    let pos = Number.parseInt(cmpEmpty.vm.positionLeftDm.replace('px', ''))
    expect(pos).toBeGreaterThan(0)
  })

  it('12 Popup - if popup invisible then positionTopDm === 0px', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.visible = false

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    expect(cmpEmpty.vm.positionTopDm).toEqual('0px')
  })

  it('13 Popup - if popup visible then positionTopDm > 0', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.visible = true

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })
    let pos = Number.parseInt(cmpEmpty.vm.positionTopDm.replace('px', ''))
    expect(pos).toBeGreaterThan(0)
  })

  it('14 Popup - if widthValue is a Number then widthDm = widthValue + px', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.widthValue = 500
    expect(cmpEmpty.vm.widthDm).toEqual(cmpEmpty.vm.widthValue + 'px')
  })

  it('15 Popup - if widthValue === auto then widthDm = auto', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.widthValue = 'auto'
    expect(cmpEmpty.vm.widthDm).toEqual('auto')
  })

  it('16 Popup - if heightValue is a Number then heightDm = widthValue + px', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.heightValue = 500
    expect(cmpEmpty.vm.heightDm).toEqual(cmpEmpty.vm.heightValue + 'px')
  })

  it('17 Popup - if heightValue === auto then widthDm = auto', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.heightValue = 'auto'
    expect(cmpEmpty.vm.heightDm).toEqual('auto')
  })

  it('18 Popup - Popup has computed property additionalStylesTootipCloseIcon that is a function and has top and left object props if executed', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    expect(typeof cmpEmpty.vm.additionalStylesTootipCloseIcon).toEqual('object')
    expect(cmpEmpty.vm.additionalStylesTootipCloseIcon.top).toMatch('px')
    expect(cmpEmpty.vm.additionalStylesTootipCloseIcon.right).toMatch('px')
  })

  it('19 Popup - If a method clearMessages executes then a message array is cleared', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.messages = ['foo', 'bar']

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    cmpEmpty.vm.clearMessages()
    expect(cmpEmpty.vm.messages.length).toEqual(0)
  })

  it('20 Popup - If a method closePopup executes then a close event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.closePopup()
    expect(cmpEmpty.emitted()['close']).toBeTruthy()
  })

  it('21 Popup - If a method closeNotifications executes then a closepopupnotifications event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.closeNotifications()
    expect(cmpEmpty.emitted()['closepopupnotifications']).toBeTruthy()
  })

  it('22 Popup - If a method settingChanged executes then a settingchange event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.settingChanged('fooname', 'foovalue')

    expect(cmpEmpty.emitted()['settingchange']).toBeTruthy()
    expect(cmpEmpty.emitted()['settingchange'][0]).toEqual(['fooname', 'foovalue'])
  })

  it('23 Popup - If a method switchProviders executes then showProviders = ! showProviders', async () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.data.showProviders = false
    cmpEmpty.vm.switchProviders()

    await Vue.nextTick()
    expect(cmpEmpty.vm.data.showProviders).toBeTruthy()
    expect(cmpEmpty.find('.alpheios-popup__morph-cont-providers').exists()).toBeTruthy()

    cmpEmpty.vm.switchProviders()

    await Vue.nextTick()
    expect(cmpEmpty.vm.data.showProviders).toBeFalsy()
    expect(cmpEmpty.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()
  })

  it('25 Popup - Popup has resizableSettings method and returns an object with attributes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let resSet = cmpEmpty.vm.resizableSettings()

    expect(resSet.preserveAspectRatio).toBeDefined()
    expect(resSet.edges.top).toBeDefined()
    expect(resSet.edges.left).toBeDefined()
    expect(resSet.edges.bottom).toBeDefined()
    expect(resSet.edges.right).toBeDefined()
    expect(resSet.restrictSize.min.width).toBeDefined()
    expect(resSet.restrictSize.min.height).toBeDefined()
    expect(resSet.restrictEdges.outer).toBeDefined()
    expect(resSet.restrictEdges.endOnly).toBeDefined()
  })

  it('26 Popup - Popup has draggableSettings method and returns an object with attributes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let dragSet = cmpEmpty.vm.draggableSettings()

    expect(dragSet.inertia).toBeDefined()
    expect(dragSet.autoScroll).toBeDefined()
    expect(dragSet.restrict.restriction).toBeDefined()
    expect(dragSet.restrict.elementRect.top).toBeDefined()
    expect(dragSet.restrict.elementRect.left).toBeDefined()
    expect(dragSet.restrict.elementRect.bottom).toBeDefined()
    expect(dragSet.restrict.elementRect.right).toBeDefined()
    expect(dragSet.ignoreFrom).toBeDefined()
    expect(dragSet.onmove).toBeDefined()

    expect(dragSet.onmove).toEqual(cmpEmpty.vm.dragMoveListener)
  })

  it('27 Popup - Popup has interactInstance with defined events ondragmove and resizemove', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    expect(cmpEmpty.vm.interactInstance.events.ondragmove).toEqual(cmpEmpty.vm.dragMoveListener)
    expect(cmpEmpty.vm.interactInstance.events.resizemove[0]).toEqual(cmpEmpty.vm.resizeListener)
  })

  it('28 Popup - If Popup has draggable and resizable = false on mounted than interactInstance is undefined and settings are not calculated', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.resizable = false
    curProps.data.draggable = false

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    expect(cmpEmpty.vm.interactInstance).toBeUndefined()
  })

  it('29 Popup - If a method resetPopupDimensions executes then resizeCount, widthValue, heightValue, exactWidth, exactHeight become zero', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.setData({
      resizeCount: 10,
      widthValue: 10,
      heightValue: 10,
      exactWidth: 10,
      exactHeight: 10
    })

    cmpEmpty.vm.resetPopupDimensions()
    expect(cmpEmpty.vm.resizeCount).toEqual(0)
    expect(cmpEmpty.vm.widthValue).toEqual(0)
    expect(cmpEmpty.vm.heightValue).toEqual(0)
    expect(cmpEmpty.vm.exactWidth).toEqual(0)
    expect(cmpEmpty.vm.exactHeight).toEqual(0)
  })

  it('30 Popup - If a method sendFeature executes then a sendfeature event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.sendFeature({testdata: 'testdata'})
    expect(cmpEmpty.emitted()['sendfeature']).toBeTruthy()
    expect(cmpEmpty.emitted()['sendfeature'][0]).toEqual([{testdata: 'testdata'}])
  })

  it('31 Popup - if change visible === true then updatePopupDimensions executes', (done) => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let spy = jest.spyOn(cmpEmpty.vm, 'updatePopupDimensions')
    cmpEmpty.setProps({ visible: false })
    cmpEmpty.setProps({ visible: true })

    Vue.nextTick(function () {
      expect(spy).toBeCalled()
      spy.mockReset()
      done()
    })
  })

  it('32 Popup - if change visible === false then resetPopupDimensions executes', (done) => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let spy = jest.spyOn(cmpEmpty.vm, 'resetPopupDimensions')
    cmpEmpty.setProps({ visible: true })
    cmpEmpty.setProps({ visible: false })

    Vue.nextTick(function () {
      expect(spy).toBeCalled()
      spy.mockReset()
      done()
    })
  })

  it('33 Popup - If a requestStartTime changes then resetPopupDimensions and logger.log execute', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.data.settings.popupPosition = { currentValue: 0 }
    let spy = jest.spyOn(cmpEmpty.vm, 'resetPopupDimensions')
    let spyLog = jest.spyOn(cmpEmpty.vm.logger, 'log')

    cmpEmpty.vm.data.requestStartTime = 1526774226900
    expect(spy).toBeCalled()
    expect(spyLog).toBeCalled()
    spy.mockReset()
  })

  it('34 Popup - If a translationsDataReady changes then logger.log execute', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.data.settings.popupPosition = { currentValue: 0 }

    let spyLog = jest.spyOn(cmpEmpty.vm.logger, 'log')

    cmpEmpty.vm.data.translationsDataReady = true
    expect(spyLog).toBeCalled()
    spyLog.mockReset()
  })

  it('35 Popup - If a classesChanged changes then divClass equals data.classes.join(\' \')', (done) => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let testClassArray = ['test-foo-class', 'test-bar-class']
    cmpEmpty.vm.data.classes = testClassArray
    cmpEmpty.setProps({ classesChanged: 2 })

    Vue.nextTick(function () {
      expect(cmpEmpty.vm.divClasses).toEqual(testClassArray.join(' '))
      done()
    })
  })

  it('36 Popup - if resizable = true then resizeListener - sets width, height, data-x, data-y attribute and webkitTransform property', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.resizable = true

    cmpEmpty.vm.$el.setAttribute('data-x', '10')
    cmpEmpty.vm.$el.setAttribute('data-y', '10')

    let event = {
      target: cmpEmpty.vm.$el,
      dx: 10,
      dy: 10,
      rect: { width: 300, height: 300 },
      deltaRect: { left: 0, top: 0 }
    }

    cmpEmpty.vm.resizeListener(event)

    expect(cmpEmpty.vm.$el.style.webkitTransform).toEqual('translate(10px, 10px)')
    expect(cmpEmpty.vm.$el.style.transform).toEqual('translate(10px, 10px)')

    expect(cmpEmpty.vm.$el.style.width).toEqual('300px')
    expect(cmpEmpty.vm.$el.style.height).toEqual('300px')

    expect(cmpEmpty.vm.$el.getAttribute('data-x')).toEqual('10')
    expect(cmpEmpty.vm.$el.getAttribute('data-y')).toEqual('10')
  })

  it('37 Popup - if resizable = true then width, height, webkitTransform property are not defined', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.resizable = false

    cmpEmpty.vm.$el.setAttribute('data-x', '10')
    cmpEmpty.vm.$el.setAttribute('data-y', '10')

    let event = {
      target: cmpEmpty.vm.$el,
      dx: 10,
      dy: 10,
      rect: { width: 300, height: 300 },
      deltaRect: { left: 0, top: 0 }
    }

    cmpEmpty.vm.resizeListener(event)

    expect(cmpEmpty.vm.$el.style.webkitTransform).toEqual('')
    expect(cmpEmpty.vm.$el.style.transform).toBeUndefined()

    expect(cmpEmpty.vm.$el.style.width).toEqual('0px')
    expect(cmpEmpty.vm.$el.style.height).toEqual('0px')
  })

  it('38 Popup - If draggable = true then dragMoveListener - sets data-x, data-y attribute and webkitTransform property', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.draggable = true

    cmpEmpty.vm.$el.setAttribute('data-x', '10')
    cmpEmpty.vm.$el.setAttribute('data-y', '10')
    let event = {
      target: cmpEmpty.vm.$el,
      dx: 10,
      dy: 10
    }
    cmpEmpty.vm.dragMoveListener(event)
    expect(cmpEmpty.vm.$el.style.webkitTransform).toEqual('translate(20px, 20px)')
    expect(cmpEmpty.vm.$el.getAttribute('data-x')).toEqual('20')
    expect(cmpEmpty.vm.$el.getAttribute('data-y')).toEqual('20')
  })

  it('39 Popup - If draggable = false then dragMoveListener - webkitTransform property stays undefined', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.draggable = false

    cmpEmpty.vm.$el.setAttribute('data-x', '10')
    cmpEmpty.vm.$el.setAttribute('data-y', '10')
    let event = {
      target: cmpEmpty.vm.$el,
      dx: 10,
      dy: 10
    }
    cmpEmpty.vm.dragMoveListener(event)
    expect(cmpEmpty.vm.$el.style.webkitTransform).toEqual('')
  })

  it('40 Popup - If !morphDataReady && !noLanguage then there is .alpheios-popup__definitions--placeholder with text PLACEHOLDER_POPUP_DATA is visible', async () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.morphDataReady = false
    curProps.data.currentLanguageName = 'lat'

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    await Vue.nextTick()

    expect(cmpEmpty.vm.morphDataReady).toBeFalsy()
    expect(cmpEmpty.vm.noLanguage).toBeFalsy()

    let placeholders = cmpEmpty.findAll('.alpheios-popup__definitions--placeholder')
    let flagPlaceholder = 0

    for (let i = 0; i < placeholders.length; i++) {
      if (placeholders.at(i).text() === l10n.messages.PLACEHOLDER_POPUP_DATA) {
        expect(placeholders.at(i).isVisible()).toBeTruthy()
        flagPlaceholder += 1
      } else {
        expect(placeholders.at(i).isVisible()).toBeFalsy()
      }
    }

    expect(cmpEmpty.find('.alpheios-popup__morph-cont-ready').isVisible()).toBeFalsy()
    expect(flagPlaceholder).toEqual(1)
  })

  it('41 Popup - If noLanguage && !morphDataReady then there is .alpheios-popup__definitions--placeholder with text PLACEHOLDER_NO_LANGUAGE_POPUP_DATA is visible', async () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.morphDataReady = false
    curProps.data.currentLanguageName = undefined

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    await Vue.nextTick()

    expect(cmpEmpty.vm.morphDataReady).toBeFalsy()
    expect(cmpEmpty.vm.noLanguage).toBeTruthy()

    let placeholders = cmpEmpty.findAll('.alpheios-popup__definitions--placeholder')
    let flagPlaceholder = 0

    for (let i = 0; i < placeholders.length; i++) {
      if (placeholders.at(i).text() === l10n.messages.PLACEHOLDER_NO_LANGUAGE_POPUP_DATA) {
        expect(placeholders.at(i).isVisible()).toBeTruthy()
        flagPlaceholder += 1
      } else {
        expect(placeholders.at(i).isVisible()).toBeFalsy()
      }
    }

    expect(flagPlaceholder).toEqual(1)
    expect(cmpEmpty.find('.alpheios-popup__morph-cont-ready').isVisible()).toBeFalsy()
  })

  it('42 Popup - If morphDataReady then all .alpheios-popup__definitions--placeholder are invisible, alpheios-popup__morph-cont-ready - is visible ', async () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.morphDataReady = true
    curProps.data.currentLanguageName = 'lat'

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    await Vue.nextTick()

    expect(cmpEmpty.vm.morphDataReady).toBeTruthy()
    expect(cmpEmpty.vm.noLanguage).toBeFalsy()

    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').isVisible()).toBeFalsy()
    expect(cmpEmpty.find('.alpheios-popup__morph-cont-ready').isVisible()).toBeTruthy()
  })
})
