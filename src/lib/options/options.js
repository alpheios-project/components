export default class Options {
  /**
   * Options is a class which encapsulates defaults and user preferences
   * @param {Object} defaults - defauts for the instance of the class
   * @param {Function} loader - An async function with no arguments. Returns a promise
   * that is resolved with an object. Each property in this object corresponds to a single option.
   * Property name is a key, and property value is an option value.
   * @param {Function} saver - An async function that takes option is an argument
   * and returns a promise.
   */
  constructor (defaults, loader, saver) {
    this.items = this.initItems(defaults.items)
    this.loader = loader
    this.saver = saver
  }

  initItem (item, key) {
    let instance = this
    item.currentValue = item.defaultValue
    item.name = key
    item.textValues = function () {
      return this.values.map(value => value.text)
    }
    item.currentTextValue = function () {
      let currentTextValue = []
      for (let value of this.values) {
        if (this.multiValue) {
          if (this.currentValue.includes(value.value)) { currentTextValue.push(value.text) }
        } else {
          if (value.value === this.currentValue) {
            currentTextValue = value.text
          }
        }
      }
      return currentTextValue
    }
    item.setValue = function (value) {
      item.currentValue = value
      instance.save(item.name, item.currentValue)
      return this
    }
    item.setTextValue = function (textValue) {
      item.currentValue = []
      for (let value of item.values) {
        if (this.multiValue) {
          for (let tv of textValue) {
            if (value.text === tv) { item.currentValue.push(value.value) }
          }
        } else {
          if (value.text === textValue) { item.currentValue = value.value }
        }
      }
      instance.save(item.name, item.currentValue)
      return this
    }
  }

  initItems (defaults) {
    let items = {}
    for (let [option, value] of Object.entries(defaults)) {
      if (value.group) {
        items[option] = []
        for (let [key, item] of Object.entries(value.group)) {
          this.initItem(item, `${option}-${key}`)
          items[option].push(item)
        }
      } else {
        this.initItem(value, option)
        items[option] = value
      }
    }
    return items
  }

  get names () {
    return Object.keys(this.items)
  }

  /**
   * Will always return a resolved promise.
   */
  load (callbackFunc) {
    this.loader().then(
      values => {
        for (let key in values) {
          if (this.items.hasOwnProperty(key)) {
            let value
            try {
              value = JSON.parse(values[key])
            } catch (e) {
              // backwards compatibility
              value = values[key]
            }
            this.items[key].currentValue = value
          } else {
            let keyinfo = this.parseKey(key)
            if (this.items.hasOwnProperty(keyinfo.setting)) {
              this.items[keyinfo.setting].forEach((f) => {
                if (f.name === key) {
                  try {
                    f.currentValue = JSON.parse(values[key])
                  } catch (e) {
                    // backwards compatibility
                    f.currentValue = values[key]
                  }
                }
              })
            }
          }
        }
        callbackFunc(this)
      },
      error => {
        console.error(`Cannot retrieve options for Alpheios extension from a local storage: ${error}. Default values
          will be used instead`)
        callbackFunc(this)
      }
    )
  }

  /**
  * Parse a stored setting name into its component parts
  * (for simplicity of the data structure, setting names are stored under
  * keys which combine the setting and the language)
  */
  parseKey (name) {
    let [setting, group] = name.split('-', 2)
    return {
      setting: setting,
      group: group
    }
  }

  save (optionName, optionValue) {
    // Update value in the local storage
    let option = {}
    option[optionName] = JSON.stringify(optionValue)

    this.saver(option).then(
      () => {
        // Options storage succeeded
        console.log(`Value "${optionValue}" of "${optionName}" option value was stored successfully`)
      },
      (errorMessage) => {
        console.error(`Storage of an option value failed: ${errorMessage}`)
      }
    )
  }
}
