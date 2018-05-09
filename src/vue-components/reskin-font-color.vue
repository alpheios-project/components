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

    $smallSize: $alpheios-small-font-size + 2*6px;
    $baseSize: $alpheios-base-font-size + 2*6px;
    $largeSize: $alpheios-large-font-size + 2*6px;

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
    		background: #27323b;
    		border-radius: $baseSize/2;

            cursor: pointer;

    		&.alpheios-small_font {
    			font-size: $alpheios-small-font-size;
                width: $smallSize;
                height: $smallSize;
                line-height: $smallSize;
                border-radius: $smallSize;
    		}
    		&.alpheios-large_font {
    			font-size: $alpheios-large-font-size;
                width: $largeSize;
                height: $largeSize;
                line-height: $largeSize;
                border-radius: $largeSize;
    		}
    	}
    }
</style>