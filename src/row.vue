<template>
  <div class="row" :style="rowStyle">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    gutter: {
      type: [String, Number]
    }
  },
  data () {
    return {

    }
  },
  mounted() {
    this.$children.forEach(vm => {
      vm.gutter = this.gutter
    })
  },
  computed: {
    rowStyle () {
      let { gutter } = this
      return {
         'margin-left': -gutter / 2 + 'px',
         'margin-right': -gutter / 2 + 'px' 
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .row {
    display: flex;
    flex-wrap: wrap;
  }
</style>
