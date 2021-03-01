<template>
  <div>
    <div class="trigger">
      <slot></slot>
    </div>
    <div class="popover">
      <div v-for="(item, index) in source" :key="index">
        <!-- 引入的递归组件 -->
        <cascader-item :sourceItem="item"></cascader-item>
      </div>
    </div>
  </div>
</template>

<script>
import CascaderItem from './cascader-item'
export default {
  name: "GuluCascader",
  props: {
    source: {
      type: Array
    }
  },
  data () {
    return {

    }
  },
  components: {
    CascaderItem
  }
}
</script>

<style scoped lang="scss">

</style>
