<template>
  <div class="g-tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'GuluTabs',
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      // 为什么这么用到 new Vue() ？因为它的实例对象具备$emit $on $off事件方法  
      eventBus: new Vue()
    }
  },
  mounted() {
    if (this.$children.length === 0) {
      throw new Error('g-tabs 的子组件应为 g-tabs-head 和 g-tabs-body，但是你没有写子组件')
    }
    this.$children.forEach(vm => {
      if (vm.$options.name === 'GuluTabsHead') {
        vm.$children.forEach(childVm => {
          if (childVm.$options.name === 'GuluTabsItem' && childVm.name === this.selected) {
            this.eventBus.$emit('update:selected', this.selected, childVm)
          }
        })
      }
    })
  },
  provide () {
    return {
      eventBus: this.eventBus
    }
  }
}
</script>

<style scoped lang="scss">

</style>
