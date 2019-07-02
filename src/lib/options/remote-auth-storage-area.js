import StorageAdapter from './storage-adapter.js'
import axios from 'axios'

/**
 * An implementation of a StorageAdapter interface for a local storage.
 */
export default class RemoteAuthStorageArea extends StorageAdapter {
  constructor (domain = 'alpheios-storage-domain', auth=null) {
    super(domain)
    this.baseURL = auth.endpoints.usersettings,
    this.requestContext = {
      headers: {
        common: {
          Authorization: 'bearer ' + auth.accessToken,
          'Content-Type': 'application/json'
        }
      }
    }
  }
  /**
   * A proxy for the Alpheios user-settings-api
   * It allows for storing key/value pairs to the api with an authorized user account
   * @param {object} keysObject - An object containing one or more key/value pairs to be stored in storage.
   * If a particular item already exists, its value will be updated.
   * @return {Promise} - A promise that is resolved with with a void value if all key/value pairs are stored
   * successfully. If at least on save operation fails, returns a rejected promise with an error information.
   */
  async set (keysObject) {
    try {
      let [key, value] = Object.entries(keysObject)[0]
      let url  = `${this.baseURL}/${key}`
      let result = await axios.post(url, value, this.requestContext)
      if (result.status !== 201) {
        console.error(`Unexpected result status from settings api: ${result.status}`)
      }
    } catch (error) {
      console.error("Unable to store settings",error)
    }
  }

  /**
   * A proxy for the Alpheios user-settings-api
   * It allows for getting key/value pairs from the api with an authorized user account
   * @param {string | Array | object | null | undefined } keys - A key (string)
   * or keys (an array of strings or an object) to identify the item(s) to be retrieved from storage.
   * If you pass an empty string, object or array here, an empty object will be retrieved. If you pass null,
   * or an undefined value, the entire storage contents will be retrieved.
   * @return {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  async get () {
    let url  = `${this.baseURL}?domain=${this.domain}`
    let data = {}
    try {
      let result = await axios.get(url, this.requestContext)
      if (result.status === 200) {
        data = result.data
      } else {
        console.error(`Unexpected result status from settings api: ${result.status}`)
      }
    } catch(error) {
      console.error("Unable to retrieve settings",error)
    }
    return data
  }

  async clearAll () {
    try {
      let url  = `${this.baseURL}?domain=${this.domain}`
      let result = await axios.delete(url,this.requestContext)
      if (result.status !== 200) {
        console.error("Unable to clear settings ",error)
      }
    } catch (error) {
      console.error("Unable to clear settings",error)
    }
  }
}
