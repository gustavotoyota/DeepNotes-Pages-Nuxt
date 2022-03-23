<template>

  <div style="position: relative">

    <v-divider/>
    
    <NoteResizeHandle :note="note" side="s" :section="section"/>

  </div>
  
</template>

<script setup lang="ts">
import { Note, NoteSection } from '~/plugins/app/page/notes/notes';




defineProps<{
  note: Note
  section: NoteSection
}>()
</script>

<style>

</style>