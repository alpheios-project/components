/* eslint-env jest */
import { shallow } from '@vue/test-utils'
import InflectionAttribute from '../../src/vue-components/infl-attribute.vue'

describe('infl-attribute.test.js', () => {
  let cmp
  beforeEach(() => {
    cmp = shallow(InflectionAttribute, {
      propsData: {
        data: {},
        type: '',
        linkedfeatures: ['declension']
      }

    })
  })

  it('expects attributeClass method to obey linkedfeatures', () => {
    expect(cmp.vm.attributeClass('declension')).toEqual('alpheios-morph__linkedattr')
    expect(cmp.vm.attributeClass('gender')).toEqual('alpheios-morph__attr')
  })

  it('expects attributeClass method to append extra classes', () => {
    expect(cmp.vm.attributeClass('declension', ['mockclass'])).toEqual('alpheios-morph__linkedattr mockclass')
  })

  it('expects sendFeature to emit sendfeature', () => {
    let mockFeature = { type: 'declension', value: '1st' }
    cmp.vm.sendFeature([mockFeature])
    expect(cmp.emitted('sendfeature')).toBeTruthy()
    expect(cmp.emitted('sendfeature')[0]).toEqual([mockFeature])
  })

  it('expects decorators to be applied', () => {
    cmp.vm.decorators = ['appendtype']
    let mockData = {
      'footype': {
        value: 'foo',
        toLocaleStringAbbr: () => { return 'f' }
      }
    }
    expect(cmp.vm.decorate(mockData, 'footype')).toEqual('foo footype')
    cmp.vm.decorators = ['appendtype', 'parenthesize']
    expect(cmp.vm.decorate(mockData, 'footype')).toEqual('(foo footype)')
    cmp.vm.decorators = ['brackets']
    expect(cmp.vm.decorate(mockData, 'footype')).toEqual('[foo]')
    cmp.vm.decorators = ['abbreviate']
    expect(cmp.vm.decorate(mockData, 'footype')).toEqual('f')
    cmp.vm.decorators = ['abbreviate', 'parenthesize']
    expect(cmp.vm.decorate(mockData, 'footype')).toEqual('(f)')
  })
})
