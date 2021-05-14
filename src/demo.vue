<template>
  <div id="demo">
    <!-- 展示选中的值 -->
    <div>
      {{selected.map(item=> item.name)}}
    </div>
    <g-cascader :source.sync="source" popover-height="200px"
      :selected.sync="selected" :load-data="loadData">
    </g-cascader>
  </div>
</template>

<script>
import db from './db.js'

// 模拟ajax后台获取数据
function ajax (parentId = 0) {
  return new Promise((success) => {
    setTimeout(() => {
      let result = db.filter((item) => item.parent_id == parentId)
      result.forEach(node => {
        if (db.filter(item => item.parent_id === node.id).length > 0) {
          node.isLeaf = false
        }else{
          node.isLeaf = true
        }
      })
      success(result)
    }, 300)
  })
}

export default {
  data () {
    return {
      source: [], // 级联选择器数据
      selected: [] // 保存选中的数据
    }
  },
  created () {
    ajax(0).then(result => {
      // console.log(result)
      this.source = result
    })
  },
  methods: {
    loadData ({id}, updateSource) {
      ajax(id).then(result => {
        console.log(result)
        // result 为当前选中数据的子数据传递出去
        updateSource(result) // 回调:把别人传给我的函数调用一下
      })
    }
  },
}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  #demo {
    margin: 200px;
  }
</style>
