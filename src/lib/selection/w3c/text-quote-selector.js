/**
 * Implements a W3C Text Quote Selector (https://www.w3.org/TR/annotation-model/#h-text-quote-selector)
 */
import HTMLSelector from '@/lib/selection/media/html-selector'

export default class TextQuoteSelector {
  constructor (languageCode, normalizedText) {
    this.languageCode = languageCode
    this.normalizedText = normalizedText
    this.contextForward = 6
    this.contextBackward = 6
  }

  createContext (htmlSelector, textSelector) {
    let selection = HTMLSelector.getSelection(htmlSelector.target)
    this.prefix = selection.anchorNode.data.substr(0, textSelector.start)
    this.suffix = selection.anchorNode.data.substr(textSelector.end)
    this.text = textSelector.text
    this.contextHTML = `${this.prefix}<span class="alpheios_worditem_incontext">${this.text}</span>${this.suffix}`
  }
}
