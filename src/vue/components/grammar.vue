<template>
  <div class="alpheios-grammar">
    <div class="alpheios-grammar__titles">
        <h1 class="alpheios-panel__title">Browse Language Grammar</h1>
      <div class="alpheios-grammar__block alpheios-clickable" 
          :class="{open: !languageItem.collapsed}"
           v-for="(languageItem, langIndex) in languageList" :key="langIndex">

           <p class="alpheios-grammar__block__title"
              @click="collapseLanguage(languageItem.languageCode)"
           >{{ languageItem.title }}
            <span v-show="languageItem.collapsed">[+]</span>
            <span v-show="!languageItem.collapsed">[-]</span>
           </p>
      </div>
    </div>
      <div class="alpheios-grammar__frame-progress" v-show="waitingForGrammar">
        <progress-bar :text="l10n.getText('PLACEHOLDER_GRAMMAR_DATA_LOADING')"></progress-bar>
      </div>
      <div class="alpheios-grammar__frame-cont" v-show="!languageList[currentLanguageCode].collapsed" v-if="currentUrl && updatedGrammarData">
        <div class="alpheios-grammar__button--back-block">
          <alph-tooltip :tooltipText="l10n.getText('TOOLTIP_BACK_TO_INDEX')" tooltipDirection="bottom-left">
            <button @click="returnToIndex"  class="alpheios-button-primary alpheios-svg-index"><back-icon /></button>
          </alph-tooltip>
        </div>
        <iframe :src="currentUrl" class="alpheios-grammar__frame" scrolling="yes"></iframe>
      </div>
      <div class="alpheios-grammar__provider" v-show="!languageList[currentLanguageCode].collapsed"
           v-if="currentLanguageCode && updatedGrammarData && languageList[currentLanguageCode].provider">{{ languageList[currentLanguageCode].provider }}
      </div>
  </div>
</template>
<script>
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
import { Constants, LanguageModelFactory as LMF } from 'alpheios-data-models'
import { Grammars } from 'alpheios-res-client'

import Vue from '@vue-runtime'

import BackIcon from '@/images/inline-icons/back.svg'
import Tooltip from './tooltip.vue'
import ProgressBar from './progress-bar.vue'

export default {
  name: 'Grammar',
  inject: ['l10n', 'app'],
  storeModules: ['app'],
  mixins: [DependencyCheck],
  components: {
    backIcon: BackIcon,
    alphTooltip: Tooltip,
    progressBar: ProgressBar
  },
  data () {
    return {
      currentLanguageCode: null,
      currentUrl: null,
      waitingForGrammar: false,
      languageList: {
        lat: {
          languageID: Constants.LANG_LATIN,
          languageCode: 'lat',
          title: 'Latin Grammar',
          url: null,
          provider: null,
          collapsed: true
        },
        grc: {
          languageID: Constants.LANG_GREEK,
          languageCode: 'grc',
          title: 'Greek Grammar',
          url: null,
          provider: null,
          collapsed: true
        }
      }
    }
  },
  computed: {
    updatedGrammarData () {
      if (this.$store.state.app.updatedGrammar) {
        this.waitingForGrammar = false
        console.info('updatedGrammarData this.waitingForGrammar', this.waitingForGrammar)
        Object.keys(this.languageList).forEach(langCode => {
          const langID = this.languageList[langCode].languageID
          this.languageList[langCode].url = this.app.grammarData[langID] ? this.app.grammarData[langID].url : null
          this.languageList[langCode].provider = this.app.grammarData[langID] ? this.app.grammarData[langID].provider : null
        })
      }

      if (this.currentLanguageCode && this.languageList[this.currentLanguageCode].url) {
        this.currentUrl = this.languageList[this.currentLanguageCode].url
      }
      return true
    }
  },
  methods: {
    collapseLanguage (languageCode) {
      this.languageList[languageCode].collapsed = !this.languageList[languageCode].collapsed

      if (!this.languageList[languageCode].collapsed) {
        this.updateCurrentData(languageCode)
        this.checkUrl()
        this.collapseOthers(languageCode)
      } else {
        this.clearCurrentData()
      }
    },
    collapseOthers (languageCode) {
      Object.keys(this.languageList).forEach(langCode => {
        if (langCode !== languageCode) {
          this.languageList[langCode].collapsed = true
        }
      })
    },
    updateCurrentData (languageCode) {
      if (languageCode) {
        this.currentLanguageCode = languageCode
        this.currentUrl = this.languageList[languageCode].url
      }
    },
    clearCurrentData () {
      this.currentLanguageCode = null
      this.currentUrl = null
    },
    checkUrl () {
      if (!this.languageList[this.currentLanguageCode].url) {
        this.waitingForGrammar = true
        console.info('checkUrl this.waitingForGrammar', this.waitingForGrammar)
        this.app.startResourceQuery({ type: 'table-of-contents', value: '', languageID: this.languageList[this.currentLanguageCode].languageID })
      }
    },
    returnToIndex () {
      if (this.currentLanguageCode) {
        this.currentUrl = null
        Vue.nextTick().then(() => {
          this.currentUrl = this.languageList[this.currentLanguageCode].url
        })
      }
    }
  }
}
</script>

<style lang="scss">
  @import "../../styles/variables";

  .alpheios-grammar__titles {
    padding: 40px 20px 20px;
  }
  p.alpheios-grammar__block__title {
    color: var(--alpheios-inflect-title-color);
    font-size: textsize(24px);
    font-family: var(--alpheios-serif-font-face);
    font-weight: 700;
    margin-bottom: textsize(20px);
    // To have the border under the text only
    display: inline-block;

    &.open {
      border-bottom: textsize(2px) solid var(--alpheios-inflect-title-color);
    }
  }

  .alpheios-grammar {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .alpheios-grammar__frame-cont {
    flex: 1 1 auto;
    position: relative;
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    flex-direction: column;
  }

  .alpheios-grammar__frame {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    border: none;
    margin: 0;
    padding: 0;
    overflow: scroll;
  }

  .alpheios-grammar__provider {
    flex: none;
    font-weight: normal;
    padding: 20px 25px 20px;
    font-size: 80%;
  }

    .alpheios-grammar__button--back-block {
    position: absolute;
    top: 5px;
    right: 20px;
    z-index: 1000;
  }
  .alpheios-svg-index {
    display: block;
    padding: 4px;
    border-radius: 15px;
    opacity: 0.5;
    svg {
      width: 22px;
      height: auto;
      fill: var(--alpheios-btn-primary-font-color);
    }
  }

  .alpheios-grammar__button--back-block button {
    color: var(--alpheios-grammar-back-button-color);
    background-color: var(--alpheios-grammar-back-button-bg);
    border-color: var(--alpheios-grammar-back-button-border-color);
    
    &:hover {
      color: var(--alpheios-grammar-back-button-color-hover);
      background-color: var(--alpheios-grammar-back-button-bg-hover);
      border-color: var(--alpheios-grammar-back-button-border-color-hover);
    }
  }
    .alpheios-grammar__frame-progress {
      padding: 20px;
    }
</style>
