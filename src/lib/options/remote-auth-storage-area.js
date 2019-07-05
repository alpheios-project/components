import StorageAdapter from './storage-adapter.js'
import axios from 'axios'

/**
 * An implementation of the StorageAdapterinterface that retrieves
 * data from an authentication-protected remote service implementing
 * the Alpheios user-settings-api.
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
    let [key, value] = Object.entries(keysObject)[0]
    let url  = `${this.baseURL}/${key}`
    let result = await axios.post(url, value, this.requestContext)
    if (result.status !== 201) {
      throw new Error(`Unexpected result status from settings api: ${result.status}`)
    }
  }

  /**
   * proxy for the Alpheios user-settings-api LIST operation
   * Retrieves all data for the storage domain.
   * @return {Promise} A Promise that will be fulfilled with a results object containing key-value pairs
   * found in the storage area. If this operation failed, the promise will be rejected with an error message.
   */
  async get () {
    let url  = `${this.baseURL}?domain=${this.domain}`
    let result = await axios.get(url, this.requestContext)
    if (result.status === 200) {
      return result.data
    } else {
      throw new Error(`Unexpected result status from settings api: ${result.status}`)
    }
  }

  /**
   * proxy for the Alpheios user-settings DELETE LIST operation
   * deletes all settings for the domain from storage
   * @return {Promise} A Promise that executes the operation.
   */
  async clearAll () {
    let url  = `${this.baseURL}?domain=${this.domain}`
    let result = await axios.delete(url,this.requestContext)
    if (result.status !== 200) {
      throw new Error(`Unexpected result status from settings api: ${result.status}`)
    }
  }
}
