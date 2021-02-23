<template>
  <div ref="popover" class="popover" @click="onClick" >
    <div ref="contentWrapper" v-if="visible" class="content-wrapper" :class="{[`position-${position}`]: true}">
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
  props: {
    position: {
      type: String,
      default: 'top',
      validator: function (value) {
        return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      visible: false
    }
  },
  methods: {
    positionContent () {
      const contentWrapper = this.$refs.contentWrapper
      // 如果用户给 popover 外面套一个div，并且加上 overfollow: hidenn 属性，弹出内容就看不到了，所以需要把元素放在body上
      document.body.appendChild(contentWrapper)
      let {width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
      // 如果用户给 popover 上面加一个盒子并且大小出现滚动条，如果不加上 window.scrollX 相对滚动的距离，则弹窗内容会出现样式偏差
      if (this.position === 'top') {
        contentWrapper.style.left = left + window.scrollX + 'px'
        contentWrapper.style.top = top + window.scrollY + 'px'
      } else if (this.position === 'bottom') {
        contentWrapper.style.left = left + window.scrollX + 'px'
        contentWrapper.style.top = top + height + window.scrollY + 'px'
      } else if (this.position === 'left') {
        let {height: cHeight} = contentWrapper.getBoundingClientRect()
        contentWrapper.style.left = left + window.scrollX + 'px'
        contentWrapper.style.top = top + window.scrollY - (cHeight - height) / 2 + 'px'
      } else if (this.position === 'right') {
        let {height: cHeight} = contentWrapper.getBoundingClientRect()
        contentWrapper.style.left = left + window.scrollX + width + 'px'
        contentWrapper.style.top = top + window.scrollY - (cHeight - height) / 2 + 'px'
      }
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
    position: relative;
    .trigger-wrapper {
      display: inline-block
    }
  }
  .content-wrapper {
    position: absolute;
    border: 1px solid #333;
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
    padding: 1em;
    max-width: 20em;
    word-wrap: break-word;
    background: white;
    ::before, ::after {
      content: '';
      border: 10px solid transparent;
      width: 0;
      height: 0;
      display: block;
      position: absolute;
    }
  }
  .position-top {
    transform: translateY(-100%);
    margin-top: -15px;
    ::before {
      top: 100%;
      left: 10px;
      border-top-color: black;
    }
    ::after {
      top: calc(100% - 1px);
      left: 10px;
      border-top-color: white;
    }
  }
  .position-bottom {
    margin-top: 15px;
    ::before {
      bottom: 100%;
      left: 10px;
      border-bottom-color: black;
    }
    ::after {
      bottom: calc(100% - 1px);
      left: 10px;
      border-bottom-color: white;
    }
  }
  .position-left {
    transform: translateX(-100%);
    margin-left: -15px;
    ::before {
      top: 50%;
      transform: translateY(-50%);
      left: 100%;
      border-left-color: black;
    }
    ::after {
      top: 50%;
      transform: translateY(-50%);
      left: calc(100% - 1px);
      border-left-color: white;
    }
  }
  .position-right {
    // transform: translateX(-100%);
    margin-left: 15px;
    ::before {
      top: 50%;
      transform: translateY(-50%) translateX(-100%);;
      left: calc(0% - 1px);
      border-right-color: black;
    }
    ::after {
      top: 50%;
      transform: translateY(-50%) translateX(-100%);
      left: 0%;
      border-right-color: white;
    }
  }
</style>
