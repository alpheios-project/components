export default class OptionItem {
  constructor (item, key, saveFunc) {
    for (const key of Object.keys(item)) {
      this[key] = item[key]
    }
    this.currentValue = this.defaultValue
    this.name = key
    this.saveFunc = saveFunc
  }

  textValues () {
    return this.values.map(value => value.text)
  }

  currentTextValue () {
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

  setValue (value) {
    this.currentValue = value
    this.saveFunc(this.name, this.currentValue)
    return this
  }

  setTextValue (textValue) {
    this.currentValue = []
    for (let value of this.values) {
      if (this.multiValue) {
        for (let tv of textValue) {
          if (value.text === tv) { this.currentValue.push(value.value) }
        }
      } else {
        if (value.text === textValue) { this.currentValue = value.value }
      }
    }
    this.saveFunc(this.name, this.currentValue)
    return this
  }
}
