<template>
  <div class="collapse">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'GuluCollapse',
  props: {
    // 是否只能打开一个面板
    single: {
      type: Boolean,
      default: false
    },
    // 默认打开面板参数
    selected: {
      type: Array
    }
  },
  data () {
    return {
      eventBus: new Vue()
    }
  },
  provide () {
    return {
      eventBus: this.eventBus
    }
  },
  mounted() {
    // 初始化默认打开索引数
    this.eventBus.$emit('update:selected', this.selected)
    // 更新子组件中打开索引数
    this.eventBus.$on('update:addSelected', name => {
      let selectedCopy = JSON.parse(JSON.stringify(this.selected))
      if (this.single) {
        selectedCopy = [name]
      } else {
        selectedCopy.push(name)
      }
      this.eventBus.$emit('update:selected', selectedCopy)
      // 把props参数最新更新传回到父组件
      this.$emit('update:selected', selectedCopy)
    })
    // 移除子组件中关闭面板索引数
    this.eventBus.$on('update:removeSelected', name => {
      let selectedCopy = JSON.parse(JSON.stringify(this.selected))
      let index = selectedCopy.indexOf(name)
      selectedCopy.splice(index, 1)
      this.eventBus.$emit('update:selected', selectedCopy)
      this.$emit('update:selected', selectedCopy)
    })
  },
}
</script>

<style scoped lang="scss">
  .collapse {
    border: 1px solid #ddd;
    border-radius: 4px;
  }
</style>
