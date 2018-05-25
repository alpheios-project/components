/* eslint-env jest */
import Query from '@/lib/queries/query'
import LexicalQuery from '@/lib/queries/lexical-query'
import LexicalQueryLookup from '@/lib/queries/lexical-query-lookup'

describe('query.test.js', () => {
  let mockSelector = {
    location: 'http://example.org',
    languageCode: 'lat'
  }

  // let uiController = {
  //   updateLanguage: function () { }
  // }
  it('1 Query - A new Query return object with name, ID and active properties', () => {
    let query = new Query('foo')

    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('Query')
    expect(query.ID.length).toBeGreaterThan(0)
    expect(query.name).toEqual('foo')
    expect(query.active).toBeTruthy()
  })

  it('2 Query - Constructor creates object, saves to queries Map and destroys from it ', () => {
    let query = Query.create(LexicalQueryLookup, mockSelector, {})
    expect(typeof query).toEqual('object')
    expect(query.constructor.name).toEqual('LexicalQueryLookup')

    let queries = query.getQueries()
    expect(Object.keys(queries).length).toEqual(1)
    expect(queries['LexicalQueryLookup']).toBeDefined()

    Query.create(LexicalQuery, mockSelector, {})
    expect(Object.keys(queries).length).toEqual(2)
    expect(queries['LexicalQuery']).toBeDefined()

    Query.create(LexicalQuery, mockSelector, {})
    expect(Object.keys(queries).length).toEqual(2)

    Query.destroy(query)

    expect(Object(queries['LexicalQueryLookup']).keys.length).toEqual(0)
  })

  it('3 Query - Deactivate method makes query active = false ', () => {
    let query = Query.create(LexicalQueryLookup, mockSelector, {})
    query.active = true
    query.deactivate()
    expect(query.active).toBeFalsy()
  })

  it('4 Query - IsPromise method checks promise type', () => {
    let emptyPromise = new Promise((resolve, reject) => {})
    expect(Query.isPromise(emptyPromise)).toBeTruthy()
    expect(Query.isPromise('foo')).toBeFalsy()
  })

  it('5 Query - Trying to execute direct getData throws a warn in console', () => {
    let query = new Query('foo')
    let spy = jest.spyOn(console, 'warn')
    query.getData()
    expect(spy).toBeCalled()
  })

  it('6 Query - Trying to execute finalize throws an Error and a warn in console', () => {
    let query = new Query('foo')
    let spy = jest.spyOn(console, 'warn')
    expect(spy).toBeCalled()
    expect(query.finalize).toThrowError(Error)
  })
})
