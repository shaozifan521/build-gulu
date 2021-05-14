let onClickDocument = (e) => {
  let {target} = e
  callbacks.forEach((item) => {
    if (target === item.el || item.el.contains(target)) {
      return
    } else {
      item.callback()
    }
  })
}
document.addEventListener('click', onClickDocument)
let callbacks = []
export default {
  bind: function (el, binding) {
    callbacks.push({el, callback: binding.value})
  }
}

// 移除全局绑定的监听事件没有意义，因为全局只绑定了一个，不确定什么时候移除。这里的代码做了优化，全局只绑定了一个事件监听，如果不这样做，那cascader组件被引入多少次，就会创建了多少个事件监听，可能会引发bug
let removeListener = () => {
  document.removeEventListener('click', onClickDocument)
}

export {removeListener}