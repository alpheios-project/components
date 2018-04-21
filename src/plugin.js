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
import UIController from './lib/controllers/ui-controller.js'
import UIStateAPI from './lib/controllers/ui-state.js'
import HTMLSelector from './lib/selection/media/html-selector.js'
import LexicalQuery from './lib/queries/lexical-query.js'
import ResourceQuery from './lib/queries/resource-query.js'
import LocalStorageArea from './lib/options/local-storage-area.js'
import ContentOptionDefaults from './settings/content-options-defaults.json'
import LanguageOptionDefaults from './settings/language-options-defaults.json'
import DefaultsLoader from './lib/options/defaults-loader.js'
import Options from './lib/options/options.js'
export { Popup, PopupMod, Panel, L10n, Locales, enUS, enGB, UIController, HTMLSelector, LexicalQuery, ResourceQuery,
  LocalStorageArea, ContentOptionDefaults, LanguageOptionDefaults, DefaultsLoader, Options, UIStateAPI, Style }
