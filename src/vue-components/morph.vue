<template>
  <div class="alpheios-morph__lexemes">
    <div class="alpheios-morph__dictentry" v-for="lex in lexemes" v-show="showLexeme(lex)">
      <span class="alpheios-morph__hdwd alpheios-morph__formtext"
        v-if="! lex.lemma.principalParts.includes(lex.lemma.word)"
        :lang="languageCode(lex.lemma.languageID)">{{ lex.lemma.word }}</span>
      <span class="alpheios-morph__hdwd alpheios-morph__formtext">
        <span class="alpheios-morph__listitem"
          v-for="part in lex.lemma.principalParts" :lang="languageCode(lex.lemma.languageID)">{{ part }}</span>
      </span> :
      <span :class="attributeClass(types.pronunciation)" :data-feature="types.pronunciation"
          v-if="lex.lemma.features[types.pronunciation]">
        [{{lex.lemma.features[types.pronunciation].value}}]
      </span>
      <div class="alpheios-morph__morphdata">
        <span class="alpheios-morph__pofs">
          <inflectionattribute :data="lex.lemma.features" :type="types.grmCase" :linkedfeatures="linkedfeatures"/>
          <inflectionattribute :data="lex.lemma.features" :type="types.gender" :linkedfeatures="linkedfeatures"/>
          <inflectionattribute :data="lex.lemma.features" :type="types.part" :linkedfeatures="linkedfeatures"/>
        </span>
        <inflectionattribute :data="lex.lemma.features" :type="types.kind" :linkedfeatures="linkedfeatures" :decorators="['parenthesize']"/>
        <inflectionattribute :data="lex.lemma.features" :type="types.declension" :linkedfeatures="linkedfeatures" :decorators="['appendtype']"/>
        <inflectionattribute :data="lex.lemma.features" :type="types.conjugation" :linkedfeatures="linkedfeatures" :decorators="['appendtype']"/>
        <span data-feature="extras">{{ featureList(lex.lemma,['age','area','geo','frequency']) }}</span>
        <inflectionattribute :data="lex.lemma.features" :type="types.source" :linkedfeatures="linkedfeatures" :decorators="['brackets']"/>
        <inflectionattribute :data="lex.lemma.features" :type="types.note" :linkedfeatures="linkedfeatures" :decorators="['brackets']"/>
      </div>
      <div v-if="definitions">
        <div v-for="definition in definitions[lex.lemma.key]" class="alpheios-morph__definition" :data-lemmakey="lex.lemma.key">
          <shortdef :definition="definition"></shortdef>
        </div>
      </div>
      <div class="alpheios-morph__inflections">
        <div class="alpheios-morph__inflset" v-for="inflset in lex.getGroupedInflections()">
          <div class="alpheios-morph__forms">
            <span class="alpheios-morph__formtext" data-grouplevel="1" data-feature="prefix" v-if="inflset.groupingKey.prefix">{{inflset.groupingKey.prefix}} </span>
            <span class="alpheios-morph__formtext" data-grouplevel="1" data-feature="stem">{{inflset.groupingKey.stem}}</span>
            <span class="alpheios-morph__formtext" data-grouplevel="1" data-feature="suffix" v-if="inflset.groupingKey.suffix"> -{{inflset.groupingKey.suffix}}</span>
            <span class="alpheios-morph__inflfeatures">
              <inflectionattribute :data="inflset.groupingKey" :type="types.part" :linkedfeatures="linkedfeatures" :group="1"
                v-if="! featureMatch(lex.lemma.features[types.part],inflset.groupingKey[types.part])"/>
              <inflectionattribute :data="inflset.groupingKey" :type="types.declension" :linkedfeatures="linkedfeatures" :group="1" :decorators="['appendtype']"
                v-if="inflset.groupingKey.declension && ! featureMatch(inflset.groupingKey.declension,lex.lemma.features.declension)"/>
            </span>
            <div class="alpheios-morph__inflgroup" v-for="group in inflset.inflections">
              <span v-if="group.groupingKey.isCaseInflectionSet">
                <inflectionattribute :data="group.groupingKey" :type="types.number" :linkedfeatures="linkedfeatures" :group="2"/>
                <inflectionattribute :data="group.groupingKey" :type="types.tense" :linkedfeatures="linkedfeatures" :group="2"/>
              </span>
              <div v-for="nextGroup in group.inflections"
                :class="groupClass(group)">
                <span v-if="group.groupingKey.isCaseInflectionSet" class="alpheios-morph__colonlast">
                  <inflectionattribute :data="nextGroup.groupingKey" :type="types.tense" :linkedfeatures="linkedfeatures" :group="3"/>
                  <inflectionattribute :data="nextGroup.groupingKey" :type="types.voice" :linkedfeatures="linkedfeatures" :group="3"/>
                </span>
                <div v-for="infl in nextGroup.inflections"
                  :class="groupClass(group)">
                    <inflectionattributegroup :linkedfeatures="linkedfeatures" :parentType="types.grmCase" :childTypes="[types.gender,types.comparison]":group="4" :data="infl.groupingKey"></inflectionattributegroup>
                    <inflectionattribute :data="infl.groupingKey" :type="types.person" :linkedfeatures="linkedfeatures" :group="4" :decorators="['appendtype']"/>
                    <inflectionattribute :data="infl.groupingKey" :type="types.number" :linkedfeatures="linkedfeatures" :group="4" :decorators="['appendtype']"
                      v-if="! group.groupingKey.isCaseInflectionSet"/>
                    <inflectionattribute :data="infl.groupingKey" :type="types.tense" :linkedfeatures="linkedfeatures" :group="4" :decorators="['appendtype']"
                      v-if="! group.groupingKey.isCaseInflectionSet"/>
                    <inflectionattribute :data="infl.groupingKey" :type="types.mood" :linkedfeatures="linkedfeatures" :group="4" :decorators="['appendtype']"
                      v-if="! group.groupingKey.isCaseInflectionSet"/>
                    <inflectionattribute :data="infl.groupingKey" :type="types.voice" :linkedfeatures="linkedfeatures" :group="4" :decorators="['appendtype']"
                      v-if="! group.groupingKey.isCaseInflectionSet"/>
                    <span v-for="item in infl.inflections">
                      <span class="alpheios-morph__example" v-if="item.example">{{ item.example }}</span>
                    </span>
                </div><!-- end infl -->
              </div><!-- end forms -->
            </div><!-- end groupinflections -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { LanguageModelFactory, GrmFeature } from 'alpheios-data-models'
  import ShortDef from './shortdef.vue'
  import InflectionAttribute from './infl-attribute.vue'
  import InflectionAttributeGroup from './infl-attribute-group.vue'

  export default {
    name: 'Morph',
    components: { shortdef: ShortDef, inflectionattributegroup: InflectionAttributeGroup, inflectionattribute: InflectionAttribute },
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
        }
    },
    data: function () {
      return {
        showSource: false
      }
    },
    created: function () {
      this.types = GrmFeature.types
    },
    methods: {
      groupClass(group) {
        return group.groupingKey.isCaseInflectionSet ? 'alpheios-morph__inline' : 'alpheios-morph__block'
      },
      attributeClass(featureType,...extras) {
        let classList = []
        if (this.linkedfeatures.includes(featureType)) {
          classList.push('alpheios-morph__linkedattr')
        } else {
          classList.push('alpheios-morph__attr')
        }
        classList.push(...extras)
        return classList.join(' ')
      },
      featureMatch (a, b) {
        if (a && b) {
          return a.isEqual(b)
        }
        return false

      },
      sendFeature(features) {
        let tosend = features
        if (Array.isArray(features)) {
          // TODO eventually we should support multiple features but
          // for the moment just send the first
          tosend = features[0]
        }
        if (this.linkedfeatures.includes(tosend.type)) {
          this.$emit('sendfeature',tosend)
        }
        else return false
      },
      showLexeme(lex) {
        return lex.isPopulated()
      },
      featureList(lemma,features) {
        let list = features.map(i => lemma.features[i] ? GrmFeature.toFeature(lemma.features[i]): null).filter(i => i)
        return list.length > 0 ? `(${list.map((f)=>f).join(', ')})` : ''
      },
      languageCode (languageID) {
        return LanguageModelFactory.getLanguageCodeFromId(languageID)
      }
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";

  .alpheios-morph__lexemes {
    color: $alpheios-tools-color;
  }
  .alpheios-morph__dictentry {
    margin-bottom: .5em;
    padding-bottom: 5px;
    clear: both;
  }

  .alpheios-morph__formtext {
    font-weight: bold;
  }

  .alpheios-morph__dictentry .alpheios-morph__formtext {
    font-size: larger;
  }

  .alpheios-morph__dictentry .alpheios-morph__forms .alpheios-morph__formtext {
    font-size: inherit;
  }

  .alpheios-morph__source {
    font-size: smaller;
    color: $alpheios-toolbar-color;
    font-style: italic;
  }

  .alpheios-morph__dial {
      font-size: smaller;
  }

  .alpheios-morph__attr {
      font-weight: normal;
      padding-right: .25em;
  }

  .alpheios-morph__linkedattr {
    color: $alpheios-link-color;
  	font-weight: bold;
  	cursor: pointer;
    padding-right: .25em;
  }

  .alpheios-morph__linkedattr:hover {
      color: $alpheios-link-hover-color !important;
  }

  .alpheios-morph__pofs span:last-child:after {
      content: ";";
  }

  .alpheios-morph__inflset {
      margin-left: .5em;
      margin-top: .5em;
  }

  .alpheios-morph__inflset h5 {
      display: none;
      font-size: $alpheios-base-font-size;
      line-height: 1;
      margin-bottom: .5em;
  }

  .alpheios-morph__inflset:first-child h5 {
      color: $alpheios-toolbar-color;
      display: block;
  }

  .alpheios-morph__morphdata {
    display: inline;
  }

  .alpheios-morph__inflections, .alpheios-morph__definition, .alpheios-morph__forms {
    margin-left: .5em;
  }

  .alpheios-morph__listitem:after {
      content: ", ";
   }

  .alpheios-morph__listitem:last-child:after {
      content: "";
   }

   .alpheios-morph__list .alpheios-morph__infl:first-child .alpheios-morph__showiffirst {
     display: block;
   }

   .alpheios-morph__list .alpheios-morph__infl .alpheios-morph__showiffirst {
     display: none;
   }

   .alpheios-morph__lexemes .alpheios-definition__lemma {
       display: none;
   }

   div.alpheios-morph__inline {
       display: inline;
   }

   div.alpheios-morph__block {
       display: block;
   }

   .alpheios-panel__tab-panel .alpheios-morph__lexemes {
    font-size: .75rem;
   }

  .alpheios-morph__inflfeatures span:first-child:before {
    content: '(';
  }

  .alpheios-morph__inflfeatures span:last-child:after {
    content: ')';
  }
  .alpheios-morph__colonlast span:last-child:after {
    content: ':';
  }
</style>
