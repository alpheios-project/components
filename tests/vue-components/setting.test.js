/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { mount } from '@vue/test-utils'
import Setting from '../../src/vue-components/setting.vue'

describe('setting.test.js', () => {
  it('1 Setting - renders a vue instance (min requirements)', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {}
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 Setting - renders a vue instance (with data)', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          labelText: 'foolabel',
          textValues: function () { return [ { text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' } ] },
          currentTextValue: function () { return { text: 'footext1', value: 'foovalue1' } }
        }
      }
    })

    expect(cmp.vm.selected).toEqual({ text: 'footext1', value: 'foovalue1' })
    expect(cmp.findAll('select').length).toEqual(1)
    expect(cmp.findAll('select option').length).toEqual(2)
  })

  it('3 Setting - renders a vue instance (with data)', () => {
    let cmp = mount(Setting, {
      propsData: {
        data: {
          labelText: 'foolabel',
          multiValue: true,
          textValues: function () { return [ { text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' } ] },
          currentTextValue: function () { return [{ text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' }] }
        }
      }
    })

    expect(cmp.vm.selected).toEqual([{ text: 'footext1', value: 'foovalue1' }, { text: 'footext2', value: 'foovalue2' }])
    expect(cmp.find('select').attributes().multiple).toBeTruthy()
  })

  it('4 Setting - check required props', () => {
    let spy = jest.spyOn(console, 'error')
    let cmp = mount(Setting)

    expect(spy).toBeCalledWith(expect.stringContaining('[Vue warn]: Missing required prop: "data"'))
    spy.mockReset()
  })
})
