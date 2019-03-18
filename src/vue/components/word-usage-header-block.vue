<template>
  <div class="alpheios-word-usage-header">
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
            Get results
        </button>
      </div>
  </div>
</template>
<script>
export default {
  name: 'WordUsageHeaderBlock',
  inject: ['app'],
  data () {
    return {
      selectedAuthor: null,
      selectedWork: null
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
    }
  },
  methods: {
    async getConcordanceResults () {
      await this.app.getWordUsageData(this.homonym, {
        author: this.selectedAuthor && this.selectedAuthor.ID !== 0 ? this.selectedAuthor : null,
        textWork: this.selectedWork
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

  .alpheios-word-usage-header-actions {
    margin-top: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-top: 1px solid $alpheios-base-border-color;
    border-bottom: 1px solid $alpheios-base-border-color;
  }

  
</style>