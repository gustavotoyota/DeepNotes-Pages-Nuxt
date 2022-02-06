<template>

  <NoteAnchor
  v-if="note != null"
  :note="note">

    <NoteFrame
    :note="note">

      <NoteBackground
      :note="note"
      :active="active"
      :selected="selected"/>

    </NoteFrame>

  </NoteAnchor>

</template>

<script setup>
import { computed, useContext } from '@nuxtjs/composition-api'



const { $app } = useContext()



const props = defineProps({
  note: { type: Object },
})




const active = computed(() => props.note.id === $app.activeElem.id)
const selected = computed(() => $app.selection.has(props.note))
</script>

<style scoped>
</style>