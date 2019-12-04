/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Grammar from '@/vue/components/grammar.vue'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import Vuex from 'vuex'

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
  
})
