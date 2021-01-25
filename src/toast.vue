<template>
  <div class="wrapper" :class="toastCLass">
    <div class="toast" ref="toast" >
      <div class="message">
        <slot v-if="!enableHtml"></slot>
        <!-- 可以支持传递标签显示 -->
        <div v-else v-html="$slots.default"></div>
      </div>
      <div class="line" ref="line"></div>
      <span class="close" v-if="closeButton" @click="onClickClose()">
        {{closeButton.text}}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      autoClose: {
        type: Boolean,
        default: true
      },
      autoCloseDelay: {
        type: Number,
        default: 100
      },
      closeButton: {
        type: Object,
        default () {
          return {
            text: '关闭',
            callBack: undefined
          }
        }
      },
      enableHtml: {
        type: Boolean,
        default: false
      },
      position: {
        type: String,
        default: 'top',
        validator (value) {
          return ['top', 'bottom', 'middle'].indexOf(value) !== -1
        }
      }
    },
    data () {
      return {

      }
    },
    mounted() {
      if (this.autoClose) {
        setTimeout(() => {
          this.close()
        }, this.autoCloseDelay * 1000);
      }
      this.$nextTick(() => {
        this.$refs.line.style.height = this.$refs.toast.getBoundingClientRect().height + 'px'
      })
    },
    methods: {
      close () {
        // remove 只是会清除掉这个实例渲染到页面上的dom节点，绑定的实例并没有清除。
        // destroy 完全销毁一个实例。清理它与其它实例的连接，解绑它的全部指令及事件监听器。
        this.$el.remove()
        this.$destroy()
      },
      log () {
        console.log('测试')
      },
      onClickClose () {
        this.close()
        if (this.closeButton && typeof this.closeButton.callBack === 'function') {
          this.closeButton.callBack(this)
        }
      }
    },
    computed: {
      toastCLass () {
        return {[`positon-${this.position}`]: true}
      }
    }
  }
</script>

<style scoped lang="scss">
  $font-size: 14px;
  $toast-min-height: 40px;
  $toast-bg: rgba(0, 0, 0, 0.75);
  @keyframes slide-up {
    0% {opacity: 0; transform: translateY(100%);}
    100% {opacity: 1;transform: translateY(0%);}
  }
  @keyframes slide-down {
    0% {opacity: 0; transform: translateY(-100%);}
    100% {opacity: 1;transform: translateY(0%);}
  }
  @keyframes fade-in {
    0% {opacity: 0;}
    100% {opacity: 1;}
  }
  .wrapper {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    $animation-duration: 300ms;
    &.positon-top {
      top: 0;
      .toast {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        animation: slide-down $animation-duration;
      }
    }
    &.positon-bottom {
      bottom: 0;
      .toast {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
        animation: slide-up $animation-duration;
      }
    }
    &.positon-middle {
      top: 50%;
      transform: translateX(-50%) translateY(-50%);
      .toast {
        animation: fade-in $animation-duration;
      }
    }
    .toast {
      min-height: $toast-min-height;
      line-height: 1.8;
      background: $toast-bg;
      display: flex;
      align-items: center;
      color: white;
      padding: 0 16px;
      border-radius: 4px;
      font-size: $font-size;
      box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
      .message {
        padding: 8px 0;
      }
      .line {
        height: 100%;
        border-left: 1px solid #666;
        margin: 0 16px;
      }
      .close {
        flex-shrink: 0;
      }
    }
  }
</style>
