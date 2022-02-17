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

const { $app } = useContext()




function onPointerDown(event: PointerEvent) {
  $app.editing.stop()

  if (!event.ctrlKey && !event.shiftKey)
    $app.selection.clear(null)
    
  $app.boxSelection.start(event)
}

function onDoubleClick(event: MouseEvent) {
  const clientPos = $app.pos.getClientPos(event)

  const note = $app.notes.create({ clientPos, local: true })

  $app.editing.start(note, note.topSection)
}
</script>

<style scoped>

</style>