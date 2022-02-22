<template>

  <div style="position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background-color: #1e1e1e"
  @pointerdown.left="onPointerDown"
  @dblclick.left="onDoubleClick">
  </div>

</template>

<script setup lang="ts">
import { useContext } from "@nuxtjs/composition-api"

const ctx = useContext()




function onPointerDown(event: PointerEvent) {
  ctx.$app.editing.stop()

  if (!event.ctrlKey && !event.shiftKey)
    ctx.$app.selection.clear(null)
    
  ctx.$app.boxSelection.start(event)
}

function onDoubleClick(event: MouseEvent) {
  const note = ctx.$app.notes.create(null)

  const clientPos = ctx.$app.pos.getClientPos(event)
  const worldPos = ctx.$app.pos.clientToWorld(clientPos)
  
  note.collab.pos.x = worldPos.x
  note.collab.pos.y = worldPos.y

  ctx.$app.editing.start(note, note.topSection)
}
</script>

<style scoped>

</style>