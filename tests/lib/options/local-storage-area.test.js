/* eslint-env jest */
import LocalStorageArea from '../../../src/lib/options/local-storage-area'

describe('options-item.test.js', () => {
  let stAdapter = new LocalStorageArea('alpheios-content-options')
  window.localStorage = {
    values: {},
    getItem: function (key) {
      return this.values[key]
    },
    setItem: function (key, value) {
      this.values[key] = value
    }
  }

  it('LocalStorageArea has a get method that executes getItem of window.localStorage', async (done) => {
    let spySt = jest.spyOn(window.localStorage, 'getItem')
    await stAdapter.get()
    expect(spySt).toBeCalled()
    done()
  })

  it('LocalStorageArea get method executes console.log if window.localStorage doesn\'t have keys', async (done) => {
    let spy = jest.spyOn(console, 'log')
    await stAdapter.get()
    expect(spy).toBeCalled()
    done()
  })

  it('LocalStorageArea get method retrieves values for all keys from the window.localStorage if keys = undefined', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-keys': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    let res = await stAdapter.get()
    expect(res.panelPosition).toEqual('left')
    expect(res.preferredLanguage).toEqual('lat')
    done()
  })

  it('LocalStorageArea get method retrieves a value by a given key from the window.localStorage if a key(string)', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-keys': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    let res = await stAdapter.get('panelPosition')
    // console.log('**************res', window.localStorage.getItem('alpheios-content-options-keys'), res)
    expect(res).toEqual({ panelPosition: 'left' })
    done()
  })

  it('LocalStorageArea get method retrieves a values by given keys form passed object from the window.localStorage if a key(object)', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-keys': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    let res = await stAdapter.get({ panelPosition: true })
    // console.log('**************res', window.localStorage.getItem('alpheios-content-options-keys'), res)
    expect(res).toEqual({ panelPosition: 'left' })
    done()
  })

  it('LocalStorageArea get method retrieves values for all keys from the window.localStorage if keys = []', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-keys': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    let res = await stAdapter.get([])
    // console.log('**************res', window.localStorage.getItem('alpheios-content-options-keys'), res)
    expect(res.panelPosition).toEqual('left')
    expect(res.preferredLanguage).toEqual('lat')
    done()
  })

  it('LocalStorageArea get method retrieves values for all keys from the window.localStorage if keys is something unexpected (Number)', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-keys': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    let res = await stAdapter.get(5)
    // console.log('**************res', window.localStorage.getItem('alpheios-content-options-keys'), res)
    expect(res.panelPosition).toEqual('left')
    expect(res.preferredLanguage).toEqual('lat')
    done()
  })

  it('LocalStorageArea has set method that executes setItem of window.localStorage', async (done) => {
    let spySt = jest.spyOn(window.localStorage, 'setItem')
    await stAdapter.set({ foo: 'bar' })
    expect(spySt).toBeCalled()
    done()
  })

  it('LocalStorageArea set method add a new value to the window.localStorage if there is no such key in it', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-key': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    await stAdapter.set({ foo: 'bar' })
    expect(window.localStorage.values.foo).toEqual('bar')
    done()
  })

  it('LocalStorageArea set method update existed value at the window.localStorage if there is such key in it', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-keys': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    await stAdapter.set({ panelPosition: 'top' })
    expect(window.localStorage.values.panelPosition).toEqual('top')
    done()
  })

  it('LocalStorageArea set method could save values from a given array', async (done) => {
    window.localStorage.values = {
      'alpheios-content-options-keys': '["panelPosition","preferredLanguage"]',
      panelPosition: 'left',
      preferredLanguage: 'lat'
    }
    await stAdapter.set({ panelPosition: 'top', preferredLanguage: 'grc', foo: 'bar' })
    expect(window.localStorage.values.panelPosition).toEqual('top')
    expect(window.localStorage.values.preferredLanguage).toEqual('grc')
    expect(window.localStorage.values.foo).toEqual('bar')
    done()
  })
})
