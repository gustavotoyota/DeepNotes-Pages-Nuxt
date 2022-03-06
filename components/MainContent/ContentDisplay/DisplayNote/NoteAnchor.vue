<template>

  <div :id="`note-${note.id}`"
  :class="{ anchor: note.parentId == null }"
  :style="{
    'position': note.parentId == null ? 'absolute' : 'relative',
    'left': note.parentId == null ? `${note.collab.pos.x}px` : undefined,
    'top': note.parentId == null ? `${note.collab.pos.y}px` : undefined,
    'z-index': note.parentId == null ? note.collab.zIndex : undefined,
  }">

    <slot/>

  </div>

</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';




defineProps<{
  note: Note
}>()
</script>

<style scoped>
.anchor {
  position: absolute;
  
  width: 0;
  height: 0;
}
</style>