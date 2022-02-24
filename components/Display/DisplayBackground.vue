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
  ctx.$app.page.editing.stop()

  if (!event.ctrlKey && !event.shiftKey)
    ctx.$app.page.selection.clear(null)
    
  if (event.pointerType === 'mouse')
    ctx.$app.page.boxSelection.start(event)
  else
    ctx.$app.page.panning.start(event)
}

function onDoubleClick(event: MouseEvent) {
  const note = ctx.$app.page.notes.create(null)

  const clientPos = ctx.$app.page.pos.getClientPos(event)
  const worldPos = ctx.$app.page.pos.clientToWorld(clientPos)
  
  note.collab.pos.x = worldPos.x
  note.collab.pos.y = worldPos.y

  ctx.$app.page.editing.start(note, note.topSection)
}
</script>

<style scoped>

</style>