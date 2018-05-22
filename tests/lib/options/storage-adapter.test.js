/* eslint-env jest */
import StorageAdapter from '../../../src/lib/options/storage-adapter'

describe('storage-adapter.test.js', () => {
  it('StorageAdapter constructor saves domain to params when created', () => {
    let stAdapter = new StorageAdapter('foo-domain-name')
    expect(stAdapter.domain).toEqual('foo-domain-name')
  })

  it('StorageAdapter constructor has default domain value - ', () => {
    let stAdapter = new StorageAdapter()
    expect(stAdapter.domain).toEqual('alpheios-storage-domain')
  })

  it('StorageAdapter get method will throw an error if will be invoked directly', () => {
    let stAdapter = new StorageAdapter()
    stAdapter.get().catch(function (error) {
      console.log('error.message', error.message)
      expect(error.message).toEqual(`Get method should be implemented in a subclass`)
    })
  })
  it('StorageAdapter set method will throw an error if will be invoked directly', () => {
    let stAdapter = new StorageAdapter()
    stAdapter.set().catch(function (error) {
      console.log('error.message', error.message)
      expect(error.message).toEqual(`Set method should be implemented in a subclass`)
    })
  })
})
