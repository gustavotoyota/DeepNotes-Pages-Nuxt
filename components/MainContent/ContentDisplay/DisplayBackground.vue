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
    
  ctx.$app.page.boxSelection.start(event)
}

function onDoubleClick(event: MouseEvent) {
  const noteId = ctx.$app.page.notes.create()

  ctx.$app.page.data.collab.noteIds.push(noteId)




  const clientPos = ctx.$app.page.pos.getClientPos(event)
  const worldPos = ctx.$app.page.pos.clientToWorld(clientPos)




  const note = ctx.$app.page.notes.map[noteId]
  
  note.collab.pos.x = worldPos.x
  note.collab.pos.y = worldPos.y

  ctx.$app.page.editing.start(note, note.topSection)
}
</script>

<style scoped>

</style>