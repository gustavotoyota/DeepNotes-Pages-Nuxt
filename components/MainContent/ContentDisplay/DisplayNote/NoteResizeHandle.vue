<template>
  
  <div v-if="note.collab.resizable && note.selected
  && (note.parent == null
  || side === 's'
  || (['e', 'se'].includes(side) && (note.parent.collab.horizontal || !note.parent.collab.stretchChildren)))"
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
import { Note, NoteSection } from "~/plugins/app/page/notes/notes";

const ctx = useContext()




const props = defineProps<{
  note: Note
  side: string
  section?: NoteSection
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