<template>

  <div v-if="$app.dragging.active && regionNote != null">
  
    <NoteDropZone
    :region-note="regionNote"
    :index="regionNote.index"/>
  
    <NoteDropZone
    :region-note="regionNote"
    :index="regionNote.index + 1"/>

  </div>

</template>

<script setup lang="ts">
import { INote } from '~/plugins/app/notes/notes';



const props = defineProps<{
  regionNote: INote
}>()
</script>

<style>

</style>