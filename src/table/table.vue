<template>
  <div class="gulu-table-wrapper" ref="wrapper">
    <div :style="{height, overflow: 'auto'}" ref="tableWrapper">
      <table class="gulu-table" :class="{bordered, compact, striped: striped}" ref="table">
        <thead>
        <tr>
          <!-- 表头中有只要有描述信息的一列就显示空白单元格 -->
          <th v-if="expendField" :style="{width: '50px'}" class="gulu-table-center"></th>
          <!-- 表头中勾选单元格 -->
          <th v-if="checkable" :style="{width: '50px'}" class="gulu-table-center">
            <input type="checkbox" @change="onChangeAllItems" ref="allChecked" :checked="areAllItemsSelected"/></th>
          <th :style="{width: '50px'}" v-if="numberVisible">#</th>
          <th :style="{width: column.width + 'px'}" v-for="column in columns" :key="column.field">
            <div class="gulu-table-header">
              {{column.text}}
              <span v-if="column.field in orderBy" class="gulu-table-sorter" @click="changeOrderBy(column.field)">
              <g-icon iconName="asc" :class="{active: orderBy[column.field] === 'asc'}"/>
              <g-icon iconName="desc" :class="{active: orderBy[column.field] === 'desc'}"/>
            </span>
            </div>
          </th>
          <!-- 操作列表头 -->
          <th ref="actionsHeader" v-if="$scopedSlots.default">操作列</th>
        </tr>
        </thead>
        <tbody>
        <!-- 当有多个平级标签需要渲染同一个列表数据时，可以使用template标签
        将它们包起来，但是template标签上不能写key值 -->
        <template v-for="item,index in dataSource">
          <tr :key="item.id">
            <!-- 是否展开描述信息列按钮 -->
            <td v-if="expendField" :style="{width: '50px'}" class="gulu-table-center">
              <g-icon class="gulu-table-expendIcon" iconName="right"
                @click="expendItem(item.id)"/>
            </td>
            <!-- 表体中勾选单元格 -->
            <td v-if="checkable" :style="{width: '50px'}" class="gulu-table-center">
              <input type="checkbox" @change="onChangeItem(item, index, $event)"
                :checked="inSelectedItems(item)"
              /></td>
            <!-- 表体中序号单元格 -->
            <td :style="{width: '50px'}" v-if="numberVisible">{{index+1}}</td>
            <!-- 表体中内容单元格 -->
            <template v-for="column in columns">
              <td :style="{width: column.width + 'px'}" :key="column.field">
                <!-- 如果有自定义的单元格则显示自定义的，否则正常显示 -->
                <template v-if="column.render">
                  <vnodes :vnodes="column.render({value: item[column.field]})"></vnodes>
                </template>
                <template v-else>
                  {{item[column.field]}}
                </template>
              </td>
            </template>
            <!-- 操作列表体部分 -->
            <td v-if="$scopedSlots.default">
              <div ref="actions" style="display: inline-block;">
                <slot :item="item"></slot>
              </div>
            </td>
          </tr>
          <!-- 展示描述信息的表格行 -->
          <tr v-if="inExpendedIds(item.id)" :key="`${item.id}-expend`">
            <!-- 描述行信息默认和有内容的第一列对齐 -->
            <td :style="{width: '50px'}"></td>
            <td :style="{width: '50px'}"></td>
            <td :colspan="columns.length + expendedCellColSpan">
              {{item[expendField] || '空'}}
            </td>
          </tr>
        </template>
        </tbody>
      </table>
    </div>
    <div v-if="loading" class="gulu-table-loading">
      <g-icon iconName="loading"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GuluTable",
    data () {
      return {
        expendedIds: [], // 保存表格描述行信息
        columns: [] // 保存子组件 table-column 的表头数据信息
      }
    },
    props: {
      // 是否显示斑马纹
      striped: {
        type: Boolean,
        default: true
      },
      // 把选中的数据传递到父组件，形成单向数据流（这样就不需要操作dom，只要数据有变化，传递到父组件，然后再由父组件传递到各子组件，使数据变化然后dom更新）
      selectedItems: {
        type: Array,
        default: () => [] // 默认数据为空数组时，必须以函数的形式返回，否则报错（多组件共享时，数据会同步bug，原理同data一样）
      },
      // 是否显示紧凑型表格
      compact: {
        type: Boolean,
        default: false
      },
      // 表头数据
      // columns: {
      //   type: Array,
      //   required: true
      // },
      // 表格数据
      dataSource: {
        type: Array,
        required: true,
        // 表格数据校验，id不能为空，id为空报错
        validator (array) {
          return !(array.filter(item => item.id === undefined).length > 0)
        }
      },
      // 是否显示序号
      numberVisible: {
        type: Boolean,
        default: false
      },
      // 表格是否显示边框
      bordered: {
        type: Boolean,
        default: false
      },
      // 支持排序的列表，以及升序还是降序
      orderBy: {
        type: Object,
        default: () => ({}),
      },
      // 是否加载loading
      loading: {
        type: Boolean,
        default: false
      },
      // 接收一个表格高度，即可实现固定表头
      height: {
        type: Number
      },
      // 表格行描述信息字段
      expendField: {
        type: String
      },
      // 是否带有勾选的表格
      checkable: {
        type: Boolean,
        default: false
      }
    },
    mounted () {
      // 如果table-column组件写了 slot标签，可以换另外一种方式遍历循环
      // 遍历循环table的子组件table-column里的内容，并返回
      this.columns = this.$slots.default.map(node => {
        let {text, field, width} = node.componentOptions.propsData
        let render = node.data.scopedSlots && node.data.scopedSlots.default
        return {text, field, width, render}
      })
      let result = this.columns[0].render({value: '方方'})
      console.log(result)
      // 拷贝原table（默认不拷贝表格里面的元素，第一个方案拷贝，会出现排序按钮无法点击的问题）
      let table2 = this.$refs.table.cloneNode(false)
      // 把拷贝的table保存到全局中
      this.table2 = table2
      // 给拷贝的table新增一个类名
      table2.classList.add('gulu-table-copy')
      // 获取原table表头
      let tHead = this.$refs.table.children[0]
      // 获取原table表头高度
      let {height} = tHead.getBoundingClientRect()
      // 设置表格容器margin-top
      this.$refs.tableWrapper.style.marginTop = height + 'px'
      // 设置表格容器高度
      this.$refs.tableWrapper.style.height = this.height - height + 'px'
      // 把原table中的表头添加到拷贝的table中，这样就解决了表头中的点击事件不可用的bug
      table2.appendChild(tHead)
      // 把拷贝的table添加到表格容器中
      this.$refs.wrapper.appendChild(table2)
      // 计算操作列的信息
      if (this.$scopedSlots.default) {
        // 获取用户传递过来操作列的整体元素
        let div = this.$refs.actions[0]
        // 获取操作列的整体宽度
        let {width} = div.getBoundingClientRect()
        // 获取操作列的单元格
        let parent = div.parentNode
        // 获取操作列单元格的所有样式
        let styles = getComputedStyle(parent)
        let paddingLeft = styles.getPropertyValue('padding-left')
        let paddingRight = styles.getPropertyValue('padding-right')
        let borderLeft = styles.getPropertyValue('border-left-width')
        let borderRight = styles.getPropertyValue('border-right-width')
        let width2 = width + parseInt(paddingRight) + parseInt(paddingRight) + parseInt(borderLeft) + parseInt(borderRight) + 'px'
        // 把获取到操作列宽度赋值给操作列表头（解决操作列宽度对不齐的bug）
        this.$refs.actionsHeader.style.width = width2
        // 把获取到操作列宽度赋值给操作列表体中的每个单元格（解决操作列宽度对不齐的bug）
        this.$refs.actions.map(div => {
          div.parentNode.style.width = width2
        })
      }
      // // 更新复制的table的列宽
      // this.updateHeadersWidth()
      // // 当浏览器窗口宽度变化时，重新计算table列宽
      // this.onWindowResize = () => this.updateHeadersWidth()
      // window.addEventListener('resize', this.onWindowResize)
    },
    // 组件销毁之前，移除绑定的事件监听
    beforeDestroy () {
      this.table2.remove()
      window.removeEventListener('resize', this.onWindowResize)
    },
    computed: {
      areAllItemsSelected () {
        // sort方法会改变原数组，所以这里先用map转换一下，map会返回一个新数组，然后在进行排序
        const a = this.dataSource.map(item => item.id).sort()
        const b = this.selectedItems.map(item => item.id).sort()
        // 这里是否显示全选的逻辑是：先判断选中的数组列表和数据源长度是否相等？
        // 如果相等，在循环源数据中的id每一项，和排序后的数据列表进行每一项id对比
        // 如果都相等，则返回ture 全选
        if (a.length !== b.length) { 
          return false
        }
        let equal = true
        for (let i = 0; i < a.length; i++) {
          if (a[i] !== b[i]) {
            equal = false
            break
          }
        }
        return equal
      },
      // 计算描述行所占的单元格
      expendedCellColSpan () {
        // 默认描述行是占一整行的（包括操作列）
        let result = 1
        // 如果有勾选框多占一个单元格，如果有描述行多再多占一个单元格
        if (this.checkable) { result += 1 }
        if (this.expendField) { result += 1 }
        return result
      }
    },
    watch: {
      // 监视选中的数据
      selectedItems () {
        // 当选中的数据和表格数据一致时，则是全选
        if (this.selectedItems.length === this.dataSource.length) {
          // 操作checkbox半选显示，只能通过js操作，不支持标签操作
          this.$refs.allChecked.indeterminate = false
        } else if (this.selectedItems.length === 0) {
          this.$refs.allChecked.indeterminate = false
        } else {
          this.$refs.allChecked.indeterminate = true
        }
      }
    },
    methods: {
      // 返回选中的那一行表格
      inSelectedItems (item) {
        return this.selectedItems.filter(i => i.id === item.id).length > 0
      },
      // 表格数据是否选中
      onChangeItem (item, index, e) {
        let selected = e.target.checked
        let copy = JSON.parse(JSON.stringify(this.selectedItems))
        // 如果选中则向用户选中列表添加选中的一条
        if (selected) {
          copy.push(item)
        } else {
          // 如果没有选中则从用户选中列表删除这一条
          copy = copy.filter(i => i.id !== item.id)
        }
        // 向父组件更新用户选择列表数据
        this.$emit('update:selectedItems', copy)
      },
      // 是否全选
      onChangeAllItems (e) {
        let selected = e.target.checked
        this.$emit('update:selectedItems', selected ? this.dataSource : [])
      },
      changeOrderBy (key) {
        const copy = JSON.parse(JSON.stringify(this.orderBy))
        let oldValue = copy[key]
        if (oldValue === 'asc') {
          copy[key] = 'desc'
        } else if (oldValue === 'desc') {
          copy[key] = true
        } else {
          copy[key] = 'asc'
        }
        // 使用单向数据流的方式更新用户点击的排序选择
        this.$emit('update:orderBy', copy)
      },
      // 查找 expendedIds 中是否描述信息，如果有返还true
      inExpendedIds (id) {
        return this.expendedIds.indexOf(id) >= 0
      },
      // 展开表格描述行函数
      expendItem (id) {
        // 如果保存的有则删除，否则添加（这里删除和添加其实操作的是描述行是否展开与收起）
        if (this.inExpendedIds(id)) {
          this.expendedIds.splice(this.expendedIds.indexOf(id), 1)
        } else {
          this.expendedIds.push(id)
        }
      },
      // 复制过的表头宽度会失效，所以需要找到原表头的宽度，然后重新赋值即可
      updateHeadersWidth () {
        // // 获取拷贝的table
        // let table2 = this.table2
        // // 获取原table的表头部分
        // let tableHeader = Array.from(this.$refs.table.children).filter(node => node.tagName.toLowerCase() === 'thead')[0]
        // // 循环遍历，只报了拷贝table的表头部分
        // let tableHeader2
        // Array.from(table2.children).map(node => {
        //   if (node.tagName.toLowerCase() !== 'thead') {
        //     node.remove()
        //   } else {
        //     tableHeader2 = node
        //   }
        // })
        // // 循环遍历原table的表头并获取各列宽的宽度
        // Array.from(tableHeader.children[0].children).map((th, i) => {
        //   const {width} = th.getBoundingClientRect()
        //   // 把获取的原table表头各列宽的宽度赋值给拷贝的table表头
        //   tableHeader2.children[0].children[i].style.width = width + 'px'
        // })
      }
    },
    components: {
      // 如何把标签渲染到模板里？google出的答案处理方式
      vnodes: {
        functional: true,
        render: (h, context) => context.props.vnodes
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "../var";
  $grey: darken($grey, 10%);
  .gulu-table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
    border-bottom: 1px solid $grey;
    &.bordered {
      border: 1px solid $grey;
      td, th {
        border: 1px solid $grey;
      }
    }
    &.compact {
      td, th {
        padding: 4px;
      }
    }
    td, th {
      border-bottom: 1px solid $grey;
      text-align: left;
      padding: 8px;
    }
    &.striped {
      tbody {
        > tr {
          &:nth-child(odd) {
            background: white;
          }
          &:nth-child(even) {
            background: lighten($grey, 10%);
          }
        }
      }
    }
    &-sorter {
      display: inline-flex;
      flex-direction: column;
      margin: 0 4px;
      cursor: pointer;
      svg {
        width: 10px;
        height: 10px;
        fill: $grey;
        &.active {
          fill: #409eff;
        }
        &:first-child {
          position: relative;
          bottom: -1px;
        }
        &:nth-child(2) {
          position: relative;
          top: -1px;
        }
      }
    }
    &-header {
      display: flex;
      align-items: center;
    }
    &-wrapper {
      position: relative;
      overflow: auto;
    }
    &-loading {
      background: rgba(255, 255, 255, 0.8);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      svg {
        width: 50px;
        height: 50px;
        @include spin;
      }
    }
    // 把复制的固定表头定位到表格最上面（即实现了固定表头）
    &-copy {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background: white;
    }
    &-expendIcon {
      width: 10px;
      height: 10px;
    }
    & &-center {
      text-align: center;
    }
  }
</style>