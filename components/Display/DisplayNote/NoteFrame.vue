<template>

  <div class="frame"
  :style="{
    'min-width': note.minWidth,
    'width': note.width,

    'position': note.parentId == null ? 'absolute' : 'relative',
    'transform': note.parentId == null ? `translate(` +
      `${-note.collab.anchor.x * 100}%, ${-note.collab.anchor.y * 100}%)` : null,
    
    'opacity': note.collab.dragging ? '0.7' : null,
    'pointer-events': note.collab.dragging ? 'none' : null,
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