<template>
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
</template>
<script>
  export default {
    name: 'WordUsageExamplesSorting',
    inject: ['app', 'l10n'],
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
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../styles/alpheios";

  .alpheios-word-usage-header 
  .alpheios-word-usage-header-select-sortBy {
    margin-bottom: 10px;
  }
</style>