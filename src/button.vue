<template>
  <button class="g-button">{{count}}</button>
</template>

<script>
export default {
  data () {
    return {
      count: '按钮1'
    }
  }
}
</script>

<style scoped lang="scss">
  .g-button {
    height: var(--button-height);
    background-color: var(--button-bg);
    font-size: var(--font-size);
    padding: 0 1em;
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    &:hover {
      border-color: var(--border-color-hover);
    }
    &:active {
      background-color: var(--button-active-bg);
    }
    &:focus {
      outline: none;
    }
  }
</style>
