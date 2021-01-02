<template>
  <div class="g-button-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  mounted() {
    for (const node of this.$el.children) {
      if (node.nodeName.toLowerCase() !== 'button') {
        console.warn(`g-button-group 的子元素应该全为 g-button，但你写的是 ${node.nodeName.toLowerCase()}`)
      }
    }
  },
}
</script>

<style lang="scss">
  .g-button-group {
    display: inline-flex;
    vertical-align: middle;
    .g-button {
      border-radius: 0;
      &:first-child {
        border-top-left-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
      }
      &:last-child {
        border-bottom-right-radius: var(--border-radius);
        border-top-right-radius: var(--border-radius);
      }
      &:not(:first-child) {
        margin-left: -1px;
      }
      &:hover {
        z-index: 1;
        // position: relative;
      }
    }
  }
</style>
