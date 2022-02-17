<template>

  <div v-if="$app.dragging.active && note.parentId != null">
  
    <NoteDropZone
    :note="note"
    :parent-note="parentNote"
    :index="startIndex"/>
  
    <NoteDropZone
    :note="note"
    :parent-note="parentNote"
    :index="startIndex + 1"/>

  </div>

</template>

<script setup lang="ts">
import { useContext } from '@nuxtjs/composition-api';
import { INote } from '~/plugins/app/notes/notes';

const { $app } = useContext()




const props = defineProps<{
  note: INote
  parentNote: INote
  startIndex: number
}>()
</script>

<style>

</style>