/* global Node */
/**
 * An auxiliary utility class to provide HTML page, window, and document related functionality.
 */
export default class HTMLPage {
  /**
   * Checks whether the current window has an frames in it.
   * @returns {boolean}
   */
  static get hasFrames () {
    console.log(`hasFrames = ${window.frames.length}`, window.frames)
    return (window.frames.length > 0)
  }

  /**
   * Checks whether the current window is a frame itself.
   * @returns {boolean}
   */
  static get isFrame () {
    console.log(`isFrame = ${window.self !== window.top}`, window.self, window.top)
    return (window.self !== window.top)
  }

  /**
   * Checks whether the current window is at the top level of window hierarchy.
   * @returns {boolean}
   */
  static get isAtTop () {
    return (window.self === window.top)
  }

  /**
   * Checks wither the current browsing content (represented by window object)
   * is a valid target for a UI controller activation.
   * The browsing context could be either the topmost window within a browser tab
   * or a window within a frame that is part of the topmost or any other window.
   * @returns {boolean} - True if the browsing content is valid, false otherwise.
   */
  static get isValidTarget () {
    // Check if page URL is not excluded
    for (const url of HTMLPage.targetRequirements.excludedURLs) {
      if (window.document.URL.search(url) !== -1) {
        return false
      }
    }

    if (!window.document.body) {
      return false
    }

    if (window.document.body.clientWidth < HTMLPage.targetRequirements.minWidth) {
      return false
    }

    if (window.document.body.clientHeight < HTMLPage.targetRequirements.minHeight) {
      return false
    }

    if (window.document.body.innerText.length < HTMLPage.targetRequirements.minCharCount) {
      return false
    }

    return true
  }

  /**
   * Finds a maximal z-index value of elements on a page.
   * @return {Number}
   */
  static getZIndexMax (zIndexDefualt = 2000) {
    let zIndex = this.zIndexRecursion(document.querySelector('body'), Number.NEGATIVE_INFINITY)

    if (zIndex >= zIndexDefualt) {
      if (zIndex < Number.POSITIVE_INFINITY) { zIndex++ } // To be one level higher that the highest element on a page
    } else {
      zIndex = zIndexDefualt
    }

    return zIndex
  }

  /**
   * A recursive function that iterates over all elements on a page searching for a highest z-index.
   * @param {Node} element - A root page element to start scan with (usually `body`).
   * @param {Number} zIndexMax - A current highest z-index value found.
   * @return {Number} - A current highest z-index value.
   */
  static zIndexRecursion (element, zIndexMax) {
    if (element) {
      let zIndexValues = [
        window.getComputedStyle(element).getPropertyValue('z-index'), // If z-index defined in CSS rules
        element.style.getPropertyValue('z-index') // If z-index is defined in an inline style
      ]
      for (const zIndex of zIndexValues) {
        if (zIndex && zIndex !== 'auto') {
          // Value has some numerical z-index value
          zIndexMax = Math.max(zIndexMax, zIndex)
        }
      }
      for (let node of element.childNodes) {
        let nodeType = node.nodeType
        if (nodeType === Node.ELEMENT_NODE || nodeType === Node.DOCUMENT_NODE || nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
          zIndexMax = this.zIndexRecursion(node, zIndexMax)
        }
      }
    }
    return zIndexMax
  }
}

HTMLPage.targetRequirements = {
  minWidth: 500, // A minimal width for a browsing context to qualify for showing a desktop UI
  minHeight: 400, // A minimal height for a browsing context to qualify for showing a desktop UI
  minCharCount: 1, // A minimal number of characters in a browsing context
  excludedURLs: [
    'about:blank',
    'grammars.alpheios.net'
  ]
}
