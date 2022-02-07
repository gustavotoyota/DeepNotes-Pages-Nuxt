<template>

  <div class="frame"
  :style="{
    'width': '100px',
    'height': '100px',

    'position': note.parentId == null ? 'absolute' : 'relative',
    'transform': note.parentId == null ? `translate(` +
      `${-note.collab.anchor.x * 100}%, ${-note.collab.anchor.y * 100}%)` : null,
  }">

    <slot/>

  </div>
  
</template>

<script setup>
const props = defineProps({
  note: { type: Object },
})
</script>

<style>

</style>