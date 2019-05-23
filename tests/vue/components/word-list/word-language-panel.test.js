/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import WordLanguagePanel from '@/vue/components/word-list/word-language-panel.vue'

import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'
import { WordList, WordItem } from 'alpheios-data-models'

describe('word-language-panel.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)
  let store
  let api
  let l10nModule
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
    
  beforeEach(() => {
    jest.spyOn(console, 'error')
    api = {}
  })
  afterEach(() => {
    jest.resetModules()
    store = null
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  function defineL10n(store) {
    l10nModule = new L10nModule(store, api, {
      defaultLocale: Locales.en_US,
      messageBundles: Locales.bundleArr([
        [enUS, Locales.en_US],
        [enUSData, Locales.en_US],
        [enUSInfl, Locales.en_US],
        [enGB, Locales.en_GB]
      ])
    })
    
    return l10nModule
  }
/*
  it('1 WordLanguagePanel - renders a vue instance (min requirements)', () => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            wordListUpdateTime: 10,
            mutations: {
              setWordLists: (state) => {
                state.wordListUpdateTime = null
              }
            }
          }
        }
      }
    })
    
    let wordItem = new WordItem({ targetWord: 'mare', languageCode: 'lat' })
    api.app = {
      getAllWordLists: () => [],
      getWordList: () => new WordList('lat', [wordItem])
    }
    defineL10n(store)  

    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()

  })
*/
  it('2 WordLanguagePanel - has alpheios-wordlist-commands (makeAllImportant, removeAllImportant, showDeleteAll)', async () => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            wordListUpdateTime: 10,
            mutations: {
              setWordLists: (state) => {
              state.wordListUpdateTime = null
              }
            }
          }
        }
      }
    })
      
    let wordItem = new WordItem({ targetWord: 'mare', languageCode: 'lat' })
    api.app = {
      getAllWordLists: () => [],
      getWordList: () => new WordList('lat', [wordItem]),
      updateAllImportant: () => { return new Promise((resolve, reject) => {})}
    }
    defineL10n(store)  
  
    let cmp = shallowMount(WordLanguagePanel, {
      store,
      localVue,
      mocks: api,
      propsData: {
        languageCode: 'lat'
      }
    })

    expect(cmp.findAll('.alpheios-wordlist-commands__item').length).toEqual(3)
    let command1 = cmp.findAll('.alpheios-wordlist-commands__item').at(0)

    console.info('****', command1.html())
    command1.trigger('click')

    await Vue.nextTick()
    // expect(api.app.updateAllImportant).toHaveBeenCalledWith('lat', true)

    await api.app.updateAllImportant()
    expect(cmp.emitted()['eventChangeImportant']).toBeTruthy()
    
  })
})