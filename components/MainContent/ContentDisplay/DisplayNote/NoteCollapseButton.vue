<template>
  
  <div v-if="note.collab.collapsible && note.topSection === section"
  style="flex: none">

    <v-btn plain tile
    class="note-collapse-button"
    :style="{ 'height': note.numSections === 1 ? '38.45px' : '100%' }"
    @pointerdown.left.stop
    @click.left.stop="$app.page.collapsing.toggle(note)"
    @dblclick.left.stop>

      <v-icon v-if="note.collapsed">mdi-chevron-down</v-icon>
      <v-icon v-else>mdi-chevron-up</v-icon>

    </v-btn>

  </div>

</template>

<script setup lang="ts">
import { Note, NoteSection } from '~/plugins/app/page/notes/notes';

defineProps<{
  note: Note
  section: NoteSection
}>()
</script>

<style scoped>
.note-collapse-button {
  min-width: 0 !important;
  width: 32px;
}
</style>