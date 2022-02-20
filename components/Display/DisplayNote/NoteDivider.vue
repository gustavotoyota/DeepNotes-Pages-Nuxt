<template>

  <div style="position: relative">

    <v-divider/>
    
    <NoteHandle :note="note" side="s" :section="section"/>

  </div>
  
</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/notes/notes';




const props = defineProps<{
  note: Note
  section: string
}>()
</script>

<style>

</style>