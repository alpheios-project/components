<template>
    <div class="alpheios-inflections__forms-cont">
        <span class="alpheios-inflections__forms-targetword">"{{ targetWord }}"</span>
        <span v-if="forms && forms.length >0" class="alpheios-inflections__form-parts">
          <span>(</span>
          <span class="alpheios-inflections__form-part" v-for="(form, index) in forms">
            {{ form }}<span v-if="index < forms.length-1">, </span>
          </span>
          <span>)</span>
        </span>
    </div>
</template>
<script>
  import {Constants} from 'alpheios-data-models'

  export default {
    name: 'WordForms',

    props: {
      // This will be an InflectionData object
      partOfSpeech: {
        type: String,
        required: true
      },
      targetWord: {
        type: String,
        required: true
      },
      lexemes: {
        type: Array,
        required: true
      }
    },
    computed: {
      forms: function () {
        return this.defineFormsBySelectedView()
      }
    },
    methods: {
      defineFormsBySelectedView: function () {
        let forms = new Set()
        for (let lexeme of this.lexemes) {
          for (let inflection of lexeme.inflections) {
          	if (inflection['part of speech'].values.includes(this.partOfSpeech)) {
          	  let direction = inflection.model.direction
          	  let form, prefix, suffix
          	
          	  if (direction === Constants.LANG_DIR_RTL) {
          	  	prefix = inflection.prefix ? ` - ${inflection.prefix}` : ''
          	  	suffix = inflection.suffix ? `${inflection.suffix} - ` : ''

          	    form = suffix + inflection.stem + prefix
          	  } else {
          	  	prefix = inflection.prefix ? `${inflection.prefix} - ` : ''
          	  	suffix = inflection.suffix ? ` - ${inflection.suffix}` : ''

          	    form = prefix + inflection.stem + suffix
          	  }
          	  forms.add(form)
            }
          }
        }
        return Array.from(forms.values())
      }
    }

  }
</script>
<style>
	.alpheios-inflections__form-parts {
	  display: inline-block;
	}
    .alpheios-inflections__forms-targetword {
      font-weight: bold;
    }
    .alpheios-inflections__forms-cont {
      padding-right: 30px;
    }
    .alpheios-inflections__control-btn-cont {
      padding-left: 30px;
    }
</style>