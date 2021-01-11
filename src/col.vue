<template>
  <div class="col" :class="colClass" :style="colStyle">
    <div style="background-color: pink; border: 1px solid yellow">
      <slot></slot>
    </div>
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
    phone: {
      type: Object,
      validator
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
      let { span, offset, phone, ipad, narrowPc, pc } = this
      return [
        span && `col-${span}`,
        offset && `offset-${offset}`,
        phone && `col-phone-${phone.span}`,
        ipad && `col-ipad-${ipad.span}`,
        narrowPc && `col-narrowPc-${narrowPc.span}`,
        pc && `col-pc-${pc.span}`
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
    @media (max-width: 576px) {
      @for $i from 1 through 24 {
        &.col-phone-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    }    
    @media (min-width: 577px) and (max-width: 768px) {
      @for $i from 1 through 24 {
        &.col-ipad-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    }    
    @media (min-width: 769px) and (max-width: 992px) {
      @for $i from 1 through 24 {
        &.col-narrowPc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    }    
    @media (min-width: 993px) and (max-width: 1200px) {
      @for $i from 1 through 24 {
        &.col-pc-#{$i} {
          width: ($i / 24) * 100%;
        }
      }
    } 
  }
</style>
