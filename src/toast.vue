<template>
  <div class="toast">
    <slot></slot>
    <div class="line"></div>
    <span v-if="closeButton" @click="onClickClose()">
      {{closeButton.text}}
    </span>
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
        default: 10
      },
      closeButton: {
        type: Object,
        default () {
          return {
            text: '关闭',
            callBack: undefined
          }
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
  }
</script>

<style scoped lang="scss">
  $font-size: 14px;
  $toast-height: 40px;
  $toast-bg: rgba(0, 0, 0, 0.75);
  .toast {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: $toast-height;
    line-height: 1.8;
    background: $toast-bg;
    display: flex;
    align-items: center;
    color: white;
    padding: 0 16px;
    border-radius: 4px;
    font-size: $font-size;
    box-shadow: 0 0 3px 0 rgba(0, 0, 0, 0.50);
    .line {
      height: 100%;
      border-left: 1px solid #666;
      margin: 0 16px;
    }
  }
</style>
