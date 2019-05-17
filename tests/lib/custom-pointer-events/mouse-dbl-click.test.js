/* eslint-env jest */
/* eslint-disable no-unused-vars */

import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'

describe('mouse-dbl-click.test.js', () => {
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

  it('1 MouseDblClick - constructor creates an object with tracking, start, end', () => {
    let testElement = document.createElement("div")
    let evtHandler = jest.fn(() => {})

    let eventEl = new MouseDblClick(testElement, evtHandler)

    expect(eventEl.tracking).toBeFalsy()
    expect(eventEl.start.constructor.name).toEqual('EventElement')
    expect(eventEl.end.constructor.name).toEqual('EventElement')

    expect(eventEl.evtType).toEqual('dblclick')
    expect(eventEl.element).toEqual(testElement)
    expect(eventEl.evtHandler).toEqual(evtHandler)
  })

  it('2 MouseDblClick - static excludeCpeTest checks if DOMStringMap has alphExcludeDblClickCpe', () => {
    let testElement = document.createElement("div")
    let node = document.createTextNode("Test new div")
    testElement.appendChild(node)
    
    expect(MouseDblClick.excludeCpeTest(testElement.dataset)).toBeFalsy()
    testElement.setAttribute('data-alph-exclude-dbl-click-cpe', 'yes')
    
    expect(MouseDblClick.excludeCpeTest(testElement.dataset)).toBeTruthy()
  })

})