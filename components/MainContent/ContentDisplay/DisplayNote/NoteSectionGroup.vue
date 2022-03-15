<template>
  
  <div v-show="!(note.collapsed
  && note.topSection === section
  && note.collab.collapsedSize.x === 'auto')"
  :style="{
    'height': note.topSection === section
      && note.collapsed ? '0' : undefined,
  }">

    <slot/>

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