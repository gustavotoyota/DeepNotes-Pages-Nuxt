<template>

  <div :style="{
    ...$attrs,
    display: inlineBlock ? 'inline-block' : undefined,
  }"
  style="flex: none">
  </div>
  
</template>

<script setup lang="ts">
defineProps<{
  inlineBlock?: boolean
}>()
</script>

<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>

<style>

</style>