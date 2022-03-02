<template>

  <div v-if="note.parent != null
  && $app.page.dragging.active">
  
    <NoteDropZone
    :parent-note="note.parent"
    :index="note.index"
    :style="{
      'top': note.parent.collab.horizontal ? '0' : '0%',
      'bottom': note.parent.collab.horizontal ? '0' : '50%',
      'left': note.parent.collab.horizontal ? '0%' : '0',
      'right': note.parent.collab.horizontal ? '50%' : '0',
    }"/>
  
    <NoteDropZone
    :parent-note="note.parent"
    :index="note.index + 1"
    :style="{
      'top': note.parent.collab.horizontal ? '0' : '50%',
      'bottom': note.parent.collab.horizontal ? '0' : '0%',
      'left': note.parent.collab.horizontal ? '50%' : '0',
      'right': note.parent.collab.horizontal ? '0%' : '0',
    }"/>

  </div>

</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';




defineProps<{
  note: Note
}>()
</script>

<style>

</style>