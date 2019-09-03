import Vuex from 'vuex'

import L10nModule from '@/vue/vuex-modules/data/l10n-module.js'
import Locales from '@/locales/locales.js'
import enUS from '@/locales/en-us/messages.json'
import enUSData from '@/locales/en-us/messages-data.json'
import enUSInfl from '@/locales/en-us/messages-inflections.json'
import enGB from '@/locales/en-gb/messages.json'

import Options from '@/lib/options/options.js'
import FeatureOptionDefaults from '@/settings/feature-options-defaults.json'
import LanguageOptionDefaults from '@/settings/language-options-defaults.json'
import UIOptionDefaults from '@/settings/ui-options-defaults.json'
import TempStorageArea from '@/lib/options/temp-storage-area.js'

import AuthModule from '@/vue/vuex-modules/data/auth-module.js'

import Platform from '@/lib/utility/platform.js'

export default class PopupTestHelp {
    static get defaultFeatureOptions () {
      let ta = new TempStorageArea('alpheios-feature-settings')
      return new Options(FeatureOptionDefaults, ta)
    }

    static get defaultResourceOptions () {
      let ta = new TempStorageArea('alpheios-resource-settings')
      return new Options(LanguageOptionDefaults, ta)
    }

    static get defaultUIOptions () {
      let ta = new TempStorageArea('alpheios-ui-settings')
      return new Options(UIOptionDefaults, ta)
    }

    static baseVuexStore () {
      return new Vuex.Store({
        modules: {
          popup: {
            namespaced: true,
            state: {
              visible: false
            },
            actions: {},
            getters: {},
            mutations: {
              setPopupVisible (state, value) {
                state.visible = value
              }
            }
          },
          panel: {
            namespaced: true,
            state: {
              visible: false,
              position: 'left',
              orientation: Platform.orientations.PORTRAIT
            },
            mutations: {
              setTestOrientation (state, value) {
                state.orientation = value
              },
              setTestPanelPosition (state, value) {
                state.position = value
              }
            },
            actions: {},
            getters: {}
          },
          app: {
            namespaced: true,
            state: {
              selectedText: '',
              languageName: '',
              languageCode: '',
              currentLanguageName: '',
              morphDataReady: false,
              homonymDataReady: false,
              shortDefUpdateTime: 0
            },
            mutations: {
              setTestCurrentLanguageName (state, value) {
                state.currentLanguageName = value
              },
              setTestMorphDataReady (state, value) {
                state.morphDataReady = value
              },
              setTestShortDefUpdateTime (state, value) {
                state.shortDefUpdateTime = value
              },
              setTestHomonymDataReady (state, value) {
                state.homonymDataReady = value
              }
            },
            getters: {
              shortDefDataReady: (state) => () => {
                return state.shortDefUpdateTime > 0
              }
            }
          },
          ui: {
            namespaced: true,
            state: {
              activeTab: 'info',
              rootClasses: [],
  
              messages: [],
              notification: {
                visible: false,
                important: false,
                showLanguageSwitcher: false,
                text: null
              }
            },
            mutations: {
              setTestCurrentTab (state, name) {
                state.activeTab = name
              }
            },
            getters: {
              isActiveTab: (state) => (tabName) => {
                return state.activeTab === tabName
              }
            }
          }
        }
      })
  
    }

    static uiAPI (props) {
      let defaultProps = {
        closePopup: () => {}
      }
      return Object.assign(defaultProps, props)
    }

    static settingsAPI (props) {
      let defaultProps = {
        getFeatureOptions: () => { return PopupTestHelp.defaultFeatureOptions },
        getResourceOptions: () => { return PopupTestHelp.defaultResourceOptions },
        getUiOptions: () => { return PopupTestHelp.defaultUIOptions },
        verboseMode: () => { return false }
      }
      return Object.assign(defaultProps, props)
    }

    static appAPI (props) {
      let defaultProps = {
        platform: {
          viewport: {
            width: 0,
            height: 0
          }
        },
        hasMorphData: () => false
      }
      return Object.assign(defaultProps, props)
    }

    static authModule (store, api) {
      return new AuthModule(store, api, { auth: null })
    }

    static l10nModule (store, api) {
      return new L10nModule(store, api, {
        defaultLocale: Locales.en_US,
        messageBundles: Locales.bundleArr([
          [enUS, Locales.en_US],
          [enUSData, Locales.en_US],
          [enUSInfl, Locales.en_US],
          [enGB, Locales.en_GB]
        ])
      })
    }
}
