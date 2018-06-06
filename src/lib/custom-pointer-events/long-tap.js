import PointerEvt from './pointer-evt.js'

export default class LongTap extends PointerEvt {
  constructor (element, evtHandler, mvmntThreshold = 5, durationThreshold = 125) {
    super()
    this.element = element
    this.evtHandler = evtHandler

    this.mvmntThreshold = mvmntThreshold
    this.durationThreshold = durationThreshold
  }

  static excludeCpeTest (dataset) {
    return dataset.hasOwnProperty('alphExcludeLongTapCpe')
  }

  setEndPoint (clientX, clientY, target, path) {
    super.setEndPoint(clientX, clientY, target, path)
    this.done = this.mvmntDist <= this.mvmntThreshold && this.duration >= this.durationThreshold
  }

  static listen (selector, evtHandler, mvmntThreshold, durationThreshold) {
    let elements = document.querySelectorAll(selector)
    for (const element of elements) {
      this.addUpDownListeners(element, new this(element, evtHandler, mvmntThreshold, durationThreshold))
    }
  }
}
