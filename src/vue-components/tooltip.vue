<template>
	<div class="alph_tooltip">
		<slot></slot>
		<span class="tooltiptext  alph_tooltip-bottom">Show inflections</span>
	</div>
</template>
<script>
  export default {
    name: 'tooltip',
    props: {
    }
  }
</script>
<style lang="scss">
  @import "../styles/alpheios";
</style>