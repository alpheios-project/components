import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'
import {
  MessagingService, WindowIframeDestination as Destination, CedictDestinationConfig as CedictConfig,
  RequestMessage
} from 'alpheios-lexis-cs'

export default class Lexis extends Module {
  // defaultLocale = Locales.en_US, messageBundles = []

  /**
   * @param {object} store - A Vuex store.
   * @param {object} api - A public API object.
   * @param {object} config - A module's configuration object:
   *        {string} defaultLocale - A default locale's code.
   */
  constructor (store, api, config = {}) {
    super(store, api, config)
    // Add an iframe with CEDICT service
    this.createIframe()
    // Create a messaging service with CEDICT destination
    this._messagingService = new MessagingService(new Destination(CedictConfig))

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)
  }

  createIframe () {
    const iframe = document.createElement('iframe')
    iframe.id = CedictConfig.targetIframeID
    iframe.style.display = 'none'
    iframe.src = CedictConfig.targetURL
    document.body.appendChild(iframe)
  }
}

Lexis.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
    },
    mutations: {
    }
  }
}

Lexis.api = (moduleInstance, store) => {
  return {
    // TODO: Shall probably move this to data models
    characterForms: {
      SIMPLIFIED: 'simplified',
      TRADITIONAL: 'traditional'
    },

    /**
     * Sends a request to the CEDICT service.
     *
     * @param {object} requestBody - A bode of the message to CEDICT.
     * @returns {Promise<object>|Promise<Error>} - A promise that is resolved with either a body
     *          of the response message, if request was successful, or is rejected with the error info.
     */
    sendRequest: (requestBody) => {
      return new Promise((resolve, reject) => {
        moduleInstance._messagingService.sendRequestTo(Destination.config.CEDICT.name, new RequestMessage(requestBody))
          .then(responseMessage => resolve(responseMessage.body))
          .catch(error => reject(error))
      })
    },

    getWords: (words, characterForm) => {
      const requestBody = {
        getWords: {
          words: words,
          characterForm: characterForm
        }
      }
      return new Promise((resolve, reject) => {
        moduleInstance._messagingService.sendRequestTo(Destination.config.CEDICT.name, new RequestMessage(requestBody))
          .then(responseMessage => resolve(responseMessage.body))
          .catch(error => reject(error))
      })
    }
  }
}

Lexis._configDefaults = {
  _moduleName: 'lexis',
  _moduleType: Module.types.DATA,
  _supportedDeviceTypes: [Platform.deviceTypes.ANY]
}
