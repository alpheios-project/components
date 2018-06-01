/* eslint-env jest */
/* eslint-disable no-unused-vars */
import { shallowMount, mount } from '@vue/test-utils'
import Inflections from '@/vue-components/inflections.vue'

import L10n from '@/lib/l10n/l10n'
import Locales from '@/locales/locales'
import enUS from '@/locales/en-us/messages.json'
import enGB from '@/locales/en-gb/messages.json'

describe('tooltip.test.js', () => {
  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  it('1 Inflections - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(Inflections, {
      propsData: {
        data: {},
        locale: '',
        messages: {}
      }
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })
  it('2 Inflections - renders a vue instance (with data)', () => {
    let cmp = mount(Inflections, {
      propsData: {
        data: {},
        locale: l10n.messages
      }
    })

    expect(cmp.vm.isEnabled).toBeFalsy()
    let placeholder1 = cmp.findAll('.alpheios-inflections__placeholder').filter(w => w.text() === l10n.PLACEHOLDER_INFLECT_UNAVAILABLE).at(0)
    expect(placeholder1.element.style.display).not.toEqual('none')

    let placeholder2 = cmp.findAll('.alpheios-inflections__placeholder').filter(w => w.text() === l10n.PLACEHOLDER_INFLECT).at(0)
    expect(placeholder1.element.style.display).toEqual('none')

    expect(cmp.find('alpheios-inflections__content').element.style.display).toEqual('none')

    cmp.setProps({
      data: {
        enabled: true,
        inflectionData: []
      }
    })
  })
})
