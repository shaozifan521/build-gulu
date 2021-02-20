<template>
  <div class="popover" @click.stop="onClick">
    <div class="content-wreapper" v-if="visible" @click.stop>
      <slot name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GuluPopover',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    onClick () {
      this.visible = !this.visible
      if (this.visible === true) {
        let eventHandler = () => {
          this.visible = false
          console.log(1111)
          document.removeEventListener('click', eventHandler)
        }
        document.addEventListener('click', eventHandler)
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .popover {
    display: inline-block;
    // vertical-align: top;
    position: relative;
    .content-wreapper {
      position: absolute;
      bottom: 100%;
      left: 0;
      border: 1px solid pink;
    }
  }
</style>
