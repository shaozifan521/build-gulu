<template>
  <div>column</div>
</template>

<script>
  export default {
    name: "GuluTableColumn",
    // 接收用户传递的表头数据信息
    props: {
      text: {
        type: String,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      width: {
        type: Number,
      }
    }
  }
</script>