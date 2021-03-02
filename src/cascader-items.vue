<template>
  <div class="cascader-items">
    <div class="left">
      <div v-for="(item, index) in sourceItem" :key="index" @click="leftSeleted = item">
        {{item.name}}
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <gulu-cascader-items :sourceItem="rightItems"></gulu-cascader-items>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuluCascaderItems",
  props: {
    sourceItem: {
      type: Array
    }
  },
  data () {
    return {
      leftSeleted: null
    }
  },
   computed: {
     rightItems () {
       if (this.leftSeleted && this.leftSeleted.children) {
         return this.leftSeleted.children
       } else {
         return null
       }
     }
   }
}
</script>

<style scoped lang="scss">
  .cascader-items {
    border: 1px solid pink;
    display: flex;
    margin-top: -1px;
  }
</style>
