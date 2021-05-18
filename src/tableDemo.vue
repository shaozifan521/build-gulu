<template>
  <div>
    {{orderBy}}
    <div style="margin: 50px;">
      <g-table :data-source="dataSource" bordered :selected-items.sync="selected"
        :order-by.sync="orderBy"
        @update:orderBy="x" :loading="loading" :height="400" expend-field="description" checkable>
        <g-table-column text="姓名" field="name" :width="100">
          <template slot-scope="props">
            <a :href="`/users/${props.value}`">{{props.value}}</a>
          </template>
        </g-table-column>
        <g-table-column text="分数" field="score" :width="200">
          <template slot-scope="props">
            <span style="color: red;">{{props.value}}</span>
          </template>
        </g-table-column>
        <g-table-column text="分数111" :width="200">
          <template slot-scope="props">
            <g-input></g-input>
          </template>
        </g-table-column>
        <template slot-scope="xxx">
          <button @click="edit(xxx.item)">编辑</button>
          <button @click="view(xxx.item)">查看</button>
          <button>删除</button>
        </template>
      </g-table>
    </div>
    <!-- <div style="margin: 20px;">
      <g-table :columns="columns" :data-source="dataSource" bordered compact :striped="false" checkable expend-field="description">
        <g-table-column text="姓名" field="name" :width="100">
          <template slot-scope="props">
            <a :href="`/users/${props.value}`">{{props.value}}</a>
          </template>
        </g-table-column>
        <g-table-column text="分数" field="score"></g-table-column>
        <template slot-scope="xxx">
          <button @click="edit(xxx.item)">编辑</button>
          <button @click="view(xxx.item)">查看</button>
          <button>删除</button>
        </template>
      </g-table>
    </div> -->
  </div>
</template>
<script>
  import GTable from './table/table'
  import GTableColumn from './table-column'
  export default {
    name: "demo",
    components: {GTable, GTableColumn},
    data () {
      return {
        // 用户选中的数据
        selected: [],
        // 表头数据
        // width 自定义列宽
        // columns: [
        //   {text: '姓名', field: 'name', width: 100},
        //   {text: '分数', field: 'score'},
        // ],
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
        // description 表格行展开的描述信息
        dataSource: [
          {id: 1, name: '方方', score: 100, description: 'xxxx xxxx'},
          {id: 2, name: '圆圆', score: 99, description: 'yyyy yyyy'},
          {id: 3, name: '张三', score: 100},
          {id: 4, name: '李四', score: 99},
          {id: 5, name: '超人', score: 100},
          {id: 6, name: '蝙蝠侠', score: 99},
          {id: 7, name: '蜘蛛侠', score: 100},
          {id: 8, name: '钢铁侠', score: 99},
          {id: 9, name: '方方', score: 100},
          {id: 10, name: '圆圆', score: 99},
          {id: 11, name: '张三', score: 100},
          {id: 12, name: '李四', score: 99},
          {id: 13, name: '超人', score: 100},
          {id: 14, name: '蝙蝠侠', score: 99},
          {id: 15, name: '蜘蛛侠', score: 100},
          {id: 16, name: '钢铁侠', score: 99},
          {id: 17, name: '蜘蛛侠', score: 100},
          {id: 18, name: '钢铁侠', score: 99},
          {id: 19, name: '方方', score: 100},
          {id: 20, name: '圆圆', score: 99}
        ]
      }
    },
    methods: {
      // 表格的编辑方法
      edit (item) {
        alert(`开始编辑${item.id}`)
      },
      view (item) {
        alert(`开始查看${item.id}`)
      },
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