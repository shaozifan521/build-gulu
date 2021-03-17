<template>
  <div class="cascader-items" :style="{height: height}">
    <div class="left">
      <div class="label" v-for="(item, index) in sourceItem" :key="index" @click="onClickLabel(item)">
        {{item.name}}
        <g-icon class="icon" v-if="item.children" iconName="right"></g-icon>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <gulu-cascader-items :sourceItem="rightItems" :style="{height: height}" :level="level+1" :selected="selected" @update:selected="onUpdateSelected"></gulu-cascader-items>
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
    },
    selected: {
      type: Array
    },
    level: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      leftSeleted: null
    }
  },
  computed: {
    rightItems () {
      let currentSelected = this.selected[this.level]
      if (currentSelected && currentSelected.children) {
        return currentSelected.children
      } else {
        return null
      }
    }
  },
  methods: {
    onClickLabel (item) {
      let copySelected = JSON.parse(JSON.stringify(this.selected))
      copySelected[this.level] = item
      // splice 更新右侧数据列表
      copySelected.splice(this.level + 1)
      this.$emit('update:selected', copySelected)
    },
    onUpdateSelected (newSelected) {
      this.$emit('update:selected', newSelected)
    }
  },
}
</script>

<style scoped lang="scss">
  .cascader-items {
    display: flex;
    // min-width: 85px;
    height: 200px;
    .left {
      padding: 10px;
      height: 100%;
      overflow-y: auto;
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
