<template>
  <div class="gulu-table-wrapper">
    <table class="gulu-table" :class="{bordered, compact, striped: striped}">
      <thead>
      <tr>
        <th><input type="checkbox" @change="onChangeAllItems" ref="allChecked"/></th>
        <th v-if="numberVisible">#</th>
        <th v-for="column in columns" :key="column.field">
          {{column.text}}
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item,index in dataSource" :key="item.id">
        <td>
          <input type="checkbox" @change="onChangeItem(item, index, $event)"
            :checked="inSelectedItems(item)"
          /></td>
        <td v-if="numberVisible">{{index+1}}</td>
        <template v-for="column in columns">
          <td :key="column.field">{{item[column.field]}}</td>
        </template>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  export default {
    name: "GuluTable",
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
      columns: {
        type: Array,
        required: true
      },
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
      }
    }
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
  }
</style>