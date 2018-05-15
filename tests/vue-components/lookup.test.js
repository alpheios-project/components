/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Lookup from '../../src/vue-components/lookup.vue'
import L10n from '../../src/lib/l10n/l10n'
import Locales from '../../src/locales/locales'
import enUS from '../../src/locales/en-us/messages.json'
import enGB from '../../src/locales/en-gb/messages.json'

describe('lookup.test.js', () => {
  let spy
  let cmp = mount(Lookup, {
    propsData: {
      uiController: {},
      preferredLanguage: {},
      lexicons: []
    }
  })

  let l10n = new L10n()
    .addMessages(enUS, Locales.en_US)
    .addMessages(enGB, Locales.en_GB)
    .setLocale(Locales.en_US)

  let cmpL10n = mount(Lookup, {
    propsData: {
      uiController: { l10n: l10n },
      preferredLanguage: {},
      lexicons: []
    }
  })

  it('If there is an empty uiController - error is thrown', () => {
    spy = jest.spyOn(console, 'error')
    mount(Lookup, {
      propsData: {
        uiController: null,
        preferredLanguage: {},
        lexicons: []
      }
    })
    // console.log('**********testing testCmp', cmp.find('.alpheios-lookup_form').html())
    expect(spy).toHaveBeenCalled()
  })

  it('There are three items - input, button, settings', () => {
    let input = cmp.find('.alpheios-lookup_form').find('.lookup_input')
    expect(input.is('input')).toBeTruthy()

    let button = cmp.find('.alpheios-lookup_form').find('.lookup_button')
    expect(button.is('button')).toBeTruthy()

    let settings = cmp.find('.alpheios-lookup_form').find('.alpheios-lookup__settings')
    expect(settings.is('div')).toBeTruthy()
  })

  it('There is a tooltip on the button with text', () => {
    let tooltiptext = cmp.find('.alpheios-lookup_form').find('.tooltiptext')
    expect(tooltiptext.is('span')).toBeTruthy()
    expect(tooltiptext.text().length).not.toEqual(0)
  })

  it('If there is an empty uiController - than there is a default label on the button', () => {
    expect(cmp.vm.buttonLabel).toEqual(cmp.vm.defaultButtonLabel)
  })

  it('If uiController has l10n property - than button label = LABEL_LOOKUP_BUTTON', () => {
    expect(cmpL10n.vm.buttonLabel).toEqual(l10n.messages.LABEL_LOOKUP_BUTTON)
  })

  it('If there is an empty uiController - than there is a tooltip label = defaultButtonLabel', () => {
    expect(cmp.vm.tooltipLabel).toEqual(cmp.vm.defaultButtonLabel)
  })

  it('If uiController has l10n property - than tooltip label = TOOLTIP_LOOKUP_BUTTON', () => {
    expect(cmpL10n.vm.tooltipLabel).toEqual(l10n.messages.TOOLTIP_LOOKUP_BUTTON)
  })

  it('If there is an empty uiController - than there is a default placeholder in input', () => {
    expect(cmp.vm.inputPlaceholder).toEqual(cmp.vm.defaultInputPlaceholder)
  })

  it('If uiController has l10n property - than input placeholder = PLACEHOLDER_LOOKUP_INPUT', () => {
    expect(cmpL10n.vm.tooltipLabel).toEqual(l10n.messages.PLACEHOLDER_LOOKUP_INPUT)
  })

  it('If there is an empty uiController - than there is a default label on the settings link', () => {
    expect(cmp.vm.labelSettings).toEqual(cmp.vm.deafultLabelSettings)
  })

  it('If uiController has l10n property - than input placeholder = PLACEHOLDER_LOOKUP_INPUT', () => {
    expect(cmpL10n.vm.labelSettings).toEqual(l10n.messages.LABEL_LOOKUP_SETTINGS)
  })
}) // Create a copy of the original component with full values
