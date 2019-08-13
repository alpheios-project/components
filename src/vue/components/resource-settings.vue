<template>
  <div class="alpheios-resource-options__cont">

    <fieldset class="alpheios-resource-options__cont-fieldset">
      <legend>{{ resourceSettingsTitle('lexicons') }}</legend>
        <setting
            :classes="['alpheios-resource-options__item']"
            :data="languageSetting"
            :key="languageSetting.name"
            @change="resourceSettingChanged"
            v-for="languageSetting in resourceSettingsLexicons"
        >
        </setting>
    </fieldset>

    <fieldset class="alpheios-resource-options__cont-fieldset">
      <legend>{{ resourceSettingsTitle('lexiconsShort') }}</legend>
      <setting
          :classes="['alpheios-resource-options__item']"
          :data="languageSetting"
          :key="languageSetting.name"
          @change="resourceSettingChanged"
          v-for="languageSetting in resourceSettingsLexiconsShort"
      >
      </setting>
    </fieldset>
  </div>
</template>
<script>
  import Setting from './setting.vue'
  import Options from '@/lib/options/options.js'
  import DependencyCheck from '@/vue/vuex-modules/support/dependency-check.js'
  export default {
    name: 'FeatureSettings',
    // API modules that are required for this component
    inject: {
      language: 'language',
      l10n: 'l10n',
      settings: 'settings'
    },
    mixins: [DependencyCheck],
    components: {
      setting: Setting,
    },
    data () {
      return {
        titlesDefault: {
          lexicons: 'Lexicons (full)',
          lexiconsShort: 'Lexicons (short)'
        }
      }
    },
    computed: {
      resourceSettingsLexicons: function () {
        let resourceOptions = this.settings.getResourceOptions()
        return resourceOptions.items && resourceOptions.items.lexicons
          ? resourceOptions.items.lexicons.filter(item => item.values.length > 0)
          : []
      },
      resourceSettingsLexiconsShort: function () {
        let resourceOptions = this.settings.getResourceOptions()
        return resourceOptions.items && resourceOptions.items.lexiconsShort
          ? resourceOptions.items.lexiconsShort.filter(item => item.values.length > 0)
          : []
      }
    },
    methods: {
      resourceSettingsTitle (typeLex) {
        let resourceOptions = this.settings.getResourceOptions()

        if (resourceOptions.items && resourceOptions.items[typeLex]) {
          if (resourceOptions.defaults.items[typeLex].labelL10n) {
            return this.l10n.getText(resourceOptions.defaults.items[typeLex].labelL10n)
          } else if (resourceOptions.defaults.items[typeLex].labelText) {
            return resourceOptions.defaults.items[typeLex].labelText
          }
        }
        return this.titlesDefault[typeLex]
        
      },
      resourceSettingChanged: function (name, value) {
        // we have to send the full name here and parse it where we set it
        // because grouped setting are referenced under Options object
        // by the parsed name but each individual setting in a group is referenced
        // by its fullname (with version and groupname appended)
        this.language.resourceSettingChange(name, value)
      }
    }
  }
</script>
<style lang="scss">
  @import "../../styles/variables";
  .alpheios-resource-options__cont {
    display: flex;
    flex-direction: column;
  }
  .alpheios-resource-options__item {
    margin-bottom: textsize(15px);
    display: flex;
    align-items: flex-start;
    flex: 1 1 auto;
  }

  .alpheios-resource-options__cont-fieldset {
    margin-bottom: 20px;
    padding: 10px;
  }

  .alpheios-resource-options__item {
    .alpheios-setting__label {
      width: 30%;
    }
    .alpheios-setting__control {
      width: 70%;
    }
  }

</style>