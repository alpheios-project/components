import Module from '@/vue/vuex-modules/module.js'
import HTMLPage from '@/lib/utility/html-page.js'

export default class AuthModule extends Module {
  /**
   * @param {Object} config - A module's configuration object.
   *        {Object} auth - A background or app authenticator object.
   */
  constructor (store, api, config) {
    super(store, api, config)
    this._auth = this.config.auth
    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    api[this.constructor.moduleName] = this.constructor.api(this, store)
  }
}

AuthModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      userName: '',
      userNickName: '',
      isAuthenticated: false,
      message: ''
    },
    mutations: {
      setMessage: (state, message) => {
        state.message = message
      },
      setIsAuthenticated: (state, profile) => {
        state.isAuthenticated = true
        state.userName = profile.name
        state.userNickName = profile.nickname
        state.message = 'AUTH_LOG_IN_SUCCESS_MSG'
      },
      setIsNotAuthenticated: (state,message) => {
        state.isAuthenticated = false
        state.userName = ''
        state.userNickName = ''
        state.message =  message
      }
    }
  }
}

AuthModule.api = (moduleInstance,store) => {
  return {
    authenticate: () => {
      store.commit('auth/setMessage', 'AUTH_LOG_IN_PROGRESS_MSG')
      moduleInstance._auth.authenticate().then(() => {
        moduleInstance._auth.getProfileData().then((data) => {
          store.commit('auth/setIsAuthenticated', data)
        }).catch((error) => {

        })
      }).catch((error) => {
        return store.commit('auth/setIsNotAuthenticated','AUTH_LOG_IN_AUTH_FAILURE_MSG')
      })
    },
    logout: () => {
      moduleInstance._auth.logout().then(() => {
        return store.commit('auth/setIsNotAuthenticated','AUTH_LOG_OUT_SUCCESS_MSG')
      }).catch((error) => {
        // TODO Not really sure what to do here
      })
    },
    getMsg: () => {
      let message = store.state.auth.message
      setTimeout(() => {
        store.commit('auth/setMessage','')
      },10000)
      return message
    },
    getAccessToken: () => {}
  }
}

AuthModule._configDefaults = {
  _moduleName: 'auth',
  _moduleType: Module.types.DATA,
  _supportedPlatforms: [HTMLPage.platforms.ANY],
  auth: null
}
