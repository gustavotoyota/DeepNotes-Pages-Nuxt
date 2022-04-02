<template>

  <div class="note-frame"
  ref="frameElem"
  :style="{
    'min-width': note.minWidth,
    'width': note.width,

    'position': note.parentId == null ? 'absolute' : 'relative',
    'transform': note.parentId == null ? `translate(` +
      `${-note.collab.anchor.x * 100}%, ${-note.collab.anchor.y * 100}%)` : undefined,
    
    'opacity': note.dragging ? '0.7' : undefined,
    'pointer-events': note.dragging ? 'none' : undefined,
  }">

    <slot/>

  </div>
  
</template>




<script setup lang="ts">
import { onMounted, onUnmounted, ref } from '@nuxtjs/composition-api';
import { Note } from '~/plugins/app/page/notes/notes';




const props = defineProps<{
  note: Note
}>()




const frameElem = ref<Element>()




const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    props.note.worldSize = {
      x: entry.contentRect.width,
      y: entry.contentRect.height,
    }
  }
})

onMounted(() => {
  resizeObserver.observe(frameElem.value!)
})
onUnmounted(() => {
  resizeObserver.unobserve(frameElem.value!)
})
</script>




<style>
</style>