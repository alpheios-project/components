/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Grammar from '@/vue/components/grammar.vue'
import BaseTestHelp from '@tests/helpclasses/base-test-help'
import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

describe('grammar.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  let store
  let api

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = BaseTestHelp.baseVuexStore()

    api = {
      app: BaseTestHelp.appAPI()
    }

    BaseTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 Grammar - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Grammar - languageList is defined on the created state', () => {
    let cmp = shallowMount(Grammar, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.vm.languageList).toBeDefined()
    expect(Object.keys(cmp.vm.languageList)).toEqual(['lat', 'grc'])

    expect(cmp.vm.languageList.lat).toEqual(expect.objectContaining({
      languageID: Constants.LANG_LATIN,
      languageCode: 'lat',
      title: 'Latin Grammar'
    }))

    expect(cmp.vm.languageList.grc).toEqual(expect.objectContaining({
      languageID: Constants.LANG_GREEK,
      languageCode: 'grc',
      title: 'Greek Grammar'
    }))
  })

  it('3 Grammar - when Lexical Query is started all languages become collapsed', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.languageList.lat.collapsed = false
    cmp.vm.currentLanguageCode = 'lat'
    cmp.vm.currentUrl = 'fooURL'

    store.commit('app/lexicalRequestStarted')
    await Vue.nextTick()

    expect(cmp.vm.languageList.lat.collapsed).toBeTruthy()
    expect(cmp.vm.currentLanguageCode).toBeNull()
    expect(cmp.vm.currentUrl).toBeNull()
  })

  it('4 Grammar - when store.state.app.updatedGrammar is changed we update languageList', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    jest.spyOn(cmp.vm, 'updateLanguageList')

    store.commit('app/setUpdatedGrammar')

    await Vue.nextTick()
    expect(cmp.vm.updateLanguageList).toHaveBeenCalled()
  })

  it('5 Grammar - when store.state.app.currentLanguageCode is changed we update currentLanguageCode and collapse if it is available', async () => {
    let cmp = mount(Grammar, {
      store,
      localVue,
      mocks: api
    })

    cmp.vm.collapseLanguage = jest.fn()

    expect(cmp.vm.currentLanguageCode).toBeNull()
    expect(cmp.vm.languageList.lat.collapsed).toBeTruthy()

    store.commit('app/setCurrentLanguage', { languageID: Constants.LANG_LATIN, languageCode: 'lat' })

    await Vue.nextTick()
    expect(cmp.vm.collapseLanguage).toHaveBeenLastCalledWith('lat', false)

    store.commit('app/setCurrentLanguage', { languageID: Constants.LANG_GREEK, languageCode: 'grc' })
    await Vue.nextTick()
    expect(cmp.vm.collapseLanguage).toHaveBeenLastCalledWith('grc', false)

    store.commit('ui/setTestCurrentTab', 'grammar')
    store.commit('app/setCurrentLanguage', { languageID: Constants.LANG_LATIN, languageCode: 'lat' })
    expect(cmp.vm.collapseLanguage).toHaveBeenCalledTimes(2) // was not called this time
  })
  
})
