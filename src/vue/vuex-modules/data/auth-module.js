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
      userId: '',
      userNickName: '',
      isAuthenticated: false,
      notification: {
        visible: false,
        showLogin: false,
        count: 0,
        text: null
      }
    },
    mutations: {
      setIsAuthenticated: (state, profile) => {
        state.isAuthenticated = true
        state.userId = profile.sub
        state.userNickName = profile.nickname
      },
      setIsNotAuthenticated: (state) => {
        state.isAuthenticated = false
        state.userId = ''
        state.userNickName = ''
      },
      setNotification (state, data) {
        state.notification.visible = true
        state.notification.showLogin = data.showLogin || false
        state.notification.count = data.count || 0
        state.notification.text = data.text || data
      },
      resetNotification (state) {
        state.notification.visible = false
        state.notification.showLogin = false
        state.notification.text = null
        state.notification.count = 0
      }
    }
  }
}

AuthModule.api = (moduleInstance,store) => {
  return {
    authenticate: () => {
      store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_PROGRESS_MSG' })
      moduleInstance._auth.authenticate().then(() => {
        moduleInstance._auth.getProfileData().then((data) => {
          store.commit('auth/setIsAuthenticated',data)
          store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_SUCCESS_MSG' })
        }).catch((error) => {
          return store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_AUTH_FAILURE_MSG' })
        })
      }).catch((error) => {
          return store.commit(`auth/setNotification`, { text: 'AUTH_LOGIN_AUTH_FAILURE_MSG' })
      })
    },
    logout: () => {
      moduleInstance._auth.logout().then(() => {
        store.commit('auth/setIsNotAuthenticated')
        return store.commit(`auth/setNotification`, { text: 'AUTH_LOGOUT_SUCCESS_MSG' })
      }).catch((error) => {
        // TODO Not really sure what to do here
      })
    },
    getAccessToken: moduleInstance._auth.getUserData.bind(moduleInstance._auth)
  }
}

AuthModule._configDefaults = {
  _moduleName: 'auth',
  _moduleType: Module.types.DATA,
  _supportedPlatforms: [HTMLPage.platforms.ANY],
  auth: null
}

