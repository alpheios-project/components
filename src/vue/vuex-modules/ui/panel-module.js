import Vue from 'vue/dist/vue' // Vue in a runtime + compiler configuration
import Module from '@/vue/vuex-modules/module.js'
import LargePanel from '@/vue/components/panel-large.vue'
import CompactPanel from '@/vue/components/panel-compact.vue'
import Platform from '@/lib/utility/platform.js'

// TODO: Add a check for required modules
export default class PanelModule extends Module {
  constructor (store, api, config) {
    super(store, api, config)
    console.info('Panel module constructor')

    store.registerModule(this.constructor.moduleName, this.constructor.store(this))
    console.info('Panel module constructor, store module has been registered')

    console.log(`Panel's Vue instance creation started`)
    console.time(`Panel's Vue instance creation`)
    this._vi = new Vue({
      el: this.config.mountPoint,
      store: store, // Install store into the panel
      provide: api, // Public API of the modules for child components
      /*
      Since this is a root component and we cannot claim APIs with `inject`
      let's assign APIs to a custom prop to have access to it
       */
      api: api,
      components: {
        largePanel: LargePanel, // A desktop version of a panel
        compactPanel: CompactPanel // A mobile version of a panel
      }
    })
    console.log(`Panel's Vue instance creation ended`)
    console.timeEnd(`Panel's Vue instance creation`)

    Platform.evt.ORIENTATION_CHANGE.sub(() => {
      this._vi.$store.commit('panel/setOrientation', this.config.platform.simpleOrientation)
    })
    console.info('Panel module constructor ended')
  }
}

PanelModule.store = (moduleInstance) => {
  return {
    // All stores of modules are namespaced
    namespaced: true,

    state: {
      // Whether a panel is shown or hidden
      visible: false,
      // Choose mobile or desktop layout from the value of the `platform` prop of a configuration object
      layout: moduleInstance.config.platform.isDesktop ? `largePanel` : 'compactPanel',
      // Where a panel is located. Possible values are `left` or `right`.
      position: 'left',
      // Device orientation
      orientation: moduleInstance.config.platform.simpleOrientation,
      // An ID of the last opened footnote. Required for the modal footnote popup mode on mobile
      visibleFootnoteId: false
    },
    mutations: {
      /**
       * Opens a panel
       * @param state
       */
      open (state) {
        state.visible = true
      },

      /**
       * Closes a panel
       * @param state
       */
      close (state) {
        state.visible = false
      },

      setPanelLayout (state, layout) {
        state.layout = layout
      },

      setPosition (state, position) {
        state.position = position
      },

      setOrientation (state, orientation) {
        state.orientation = orientation
      },

      setVisibleFootnote (state, id) {
        state.visibleFootnoteId = id
      }
    }
  }
}

PanelModule._configDefaults = {
  _moduleName: 'panel',
  _moduleType: Module.types.UI,
  _supportedDeviceTypes: [Platform.deviceTypes.DESKTOP, Platform.deviceTypes.MOBILE],
  // A selector that specifies to what DOM element a panel will be mounted.
  // This element will be replaced with the root element of the panel component.
  mountPoint: '#alpheios-panel'
}
