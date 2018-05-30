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

    expect(cmp.find(MorphInner).exists()).toBeTruthy()

    cmp.find(MorphInner).vm.$emit('sendfeature')

    expect(cmp.emitted()['sendfeature']).toBeTruthy()
  })
})
