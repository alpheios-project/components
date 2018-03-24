<template>
  <span @click="sendFeature(data[parentType])" :class="attributeClass(parentType)" :data-feature="parentType" :data-grouplevel="group" v-if="data[parentType]">
    {{ data[parentType].value }}
    <span v-for="type in childTypes" @click="sendFeature(data[type])" :class="attributeClass(type)" :data-feature="type" :data-grouplevel="group" v-if="data[type]">
      {{ data[type].value }}
    </span>
  </span>
</template>
<script>
  export default {
    name: 'InflectionAttributeGroup',
    props: {
      data: {
        type: Object,
        required: true
      },
      parentType: {
        type: String,
        required: true,
      },
      childTypes: {
        type: Array,
        required: true,
      },
      group: {
        type: Number,
        required: true
      },
      linkedfeatures: {
        type: Array,
        required: false,
        default: () => []
      }
    },
    methods: {
      attributeClass(featureType,...extras) {
        let classList = []
        if (this.linkedfeatures.includes(featureType)) {
          classList.push('alpheios-morph__linkedattr')
        } else {
          classList.push('alpheios-morph__attr')
        }
        classList.push(...extras)
        return classList.join(' ')
      }
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";

</style>
