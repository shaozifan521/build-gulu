import Vue from 'vue'
import Button from './button'
import Icon from './icon'
import ButtonGroup from './button-group'
import Input from './input'
import Row from './row'
import Col from './col'
import Layout from './layout'
import Header from './header'
import Content from './content'
import Footer from './footer'
import Sider from './sider'
import Toast from './toast'
import Plugin from './plugin'
import Tabs from './tabs'
import TabsHead from './tabs-head'
import TabsItem from './tabs-item'
import TabsBody from './tabs-body'
import TabsPane from './tabs-pane'
import Popover from './popover'
import Collapse from './collapse'
import CollapseItem from './collapse-item'
import Cascader from './cascader'

Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)
Vue.component('g-input', Input)
Vue.component('g-row', Row)
Vue.component('g-col', Col)
Vue.component('g-layout', Layout)
Vue.component('g-header', Header)
Vue.component('g-content', Content)
Vue.component('g-footer', Footer)
Vue.component('g-sider', Sider)
Vue.component('g-toast', Toast)
Vue.component('g-tabs', Tabs)
Vue.component('g-tabs-head', TabsHead)
Vue.component('g-tabs-item', TabsItem)
Vue.component('g-tabs-body', TabsBody)
Vue.component('g-tabs-pane', TabsPane)
Vue.component('g-popover', Popover)
Vue.component('g-collapse', Collapse)
Vue.component('g-collapse-item', CollapseItem)
Vue.component('g-cascader', Cascader)

Vue.use(Plugin)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    message: 'hi1',
    selectTab: 'news',
    selectedtab: ['2', '3'],
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
    }]
  },
  methods: {
    yyy () {
      console.log('用户的点击事件')
    },
    showToast1(){
      this.showToast('top')
    },
    showToast2(){
      this.showToast('middle')
    },
    showToast3(){
      this.showToast('bottom')
    },
    showToast (position) {
      this.$toast('我是toast哦<a href="http://www.w3school.com.cn">W3School</a>手动阀付撒多撒大所大所所所所所所所所所所所所所所所所所所所所所所所所所所所所所撒多撒大所大所所所所所所所所所所所所所所所所所所所所所所所所所所所所所撒多撒大所大所所所所所所所所所所所所所所所所所所所所所所所所所所所所所啊', {
        closeButton: {
          text: '知道了',
          callBack (toast) {
            // 测试callBack回调方法想要做的一些事情
            toast.log()
            console.log('客户说他知道了！')
          }
        },
        autoClose: false,
        autoCloseDelay: 5,
        enableHtml: true,
        position
      })
    }
  },
})