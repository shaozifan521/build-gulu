<template>
  <div class="col" :class="[`col-${span}`, `offset-${offset}`]" :style="{ 'padding-left': gutter / 2 + 'px', 'padding-right': gutter / 2 + 'px' }">
    <div style="border: 1px solid green; height: 100px;">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    span: {
      type: [String, Number]
    },
    offset: {
      type: [String, Number]
    }
  },
  data () {
    return {
      gutter: 0
    }
  }
}
</script>

<style scoped lang="scss">
  .col {
    // height: 100px;
    width: 50%; // 列的宽度固定50%，为什么三列会自动分布？因为 flex-wrap 属性默认是不换行，改成 flex-wrap: wrap 就会换行显示了
    // background-color: gray;
    // border: 1px solid pink;
    // for循环
    @for $i from 1 through 24 {
      &.col-#{$i} {
        width: ($i / 24) * 100%;
      }
    }
    @for $i from 1 through 24 {
      &.offset-#{$i} {
        margin-left: ($i / 24) * 100%;
      }
    }
  }
</style>
