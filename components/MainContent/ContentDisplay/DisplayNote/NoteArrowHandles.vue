<template>

  <div v-if="note.parentId == null && note.active && !note.dragging"
  class="note-arrow-handles">

    <NoteArrowHandle :note="note"
    style="top: 50%; left: -24px;
    transform: translate(-50%, -50%) rotateZ(-90deg)"/>

    <NoteArrowHandle :note="note"
    style="top: 50%; right: -24px;
    transform: translate(50%, -50%) rotateZ(90deg)"/>

    <NoteArrowHandle :note="note"
    style="top: -24px; left: 50%;
    transform: translate(-50%, -50%) rotateZ(0deg)"/>

    <NoteArrowHandle :note="note"
    style="bottom: -24px; left: 50%;
    transform: translate(-50%, 50%) rotateZ(180deg)"/>
  
  </div>

</template>




<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';




defineProps<{
  note: Note
}>()
</script>




<style scoped>
</style>