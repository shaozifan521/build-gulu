<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :sourceItem="source" :height="height"></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from './cascader-items'
export default {
  name: "GuluCascader",
  props: {
    source: {
      type: Array
    },
    height: {
      type: String
    }
  },
  data () {
    return {
      popoverVisible: false,
      item1Seleted: null,
      item2Seleted: null
    }
  },
  computed: {
  },
  components: {
    CascaderItems
  }
}
</script>

<style scoped>
  .cascader {
    position: relative;
  }
  .trigger {
    height: 32px;
    width: 200px;
    border: 1px solid pink;
  }
  .popover {
    position: absolute;
    top: 120%;
    display: flex;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    background: white;
    border-radius: 4px;
  }
</style>
