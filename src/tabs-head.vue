<template>
  <div class="g-tabs-head">
    <slot></slot>
    <div class="line" ref="line"></div>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuluTabsHead',
  data () {
    return {

    }
  },
  inject: ['eventBus'],
  mounted () {
    this.eventBus.$on('update:selected', (name, vm) => {
      this.$refs.line.style.width = vm.$el.getBoundingClientRect().width + 'px'
      this.$refs.line.style.left = vm.$el.getBoundingClientRect().left + 'px'
    })
  },
}
</script>

<style scoped lang="scss">
  $height: 40px;
  .g-tabs-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: $height;
    position: relative;
    border-bottom: 1px solid #ddd;
    .actions {
      margin-left: auto;
      padding: 2em;
    }
    .line {
      position: absolute;
      bottom: 0;
      left: 0;
      border-bottom: 1px solid blue;
      width: 100px;
      transition: all 350ms;
    }
  }
</style>
