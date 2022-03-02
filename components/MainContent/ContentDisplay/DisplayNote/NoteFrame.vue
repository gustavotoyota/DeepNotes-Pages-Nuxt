<template>

  <div class="frame"
  :style="{
    'min-width': note.minWidth,
    'width': note.width,

    'height': note.height,

    'position': note.parentId == null ? 'absolute' : 'relative',
    'transform': note.parentId == null ? `translate(` +
      `${-note.collab.anchor.x * 100}%, ${-note.collab.anchor.y * 100}%)` : undefined,
    
    'opacity': note.dragging ? '0.7' : undefined,
    'pointer-events': note.dragging ? 'none' : undefined,
  }">

    <slot/>

  </div>
  
</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';



const props = defineProps<{
  note: Note
}>()
</script>

<style>

</style>