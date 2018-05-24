<template>
  <div>
    <div class="alpheios-morph__lexemes morph-inner-v1">
      <morph-inner
        v-for = "(lex,index) in lexemes"
        v-show = "showLexeme(lex)"
        :key = "lex.lemma.key"
        :lex = "lex"
        :index = "index"
        :count = "lexemes.length"
        :inflDataReady = "inflDataReady"
        :definitions = "definitions[lex.lemma.key] ? definitions[lex.lemma.key] : []"
        :linkedfeatures = "linkedfeatures"
        :translations = "translations"
        @sendfeature = "sendFeature"
        ></morph-inner>
    </div><!--alpheios-morph__lexemes-->
  </div>
</template>
<script>
  import MorphInner from './morph-inner-v1.vue'

  export default {
    name: 'Morph',
    components: { morphInner: MorphInner },
    props: {
        lexemes: {
          type: Array,
          required: true
        },
        definitions: {
          type: Object,
          required: false,
          default: () => {}
        },
        linkedfeatures: {
          type: Array,
          required: false,
          default: () => []
        },
        translations: {
          type: Object,
          required: false,
          default: () => {}
        },
        inflDataReady: {
          type: Boolean,
          required: true
        }
    },
    methods: {
      showLexeme(lex) {
        return lex.isPopulated()
      },
      sendFeature (data) {
        this.$emit('sendfeature',data)
      },
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";

  .alpheios-morph__lexemes {
    color: $alpheios-tools-color;
  }
</style>
