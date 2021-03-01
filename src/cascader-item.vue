<template>
  <div class="cascader-item">
    {{sourceItem.name}}
    <gulu-cascader-item v-for="(item, index) in sourceItem.children" :key="index" v-if="sourceItem.children" :sourceItem="item"></gulu-cascader-item>
  </div>
</template>

<script>
export default {
  name: "GuluCascaderItem",
  props: {
    sourceItem: {
      type: Object
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  .cascader-item {
    border: 1px solid pink;
    margin: 10px;
  }
</style>
