<template>
  
  <div v-if="!(note.collab.collapsed
  && note.topSection === section
  && note.collab.collapsedSize.x === 'auto')"
  :style="{
    'height': note.topSection === section
      && note.collab.collapsed ? '0' : null,
  }">

    <slot/>

  </div>
  
</template>

<script setup>
const props = defineProps({
  note: { type: Object },
  section: { type: String },
})
</script>

<style>

</style>