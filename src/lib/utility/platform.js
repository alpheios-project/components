import HTMLPage from '@/lib/utility/html-page.js'

export default class Platform {
  constructor (setRootAttributes = false) {
    this.getData()

    if (setRootAttributes) {
      this.setRootAttributes()
    }
  }

  /**
   * Retrieves data about a platform.
   */
  getData () {
    this.deviceType = HTMLPage.getDeviceType()
    this.orientation = HTMLPage.getOrientation()

    this.viewport = {
      width: window.innerWidth && document.documentElement.clientWidth && document.body.clientWidth
        ? Math.min(window.innerWidth, document.documentElement.clientWidth, document.body.clientWidth)
        : document.body.clientWidth || window.innerWidth || document.documentElement.clientWidth,

      height: window.innerHeight && document.documentElement.clientHeight
        ? Math.min(window.innerHeight, document.documentElement.clientHeight)
        : window.innerHeight || document.documentElement.clientHeight
    }
    console.info(`window.screen (CSS pixels): width is ${window.screen.width}, height is ${window.screen.height}`)
    console.info(`window.inner: width is ${window.innerWidth}, height is ${window.innerHeight}`)
    console.info(`html: width is ${document.documentElement.clientWidth}, height is ${document.documentElement.clientHeight} (smaller because of the toolbar)`)
    console.info(`body: width is ${document.body.clientWidth}, height is ${document.body.clientHeight} (larger because content is longer)`)
    // console.info(`Viewport dimensions are: width ${this.viewport.width}, height ${this.viewport.height}`)

    this.dpr = window.devicePixelRatio
    console.info(`DPR is: ${this.dpr}`)
  }

  setRootAttributes () {
    if (document && document.documentElement) {
      document.documentElement.dataset.apScreenOrientation = this.isPortrait ? 'portrait' : 'landscape'
      document.documentElement.dataset.apLayoutType = this.isDesktop ? 'large' : 'compact'
    } else {
      console.warn(`Cannot set platform attributes because either document or documentElement are not defined`)
    }
  }

  get isDesktop () {
    return this.deviceType === HTMLPage.deviceTypes.DESKTOP
  }

  get isMobile () {
    return this.deviceType === HTMLPage.deviceTypes.MOBILE
  }

  get isAny () {
    return this.deviceType === HTMLPage.deviceTypes.ANY
  }

  get isPortrait () {
    return this.orientation === HTMLPage.orientations.PORTRAIT
  }

  get isLandscape () {
    return this.orientation === HTMLPage.orientations.LANDSCAPE
  }
}
