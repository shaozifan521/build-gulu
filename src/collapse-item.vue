<template>
  <div class="collapse-item">
    <div class="title" @click="content = !content">
      {{title}}
    </div>
    <div class="content" v-if="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GuluCollapseItem',
  props:{
    title: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      content: true
    }
  }
}
</script>

<style scoped lang="scss">
  .collapse-item {
    border-radius: 4px;
    .title {
      border: 1px solid #ddd;
      margin-left: -1px;
      margin-right: -1px;
      margin-top: -1px;
      padding: 8px;
      min-height: 32px;
      display: flex;
      align-items: center;
    }
    .content {
      padding: 8px;
    }
    &:first-child {
      .title {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
    }
    // 当最后一个元素的title元素变成最后一个元素的时候
    &:last-child {
       .title:last-child {
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        margin-bottom: -1px;
      }
    }
  }
</style>
