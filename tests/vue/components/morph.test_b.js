/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Morph from '@/vue/components/morph.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

describe('morph.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let testHomonymCupidinibus, testHomonymSenatus

  beforeAll(async () => {
    testHomonymCupidinibus = await BaseTestHelp.collectHomonym('cupidinibus', Constants.LANG_LATIN)
    testHomonymSenatus = await BaseTestHelp.collectHomonym('senatus', Constants.LANG_LATIN)
  })

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
/*
  it('1 Morph - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Morph, {
      propsData: {
        lexemes: []
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Morph - showLexeme', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: [],
        morphDataReady: false
      },
      store,
      localVue,
      mocks: api
    })

    let testLexeme = {}

    let res = cmp.vm.showLexeme(testLexeme)
    expect(res).toBeFalsy()

    testLexeme = { isPopulated: jest.fn(() => 'test') }
    res = cmp.vm.showLexeme(testLexeme)

    expect(testLexeme.isPopulated).toBeCalled()
    expect(res).toEqual('test')
  })

  it('3 Morph - render with children components (min requirements without InflectionAttribute)', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        homonym: testHomonym,
        getHomonymLexemes: () => testHomonym.lexemes
      })
    }
  
    BaseTestHelp.l10nModule(store, api)

    store.commit('app/setTestMorphDataReady', true)

    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })
    
    expect(cmp.find('.principal_parts').exists()).toBeTruthy()

    expect(cmp.findAll('.principal_parts').length).toEqual(2)
    expect(cmp.findAll('.principal_parts .lemma_index').exists()).toBeTruthy()
    
  })
*/
/*
  it.skip('4 Morph - render principal parts (min requirements without InflectionAttribute)', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        homonym: testHomonym,
        getHomonymLexemes: () => testHomonym.lexemes
      })
    }
    
    BaseTestHelp.l10nModule(store, api)
  
    store.commit('app/setTestMorphDataReady', true)
  
    let cmp = shallowMount(Morph, {
      store,
      localVue,
      mocks: api
    })

    let hasLemmaWordInPrincipalParts = false
    let cntPParts = 0

    let spansPP = cmp.findAll('.principal_parts span')

    for (let i = 0; i < spansPP.length; i++) {
      console.info(spansPP.at(i).html())
      if (spansPP.at(i).text() === 'foo-word') {
        hasLemmaWordInPrincipalParts = true
      }
      if (spansPP.at(i).text() === 'part1' || spansPP.at(i).text() === 'part2') {
        cntPParts++
      }
    }

    // console.info(cmp.html())
    // expect(hasLemmaWordInPrincipalParts).toBeTruthy()
    // expect(cntPParts).toEqual(2)

    expect(cmp.findAll('.principal_parts .inflectionattribute').length).toEqual(1)
  })


  it('4 Morph - render principal parts (1 lemma, word is included in principal parts)', () => {
    let api = {
      app: BaseTestHelp.appAPI({
        homonym: testHomonymSenatus,
        getHomonymLexemes: () => testHomonymSenatus.lexemes
      })
    }
        
    BaseTestHelp.l10nModule(store, api)
        
    store.commit('app/setTestMorphDataReady', true)
        
    let cmp = shallowMount(Morph, {
        store,
        localVue,
        mocks: api
    })

    let lexemes = cmp.vm.lexemes
    let lemmas = cmp.vm.allLemmas(lexemes[0])

    console.info('lemmas.length', lemmas.length)
    console.info('lemmas.word', lemmas[0].word)
    console.info('lemmas.principalParts', lemmas[0].principalParts)
  })
  */
})
