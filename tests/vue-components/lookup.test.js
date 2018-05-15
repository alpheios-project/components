/* eslint-env jest */
import { shallow } from '@vue/test-utils'
import Lookup from '../../src/vue-components/lookup.vue'

describe('lookup.test.js', () => {
  let spy

  it('If there is an empty uiController - error is thrown', () => {
    spy = jest.spyOn(console, 'error')

    shallow(Lookup, {})
    expect(spy).toHaveBeenCalled()
  })
}) // Create a copy of the original component with full values
