<template>
  
  <div v-show="visible"
  :style="{
    'height': collapsed ? '0' : undefined,
    'overflow': collapsed ? 'hidden' : undefined,
  }">

    <slot/>

  </div>
  
</template>

<script setup lang="ts">
import { computed } from '@nuxtjs/composition-api';
import { Note, NoteSection } from '~/plugins/app/page/notes/notes';




const props = defineProps<{
  note: Note
  section: NoteSection
}>()




const visible = computed(() => {
  return !(props.note.collapsed
    && props.note.topSection === props.section
    && props.note.collab.collapsedSize.x === 'auto')
})

const collapsed = computed(() => {
  return props.note.topSection === props.section
    && props.note.collapsed
})
</script>

<style>

</style>