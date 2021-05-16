<template>
  <svg class="g-icon" aria-hidden="true" @click="$emit('click', $event)">
    <use :xlink:href="`#icon-${iconName}`"></use>
  </svg>
</template>

<script>
export default {
  props: ['iconName'],
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  .g-icon {
    height: 1em;
    width: 1em;
  }
</style>
