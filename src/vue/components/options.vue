<template>
  <div data-alpheios-ignore="all">
    <div class="alpheios-tab-options-switch">
        <div class="alpheios-tab-options-switch--item" :class="{ 'alpheios-active': currentTab === 1 }" @click="currentTab = 1">U</div>
        <div class="alpheios-tab-options-switch--item" :class="{ 'alpheios-active': currentTab === 2 }" @click="currentTab = 2">F</div>
        <div class="alpheios-tab-options-switch--item" :class="{ 'alpheios-active': currentTab === 3 }" @click="currentTab = 3">R</div>
    </div>
        <ui-settings :key="uiSettingsKey" v-show="currentTab === 1"></ui-settings>
        <feature-settings :key="featureSettingsKey" v-show="currentTab === 2"></feature-settings>
        <resource-settings :key="resourceSettingsKey" v-show="currentTab === 3"></resource-settings>
    <div>
        <button @click="resetAllOptions"
            class="alpheios-button-primary">{{l10n.getText('LABEL_RESET_OPTIONS')}}
        </button>
    </div>
  </div>
</template>
<script>
  import ResourceSettings from '@/vue/components/resource-settings.vue'
  import FeatureSettings from '@/vue/components/feature-settings.vue'
  import UISettings from '@/vue/components/ui-settings.vue'

  export default {

    name: 'OptionsPanel',
    components: {
      uiSettings: UISettings,
      resourceSettings: ResourceSettings,
      featureSettings: FeatureSettings
    },
    inject: ['l10n','app'],
    data: function () {
      return {
          currentTab: 1
      }
    },
    computed: {
      uiSettingsKey() {
        return `${this.$options.prefixName}-settings-ui-${this.$store.state.settings.uiResetCounter}`
      },

      resourceSettingsKey() {
        return `${this.$options.prefixName}-settings-resource-${this.$store.state.settings.resourceResetCounter}`
      },

      featureSettingsKey() {
        return `${this.$options.prefixName}-settings-feature-${this.$store.state.settings.featureResetCounter}`
      },
    },
    methods: {
      resetAllOptions: function () {
        this.app.resetAllOptions()
      }
    }
  }
</script>
<style lang="scss">
    @import "../../styles/variables";

    .alpheios-tab-options-switch {
        margin-bottom: textsize(15px);
        text-align: right;
    }
    
    $iconSize: 20px;

    .alpheios-tab-options-switch--item {
        display: inline-block;
        padding: $iconSize/3 $iconSize*0.65;
        margin-left: $iconSize / 4;
        border-radius: $iconSize;
        font-weight: bold;
        background: var(--alpheios-desktop-panel-icon-bg);
        color: var(--alpheios-desktop-panel-icon-color);
        cursor: pointer;
        font-size: $iconSize;

        &:hover {
            background: var(--alpheios-desktop-panel-icon-bg-hover);
            color: var(--alpheios-desktop-panel-icon-color-hover);
        }

        &.alpheios-active {
            background: var(--alpheios-desktop-panel-icon-bg-active);
            color: var(--alpheios-desktop-panel-icon-color-active);
        }
    }
</style>