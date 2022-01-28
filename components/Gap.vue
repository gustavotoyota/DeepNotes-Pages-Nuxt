<template>

  <div :style="{
    ...$attrs,
    display: inlineBlock ? 'inline-block' : null,
  }"
  style="flex: none">
  </div>
  
</template>

<script>
export default {
  inheritAttrs: false,

  props: {
    inlineBlock: { type: Boolean },
  },
}
</script>

<style>

</style>