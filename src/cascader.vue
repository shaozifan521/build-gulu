<template>
  <div class="cascader" ref="cascader" v-click-outside="close">
    <div class="trigger" @click="toggle">
      {{result || '&nbsp;'}}
    </div>
    <div class="popover-wrapper" v-if="popoverVisible">
      <cascader-items :items="source" class="popover" :loadData="loadData"
        :loading-item="loadingItem"
        :height="popoverHeight" :selected="selected" @update:selected="onUpdateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
  import CascaderItems from './cascader-items'
  import ClickOutside from './click-outside'
  export default {
    name: 'GuluCascader',
    components: {CascaderItems},
    // 引入自定义指令
    directives: {ClickOutside},
    props: {
      // 数据源
      source: {
        type: Array
      },
      // 用户可自定义组件高度
      popoverHeight: {
        type: String
      },
      // 用户选中的值
      selected: {
        type: Array,
        default: () => {return []}
      },
      // 包含选中节点子数据的函数
      loadData: {
        type: Function
      }
    },
    data () {
      return {
        popoverVisible: false, // 控制 cascader 组件显隐
        loadingItem: {},
      }
    },
    updated () {
    },
    methods: {
      open () {
        this.popoverVisible = true
      },
      close () {
        this.popoverVisible = false
      },
      toggle () {
        if (this.popoverVisible === true) {
          this.close()
        } else {
          this.open()
        }
      },
      onUpdateSelected (newSelected) {
        this.$emit('update:selected', newSelected)
        let lastItem = newSelected[newSelected.length - 1]
        let simplest = (children, id) => {
          return children.filter(item => item.id === id)[0]
        }
        // 在所有数据找出点击的最后一项
        let complex = (children, id) => {
          // children 所有数据
          // id 选中的最后一项id
          let noChildren = [] // 保存没有叶子节点的数据
          let hasChildren = [] // 保存有叶子节点的数据
          children.forEach(item => {
            if (item.children) {
              hasChildren.push(item)
            } else {
              noChildren.push(item)
            }
          })
          let found = simplest(noChildren, id)
          if (found) {
            return found
          } else {
            found = simplest(hasChildren, id)
            if (found) { return found }
            else {
              for (let i = 0; i < hasChildren.length; i++) {
                found = complex(hasChildren[i].children, id)
                if (found) {
                  return found
                }
              }
              return undefined
            }
          }
        }
        let updateSource = (result) => {
          this.loadingItem = {}
          let copy = JSON.parse(JSON.stringify(this.source))
          // 获取到点击的最后一项
          let toUpdate = complex(copy, lastItem.id)
          // 把当前选中数据的子数据赋值给最后点击的那一项
          toUpdate.children = result
          this.$emit('update:source', copy)
        }
        if (!lastItem.isLeaf && this.loadData) {
          this.loadData(lastItem, updateSource) // 回调:把别人传给我的函数调用一下
          // 调回调的时候传一个函数,这个函数理论应该被调用
          this.loadingItem = lastItem
        }
        // 如果选中末级则关闭弹出框
        if (lastItem.isLeaf) {
          this.close()
        }
      }
    },
    computed: {
      result () {
        return this.selected.map((item) => item.name).join('/')
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "var";
  .cascader {
    display: inline-block;
    position: relative;
    .trigger {
      background: white;
      height: $input-height;
      display: inline-flex;
      align-items: center;
      padding: 0 1em;
      min-width: 10em;
      border: 1px solid $border-color;
      border-radius: $border-radius;
    }
    .popover-wrapper {
      position: absolute; top: 100%; left: 0; background: white; display: flex;
      margin-top: 8px;z-index: 1;
      @extend .box-shadow;
    }
  }
</style>