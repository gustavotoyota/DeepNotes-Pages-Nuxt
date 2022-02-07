<template>

  <NoteAnchor
  v-if="note != null"
  :note="note">

    <NoteFrame
    :note="note">

      <NoteBackground
      :note="note"/>

    </NoteFrame>

  </NoteAnchor>

</template>

<script setup>
import { computed, useContext } from '@nuxtjs/composition-api'



const { $app } = useContext()



const props = defineProps({
  note: { type: Object },
})
</script>

<style scoped>
</style>