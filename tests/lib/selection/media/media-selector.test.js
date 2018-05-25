/* eslint-env jest */
import MediaSelector from '@/lib/selection/media/media-selector'

describe('media-selector.test.js', () => {
  let testEvent = {
    target: {
      ownerDocument: {
        location: { href: 'http://localhost:8888/demo/' }
      }
    }
  }

  it('1 MediaSelector - constructor should have event argument with target', () => {
    let testError = new TypeError('Cannot read property \'ownerDocument\' of undefined')
    expect(function () {
      let l = new MediaSelector({})
      console.log(l.text)
    }).toThrowError(testError)
  })

  it('2 MediaSelector - constructor saves target and location from arguments', () => {
    let testMSelector = new MediaSelector(testEvent)

    expect(testMSelector.target).toEqual(testEvent.target)
    expect(testMSelector.location).toEqual('http://localhost:8888/demo/')
  })

  it('3 MediaSelector - getSelector and getLanguageCodeFromSource method returned undefined', () => {
    let testMSelector = new MediaSelector(testEvent)

    expect(MediaSelector.getSelector()).toBeUndefined()
    expect(testMSelector.getLanguageCodeFromSource()).toBeUndefined()
  })

  it('4 MediaSelector - getLanguageCode returns langCode from arguments', () => {
    let testMSelector = new MediaSelector(testEvent)

    expect(testMSelector.getLanguageCode('lat')).toEqual('lat')
    expect(testMSelector.getLanguageCode()).toBeUndefined()
    expect(testMSelector.getLanguageCode('latdef')).toEqual('latdef')
  })
})
