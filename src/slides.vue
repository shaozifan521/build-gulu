<template>
  <div class="g-slides" 
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="g-slides-window" ref="window">
      <div class="g-slides-wrapper">
        <slot></slot>
      </div>
    </div>
    <div class="g-slides-dots">
      <span @click="onClickPrev" data-action="prev">
        <g-icon iconName="left"></g-icon>
      </span>
      <span v-for="n in childrenLength" :class="{active: selectedIndex === n-1}"
        :key="n" :data-index="n-1"
        @click="select(n-1)">
        {{n}}
      </span>
      <span @click="onClickNext" data-action="next">
        <g-icon iconName="right"></g-icon>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      // 默认选中的轮播页面
      selected: {
        type: String,
      },
      // 是否自动播放
      autoPlay: {
        type: Boolean,
        default: true
      },
      // 自动播放时间
      autoPlayDelay:{
        type: Number,
        default: 2000
      }
    },
    data () {
      return {
        childrenLength: 0, // 保存轮播图页面个数
        lastSelectedIndex: undefined,
        // timerId: undefined, // 保存自动播放定时器
        startTouch: undefined, // 保存手指触摸时的对象信息
      }
    },
    mounted () {
      this.updateChildren()
      if (this.autoPlay) {
        this.playAutomatically()
      }
      this.childrenLength = this.items.length
    },
    updated () {
      this.updateChildren()
    },
    beforeDestroy () {
      this.pause()
    },
    computed: {
      // 计算默认选中的索引值
      selectedIndex () {
        let index = this.names.indexOf(this.selected)
        return index === -1 ? 0 : index
      },
      // 保存轮播图名字
      names () {
        return this.items.map(vm => vm.name)
      },
      // 计算轮播图页面个数
      items () {
        return this.$children.filter(vm => vm.$options.name === 'GuluSlidesItem')
      }
    },
    methods: {
      // 移入
      onMouseEnter () {
        // 关闭自动播放
        this.pause()
      },
      // 移出
      onMouseLeave () {
        // 开始自动播放
        this.playAutomatically()
      },
      // 手指触摸开始
      onTouchStart (e) {
        this.pause()
        // 当有多个手指触摸时，不做处理
        if (e.touches.length > 1) {return}
        // 保存手指触摸时的对象信息
        this.startTouch = e.touches[0]
      },
      // 手指触摸结束
      onTouchEnd (e) {
        let endTouch = e.changedTouches[0]
        let {clientX: x1, clientY: y1} = this.startTouch
        let {clientX: x2, clientY: y2} = endTouch
        // 计算触摸滑动角度的公式
        let distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
        let deltaY = Math.abs(y2 - y1)
        // 斜边长度是否是对边长度2倍
        let rate = distance / deltaY
        if (rate > 2) {
          if (x2 > x1) {
            // 右滑
            this.select(this.selectedIndex - 1)
          } else {
            // 左滑
            this.select(this.selectedIndex + 1)
          }
        }
        this.$nextTick(() => {
          this.playAutomatically()
        })
      },
      // 左箭头函数
      onClickPrev () {
        this.select(this.selectedIndex - 1)
      },
      // 右箭头函数
      onClickNext () {
        this.select(this.selectedIndex + 1)
      },
      // 自动播放
      playAutomatically () {
        // 如果已经存在自动播放定时器，不处理，避免重复定义定时器
        if (this.timerId) { return }
        let run = () => {
          // 获取默认索引值
          let index = this.names.indexOf(this.getSelected())
          let newIndex = index + 1
          this.select(newIndex) // 告诉外界选中 newIndex
          this.timerId = setTimeout(run, this.autoPlayDelay)
        }
        this.timerId = setTimeout(run, this.autoPlayDelay)
      },
      pause () {
        window.clearTimeout(this.timerId)
        this.timerId = undefined
      },
      // 小圆点函数
      select (newIndex) {
        this.lastSelectedIndex = this.selectedIndex
        if (newIndex === -1) {newIndex = this.names.length - 1}
        if (newIndex === this.names.length) { newIndex = 0 }
        this.$emit('update:selected', this.names[newIndex])
      },
      // 如果用户传了默认值则取用户，否则去默认第一张轮播图
      getSelected () {
        let first = this.items[0]
        return this.selected || first.name
      },
      updateChildren () {
        let selected = this.getSelected()
        this.items.forEach((vm) => {
          let reverse = this.selectedIndex > this.lastSelectedIndex ? false : true
          if (this.timerId) {
            if (this.lastSelectedIndex === this.items.length - 1 && this.selectedIndex === 0) {
              reverse = false
            }
            if (this.lastSelectedIndex === 0 && this.selectedIndex === this.items.length - 1) {
              reverse = true
            }
          }
          vm.reverse = reverse
          this.$nextTick(() => {
            vm.selected = selected
          })
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .g-slides {
    &-window {overflow: hidden;}
    &-wrapper {
      position: relative;
    }
    &-dots {
      padding: 8px 0;
      display: flex;
      justify-content: center;
      align-items: center;
      > span {
        width: 20px;
        height: 20px;
        display: inline-flex;
        justify-content: center;
        align-items: center;
        background: #ddd;
        border-radius: 50%;
        margin: 0 8px;
        font-size: 12px;
        &:hover {
          cursor: pointer;
        }
        &.active {
          background: black;
          color: white;
          &:hover {
            cursor: default;
          }
        }
      }
    }
  }
</style>