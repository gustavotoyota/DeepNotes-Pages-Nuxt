<template>

  <div>

    <NoteEditor :text="note.collab[section]"/>

  </div>
  
</template>

<script setup>
import { computed } from "@nuxtjs/composition-api"




const props = defineProps({
  note: { type: Object },
  section: { type: String },
})




const capitalizedSection = computed(() =>
  $static.utils.capitalizeFirst(props.section))
</script>

<style>

</style>