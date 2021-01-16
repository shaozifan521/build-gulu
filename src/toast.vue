<template>
  <div class="toast">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  $font-size: 14px;
  $toast-height: 40px;
  $toast-bg: rgba(0, 0, 0, 0.75);
  .toast {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: $toast-height;
    line-height: 1.8;
    background: $toast-bg;
    display: flex;
    align-items: center;
    color: white;
    padding: 0 16px;
    border-radius: 4px;
    font-size: $font-size;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
  }
</style>
