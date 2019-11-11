import PointerEvt from '@/lib/custom-pointer-events/pointer-evt.js'

export default class MouseMove extends PointerEvt {
  constructor (element, evtHandler) {
    super()
    this.evtType = 'mousemove'
    this.element = element
    this.evtHandler = evtHandler // A client's event handler
    this.boundListener = this.eventListener.bind(this) // A bound event listener of MouseDblClick
    this.mouseMoveTimeout = null
    this.mouseMoveDelay = 1000
  }

  eventListener (domEvt) {
    domEvt.stopPropagation()
    clearTimeout(this.mouseMoveTimeout)
    this.mouseMoveTimeout = setTimeout(() => {
      this
        .setStartPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
        .setEndPoint(domEvt.clientX, domEvt.clientY, domEvt.target, domEvt.path)
      this.evtHandler(this, domEvt)
    }, this.mouseMoveDelay)
  }

  set () {
    this.element.addEventListener(this.evtType, this.boundListener, { passive: true })
  }

  remove () {
    this.element.removeEventListener(this.evtType, this.boundListener, { passive: true })
  }

  static listen (selector, evtHandler) {
    const elements = document.querySelectorAll(selector)
    for (const element of elements) {
      let listener = new this(element, evtHandler) // eslint-disable-line prefer-const
      listener.set()
    }
  }
}
