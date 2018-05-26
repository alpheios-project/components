/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Grammar from '../../src/vue-components/grammar.vue'

describe('grammar.test.js', () => {
  let cmp1

  it('1 Grammar - if res is not defined then a error will be thrown', () => {
    expect(function () {
      let cmp = mount(Grammar)
      console.log(cmp.vm.res)
    }).toThrow(new TypeError(`Cannot read property 'url' of undefined`))
  })

  it('2 Grammar - contains iframe tag with url from res prop', () => {
    let cmp = mount(Grammar, {
      propsData: {
        res: {
          url: 'testurl.com',
          provider: 'test provider'
        }
      }
    })
    expect(cmp.find('iframe')).toBeTruthy()
    expect(cmp.find('iframe').vnode.elm.getAttribute('src')).toEqual('testurl.com')
    expect(cmp.find('.alpheios-grammar__provider').text()).toEqual('test provider')
  })
})
