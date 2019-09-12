/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Inflections from '@/vue/components/inflections.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

describe('inflections.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()

    api = {
    ui: BaseTestHelp.uiAPI(),
    settings: BaseTestHelp.settingsAPI(),
    app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.authModule(store, api)
    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 Inflections - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Inflections - computed partOfSpeechSelector returns selectedPartOfSpeech from data', () => {
    let cmp = shallowMount(Inflections, {
      data () {
        return {
          selectedPartOfSpeech: 'foo'
        }
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.vm.partOfSpeechSelector).toEqual('foo')
  })

  it('3 Inflections - computed partOfSpeechSelector sets method changes values of selectedPartOfSpeech, views and selectedView', () => {
    let api = {
      ui: BaseTestHelp.uiAPI(),
      settings: BaseTestHelp.settingsAPI(),
      app: BaseTestHelp.appAPI({
        getInflectionViews: jest.fn(() => {
          let render = () => {
            return 'fooView'
          }
          return [ { render } ]
        })
      })
    }

    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })
    
    cmp.vm.partOfSpeechSelector = 'fooPart'
    expect(cmp.vm.partOfSpeechSelector).toEqual('fooPart')
    expect(cmp.vm.views.length).toEqual(1)
    expect(cmp.vm.selectedView).toEqual('fooView')
    expect(api.app.getInflectionViews).toHaveBeenCalledWith('fooPart')
  })

  it('4 Inflections - computed viewSelector returns id of the selected view or empty string', () => {
    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })

    cmp.setData({
      selectedView: null
    })

    expect(cmp.vm.viewSelector).toEqual('')

    cmp.setData({
      selectedView: {
        id: 'fooId'
      }
    })

    expect(cmp.vm.viewSelector).toEqual('fooId')
  })

  it('5 Inflections - computed viewSelector sets selectedView from views by id', () => {
    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })
    
    cmp.setData({
      views: [{
        id: 'fooId',
        render: jest.fn(() => {
          return 'fooView'
        })
      }]
    })
    
    cmp.vm.viewSelector = 'fooId'

    expect(cmp.vm.selectedView).toEqual('fooView')
    expect(cmp.vm.views[0].render).toHaveBeenCalled()
  })

  it('6 Inflections - computed inflectionTable returns id of the selectedView', () => {
    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })
    
    cmp.setData({
      selectedView: { id: 'fooId' }
    })

    expect(cmp.vm.inflectionTable).toEqual('fooId')
  })

  it('7 Inflections - computed footnotes returns footnotes from the selected views', () => {
    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })
    
    expect(cmp.vm.footnotes).toEqual([])

    let footNotesValues = new Map()
    footNotesValues.set('fooKey', 'fooValue')

    cmp.setData({
      selectedView: { footnotes: footNotesValues }
    })

    expect(cmp.vm.footnotes).toEqual(['fooValue'])
  })

  it('8 Inflections - computed forms returns forms from the selected views', () => {
    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })
    
    expect(cmp.vm.forms).toEqual([])

    let formsValues = new Map()
    formsValues.set('fooKey', 'fooForm')

    cmp.setData({
      selectedView: { forms: formsValues }
    })

    expect(cmp.vm.forms).toEqual(['fooForm'])
  })

  it('9 Inflections - computed showExplanatoryHint returns true view is GreekParadigmView', () => {
    let cmp = shallowMount(Inflections, {
      store,
      localVue,
      mocks: api
    })
    
    expect(cmp.vm.showExplanatoryHint).toBeFalsy()

    cmp.setData({
      selectedView: { constructor: {
        name: 'LatinNounView'
      }}
    })

    expect(cmp.vm.showExplanatoryHint).toBeFalsy()

    cmp.setData({
      selectedView: { constructor: {
        name: 'GreekParadigmView'
      }}
    })
  
    expect(cmp.vm.showExplanatoryHint).toBeTruthy()
  })
})