<template>
      <div :class="classes" v-if="Object.keys(data).length > 0">
        <label class="uk-form-label alpheios-setting__label" v-show="showTitle">{{data.labelText}}</label>
        <select v-model="selected" class="uk-select" multiple v-if="data.multiValue">
            <option v-for="item in data.textValues()">{{item}}</option>
        </select>
        <select v-model="selected" class="uk-select" v-if="! data.multiValue">
            <option v-for="item in data.textValues()">{{item}}</option>
        </select>
    </div>
</template>
<script>
  export default {
    name: 'Setting',
    props: {
      data: {
        type: Object,
        required: true
      },
      showTitle: {
        type: Boolean,
        required: false,
        default: true
      },
      classes: {
        type: Array,
        required: false,
        default: function () {
          return ['uk-margin']
        }
      }
    },
    data () {
      return {
        updated: 1
      }
    },
    computed: {
      selected: {
        get: function () {
          let rv
          //if (this.updated > 0 ) {
            if (typeof this.data.currentTextValue === 'function') {
              rv = this.data.currentTextValue()
            }
          //}
          //console.log(`current language here is ${rv} and updated is ${this.updated}`)
          return rv
        },
        set: function (newValue) {
          this.$emit('change', this.data.name, newValue)
          // this is a hack to force the getter to be recalled if the component
          // is updated after a selection has been made
          this.updated++
        }
      }
    }
  }
</script>
<style lang="scss">
  .alpheios-setting__label {
    display: block;
  }
</style>
