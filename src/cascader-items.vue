<template>
  <div class="cascaderItem" :style="{height: height}">
    <div class="left">
      <div class="label" v-for="(item, idnex) in items" @click="onClickLabel(item)" :key="idnex">
        <span class="name">{{item.name}}</span>
        <span class="icons">
          <template v-if="item.name === loadingItem.name">
            <g-icon class="loading" iconName="loading"></g-icon>
          </template>
          <template v-else>
            <g-icon class="next" v-if="rightArrowVisible(item)" iconName="right"></g-icon>
          </template>
        </span>
      </div>
    </div>
    <div class="right" v-if="rightItems">
      <gulu-cascader-items ref="right" :items="rightItems" :height="height"
        :loading-item="loadingItem"
        :load-data="loadData"
        :level="level+1" :selected="selected" @update:selected="onUpdateSelected"></gulu-cascader-items>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GuluCascaderItems",
    props: {
      items: {
        type: Array
      },
      height: {
        type: String
      },
      loadingItem: {
        type: Object,
        default: () => ({})
      },
      selected: {
        type: Array,
        default: () => []
      },
      loadData: {
        type: Function
      },
      level: {
        type: Number,
        default: 0
      }
    },
    computed: {
      // 递归组件所需数据
      rightItems () {
        if (this.selected[this.level]) {
          let selected = this.items.filter((item) => item.name === this.selected[this.level].name)
          if (selected && selected[0].children && selected[0].children.length > 0) {
            return selected[0].children
          }
        }
        return null
      }
    },
    mounted () {
    },
    methods: {
      // 根据是否是叶子节点判断是否显示右箭头
      rightArrowVisible (item) {
        // console.log(this.loadData)
        // 直接返回!item.isLeaf也可以
        return this.loadData ? !item.isLeaf : item.children
      },
      onClickLabel (item) {
        let copy = JSON.parse(JSON.stringify(this.selected))
        copy[this.level] = item
        copy.splice(this.level + 1) // 一句话
        this.$emit('update:selected', copy)
      },
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "var";
  .cascaderItem {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100px;
    .left {
      height: 100%;
      padding: .3em 0;
      overflow: auto;
    }
    .right {
      height: 100%;
      border-left: 1px solid $border-color-light;
    }
    .label {
      padding: .5em 1em;
      display: flex;
      align-items: center;
      cursor: pointer;
      white-space: nowrap;
      &:hover {
        background: $grey;
      }
      > .name {
        margin-right: 1em;
        user-select: none;
      }
      .icons {
        margin-left: auto;
        .next {
          transform: scale(0.5);
        }
        .loading {
          animation: spin 2s infinite linear;
        }
      }
    }
  }
</style>