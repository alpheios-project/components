/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Tooltip from '@/vue-components/tooltip.vue'

describe('tooltip.test.js', () => {
  it('1 Tooltip - renders a vue instance (min requirements)', () => {
    let cmp = mount(Tooltip, {
      propsData: {
        tooltipText: ''
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Tooltip - renders a vue instance (min requirements)', () => {
    let cmp = mount(Tooltip, {
      propsData: {
        tooltipText: 'foo tooltip'
      }
    })

    expect(cmp.find('.tooltiptext').text()).toEqual('foo tooltip')
    expect(cmp.vm.tooltipDirection).toEqual('bottom')
    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom': true })

    cmp.setProps({
      tooltipDirection: 'top'
    })

    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top': true })

    cmp.setProps({
      tooltipDirection: 'foo value'
    })

    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-bottom': true })

    cmp.setProps({
      tooltipDirection: 'TOP'
    })

    expect(cmp.vm.directionClass).toEqual({ 'alph_tooltip-top': true })

    cmp.setProps({
      additionalStyles: { color: 'red' }
    })

    expect(cmp.find('.tooltiptext').element.style.color).toEqual('red')
  })
})
