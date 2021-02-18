<template>
  <div class="g-tabs">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
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
    this.eventBus.$emit('update:selected', this.selected)
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
