<template>
  <div>
    <g-nav :selected.sync="selected" @update:selected="onChange" style="margin: 20px;">
      <g-nav-item name="home">
          首页
      </g-nav-item>
      <g-sub-nav name="about">
        <template slot="title">关于</template>
        <g-nav-item name="culture">企业文化</g-nav-item>
        <g-nav-item name="developers">开发团队</g-nav-item>
        <g-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <g-nav-item name="wechat">微信</g-nav-item>
          <g-nav-item name="qq">QQ</g-nav-item>
          <g-sub-nav name="phone">
            <template slot="title">手机</template>
            <g-nav-item name="cm">移动</g-nav-item>
            <g-nav-item name="cu">联通</g-nav-item>
            <g-nav-item name="cn">电信</g-nav-item>
          </g-sub-nav>
        </g-sub-nav>
      </g-sub-nav>
      <g-nav-item name="hire">招聘</g-nav-item>
    </g-nav>
    <!-- <g-nav :selected.sync="selected" vertical style="width: 200px; margin: 20px; margin-top: 200px;">
      <g-nav-item name="home">首页</g-nav-item>
      <g-sub-nav name="about">
        <template slot="title">关于</template>
        <g-nav-item name="culture">企业文化</g-nav-item>
        <g-nav-item name="developers">开发团队</g-nav-item>
        <g-sub-nav name="contacts">
          <template slot="title">联系方式</template>
          <g-nav-item name="wechat">微信</g-nav-item>
          <g-nav-item name="qq">QQ</g-nav-item>
          <g-sub-nav name="phone">
            <template slot="title">手机</template>
            <g-nav-item name="cm">移动</g-nav-item>
            <g-nav-item name="cu">联通</g-nav-item>
            <g-nav-item name="cn">电信</g-nav-item>
          </g-sub-nav>
        </g-sub-nav>
      </g-sub-nav>
      <g-nav-item name="hire">招聘</g-nav-item>
    </g-nav> -->
    <p>用户选中了 {{selected}}</p>

  </div>
</template>
<script>
  import GNav from './nav/nav.vue'
  import GNavItem from './nav/nav-item.vue'
  import GSubNav from './nav/sub-nav.vue'
  export default {
    name: "demo",
    components: {GNav, GNavItem, GSubNav},
    data () {
      return {
        selected: 'hire' // 用户选中的值
      };
    },
    methods: {
      // 用户选择哪个导航做出对应提示（第一种方法）
      onChange (selected) {
        console.log(selected)
        if (selected.indexOf('home') >= 0) {
          alert('hi')
        }
      }
    },
    watch: {
      // 用户选择哪个导航做出对应提示（第二种方法）
      // selected (newValue) {
      //   if (newValue === 'home') {
      //     alert('hi')
      //   }
      // }
    }
  };
</script>
<style>
  * {margin: 0; padding: 0; box-sizing: border-box;}
</style>