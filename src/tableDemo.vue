<template>
  <div>
    {{orderBy}}
    <div style="margin: 20px;">
      <g-table :columns="columns" :data-source="dataSource" bordered :selected-items.sync="selected"
        :order-by.sync="orderBy"
        @update:orderBy="x"
        :loading="loading">
      </g-table>
    </div>
    <div style="margin: 20px;">
      <g-table :columns="columns" :data-source="dataSource" bordered compact :striped="false"></g-table>
    </div>
  </div>
</template>
<script>
  import GTable from './table/table'
  export default {
    name: "demo",
    components: {GTable},
    data () {
      return {
        // 用户选中的数据
        selected: [],
        // 表头数据
        columns: [
          {text: '姓名', field: 'name'},
          {text: '分数', field: 'score'},
        ],
        // 支持排序的列
        // asc：升序
        // desc：降序
        orderBy: { // true - 开启排序，但是不确定asc desc
          score: 'desc',
          name: 'asc'
        },
        // 是否显示loading
        loading: false,
        // 表格数据
        dataSource: [
          {id: 1, name: '方方', score: 100},
          {id: 2, name: '圆圆', score: 99},
          {id: 3, name: '张三', score: 100},
          {id: 4, name: '李四', score: 99},
          {id: 5, name: '超人', score: 100},
          {id: 6, name: '蝙蝠侠', score: 99},
          {id: 7, name: '蜘蛛侠', score: 100},
          {id: 8, name: '钢铁侠', score: 99},
        ]
      }
    },
    methods: {
      x (newVal) {
        // 通过单向数据流获取用户排序的选择信息（newVal），根据用户选择升序或者降序的标识
        // 向后台传递标识信息，后台操作升序降序返回对应数据回来处理
        this.loading = true
        // 这里是模拟的后台请求数据
        setTimeout(() => {
          this.dataSource = this.dataSource.sort((a, b) => a.score - b.score)
          this.loading = false
        }, 500)
      }
    }
  };
</script>
<style>
  * {margin: 0; padding: 0; box-sizing: border-box;}
  body {background: white;}
</style>
<style scoped lang="scss">
</style>