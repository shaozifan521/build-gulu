<template>
  <div class="g-tabs-pane" :class="classes" v-if="active">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GuluTabsPane',
  inject: ['eventBus'],
  props: {
    name: {
      type: String|Number,
      required: true
    }
  },
  data () {
    return {
      active: false
    }
  },
  created () {
    this.eventBus.$on('update:selected', name => {
      this.active = name === this.name
    })
  },
  computed: {
    classes () {
      return {
        active: this.active
      }
    }
  },
}
</script>

<style scoped lang="scss">
  .active {
    // background: yellow;
  }
</style>
