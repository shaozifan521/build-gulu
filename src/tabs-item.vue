<template>
  <div class="g-tabs-item" @click="xxx" :class="classes">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String|Number,
      required: true
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
        active: this.active
      }
    }
  },
  methods: {
    xxx () {
      this.eventBus.$emit('update:selected', this.name)
    }
  },
}
</script>

<style scoped lang="scss">
  .g-tabs-item {
    padding: 0 3em;
    flex-shrink: 0;
  }
  .active {
    background: red;
  }
</style>
