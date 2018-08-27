import PointerEvt from '@/lib/custom-pointer-events/pointer-evt'
import jump from 'jump.js'
/**
 * This class can be used to add aligned translation functionality to a page
 * Example Usage:
 *    let alignment = new AlignmentSelector(window.document, options)
 *    alignment.activiate()
 *    options can contain the following settings
 *      highlightClass: css class to be applied to highlight the aligned elements upon focus (default is '.alpheios-alignment__highlight')
 *      disableClass: css class which is applied to a parent element of the aligned text to disable the trigger event (default is '.alpheios-alignment__disabled')
 *      focusEvent: Event which triggers focus on an aligned text (default is 'mouseenter')
 *      blurEvent: Event which triggers removal of focus on an aligned text  is 'mouseleave')
 *    Aligned text elements are required to have data-alpheios_align_ref attributes which contain the selector for the corresponding aligned text in the page
 */
export default class AlignmentSelector {
  /**
   * @constructor
   * @param {Document} doc the document containing a translation alignment
   * @param {Object} options initialization options
   */
  constructor (doc, options = {}, triggerCallback = () => { return true }) {
    this.doc = doc
    const DEFAULTS = {
      highlightClass: 'alpheios-alignment__highlight',
      disableClass: 'alpheios-alignment__disabled',
      fixHighlightClass: 'alpheios-alignment__highlight_fix',
      focusEvent: 'mouseenter',
      blurEvent: 'mouseleave',
      clickEventConstant: true
    }
    this.settings = Object.assign({}, DEFAULTS, options)
    this.jumpTempHighlighted = false
    this.jumpTimeout = null
    this.cancelJump = false
  }

  /**
   * Activate the Alignment event handling
   */
  activate () {
    let alignments = this.doc.querySelectorAll('[data-alpheios_align_ref]')
    for (let a of alignments) {
      a.addEventListener(this.settings.focusEvent, event => { this.focus(event) })
      a.addEventListener(this.settings.blurEvent, event => { this.blur(event) })

      if (this.settings.clickEventConstant) {
        a.addEventListener('click', event => { this.click(event) })
      }
    }
  }

  click (event) {
    if (event.target.dataset.highlight_fixed === 'true') {
      this.clearFixedHighlighted(event.target)
      this.cancelJump = true
    } else {
      this.setFixedHighlighted()
    }
    this.jumpTempHighlighted = false
  }

  /**
   * Respond to request to remove focus on an aligned word
   * @param {Event} event the event which triggered the request
   */
  blur (event) {
    this.removeHighlightWords()
  }

  /**
   * Respond to request to focus on an aligned word
   * @param {Event} event the event which triggered the request
   */
  focus (event) {
    let firstAligned = this.highlightWords(event.target)
    if (firstAligned) {
      this.scrollToElement(firstAligned)
    }
  }

  scrollToElement (elem) {
    if (!this.isElementInViewport(elem)) {
      clearTimeout(this.jumpTimeout)

      this.jumpTimeout = setTimeout(() => {
        clearTimeout(this.jumpTimeout)

        if (elem.dataset.highlight_fixed !== 'true') {
          this.jumpTempHighlighted = true
          this.setFixedHighlighted()
        }

        if (!this.cancelJump) {
          jump(elem, {
            duration: 2000,
            callback: () => {
              if (this.jumpTempHighlighted) {
                setTimeout(() => {
                  this.jumpTempHighlighted = false
                  this.clearFixedHighlighted(elem)
                }, 500)
              }
            }
          })
        }
      }
        , 1500)
    }
    this.cancelJump = false
  }

  isElementInViewport (elem) {
    let bounding = elem.getBoundingClientRect()
    return (
      bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || this.doc.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || this.doc.documentElement.clientWidth)
    )
  }

  makeElementFixedHighlighted(elem) {
    elem.dataset.highlight_fixed = true
    this.addClass(elem, this.settings.fixHighlightClass)
    this.removeClass(elem, this.settings.highlightClass)
  }

  removeElementFixedHighlighted(elem) {
    elem.dataset.highlight_fixed = false
    this.removeClass(elem, this.settings.fixHighlightClass)
    this.addClass(elem, this.settings.highlightClass)
  }

  setFixedHighlighted () {
    this.doc.querySelectorAll(`.${this.settings.highlightClass}`).forEach(e => {
      if (e.dataset.highlight_fixed !== 'true') {
        this.makeElementFixedHighlighted(e)
      }
    })
  }

  clearFixedHighlighted (elem) {
    let alignedToTarget = this.getAlignedListByRef(elem, true)

    if (alignedToTarget.length > 0) {
      this.removeClass(elem, this.settings.highlightClass)
      this.removeClass(alignedToTarget, this.settings.highlightClass)

      let reversedAlignedObj = this.getAllAlignedObjects(alignedToTarget)
      this.removeClass(reversedAlignedObj, this.settings.highlightClass)
    }
  }

  removeHighlightWords () {
    this.doc.querySelectorAll(`.${this.settings.highlightClass}`)
      .forEach(e => {
        if (e.dataset.highlight_fixed !== 'true') {
          e.classList.remove(this.settings.highlightClass)
        }
      })
  }

  highlightWords (elem) {
    let alignedToTarget = this.getAlignedListByRef(elem, true)

    if (alignedToTarget.length > 0 && elem.dataset.highlight_fixed !== 'true') {
      this.addClass(elem, this.settings.highlightClass)
      this.addClass(alignedToTarget, this.settings.highlightClass)

      let reversedAlignedObj = this.getAllAlignedObjects(alignedToTarget)
      this.addClass(reversedAlignedObj, this.settings.highlightClass)
    }

    return alignedToTarget.length > 0 ? alignedToTarget[0] : null
  }

  addClass (elem, className) {
    if (elem.constructor.name === 'NodeList' || Array.isArray(elem)) {
      for (let el of Array.from(elem)) {
        if (!el.classList.contains(className)) {
          el.classList.add(className)
        }
      }
    } else {
      if (!elem.classList.contains(className)) {
        elem.classList.add(className)
      }
    }
  }

  removeClass (elem, className) {
    if (elem.constructor.name === 'NodeList' || Array.isArray(elem)) {
      for (let el of Array.from(elem)) {
        if (el.classList.contains(className)) {
          el.classList.remove(className)
        }
      }
    } else {
      if (elem.classList.contains(className)) {
        if (fixRemove) {
          this.makeElementFixedHighlighted(elem)
        } else {
          elem.classList.remove(className)
        }
      }
    }
  }

  getAlignedListByRef (target, checkDisabled = false) {
    let ref = target.dataset.alpheios_align_ref
    if (ref) {
      let res = []
      for (let r of ref.split(/,/)) {
        let aligned = this.doc.querySelectorAll(r)

        if (checkDisabled) {
          aligned = Array.from(aligned).filter(el => !this.isDisabled(el))
        }
        aligned.forEach(el => { res.push(el) })
      }

      return res
    }
  }

  getAllAlignedObjects (targetArr) {
    let res = []
    for (let a of targetArr) {
      let aligned = this.getAlignedListByRef(a)
      aligned.forEach(el => { res.push(el) })
    }
    return res
  }

  isDisabled (elem) {
    let path = PointerEvt.buildPath(elem)
    for (let p of path) {
      if (p.classList.contains(this.settings.disableClass)) {
        return true
      }
    }
    return false
  }
}
