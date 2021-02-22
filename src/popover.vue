<template>
  <div ref="popover" class="popover" @click="onClick">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible">
      <slot name="content"></slot>
    </div>
    <span class="trigger-wrapper" ref="triggerWrapper">
      <slot></slot>
    </span>
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
    positionContent () {
      // 如果用户给 popover 外面套一个div，并且加上 overfollow: hidenn 属性，弹出内容就看不到了，所以需要把元素放在body上
      document.body.appendChild(this.$refs.contentWrapper)
      let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
      // 如果用户给 popover 上面加一个盒子并且大小出现滚动条，如果不加上 window.scrollX 相对滚动的距离，则弹窗内容会出现样式偏差
      this.$refs.contentWrapper.style.left = left + window.scrollX + 'px'
      this.$refs.contentWrapper.style.top = top + window.scrollY + 'px'
    },
    onClickDocument (e) {
      if ((this.$refs.popover && this.$refs.popover.contains(e.target)) || (this.$refs.contentWrapper && this.$refs.contentWrapper.contains(e.target))) {
        return
      }
      this.close()
    },
    open () {
      this.visible = true
      this.$nextTick(() => {
        this.positionContent()
        console.log('监听开始')
        document.addEventListener('click', this.onClickDocument)
      })
    },
    close () {
      this.visible = false
      console.log('关闭监听')
      document.removeEventListener('click', this.onClickDocument)
    },
    onClick (event) {
      if (this.$refs.triggerWrapper.contains(event.target)) {
        if (this.visible === true) {
          this.close()
        } else {
          this.open()
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .popover {
    display: inline-block;
    vertical-align: top;
    position: relative;
    .trigger-wrapper {
      display: inline-block
    }
  }
  .content-wrapper {
    position: absolute;
    border: 1px solid #333;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    transform: translateY(-100%);
  }
</style>
