<template>
  <div id="demo">
    <g-slides class="wrapper" :selected.sync='selected'>
      <g-slides-item name="1">
        <div class="box">1111111111111</div>
      </g-slides-item>
      <g-slides-item name="2">
        <div class="box">2</div>
      </g-slides-item>
      <g-slides-item name="3">
        <div class="box">3</div>
      </g-slides-item>
    </g-slides>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: '2' // 默认选中的轮播页（必须要在这里写，不能写在模板里）
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
  .wrapper {
    margin: 40px;
  }
  .box {
    width: 100%;
    height: 350px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
  }
</style>
