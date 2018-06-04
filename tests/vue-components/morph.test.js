/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Morph from '@/vue-components/morph.vue'
import MorphInner from '@/vue-components/morph-inner-v1.vue'

describe('morph.test.js', () => {
  it('1 Morph - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Morph, {
      propsData: {
        lexemes: []
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Morph - render with children components (min requirements)', () => {
    let cmp = mount(Morph, {
      propsData: {
        lexemes: []
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()

    expect(cmp.find(MorphInner).exists()).toBeFalsy()
  })

  it('3 Morph - check required props', () => {
    let spy = jest.spyOn(console, 'error')
    let cmp = mount(Morph)

    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "lexemes"'))
    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "morphDataReady"'))
    spy.mockReset()
  })
})
