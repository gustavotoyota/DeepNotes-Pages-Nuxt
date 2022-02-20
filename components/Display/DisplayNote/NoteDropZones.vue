<template>

  <div v-if="note.parent != null">
  
    <NoteDropZone
    :parent-note="note.parent"
    :index="note.index"
    style="bottom: 50%"
    :style="{ 'top': note.index === 0 ? '0': '-5px' }"/>
  
    <NoteDropZone
    :parent-note="note.parent"
    :index="note.index + 1"
    style="top: 50%; bottom: 0%"/>

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