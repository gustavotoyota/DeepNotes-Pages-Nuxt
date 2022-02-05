<template>

  <NoteAnchor
  v-if="note != null"
  :note="note">

    <NoteFrame
    :note="note"/>

  </NoteAnchor>

</template>

<script>
export default {

  props: {
    note: { type: Object },
  },

}
</script>

<style scoped>
</style>