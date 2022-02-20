<template>

  <NoteAnchor
  v-if="note != null"
  :note="note">

    <NoteFrame :note="note">

      <NoteDropZones :note="note"/>

      <NoteHandles :note="note"/>

      <NoteContent :note="note">
      
        <NoteTextSection :note="note" section="title"/>

        <NoteSectionGroup :note="note" section="title">

          <NoteDivider
          v-if="note.collab.hasTitle && note.collab.hasBody"
          :note="note" section="title"/>
      
          <NoteTextSection :note="note" section="body"/>

          <NoteSectionGroup
          v-if="note.collab.container"
          :note="note" section="body">

            <NoteDivider
            v-if="note.collab.hasTitle || note.collab.hasBody"
            :note="note" section="body"/>

            <NoteContainerSection :note="note"/>

          </NoteSectionGroup>
        
        </NoteSectionGroup>

      </NoteContent>

    </NoteFrame>

  </NoteAnchor>

</template>

<script setup lang="ts">
import { Note } from '~/plugins/app/notes/notes';




const props = defineProps<{
  note: Note
}>()
</script>

<style scoped>
</style>