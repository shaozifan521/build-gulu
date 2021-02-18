<template>
  <div class="g-tabs-head">
    <slot></slot>
    <div class="actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  inject: ['eventBus'],
  created () {
    console.log(this.eventBus)
  }
}
</script>

<style scoped lang="scss">
  $height: 40px;
  .g-tabs-head {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: $height;
    .actions {
      margin-left: auto;
    }
  }
</style>
