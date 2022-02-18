<template>

  <div v-if="note.parent != null">
  
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
import { INote } from '~/plugins/app/notes/notes';




const props = defineProps<{
  note: INote
}>()
</script>

<style>

</style>