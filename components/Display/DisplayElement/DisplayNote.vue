<template>

  <NoteAnchor
  v-if="note != null"
  :note="note">

    <NoteFrame
    :note="note"/>

  </NoteAnchor>

</template>

<script setup>
const props = defineProps({
  note: { type: Object },
})
</script>

<style scoped>
</style>