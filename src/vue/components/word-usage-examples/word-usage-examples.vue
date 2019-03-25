<template>
  <div class="alpheios-word-usage">
    <div class="alpheios_word_usage_list_title" data-alpheios-ignore="all">{{ targetWord }} ({{ language }})</div>
    <word-usage-examples-header @changedSortBy = "changedSortBy" @filterCurrentByAuthor = "filterCurrentByAuthor"></word-usage-examples-header>

    <div class="alpheios_word_usage_list_mainblock" v-if="showWordUsageExampleItems">
      <div v-if="wordUsageListSorted.length > 0">
        <word-usage-examples-item
            v-for="wordUsageItem in wordUsageListSorted"
            v-bind:key="wordUsageItem.ID"
            :wordUsageItem="wordUsageItem"
        ></word-usage-examples-item>
      </div>
      <div v-else>
        {{ l10n.getText('WORDUSAGE_NO_RESULTS') }}
      </div>
    </div>
    
    <div class="alpheios-word_usage_list__provider" v-if="provider">
      {{provider.toString()}}
    </div>
  </div>
</template>
<script>
import WordUsageExamplesItem from '@/vue/components/word-usage-examples/word-usage-examples-item.vue'
import WordUsageExamplesHeader from '@/vue/components/word-usage-examples/word-usage-examples-header.vue'

import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'

export default {
  name: 'WordUsageExamples',
  inject: ['ui', 'app', 'l10n'],
  storeModules: ['ui'],
  mixins: [DependencyCheck],
  components: {
    wordUsageExamplesItem: WordUsageExamplesItem,
    wordUsageExamplesHeader: WordUsageExamplesHeader
  },
  data () {
    return {
      sortBy: 'byFullCit',
      selectedAuthor: null,
      selectedTextWork: null
    }
  },
  computed: {
    targetWord () {
      return this.$store.state.app.homonymDataReady && this.app.homonym ? this.app.homonym.targetWord : null
    },
    language () {
      return this.$store.state.app.homonymDataReady && this.app.homonym ? this.app.homonym.language : null
    },
    showWordUsageExampleItems () {
      this.selectedAuthor = null
      this.selectedTextWork = null
      return this.$store.state.app.wordUsageExamplesReady
    },
    wordUsageExamples () {
      if (!this.$store.state.app.wordUsageExamplesReady) {
        return []
      }
      if (this.selectedAuthor) {
        return this.app.wordUsageExamples.wordUsageExamples
                   .filter(wordUsageExample => {
                     return wordUsageExample.author.ID === this.selectedAuthor.ID && (this.selectedTextWork ? wordUsageExample.textWork.ID === this.selectedTextWork.ID : true)
                   })
      }
      return this.app.wordUsageExamples.wordUsageExamples
    },
    provider () {
      return this.$store.state.app.wordUsageExamplesReady ? this.app.wordUsageExamples.provider : null
    },
    providerRights () {
      return (this.app.wordUsageExamples.provider && this.app.wordUsageExamples.provider.rights)
        ? Array.from(this.app.wordUsageExamples.provider.rights.entries()).map(([key, value]) => { return { key, value } })
        : []
    },
    wordUsageListSorted() {
      // TODO support user-selected sort key and order
      // eventually sorting should also take language into account but
      // for now we will probably only show Latin author and work names anyway
      if (this.showWordUsageExampleItems && this.wordUsageExamples && this.sortBy) {
        return this.sortWordUSageExamplesBy()
      }
    }
  },
  methods: {
    changedSortBy (sortByFromHeader) {
      this.sortBy = sortByFromHeader
    },
    filterCurrentByAuthor (selectedAuthor, selectedTextWork) {
      this.selectedAuthor = selectedAuthor
      this.selectedTextWork = selectedTextWork
    },
    getPropertyBySortBy (a, type) {
      switch (type) {
        case 'byFullCit':
          return a.fullCit().toUpperCase()
        case 'byAuthor':
          return a.authorForSort()
        case 'byTextWork':
          return a.textWorkForSort()
        case 'byPrefix':
          return a.prefixForSort
        case 'bySuffix':
          return a.suffixForSort
        default:
          return null
      }
    },
    sortWordUSageExamplesBy () {
      return this.wordUsageExamples.sort((a, b) => {
        let aU = this.getPropertyBySortBy(a, this.sortBy)
        let bU = this.getPropertyBySortBy(b, this.sortBy)
        if (aU < bU) {
          return -1
        }
        if (aU > bU) {
          return 1
        }
        return 0
      })
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.ui.registerAndActivateGetSelectedText('getSelectedText-usageExamples','.alpheios-word-usage')
    })
  }
}
</script>
<style lang="scss">
  @import "../../../styles/alpheios";

  .alpheios-word-usage {
    display: flex;
    flex-direction: column;
    height: 100%;

    div.alpheios_word_usage_list_title {
      flex: none;
      font-weight: bold;
      padding-bottom: 5px;
      border-bottom: 1px solid $alpheios-toolbar-active-color;
      margin-bottom: 10px;
    }

    div.alpheios_word_usage_list_mainblock {
      flex: 1 1 auto;
      position: relative;
      -webkit-overflow-scrolling: touch;
      overflow-y: auto;
    }
    div.alpheios-word_usage_list__provider {
      flex: none;
      font-weight: normal;

      padding: 10px 0;
      font-size: 80%;
    }
  }
</style>
