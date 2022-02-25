<template>
  
  <div>
    <NoteHandle :note="note" side="nw" :section="note.topSection"/>
    <NoteHandle :note="note" side="n" :section="note.topSection"/>
    <NoteHandle :note="note" side="ne" :section="note.topSection"/>
    
    <NoteHandle :note="note" side="w"/>
    <NoteHandle :note="note" side="e"/>

    <NoteHandle :note="note" side="sw" :section="note.bottomSection"/>
    <NoteHandle :note="note" side="se" :section="note.bottomSection"/>
    <NoteHandle :note="note" side="s" :section="note.bottomSection"/>
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