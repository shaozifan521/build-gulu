<template>
  <button class="g-button" :class="{[`icon-${iconPosition}`]: true}" @click="$emit('click')">
    <g-icon class="icon" v-if="icon && !loading" :iconName="icon"></g-icon>
    <g-icon v-if="loading" class="loading" iconName="loading"></g-icon>
    <!-- slot标签添加类名没有作用，会自动消失，所以需要在外层加一个div -->
    <div class="content">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    icon: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
    iconPosition: {
      type: String,
      default: 'left',
      // 自定义验证函数
      validator: function (value) {
        // 这个值必须匹配下列字符串中的一个，当验证失败的时候控制台会抛出一个错误警告
        return ['left', 'right'].indexOf(value) !== -1
      }
    }
  },
  data () {
    return {
      count: '按钮1'
    }
  }
}
</script>

<style scoped lang="scss">
  @keyframes spin {
    0% {transform: rotate(0deg);}
    100% {transform: rotate(360deg);}
  }
  .g-button {
    height: 32px;
    background-color: white;
    font-size: 14px;
    padding: 0 1em;
    border-radius: 4px;
    border: 1px solid #999;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    // 盒子开启inline就会出现子元素水平位置对不起的bug，css的问题不要深究，根据经验一般加上这个属性，只要值不是默认的就可以解决
    vertical-align: middle;
    &:hover {
      border-color: #666;
    }
    &:active {
      background-color: #eee;
    }
    &:focus {
      outline: none;
    }
    .icon {
      margin-right: 0.3em;
    }
    .loading {
      animation: spin 1s infinite linear;
      margin-right: 0.3em;
    }
  }
  .icon-right {
    .icon {
      order: 2;
      margin-left: 0.3em;
      margin-right: 0;
    }
    .content {
      order: 1;
    }
  }
</style>
