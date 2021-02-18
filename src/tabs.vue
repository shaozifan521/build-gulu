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
