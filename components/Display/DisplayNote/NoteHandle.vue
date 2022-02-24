<template>
  
  <div v-if="note.collab.resizable && note.selected
  && (note.parentId == null || side === 's')"
  class="note-handle"
  :style="{
    'left': left,
    'top': top,
    'cursor': `${side}-resize`,
    'pointer-events': $app.page.dragging.active ? 'none' : 'auto',
    'opacity': $app.page.dragging.active ? '0.7' : undefined,
  }"
  @pointerdown.left.stop="onPointerDown"/>
  
</template>

<script setup lang="ts">
import { useContext, computed } from "@nuxtjs/composition-api"
import { Note } from "~/plugins/app/page/notes/notes";

const ctx = useContext()




const props = defineProps<{
  note: Note
  side: string
  section?: string
}>()




const left = computed(() => {
  if (props.side.includes('w'))
    return '0%'
  else if (props.side.includes('e'))
    return '100%'
  else
    return '50%'
})
const top = computed(() => {
  if (props.side.includes('n'))
    return '0%'
  else if (props.side.includes('s'))
    return '100%'
  else
    return '50%'
})





function onPointerDown(event: PointerEvent) {
  if (event.button === 0)
    ctx.$app.page.resizing.start(event, props.note, props.side, props.section)
}
</script>

<style scoped>
.note-handle {
  position: absolute;

  border-radius: 999px;
  width: 10px; height: 10px;
  transform: translate(-50%, -50%);

  background-color: #2196F3;
  pointer-events: auto;
  z-index: 2147483647;
}
</style>