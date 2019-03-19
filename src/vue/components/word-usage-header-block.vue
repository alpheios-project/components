<template>
  <div class="alpheios-word-usage-header" data-alpheios-ignore="all">
      <p class="alpheios-word-usage-header-title">{{ l10n.getText('WORDUSAGE_FILTERS') }} <span class="alpheios-word-usage-header-show-link" @click="showHideFilters">{{ showHideTitleFilters}}</span></p>
      <div v-show="visibleFilters">
        <select class="uk-select alpheios-word-usage-header-select-author" v-model="selectedAuthor"  v-show="homonymReady">
          <option 
              v-for="authorItem in authorsList" v-bind:key="authorItem.ID"
              v-bind:value="authorItem">{{ calcTitle(authorItem) }}</option>
        </select>
        <select class="uk-select alpheios-word-usage-header-select-textwork" 
                v-model="selectedWork" :disabled="disabledTextWork">
          <option 
              v-for="workItem in worksList" v-bind:key="workItem.ID"
              v-bind:value="workItem">{{ calcTitle(workItem) }}</option>
        </select>
        <div class="alpheios-word-usage-header-actions">
          <button @click="getConcordanceResults" class="uk-button uk-button-primary uk-button-small">
              {{ l10n.getText('WORDUSAGE_GET_RESULTS') }}
          </button>
        </div>
      </div>
      <p class="alpheios-word-usage-header-title" v-if="$store.state.app.wordUsageExamplesReady">
        {{ l10n.getText('WORDUSAGE_SORT_BY') }} <span class="alpheios-word-usage-header-show-link" @click="showHideSort">{{ showHideTitleSort}}</span>
      </p>
      <div v-show="visibleSortBy" v-if="$store.state.app.wordUsageExamplesReady">
        <select class="uk-select alpheios-word-usage-header-select-sortBy" 
                v-model="selectedSortBy" @change="changedSortBy">
          <option value="byFullCit"> </option>
          <option value="byAuthor">{{ l10n.getText('WORDUSAGE_SORT_BY_AUTHOR') }}</option>
          <option value="byTextWork">{{ l10n.getText('WORDUSAGE_SORT_BY_TEXTWORK') }}</option>
          <option value="byPrefix">{{ l10n.getText('WORDUSAGE_SORT_BY_PREFIX') }}</option>
          <option value="bySuffix">{{ l10n.getText('WORDUSAGE_SORT_BY_SUFFIX') }}</option>
        </select>
      </div>
  </div>
</template>
<script>
export default {
  name: 'WordUsageHeaderBlock',
  inject: ['app', 'l10n'],
  data () {
    return {
      selectedAuthor: null,
      selectedWork: null,
      visibleFilters: true,
      visibleSortBy: true,
      selectedSortBy: 'byFullCit'
    }
  },
  computed: {
    homonymReady () {
      if (!this.$store.state.app.homonymDataReady) {
        this.selectedAuthor = null
        this.selectedWork = null
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
      if (this.$store.state.app.wordUsageAuthorsReady) {
        let resultAuthors = this.app.wordUsageAuthors.slice()
        resultAuthors.sort((a, b) => {
                if (a.abbreviation() > b.abbreviation()) { return 1 }
                if (a.abbreviation() < b.abbreviation()) { return -1 }
                return 0
            })
        resultAuthors.unshift({ ID: 0, title: () => '', abbreviation: () => '' })
        return resultAuthors
      }
      return []
    },
    worksList () {
      if (this.$store.state.app.wordUsageAuthorsReady && this.selectedAuthor && this.selectedAuthor.ID !== 0) {
        let resultTextWorks = this.selectedAuthor.works.slice()
        resultTextWorks.sort((a, b) => {
                  if (a.abbreviation() > b.abbreviation()) { return 1 }
                  if (a.abbreviation() < b.abbreviation()) { return -1 }
                  return 0
                })
        resultTextWorks.unshift({ ID: 0, title: () => '', abbreviation: () => '' })

        return resultTextWorks
      }
      return []
    },
    showHideTitleFilters () {
      return this.visibleFilters ? this.l10n.getText('WORDUSAGE_FILTERS_HIDE') : this.l10n.getText('WORDUSAGE_FILTERS_SHOW')
    },
    showHideTitleSort () {
      return this.visibleSortBy ? this.l10n.getText('WORDUSAGE_FILTERS_HIDE') : this.l10n.getText('WORDUSAGE_FILTERS_SHOW')
    }

  },
  methods: {
    async getConcordanceResults () {
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
    showHideFilters () {
      this.visibleFilters = !this.visibleFilters
    },
    showHideSort () {
      this.visibleSortBy = !this.visibleSortBy
    },
    changedSortBy () {
      this.$emit('changedSortBy', this.selectedSortBy)
    }

  }
}
</script>
<style lang="scss">
  @import "../../styles/alpheios";
  
  .alpheios-word-usage-header 
  .alpheios-word-usage-header-select-textwork {
    margin-top: 10px;
  }

  .alpheios-word-usage-header 
  .alpheios-word-usage-header-select-sortBy {
    margin-bottom: 10px;
  }

  .alpheios-word-usage-header-actions {
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid $alpheios-base-border-color;
  }

  .alpheios-word-usage-header
  .alpheios-word-usage-header-title {
    margin-bottom: 10px;
    font-weight: bold;
    color: $alpheios-toolbar-color;
  }

  .alpheios-word-usage-header
  .alpheios-word-usage-header-show-link {
    color: $alpheios-link-color;
    cursor: pointer;
  }

  .alpheios-word-usage-header  {
    border-bottom: 1px solid $alpheios-toolbar-active-color;
  }
  
</style>