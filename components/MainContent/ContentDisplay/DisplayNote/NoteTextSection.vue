<template>

  <div v-if="note.collab[`has${capitalizedSection}`]"
  :class="`note-${section}-section`"
  style="display: flex; min-height: 36.453px"
  :style="{ height: note[`${section}Height`] }">
  
    <div style="flex: 1"
    :style="{ 'width': note.targetWidth }"
    @dblclick.left="$app.page.editing.start(note, section)">

      <NoteEditor
      :note="note"
      :section="section"
      :wrap="note.collab[`wrap${capitalizedSection}`]"/>

    </div>

    <NoteCollapseButton
    :note="note"
    :section="section"/>

  </div>
  
</template>

<script setup lang="ts">
import { computed } from "@nuxtjs/composition-api"
import { Note, NoteSection } from "~/plugins/app/page/notes/notes";




const props = defineProps<{
  note: Note
  section: NoteSection
}>()




const capitalizedSection = computed(() =>
  $static.utils.capitalizeFirst(props.section) as 'Head' | 'Body')
</script>

<style>

</style>