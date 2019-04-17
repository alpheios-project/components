import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import ToolbarCompact from '@/vue/components/nav/toolbar-compact.vue'
import ToolbarLarge from '@/vue/components/nav/toolbar-large.vue'
import HTMLPage from '@/lib/utility/html-page.js'

// TODO: Add a check for required modules
export default class ToolbarModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))

    this._vi = new Vue({
      el: this.config.mountPoint,
      store: store, // Install store into the toolbar
      provide: api, // Public API of the modules for child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: api,
      components: {
        toolbarCompact: ToolbarCompact,
        toolbarLarge: ToolbarLarge
      }
    })
  }

  activate () {
    super.activate()
    // Open a toolbar on activation
    this._vi.$store.commit(`toolbar/open`)
  }

  deactivate () {
    super.deactivate()
    // Close a toolbar on deactivation
    this._vi.$store.commit(`toolbar/close`)
  }
}

ToolbarModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a toolbar is shown or hidden
      visible: false,
      // Choose compact or large layout from the value of the `platform` prop of a configuration object
      layout: moduleInstance.config.platform === HTMLPage.platforms.DESKTOP ? `toolbarLarge` : 'toolbarCompact'
    },
    mutations: {
      /**
       * Opens a toolbar
       * @param state
       */
      open (state) {
        state.visible = true
      },

      /**
       * Closes a toolbar
       * @param state
       */
      close (state) {
        state.visible = false
      }
    }
  }
}

ToolbarModule._configDefaults = {
  _moduleName: 'toolbar',
  _moduleType: Module.types.UI,
  _supportedPlatforms: [HTMLPage.platforms.DESKTOP, HTMLPage.platforms.MOBILE],
  // A selector that specifies to what DOM element a nav will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-toolbar'
}
