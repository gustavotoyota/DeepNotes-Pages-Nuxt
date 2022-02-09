<template>

  <NoteAnchor
  v-if="note != null"
  :note="note">

    <NoteFrame
    :note="note">

      <NoteBackground
      :note="note">
      
        <NoteTextSection
        :note="note"
        section="title"/>

        <div v-if="!(note.collab.collapsed && note.topSection === 'title'
        && note.collab.collapsedSize.x === 'auto')"
        :style="{ 'height': note.topSection === 'title' && note.collab.collapsed ? '0' : null }">

          <NoteDivider v-if="note.collab.hasTitle && note.collab.hasBody"/>
      
          <NoteTextSection
          :note="note"
          section="body"/>
          
          <div v-if="note.collab.container
          && !(note.collab.collapsed && note.topSection === 'body'
          && note.collab.collapsedSize.x === 'auto')"
          :style="{ 'height': note.topSection === 'body' && note.collab.collapsed ? '0' : null }">

            <NoteDivider v-if="note.collab.hasTitle || note.collab.hasBody"/>

            <NoteContainerSection
            :note="note"/>

          </div>

        </div>

      </NoteBackground>

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