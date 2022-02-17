<template>

  <div v-if="note.collab[`has${capitalizedSection}`]"
  :class="`${section}-section`"
  style="display: flex; min-height: 36.453px"
  :style="{ height: height }">
  
    <div style="flex: 1;
    overflow: auto"
    :style="{ 'width': note.targetWidth }"
    @dblclick.left="$app.editing.start(note, section)">

      <NoteEditor
      :note="note"
      :section="section"/>

    </div>

    <NoteCollapseButton
    :note="note"
    :section="section"/>

  </div>
  
</template>

<script setup lang="ts">
import { computed } from "@nuxtjs/composition-api"
import { INote } from "~/plugins/app/notes/notes";




const props = defineProps<{
  note: INote
  section: string
}>()




const capitalizedSection = computed(() =>
  $static.utils.capitalizeFirst(props.section))




const height = computed(() => {
  if (props.note.collab.collapsed
  && props.note.collab.collapsedSize.y[props.section] === 'auto'
  && props.note.topSection === props.section) {
    if (props.note.numSections === 1)
      return '0'
    else
      return props.note.collab.expandedSize.y[props.section]
  } else if (props.note.size.y[props.section] === 'auto')
    return props.note.collab.expandedSize.y[props.section]
  else
    return props.note.size.y[props.section]
})
</script>

<style>

</style>