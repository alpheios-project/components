<template>
	<div class="alph_tooltip">
		<slot></slot>
		<span class="tooltiptext"
			v-bind:class="directionClass"
		>
			{{ tootlipText }}
		</span>
	</div>
</template>
<script>
  export default {
    name: 'tooltip',
    props: {
      tooltipDirection: {
        type: String,
        required: false,
        default: 'bottom'
      },
      tootlipText: {
      	typr: String,
      	required: true
      }
    },
    computed: {
      directionClass: function() {
        if (this.tooltipDirection.toLowerCase() === 'top') {
          return { 'alph_tooltip-top': true }
        }
        if (this.tooltipDirection.toLowerCase() === 'bottom') {
          return { 'alph_tooltip-bottom': true }
        }
        if (this.tooltipDirection.toLowerCase() === 'left') {
          return { 'alph_tooltip-left': true }
        }
        if (this.tooltipDirection.toLowerCase() === 'right') {
          return { 'alph_tooltip-right': true }
        }
        return {}
      }
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";
</style>