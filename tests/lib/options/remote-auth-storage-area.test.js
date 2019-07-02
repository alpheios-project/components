/* eslint-env jest */
import RemoteAuthStorageArea from '@/lib/options/remote-auth-storage-area'
// import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration

describe('local-storage-area.test.js', () => {
  let auth
  beforeAll(() => {
    auth  = {
      accessToken: process.env.AUTH_TOKEN,
      endpoints: {
        usersettings: process.env.ENDPOINT
      }
    }
  })
  beforeEach(() => {
  })
  afterEach(() => {
    jest.resetModules()
  })
  afterAll(() => {
    jest.clearAllMocks()
  })

  it('gets user settings', async() => {
    let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
    let res = await stAdapter.get()
    expect(res).toEqual({})
  })

  it('sets user settings', async() => {
    let stAdapter = new RemoteAuthStorageArea('alpheios-feature-settings',auth)
    await stAdapter.set({'alpheios-feature-settings__2__mode': JSON.stringify('verbose')})
    let res = await stAdapter.get()
    expect(res).toEqual({'alpheios-feature-settings__2__mode': JSON.stringify('verbose')})
    await stAdapter.clearAll()
    res = await stAdapter.get()
    expect(res).toEqual({})

  })
})
