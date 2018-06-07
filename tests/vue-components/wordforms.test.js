/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import WordForms from '@/vue-components/wordforms.vue'
import {LanguageModelFactory as LMF} from 'alpheios-data-models'

describe('wordforms.test.js', () => {
  /*
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
*/
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 WordForms - renders a vue instance (min requirements)', () => {
    let cmp = mount(WordForms, {
      propsData: {}
    })
    expect(cmp.isVueInstance()).toBeTruthy()
    expect(cmp.vm.forms).toBeUndefined()
  })

  it('2 WordForms - check required props', () => {
    let cmp = mount(WordForms)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "partOfSpeech"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "targetWord"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "inflections"'))
  })

  it('3 WordForms - render (LTR)', () => {
    let langID = LMF.getLanguageIdFromCode('grc')
    let langModel = LMF.getLanguageModel(langID)

    let cmp = mount(WordForms, {
      propsData: {
        partOfSpeech: 'noun',
        targetWord: 'fooWord',
        inflections: [
          {
            'part of speech': { values: ['noun'] },
            model: langModel,
            prefix: 'fooPrefix',
            stem: 'fooStem',
            suffix: 'fooSuffix'
          }
        ]
      }
    })

    expect(cmp.vm.forms).toEqual(['fooPrefix - fooStem - fooSuffix'])

    cmp.setProps({
      inflections: [
        {
          'part of speech': { values: ['noun'] },
          model: langModel,
          stem: 'fooStem',
          suffix: 'fooSuffix'
        }
      ]
    })

    expect(cmp.vm.forms).toEqual(['fooStem - fooSuffix'])

    cmp.setProps({
      inflections: [
        {
          'part of speech': { values: ['noun'] },
          model: langModel,
          prefix: 'fooPrefix',
          stem: 'fooStem'
        }
      ]
    })

    expect(cmp.vm.forms).toEqual(['fooPrefix - fooStem'])
  })

  it('4 WordForms - render (RTL)', () => {
    let langID = LMF.getLanguageIdFromCode('ara')
    let langModel = LMF.getLanguageModel(langID)

    let cmp = mount(WordForms, {
      propsData: {
        partOfSpeech: 'noun',
        targetWord: 'fooWord',
        inflections: [
          {
            'part of speech': { values: ['noun'] },
            model: langModel,
            prefix: 'fooPrefix',
            stem: 'fooStem',
            suffix: 'fooSuffix'
          }
        ]
      }
    })

    expect(cmp.vm.forms).toEqual(['fooSuffix - fooStem - fooPrefix'])

    cmp.setProps({
      inflections: [
        {
          'part of speech': { values: ['noun'] },
          model: langModel,
          stem: 'fooStem',
          suffix: 'fooSuffix'
        }
      ]
    })

    expect(cmp.vm.forms).toEqual(['fooSuffix - fooStem'])

    cmp.setProps({
      inflections: [
        {
          'part of speech': { values: ['noun'] },
          model: langModel,
          prefix: 'fooPrefix',
          stem: 'fooStem'
        }
      ]
    })

    expect(cmp.vm.forms).toEqual(['fooStem - fooPrefix'])
  })

  it('5 WordForms - render (no part of speach)', () => {
    let langID = LMF.getLanguageIdFromCode('ara')
    let langModel = LMF.getLanguageModel(langID)

    let cmp = mount(WordForms, {
      propsData: {
        partOfSpeech: 'noun',
        targetWord: 'fooWord',
        inflections: [
          {
            'part of speech': { values: ['verb'] },
            model: langModel,
            prefix: 'fooPrefix',
            stem: 'fooStem',
            suffix: 'fooSuffix'
          }
        ]
      }
    })

    expect(cmp.vm.forms).toEqual([])
  })
})
