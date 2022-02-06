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
}
</script>

<script setup>
const props = defineProps({
  inlineBlock: { type: Boolean },
})
</script>

<style>

</style>