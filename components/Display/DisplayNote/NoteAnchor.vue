<template>

  <div :id="`note-${note.id}`"
  :class="{ anchor: note.parentId == null }"
  :style="{
    'left': `${note.collab.pos.x}px`,
    'top': `${note.collab.pos.y}px`,
    'z-index': note.parentId == null ? note.collab.zIndex : undefined,
  }">

    <slot/>

  </div>

</template>

<script setup lang="ts">
import { INote } from '~/plugins/app/notes/notes';




const props = defineProps<{
  note: INote
}>()
</script>

<style scoped>
.anchor {
  position: absolute;
  
  width: 0;
  height: 0;
}
</style>