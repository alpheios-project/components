/* eslint-env jest */
import { mount } from '@vue/test-utils'
import Lookup from '../../src/vue-components/lookup.vue'
import UIController from '../../src/lib/controllers/ui-controller'

import State from '../../src/lib/controllers/ui-state'
import ContentOptionsfrom from '../../src/lib/options/content-options'
import ResourceOptions from '../../src/lib/options/resource-options'
import Template from '../../src/lib/controllers/template.htmlf'

describe('lookup.test.js', () => {
  let spy
  let state = new State()

  let optionSaver = function () {
    return new Promise((resolve, reject) => {
      reject(new Error('save not implemented'))
    })
  }

  let optionLoader = function () {
    return new Promise((resolve, reject) => {
      reject(new Error('load not implemented'))
    })
  }

  let options = new ContentOptionsfrom(optionSaver, optionLoader)
  let resourceOptions = new ResourceOptions(optionSaver, optionLoader)
  let manifest = { version: '1.0', name: 'Alpheios Embedded Library' }
  let template = { html: Template, panelId: 'alpheios-panel-embedded', popupId: 'alpheios-popup-embedded' }

  let uiController = new UIController(state, options, resourceOptions, manifest, template)

  it('If there is an empty uiController - error is thrown', () => {
    spy = jest.spyOn(console, 'error')

    mount(Lookup, {})
    expect(spy).toHaveBeenCalled()
  })

  it('If there is not empty uiController - the button with message LABEL_LOOKUP_BUTTON is rendered', () => {
    mount(Lookup, {
      propsData: {
        uiController: uiController
      }
    })
    // expect(cmp.find('.uk-button').text()).toEqual(uiController.l10.messages.LABEL_LOOKUP_BUTTON)
  })
}) // Create a copy of the original component with full values
