<template>
    <div v-if="view.wideView">
        <h3 class="alpheios-inflections__title alpheios-table-sf__title alpheios-clickable"
            @click="collapse">
            {{view.title}}
            <span v-show="collapsed">[+]</span>
            <span v-show="!collapsed">[-]</span>
        </h3>

        <div v-show="!collapsed" :style="view.wideView.style" class="infl-table infl-table--wide" id="alpheios-wide-vue-table">
            <template v-for="row in view.wideView.rows">
                <div :class="cell.classes" v-for="cell in row.cells"
                     @mouseover.stop.prevent="cellMouseOver(cell)" @mouseleave.stop.prevent="cellMouseLeave(cell)">
                    <template v-if="cell.isDataCell">
                        <template v-for="(morpheme, index) in cell.morphemes">
                            <span :class="morphemeClasses(morpheme)">
                                <template v-if="morpheme.value">{{morpheme.value}}</template>
                                <template v-else>-</template>
                            </span>
                            <infl-footnote v-if="morpheme.hasFootnotes" :footnotes="morpheme.footnotes"></infl-footnote>
                            <template v-if="index < cell.morphemes.length-1">, </template>
                        </template>
                    </template>
                    <span v-else v-html="cell.value"></span>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
  import InflFootnote from './infl-footnote.vue'

  export default {
    name: 'WideInflectionsTableStandardForm',
    components: {
      inflFootnote: InflFootnote
    },
    props: {
      // An inflection table view
      view: {
        type: [Object, Boolean],
        required: true
      },
      noSuffixMatchesHidden: {
        type: [Boolean],
        required: true
      }
    },

    data: function () {
      return {
        collapsed: false
      }
    },

    methods: {
      collapse: function () {
        this.view.wideView.collapsed = !this.view.wideView.collapsed
        this.collapsed = this.view.wideView.collapsed
      },

      morphemeClasses: function (morpheme) {
        return {
          ['infl-suff']: true,
          ['infl-suff--suffix-match']: morpheme.match.suffixMatch,
          ['infl-suff--full-feature-match']: morpheme.match.fullMatch,
        }
      },

      cellMouseOver: function (cell) {
        let wideView =  this.view.wideView
        if (cell.isDataCell) {
          cell.highlightRowAndColumn()
          this.view.wideView = wideView
        }
      },

      cellMouseLeave: function (cell) {
        let wideView =  this.view.wideView
        if (cell.isDataCell) {
          cell.clearRowAndColumnHighlighting()
          this.view.wideView = wideView
        }
      }
    },

    watch: {
      noSuffixMatchesHidden: function (value) {
        this.view.noSuffixMatchesGroupsHidden(value)
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-table-sf__title {
        margin-bottom: 5px;
        padding-left: 30px;
    }

    .alpheios-clickable {
        cursor: pointer;
    }
</style>
