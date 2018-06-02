/* eslint-env jest */
/* eslint-disable no-unused-vars */
import MessageBundle from '@/lib/l10n/message-bundle'
import enUS from '@/locales/en-us/messages.json'
import Locales from '@/locales/locales'

console.error = function () {
  let arg = arguments[0].toString()
  console.warn('error - ', arg)
}

describe('message-bundle.test.js', () => {
  it('1 MessageBundle - constructor has required properties Locale and messagesJSON', () => {
    expect(function () {
      let l = new MessageBundle(enUS, null)
      console.log(l)
    }).toThrowError('Locale data is missing')

    expect(function () {
      let l = new MessageBundle(null, Locales.en_US)
      console.log(l)
    }).toThrowError('Message data is missing')
  })

  it('2 MessageBundle - get method returns message by id', () => {
    let mb = new MessageBundle(enUS, Locales.en_US)
    mb['COOKIE_TEST_MESSAGE'].defineProperties(mb.messages, Locales.en_US)

    expect(mb.get('COOKIE_TEST_MESSAGE')).toEqual(mb['COOKIE_TEST_MESSAGE'])

    expect(mb.get('FOO_BAR_TEST')).toEqual(`Not in translation data: "${'FOO_BAR_TEST'}"`)
  })
})
