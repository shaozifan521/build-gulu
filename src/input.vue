<template>
  <div class="wrapper">
    <input type="text" :class="{error}" :disabled="disabled" :readonly="readonly">
    <!-- 这里如果用div当盒子，检查元素时会多出一个div，但是用template既可以当做整体，又不会多出一个div元素 -->
    <template v-if="error">
      <g-icon class="icon-error" iconName="error"></g-icon>
      <span class="errorMsg">{{error}}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
  $height: 32px;
  $border-color: #999;
  $border-color-hover: #666;
  $border-radius: 4px;
  $font-size: 14px;
  $box-shadow-color: rgba(0, 0, 0, 0.5);
  $red: #F1453D;
  .wrapper {
    display: inline-flex;
    align-items: center;
    font-size: $font-size;
    :not(:last-child) {
      margin-right: 0.3em;
    }
    input {
      height: $height;
      font-size: inherit;
      border: 1px solid $border-color;
      padding: 0 8px;
      border-radius: $border-radius;
      &:hover {
        border-color: $border-color-hover;
      }
      &:focus {
        box-shadow: inset 0 1px 3px $box-shadow-color;
        outline: none;
      }
      &[disabled], &[readonly] {
        border-color: #bbb;
        color: #bbb;
        cursor: not-allowed;
      }
    }
    .error {
      border-color: $red;
    }
    .icon-error {
      fill: $red;
    }
    .errorMsg {
      color: $red;
    }
  }
</style>
