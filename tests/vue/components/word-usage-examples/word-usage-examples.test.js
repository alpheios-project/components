/* eslint-disable no-unused-vars */
import 'whatwg-fetch'
import Vuex from 'vuex'
import { mount, createLocalVue, shallowMount } from '@vue/test-utils'

import { Constants, Author, TextWork, ResourceProvider } from 'alpheios-data-models'
import { ClientAdapters } from 'alpheios-client-adapters'
import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'

import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import WordUsageExamples from '@/vue/components/word-usage-examples/word-usage-examples.vue'

describe('word-usage-examples-block.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let testWordUsageList, testWord1, mockProvider, store, l10nModule

  let testAuthor, testTextWork
  let api = {}
  
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  beforeAll(async () => {
    testAuthor = new Author('urn:cts:latinLit:phi0690', { "eng": "Virgil" })
    testAuthor.ID = 690
    testTextWork = new TextWork(testAuthor, 'urn:cts:latinLit:phi0690.phi003', { "eng": "Aeneid" })
    testTextWork.ID = 3
    testWord1 = 'cupidinibus'

    let adapterTuftsRes = await ClientAdapters.morphology.tufts({
      method: 'getHomonym',
      params: {
        languageID: Constants.LANG_LATIN,
        word: testWord1
      }
    })

    let filterOptions = {
      author: testAuthor,
      textWork: testTextWork
    }

    let paginationOptions =  {
      property: 'max',
      value: 5
    }

    let adapterConcordanceRes = await ClientAdapters.wordusageExamples.concordance({
      method: 'getWordUsageExamples',
      params: { homonym: adapterTuftsRes.result, filters: {}, pagination: paginationOptions }
    })

    testWordUsageList = adapterConcordanceRes.result

  })

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    store = new Vuex.Store({
      
      modules: {
        app: {
          namespaced: true,
          homonym: null,
          state: {
            homonymDataReady: false,
            wordUsageExamplesReady: false
          },
          mutations: {
            setHomonym (state) {
              state.homonymDataReady = true
            },
            setWordUsageExamplesReady (state, value = true) {
              state.wordUsageExamplesReady = value
            }
          }
        },
        ui: {}
      }
    })

    api = {
      app: {
        state: {
          homonymDataReady: false
        },
        homonym: null
      },
      ui: {}
    }

    l10nModule = new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr([
        [enUS, Locales.en_US],
        [enUSData, Locales.en_US],
        [enUSInfl, Locales.en_US],
        [enGB, Locales.en_GB]
      ])
    })
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 WordUsageExamples - checks if a component mounts properly without word usage examples ready', async () => {
    let storeLocal = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          state: {}
        },
        app: {
          homonym: { targetWord: 'cepit', language: 'lat' },
          state: {
            homonymDataReady: true,
            wordUsageExamplesReady: false
          }
        }
      }
    })

    let cmp = shallowMount(WordUsageExamples, {
      store: storeLocal,
      localVue,
      mocks: {
        l10n: api.l10n,
        app: {
          homonymDataReady: true,
          homonym: { targetWord: 'cepit', language: 'lat' }
        },
        ui: api.ui
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    
    expect(cmp.vm.targetWord).toEqual('cepit')
    expect(cmp.vm.language).toEqual('lat')
    expect(cmp.vm.wordUsageExamples).toEqual([])
    expect(cmp.vm.provider).toBeNull()
    expect(cmp.vm.providerRights).toEqual([])
    expect(cmp.vm.wordUsageListSorted).toEqual([])
    expect(cmp.vm.showWordUsageExampleItems).toBeFalsy()
    
  })

  it('2 WordUsageExamples - checks if a component mounts properly with word usage examples ready', async () => {
    let storeLocal = new Vuex.Store({
      modules: {
        ui: {
          namespaced: true,
          state: {}
        },
        app: {
          homonym: { targetWord: 'cepit', language: 'lat' },
          wordUsageExamples: [],
          state: {
            homonymDataReady: true,
            wordUsageExamplesReady: true
          }
        }
      }
    })

    let cmp = shallowMount(WordUsageExamples, {
      store: storeLocal,
      localVue,
      mocks: {
        l10n: api.l10n,
        app: {
          homonymDataReady: true,
          homonym: { targetWord: 'cepit', language: 'lat' },
          wordUsageExamplesReady: true,
          wordUsageExamples: testWordUsageList
        },
        ui: api.ui
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.vm.showWordUsageExampleItems).toBeTruthy()
    expect(cmp.vm.wordUsageExamples).toEqual(testWordUsageList.wordUsageExamples)

    expect(cmp.vm.provider).not.toBeNull()
    expect(cmp.vm.providerRights.length).toBeGreaterThan(0)
  })

  it('3 WordUsageExamples - computed targetWord returns null if homonyn is not yet retrieved and returned homonym.targetWord - if retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: {
        l10n: api.l10n,
        ui: api.ui,
        app: api.app
      }
    })

    expect(cmp.vm.targetWord).toBeNull()

    let homonym = { targetWord: 'cepit', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')
    
    expect(cmp.vm.targetWord).toEqual('cepit')
  })

  it('4 WordUsageExamples - computed language returns null if homonyn is not yet retrieved and returned homonym.language - if retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.targetWord).toBeNull()

    let homonym = { targetWord: 'cepit', language: 'lat' }
    api.app.homonym = homonym
    store.commit('app/setHomonym')
    
    expect(cmp.vm.language).toEqual('lat')
  })

  it('5 WordUsageExamples - computed showHeaderFilters is true only if we have word usage examples ready', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    store.commit('app/setWordUsageExamplesReady')
    expect(cmp.vm.showHeaderFilters).toBeTruthy()
  })

  it('6 WordUsageExamples - computed showHeader is true if selectedAuthor is not empty', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    cmp.vm.selectedAuthor = testAuthor
    expect(cmp.vm.showHeader).toBeTruthy()
  })

  it('7 WordUsageExamples - computed showHeader is true if word usage examples are already retrieved and examples list is not empty', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.showHeader).toBeTruthy()
  })

  it('8 WordUsageExamples - computed showHeader is true if word usage examples are already retrieved and examples list is not empty', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.showHeaderFilters).toBeFalsy()
    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.showHeader).toBeTruthy()
  })

  it('9 WordUsageExamples - computed wordUsageExamples returns empty array if usage examples are not retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.wordUsageExamples.length).toEqual(0)
  })

  it('10 WordUsageExamples - computed wordUsageExamples returns full array of usage examples if selected author is not chosen or needInnerFilter is false', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.wordUsageExamples.length).toBeGreaterThan(0)
    expect(cmp.vm.wordUsageExamples.length).toEqual(testWordUsageList.wordUsageExamples.length)
    
    cmp.vm.selectedAuthor = testAuthor
    cmp.vm.needInnerFilter = false

    expect(cmp.vm.wordUsageExamples.length).toEqual(testWordUsageList.wordUsageExamples.length)
  })

  it('11 WordUsageExamples - computed wordUsageExamples returns filtered array of usage examples if selected author is chosen and needInnerFilter is true', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.wordUsageExamples.length).toEqual(testWordUsageList.wordUsageExamples.length)
    
    cmp.vm.selectedAuthor = testAuthor
    cmp.vm.needInnerFilter = true

    expect(cmp.vm.wordUsageExamples.length).toBeLessThan(testWordUsageList.wordUsageExamples.length)
  })

  it('12 WordUsageExamples - computed provider returns String(provider) from WordUsageExamples data if this data is retrieved and provider is defined', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.provider).toBeNull()

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.provider).toEqual(expect.stringContaining('Word usage examples are provided by'))
  })

  it.skip('13 WordUsageExamples - NOT APPLICABLE computed providerRights returns Array with provider rights if this data is retrieved and provider is defined and has rights', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.providerRights.length).toEqual(0)

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    expect(cmp.vm.providerRights).toBeGreaterThan(0)
  })

  it('14 WordUsageExamples - computed wordUsageListSorted returns empty array if usage examples are not retrieved', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.wordUsageListSorted.length).toEqual(0)
  })

  it('15 WordUsageExamples - computed wordUsageListSorted returns sorted array (executes sortWordUSageExamplesBy method)', () => {
    let cmp = shallowMount(WordUsageExamples, {
      store: store,
      localVue,
      mocks: api
    })

    store.commit('app/setWordUsageExamplesReady')
    api.app.wordUsageExamples = testWordUsageList

    jest.spyOn(cmp.vm, 'sortWordUSageExamplesBy')
    expect(cmp.vm.wordUsageListSorted.length).toEqual(testWordUsageList.wordUsageExamples.length)
    expect(cmp.vm.sortWordUSageExamplesBy).toHaveBeenCalled()
  })
})
