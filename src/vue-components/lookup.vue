<template>
  <div class="alpheios-lookup_form">
    <input class="uk-input lookup_input" type="text" :placeholder="inputPlaceholder" v-model="lookuptext"
      @keyup.enter="lookup"
    >
    <alph-tooltip tooltipDirection="top-right" :tooltipText="tooltipLabel">
      <span class="button_with_link">
      <button class="uk-button uk-button-primary uk-button-small lookup_button" type="button" tabindex="-1"
        @click="lookup"
      >
        {{ buttonLabel }}
      </button>
      <a class="alpheios-lookup__settings-link" @click="switchLookupSettings">{{ labelSettings }}</a>
      </span>
    </alph-tooltip>
    <div class="alpheios-lookup__settings">
      <div class="alpheios-lookup__settings-items" v-show="showLanguageSettings" v-if="currentLanguage && lexiconsFiltered" >
        <alph-setting :data="currentLanguage" @change="settingChanged" :classes="['alpheios-panel__options-item']"></alph-setting>

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
        currentLanguage: null,
        currentDictionary: null,
        resourceOptions: null
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
      }
    },
    mounted: function () {
      if (this.preferredLanguage && typeof this.preferredLanguage.cloneObject === 'function') {
        this.currentLanguage = this.preferredLanguage.cloneObject()
      }
      if (this.uiController && this.uiController.resourceOptions) {
        this.resourceOptions = this.uiController.resourceOptions.cloneDefaultResourceOptions()     
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
        if ( this.currentLanguage === null ) {
          this.currentLanguage = this.preferredLanguage.cloneObject()
        }
        return 'lexicons-' + this.currentLanguage.currentValue
      },
      lexiconsFiltered: function () {
        if (this.resourceOptions && Array.isArray(this.resourceOptions.items.lexicons)) {
          return this.resourceOptions.items.lexicons.filter(item => item.name === this.currentLangLexicons)
        }
        return []
      }
    },
    methods: {
      'lookup': function () {
        if (this.lookuptext.length === 0) {
          return null
        }

        let languageID = LanguageModelFactory.getLanguageIdFromCode(this.currentLanguage.currentValue)
        let textSelector = TextSelector.createObjectFromText(this.lookuptext, languageID)
        
        LexicalQueryLookup
          .create(textSelector, this.uiController, this.resourceOptions)
          .getData()

        // this.lookuptext = ''
      },

      'switchLookupSettings': function () {
        this.showLanguageSettings = !this.showLanguageSettings
        if (this.$parent !== undefined) {
          this.$parent.$emit('updatePopupDimensions')
        }
      },

      settingChanged: function (name, value) {
        let findLang = this.preferredLanguage.values.find(item => item.text === value)
        this.currentLanguage = this.preferredLanguage.cloneObject()
        this.currentLanguage.currentValue= findLang.value
      },

      resourceSettingChanged: function (name, value) {
        let changedLexiconIndex = this.resourceOptions.items.lexicons.findIndex(item => item.name === name)
        let valuesLexicons = this.resourceOptions.items.lexicons[changedLexiconIndex].values.filter(item => value.indexOf(item.text) > -1)
        this.resourceOptions.items.lexicons[changedLexiconIndex].currentValue = valuesLexicons.map(item => item.value)
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
        width: 70%;
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
        display: block;
      }

      .alpheios-lookup__settings {
        text-align: left;
      }
      .alpheios-lookup__settings-link {
        font-size: 0.675 * $alpheios-base-font-size;
        /* margin-left: 71%;*/
        display: block;
        padding-top: 5px;
      }

      .button_with_link {
        width: 29%;
      }
    }

    .alpheios-panel .alpheios-lookup_form {
      width: 100%;
      margin: 5px 0;
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