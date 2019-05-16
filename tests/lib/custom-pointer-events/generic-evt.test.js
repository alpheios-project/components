/* eslint-env jest */
/* eslint-disable no-unused-vars */

import GenericEvt from '@/lib/custom-pointer-events/generic-evt.js'

describe('generic-evt.test.js', () => {
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

  it('1 GenericEvt - constructor creates an object with element, evtType, evtHandler, boundListener', () => {
    let eventEl = new GenericEvt('fooElement', 'fooEvtHandler', 'fooEvtType')
    expect(eventEl.element).toEqual('fooElement')
    expect(eventEl.evtHandler).toEqual('fooEvtHandler')
    expect(eventEl.evtType).toEqual('fooEvtType')
    expect(eventEl.boundListener).toBeDefined()

    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')
  })

})