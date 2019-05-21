/* eslint-env jest */
/* eslint-disable no-unused-vars */

import HTMLSelector from '@/lib/selection/media/html-selector'
import MouseDblClick from '@/lib/custom-pointer-events/mouse-dbl-click.js'
import { Constants, TextQuoteSelector } from 'alpheios-data-models'

describe('html-selector.test.js', () => {
  // console.error = function () {}
  console.log = function () {}
  console.warn = function () {}
  
  let eventEl, testElement, parentElement
  beforeAll(() => {
    testElement = document.createElement("p")
    let node = document.createTextNode("a bene placito")
    testElement.appendChild(node)

    parentElement = document.createElement("div")
    parentElement.appendChild(testElement)
    document.body.appendChild(parentElement)

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

  it('4 HTMLSelector - createSelectionFromPoint method returns range from the selection (used variant with document.caretRangeFromPoint)', () => {
    let range = HTMLSelector.createSelectionFromPoint(72, 480)
    expect(document.caretRangeFromPoint).toHaveBeenCalled()
    expect(document.createRange).toHaveBeenCalled()
    expect(document.getSelection).toHaveBeenCalled()

    expect(range).toBeDefined()
  })

  it('5 HTMLSelector - setDataAttributes method adds treebank properties to the selection if an element has data-alpheios_tb_src properties and data-alpheios_tb_ref', () => {
    let alpheios_tb_ref = 'phi0959.phi006.alpheios-text-lat1#1-2'
    let alpheios_tb_src = 'http://alpheios.net/alpheios-treebanks/DOC.html?chunk=SENTENCE&w=WORD'

    testElement.setAttribute('data-alpheios_tb_ref', alpheios_tb_ref)
    testElement.setAttribute('data-alpheios_tb_src', alpheios_tb_src)
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    htmlSel.setDataAttributes()

    expect(htmlSel.data.treebank).toBeDefined()
    expect(htmlSel.data.treebank.word.src).toEqual(alpheios_tb_src)
    expect(htmlSel.data.treebank.word.ref).toEqual(alpheios_tb_ref)

    testElement.removeAttribute('data-alpheios_tb_ref')
    testElement.removeAttribute('data-alpheios_tb_src')
  })

  it('6 HTMLSelector - setDataAttributes method doesn\'t add treebank properties to the selection if an element has not data-alpheios_tb_src properties or data-alpheios_tb_ref', () => {
    let alpheios_tb_ref = 'phi0959.phi006.alpheios-text-lat1#1-2'
    let alpheios_tb_src = 'http://alpheios.net/alpheios-treebanks/DOC.html?chunk=SENTENCE&w=WORD'

    testElement.setAttribute('data-alpheios_tb_ref', alpheios_tb_ref)

    let htmlSel1 = new HTMLSelector(eventEl, 'lat')
    htmlSel1.setDataAttributes()
    expect(htmlSel1.data.treebank).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_tb_ref')

    testElement.setAttribute('data-alpheios_tb_src', alpheios_tb_src)
    let htmlSel2 = new HTMLSelector(eventEl, 'lat')
    htmlSel2.setDataAttributes()
    expect(htmlSel2.data.treebank).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_tb_src')
  })

  it('7 HTMLSelector - setDataAttributes method adds alignment properties to the selection if an element has data-alpheios_align_src properties and data-alpheios_align_ref', () => {
    let alpheios_align_ref = '#aligned-eng span[data-alpheios_align_word=\'s7\']'
    let alpheios_align_src = 'fooSrc'

    testElement.setAttribute('data-alpheios_align_src', alpheios_align_src)
    testElement.setAttribute('data-alpheios_align_ref', alpheios_align_ref)
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    htmlSel.setDataAttributes()

    expect(htmlSel.data.translation).toBeDefined()
    expect(htmlSel.data.translation.src).toEqual(alpheios_align_src)
    expect(htmlSel.data.translation.ref).toEqual(alpheios_align_ref)

    testElement.removeAttribute('data-alpheios_align_src')
    testElement.removeAttribute('data-alpheios_align_ref')
  })

  it('8 HTMLSelector - setDataAttributes method doesn\'t add alignment properties to the selection if an element has not data-alpheios_align_src properties or data-alpheios_align_ref', () => {
    let alpheios_align_ref = '#aligned-eng span[data-alpheios_align_word=\'s7\']'
    let alpheios_align_src = 'fooSrc'

    testElement.setAttribute('data-alpheios_align_ref', alpheios_align_ref)

    let htmlSel1 = new HTMLSelector(eventEl, 'lat')
    htmlSel1.setDataAttributes()
    expect(htmlSel1.data.translation).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_align_ref')

    testElement.setAttribute('data-alpheios_align_src', alpheios_align_src)
    let htmlSel2 = new HTMLSelector(eventEl, 'lat')
    htmlSel2.setDataAttributes()
    expect(htmlSel2.data.translation).not.toBeDefined()
    testElement.removeAttribute('data-alpheios_align_src')
  })

  it('9 HTMLSelector - getLanguageCodeFromSource method returns lang if element has lang property', () => {
    testElement.setAttribute('xml:lang', 'grc')
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    let langCode = htmlSel.getLanguageCodeFromSource()
    expect(langCode).toEqual('grc')
    testElement.removeAttribute('xml:lang')
  })

  it('10 HTMLSelector - getLanguageCodeFromSource method returns lang if element has no lang property, but parent has', () => {
    parentElement.setAttribute('xml:lang', 'gez')
    let htmlSel = new HTMLSelector(eventEl, 'lat')
    let langCode = htmlSel.getLanguageCodeFromSource()
    expect(langCode).toEqual('gez')
  })
  
  it('11 HTMLSelector - static getSelection method executes getSelection of the ownerDocument ', () => {
    HTMLSelector.getSelection(testElement)
    expect(testElement.ownerDocument.getSelection).toHaveBeenCalled()
  })


  
})