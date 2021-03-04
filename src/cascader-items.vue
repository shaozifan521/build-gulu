<template>
  <div class="cascader-items" :style="{height: height}">
    <div class="left">
      <div class="label" v-for="(item, index) in sourceItem" :key="index" @click="leftSeleted = item">
        {{item.name}}
        <g-icon class="icon" v-if="item.children" iconName="right"></g-icon>
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
    },
    height: {
      type: String
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
    display: flex;
    min-width: 85px;
    .left {
      padding: 10px;
      height: 100%;
      .label {
        display: flex;
        align-items: center;
        .icon {
          margin-left: 0.8em;
          transform: scale(0.8);
        }
      }
    }
    .right {
      height: 100%;
      border-left: 1px solid #e8e8e8;
    }
  }
</style>
