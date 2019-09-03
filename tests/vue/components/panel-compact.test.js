/* eslint-env jest */
/* eslint-disable no-unused-vars */

import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import PopupTestHelp from '@tests/helpclasses/popup-test-help'

import PanelCompact from '@/vue/components/panel-compact.vue'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue'

import Platform from '@/lib/utility/platform.js'

describe('panel-compact.test.js', () => {
  const localVue = createLocalVue()
  localVue.use(Vuex)

  console.error = function () {}
  console.log = function () {}
  console.warn = function () {}

  let store
  let api = {}
  let defaultData

  beforeEach(() => {
    jest.spyOn(console, 'error')
    jest.spyOn(console, 'log')
    jest.spyOn(console, 'warn')

    defaultData = { moduleConfig: {} }
        
    store = PopupTestHelp.baseVuexStore()

    api = {
      ui: PopupTestHelp.uiAPI(),
      settings: PopupTestHelp.settingsAPI(),
      app: PopupTestHelp.appAPI()
    }

    PopupTestHelp.authModule(store, api)
    PopupTestHelp.l10nModule(store, api)

  })

  function timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  it('1 PanelCompact - renders a vue instance (min requirements)', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })
    expect(cmp.isVueInstance()).toBeTruthy()
  })

  it('2 PanelCompact - computed currentTab returns active tab from store.ui', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })
    expect(store.state.ui.activeTab).toEqual('info')
    expect(cmp.vm.currentTab).toEqual('info')
  })

  it('3 PanelCompact - computed showMainTabIcons checks if show main icons (for some tabs and showNav in moduleConfig is true)', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return {
          moduleConfig: {
            showNav: false
          }
        }
      },
      store,
      localVue,
      mocks: api
    })
    
    expect(cmp.vm.showMainTabIcons).toBeFalsy()

    store.commit('ui/setTestCurrentTab', 'info')
    cmp.setData({ moduleConfig: { showNav: true } })

    expect(cmp.vm.showMainTabIcons).toBeFalsy()

    store.commit('ui/setTestCurrentTab', 'morphology')
    expect(cmp.vm.showMainTabIcons).toBeTruthy()
  })

  it('4 PanelCompact - computed showMorphologyIcon returns true if morph data is ready and current tab is grammar, also showNav is not disabled', () => {
    let api = {
        ui: PopupTestHelp.uiAPI(),
        settings: PopupTestHelp.settingsAPI(),
        app: PopupTestHelp.appAPI({
          hasMorphData: () => false
        })
      }
    PopupTestHelp.authModule(store, api)
    PopupTestHelp.l10nModule(store, api)

    let cmp = shallowMount(PanelCompact, {
      data () {
        return {
          moduleConfig: {
            showNav: false
          }
        }
      },
      store,
      localVue,
      mocks: api
    })
    
    store.commit('ui/setTestCurrentTab', 'info')
    store.commit('app/setTestMorphDataReady', false)

    expect(cmp.vm.showMorphologyIcon).toBeFalsy()
    
    //all obligatory properties -> true

    cmp.setData({ moduleConfig: { showNav: true } })
    store.commit('ui/setTestCurrentTab', 'grammar')
    store.commit('app/setTestMorphDataReady', true)
    api.app.hasMorphData = () => true

    expect(cmp.vm.showMorphologyIcon).toBeTruthy()

    //will fail one property by one - not correct tab

    cmp.setData({ moduleConfig: { showNav: false } })
    store.commit('ui/setTestCurrentTab', 'morphology')
    expect(cmp.vm.showMorphologyIcon).toBeFalsy()

    //will fail one property by one - morphData is not ready

    cmp.setData({ moduleConfig: { showNav: true } })
    store.commit('ui/setTestCurrentTab', 'grammar')
    store.commit('app/setTestMorphDataReady', false)
    expect(cmp.vm.showMorphologyIcon).toBeFalsy()

    //will fail one property by one - morphData is ready but there are no morphData

    store.commit('app/setTestMorphDataReady', true)
    api.app.hasMorphData = () => false
    expect(cmp.vm.showMorphologyIcon).toBeFalsy()
  })

  it('5 PanelCompact - computed rootClasses returns empty array if it is not expanded and not landscape', () => {
    Object.assign(defaultData, {
      expanded: false
    })

    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isLandscape: () => false
      }
    })

    expect(cmp.vm.rootClasses.length).toEqual(0)
  })

  it('6 PanelCompact - computed rootClasses has expanded if it is expanded and class for landscape', () => {
    Object.assign(defaultData, {
      expanded: true
    })

    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isLandscape: () => true
      }
    })

    expect(cmp.vm.rootClasses.includes('alpheios-panel--left')).toBeTruthy()
    expect(cmp.vm.rootClasses.includes('alpheios-panel--expanded')).toBeTruthy()
  })

  it('7 PanelCompact - computed componentStyles returns zIndex', () => {
    let api = {
      ui: PopupTestHelp.uiAPI({
        zIndex: 10
      }),
      settings: PopupTestHelp.settingsAPI(),
      app: PopupTestHelp.appAPI()
    }
    
    PopupTestHelp.authModule(store, api)
    PopupTestHelp.l10nModule(store, api)

    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    expect(cmp.vm.componentStyles).toEqual({ zIndex: 20 })
  })

  it('8 PanelCompact - computed isLandscape checks oriention and expanded', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })
    
    // it is portrait and not expanded
    store.commit('panel/setTestOrientation', Platform.orientations.PORTRAIT)

    expect(cmp.vm.isLandscape).toBeFalsy()
    expect(cmp.vm.expanded).toBeFalsy()

    // it is landscape and expanded automaticaly
    store.commit('panel/setTestOrientation', Platform.orientations.LANDSCAPE)
    expect(cmp.vm.isLandscape).toBeTruthy()
    expect(cmp.vm.expanded).toBeTruthy()

    // it is portrait and not expanded automaticaly
    store.commit('panel/setTestOrientation', Platform.orientations.PORTRAIT)
    expect(cmp.vm.isLandscape).toBeFalsy()
    expect(cmp.vm.expanded).toBeFalsy()

    // let's expand nd rotate again and the r0otatit again - it should save that in portrait it was expanded
    cmp.vm.expand()
    store.commit('panel/setTestOrientation', Platform.orientations.LANDSCAPE)
    store.commit('panel/setTestOrientation', Platform.orientations.PORTRAIT)
    expect(cmp.vm.isLandscape).toBeFalsy()
    expect(cmp.vm.expanded).toBeTruthy()
  })

  it('9 PanelCompact - computed isAttachedToLeft checks if current value of panel position is left', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('panel/setTestPanelPosition', 'left')

    expect(cmp.vm.isAttachedToLeft).toBeTruthy()

    store.commit('panel/setTestPanelPosition', 'right')

    expect(cmp.vm.isAttachedToLeft).toBeFalsy()
  })

  it('10 PanelCompact - computed isAttachedToRight checks if current value of panel position is right', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    store.commit('panel/setTestPanelPosition', 'right')

    expect(cmp.vm.isAttachedToRight).toBeTruthy()

    store.commit('panel/setTestPanelPosition', 'left')

    expect(cmp.vm.isAttachedToRight).toBeFalsy()
  })

  it('11 PanelCompact - computed leftBtnVisible returns true if we want to show left icon for attach (isAttachedToLeft + expanded)', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => true,
        isAttachedToRight: () => false
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.leftBtnVisible).toBeFalsy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.leftBtnVisible).toBeTruthy()
  })

  it('12 PanelCompact - computed leftBtnVisible returns true if we want to show left icon for attach (isAttachedToRight + !expanded)', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => false,
        isAttachedToRight: () => true
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.leftBtnVisible).toBeTruthy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.leftBtnVisible).toBeFalsy()
  })

  it('13 PanelCompact - computed rightBtnVisible returns true if we want to show right icon for attach (isAttachedToRight + expanded)', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => false,
        isAttachedToRight: () => true
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.rightBtnVisible).toBeFalsy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.rightBtnVisible).toBeTruthy()
  })

  it('14 PanelCompact - computed rightBtnVisible returns true if we want to show right icon for attach (isAttachedToRight + !expanded)', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api,
      computed: {
        isAttachedToLeft: () => true,
        isAttachedToRight: () => false
      }
    })

    cmp.setData({ expanded: false })
    expect(cmp.vm.rightBtnVisible).toBeTruthy()

    cmp.setData({ expanded: true })
    expect(cmp.vm.rightBtnVisible).toBeFalsy()
  })

  it('15 PanelCompact - computed hasMorphologyData returns true if morph data is ready and it has morph data', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    // test1
    api.app.hasMorphData = () => false
    store.commit('app/setTestMorphDataReady', false)

    expect(cmp.vm.hasMorphologyData).toBeFalsy()

    // test2
    store.commit('app/setTestMorphDataReady', true)
    expect(cmp.vm.hasMorphologyData).toBeFalsy()

    // test3
    api.app.hasMorphData = () => true
    store.commit('app/setTestMorphDataReady', false)

    expect(cmp.vm.hasMorphologyData).toBeFalsy()

    // test4
    api.app.hasMorphData = () => true
    store.commit('app/setTestMorphDataReady', true)

    expect(cmp.vm.hasMorphologyData).toBeTruthy()
  })

  it('16 PanelCompact - computed additionalStylesTootipCloseIcon returns props for icon', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    let result = cmp.vm.additionalStylesTootipCloseIcon

    expect(result.top).toBeDefined()
    expect(result.right).toBeDefined()
  })
/*
  it('17 PanelCompact - computed formattedShortDefinitions returns array with short defs, if they are ready, otherwise it returns an empty array', () => {
    let cmp = shallowMount(PanelCompact, {
      data () {
        return defaultData
      },
      store,
      localVue,
      mocks: api
    })

    let definitions = cmp.vm.formattedShortDefinitions
    expect(definitions.length).toEqual(0)

    store.commit('app/setTestHomonymDataReady', true)
    store.commit('app/setTestShortDefUpdateTime', 10)
    
    let definitions2 = cmp.vm.formattedShortDefinitions
  })
  */
})