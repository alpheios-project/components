<template>
  <div>
    <div class="alpheios_word_usage_list_title">{{ targetWord }} ({{ language }})</div>
    <div class="alpheios_word_usage_list_mainblock" v-if="showWordUsageExampleItems">
      <word-usage-example-item 
          v-for="wordUsageItem in wordUsageList"
          v-bind:key="wordUsageItem.ID"
          :wordUsageItem="wordUsageItem"
      ></word-usage-example-item>
    </div>
  </div>
</template>
<script>
  import WordUsageExampleItem from '@/vue/components/word-usage-example-item.vue'
  export default {
    name: 'WordUsageExamplesBlock',
    components: {
      wordUsageExampleItem: WordUsageExampleItem
    },
    props: {
      wordUsageList: {
        type: Array,
        required: true
      },
      targetWord: {
        type: String,
        required: true
      },
      language: {
        type: String,
        required: true
      }
    },
    computed: {
      showWordUsageExampleItems () {
        return this.wordUsageList && this.wordUsageList.length > 0
      }
    }
  }
</script>
<style lang="scss">
    @import "../../styles/alpheios";

    .alpheios_word_usage_list_title {
      font-weight: bold;
      padding-bottom: 5px;
      border-bottom: 1px solid $alpheios-toolbar-active-color;
      margin-bottom: 10px;
    }
</style>
