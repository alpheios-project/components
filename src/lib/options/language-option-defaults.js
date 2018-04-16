import OptionDefaults from './option-defaults'
import {LanguageModelFactory, Constants} from 'alpheios-data-models'

let codes = {
  greek: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_GREEK),
  latin: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_LATIN),
  persian: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_PERSIAN),
  arabic: LanguageModelFactory.getLanguageCodeFromId(Constants.LANG_ARABIC)
}

export default class LanguageOptionDefaults extends OptionDefaults {
  /**
   * Base Class for holding Option defaults
   */
  constructor (domain = 'alpheios-resource-options') {
    super(domain)
  }

  get items () {
    return {
      // TODO we should actually pull the defaults from the LexiconClient itself
      // this is provisional for the alpha release
      lexicons: {
        labelText: 'Lexicons',
        group: {
          [codes.greek]: {
            defaultValue: ['https://github.com/alpheios-project/lsj'],
            labelText: 'Greek Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/ml', text: 'Middle Liddell'},
              {value: 'https://github.com/alpheios-project/lsj', text: 'Liddell, Scott, Jones'},
              {value: 'https://github.com/alpheios-project/aut', text: 'Autenrieth Homeric Lexicon'},
              {value: 'https://github.com/alpheios-project/dod', text: 'Dodson'},
              {value: 'https://github.com/alpheios-project/as', text: 'Abbott-Smith'}
            ]
          },
          [codes.latin]: {
            defaultValue: ['https://github.com/alpheios-project/ls'],
            labelText: 'Latin Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/ls', text: 'Lewis & Short'}
            ]
          },
          [codes.arabic]: {
            defaultValue: ['https://github.com/alpheios-project/lan'],
            labelText: 'Arabic Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/lan', text: 'Lane'},
              {value: 'https://github.com/alpheios-project/sal', text: 'Salmone'}
            ]
          },
          [codes.persian]: {
            defaultValue: ['https://github.com/alpheios-project/stg'],
            labelText: 'Persian Lexicons',
            multiValue: true,
            values: [
              {value: 'https://github.com/alpheios-project/stg', text: 'Steingass'}
            ]
          }
        }
      }
    }
  }
}
