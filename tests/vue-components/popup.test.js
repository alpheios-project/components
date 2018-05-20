/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Popup from '../../src/vue-components/popup.vue'

import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

import L10n from '../../src/lib/l10n/l10n'
import Locales from '../../src/locales/locales'
import enUS from '../../src/locales/en-us/messages.json'
import enGB from '../../src/locales/en-gb/messages.json'

import Options from '../../src/lib/options/options.js'
import LanguageOptionDefaults from '../../src/settings/language-options-defaults.json'
import ContentOptionDefaults from '../../src/settings/content-options-defaults.json'
import LocalStorageArea from '../../src/lib/options/local-storage-area.js'

// import { LanguageModelFactory as LMF, Lemma } from 'alpheios-data-models'
// import { Lemma } from 'alpheios-data-models'

let l10n = new L10n()
  .addMessages(enUS, Locales.en_US)
  .addMessages(enGB, Locales.en_GB)
  .setLocale(Locales.en_US)

let resourceOptions = new Options(LanguageOptionDefaults, LocalStorageArea)
let options = new Options(ContentOptionDefaults, LocalStorageArea)

describe('popup.test.js', () => {
  let cmpEmpty = mount(Popup, {
    propsData: {
      classChanged: 1,
      data: {
        classes: ['auk--default', 'alpheios-font_medium_class', 'alpheios-color_schema_light_class'],
        currentLanguage: 'lat',
        defDataReady: false,
        draggable: false,
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
        resizable: false,
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
  })

  it('A popup component has buton group - alpheios-popup__button-area', () => {
    expect(cmpEmpty.find('.alpheios-popup__button-area').exists()).toBeTruthy()
  })

  it('A popup\'s header buton group contains 4 buttons - alpheios-popup__more-btn', () => {
    expect(cmpEmpty.find('.alpheios-popup__button-area').findAll('.alpheios-popup__more-btn').length).toEqual(4)
  })

  it('In empty popup the first button is Treebank - LABEL_POPUP_TREEBANK and it is invisible', () => {
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(0).element.style.display).toEqual('none')
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(0).text()).toEqual(l10n.messages.LABEL_POPUP_TREEBANK)
  })

  it('In empty popup the second button is INFLECTIONS - LABEL_POPUP_INFLECT and it is invisible', () => {
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(1).element.style.display).toEqual('none')
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(1).text()).toEqual(l10n.messages.LABEL_POPUP_INFLECT)
  })

  it('In empty popup the third button is DEFINITIONS - LABEL_POPUP_DEFINE and it is invisible', () => {
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(2).element.style.display).toEqual('none')
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(2).text()).toEqual(l10n.messages.LABEL_POPUP_DEFINE)
  })

  it('In empty popup the fourth button is OPTIONS - LABEL_POPUP_OPTIONS and it is visible', () => {
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(3).element.style.display).toEqual('')
    expect(cmpEmpty.findAll('.alpheios-popup__button-area .alpheios-popup__more-btn').at(3).text()).toEqual(l10n.messages.LABEL_POPUP_OPTIONS)
  })

  it('In empty popup (morphDataReady === false and noLanguage === false) -  only the first alpheios-popup__definitions--placeholder is shown with PLACEHOLDER_POPUP_DATA', () => {
    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(0).element.style.display).toEqual('')
    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(1).element.style.display).toEqual('none')

    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(0).text()).toEqual(l10n.messages.PLACEHOLDER_POPUP_DATA)
  })

  it('If morphDataReady === false and noLanguage === true -  only the second alpheios-popup__definitions--placeholder is shown with PLACEHOLDER_POPUP_DATA', () => {
    let prevLang = cmpEmpty.vm.data.currentLanguage
    cmpEmpty.vm.data.currentLanguage = undefined

    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(0).element.style.display).toEqual('none')
    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(1).element.style.display).toEqual('')

    expect(cmpEmpty.findAll('.alpheios-popup__definitions--placeholder').at(1).text()).toEqual(l10n.messages.PLACEHOLDER_NO_LANGUAGE_POPUP_DATA)

    cmpEmpty.vm.data.currentLanguage = prevLang
  })

  it('If morphDataReady === true then the alpheios-popup__morph-cont-ready is shown', (done) => {
    cmpEmpty.vm.data.morphDataReady = true
    Vue.nextTick(function () {
      expect(cmpEmpty.find('.alpheios-popup__morph-cont-ready').element.style.display).toEqual('')
      cmpEmpty.vm.data.morphDataReady = false
      done()
    })
  })

  it('If data.notification.important = false then alpheios-popup__notifications is invisible', () => {
    expect(cmpEmpty.find('.alpheios-popup__notifications').element.style.display).toEqual('none')
  })

  it('If data.notification.important = true then alpheios-popup__notifications is shown', () => {
    cmpEmpty.vm.data.notification.important = true
    expect(cmpEmpty.find('.alpheios-popup__notifications').element.style.display).toEqual('')
    cmpEmpty.vm.data.notification.important = false
  })

  it('If click on Credits link - different labels on credit lik on click', () => {
    let creditLink = cmpEmpty.find('.alpheios-popup__providers-link')

    expect(cmpEmpty.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_SHOWCREDITS)

    creditLink.trigger('click')

    expect(cmpEmpty.vm.providersLinkText).toEqual(l10n.messages.LABEL_POPUP_HIDECREDITS)
  })

  it('If data.notification.important = true then  alpheios-popup__notifications has class alpheios-popup__notifications--important', (done) => {
    cmpEmpty.vm.data.notification.important = true
    expect(cmpEmpty.vm.notificationClasses['alpheios-popup__notifications--important']).toBeTruthy()

    Vue.nextTick(function () {
      expect(cmpEmpty.find('.alpheios-popup__notifications').classes()).toContain('alpheios-popup__notifications--important')
      cmpEmpty.vm.data.notification.important = false
      done()
    })
  })

  it('If data.notification.important = false then  alpheios-popup__notifications doesn\'t have class alpheios-popup__notifications--important', (done) => {
    cmpEmpty.vm.data.notification.important = false
    expect(cmpEmpty.vm.notificationClasses['alpheios-popup__notifications--important']).toBeFalsy()

    Vue.nextTick(function () {
      expect(cmpEmpty.find('.alpheios-popup__notifications').classes()).not.toContain('alpheios-popup__notifications--important')
      done()
    })
  })

  it('if popup invisible then positionLeftDm === 0px', () => {
    cmpEmpty.vm.visible = false
    expect(cmpEmpty.vm.positionLeftDm).toEqual('0px')
  })

  it('if popup visible then positionLeftDm > 0', () => {
    cmpEmpty.vm.visible = true
    let pos = Number.parseInt(cmpEmpty.vm.positionLeftDm.replace('px', ''))
    expect(pos).toBeGreaterThan(0)
  })

  it('if popup invisible then positionTopDm === 0px', () => {
    cmpEmpty.vm.visible = false
    expect(cmpEmpty.vm.positionTopDm).toEqual('0px')
  })

  it('if popup visible then positionTopDm > 0', () => {
    cmpEmpty.vm.visible = true
    let pos = Number.parseInt(cmpEmpty.vm.positionTopDm.replace('px', ''))
    expect(pos).toBeGreaterThan(0)
  })

  it('if data.showProviders === false than alpheios-popup__morph-cont-providers - invisible', () => {
    cmpEmpty.vm.data.showProviders = false
    expect(cmpEmpty.vm.showProviders).toBeFalsy()

    expect(cmpEmpty.find('.alpheios-popup__morph-cont-providers').exists()).toBeFalsy()
  })

  it('if data.showProviders === true than alpheios-popup__morph-cont-providers - visible', () => {
    cmpEmpty.vm.data.showProviders = true
    expect(cmpEmpty.vm.showProviders).toBeTruthy()

    expect(cmpEmpty.find('.alpheios-popup__morph-cont-providers').exists()).toBeTruthy()
    cmpEmpty.vm.data.showProviders = false
  })

  it('if widthValue is a Number then widthDm = widthValue + px', () => {
    cmpEmpty.vm.widthValue = 500
    expect(cmpEmpty.vm.widthDm).toEqual(cmpEmpty.vm.widthValue + 'px')
  })

  it('if widthValue === auto then widthDm = auto', () => {
    cmpEmpty.vm.widthValue = 'auto'
    expect(cmpEmpty.vm.widthDm).toEqual('auto')
  })

  it('if set widthDm a value less han maxWidth then it woul be equal a newValue', () => {
    cmpEmpty.vm.widthDm = 300
    expect(cmpEmpty.vm.widthDm).toEqual('300px')
  })

  it('if set widthDm a value more han maxWidth then it woul be equal auto', () => {
    cmpEmpty.vm.widthDm = 3000000
    expect(cmpEmpty.vm.widthDm).toEqual('auto')
  })

  it('if heightValue is a Number then heightDm = widthValue + px', () => {
    cmpEmpty.vm.heightValue = 500
    expect(cmpEmpty.vm.heightDm).toEqual(cmpEmpty.vm.heightValue + 'px')
  })

  it('if heightValue === auto then widthDm = auto', () => {
    cmpEmpty.vm.heightValue = 'auto'
    expect(cmpEmpty.vm.heightDm).toEqual('auto')
  })

  it('if set heightDm a value less han maxWidth then it woul be equal a newValue', () => {
    cmpEmpty.vm.heightDm = 300
    expect(cmpEmpty.vm.heightDm).toEqual('300px')
  })

  it('if set heightDm a value more han maxWidth then it woul be equal auto', () => {
    cmpEmpty.vm.heightDm = 3000000
    expect(cmpEmpty.vm.heightDm).toEqual('auto')
  })
})
