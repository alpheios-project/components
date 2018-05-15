<template>
  <div class="alpheios-lookup_form">
    <input class="uk-input lookup_input" type="text" :placeholder="inputPlaceholder" v-model="lookuptext"
      @keyup.enter="lookup"
    >
    <alph-tooltip tooltipDirection="top-right" :tooltipText="tooltipLabel">
      <button class="uk-button uk-button-primary uk-button-small" type="button" tabindex="-1"
        @click="lookup"
      >
        {{ buttonLabel }}
      </button>
    </alph-tooltip>
    <div class="alpheios-lookup__settings">
      <a class="alpheios-lookup__settings-link" v-on:click="switchLookupSettings">Language Settings</a>
      <div class="alpheios-lookup__settings-items" v-show="showLanguageSettigs">
        We are setting items
      </div>
    </div>
  </div>
</template>
<script>
  import TextSelector from '../lib/selection/text-selector'
  import LexicalQueryLookup from '../lib/queries/lexical-query-lookup'
  import { LanguageModelFactory } from 'alpheios-data-models'

  import Tooltip from './tooltip.vue'

  export default {
    name: 'Lookup',
    components: {
      alphTooltip: Tooltip
    },
    data () {
      return {
        lookuptext: '',
        defaultButtonLabel: 'Search',
        defaultInputPlaceholder: 'Type text',
        deafultLabelSettings: 'Settings',

        showLanguageSettigs: false
      }
    },
    props: {
      uiController: {
        type: Object,
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
      }
    },
    methods: {
      'lookup': function () {
        if (this.lookuptext.length === 0) {
          return null
        }
        let languageID = LanguageModelFactory.getLanguageIdFromCode(this.uiController.options.items.preferredLanguage.currentValue)
        let textSelector = TextSelector.createObjectFromText(this.lookuptext, languageID)
        LexicalQueryLookup
          .create(textSelector, this.uiController)
          .getData()

        this.lookuptext = ''
      },

      'switchLookupSettings': function () {
        showLanguageSettigs = !showLanguageSettigs
        console.log('********************* switchLookupSettings')
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-lookup_form {
      margin: 15px 10px 5px;
      text-align: center;

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
</style>