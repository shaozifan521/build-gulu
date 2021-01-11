<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>

<script>
let validator = (value) => {
  let valid = true
  Object.keys(value).forEach(key => {
    if (!['span'].includes(key)) {
      valid = false
    }
  })
  return valid
}

export default {
  props: {
    span: {
      type: [String, Number]
    },
    offset: {
      type: [String, Number]
    },
    ipad: {
      type: Object,
      validator
    },
    narrowPc: {
      type: Object,
      validator
    },
    pc: {
      type: Object,
      validator
    },
    widePc: {
      type: Object,
      validator
    }
  },
  data () {
    return {
      gutter: 0
    }
  },
  computed: {
    colStyle () {
      let { gutter } = this
      return {
         'padding-left': gutter / 2 + 'px',
         'padding-right': gutter / 2 + 'px'
      }
    },
    colClass () {
      let { span, offset, ipad, narrowPc, pc, widePc } = this
      return [
        span && `col-${span}`,
        offset && `offset-${offset}`,
        ipad && `col-ipad-${ipad.span}`,
        narrowPc && `col-narrow-pc-${narrowPc.span}`,
        pc && `col-pc-${pc.span}`,
        widePc && `col-widePc-${widePc.span}`
      ]
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
    @media (min-width: 577px) {
      @for $i from 1 through 24 {
        &.col-ipad-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    }    
    @media (min-width: 769px) {
      @for $i from 1 through 24 {
        &.col-narrow-pc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    }    
    @media (min-width: 993px) {
      @for $i from 1 through 24 {
        &.col-pc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    } 
    @media (min-width: 1201px) {
      @for $i from 1 through 24 {
        &.col-widePc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    } 
  }
</style>
