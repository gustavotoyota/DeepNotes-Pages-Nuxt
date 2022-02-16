<template>
  
  <div v-if="note.collab.resizable && note.selected
  && (note.parentId == null || side.includes('s'))"
  class="note-handle"
  :style="{
    'left': left,
    'top': top,
    'cursor': `${side}-resize`,
    'pointer-events': $app.dragging.active ? 'none' : 'auto',
    'opacity': $app.dragging.active ? '0.7' : null,
  }"
  @pointerdown.left.stop="onPointerDown">
  </div>
  
</template>

<script setup>
import { useContext, computed } from "@nuxtjs/composition-api"

const ctx = useContext()




const props = defineProps({
  note: { type: Object },
  side: { type: String },
  section: { type: String },
})




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





function onPointerDown(event) {
  ctx.$app.resizing.start(event, props.note, props.side, props.section)
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
  z-index: 1;
}
</style>