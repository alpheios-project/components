// The following import will not probably used by any client directly,
// but is required to include Scss file specified in there to a MiniCssExtractPlugin bundle
import Style from './styles/style.scss'

import Popup from './vue-components/popup.vue'
import PopupMod from './vue-components/popup-mod.vue'
import Panel from './vue-components/panel.vue'
import L10n from './lib/l10n/l10n'
import Locales from './locales/locales'
import enUS from './locales/en-us/messages.json'
import enGB from './locales/en-gb/messages.json'
import UIController from './lib/controllers/ui-controller'
import UIStateAPI from './lib/controllers/ui-state'
import HTMLSelector from './lib/selection/media/html-selector'
import LexicalQuery from './lib/queries/lexical-query'
import ResourceQuery from './lib/queries/resource-query'
import LocalStorageArea from './lib/options/local-storage-area'
import ContentOptionDefaults from './lib/options/content-option-defaults'
import LanguageOptionDefaults from './lib/options/language-option-defaults'
import Options from './lib/options/options'
export { Popup, PopupMod, Panel, L10n, Locales, enUS, enGB, UIController, HTMLSelector, LexicalQuery, ResourceQuery,
  LocalStorageArea, ContentOptionDefaults, LanguageOptionDefaults, Options, UIStateAPI, Style }
