import Module from '@/vue/vuex-modules/module.js'
import Platform from '@/lib/utility/platform.js'

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
    console.info('LexicCs module was created')
    this.createIframe()
    console.info('The frame has been created')
    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)
  }

  createIframe () {
    const iframe = document.createElement('iframe')
    iframe.id = this.config.iframeId
    iframe.style.display = 'none'
    iframe.src = this.config.serverUrl
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
    getIframeId: () => {
      return moduleInstance.config.iframeId
    },
    getServerUrl: () => {
      return moduleInstance.config.serverUrl
    }
  }
}

Lexis._configDefaults = {
  _moduleName: 'lexis',
  _moduleType: Module.types.DATA,
  _supportedDeviceTypes: [Platform.deviceTypes.ANY],
  serverUrl: 'http://data-dev.alpheios.net',
  iframeId: 'alpheios-lexis-cs'
}
