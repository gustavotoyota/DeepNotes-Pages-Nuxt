<template>
  
  <div v-if="note.collab.resizable && note.selected">
    <NoteResizeHandle :note="note" side="nw" :section="note.topSection"/>
    <NoteResizeHandle :note="note" side="n" :section="note.topSection"/>
    <NoteResizeHandle :note="note" side="ne" :section="note.topSection"/>
    
    <NoteResizeHandle :note="note" side="w"/>
    <NoteResizeHandle :note="note" side="e"/>

    <NoteResizeHandle :note="note" side="sw" :section="note.bottomSection"/>
    <NoteResizeHandle :note="note" side="se" :section="note.bottomSection"/>
    <NoteResizeHandle :note="note" side="s" :section="note.bottomSection"/>
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