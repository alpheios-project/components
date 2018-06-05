/* eslint-env jest */
/* eslint-disable no-unused-vars */
import MessageBundle from '@/lib/l10n/message-bundle'
import enUS from '@/locales/en-us/messages.json'
import Locales from '@/locales/locales'

describe('message-bundle.test.js', () => {
  console.error = function () {}
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
  /*
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
*/
  it('2 MessageBundle - get method returns message by id', () => {
    let mb = new MessageBundle(enUS, Locales.en_US)
    // mb['COOKIE_TEST_MESSAGE'].defineProperties(mb.messages, 'COOKIE_TEST_MESSAGE')
    // mb['TEXT_NOTICE_DEFSDATA_NOTFOUND'].defineProperties(mb.messages, 'TEXT_NOTICE_DEFSDATA_NOTFOUND')

    // expect(mb.get('COOKIE_TEST_MESSAGE')).toEqual(mb['COOKIE_TEST_MESSAGE'])

    // expect(mb.get('FOO_BAR_TEST')).toEqual(`Not in translation data: "FOO_BAR_TEST"`)

    console.info('*****************test', mb['COOKIE_TEST_MESSAGE'], mb.messages['COOKIE_TEST_MESSAGE'])

    console.info('*****************test', mb['TEXT_NOTICE_DEFSDATA_NOTFOUND'], mb.messages['TEXT_NOTICE_DEFSDATA_NOTFOUND'])

    // mb['TEXT_NOTICE_DEFSDATA_NOTFOUND'].defineProperties(mb.messages, 'TEXT_NOTICE_DEFSDATA_NOTFOUND')

    expect(mb.get('TEXT_NOTICE_DEFSDATA_NOTFOUND', {requestType: 'Short def', word: 'foo'})).toEqual('Short def request failed. Lemma not found for: "foo"')
  })
})
