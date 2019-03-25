<template>
  <div class="alpheios-word-usage-header" data-alpheios-ignore="all">
    <word-usage-examples-filters @filterCurrentByAuthor = "filterCurrentByAuthor"></word-usage-examples-filters>
    <div v-if="availableSortBy">
      <p class="alpheios-word-usage-header-title">
        {{ l10n.getText('WORDUSAGE_SORT_BY') }} <span class="alpheios-word-usage-header-show-link" @click="showHideSort">{{ showHideTitleSort}}</span>
      </p>
      <div v-show="visibleSortBy">
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
  </div>
</template>
<script>
import ClearFilters from '@/images/inline-icons/clear-filters.svg'
import Tooltip from '@/vue/components/tooltip.vue'
import WordUsageExamplesFilters from '@/vue/components/word-usage-examples/word-usage-examples-filters.vue'


export default {
  name: 'WordUsageExamplesHeader',
  inject: ['app', 'l10n'],
  components: {
    clearFiltersIcon: ClearFilters,
    alphTooltip: Tooltip,
    wordUsageExamplesFilters: WordUsageExamplesFilters
  },
  data () {
    return {
      visibleSortBy: true,
      selectedSortBy: 'byFullCit'
    }
  },
  computed: {
    availableSortBy () {
      return this.$store.state.app.wordUsageExamplesReady && this.app.wordUsageExamples.wordUsageExamples && this.app.wordUsageExamples.wordUsageExamples.length > 0
    },
    showHideTitleSort () {
      return this.visibleSortBy ? this.l10n.getText('WORDUSAGE_FILTERS_HIDE') : this.l10n.getText('WORDUSAGE_FILTERS_SHOW')
    }
  },
  methods: {
    showHideSort () {
      this.visibleSortBy = !this.visibleSortBy
    },
    changedSortBy () {
      this.$emit('changedSortBy', this.selectedSortBy)
    },
    filterCurrentByAuthor (selectedAuthor, selectedTextWork) {
      this.$emit('filterCurrentByAuthor', selectedAuthor, selectedTextWork)
    }
  }
}
</script>
<style lang="scss">
  @import "../../../styles/alpheios";
  
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

  .alpheios-word-usage-header {
    .alpheios-word-usage-header-select-author,
    .alpheios-word-usage-header-select-textwork {
      width: 88%;
    }

    .alpheios-word-usage-header-filter-clear-icon {
      width: 20px;
      height: 20px;
      display: inline-block;
      cursor: pointer;
    }

    .alpheios-word-usage-header-filter-clear-disabled.alpheios-word-usage-header-filter-clear-icon {
      cursor: inherit;
      fill: $alpheios-base-disabled-font-color;
    }

  }  
</style>