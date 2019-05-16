/* eslint-env jest */
/* eslint-disable no-unused-vars */

import PointerEvt from '@/lib/custom-pointer-events/pointer-evt.js'

describe('pointer-evt.test.js', () => {
  // console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('1 PointerEvt - constructor creates an object with tracking, start, end', () => {
    let eventEl = new PointerEvt()
    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')
  })

})