<template>
  <div class="row" :style="{ 'margin-letf': -gutter / 2 + 'px', 'margin-right': -gutter / 2 + 'px' }">
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
}
</script>

<style scoped lang="scss">
  .row {
    display: flex;
  }
</style>
