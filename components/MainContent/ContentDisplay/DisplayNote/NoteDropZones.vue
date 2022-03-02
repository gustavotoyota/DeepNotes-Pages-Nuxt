<template>

  <div v-if="note.parent != null
  && $app.page.dragging.active">
  
    <NoteDropZone
    :parent-note="note.parent"
    :index="note.index"
    style="top: 0%; bottom: 50%"/>
  
    <NoteDropZone
    :parent-note="note.parent"
    :index="note.index + 1"
    style="top: 50%; bottom: 0%"/>

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