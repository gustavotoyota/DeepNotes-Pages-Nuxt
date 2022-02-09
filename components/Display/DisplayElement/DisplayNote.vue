<template>

  <NoteAnchor v-if="note != null" :note="note">

    <NoteFrame :note="note">

      <NoteHandles :note="note"/>

      <NoteContent :note="note">
      
        <NoteTextSection :note="note" section="title"/>

        <NoteSectionGroup :note="note" section="title">

          <NoteDivider v-if="note.collab.hasTitle && note.collab.hasBody">
            <NoteHandle :note="note" side="s" section="title"/>
          </NoteDivider>
      
          <NoteTextSection :note="note" section="body"/>

          <NoteSectionGroup v-if="note.collab.container"
          :note="note" section="body">

            <NoteDivider v-if="note.collab.hasTitle || note.collab.hasBody">
              <NoteHandle :note="note" side="s" section="body"/>
            </NoteDivider>

            <NoteContainerSection :note="note"/>

          </NoteSectionGroup>
        
        </NoteSectionGroup>

      </NoteContent>

    </NoteFrame>

  </NoteAnchor>

</template>

<script setup>
const props = defineProps({
  note: { type: Object },
})
</script>

<style scoped>
</style>