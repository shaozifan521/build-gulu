<template>
  <div class="layout" :class="layoutClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {
      layoutClass: {
        hasSider: false
      }
    }
  },
  mounted() {
    this.$children.forEach(child => {
      if (child.$options.name === 'GuluSider') {
        this.layoutClass.hasSider = true
      }
    })
  },
}
</script>

<style scoped lang="scss">
  .layout {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
  .hasSider {
    flex-direction: row;
  }
</style>
