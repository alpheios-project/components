<template>
      <div :class="classes" v-if="data && Object.keys(data).length > 0">
        <label class="uk-form-label alpheios-setting__label" v-show="showTitle">{{data.labelText}}</label>
        <multiselect v-model="selected" :options="multiValues" :multiple="true" :searchable ="false" :close-on-select="true" :clear-on-select="false" :hide-selected="true" :preserve-search="true" placeholder="Pick some" v-if="data.multiValue">
        </multiselect>
        <select v-model="selected" class="uk-select" v-if="! data.multiValue">
            <option v-for="item in data.textValues()">{{item}}</option>
        </select>
    </div>
</template>
<script>
  import Multiselect from 'vue-multiselect'
  export default {
    name: 'Setting',
    components: {
      Multiselect
    },
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
    computed: {
      selected: {
        get: function () {
          let rv
          if (typeof this.data.currentTextValue === 'function') {
              rv = this.data.currentTextValue()
          }
          return rv
        },
        set: function (newValue) {
          this.$emit('change', this.data.name, newValue)
        }
      },
      multiValues: function () {
        return this.data ? this.data.textValues() : []
      }
    }
  }
</script>
<style lang="scss">
  @import "vue-multiselect-css";
  .alpheios-setting__label {
    display: block;
  }

  .multiselect {
    max-width: 250px;
    display: inline-block;
    vertical-align: middle;
  }

  .multiselect__content-wrapper {
    border: 1px solid #666;
    border-top: 0;
  }
  ul.multiselect__content {
    padding: 0;
    margin: 0;
  }

  .multiselect__tags {
    border-radius: 2px;
    border: 1px solid #666;
  }

  .multiselect__select {
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2224%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666666%22%20points%3D%2212%201%209%206%2015%206%22%3E%3C%2Fpolygon%3E%0A%20%20%20%20%3Cpolygon%20fill%3D%22%23666666%22%20points%3D%2212%2013%209%208%2015%208%22%3E%3C%2Fpolygon%3E%0A%3C%2Fsvg%3E%0A");
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;

    width: 25px;
    height: 30px;
  }

  .multiselect__select::before {
    display: none;
  }

  .multiselect__option::after {
    display: none;
  }

  .multiselect__option--highlight,
  .multiselect__tag,
  .multiselect__tag-icon:focus, 
  .multiselect__tag-icon:hover {
    background: #4e6476;
  }

  .multiselect__tag-icon:after {
    content: "\D7";
    color: #fff;
    font-size: 13.4px;
  }

  .alpheios-setting__label {
    vertical-align: middle;
  }
</style>
