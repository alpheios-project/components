<template>
  <div class="alpheios-treebank">
    <iframe class="alpheios-treebank__frame" :src="res.url"></iframe>
  </div>
</template>
<script>
  export default {
    name: 'Treebank',
    props: {
      res: {
        type: Object,
        required: true
      },
    }
  }
</script>
<style lang="scss">
    @import "../styles/alpheios";

    .alpheios-treebank {
        display: flex;
        flex-direction: column;
    }

    .alpheios-treebank__frame {
        flex: 1 1 100vh;
    }
</style>
