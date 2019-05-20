/* eslint-env jest */
/* eslint-disable no-unused-vars */

import HTMLSelector from '@/lib/selection/media/html-selector'
import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'
import { Constants, TextQuoteSelector } from 'alpheios-data-models'

describe('html-selector.test.js', () => {
  // console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  let eventEl
  beforeAll(() => {
    let testElement = document.createElement("p")
    let node = document.createTextNode("a bene placito")
    testElement.appendChild(node)
    document.body.appendChild(testElement)

    testElement.ownerDocument.getSelection = jest.fn(() => {
      return {
        anchorNode: {
          data: 'a bene placito'
        },
        anchorOffset: 7,
        focusNode: {
          data: 'a bene placito'
        },
        focusOffset: 14,
        focusNode: {
          data: 'a bene placito'
        },
        baseNode: {
          data: 'a bene placito'
        },
        extentNode: {
          data: 'a bene placito'
        },
        baseOffset: 14,
        extentOffset: 14,
        setBaseAndExtent: () => {},
        removeAllRanges: () => {},
        addRange: () => {}
      }
    })

    document.caretRangeFromPoint = jest.fn(() => {
      return {
        commonAncestorContainer: testElement,
        startContainer: testElement,
        endContainer: testElement,
        startOffset: 10,
        endOffset: 10
      }
    })

    document.createRange = jest.fn(() => {
      return {
        commonAncestorContainer: testElement,
        startContainer: testElement,
        endContainer: testElement,
        startOffset: 13,
        endOffset: 13,
        setStart: () => {},
        setEnd: () => {}
      }
    })

    let evtHandler = jest.fn(() => {})
    eventEl = new MouseDblClick(testElement, evtHandler)
    eventEl.start.client = { x:72, y:480 }
    eventEl.end.client = { x:72, y:480 }
    eventEl.end.target = testElement
  }),
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

  it('1 HTMLSelector - constructor creates an object with event, target, targetRect, location, languageID, wordSeparator', () => {
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    
    expect(htmlSel.event).toEqual(eventEl)
    expect(htmlSel.target).toEqual(eventEl.end.target)
    expect(htmlSel.targetRect).toEqual({
      top: eventEl.start.client.y,
      left: eventEl.start.client.x
    })
    expect(htmlSel.languageID).toEqual(Constants.LANG_LATIN)
    expect(htmlSel.wordSeparator).toBeInstanceOf(Map)
  })

  it('2 HTMLSelector - static getSelector creates HTMLSelector from given event and languageCode and returns textSelector', () => {
    let textSel = HTMLSelector.getSelector(eventEl, 'lat')
    expect(textSel.text).toEqual('placito')
    expect(textSel.languageID).toEqual(Constants.LANG_LATIN)
    expect(textSel.start).toEqual(7)
    expect(textSel.end).toEqual(14)
    expect(textSel.textQuoteSelector).toBeInstanceOf(TextQuoteSelector)
  })

  it('3 HTMLSelector - createTextSelector methods returns textSelector from HTMLSelector', () => {
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    let textSel = htmlSel.createTextSelector()

    expect(textSel.text).toEqual('placito')
    expect(textSel.languageID).toEqual(Constants.LANG_LATIN)
    expect(textSel.start).toEqual(7)
    expect(textSel.end).toEqual(14)
    expect(textSel.textQuoteSelector).toBeInstanceOf(TextQuoteSelector)
  })

  it('4 HTMLSelector - createSelectionFromPoint methods returns range from the selection (used variant with document.caretRangeFromPoint)', () => {
    let range = HTMLSelector.createSelectionFromPoint(72, 480)
    expect(document.caretRangeFromPoint).toHaveBeenCalled()
    expect(document.createRange).toHaveBeenCalled()
    expect(document.getSelection).toHaveBeenCalled()

    expect(range).toBeDefined()
  })
  
})