<template>
  
  <div v-if="!(note.collab.collapsed
  && note.topSection === section
  && note.collab.collapsedSize.x === 'auto')"
  :style="{
    'height': note.topSection === section
      && note.collab.collapsed ? '0' : undefined,
  }">

    <slot/>

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