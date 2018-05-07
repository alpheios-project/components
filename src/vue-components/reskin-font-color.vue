<template>
	<div class="alpheios-skin_panel">
	  <ul class="alpheios-skin_properties">
	  	<li class="alpheios-small_font">A</li>
	  	<li class="alpheios-medium_font">A</li>
	  	<li class="alpheios-large_font">A</li>
	  </ul>
	</div>
</template>
<script>
  export default {
    name: 'ReskinFontColor',
    data () {
      return {
      }
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-skin_panel {
    	display: inline-block;
    }

    $smallSize: 20px;
    $baseSize: 24px;
    $bigSize: 28px;

    .alpheios-skin_properties {
    	margin: 0;
    	padding: 0;
    	list-style: none;

    	li {
    		display: inline-block;
            vertical-align: bottom;
    		font-size: 16px;

    		width: $baseSize;
    		height: $baseSize;
    		text-align: center;
    		line-height: $baseSize;

    		color: #fff;
    		background: #27323b;
    		border-radius: $baseSize/2;

    		&.alpheios-small_font {
    			font-size: 80%;
                width: $smallSize;
                height: $smallSize;
                line-height: $smallSize;
                border-radius: $smallSize;
    		}
    		&.alpheios-large_font {
    			font-size: 120%;
                width: $bigSize;
                height: $bigSize;
                line-height: $bigSize;
                border-radius: $bigSize;
    		}
    	}
    }
</style>