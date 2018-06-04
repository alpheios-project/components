/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Treebank from '@/vue-components/treebank.vue'

describe('treebank.test.js', () => {
  it('1 Treebank - renders a vue instance (min requirements)', () => {
    let cmp = mount(Treebank, {
      propsData: {
        res: {},
        messages: {},
        locale: {},
        visible: false
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Treebank - renders with src', () => {
    let cmp = mount(Treebank, {
      propsData: {
        res: {
          word: {
            src: 'http/example.com/SENTENCE/WORD',
            ref: 'foo1-foo2'
          }
        },
        messages: {},
        locale: {},
        visible: false
      }
    })

    cmp.setProps({
      visible: true
    })
    expect(cmp.vm.srcUrl).toEqual('http/example.com/foo1/foo2')

    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/foo1/foo2')
    cmp.setProps({
      visible: false,
      res: {
        page: {
          src: 'http/example.com/foo3/foo4'
        }
      }
    })

    cmp.setProps({
      visible: true
    })
    expect(cmp.vm.srcUrl).toEqual('http/example.com/foo3/foo4')

    expect(cmp.find('iframe').attributes().src).toEqual('http/example.com/foo3/foo4')
  })
})