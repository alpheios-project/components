/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import BaseTestHelp from '@tests/helpclasses/base-test-help'

import InflectionsBrowser from '@/vue/components/inflections-browser.vue'
import InflectionsTableWide from '@/vue/components/inflections-table-wide.vue'

import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import { Constants } from 'alpheios-data-models'

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
      app: BaseTestHelp.appAPI()
    }
    BaseTestHelp.l10nModule(store, api)
  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 InflectionsBrowser - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 InflectionsBrowser - renders Latin and Greek wide-tables - checks title', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let titles = cmp.findAll('.alpheios-ib__title')
    expect(titles.length).toEqual(2)

    expect(titles.at(0).text()).toEqual(expect.stringContaining('Latin Inflection Browser'))
    expect(titles.at(1).text()).toEqual(expect.stringContaining('Greek Inflection Browser'))

    titles = cmp.findAll('.alpheios-ib__pofs-title')
    expect(titles.length).toEqual(9)

    expect(titles.at(0).text()).toEqual(expect.stringContaining('Nouns'))
    expect(titles.at(1).text()).toEqual(expect.stringContaining('Adjectives'))
    expect(titles.at(2).text()).toEqual(expect.stringContaining('Verbs'))
    expect(titles.at(3).text()).toEqual(expect.stringContaining('Nouns'))
    expect(titles.at(4).text()).toEqual(expect.stringContaining('Adjectives'))
    expect(titles.at(5).text()).toEqual(expect.stringContaining('Pronouns'))
    expect(titles.at(6).text()).toEqual(expect.stringContaining('Articles'))
    expect(titles.at(7).text()).toEqual(expect.stringContaining('Numerals'))
    expect(titles.at(8).text()).toEqual(expect.stringContaining('Verb Paradigms'))

    let wideTables = cmp.findAll(InflectionsTableWide)
    expect(wideTables.length).toEqual(118)
  })

  it('3 InflectionsBrowser - renders Latin and Greek wide-tables - latin_noun_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(0)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_noun_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
   })

  it('4 InflectionsBrowser - renders Latin and Greek wide-tables - latin_adjective_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(1)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_adjective_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })  

  it('5 InflectionsBrowser - renders Latin and Greek wide-tables - latin_conjugation_mood_voice_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(2)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_conjugation_mood_voice_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)

  })

  it('6 InflectionsBrowser - renders Latin and Greek wide-tables - latin_conjugation_voice_mood_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(3)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_conjugation_voice_mood_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
 
  })

  it('7 InflectionsBrowser - renders Latin and Greek wide-tables - latin_mood_conjugation_voice_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(4)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_mood_conjugation_voice_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('8 InflectionsBrowser - renders Latin and Greek wide-tables - latin_mood_voice_conjugation_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(5)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_mood_voice_conjugation_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('9 InflectionsBrowser - renders Latin and Greek wide-tables - latin_voice_conjugation_mood_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(6)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_voice_conjugation_mood_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('10 InflectionsBrowser - renders Latin and Greek wide-tables - latin_voice_mood_conjugation_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(7)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_voice_mood_conjugation_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('11 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_participle_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(8)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_verb_participle_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('12 InflectionsBrowser - renders Latin and Greek wide-tables - latin_infinitive_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(9)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_infinitive_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('13 InflectionsBrowser - renders Latin and Greek wide-tables - latin_imperative_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(10)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_imperative_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('14 InflectionsBrowser - renders Latin and Greek wide-tables - latin_supine_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(11)
    expect(wideTable.props().standardFormData.viewID).toEqual('latin_supine_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(3)


  })

  it('15 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - sum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(12)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'sum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('16 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - fero', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(13)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'fero'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('17 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(14)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'malo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('18 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(15)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'nolo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('19 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - malo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(16)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'volo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('20 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - eo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(17)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'eo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('21 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - absum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(18)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'absum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('22 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - adsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(19)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'adsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('23 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - dēsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(20)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'dēsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('24 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - insum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(21)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'insum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('25 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - intersum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(22)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'intersum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('26 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - obsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(23)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'obsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('27 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - possum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(24)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'possum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('28 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - prosum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(25)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'prosum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('29 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - praesum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(26)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'praesum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('30 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - subsum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(27)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'subsum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('31 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - supersum', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(28)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'supersum'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('32 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - queo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(29)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'queo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('33 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - nequeo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(30)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'nequeo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('34 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - adeo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(31)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'adeo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('35 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_voice_view, form - ineo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(32)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_voice_view',
      form: 'ineo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('36 InflectionsBrowser - renders Latin and Greek wide-tables - latin_verb_irregular_view, form - veneo', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(33)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'latin_verb_irregular_view',
      form: 'veneo'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })


  it('37 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(34)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_noun_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('38 InflectionsBrowser - renders Latin and Greek wide-tables - greek_noun_simplified_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(35)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_noun_simplified_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('39 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(36)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_adjective_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('40 InflectionsBrowser - renders Latin and Greek wide-tables - greek_adjective_simplified_view', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(37)
    expect(wideTable.props().standardFormData.viewID).toEqual('greek_adjective_simplified_view')

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('41 InflectionsBrowser - renders Latin and Greek wide-tables - greek_person_pronoun_view, form - νώ', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(38)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_person_pronoun_view',
      form: 'νώ'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('42 InflectionsBrowser - renders Latin and Greek wide-tables - greek_person_gender_pronoun_view, form - ἡμᾶς', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(39)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_person_gender_pronoun_view',
      form: 'ἡμᾶς'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })


  it('43 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - ἀλλήλᾱ', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(40)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'ἀλλήλᾱ'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('44 InflectionsBrowser - renders Latin and Greek wide-tables - greek_lemma_gender_pronoun_view, form - τούτω', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(41)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_lemma_gender_pronoun_view',
      form: 'τούτω'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('45 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - οἷς', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(42)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'οἷς'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('46 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - ὥτινε', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(43)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'ὥτινε'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)


  })

  it('47 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - τίνε', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(44)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'τίνε'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('48 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - τινοῖν', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(45)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'τινοῖν'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('49 InflectionsBrowser - renders Latin and Greek wide-tables - greek_gender_pronoun_view, form - αὐτά', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(46)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_gender_pronoun_view',
      form: 'αὐτά'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })


  it('50 InflectionsBrowser - renders Latin and Greek wide-tables - greek_article_view, form - τοῦ', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(47)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_article_view',
      form: 'τοῦ'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('51 InflectionsBrowser - renders Latin and Greek wide-tables - greek_numeral_view, form - δύο', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(48)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_numeral_view',
      form: 'δύο'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-cell').length).toBeGreaterThan(10)
  })

  it('52 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm1', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(49)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm1'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('53 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm12', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(50)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm2'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('53 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm3', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(51)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm3'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('54 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm4', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(52)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm4'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('55 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm5', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(53)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm5'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('56 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm6', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(54)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm6'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('57 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm7', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(55)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm7'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('58 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm8', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(56)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm8'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('59 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm9', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(57)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm9'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('60 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm10', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(58)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm10'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })


  it('61 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm11', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(59)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm11'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('62 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm12', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(60)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm12'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('63 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm13', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(61)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm13'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('64 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm14', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(62)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm14'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('65 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm15', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(63)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm15'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('66 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm16', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(64)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm16'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('67 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(65)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm17'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('68 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17b', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(66)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm17b'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('69 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm17c', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(67)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm17c'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('70 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm18', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(68)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm18'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('71 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm19', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(69)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm19'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('72 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm20', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(70)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm20'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('73 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm21', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(71)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm21'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('74 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm22', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(72)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm22'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('75 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm23', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(73)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm23'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('76 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm24', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(74)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm24'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('77 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm25', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(75)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm25'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('78 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm26', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(76)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm26'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('79 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm27', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(77)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm27'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('80 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm28', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(78)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm28'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('81 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm29', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(79)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm29'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('82 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm30', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(80)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm30'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('83 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm31', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(81)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm31'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('84 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm32', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(82)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm32'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('85 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm33', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(83)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm33'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('86 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm34', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(84)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm34'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('87 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm35', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(85)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm35'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('88 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm36', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(86)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm36'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('89 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm37', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(87)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm37'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('90 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm38', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(88)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm38'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('91 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm39', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(89)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm39'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('92 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm40', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(90)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm40'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('93 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm41', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(91)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm41'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('94 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm42', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(92)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm42'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('95 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm43', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(93)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm43'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('96 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm43b', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(94)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm43b'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('97 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm44', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(95)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm44'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('98 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm45', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(96)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm45'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('99 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm46', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(97)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm46'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('100 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm47', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(98)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm47'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('101 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm48', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(99)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm48'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('102 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm49', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(100)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm49'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })
  
  it('103 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm50', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(101)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm50'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('104 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm51', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(102)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm51'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('105 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm52', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(103)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm52'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('106 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_paradigm_view, paradigmID - verbpdgm53', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(104)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_paradigm_view',
      paradigmID: 'verbpdgm53'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('107 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm54', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(105)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm54'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('108 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm55', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(106)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm55'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('109 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm56', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(107)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm56'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('109 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm57', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(108)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm57'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('110 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm58', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(109)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm58'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('111 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm59', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(110)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm59'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('112 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm60', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(111)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm60'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('113 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm61', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(112)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm61'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('114 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm62', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(113)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm62'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('115 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm63', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(114)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm63'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('116 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm64', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(115)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm64'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('117 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm65', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(116)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm65'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('118 InflectionsBrowser - renders Latin and Greek wide-tables - greek_verb_participle_paradigm_view, paradigmID - verbpdgm66', () => {
    let cmp = mount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })

    let wideTable = cmp.findAll(InflectionsTableWide).at(117)
    expect(wideTable.props().standardFormData).toEqual(expect.objectContaining({
      viewID: 'greek_verb_participle_paradigm_view',
      paradigmID: 'verbpdgm66'
    }))

    wideTable.findAll('span').at(0).trigger('click')

    expect(wideTable.findAll('.infl-prdgm-tbl-cell--data').length).toBeGreaterThan(10)
  })

  it('119 InflectionsBrowser - method collapseLanguage changes language state for the given languageID', () => {
    let cmp = shallowMount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })
    
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeTruthy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()

    cmp.vm.collapseLanguage(Constants.LANG_LATIN)

    expect(cmp.vm.collapsed['Symbol(latin)']).toBeFalsy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()

    cmp.vm.collapseLanguage(Constants.LANG_GREEK)

    expect(cmp.vm.collapsed['Symbol(latin)']).toBeTruthy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeFalsy()

    cmp.vm.collapseLanguage(Constants.LANG_LATIN)
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeFalsy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()

    cmp.vm.collapseLanguage(Constants.LANG_GREEK)
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeTruthy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeFalsy()
  })

  it('120 InflectionsBrowser - method expands language block on mount if it is given', () => {
    store.commit('app/setTestCurrentLanguageID', Constants.LANG_LATIN)

    let cmp = shallowMount(InflectionsBrowser, {
      store,
      localVue,
      mocks: api
    })
    
    
    expect(cmp.vm.collapsed['Symbol(latin)']).toBeFalsy()
    expect(cmp.vm.collapsed['Symbol(greek)']).toBeTruthy()
  })

})

