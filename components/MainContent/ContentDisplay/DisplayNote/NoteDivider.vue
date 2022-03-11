<template>

  <div style="position: relative">

    <v-divider/>
    
    <NoteResizeHandle :note="note" side="s" :section="section"/>

  </div>
  
</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';




defineProps<{
  note: Note
  section: string
}>()
</script>

<style>

</style>