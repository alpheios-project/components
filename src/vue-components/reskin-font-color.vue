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

    $baseSize: 22px;

    .alpheios-skin_properties {
    	margin: 0;
    	padding: 0;
    	list-style: none;

    	li {
    		display: inline-block;
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
                width: $baseSize * 0.8;
                height: $baseSize * 0.8;
                line-height: $baseSize * 0.8;
                border-radius: $baseSize/2  * 0.8;
    		}
    		&.alpheios-large_font {
    			font-size: 120%;
                width: $baseSize * 1.2;
                height: $baseSize * 1.2;
                line-height: $baseSize * 1.2;
                border-radius: $baseSize/2  * 1.2;
    		}
    	}
    }
</style>