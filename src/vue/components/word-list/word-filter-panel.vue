<template>
    <div class="alpheios-wordlist-filters">
        <p class="alpheios-wordlist-header-title">{{ l10n.getText('WORDLIST_FILTER_BY') }}</p>
        <div>
        <div class="alpheios-wordlist-header-input-filterBy-block">
          <select class="alpheios-select alpheios-wordlist-header-select-filterBy"
                  v-model="selectedFilterBy" @change="changedFilterBy">
            <option v-for="typeFiltering in typeFiltersList" v-bind:key="typeFiltering.value"
                    v-bind:value="typeFiltering.value">{{ typeFiltering.title }}</option>
          </select>
          <alph-tooltip :tooltipText="l10n.getMsg('WORDLIST_FILTER_CLEAR')" tooltipDirection="top-right">
            <span class="alpheios-wordlist-header-clear-icon"
                  @click="clearFiltering"
                  :class = '{ "alpheios-wordlist-header-clear-disabled": selectedFilterBy === null }'
                  >
              <clear-filters-icon></clear-filters-icon>
            </span>
          </alph-tooltip>
        </div>
        <div class="alpheios-wordlist-header-input-filterBy-block"
          v-if="currentTypeFilter && currentTypeFilter.showTextInput"
        >
          <input v-model="textInput"  class="alpheios-input alpheios-wordlist-header-input-filterBy"
                :placeholder="currentTypeFilter.textInputPlaceholder">
          <alph-tooltip :tooltipText="l10n.getMsg('WORDLIST_FILTER')" tooltipDirection="top-right">
            <span class="alpheios-wordlist-header-clear-icon"
                  @click="clickFilterBy"
                  :class = '{ "alpheios-wordlist-header-clear-disabled": textInput === null }'
                  >
              <go-icon></go-icon>
            </span>
          </alph-tooltip>
        </div>
      </div>
    </div>
</template>
<script>
  import ClearFilters from '@/images/inline-icons/clear-filters.svg'
  import GoIcon from '@/images/inline-icons/go-icon.svg'
  import Tooltip from '@/vue/components/tooltip.vue'

  export default {
    name: 'WordFilterPanel',
    inject: ['app', 'l10n'],
    components: {
      clearFiltersIcon: ClearFilters,
      goIcon: GoIcon,
      alphTooltip: Tooltip
    },
    data () {
      return {
        selectedFilterBy: null,
        typeFiltersList: [
          { value: 'byCurrentSession', title: this.l10n.getText('WORDLIST_FILTER_BYCURRENTSESSION'), onChange: true },
          { value: 'byImportant', title: this.l10n.getText('WORDLIST_FILTER_BYIMPORTANT'), onChange: true },
          { value: 'byWordFormFull', title: this.l10n.getText('WORDLIST_FILTER_BYWORDFORM_FULL'), onClick: true, showTextInput: true, textInputPlaceholder: 'type full word form here' },
          { value: 'byWordFormPart', title: this.l10n.getText('WORDLIST_FILTER_BYWORDFORM_PART'), onClick: true, showTextInput: true, textInputPlaceholder: 'type part of word form here' }
        ],
        textInput: null
      }
    },
    computed: {
      currentTypeFilter () {
        return this.selectedFilterBy ? this.typeFiltersList.find(typeFilter => typeFilter.value === this.selectedFilterBy) : null
      }
    },
    methods: {
      changedFilterBy () {
        if (this.currentTypeFilter.onChange) {
          this.$emit('changedFilterBy', this.selectedFilterBy)
        }
      },
      clickFilterBy () {
        if (this.currentTypeFilter.onClick && this.textInput) {
          this.$emit('changedFilterBy', this.selectedFilterBy, this.textInput)
        }
      },
      clearFiltering () {
        this.selectedFilterBy = null
        this.changedFilterBy()
      }
    }
  }
</script>
<style lang="scss">
  @import "../../../styles/variables";

  .alpheios-wordlist-filters {
      padding: 10px;
      .alpheios-wordlist-header-title {
          margin: 0;
          font-weight: bold;
          padding-bottom: 10px;
      }

      .alpheios-wordlist-header-select-filterBy-block,
      .alpheios-wordlist-header-input-filterBy-block {
          width: 48%;
          display: inline-block;
          vertical-align: middle;
      }

      .alpheios-wordlist-header-input-filterBy-block {
        margin-left: 2%;
      }

      .alpheios-wordlist-header-select-filterBy,
      .alpheios-wordlist-header-input-filterBy {
        width: 90%;
      }

      .alpheios-wordlist-header-clear-icon {
        width: 20px;
        height: 20px;
        display: inline-block;
        cursor: pointer;
        vertical-align: middle;

        svg {
          width: 100%;
          height: 100%;
          display: inline-block;
          vertical-align: top;
        }
      }
      
  }
</style>
