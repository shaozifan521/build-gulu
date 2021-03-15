<template>
  <div class="cascader">
    <div class="trigger" @click="popoverVisible = !popoverVisible">
      {{addressResult}}
    </div>
    <div class="popover" v-if="popoverVisible">
      <cascader-items :sourceItem="source" :height="height" :selected="selected" @update:selected="onUpdateSelected"></cascader-items>
    </div>
  </div>
</template>

<script>
import CascaderItems from './cascader-items'
export default {
  name: "GuluCascader",
  props: {
    source: {
      type: Array
    },
    height: {
      type: String
    },
    selected: {
      type: Array
    }
  },
  data () {
    return {
      popoverVisible: false,
      item1Seleted: null,
      item2Seleted: null
    }
  },
  methods: {
    onUpdateSelected (newSelected) {
      this.$emit('update:selected', newSelected)
    }
  },
  computed: {
    addressResult () {
      return this.selected.map(item => item.name).join('/')
    }
  },
  components: {
    CascaderItems
  }
}
</script>

<style scoped>
  .cascader {
    position: relative;
  }
  .trigger {
    height: 32px;
    line-height: 32px;
    width: 200px;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 0 1em;
    color: rgba(0,0,0,.65);
  }
  .popover {
    position: absolute;
    top: 120%;
    display: flex;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
    background: white;
    border-radius: 4px;
  }
</style>
