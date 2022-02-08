<template>

  <div v-if="note.collab[`has${capitalizedSection}`]"
  :class="section"
  style="display: flex; min-height: 36.453px">
  
    <div style="flex: 1 /* Section content is horizontally flexible */;
    overflow: auto"
    :style="{ 'width': note.targetWidth }"
    @dblclick.left="$app.editing.start(note, section)">

      <NoteSmartEditor
      :text="note.collab[section]"
      :editing="note.editing"/>

    </div>

    <NoteCollapseButton
    :note="note"
    :section="section"/>

  </div>
  
</template>

<script setup>
import { computed } from "@nuxtjs/composition-api"




const props = defineProps({
  note: { type: Object },
  section: { type: String },
})




const capitalizedSection = computed(() =>
  $static.utils.capitalizeFirst(props.section))
</script>

<style>

</style>