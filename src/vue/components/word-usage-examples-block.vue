<template>
  <div class="alpheios-word-usage">
    <div class="alpheios_word_usage_list_title" data-alpheios-ignore="all">{{ targetWord }} ({{ language }})</div>
    <word-usage-header-block @changedSortBy = "changedSortBy"></word-usage-header-block>

    <div class="alpheios_word_usage_list_mainblock" v-if="showWordUsageExampleItems">
      <div v-if="wordUsageListSorted.length > 0">
        <word-usage-example-item
            v-for="wordUsageItem in wordUsageListSorted"
            v-bind:key="wordUsageItem.ID"
            :wordUsageItem="wordUsageItem"
        ></word-usage-example-item>
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
import WordUsageExampleItem from '@/vue/components/word-usage-example-item.vue'
import WordUsageHeaderBlock from '@/vue/components/word-usage-header-block.vue'
import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
export default {
  name: 'WordUsageExamplesBlock',
  inject: ['ui', 'app', 'l10n'],
  storeModules: ['ui'],
  mixins: [DependencyCheck],
  components: {
    wordUsageExampleItem: WordUsageExampleItem,
    wordUsageHeaderBlock: WordUsageHeaderBlock
  },
  data () {
    return {
      sortBy: 'byFullCit'
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
      return this.$store.state.app.wordUsageExamplesReady
    },
    wordUsageExamples () {
      return this.$store.state.app.wordUsageExamplesReady ? this.app.wordUsageExamples.wordUsageExamples : []
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
  @import "../../styles/alpheios";

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
