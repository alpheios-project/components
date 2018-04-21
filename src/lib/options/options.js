import OptionItem from './options-item.js'

export default class Options {
  /**
   * Options is a class which encapsulates defaults and user preferences
   * @param {Object} defaults - defaults for the instance of the class
   * @param {Function<StorageAdapter>} StorageAdapter - A storage adapter implementation
   */
  constructor (defaults, StorageAdapter) {
    if (!defaults || !defaults.domain || !defaults.items) {
      throw new Error(`Defaults have no obligatory "domain" and "items" properties`)
    }
    if (!StorageAdapter) {
      throw new Error(`No storage adapter implementation provided`)
    }
    for (const key of Object.keys(defaults)) {
      this[key] = defaults[key]
    }
    this.items = this.initItems(this.items)
    this.storageAdapter = new StorageAdapter(defaults.domain)
  }

  initItems (defaults) {
    let items = {}
    for (let [option, value] of Object.entries(defaults)) {
      if (value.group) {
        items[option] = []
        for (let [key, item] of Object.entries(value.group)) {
          let newItem = new OptionItem(item, `${option}-${key}`, this.save.bind(this))
          items[option].push(newItem)
        }
      } else {
        let newItem = new OptionItem(value, option, this.save.bind(this))
        items[option] = newItem
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
    this.storageAdapter.get().then(
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

    this.storageAdapter.set(option).then(
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
