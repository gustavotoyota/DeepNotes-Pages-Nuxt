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
      
        <NoteTextSection
        :note="note"
        section="body"/>

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