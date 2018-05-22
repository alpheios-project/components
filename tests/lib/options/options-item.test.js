/* eslint-env jest */
import OptionItem from '../../../src/lib/options/options-item'

describe('options-item.test.js', () => {
  let values = [
    { text: 'Latin', value: 'lat' },
    { text: 'Greek', value: 'grc' },
    { text: 'Arabic', value: 'ara' },
    { text: 'Persian', value: 'per' }
  ]

  let item = {
    defaultValue: 'lat',
    values: values
  }

  let emptyPromise = () => { return new Promise((resolve, reject) => {}) }
  let stAdapter = { domain: 'alpheios-content-options', set: emptyPromise }

  it('Item are required properties and will throw error if undefined', () => {
    expect(function () {
      let l = new OptionItem()
      console.log(l)
    }).toThrow(new Error(`Item cannot be empty`))
  })

  it('Key are required properties and will throw error if undefined', () => {
    expect(function () {
      let l = new OptionItem(true)
      console.log(l)
    }).toThrow(new Error(`Key cannot be empty`))
  })

  it('StorageAdapter are required properties and will throw error if undefined', () => {
    expect(function () {
      let l = new OptionItem(true, true)
      console.log(l)
    }).toThrow(new Error(`Storage adapter object should be provided`))
  })

  it('OptionItem has textValues method and return a modified array of values', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)

    let res = newOptionItem.textValues()

    expect(res.length).toEqual(4)
    expect(typeof res[0]).toEqual('string')
    expect(res[0]).toEqual('Latin')
  })

  it('OptionItem has currentTextValue method and return value according to default text', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    newOptionItem.setValue('grc')
    expect(newOptionItem.currentTextValue()).toEqual('Greek')
  })

  it('If OptionItem is multiValue then currentTextValue will return the array', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    newOptionItem.multiValue = true

    newOptionItem.setValue(['lat', 'grc'])
    expect(newOptionItem.currentTextValue()).toEqual(['Latin', 'Greek'])
  })

  it('OptionItem has addValue method and it pushs element to value', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    expect(newOptionItem.values.length).toEqual(4)
    newOptionItem.addValue({ text: 'Foo', value: 'foo' })
    expect(newOptionItem.values.length).toEqual(5)
  })

  it('OptionItem has setValue method and it changes currentValue and inits save method', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)

    let spy = jest.spyOn(newOptionItem, 'save')
    newOptionItem.setValue('ara')

    expect(newOptionItem.currentValue).toEqual('ara')
    expect(spy).toBeCalled()
  })

  it('OptionItem has setTextValue method and it changes currentValue and inits save method', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)

    let spy = jest.spyOn(newOptionItem, 'save')
    newOptionItem.setTextValue('Persian')

    expect(newOptionItem.currentValue).toEqual('per')
    expect(spy).toBeCalled()
  })

  it('If OptionItem is multiValue then setTextValue save the array', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    newOptionItem.multiValue = true

    newOptionItem.setTextValue(['Latin', 'Greek'])
    expect(newOptionItem.currentValue).toEqual(['lat', 'grc'])
  })

  it('OptionItem has save method and it inits set method of StorageAdapter', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    let spy = jest.spyOn(stAdapter, 'set')
    newOptionItem.save()
    expect(spy).toBeCalled()
  })

  it('OptionItem has cloneObject method and it returns a new OptionItem object', () => {
    let newOptionItem = new OptionItem(item, 'preferredLanguage', stAdapter)
    let clonedObj = newOptionItem.cloneObject()
    expect(typeof clonedObj).toEqual('object')
    expect(clonedObj.constructor.name).toEqual('OptionItem')
  })
})
