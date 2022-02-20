<template>

  <div class="frame"
  :style="{
    'min-width': note.minWidth,
    'width': note.width,

    'position': note.parentId == null ? 'absolute' : 'relative',
    'transform': note.parentId == null ? `translate(` +
      `${-note.collab.anchor.x * 100}%, ${-note.collab.anchor.y * 100}%)` : undefined,
    
    'opacity': note.collab.dragging ? '0.7' : undefined,
    'pointer-events': note.collab.dragging ? 'none' : undefined,
  }">

    <slot/>

  </div>
  
</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/notes/notes';



const props = defineProps<{
  note: Note
}>()
</script>

<style>

</style>