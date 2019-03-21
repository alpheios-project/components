<template>
    <div class="alpheios-word-usage-header-filters">
      <div class="alpheios-word-usage-header-select-type-filters-block" >
        <div class="alpheios-word-usage-header-select-type-filter" 
            v-for="typeFilterItem of typeFiltersList" v-bind:key="typeFilterItem.value"
        >
          <input type="radio" :id="typeFilterItem.value" :value="typeFilterItem.value" v-model="typeFilter">
          <label :for="typeFilterItem.value">{{ typeFilterItem.label }}</label>
        </div>
      </div>
      <div v-show="visibleFilters">

        <select class="uk-select alpheios-word-usage-header-select-author" v-model="selectedAuthor"  v-show="homonymReady">
          <option 
              v-for="authorItem in authorsList" v-bind:key="authorItem.ID"
              v-bind:value="authorItem">{{ calcTitle(authorItem) }}</option>
        </select>
        <alph-tooltip :tooltipText="l10n.getMsg('WORDUSAGE_FILTERS_AUTHOR_CLEAR')" tooltipDirection="top-right">
          <span class="alpheios-word-usage-header-filter-clear-icon" @click="clearAuthorFilter">
            <clear-filters-icon></clear-filters-icon>
          </span>
        </alph-tooltip>

        <select class="uk-select alpheios-word-usage-header-select-textwork" 
                v-model="selectedWork" :disabled="disabledTextWork">
          <option 
              v-for="workItem in worksList" v-bind:key="workItem.ID"
              v-bind:value="workItem">{{ calcTitle(workItem) }}</option>
        </select>
        <alph-tooltip :tooltipText="l10n.getMsg('WORDUSAGE_FILTERS_TEXTWORK_CLEAR')" tooltipDirection="top-right"> 
          <span class="alpheios-word-usage-header-filter-clear-icon" @click="clearTextWorkFilter">
            <clear-filters-icon></clear-filters-icon>
          </span>
        </alph-tooltip>
      </div>
      <div class="alpheios-word-usage-header-actions">
          <button @click="getResults" class="uk-button uk-button-primary uk-button-small">
              {{ l10n.getText('WORDUSAGE_GET_RESULTS') }}
          </button>
      </div>
    </div>
</template>
<script>
  import ClearFilters from '@/images/inline-icons/clear-filters.svg'
  import Tooltip from '@/vue/components/tooltip.vue'

  export default {
    name: 'WordUsageExamplesFilters',
    inject: ['app', 'l10n'],
    components: {
      clearFiltersIcon: ClearFilters,
      alphTooltip: Tooltip
    },
    data () {
      return {
        selectedAuthor: null,
        selectedWork: null,
        typeFilter: null
      }
    },
    mounted () {
      this.typeFilter = this.typeFiltersList[0].value
    },
    computed: {
      visibleFilters () {
        return this.typeFilter !== 'noFilters'
      },
      typeFiltersList () {
        return [
          { value: 'noFilters', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_NO_FILTERS') },
          { value: 'moreResults', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_MORE_RESULTS') },
          { value: 'filterCurrentResults', label: this.l10n.getText('WORDUSAGE_FILTERS_TYPE_FILTER_CURRENT_RESULTS') }
        ]
      },
      homonymReady () {
        if (!this.$store.state.app.homonymDataReady) {
          console.info('*************homonymReady this.selectedAuthor', this.selectedAuthor)
          this.selectedAuthor = null
          this.selectedWork = null
          this.typeFilter = this.defaultTypeFIlter
        }
        return true
      },
      homonym () {
        return this.$store.state.app.homonymDataReady ? this.app.homonym : null
      },
      disabledTextWork () {
        return !this.$store.state.app.wordUsageAuthorsReady || !this.selectedAuthor
      },
      authorsList () {
        if (this.$store.state.app.wordUsageAuthorsReady && !this.$store.state.app.wordUsageExamplesReady) {
          return this.authorsListFromTheSource
        } 
        if (this.$store.state.app.wordUsageExamplesReady) {
          return this.authorsListFromExamplesList
        }
        return []
      },
      authorsListFromTheSource () {
        if (this.$store.state.app.wordUsageAuthorsReady) {
          let resultAuthors = this.app.wordUsageAuthors.slice()
          resultAuthors.sort((a, b) => {
            if (a.title() > b.title()) { return 1 }
            if (a.title() < b.title()) { return -1 }
            return 0
          })
          return resultAuthors
        }
        return []
      },
      authorsListFromExamplesList () {
        if (this.$store.state.app.wordUsageExamplesReady) {
          let resultAuthors = this.app.wordUsageExamples.wordUsageExamples
                                  .map(wordUsageExampleItem => wordUsageExampleItem.author)
                                  .filter((item, pos, self) => self.indexOf(item) == pos)
                                  .slice()
          resultAuthors.sort((a, b) => {
            if (a.title() > b.title()) { return 1 }
            if (a.title() < b.title()) { return -1 }
            return 0
          })
          return resultAuthors
        }
        return []
      },
      worksList () {
        if (this.$store.state.app.wordUsageAuthorsReady && this.selectedAuthor && this.selectedAuthor.ID !== 0) {
          let resultTextWorks = this.selectedAuthor.works.slice()
          resultTextWorks.sort((a, b) => {
            if (a.title() > b.title()) { return 1 }
            if (a.title() < b.title()) { return -1 }
            return 0
          })
          return resultTextWorks
        }
        return []
      },
      showHideTitleFilters () {
        return this.visibleFilters ? this.l10n.getText('WORDUSAGE_FILTERS_HIDE') : this.l10n.getText('WORDUSAGE_FILTERS_SHOW')
      }
    },
    methods: {
      async getResults () {
        if (this.typeFilter === 'noFilters') {
          await this.getNewConcordanceResultsNoFilters()
        } else if (this.typeFilter === 'moreResults') {
          await this.getNewConcordanceResults()
        } else if (this.typeFilter === 'filterCurrentResults') {
          console.info('***** filterCurrentResults')
        }
      },
      async getNewConcordanceResultsNoFilters () {
        await this.app.getWordUsageData(this.homonym)
      },
      async getNewConcordanceResults () {
        await this.app.getWordUsageData(this.homonym, {
          author: this.selectedAuthor && this.selectedAuthor.ID !== 0 ? this.selectedAuthor : null,
          textWork: this.selectedWork && this.selectedWork.ID !== 0 ? this.selectedWork : null
        })
      },
      calcTitle (item) {
        if (item) {
          if ( item.title() && item.abbreviation() ) {
            return `${item.title()} (${item.abbreviation()})`
          }
          if ( item.title() ) {
            return item.title()
          }
          if ( item.abbreviation() ) {
            return item.abbreviation()
          }
        }
        return ''
      },
      clearAuthorFilter () {
        this.selectedAuthor = null
        this.selectedWork = null
      },
      clearTextWorkFilter () {
        this.selectedWork = null
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../styles/alpheios";
  
  .alpheios-word-usage-header-select-type-filters-block {
    margin-bottom: 10px;
    
    .alpheios-word-usage-header-select-type-filter {
      cursor: pointer;
      input[type="radio"] {
        display: inline-block;
        vertical-align: middle;
      }
      label {
        padding-left: 5px;
        font-size: 80%;
        line-height: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
</style>