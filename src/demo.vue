<template>
  <div id="demo">
      <g-cascader :source="source" height="300px" :selected.sync="selected"></g-cascader>
  </div>
</template>

<script>
export default {
  data () {
    return {
      source: [{
        name: '浙江',
        children: [
          {
            name: '杭州',
            children: [
              {name: '上城'},
              {name: '下城'},
              {name: '江干'},
            ]
          },
          {
            name: '嘉兴',
            children: [
              {name: '南湖'},
              {name: '秀洲'},
              {name: '嘉善'},
            ]
          },
        ]
      }, {
        name: '福建',
        children: [
          {
            name: '福州',
            children: [
              {name: '鼓楼'},
              {name: '台江'},
              {name: '仓山'},
            ]
          },
        ]
      }, {
        name: '安徽',
        children: [{
          name: '合肥',
          children: [{
            name: '瑶海'
          }, {
            name: '庐阳'
          }]
        }]
      }],
      selected: []
    }
  }
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
