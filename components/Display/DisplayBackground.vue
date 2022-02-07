<template>

  <div style="position: absolute;
  left: 0; right: 0; top: 0; bottom: 0;
  background-color: #1e1e1e"
  @pointerdown.left="onPointerDown"
  @dblclick.left="onDoubleClick">
  </div>

</template>

<script setup>
import { useContext } from "@nuxtjs/composition-api"




const { $app } = useContext()




function onPointerDown(event) {
  if (!event.ctrlKey && !event.shiftKey)
    $app.selection.clear(null)
    
  $app.boxSelection.start(event)
}

function onDoubleClick(event) {
  const clientPos = $app.pos.getClientPos(event)

  const note = $app.notes.create({ clientPos, local: true })

  $app.selection.clear()
  $app.activeElem.set(note)
}
</script>

<style scoped>

</style>