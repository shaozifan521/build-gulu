import Toast from './toast'

let currentToast

export default {
  install (Vue, options) {
    Vue.prototype.$toast = function (message, toastOptions) {
      // 如果已经创建Toast组件，则销毁
      if (currentToast) {
        currentToast.close()
      }
      currentToast = createToast(Vue, message, toastOptions)
    }
  }
}

function createToast (Vue, message, toastOptions) {
  // 这两句固定写法
  let Constructor = Vue.extend(Toast)
  let toast = new Constructor({
    propsData: toastOptions
  })
  toast.$slots.default = message
  // 这里必须得mount一下，要不然toast组件里面的生命周期钩子都不会执行
  toast.$mount()
  document.body.appendChild(toast.$el)
  return toast
}