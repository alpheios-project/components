import PointerEvt from '@/lib/custom-pointer-events/pointer-evt'
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
      focusEvent: 'mouseenter',
      blurEvent: 'mouseleave'
    }
    this.settings = Object.assign({}, DEFAULTS, options)
  }

  /**
   * Activate the Alignment event handling
   */
  activate () {
    let alignments = this.doc.querySelectorAll('[data-alpheios_align_ref]')
    for (let a of alignments) {
      a.addEventListener(this.settings.focusEvent, event => { this.focus(event) })
      a.addEventListener(this.settings.blurEvent, event => { this.blur(event) })
    }
  }

  /**
   * Respond to request to remove focus on an aligned word
   * @param {Event} event the event which triggered the request
   */
  blur (event) {
    this.doc.querySelectorAll(`.${this.settings.highlightClass}`).forEach(e => e.classList.remove(this.settings.highlightClass))
  }

  /**
   * Respond to request to focus on an aligned word
   * @param {Event} event the event which triggered the request
   */
  focus (event) {
    let ref = event.target.dataset.alpheios_align_ref
    if (ref) {
      for (let r of ref.split(/,/)) {
        let aligned = this.doc.querySelectorAll(r)
        let disabled = Array.from(aligned).filter((a) => this.isDisabled(a))
        if (aligned.length > 0 && disabled.length === 0) {
          event.target.classList.add(this.settings.highlightClass)
          for (let a of aligned) {
            a.classList.add(this.settings.highlightClass)
            let aref = a.dataset.alpheios_align_ref
            if (aref) {
              for (let ar of aref.split(/,/)) {
                let reverse = this.doc.querySelectorAll(ar)
                for (let reverseA of reverse) {
                  if (reverseA !== event.target) {
                    reverseA.classList.add(this.settings.highlightClass)
                  }
                }
              }
            }
          }
          this.scrollToElement(aligned[0])
        }
      }
    }
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

  /**
   * Scroll an element into view
   * @param {Element} elem the element to scroll to
   */
  scrollToElement (elem) {
    var top = elem.offsetTop
    var left = elem.offsetLeft
    var width = elem.offsetWidth
    var height = elem.offsetHeight

    while (elem.offsetParent) {
      elem = elem.offsetParent
      top += elem.offsetTop
      left += elem.offsetLeft
    }

    var moveX = 0
    var moveY = 0
    if (left < elem.ownerDocument.defaultView.pageXOffset) {
      moveX = left - elem.ownerDocument.defaultView.pageXOffset
    } else if ((left + width) >
               (elem.ownerDocument.defaultView.pageXOffset +
                elem.ownerDocument.defaultView.innerWidth)
    ) {
      moveX = (left + width) -
               (elem.ownerDocument.defaultView.pageXOffset +
                elem.ownerDocument.defaultView.innerWidth)
    }

    if (top < elem.ownerDocument.defaultView.pageYOffset) {
      moveY = top - elem.ownerDocument.defaultView.pageYOffset
    } else if ((top >= elem.ownerDocument.defaultView.pageYOffset) &&
                ((top + height) >
                 (elem.ownerDocument.defaultView.pageYOffset +
                  elem.ownerDocument.defaultView.innerHeight)
                )
    ) {
      moveY =
              (top + height) -
              (elem.ownerDocument.defaultView.pageYOffset +
               elem.ownerDocument.defaultView.innerHeight)
    }
    if (moveX !== 0 || moveY !== 0) {
      elem.ownerDocument.defaultView.scrollBy(moveX, moveY)
    }
  }
}
