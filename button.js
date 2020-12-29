Vue.component('g-button', {
  data() {
    return {
      count: 123
    }
  },
  template: `
    <button class="g-button">{{count}}</button>
  `
})