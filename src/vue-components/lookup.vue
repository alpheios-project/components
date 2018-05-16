<template>
  <div class="alpheios-lookup_form">
    <input class="uk-input lookup_input" type="text" :placeholder="inputPlaceholder" v-model="lookuptext"
      @keyup.enter="lookup"
    >
    <alph-tooltip tooltipDirection="top-right" :tooltipText="tooltipLabel">
      <button class="uk-button uk-button-primary uk-button-small lookup_button" type="button" tabindex="-1"
        @click="lookup"
      >
        {{ buttonLabel }}
      </button>
    </alph-tooltip>
    <div class="alpheios-lookup__settings">
      <a class="alpheios-lookup__settings-link" @click="switchLookupSettings">{{ labelSettings }}</a>
      <div class="alpheios-lookup__settings-items" v-show="showLanguageSettings">
        <alph-setting :data="preferredLanguage" @change="settingChanged" :classes="['alpheios-panel__options-item']"></alph-setting>

        <alph-setting :data="languageSetting" @change="resourceSettingChanged" :classes="['alpheios-panel__options-item']"
                  :key="languageSetting.name"
                  v-if="languageSetting.values.length > 1"
                  v-for="languageSetting in lexiconsFiltered"></alph-setting>
      </div>
    </div>
  </div>
</template>
<script>
  import TextSelector from '../lib/selection/text-selector'
  import LexicalQueryLookup from '../lib/queries/lexical-query-lookup'
  import { LanguageModelFactory } from 'alpheios-data-models'

  import Tooltip from './tooltip.vue'
  import Setting from './setting.vue'

  export default {
    name: 'Lookup',
    components: {
      alphTooltip: Tooltip,
      alphSetting: Setting
    },
    data () {
      return {
        lookuptext: '',
        defaultButtonLabel: 'Search',
        defaultInputPlaceholder: 'Type text',
        deafultLabelSettings: 'Settings',

        showLanguageSettings: false,
        currentLanguage: null
      }
    },
    props: {
      uiController: {
        type: Object,
        required: true
      },
      preferredLanguage: {
        type: Object,
        required: true
      },
      lexicons: {
        type: Array,
        required: true
      }
    },
    computed: {
      buttonLabel: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.LABEL_LOOKUP_BUTTON
        }
        return this.defaultButtonLabel
      },
      tooltipLabel: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.TOOLTIP_LOOKUP_BUTTON
        }
        return this.defaultButtonLabel
      },
      inputPlaceholder: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.PLACEHOLDER_LOOKUP_INPUT
        }
        return this.defaultInputPlaceholder
      },
      labelSettings: function () {
        if (this.uiController && this.uiController.l10n) {
          return this.uiController.l10n.messages.LABEL_LOOKUP_SETTINGS
        }
        return this.deafultLabelSettings
      },
      currentLangLexicons: function () {
        let currentLanguageCode = this.preferredLanguage.currentValue
        return 'lexicons-' + currentLanguageCode
      },
      lexiconsFiltered: function () {
        if (Array.isArray(this.lexicons)) {
          return this.lexicons.filter(item => item.name === this.currentLangLexicons)
        }
        return []
      }
    },
    methods: {
      'lookup': function () {
        if (this.lookuptext.length === 0) {
          return null
        }
        if (this.currentLanguage === null) {
          this.currentLanguage = this.uiController.options.items.preferredLanguage.currentValue
        }

        console.log('********* currentLanguage', this.currentLanguage)
        let languageID = LanguageModelFactory.getLanguageIdFromCode(this.currentLanguage)
        console.log('********* languageID', languageID)
        let textSelector = TextSelector.createObjectFromText(this.lookuptext, languageID)
        console.log('********* textSelector', textSelector)
        LexicalQueryLookup
          .create(textSelector, this.uiController)
          .getData()

        // this.lookuptext = ''
      },

      'switchLookupSettings': function () {
        this.showLanguageSettings = !this.showLanguageSettings
      },

      settingChanged: function (name, value) {
        // this.$parent.$emit('settingchange', name, value) // Re-emit for a Vue instance to catch
        console.log('************* languages', name, value, this.uiController.options.items.preferredLanguage.values.find(item => item.text = value))
        this.currentLanguage = value
      },

      resourceSettingChanged: function (name, value) {
        // this.$parent.$emit('resourcesettingchange', name, value) // Re-emit for a Vue instance to catch
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-lookup_form {
      margin: 15px 10px 5px;
      text-align: left;

      .uk-input {
        width: 80%;
        line-height: 28px;
        height: 30px;
        font-size: 14px;
        margin-bottom: 10px;
        vertical-align: top;

        &:focus {
          border-color: $alpheios-link-hover-color;
        }
      }

      .uk-button {
        font-size: 12px;
        vertical-align: top;
      }

      .alpheios-lookup__settings {
        text-align: left;
        .alpheios-lookup__settings-link {
          font-size: 0.675 * $alpheios-base-font-size;
        }
      }
    }

    .alpheios-panel .alpheios-lookup_form {
      width: 100%;
      margin-top: 5px;
      .uk-input {
        width: 70%;
      }
    }

    .alpheios-lookup__settings-items {
      .alpheios-panel__options-item {
        max-width: none;

        .uk-select:not([multiple]):not([size]),
        .uk-select[multiple],
        .uk-select[size],
        .uk-textarea {
          max-width: 250px;
        }
      }
    }
</style>