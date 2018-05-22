/* eslint-env jest */
import DefaultsLoader from '../../../src/lib/options/defaults-loader'

describe('deafults-loader.test.js', () => {
  it('DefaultsLoader has fromJSON static method', () => {
    expect(typeof DefaultsLoader.fromJSON).toBe('function')
  })

  it('DefaultsLoader fromJSON method parses JSON string', () => {
    let res = DefaultsLoader.fromJSON('["panelPosition", "preferredLanguage"]')
    expect(Array.isArray(res)).toBeTruthy()
    expect(res[0]).toEqual('panelPosition')
    expect(res[1]).toEqual('preferredLanguage')
  })

  it('DefaultsLoader fromJSON method write console error if string is not a valid JSON', () => {
    let spy = jest.spyOn(console, 'error')
    DefaultsLoader.fromJSON(['panelPosition', 'preferredLanguage'])
    expect(spy).toBeCalled()
  })
})
