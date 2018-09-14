<template>
    <div v-if="!view.isImplemented" class="alpheios-inflections__not-impl-msg">
        {{messages.INFLECT_MSG_TABLE_NOT_IMPLEMENTED}}
    </div>
    <div v-else-if="view.wideView && !view.isEmpty">
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
      messages: {
        type: Object,
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
          ['infl-suff--full-match']: morpheme.match.fullMatch
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

    .alpheios-inflections__not-impl-msg {
        margin-top: 30px;
        padding: 20px;
        font-size: 0.875rem;
    }

    // region Tables
    .infl-table {
        display: grid;
        border-left: 1px solid #111;
        border-bottom: 1px solid #111;
        margin-bottom: 1rem;
    }

    .infl-table--wide {
        /* Data flow order: number- case - declension - gender - type*/
        grid-auto-flow: row;
        grid-template-columns: repeat(21, 1fr); /* Default value, will be redefined in JS if necessary */
    }

    .infl-table--narrow {
        /* Data flow order: declension - number- case - gender - type*/
        grid-auto-flow: row;
        grid-template-columns: repeat(6, 1fr); /* Default value, will be redefined in JS if necessary */
    }

    .infl-table.hidden {
        display: none;
    }

    .infl-table-narrow-views-cont {
        display: flex;
        flex-wrap: wrap;
    }

    .infl-cell {
        font-size: 12px;
        padding: 0 2px 0 5px;
        border-right: 1px solid #111;
        border-top: 1px solid #111;
        position: relative;
    }

    .infl-cell.hidden {
        display: none;
    }

    .infl-cell--hdr {
        font-weight: 700;
        text-align: center;
    }

    .infl-cell--hdr .infl-cell__conj-stem {
        text-transform: none;
    }

    .infl-cell--fw {
        grid-column: 1 / -1;
        font-style: italic;
        text-transform: capitalize;
    }

    .infl-cell.infl-cell--sep {
        height: 50px;
    }

    .infl-cell--sp0 {
        display: none;
    }

    @for $i from 1 through 24 {
        .infl-cell--sp#{$i} {
            grid-column-end: span #{$i};
        }
    }

    .infl-cell--hl {
        background: lightgray;
    }

    .infl-cell--morph-match,
    .infl-table .infl-cell.infl-cell--morph-match // To override a color schema
    {
        border: 3px solid rgb(188, 230, 240);
    }

    .infl-cell__conj-stem {
        text-transform: none;
    }

    .infl-suff {
        cursor: pointer;
    }

    .row-title-cell {
        text-transform: capitalize;
    }

    .infl-suff.infl-suff--suffix-match {
        background-color: rgb(188, 230, 240);
    }

    .infl-suff--full-match {
        background-color: lightgray;
    }

    .infl-suff.infl-suff--suffix-match.infl-suff--full-match {
        background-color: $alpheios-highlight-color;
        font-weight: 700;
    }
    // endregion Tables
</style>
