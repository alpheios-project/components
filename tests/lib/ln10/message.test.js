/* eslint-env jest */
/* eslint-disable no-unused-vars */
import Message from '@/lib/l10n/message'
import MessageBundle from '@/lib/l10n/message-bundle'
import enUS from '@/locales/en-us/messages.json'
import Locales from '@/locales/locales'

describe('message.test.js', () => {
  it('1 Message - constructor has required properties Locale and messagesJSON', () => {
    expect(function () {
      let l = new Message(enUS['COOKIE_TEST_MESSAGE'], null)
      console.log(l)
    }).toThrowError('Locale data is missing')

    expect(function () {
      let l = new Message(null, Locales.en_US)
      console.log(l)
    }).toThrowError('Message data is missing')
  })

  it('2 Message - defineProperties adds format and get to Message if message has params', () => {
    let m = new Message(enUS['NUM_LINES_TEST_MESSAGE'], Locales.en_US)

    let mb = new MessageBundle(enUS, Locales.en_US)
    m.defineProperties(mb.messages, 'NUM_LINES_TEST_MESSAGE')

    expect(typeof mb.messages['NUM_LINES_TEST_MESSAGE']).toEqual('object')
    expect(mb.messages['NUM_LINES_TEST_MESSAGE'].get(10)).toEqual('There are 10 lines.')
    expect(mb.messages['NUM_LINES_TEST_MESSAGE'].get(1)).toEqual('There is one line.')
  })

  it('3 Message - defineProperties adds get to Message if message has no params', () => {
    let m = new Message(enUS['TOOLTIP_MOVE_PANEL_RIGHT'], Locales.en_US)

    let mb = new MessageBundle(enUS, Locales.en_US)

    m.defineProperties(mb.messages, 'TOOLTIP_MOVE_PANEL_RIGHT')
    expect(typeof mb.messages['TOOLTIP_MOVE_PANEL_RIGHT']).toEqual('string')
  })
})
