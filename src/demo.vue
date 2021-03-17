<template>
  <div id="demo">
      <g-cascader :source="source" height="300px" :selected.sync="selected"></g-cascader>
  </div>
</template>

<script>
import db from './db.js'

function ajax (parentId = 0) {
  return db.filter(item => {
    return item.parent_id === parentId
  })
}

export default {
  data () {
    return {
      source: ajax(),
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
