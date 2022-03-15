<template>

  <v-icon v-if="note.collab.linkedPageId != null"
  small
  style="position: absolute;
  left: calc(50% + 1px); top: 2px;
  transform: translate(-50%, -50%);
  pointer-events: none">
    mdi-link-variant
  </v-icon>
  
</template>




<script setup lang="ts">
import { Note } from '~/plugins/app/page/notes/notes';



defineProps<{
  note: Note
}>()
</script>