<template>
  <div>
    <div class="trigger" @click="popoverVisible = !popoverVisible">
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :sourceItem="source"></cascader-items>
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

<style scoped lang="scss">
  .trigger {
    height: 32px;
    width: 200px;
    border: 1px solid pink;
  }
  .popover {
    height: 200px;
    width: 500px;
  }
</style>
