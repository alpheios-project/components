/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Popup from '../../src/vue-components/popup.vue'
import Lookup from '../../src/vue-components/lookup.vue'
import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

import L10n from '../../src/lib/l10n/l10n'
import Locales from '../../src/locales/locales'
import enUS from '../../src/locales/en-us/messages.json'
import enGB from '../../src/locales/en-gb/messages.json'

import Options from '../../src/lib/options/options.js'
import LanguageOptionDefaults from '../../src/settings/language-options-defaults.json'
import ContentOptionDefaults from '../../src/settings/content-options-defaults.json'
import LocalStorageArea from '../../src/lib/options/local-storage-area.js'

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
    'CloseIcon': '<div class="closeicon" />'
  }

  let defComputed = {
    logger: function () {
      return {
        log: function (str) { }
      }
    }
  }

  it('A popup component has buton group - alpheios-popup__button-area', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.find('.alpheios-popup__button-area').exists()).toBeTruthy()
  })

  it('A popup\'s header buton group contains 4 buttons - alpheios-popup__more-btn', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.find('.alpheios-popup__button-area').findAll('.alpheios-popup__more-btn').length).toEqual(4)
  })

  it('In empty popup the first button is Treebank - LABEL_POPUP_TREEBANK and it is invisible', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(0).isVisible()).toBeFalsy()
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(0).text()).toEqual(l10n.messages.LABEL_POPUP_TREEBANK)
  })

  it('In empty popup the second button is INFLECTIONS - LABEL_POPUP_INFLECT and it is invisible', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(1).isVisible()).toBeFalsy()
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(1).text()).toEqual(l10n.messages.LABEL_POPUP_INFLECT)
  })

  it('In empty popup the third button is DEFINITIONS - LABEL_POPUP_DEFINE and it is invisible', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(2).isVisible()).toBeFalsy()
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(2).text()).toEqual(l10n.messages.LABEL_POPUP_DEFINE)
  })

  it('In empty popup the fourth button is OPTIONS - LABEL_POPUP_OPTIONS and it is visible', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(3).isVisible()).toBeTruthy()
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(3).text()).toEqual(l10n.messages.LABEL_POPUP_OPTIONS)
  })

  it('In empty popup (morphDataReady === false and noLanguage === false) -  only the first alpheios-popup__definitions--placeholder is shown with PLACEHOLDER_POPUP_DATA', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(0).isVisible()).toBeTruthy()
    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(1).isVisible()).toBeFalsy()

    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(0).text()).toEqual(l10n.messages.PLACEHOLDER_POPUP_DATA)
  })

  it('If morphDataReady === false and noLanguage === true -  only the second alpheios-popup__definitions--placeholder is shown with PLACEHOLDER_POPUP_DATA', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.currentLanguage = undefined

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(0).isVisible()).toBeFalsy()
    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(1).isVisible()).toBeTruthy()

    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(1).text()).toEqual(l10n.messages.PLACEHOLDER_NO_LANGUAGE_POPUP_DATA)
  })

  it('If morphDataReady === true then the alpheios-popup__morph-cont-ready is shown', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.morphDataReady = true

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    Vue.nextTick(function () {
      expect(cmpEmpty.find('.alpheios-popup__morph-cont-ready').isVisible()).toBeTruthy()
      cmpEmpty.vm.data.morphDataReady = false
    })
  })

  it('If data.notification.important = false then alpheios-popup__notifications is invisible', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.find('.alpheios-popup__notifications').element.style.display).toEqual('none')
  })

  it('If data.notification.important = true then alpheios-popup__notifications is shown', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.notification.important = true

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    expect(cmpEmpty.find('.alpheios-popup__notifications').isVisible()).toBeTruthy()
  })

  it('If click on Credits link - different labels on credit lik on click', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let creditLink = cmpEmpty.find('.alpheios-popup__providers-link')

    expect(cmpEmpty.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_SHOWCREDITS)

    creditLink.trigger('click')

    expect(cmpEmpty.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_HIDECREDITS)
  })

  it('If data.notification.important = true then  alpheios-popup__notifications has class alpheios-popup__notifications--important', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.notification.important = true

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })
    expect(cmpEmpty.vm.notificationClasses['alpheios-popup__notifications--important']).toBeTruthy()

    Vue.nextTick(function () {
      expect(cmpEmpty.find('.alpheios-popup__notifications').classes()).toContain('alpheios-popup__notifications--important')
    })
  })

  it('If data.notification.important = false then  alpheios-popup__notifications doesn\'t have class alpheios-popup__notifications--important', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.notification.important = false

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })
    expect(cmpEmpty.vm.notificationClasses['alpheios-popup__notifications--important']).toBeFalsy()

    Vue.nextTick(function () {
      expect(cmpEmpty.find('.alpheios-popup__notifications').classes()).not.toContain('alpheios-popup__notifications--important')
    })
  })

  it('if popup invisible then positionLeftDm === 0px', () => {
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

  it('if popup visible then positionLeftDm > 0', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let pos = Number.parseInt(cmpEmpty.vm.positionLeftDm.replace('px', ''))
    expect(pos).toBeGreaterThan(0)
  })

  it('if popup invisible then positionTopDm === 0px', () => {
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

  it('if popup visible then positionTopDm > 0', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let pos = Number.parseInt(cmpEmpty.vm.positionTopDm.replace('px', ''))
    expect(pos).toBeGreaterThan(0)
  })

  it('if data.showProviders === false than alpheios-popup__morph-cont-providers - invisible', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.showProviders = false

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })
    expect(cmpEmpty.vm.showProviders).toBeFalsy()

    expect(cmpEmpty.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()
  })

  it('if data.showProviders === true than alpheios-popup__morph-cont-providers - visible', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.showProviders = true

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })
    expect(cmpEmpty.vm.showProviders).toBeTruthy()

    expect(cmpEmpty.find('.alpheios-popup__morph-cont-providers').exists()).toBeTruthy()
  })

  it('if widthValue is a Number then widthDm = widthValue + px', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.widthValue = 500
    expect(cmpEmpty.vm.widthDm).toEqual(cmpEmpty.vm.widthValue + 'px')
  })

  it('if widthValue === auto then widthDm = auto', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.widthValue = 'auto'
    expect(cmpEmpty.vm.widthDm).toEqual('auto')
  })

  it('if heightValue is a Number then heightDm = widthValue + px', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.heightValue = 500
    expect(cmpEmpty.vm.heightDm).toEqual(cmpEmpty.vm.heightValue + 'px')
  })

  it('if heightValue === auto then widthDm = auto', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.heightValue = 'auto'
    expect(cmpEmpty.vm.heightDm).toEqual('auto')
  })

  it('if change visible === true then updatePopupDimensions works', (done) => {
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

  it('if change visible === false then resetPopupDimensions works', (done) => {
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

  it('Popup contains Lookup component', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(cmpEmpty.find(Lookup).exists()).toBeTruthy()
  })

  it('If Popup has draggable and resizable = false on mounted than interactInstance is undefined and settings are not calculated', () => {
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

  it('If Popup has draggable and resizable = true on mounted than interactInstance is defined and settings are calculated', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.resizable = true
    curProps.data.draggable = true

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    expect(cmpEmpty.vm.interactInstance).toBeDefined()
  })

  it('Popup has resizableSettings method and contains required properties', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(typeof cmpEmpty.vm.resizableSettings).toEqual('function')
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

  it('Popup has draggableSettings method and contains required properties', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    expect(typeof cmpEmpty.vm.draggableSettings).toEqual('function')
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

  it('Popup has interactInstance with defined events ondragmove and resizemove', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    expect(cmpEmpty.vm.interactInstance.events.ondragmove).toEqual(cmpEmpty.vm.dragMoveListener)
    expect(cmpEmpty.vm.interactInstance.events.resizemove[0]).toEqual(cmpEmpty.vm.resizeListener)
  })

  it('If emitted updatePopupDimensions then a method updatePopupDimensions executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let spy = jest.spyOn(cmpEmpty.vm, 'updatePopupDimensions')

    cmpEmpty.vm.$emit('updatePopupDimensions')
    expect(spy).toBeCalled()
    spy.mockReset()
  })

  it('If emitted changeStyleClass then a method uiOptionChanged executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    let spy = jest.spyOn(cmpEmpty.vm, 'uiOptionChanged')

    cmpEmpty.vm.$emit('changeStyleClass')
    expect(spy).toBeCalled()
    spy.mockReset()
  })

  it('If a method uiOptionChanged executes then an event ui-option-change is emitted', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })
    cmpEmpty.vm.uiOptionChanged()
    expect(cmpEmpty.emitted()['ui-option-change']).toBeTruthy()
  })

  it('If a method clearMessages executes then a message array is cleared', () => {
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

  it('If a method closePopup executes then a close event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.closePopup()
    expect(cmpEmpty.emitted()['close']).toBeTruthy()
  })

  it('If a method closeNotifications executes then a closepopupnotifications event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.closeNotifications()
    expect(cmpEmpty.emitted()['closepopupnotifications']).toBeTruthy()
  })

  it('If a method showPanelTab executes then a showpaneltab event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.showPanelTab()
    expect(cmpEmpty.emitted()['showpaneltab']).toBeTruthy()
  })

  it('If a method settingChanged executes then a settingchange event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.settingChanged()
    expect(cmpEmpty.emitted()['settingchange']).toBeTruthy()
  })

  it('If a method sendFeature executes then a sendfeature event executes', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.sendFeature()
    expect(cmpEmpty.emitted()['sendfeature']).toBeTruthy()
  })

  it('If a method resetPopupDimensions executes then resizeCount, widthValue, heightValue, exactWidth, exactHeight become zero', () => {
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

  it('If a requestStartTime changes then resetPopupDimensions and logger.log execute', () => {
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

  it('If a translationsDataReady changes then logger.log execute', () => {
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

  it('If a classesChanged changes then divClass equals data.classes.join(\' \')', (done) => {
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

  it('Popup has computed property additionalStylesTootipCloseIcon that is a function and has top and left object props if executed', () => {
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

  it('If data status text is a string then it shows in .alpheios-popup__header-selection', (done) => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.data.status.selectedText = 'mare'
    Vue.nextTick(function () {
      expect(cmpEmpty.find('.alpheios-popup__header-selection').isVisible()).toBeTruthy()
      expect(cmpEmpty.find('.alpheios-popup__header-selection').text()).toEqual('mare')
      done()
    })
  })

  it('If data status text is empty then the .alpheios-popup__header-selection is hidden', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.data.status.selectedText = ''
    expect(cmpEmpty.find('.alpheios-popup__header-selection').isVisible()).toBeFalsy()
  })

  it('If data.verboseMode is false then the .alpheios-popup__header-word is hidden', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.data.verboseMode = false
    expect(cmpEmpty.find('.alpheios-popup__header-word').isVisible()).toBeFalsy()
  })

  it('If data.status.languageName is not defined then the .alpheios-popup__header-word is hidden', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    cmpEmpty.vm.data.status.languageName = false
    expect(cmpEmpty.find('.alpheios-popup__header-word').isVisible()).toBeFalsy()
  })

  it('If .alpheios-popup__more-btn Treebank clicked than showTab event will be emitted with treebank param', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let btn = cmpEmpty.find('.alpheios-popup__more-btn.alpheios-popup__more-btn-treebank')
    btn.trigger('click')
    Vue.nextTick(function () {
      expect(cmpEmpty.emitted()['showpaneltab']).toBeTruthy()
      expect(cmpEmpty.emitted()['showpaneltab'][0]).toEqual(['treebank'])
    })
  })

  it('If .alpheios-popup__more-btn-inflections Inflections clicked than showTab event will be emitted with inflections param', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let btn = cmpEmpty.find('.alpheios-popup__more-btn.alpheios-popup__more-btn-inflections')
    btn.trigger('click')
    Vue.nextTick(function () {
      expect(cmpEmpty.emitted()['showpaneltab']).toBeTruthy()
      expect(cmpEmpty.emitted()['showpaneltab'][0]).toEqual(['inflections'])
    })
  })

  it('If .alpheios-popup__more-btn-definitions Definitions clicked than showTab event will be emitted with definitions param', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let btn = cmpEmpty.find('.alpheios-popup__more-btn.alpheios-popup__more-btn-definitions')
    btn.trigger('click')
    Vue.nextTick(function () {
      expect(cmpEmpty.emitted()['showpaneltab']).toBeTruthy()
      expect(cmpEmpty.emitted()['showpaneltab'][0]).toEqual(['definitions'])
    })
  })

  it('If .alpheios-popup__more-btn-options Options clicked than showTab event will be emitted with options param', () => {
    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: Object.assign({}, propsEmpty),
      computed: defComputed
    })

    let btn = cmpEmpty.find('.alpheios-popup__more-btn.alpheios-popup__more-btn-options')
    btn.trigger('click')
    Vue.nextTick(function () {
      expect(cmpEmpty.emitted()['showpaneltab']).toBeTruthy()
      expect(cmpEmpty.emitted()['showpaneltab'][0]).toEqual(['options'])
    })
  })

  it('If draggable = true then dragMoveListener - sets data-x, data-y attribute and webkitTransform property', () => {
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

  it('If draggable = false then dragMoveListener - webkitTransform property stays undefined', () => {
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

  it('if resizable = true then resizeListener - sets width, height, data-x, data-y attribute and webkitTransform property', () => {
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

  it('if resizable = true then width, height, webkitTransform property are not defined', () => {
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

  it('If showProviders === true then .alpheios-popup__morph-cont-providers-source contains providers from data.providers', () => {
    let curProps = Object.assign({}, propsEmpty)
    curProps.data.showProviders = true
    curProps.data.providers = [ 'test-provider' ]

    let cmpEmpty = mount(Popup, {
      attachToDocument: true,
      stubs: defaultStubs,
      propsData: curProps,
      computed: defComputed
    })

    expect(cmpEmpty.find('.alpheios-popup__morph-cont-providers-source').text()).toContain('test-provider')
  })
})
