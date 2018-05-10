<template>
	<div class="alpheios-skin_panel">
	  <ul class="alpheios-skin_properties">
	  	<li class="alpheios-small_font" @click="changeFont('small')">A</li>
	  	<li class="alpheios-medium_font" @click="changeFont('medium')">A</li>
	  	<li class="alpheios-large_font" @click="changeFont('large')">A</li>
	  </ul>
	</div>
</template>
<script>
  export default {
    name: 'ReskinFontColor',
    data () {
      return {
      }
    },
    methods: {
      changeFont (type) {
        this.$parent.$emit('changeFont', type)
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-skin_panel {
    	display: inline-block;
    }

    $baseSize: $alpheios-base-font-size + 12px;

    .alpheios-skin_panel ul.alpheios-skin_properties {
    	margin: 0;
    	padding: 0 30px 0 0;
    	list-style: none;

    	li {
    		display: inline-block;
            vertical-align: bottom;
    		font-size: $alpheios-base-font-size;

    		width: $baseSize;
    		height: $baseSize;
    		text-align: center;
    		line-height: $baseSize;

    		color: #fff;
    		background: $alpheios-toolbar-color;
    		border-radius: $baseSize/2;

            cursor: pointer;

    		&.alpheios-small_font {
    			font-size: $alpheios-base-font-size * 0.8;
                width: $baseSize * 0.8;
                height: $baseSize * 0.8;
                line-height: $baseSize * 0.8;
                border-radius: $baseSize * 0.8 * 0.5;
    		}
    		&.alpheios-large_font {
    			font-size:$alpheios-base-font-size * 1.2;
                width: $baseSize * 1.2;
                height: $baseSize * 1.2;
                line-height: $baseSize * 1.2;
                border-radius: $baseSize * 1.2;
    		}
    	}
    }

    .alpheios-font_medium_class li.alpheios-medium_font {
        background: $alpheios-toolbar-active-color;
    }

    .alpheios-font_small_class li.alpheios-small_font {
        background: $alpheios-toolbar-active-color;
    }

    .alpheios-font_large_class li.alpheios-large_font {
        background: $alpheios-toolbar-active-color;
    }
</style>