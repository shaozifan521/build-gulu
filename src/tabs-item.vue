<template>
  <div class="g-tabs-item" @click="onClick" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GuluTabsItem',
  props: {
    name: {
      type: String|Number,
      required: true
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  inject: ['eventBus'],
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
        active: this.active,
        disabled: this.disabled
      }
    }
  },
  methods: {
    onClick () {
      if (this.disabled) {
        return
      }
      this.eventBus.$emit('update:selected', this.name, this)
    }
  },
}
</script>

<style scoped lang="scss">
  .g-tabs-item {
    padding: 0 1em;
    flex-shrink: 0;
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .active {
    // background: red;
    color: blue;
  }
  .disabled {
    color: #ddd;
  }
</style>
