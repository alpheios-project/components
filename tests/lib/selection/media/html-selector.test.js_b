/* eslint-env jest */
/* eslint-disable no-unused-vars */
import HTMLSelector from '@/lib/selection/media/html-selector'
import TextSelector from '@/lib/selection/text-selector'
import { LanguageModelFactory as LMF } from 'alpheios-data-models'

describe('html-selector.test.js', () => {
  let testEventE = {
    target: {
      ownerDocument: {
        location: { href: 'http://localhost:8888/demo/' }
      }
    }
  }
  document.createRange = function () { return { selectNode: function () {} } }

  let testEventF = {
    target: {
      ownerDocument: {
        location: { href: 'http://localhost:8888/demo/' },
        querySelector: function (key) { return key },
        getSelection: function () {
          return {
            anchorNode: { data: 'mare' },
            focusNode: { }
          }
        }
      },
      dataset: {},
      clientX: 10,
      clientY: 20,
      getAttribute: function () { return 'lat' }
    }
  }

  it('1 HTMLSelector - constructor should have event argument with target.ownerDocument.querySelector, target.dataset.alpheios_tb_ref, target.dataset.alpheios_align_ref', () => {
    let testError = new TypeError('this.target.ownerDocument.querySelector is not a function')
    expect(function () {
      let l = new HTMLSelector(testEventE)
      console.log(l.text)
    }).toThrowError(testError)
  })

  it('2 HTMLSelector - constructor fills targetRect properties, ', () => {
    let testHTMLEvent = new HTMLSelector(testEventF)

    expect(testHTMLEvent.targetRect.top).toEqual(testEventF.clientY)
    expect(testHTMLEvent.targetRect.left).toEqual(testEventF.clientX)
    expect(testHTMLEvent.wordSeparator).toBeDefined()
  })

  it('3 HTMLSelector - createTextSelector method creates TextSelector object, executes getSelection ', () => {
    let testHTMLEvent = new HTMLSelector(testEventF)

    let spy1 = jest.spyOn(HTMLSelector, 'getSelection')
    jest.spyOn(testHTMLEvent, 'getLanguageCodeFromSource')

    let res = testHTMLEvent.createTextSelector()
    expect(res.constructor.name).toEqual('TextSelector')

    expect(res.text).toEqual('mare') // testEventF.target.ownerDocument.getSelection().anchorNode.data
    expect(res.location).toEqual('http://localhost:8888/demo/') // testEventF.target.ownerDocument.location
    expect(spy1).toHaveBeenCalled()
    expect(testHTMLEvent.getLanguageCodeFromSource).toHaveBeenCalled()

    expect(res.languageID).toEqual(LMF.getLanguageIdFromCode('lat')) // testEventF.getAttribute()
  })

  it('4 HTMLSelector - getLanguageCodeFromSource method returns languageCode from testEventF.getAttribute() ', () => {
    let testHTMLEvent = new HTMLSelector(testEventF)
    expect(testHTMLEvent.getLanguageCodeFromSource()).toEqual('lat')
  })

  it('5 HTMLSelector - getLanguageCodeFromSource method returns languageCode from closest block if there is no lang in getAttribute ', () => {
    let curTestEvent = Object.assign({}, testEventF)
    curTestEvent.target.getAttribute = function () { return null }

    curTestEvent.target.closest = function () { return { getAttribute: function () { return 'grc' } } }
    let testHTMLEvent = new HTMLSelector(curTestEvent)

    expect(testHTMLEvent.getLanguageCodeFromSource()).toEqual('grc')
  })

  it('6 HTMLSelector - getLanguageCodeFromSource method returns undefined if there is no getAttribute in target and there is no closest with lang attribute', () => {
    let curTestEvent = Object.assign({}, testEventF)
    curTestEvent.target.getAttribute = function () { return null }

    curTestEvent.target.closest = function () { return null }
    let testHTMLEvent = new HTMLSelector(curTestEvent)

    expect(testHTMLEvent.getLanguageCodeFromSource()).toBeNull()
  })

  it('7 HTMLSelector - getSelection method executes target.ownerDocument.getSelection and if getSelection returns null then console warns', () => {
    jest.spyOn(console, 'warn')
    let res = HTMLSelector.getSelection({ ownerDocument: { getSelection: function () { return null } } })

    expect(console.warn).toHaveBeenCalledWith(`Cannot get selection from a document`)
    expect(res).toBeNull()

    let res1 = HTMLSelector.getSelection({ ownerDocument: { getSelection: function () { return 'test' } } })
    expect(res1).toEqual('test')
  })

  it('8 HTMLSelector - doSpaceSeparatedWordSelection method reload data to TextElement from selection, word is the last from anchorNode (focusNode.data is null', () => {
    let curTestEvent = Object.assign({}, testEventF)
    curTestEvent.target.ownerDocument.getSelection = function () {
      return {
        anchorNode: { data: 'bene text data' },
        focusNode: { data: null },
        removeAllRanges: function () { return null },
        addRange: function () { return null }
      }
    }

    let testHTMLEvent = new HTMLSelector(curTestEvent)
    let testTextElement = TextSelector.createObjectFromText('mare', LMF.getLanguageIdFromCode('lat'))

    let res = testHTMLEvent.doSpaceSeparatedWordSelection(testTextElement)
    expect(res.text).toEqual('data')
  })

  it('9 HTMLSelector - doSpaceSeparatedWordSelection method - if ancorNode.data is not similiar to focusNode data, then word would be taken from textContent', () => {
    let curTestEvent = Object.assign({}, testEventF)
    curTestEvent.target.ownerDocument.getSelection = function () {
      return {
        anchorNode: { data: 'bene test' },
        focusNode: { data: 'caelise' },
        removeAllRanges: function () { return null },
        addRange: function () { return null },
        setBaseAndExtent: function () { return null }
      }
    }
    curTestEvent.target.textContent = 'mare'

    let testHTMLEvent = new HTMLSelector(curTestEvent)
    let testTextElement = TextSelector.createObjectFromText('bene', LMF.getLanguageIdFromCode('lat'))

    let res = testHTMLEvent.doSpaceSeparatedWordSelection(testTextElement)
    expect(res.text).toEqual('mare')
  })

  it('10 HTMLSelector - getDumpHTMLSelector returns emptyObject', () => {
    let res = HTMLSelector.getDumpHTMLSelector()
    expect(res.targetRect).toEqual({top: 0, left: 0})
  })
})
