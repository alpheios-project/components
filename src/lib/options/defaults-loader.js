export default class DefaultsLoader {
  static fromJSON (jsonString) {
    try {
      console.log('**********jsonString', jsonString)
      return JSON.parse(jsonString)
    } catch (err) {
      console.error(`Unable to parse JSON options string:`, err)
      return {}
    }
  }
}
