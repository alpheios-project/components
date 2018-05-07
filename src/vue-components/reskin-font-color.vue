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
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-skin_panel {
    	display: inline-block;
    }
    .alpheios-skin_properties {
    	margin: 0;
    	padding: 0;
    	list-style: none;

    	li {
    		display: inline-block;
    		font-size: 16px;

    		width: 20px;
    		height: 20px;
    		text-align: center;
    		line-height: 20px;

    		color: #fff;
    		background: #27323b;
    		border-radius: 10px;

    		&.alpheios-small_font {
    			font-size: 80%;
    		}
    		&.alpheios-large_font {
    			font-size: 120%;
    		}
    	}
    }
</style>