/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import WordForms from '@/vue-components/wordforms.vue'

describe('panel.test.js', () => {
  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

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
  })

  it('2 WordForms - check required props', () => {
    let cmp = mount(WordForms)

    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "partOfSpeech"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "targetWord"'))
    expect(console.error).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "lexemes"'))
  })

})