<template>

  <NoteAnchor :note="note">

    <NoteDropZones :note="note"/>

    <NoteFrame :note="note">

      <!--<NoteArrowHandles :note="note"/>-->

      <NoteResizeHandles :note="note"/>

      <NoteLinkIcon :note="note"/>

      <NoteContent :note="note">
      
        <NoteTextSection :note="note" section="head"/>

        <NoteSectionGroup :note="note" section="head">

          <NoteDivider
          v-if="note.collab.hasHead && note.collab.hasBody"
          :note="note" section="head"/>
      
          <NoteTextSection :note="note" section="body"/>

          <NoteSectionGroup
          v-if="note.collab.container"
          :note="note" section="body">

            <NoteDivider
            v-if="note.collab.hasHead || note.collab.hasBody"
            :note="note" section="body"/>

            <NoteContainerSection :note="note"/>

          </NoteSectionGroup>
        
        </NoteSectionGroup>

      </NoteContent>

    </NoteFrame>

  </NoteAnchor>

</template>

<script setup lang="ts">
import { watchEffect } from '@nuxtjs/composition-api';
import { Note } from '~/plugins/app/page/notes/notes';




const props = defineProps<{
  note: Note
  index: number
}>()




watchEffect(() => {
  props.note.index = props.index
})
</script>

<style scoped>
</style>