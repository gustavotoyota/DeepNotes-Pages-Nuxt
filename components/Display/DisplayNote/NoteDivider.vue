<template>

  <div style="position: relative">

    <v-divider/>
    
    <NoteHandle :note="note" side="s" :section="section"/>

  </div>
  
</template>

<script setup lang="ts">
import { INote } from '~/plugins/app/notes/notes';




const props = defineProps<{
  note: INote
  section: string
}>()
</script>

<style>

</style>