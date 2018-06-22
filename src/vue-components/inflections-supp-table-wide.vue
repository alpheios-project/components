<template>
    <div v-if="data">
        <div :id="`${data.paradigmID}`" class="infl-prdgm-tbl">
            <div class="infl-prdgm-tbl-row" v-for="row in data.table.rows">
                <div class="infl-prdgm-tbl-cell" :class="cellClasses(cell)" v-for="cell in row.cells">
                    {{cell.value}}
                </div>
            </div>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'WideSupplementalInflectionsTable',
    props: {
      /*
       An object that represents a wide version of a table, consists of array of rows.
       Each rows consists of an array of cells.
      */
      data: {
        type: [Object, Boolean],
        required: true
      }
    },

    methods: {
      cellClasses: function (cell) {
        if (cell.role === 'label') {
          return 'infl-prdgm-tbl-cell--label'
        }

        /*
        If it is a data cell, we need to figure out if this is a cell with a full match and
        highlight it accordingly. A full match is a cell which matches all features of the cell properties
        with the ones in the inflection.
        We do not check for suffix match because paradigm tables show example of a different word,
        not the one selected by the user.
         */
        if (cell.role === 'data') {
          return 'infl-prdgm-tbl-cell--data'
        }
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    h4.alpheios-inflections__supp-table-title {
        font-size: 1rem;
        line-height: 1;
        margin: 1.5rem 0 0.6rem 0;
        font-weight: 700;
    }
</style>
