<template>

  <NoteAnchor :elem="elem">

    

  </NoteAnchor>

</template>

<script>
export default {
  
  props: {
    elem: { type: Object },

    targetWidth: { type: String },
  },

}
</script>

<script setup>
import { computed } from '@nuxtjs/composition-api'




const selected = computed(() => {
  return false // $app.selection.has(this.elem)
})



</script>

<style scoped>
</style>