<template>
  
  <div v-if="note.collab.collapsible && note.topSection === section"
  style="flex: none">

    <v-btn plain tile
    class="note-collapse-button"
    :style="{ 'height': note.numSections === 1 ? '38.45px' : '100%' }"
    @pointerdown.left.stop
    @click.left.stop="$app.collapsing.toggle(note)"
    @dblclick.left.stop>

      <v-icon v-if="note.collab.collapsed">mdi-chevron-down</v-icon>
      <v-icon v-else>mdi-chevron-up</v-icon>

    </v-btn>

  </div>

</template>

<script setup>
const props = defineProps({
  note: { type: Object },
  section: { type: String },
})
</script>

<style scoped>
.note-collapse-button {
  min-width: 0 !important;
  width: 32px;
}
</style>